
import axios, {
  type AxiosError,
  type InternalAxiosRequestConfig,
} from "axios";
import { links } from "./links";
import { secureStorage } from "./secure-storage";
import { useAuthStore } from "@/components/zustand/auth-info";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "",
});

type SessionExpiredHandler = () => void;
let onSessionExpired: SessionExpiredHandler | null = null;

export function registerSessionExpiredHandler(handler: SessionExpiredHandler) {
  onSessionExpired = handler;
}

// ---------------------------------------------------------------------------
// Request interceptor — access tokenni Authorization header'ga qo'shadi
// ---------------------------------------------------------------------------

api.interceptors.request.use(async (config) => {
  const accessToken = await secureStorage.getAccessToken();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// ---------------------------------------------------------------------------
// Response interceptor — 401 kelsa avtomatik refresh + qayta urinish
// ---------------------------------------------------------------------------

interface RetriableConfig extends InternalAxiosRequestConfig {
  _retried?: boolean;
}

let refreshPromise: Promise<string | null> | null = null;

async function refreshAccessToken(): Promise<string | null> {
  const refreshToken = await secureStorage.getRefreshToken();
  if (!refreshToken) return null;

  try {
    const { data } = await axios.post<{ access: string; refresh?: string }>(
      links.auth.tokenRefresh,
      { refresh: refreshToken },
      { baseURL: import.meta.env.VITE_API_BASE_URL ?? "" },
    );

    // Backend rotatsiya bilan yangi refresh ham qaytarishi mumkin
    if (data.refresh) {
      await secureStorage.setTokens(data.access, data.refresh);
    } else {
      await secureStorage.setAccessToken(data.access);
    }

    return data.access;
  } catch {
    // Refresh token ham yaroqsiz — global holatni ham, storage'ni ham
    // tozalaymiz, foydalanuvchi qayta login qilishi kerak bo'ladi
    useAuthStore.getState().logout();
    return null;
  }
}

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetriableConfig | undefined;

    const isUnauthorized = error.response?.status === 401;
    const alreadyRetried = originalRequest?._retried;

    if (!isUnauthorized || !originalRequest || alreadyRetried) {
      return Promise.reject(error);
    }

    originalRequest._retried = true;

    // Bir vaqtda bir nechta so'rov 401 olsa ham, refresh faqat BITTA marta
    // chaqirilishi uchun — natijani baham ko'ramiz
    if (!refreshPromise) {
      refreshPromise = refreshAccessToken().finally(() => {
        refreshPromise = null;
      });
    }

    const newAccessToken = await refreshPromise;

    if (!newAccessToken) {
      onSessionExpired?.();
      return Promise.reject(error);
    }

    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
    return api(originalRequest);
  },
);
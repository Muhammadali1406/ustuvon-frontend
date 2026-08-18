// ---------------------------------------------------------------------------
// api.ts
//
// Markazlashtirilgan axios instance. Har bir so'rovga shifrlangan
// localStorage'dan olingan access tokenni avtomatik qo'shadi. 401 kelsa —
// bitta marta /auth/token/refresh/ chaqirib, tokenlarni yangilaydi va asl
// so'rovni qayta yuboradi. Parallel so'rovlar bir vaqtda bir nechta refresh
// chaqirmasligi uchun navbat (queue) mantig'i bilan.
// ---------------------------------------------------------------------------

import axios, {
  type AxiosError,
  type InternalAxiosRequestConfig,
} from "axios";
import { links } from "./links";
import { secureStorage } from "./secure-storage";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "",
});

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
    // Refresh token ham yaroqsiz — foydalanuvchi qayta login qilishi kerak
    secureStorage.clear();
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
      // TODO: global auth state'ni tozalab, /login ga yo'naltirish
      // (masalan window.location.href = "/login" yoki router orqali)
      return Promise.reject(error);
    }

    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
    return api(originalRequest);
  },
);
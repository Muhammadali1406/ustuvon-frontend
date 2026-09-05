import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";
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

api.interceptors.request.use(async (config) => {
  const accessToken = await secureStorage.getAccessToken();
  console.log("Access token retrieved:", accessToken);
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

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

    if (data.refresh) {
      await secureStorage.setTokens(data.access, data.refresh);
    } else {
      await secureStorage.setAccessToken(data.access);
    }

    return data.access;
  } catch {
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

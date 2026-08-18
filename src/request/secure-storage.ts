// ---------------------------------------------------------------------------
// secureStorage.ts
//
// localStorage'ga to'g'ridan-to'g'ri emas, tokenCrypto.ts orqali shifrlangan
// holda yozadi/o'qiydi. AuthContext va axios interceptor faqat shu modulni
// chaqiradi — localStorage'ga hech qayerda bevosita murojaat qilinmaydi.
// ---------------------------------------------------------------------------

import { decryptToken, encryptToken } from "./token-crypto";

const ACCESS_TOKEN_KEY = "ustuvon_at";
const REFRESH_TOKEN_KEY = "ustuvon_rt";

async function readToken(key: string): Promise<string | null> {
  const encrypted = localStorage.getItem(key);
  if (!encrypted) return null;

  try {
    return await decryptToken(encrypted);
  } catch {
    // Buzilgan qiymat, eski kalit bilan shifrlangan, yoki manipulyatsiya
    // qilingan — ishonib bo'lmaydi, tozalab tashlaymiz.
    localStorage.removeItem(key);
    return null;
  }
}

export const secureStorage = {
  async setTokens(accessToken: string, refreshToken: string): Promise<void> {
    const [encAccess, encRefresh] = await Promise.all([
      encryptToken(accessToken),
      encryptToken(refreshToken),
    ]);
    localStorage.setItem(ACCESS_TOKEN_KEY, encAccess);
    localStorage.setItem(REFRESH_TOKEN_KEY, encRefresh);
  },

  async setAccessToken(accessToken: string): Promise<void> {
    localStorage.setItem(ACCESS_TOKEN_KEY, await encryptToken(accessToken));
  },

  getAccessToken(): Promise<string | null> {
    return readToken(ACCESS_TOKEN_KEY);
  },

  getRefreshToken(): Promise<string | null> {
    return readToken(REFRESH_TOKEN_KEY);
  },

  clear(): void {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  },
};
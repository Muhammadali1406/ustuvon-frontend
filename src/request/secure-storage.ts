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
const USER_TYPE_KEY = "ustuvon_ut";

async function readToken(key: string): Promise<string | null> {
  const encrypted = localStorage.getItem(key);
  if (!encrypted) return null;

  try {
    const decrypted = await decryptToken(encrypted);
    return decrypted;
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
    localStorage.removeItem(USER_TYPE_KEY);
  },

  // TokenResponse.user_type — /auth/me/ javobida (User sxemasida) qaytmaydi,
  // faqat login/register javobida keladi. Sahifa yangilanganda ham
  // saqlanib qolishi uchun alohida yozib qo'yamiz (maxfiy emas, lekin
  // izchillik uchun mavjud shifrlangan storage orqali).
  async setUserType(userType: string): Promise<void> {
    await this.setItem(USER_TYPE_KEY, userType);
  },

  getUserType(): Promise<string | null> {
    return this.getItem(USER_TYPE_KEY);
  },

  // Generic shifrlangan kalit-qiymat — authStore user/session obyektini
  // saqlash uchun ishlatadi. secureStorage domenga oid (AuthUser va h.k.)
  // tiplarni bilmasligi kerak, shuning uchun bu yerda faqat string bilan
  // ishlaymiz — serialize/deserialize chaqiruvchi tarafda bo'ladi.
  async setItem(key: string, value: string): Promise<void> {
    localStorage.setItem(key, await encryptToken(value));
  },

  getItem(key: string): Promise<string | null> {
    return readToken(key);
  },

  removeItem(key: string): void {
    localStorage.removeItem(key);
  },
};

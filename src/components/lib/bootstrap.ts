

// ---------------------------------------------------------------------------
// Ilova ishga tushganda (sahifa yangilanganda) bir marta chaqiriladi.
//
// Nega kerak: access token faqat JS xotirasida saqlanadi (localStorage'da
// emas), shuning uchun F5 bosilganda yo'qoladi. Refresh token esa (hozircha
// shifrlangan localStorage'da) saqlanib qoladi. Shu funksiya refresh
// tokendan foydalanib "hali ham kirilganmi?" ni tekshiradi va foydalanuvchi
// ma'lumotini qayta tiklaydi.
//
// Diqqat: /auth/me/ javobi (User sxemasi) user_type maydonini QAYTARMAYDI —
// bu faqat TokenResponse'da (login/register javobida) bor. Shuning uchun
// user_type'ni alohida (secureStorage.setUserType) saqlab qo'yamiz va
// bootstrap paytida o'sha yerdan o'qiymiz.
// ---------------------------------------------------------------------------


import { links } from "@/request/links";
import { api } from "@/request/api";
import { secureStorage } from "@/request/secure-storage";
import { useAuthStore, type AuthUser } from "../zustand/auth-info";

export async function bootstrapAuth(): Promise<void> {
  const { setSession, finishBootstrapping } = useAuthStore.getState();

  const refreshToken = await secureStorage.getRefreshToken();
  if (!refreshToken) {
    finishBootstrapping();
    return;
  }

  try {
    const [{ data: user }, storedUserType] = await Promise.all([
      api.get<AuthUser>(links.auth.me),
      secureStorage.getUserType(),
    ]);

    // Zaxira sifatida "user" — agar biror sababdan user_type topilmasa,
    // xavfsizroq tomonni tanlaymiz (admin emas, oddiy foydalanuvchi deb hisoblaymiz)
    setSession(user, storedUserType ?? "user");
  } catch {
    // access ham, refresh ham yaroqsiz — api.ts interceptor allaqachon
    // secureStorage'ni tozalagan bo'ladi (refreshAccessToken ichida)
    finishBootstrapping();
  }
}
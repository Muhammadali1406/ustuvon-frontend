import { secureStorage } from "@/request/secure-storage";
import { create } from "zustand";

// ---------------------------------------------------------------------------
// Backend sxemasiga mos (ustuvon_api_schema.yaml: User)
// ---------------------------------------------------------------------------

export interface AuthUser {
  id: string;
  first_name: string;
  last_name: string;
  phone: string | null;
  email: string | null;
  is_phone_verified: boolean;
  is_email_verified: boolean;
  created_at: string;
  updated_at: string;
}

interface AuthState {
  user: AuthUser | null;
  userType: string | null;
  isAuthenticated: boolean;
  // Ilova ochilganda (F5) sessiya tiklanayotganini bildiradi — shu payt
  // ProtectedRoute foydalanuvchini "kirmagan" deb hisoblab /login'ga
  // otib yubormasligi uchun kerak.
  isBootstrapping: boolean;

  // Login/Register muvaffaqiyatli bo'lganda — javobdagi user'ni to'g'ridan-to'g'ri saqlaydi
  setSession: (user: AuthUser, userType: string) => void;
  // Profil tahrirlangandan keyin (kelajakda PATCH /auth/me/) faqat user'ni yangilaydi
  setUser: (user: AuthUser) => void;
  // Ilova bootstrap tugaganini belgilaydi (sessiya bor yoki yo'q — baribir tugadi)
  finishBootstrapping: () => void;
  // Tokenlarni ham, holatni ham tozalaydi
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  userType: null,
  isAuthenticated: false,
  isBootstrapping: true,

  setSession: (user, userType) =>
    set({
      user,
      userType,
      isAuthenticated: true,
      isBootstrapping: false,
    }),

  setUser: (user) => set({ user }),

  finishBootstrapping: () => set({ isBootstrapping: false }),

  logout: () => {
    secureStorage.clear();
    set({
      user: null,
      userType: null,
      isAuthenticated: false,
      isBootstrapping: false,
    });
  },
}));

// ---------------------------------------------------------------------------
// Tayyor selector'lar — komponent faqat kerakli bo'lakka obuna bo'lsin,
// store ichidagi boshqa maydon o'zgarganda keraksiz qayta render bo'lmasin.
//
//   const user = useAuthUser();              // faqat user o'zgarsa qayta render
//   const isAuthed = useIsAuthenticated();    // faqat shu maydon o'zgarsa
// ---------------------------------------------------------------------------

export const useAuthUser = () => useAuthStore((state) => state.user);
export const useUserType = () => useAuthStore((state) => state.userType);
export const useIsAuthenticated = () =>
  useAuthStore((state) => state.isAuthenticated);
export const useIsBootstrapping = () =>
  useAuthStore((state) => state.isBootstrapping);

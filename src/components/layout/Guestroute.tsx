import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuthStore } from "../zustand/auth-info";

// Login/Register/Parolni tiklash — bularga faqat KIRMAGAN foydalanuvchi
// kirishi kerak. Allaqachon tizimga kirgan odam /login'ga qaytib kelsa —
// o'z bosh sahifasiga qaytaramiz, forma qayta ko'rsatilmaydi.
export function GuestRoute({ children }: { children: ReactNode }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const userType = useAuthStore((state) => state.userType);

  if (isAuthenticated) {
    return <Navigate to={userType === "admin" ? "/admin" : "/app"} replace />;
  }

  return <>{children}</>;
}
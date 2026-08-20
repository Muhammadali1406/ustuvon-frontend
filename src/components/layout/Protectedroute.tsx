import { Navigate, useLocation, type Location } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuthStore } from "../zustand/auth-info";

interface ProtectedRouteProps {
  children: ReactNode;
  // Bo'sh qoldirilsa — faqat "tizimga kirganmi" tekshiriladi, rol farqi yo'q
  allowedUserTypes?: string[];
}

// Diqqat: bu komponent isBootstrapping holatini o'zi tekshirmaydi — chunki
// butun ilova <AuthBootstrap> bilan o'ralgan (main.tsx), va u tiklanish
// tugamaguncha hech qanday marshrutni render qilmaydi. Shuning uchun bu
// komponent ishga tushganda isAuthenticated allaqachon aniq holatda bo'ladi.
export function ProtectedRoute({
  children,
  allowedUserTypes,
}: ProtectedRouteProps) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const userType = useAuthStore((state) => state.userType);
  const location = useLocation();

  if (!isAuthenticated) {
    // Qaysi sahifaga borishga uringanini saqlab qo'yamiz — login
    // muvaffaqiyatli bo'lgach o'sha yerga qaytaramiz (useLogin shu
    // location.state.from'ni o'qiydi)
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (allowedUserTypes && userType && !allowedUserTypes.includes(userType)) {
    // Kirgan, lekin bu bo'limga huquqi yo'q (masalan oddiy user /admin'ga
    // urinsa) — o'zining haqiqiy bosh sahifasiga qaytaramiz
    const fallback = userType === "admin" ? "/admin" : "/app";
    return <Navigate to={fallback} replace />;
  }

  return <>{children}</>;
}

export type { Location };
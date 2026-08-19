import { useEffect, type ReactNode } from "react";
import { bootstrapAuth } from "../lib/bootstrap";
import { useIsBootstrapping } from "../zustand/auth-info";


export function AuthBootstrap({ children }: { children: ReactNode }) {
  const isBootstrapping = useIsBootstrapping();

  useEffect(() => {
    bootstrapAuth();
  }, []);

  if (isBootstrapping) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F6F5F1]">
        <span className="h-8 w-8 animate-spin rounded-full border-2 border-[#0EBE15] border-t-transparent" />
      </div>
    );
  }

  return <>{children}</>;
}
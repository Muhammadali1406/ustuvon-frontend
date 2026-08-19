import { useCallback, useEffect, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { api } from "@/request/api";
import { links } from "@/request/links";
import { isValidPassword } from "@/components/lib/pasword-validators";

// ---------------------------------------------------------------------------
// Backend sxemasiga mos tiplar
// (ustuvon_api_schema.yaml: PasswordResetRequest, PasswordResetConfirm)
// ---------------------------------------------------------------------------

const RESEND_COOLDOWN_SECONDS = 60;

type Step = "request" | "confirm" | "done";

function extractServerError(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as Record<string, unknown> | undefined;
    if (typeof data?.detail === "string") return data.detail;
    for (const field of ["identifier", "code", "new_password"]) {
      const value = data?.[field];
      if (Array.isArray(value) && value[0]) return String(value[0]);
    }
  }
  return "Xatolik yuz berdi. Qaytadan urinib ko'ring.";
}

export function usePasswordReset() {
  const [step, setStep] = useState<Step>("request");
  const [identifier, setIdentifier] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmError, setConfirmError] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState(0);

  const navigate = useNavigate();
  const cooldownTimer = useRef<number | null>(null);

  const startCooldown = useCallback(() => {
    setCooldown(RESEND_COOLDOWN_SECONDS);
    if (cooldownTimer.current) window.clearInterval(cooldownTimer.current);
    cooldownTimer.current = window.setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          if (cooldownTimer.current) window.clearInterval(cooldownTimer.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  useEffect(() => {
    return () => {
      if (cooldownTimer.current) window.clearInterval(cooldownTimer.current);
    };
  }, []);

  // --- 1-bosqich: telefon/email bo'yicha kod so'rash ---
  const requestMutation = useMutation({
    mutationFn: async () => {
      await api.post(links.auth.passwordReset, { identifier });
    },
    onSuccess: () => {
      setStep("confirm");
      startCooldown();
    },
  });

  const submitRequest = useCallback(() => {
    if (!identifier.trim()) return;
    requestMutation.mutate();
  }, [identifier, requestMutation]);

  // --- 2-bosqich: kod + yangi parol ---
  const confirmMutation = useMutation({
    mutationFn: async () => {
      await api.post(links.auth.passwordResetConfirm, {
        identifier,
        code,
        new_password: newPassword,
      });
    },
    onSuccess: () => {
      setStep("done");
      window.setTimeout(() => navigate("/login", { replace: true }), 2000);
    },
  });

  const submitConfirm = useCallback(() => {
    if (code.trim().length !== 6) {
      setConfirmError("6 xonali kodni to'liq kiriting");
      return;
    }
    if (!isValidPassword(newPassword)) {
      setConfirmError(
        "Yangi parol kamida 9 belgi, 1 harf va 1 maxsus belgidan iborat bo'lishi kerak",
      );
      return;
    }
    if (newPassword !== confirmPassword) {
      setConfirmError("Parollar mos kelmadi");
      return;
    }
    setConfirmError(null);
    confirmMutation.mutate();
  }, [code, newPassword, confirmPassword, confirmMutation]);

  return {
    step,
    identifier,
    setIdentifier,
    submitRequest,
    isRequesting: requestMutation.isPending,
    requestError: requestMutation.isError
      ? extractServerError(requestMutation.error)
      : null,

    code,
    setCode,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    submitConfirm,
    isConfirming: confirmMutation.isPending,
    confirmError:
      confirmError ??
      (confirmMutation.isError ? extractServerError(confirmMutation.error) : null),

    resend: submitRequest,
    cooldown,
  };
}
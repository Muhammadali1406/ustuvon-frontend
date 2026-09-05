import { links } from "@/request/links";
import { api } from "@/request/api";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { isValidPassword } from "@/components/lib/pasword-validators";
import { toast } from "react-toastify";

interface ConfirmPasswordPayload {
  old_password: string;
  code: string;
  new_password: string;
}

type PasswordStep = "old-password" | "verify" | "done";

const CODE_TTL_SECONDS = 5 * 60; // 5 daqiqa

export function usePassword() {
  const [passwordError, setPasswordError] = useState("");
  const [passwordStep, setPasswordStep] =
    useState<PasswordStep>("old-password");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [code, setCode] = useState("");
  const [secondsLeft, setSecondsLeft] = useState(CODE_TTL_SECONDS);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const startTimer = () => {
    clearTimer();
    setSecondsLeft(CODE_TTL_SECONDS);
    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearTimer();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    if (passwordStep === "verify") {
      startTimer();
    } else {
      clearTimer();
    }
    return clearTimer;
  }, [passwordStep]);

  const isCodeExpired = passwordStep === "verify" && secondsLeft === 0;

  const formattedTimeLeft = `${Math.floor(secondsLeft / 60)}:${String(
    secondsLeft % 60,
  ).padStart(2, "0")}`;

  // 1-qadam: eski parol mahalliy tekshiriladi, lekin so'rov TANASI BO'SH —
  // backend JWT orqali foydalanuvchini biladi, faqat kod yuborish uchun
  // signal kifoya.
  const { mutate: requestCode, isPending: isRequestingCode } = useMutation({
    mutationKey: ["password-change-request"],
    mutationFn: () => api.post(links.auth.passwordChange, {}),
    onSuccess: () => {
      setPasswordStep("verify");
    },
    onError: (error) => {
      console.error("password change request:", error);
      toast.error("Kod yuborishda xatolik yuz berdi");
    },
  });

  // 2-qadam: eski parol (1-qadamdan) + kod + yangi parol — hammasi birga
  const { mutate: confirmPassword, isPending: isConfirming } = useMutation<
    unknown,
    Error,
    ConfirmPasswordPayload
  >({
    mutationKey: ["password-change-confirm"],
    mutationFn: (data) => api.post(links.auth.passwordChangeConfirm, data),
    onSuccess: () => {
      setPasswordStep("done");
      // Forma faqat MUVAFFAQIYATLI tasdiqlangandan keyin tozalanadi —
      // xato bo'lsa, foydalanuvchi xabarni ko'radi va qayta urinadi.
      window.setTimeout(() => {
        setPasswordStep("old-password");
        setOldPassword("");
        setNewPassword("");
        setCode("");
      }, 2500);
    },
    onError: (error) => {
      console.error("password change confirm:", error);
      toast.error("Kod yoki parolni tekshirib qayta urinib ko'ring");
    },
  });

  const handleOldPasswordSubmit = () => {
    if (!oldPassword) {
      setPasswordError("Eski parolni kiriting");
      return;
    }
    setPasswordError("");
    requestCode();
  };

  const handleResendCode = () => {
    setPasswordError("");
    requestCode();
  };

  const handleCodeSubmit = () => {
    if (isCodeExpired) {
      setPasswordError("Kod muddati tugagan, qaytadan so'rang");
      return;
    }
    if (code.trim().length !== 6) {
      setPasswordError("6 xonali kodni to'liq kiriting");
      return;
    }
    if (!isValidPassword(newPassword)) {
      setPasswordError(
        "Yangi parol kamida 9 belgi, 1 harf va 1 maxsus belgidan iborat bo'lishi kerak",
      );
      return;
    }
    setPasswordError("");
    confirmPassword({
      old_password: oldPassword,
      code,
      new_password: newPassword,
    });
  };

  return {
    passwordStep,
    setPasswordStep,
    oldPassword,
    setOldPassword,
    newPassword,
    setNewPassword,
    code,
    setCode,
    passwordError,
    handleOldPasswordSubmit,
    handleCodeSubmit,
    handleResendCode,
    isRequestingCode,
    isConfirming,
    secondsLeft,
    formattedTimeLeft,
    isCodeExpired,
  };
}

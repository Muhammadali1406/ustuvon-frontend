import { links } from "./../../../request/links";
import { api } from "@/request/api";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { isValidPassword } from "@/components/lib/pasword-validators";
import { toast } from "react-toastify";

interface ChangePasswordPayload {
  old_password: string;
  new_password: string;
}

interface ConfirmPaswordPayload {
  old_password: string;
  code: string;
  new_password: string;
}

export function usePassword() {
  const [passwordError, setPasswordError] = useState("");
  const [passwordStep, setPasswordStep] = useState<"form" | "verify" | "done">(
    "form",
  );
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [code, setCode] = useState("");

  const { mutate: confirmPasword } = useMutation<
    unknown,
    Error,
    ConfirmPaswordPayload
  >({
    mutationKey: ["change"],
    mutationFn: (data) => api.post(links.auth.passwordChangeConfirm, data),
    onSuccess: () => {
      setPasswordStep("done");
    },
    onError: (error) => {
      console.log("password change: ", error);
      toast.error("Xatolik!");
    },
  });

  const { mutate: changePassword } = useMutation<
    unknown,
    Error,
    ChangePasswordPayload
  >({
    mutationKey: ["change"],
    mutationFn: (data) => api.post(links.auth.passwordChange, data),
    onSuccess: () => {
      setPasswordStep("verify");
    },
    onError: (error) => {
      console.log("password change: ", error);
      toast.error("Xatolik!");
    },
  });

  const handlePasswordSubmit = () => {
    if (!passwordForm.oldPassword) {
      setPasswordError("Eski parolni kiriting");
      return;
    }
    if (!isValidPassword(passwordForm.newPassword)) {
      setPasswordError(
        "Yangi parol kamida 9 belgi, 1 harf va 1 maxsus belgidan iborat bo'lishi kerak",
      );
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError("Parollar mos kelmadi");
      return;
    }
    setPasswordError("");
    changePassword({
      old_password: passwordForm.oldPassword,
      new_password: passwordForm.newPassword,
    });
  };

  const handleCodeSubmit = () => {
    if (code.trim().length !== 6) {
      setPasswordError("6 xonali kodni to'liq kiriting");
      return;
    }
    setPasswordError("");
    confirmPasword({
      old_password: passwordForm.oldPassword,
      new_password: passwordForm.newPassword,
      code: code,
    });
    window.setTimeout(() => {
      setPasswordStep("form");
      setPasswordForm({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setCode("");
    }, 2500);
  };

  return {
    passwordForm,
    passwordStep,
    handlePasswordSubmit,
    passwordError,
    setPasswordForm,
    handleCodeSubmit,
    code,
    setCode,
    setPasswordStep,
  };
}

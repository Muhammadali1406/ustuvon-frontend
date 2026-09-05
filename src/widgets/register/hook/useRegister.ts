import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  isValidEmail,
  isValidPassword,
  isValidPhone,
  normalizePhone,
} from "@/components/lib/pasword-validators";
import { useAuthStore, type AuthUser } from "@/components/zustand/auth-info";
import { api } from "@/request/api";
import { links } from "@/request/links";
import { secureStorage } from "@/request/secure-storage";

// ---------------------------------------------------------------------------
// Backend sxemasiga mos tiplar (ustuvon_api_schema.yaml: Register, TokenResponse)
// ---------------------------------------------------------------------------

type ContactMethod = "phone" | "email";

interface RegisterPayload {
  first_name: string;
  last_name: string;
  password: string;
  phone?: string;
  email?: string;
}

interface TokenResponse {
  access: string;
  refresh: string;
  user: AuthUser;
  user_type: string;
}

const RESEND_COOLDOWN_SECONDS = 60;

// ---------------------------------------------------------------------------
// Forma holati
// ---------------------------------------------------------------------------

type FormField =
  | "firstName"
  | "lastName"
  | "contactValue"
  | "password"
  | "confirmPassword";

interface FormState {
  firstName: string;
  lastName: string;
  contactMethod: ContactMethod;
  contactValue: string;
  password: string;
  confirmPassword: string;
  errors: Partial<Record<FormField, string>>;
}

type FormAction =
  | { type: "SET_FIELD"; field: FormField; value: string }
  | { type: "SET_CONTACT_METHOD"; method: ContactMethod }
  | { type: "SET_ERRORS"; errors: FormState["errors"] };

const initialState: FormState = {
  firstName: "",
  lastName: "",
  contactMethod: "phone",
  contactValue: "",
  password: "",
  confirmPassword: "",
  errors: {},
};

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        [action.field]: action.value,
        errors: { ...state.errors, [action.field]: undefined },
      };
    case "SET_CONTACT_METHOD":
      // Usul almashtirilganda eski qiymat/xato chalkashtirmasin
      return {
        ...state,
        contactMethod: action.method,
        contactValue: "",
        errors: { ...state.errors, contactValue: undefined },
      };
    case "SET_ERRORS":
      return { ...state, errors: action.errors };
    default:
      return state;
  }
}

function validate(state: FormState): FormState["errors"] {
  const errors: FormState["errors"] = {};

  if (!state.firstName.trim()) errors.firstName = "Ismni kiriting";
  if (!state.lastName.trim()) errors.lastName = "Familiyani kiriting";

  if (!state.contactValue.trim()) {
    errors.contactValue =
      state.contactMethod === "phone"
        ? "Telefon raqamni kiriting"
        : "Email manzilni kiriting";
  } else if (
    state.contactMethod === "phone"
      ? !isValidPhone(state.contactValue)
      : !isValidEmail(state.contactValue)
  ) {
    errors.contactValue =
      state.contactMethod === "phone"
        ? "Telefon raqam formati noto'g'ri"
        : "Email formati noto'g'ri";
  }

  if (!isValidPassword(state.password)) {
    errors.password = "Kamida 9 belgi, 1 harf va 1 maxsus belgi bo'lishi kerak";
  }
  if (state.confirmPassword !== state.password) {
    errors.confirmPassword = "Parollar mos kelmadi";
  }

  return errors;
}

function extractServerError(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as Record<string, unknown> | undefined;

    // Backend shape: { success: false, error: { code, message, details } }
    const errObj = data?.error as
      | { code?: string; message?: string; details?: unknown }
      | undefined;
    if (errObj?.message) return errObj.message;

    // Eski / boshqa formatdagi javoblar bilan mos ishlashi uchun fallback'lar
    if (typeof data?.detail === "string") return data.detail;
    for (const field of ["phone", "email", "password", "non_field_errors"]) {
      const value = data?.[field];
      if (Array.isArray(value) && value[0]) return String(value[0]);
    }
  }
  return "Ro'yxatdan o'tishda xatolik yuz berdi. Qaytadan urinib ko'ring.";
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

type Step = "form" | "verify";

export function useRegister() {
  const [step, setStep] = useState<Step>("form");
  const [form, dispatch] = useReducer(formReducer, initialState);
  const [code, setCode] = useState("");
  const [cooldown, setCooldown] = useState(0);
  const navigate = useNavigate();
  const setSession = useAuthStore((state) => state.setSession);

  const cooldownTimer = useRef<number | null>(null);

  const startCooldown = useCallback(() => {
    setCooldown(RESEND_COOLDOWN_SECONDS);
    if (cooldownTimer.current) window.clearInterval(cooldownTimer.current);
    cooldownTimer.current = window.setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          if (cooldownTimer.current)
            window.clearInterval(cooldownTimer.current);
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

  // --- 1-bosqich: ro'yxatdan o'tish ---
  const registerMutation = useMutation({
    mutationFn: async (payload: RegisterPayload) => {
      const { data } = await api.post<TokenResponse>(
        links.auth.register,
        payload,
      );
      return data;
    },
    onSuccess: async (data) => {
      // Backend register bilan birga tokenlarni ham qaytaradi (avtomatik
      // login) — shuning uchun tasdiqlash bosqichida ham /auth/verify/
      // (jwtAuth talab qiladi) so'rovlari muammosiz ishlaydi.
      await secureStorage.setTokens(data.access, data.refresh);
      await secureStorage.setUserType(data.user_type);
      setSession(data.user, data.user_type);
      setStep("verify");
      startCooldown();
    },
  });

  const setField = useCallback((field: FormField, value: string) => {
    dispatch({ type: "SET_FIELD", field, value });
  }, []);

  const setContactMethod = useCallback((method: ContactMethod) => {
    dispatch({ type: "SET_CONTACT_METHOD", method });
  }, []);

  const submitForm = useCallback(() => {
    const errors = validate(form);
    if (Object.keys(errors).length > 0) {
      dispatch({ type: "SET_ERRORS", errors });
      return;
    }

    const payload: RegisterPayload = {
      first_name: form.firstName.trim(),
      last_name: form.lastName.trim(),
      password: form.password,
      ...(form.contactMethod === "phone"
        ? { phone: normalizePhone(form.contactValue) }
        : { email: form.contactValue.trim() }),
    };

    registerMutation.mutate(payload);
  }, [form, registerMutation]);

  // --- 2-bosqich: kodni tasdiqlash ---
  const verifyMutation = useMutation({
    mutationFn: async () => {
      await api.post(links.auth.verify, { code });
    },
    onSuccess: () => {
      navigate("/app", { replace: true });
    },
  });

  const resendMutation = useMutation({
    mutationFn: async () => {
      // Diqqat: OpenAPI hujjatida /auth/verify/resend/ so'rov tanasi sifatida
      // VerifyCode (code maydoni majburiy) ko'rsatilgan — bu ehtimol
      // hujjatlashtirish xatosi (qayta yuborishda hali kod yo'q). Backend
      // aslida bo'sh so'rovni kutayotgan bo'lishi mumkin; agar backend
      // "code" maydonini majburiy qilib qo'ysa, shu joyni backend
      // jamoasi bilan aniqlashtirish kerak bo'ladi.
      await api.post(links.auth.verifyResend, {});
    },
    onSuccess: () => {
      startCooldown();
    },
  });

  const submitCode = useCallback(() => {
    if (code.trim().length !== 6) return;
    verifyMutation.mutate();
  }, [code, verifyMutation]);

  return {
    step,
    // forma
    firstName: form.firstName,
    lastName: form.lastName,
    contactMethod: form.contactMethod,
    contactValue: form.contactValue,
    password: form.password,
    confirmPassword: form.confirmPassword,
    errors: form.errors,
    setField,
    setContactMethod,
    submitForm,
    isSubmittingForm: registerMutation.isPending,
    formServerError: registerMutation.isError
      ? extractServerError(registerMutation.error)
      : null,
    // tasdiqlash
    code,
    setCode,
    submitCode,
    isVerifying: verifyMutation.isPending,
    verifyError: verifyMutation.isError
      ? extractServerError(verifyMutation.error)
      : null,
    resend: resendMutation.mutate,
    isResending: resendMutation.isPending,
    cooldown,
    contactSummary:
      form.contactMethod === "phone"
        ? normalizePhone(form.contactValue)
        : form.contactValue,
  };
}

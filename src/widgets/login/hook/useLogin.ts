import { useCallback, useReducer } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuthStore, type AuthUser } from "@/components/zustand/auth-info";
import { api } from "@/request/api";
import { links } from "@/request/links";
import { secureStorage } from "@/request/secure-storage";

// ---------------------------------------------------------------------------
// Backend sxemasiga mos tiplar (ustuvon_api_schema.yaml: Login, TokenResponse)
// ---------------------------------------------------------------------------

interface LoginPayload {
  identifier: string; // telefon yoki email
  password: string;
}

interface TokenResponse {
  access: string;
  refresh: string;
  user: AuthUser;
  user_type: string;
}

// ---------------------------------------------------------------------------
// Forma holati — useState ko'p bo'lib ketmasligi uchun bitta reducer
// ---------------------------------------------------------------------------

type FormField = "identifier" | "password";

interface FormState {
  identifier: string;
  password: string;
  errors: Partial<Record<FormField, string>>;
}

type FormAction =
  | { type: "SET_FIELD"; field: FormField; value: string }
  | { type: "SET_ERRORS"; errors: FormState["errors"] };

const initialState: FormState = { identifier: "", password: "", errors: {} };

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case "SET_FIELD":
      // Maydon o'zgarganda o'sha maydonning eski xatosini tozalaymiz —
      // foydalanuvchi yozishni boshlaganda xato darhol yo'qoladi
      return {
        ...state,
        [action.field]: action.value,
        errors: { ...state.errors, [action.field]: undefined },
      };
    case "SET_ERRORS":
      return { ...state, errors: action.errors };
    default:
      return state;
  }
}

function validate(state: FormState): FormState["errors"] {
  const errors: FormState["errors"] = {};
  if (!state.identifier.trim()) {
    errors.identifier = "Telefon yoki email kiritilishi shart";
  }
  if (!state.password) {
    errors.password = "Parolni kiriting";
  }
  return errors;
}

function extractServerError(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as Record<string, unknown> | undefined;
    if (typeof data?.detail === "string") return data.detail;
    if (Array.isArray(data?.non_field_errors) && data.non_field_errors[0]) {
      return String(data.non_field_errors[0]);
    }
    if (Array.isArray(data?.identifier) && data.identifier[0]) {
      return String(data.identifier[0]);
    }
    if (Array.isArray(data?.password) && data.password[0]) {
      return String(data.password[0]);
    }
    if (error.response?.status === 401) {
      return "Telefon/email yoki parol noto'g'ri";
    }
  }
  return "Kirishda xatolik yuz berdi. Qaytadan urinib ko'ring.";
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useLogin() {
  const [form, dispatch] = useReducer(formReducer, initialState);
  const navigate = useNavigate();
  const setSession = useAuthStore((state) => state.setSession);

  const mutation = useMutation({
    mutationFn: async (payload: LoginPayload) => {
      const { data } = await api.post<TokenResponse>(links.auth.login, payload);
      return data;
    },
    onSuccess: async (data) => {
      // 1) Tokenlarni shifrlangan holda saqlaymiz (keyingi so'rovlar va
      //    sahifa yangilanganda tiklash uchun)
      await secureStorage.setTokens(data.access, data.refresh);
      await secureStorage.setUserType(data.user_type);

      // 2) Global holatga yozamiz — endi UserLayout, Home, ProtectedRoute
      //    va h.k. barchasi shu yerdan o'qiydi. /auth/me/ ga QO'SHIMCHA
      //    so'rov YO'Q — user obyekti javobning o'zida allaqachon keldi.
      setSession(data.user, data.user_type);

      navigate(data.user_type === "admin" ? "/admin" : "/app", {
        replace: true,
      });
    },
  });

  // useCallback — har render'da yangi funksiya yaratilmasin, input'lar
  // qayta-qayta re-render bo'lmasin (forma kattalashsa foyda beradi)
  const setField = useCallback((field: FormField, value: string) => {
    dispatch({ type: "SET_FIELD", field, value });
  }, []);

  const submit = useCallback(() => {
    const errors = validate(form);
    if (Object.keys(errors).length > 0) {
      dispatch({ type: "SET_ERRORS", errors });
      return;
    }
    mutation.mutate({ identifier: form.identifier, password: form.password });
  }, [form, mutation]);

  return {
    identifier: form.identifier,
    password: form.password,
    errors: form.errors,
    setField,
    submit,
    isSubmitting: mutation.isPending,
    serverError: mutation.isError ? extractServerError(mutation.error) : null,
  };
}
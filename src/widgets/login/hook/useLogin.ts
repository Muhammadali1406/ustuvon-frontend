import { useCallback, useReducer } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { api } from "@/request/api";
import { links } from "@/request/links";
import { useAuthStore, type AuthUser } from "@/components/zustand/auth-info";
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

    // Backend shape: { success: false, error: { code, message, details } }
    const errObj = data?.error as
      | { code?: string; message?: string; details?: unknown }
      | undefined;
    if (errObj?.message) return errObj.message;

    // Eski / boshqa formatdagi javoblar bilan mos ishlashi uchun fallback'lar
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
  const location = useLocation();
  const setSession = useAuthStore((state) => state.setSession);

  const {
    mutate: login,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async (payload: LoginPayload) =>
      await api.post<TokenResponse>(links.auth.login, payload),
    onSuccess: async (data: any) => {
      await secureStorage.setTokens(data.access, data.refresh);
      await secureStorage.setUserType(data.user_type);

      setSession(data.user, data.user_type);
      const from = (location.state as { from?: Location })?.from as
        | Location
        | undefined;
      const fallback = data.user_type === "admin" ? "/admin" : "/app";

      navigate(from ? `${from.pathname}${from.search}` : fallback, {
        replace: true,
      });
    },
    onError: (res) => {
      console.error("Login error:", res);
    },
  });

  const setField = useCallback((field: FormField, value: string) => {
    dispatch({ type: "SET_FIELD", field, value });
  }, []);

  const submit = useCallback(() => {
    const errors = validate(form);
    if (Object.keys(errors).length > 0) {
      dispatch({ type: "SET_ERRORS", errors });
      return;
    }
    login({ identifier: form.identifier, password: form.password });
  }, [form, login]);
  console.log("error: ", error);
  return {
    identifier: form.identifier,
    password: form.password,
    errors: form.errors,
    setField,
    submit,
    isSubmitting: isPending,
    serverError: isError ? extractServerError(error) : null,
  };
}

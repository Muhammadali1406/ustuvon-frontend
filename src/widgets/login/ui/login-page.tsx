import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Lock, Phone } from "lucide-react";
import { useLogin } from "../hook/useLogin";

function fieldClasses(hasError: boolean) {
  return `w-full rounded-lg border py-2.5 pl-9 pr-9 text-sm focus:outline-none focus:ring-1 ${
    hasError
      ? "border-rose-300 focus:border-rose-400 focus:ring-rose-400"
      : "border-black/10 focus:border-[#0EBE15] focus:ring-[#0EBE15]"
  }`;
}

export default function LoginPage() {
  const {
    identifier,
    password,
    errors,
    setField,
    submit,
    isSubmitting,
    serverError,
  } = useLogin();

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F6F5F1] px-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
        noValidate
        className="w-full max-w-sm rounded-2xl border border-black/10 bg-white p-8 shadow-sm"
      >
        <div className="text-center">
          <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-md bg-[#0EBE15] text-sm font-bold text-[#101826]">
            U
          </span>
          <h1 className="mt-4 text-lg font-semibold text-slate-900">
            Kirish
          </h1>
          <p className="mt-1 text-sm text-slate-500">Hisobingizga kiring</p>
        </div>

        {serverError && (
          <p className="mt-5 rounded-md bg-rose-50 px-3 py-2 text-xs font-medium text-rose-600">
            {serverError}
          </p>
        )}

        <div className="mt-6 space-y-4">
          {/* Identifier */}
          <div>
            <label
              htmlFor="identifier"
              className="text-xs text-slate-500"
            >
              Telefon yoki email
            </label>
            <div className="relative mt-1">
              <Phone
                size={15}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                id="identifier"
                type="text"
                inputMode="email"
                value={identifier}
                onChange={(e) => setField("identifier", e.target.value)}
                placeholder="+998 90 123 45 67"
                autoComplete="username"
                className={fieldClasses(Boolean(errors.identifier))}
              />
            </div>
            {errors.identifier && (
              <p className="mt-1 text-xs text-rose-600">
                {errors.identifier}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="text-xs text-slate-500">
              Parol
            </label>
            <div className="relative mt-1">
              <Lock
                size={15}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setField("password", e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                className={fieldClasses(Boolean(errors.password))}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                tabIndex={-1}
                aria-label={showPassword ? "Parolni yashirish" : "Parolni ko'rsatish"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-xs text-rose-600">{errors.password}</p>
            )}
          </div>
        </div>

        <div className="mt-2 flex justify-end">
          <Link
            to="/password-reset"
            className="text-xs font-medium text-[#0B8E0F] hover:underline"
          >
            Parolni unutdingizmi?
          </Link>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-6 w-full rounded-lg bg-[#0EBE15] px-4 py-2.5 text-sm font-semibold text-[#101826] transition-colors hover:bg-[#09720C] hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Kirilmoqda…" : "Kirish"}
        </button>

        <p className="mt-5 text-center text-sm text-slate-500">
          Hisobingiz yo'qmi?{" "}
          <Link
            to="/register"
            className="font-medium text-[#0B8E0F] hover:underline"
          >
            Ro'yxatdan o'ting
          </Link>
        </p>
      </form>
    </div>
  );
}
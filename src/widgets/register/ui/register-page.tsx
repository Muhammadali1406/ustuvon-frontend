import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail, Phone, User } from "lucide-react";
import { useRegister } from "../hook/useRegister";
import { PASSWORD_HINT } from "@/components/lib/pasword-validators";

function fieldClasses(hasError: boolean) {
  return `w-full rounded-lg border py-2.5 pl-9 pr-3 text-sm focus:outline-none focus:ring-1 ${
    hasError
      ? "border-rose-300 focus:border-rose-400 focus:ring-rose-400"
      : "border-black/10 focus:border-[#0EBE15] focus:ring-[#0EBE15]"
  }`;
}

export default function RegisterPage() {
  const {
    step,
    firstName,
    lastName,
    contactMethod,
    contactValue,
    password,
    confirmPassword,
    errors,
    setField,
    setContactMethod,
    submitForm,
    isSubmittingForm,
    formServerError,
    code,
    setCode,
    submitCode,
    isVerifying,
    verifyError,
    resend,
    isResending,
    cooldown,
    contactSummary,
  } = useRegister();

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F6F5F1] px-4 py-10">
      <div className="w-full max-w-sm rounded-2xl border border-black/10 bg-white p-8 shadow-sm">
        <div className="text-center">
          <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-md bg-[#0EBE15] text-sm font-bold text-[#101826]">
            U
          </span>
          <h1 className="mt-4 text-lg font-semibold text-slate-900">
            {step === "form" ? "Ro'yxatdan o'tish" : "Kodni tasdiqlang"}
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            {step === "form"
              ? "Bir necha soniyada akkaunt oching"
              : `${contactSummary} ga yuborilgan kodni kiriting`}
          </p>
        </div>

        {step === "form" ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              submitForm();
            }}
            noValidate
            className="mt-6"
          >
            {formServerError && (
              <p className="mb-4 rounded-md bg-rose-50 px-3 py-2 text-xs font-medium text-rose-600">
                {formServerError}
              </p>
            )}

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-500">Ism</label>
                  <div className="relative mt-1">
                    <User
                      size={15}
                      className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      value={firstName}
                      onChange={(e) => setField("firstName", e.target.value)}
                      className={fieldClasses(Boolean(errors.firstName))}
                      autoComplete="given-name"
                    />
                  </div>
                  {errors.firstName && (
                    <p className="mt-1 text-xs text-rose-600">
                      {errors.firstName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-xs text-slate-500">Familiya</label>
                  <div className="relative mt-1">
                    <User
                      size={15}
                      className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      value={lastName}
                      onChange={(e) => setField("lastName", e.target.value)}
                      className={fieldClasses(Boolean(errors.lastName))}
                      autoComplete="family-name"
                    />
                  </div>
                  {errors.lastName && (
                    <p className="mt-1 text-xs text-rose-600">
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>

              {/* Contact method toggle */}
              <div>
                <div className="flex items-center justify-between">
                  <label className="text-xs text-slate-500">
                    {contactMethod === "phone" ? "Telefon raqam" : "Email"}
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      setContactMethod(
                        contactMethod === "phone" ? "email" : "phone",
                      )
                    }
                    className="text-xs font-medium text-[#0B8E0F] hover:underline"
                  >
                    {contactMethod === "phone"
                      ? "Email orqali ro'yxatdan o'taman"
                      : "Telefon orqali ro'yxatdan o'taman"}
                  </button>
                </div>
                <div className="relative mt-1">
                  {contactMethod === "phone" ? (
                    <Phone
                      size={15}
                      className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                  ) : (
                    <Mail
                      size={15}
                      className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                  )}
                  <input
                    value={contactValue}
                    onChange={(e) => setField("contactValue", e.target.value)}
                    placeholder={
                      contactMethod === "phone"
                        ? "+998 90 123 45 67"
                        : "email@example.com"
                    }
                    inputMode={contactMethod === "phone" ? "tel" : "email"}
                    className={fieldClasses(Boolean(errors.contactValue))}
                    autoComplete={
                      contactMethod === "phone" ? "tel" : "email"
                    }
                  />
                </div>
                {errors.contactValue && (
                  <p className="mt-1 text-xs text-rose-600">
                    {errors.contactValue}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="text-xs text-slate-500">Parol</label>
                <div className="relative mt-1">
                  <Lock
                    size={15}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setField("password", e.target.value)}
                    className={`${fieldClasses(Boolean(errors.password))} pr-9`}
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    tabIndex={-1}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
                {errors.password ? (
                  <p className="mt-1 text-xs text-rose-600">
                    {errors.password}
                  </p>
                ) : (
                  <p className="mt-1 text-[11px] text-slate-400">
                    {PASSWORD_HINT}
                  </p>
                )}
              </div>

              {/* Confirm password */}
              <div>
                <label className="text-xs text-slate-500">
                  Parolni tasdiqlang
                </label>
                <div className="relative mt-1">
                  <Lock
                    size={15}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) =>
                      setField("confirmPassword", e.target.value)
                    }
                    className={fieldClasses(Boolean(errors.confirmPassword))}
                    autoComplete="new-password"
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-xs text-rose-600">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmittingForm}
              className="mt-6 w-full rounded-lg bg-[#0EBE15] px-4 py-2.5 text-sm font-semibold text-[#101826] transition-colors hover:bg-[#09720C] hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmittingForm ? "Yuborilmoqda…" : "Ro'yxatdan o'tish"}
            </button>

            <p className="mt-5 text-center text-sm text-slate-500">
              Hisobingiz bormi?{" "}
              <Link
                to="/login"
                className="font-medium text-[#0B8E0F] hover:underline"
              >
                Kirish
              </Link>
            </p>
          </form>
        ) : (
          <div className="mt-6">
            {verifyError && (
              <p className="mb-4 rounded-md bg-rose-50 px-3 py-2 text-xs font-medium text-rose-600">
                {verifyError}
              </p>
            )}

            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
              placeholder="000000"
              className="w-full rounded-lg border border-black/10 px-3 py-2.5 text-center text-lg tracking-[0.5em] focus:border-[#0EBE15] focus:outline-none focus:ring-1 focus:ring-[#0EBE15]"
            />

            <button
              type="button"
              onClick={submitCode}
              disabled={isVerifying || code.length !== 6}
              className="mt-4 w-full rounded-lg bg-[#0EBE15] px-4 py-2.5 text-sm font-semibold text-[#101826] transition-colors hover:bg-[#09720C] hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isVerifying ? "Tekshirilmoqda…" : "Tasdiqlash"}
            </button>

            <button
              type="button"
              onClick={() => resend()}
              disabled={cooldown > 0 || isResending}
              className="mt-3 w-full text-center text-sm font-medium text-slate-400 disabled:cursor-not-allowed enabled:text-[#0B8E0F] enabled:hover:underline"
            >
              {cooldown > 0
                ? `Qayta yuborish (${cooldown}s)`
                : isResending
                  ? "Yuborilmoqda…"
                  : "Kodni qayta yuborish"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
import { Link } from "react-router-dom";
import { CheckCircle2, KeyRound, Lock } from "lucide-react";
import { usePasswordReset } from "../hook/useresetPasword";
import { PASSWORD_HINT } from "@/components/lib/pasword-validators";

function fieldClasses(hasError: boolean) {
  return `w-full rounded-lg border py-2.5 pl-9 pr-3 text-sm focus:outline-none focus:ring-1 ${
    hasError
      ? "border-rose-300 focus:border-rose-400 focus:ring-rose-400"
      : "border-black/10 focus:border-[#0EBE15] focus:ring-[#0EBE15]"
  }`;
}

export default function PasswordResetPage() {
  const {
    step,
    identifier,
    setIdentifier,
    submitRequest,
    isRequesting,
    requestError,
    code,
    setCode,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    submitConfirm,
    isConfirming,
    confirmError,
    resend,
    cooldown,
  } = usePasswordReset();

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F6F5F1] px-4">
      <div className="w-full max-w-sm rounded-2xl border border-black/10 bg-white p-8 shadow-sm">
        <div className="text-center">
          <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-md bg-[#0EBE15] text-sm font-bold text-[#101826]">
            U
          </span>
          <h1 className="mt-4 text-lg font-semibold text-slate-900">
            {step === "request" && "Parolni tiklash"}
            {step === "confirm" && "Kod va yangi parol"}
            {step === "done" && "Tayyor"}
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            {step === "request" &&
              "Telefon yoki emailingizni kiriting — kod yuboramiz"}
            {step === "confirm" && `${identifier} ga yuborilgan kodni kiriting`}
            {step === "done" && "Parolingiz yangilandi, kirish sahifasiga o'tasiz…"}
          </p>
        </div>

        {/* 1-bosqich */}
        {step === "request" && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              submitRequest();
            }}
            noValidate
            className="mt-6"
          >
            {requestError && (
              <p className="mb-4 rounded-md bg-rose-50 px-3 py-2 text-xs font-medium text-rose-600">
                {requestError}
              </p>
            )}

            <label className="text-xs text-slate-500">Telefon yoki email</label>
            <div className="relative mt-1">
              <KeyRound
                size={15}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="+998 90 123 45 67"
                className={fieldClasses(false)}
                autoComplete="username"
              />
            </div>

            <button
              type="submit"
              disabled={isRequesting}
              className="mt-6 w-full rounded-lg bg-[#0EBE15] px-4 py-2.5 text-sm font-semibold text-[#101826] transition-colors hover:bg-[#09720C] hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isRequesting ? "Yuborilmoqda…" : "Kod yuborish"}
            </button>

            <p className="mt-5 text-center text-sm text-slate-500">
              <Link to="/login" className="font-medium text-[#0B8E0F] hover:underline">
                Kirish sahifasiga qaytish
              </Link>
            </p>
          </form>
        )}

        {/* 2-bosqich */}
        {step === "confirm" && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              submitConfirm();
            }}
            noValidate
            className="mt-6 space-y-4"
          >
            {confirmError && (
              <p className="rounded-md bg-rose-50 px-3 py-2 text-xs font-medium text-rose-600">
                {confirmError}
              </p>
            )}

            <div>
              <label className="text-xs text-slate-500">Tasdiqlash kodi</label>
              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                placeholder="000000"
                className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2.5 text-center text-lg tracking-[0.5em] focus:border-[#0EBE15] focus:outline-none focus:ring-1 focus:ring-[#0EBE15]"
              />
            </div>

            <div>
              <label className="text-xs text-slate-500">Yangi parol</label>
              <div className="relative mt-1">
                <Lock
                  size={15}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className={fieldClasses(false)}
                  autoComplete="new-password"
                />
              </div>
              <p className="mt-1 text-[11px] text-slate-400">{PASSWORD_HINT}</p>
            </div>

            <div>
              <label className="text-xs text-slate-500">
                Yangi parolni tasdiqlang
              </label>
              <div className="relative mt-1">
                <Lock
                  size={15}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={fieldClasses(false)}
                  autoComplete="new-password"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isConfirming}
              className="w-full rounded-lg bg-[#0EBE15] px-4 py-2.5 text-sm font-semibold text-[#101826] transition-colors hover:bg-[#09720C] hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isConfirming ? "Yangilanmoqda…" : "Parolni yangilash"}
            </button>

            <button
              type="button"
              onClick={() => resend()}
              disabled={cooldown > 0}
              className="w-full text-center text-sm font-medium text-slate-400 disabled:cursor-not-allowed enabled:text-[#0B8E0F] enabled:hover:underline"
            >
              {cooldown > 0 ? `Qayta yuborish (${cooldown}s)` : "Kodni qayta yuborish"}
            </button>
          </form>
        )}

        {/* 3-bosqich */}
        {step === "done" && (
          <div className="mt-6 flex flex-col items-center gap-2 text-emerald-600">
            <CheckCircle2 size={32} />
            <p className="text-sm font-medium">Muvaffaqiyatli yangilandi</p>
          </div>
        )}
      </div>
    </div>
  );
}
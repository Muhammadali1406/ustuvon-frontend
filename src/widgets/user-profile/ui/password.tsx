import { CheckCircle2, KeyRound } from "lucide-react";
import { useAuthStore } from "@/components/zustand/auth-info";
import { usePassword } from "../hook/usePassword";

export default function Password() {
  const {
    passwordStep,
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
    setPasswordStep,
    formattedTimeLeft,
    isCodeExpired,
  } = usePassword();

  const user = useAuthStore((state) => state.user);
  const contact = user?.phone || user?.email || "sizning kontaktingizga";

  return (
    <div className="rounded-xl border border-black/8 bg-white p-5">
      <div className="flex items-center gap-2">
        <KeyRound size={16} className="text-[#0B8E0F]" />
        <p className="text-sm font-semibold text-slate-900">
          Parolni yangilash
        </p>
      </div>

      {passwordStep === "old-password" && (
        <div className="mt-4 max-w-sm space-y-3">
          <div>
            <label className="text-xs text-slate-500">Eski parol</label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="mt-1 w-full rounded-md border border-black/10 px-3 py-2 text-sm focus:border-[#0EBE15] focus:outline-none focus:ring-1 focus:ring-[#0EBE15]"
            />
          </div>

          {passwordError && (
            <p className="text-xs font-medium text-rose-600">{passwordError}</p>
          )}

          <button
            type="button"
            onClick={handleOldPasswordSubmit}
            disabled={isRequestingCode}
            className="rounded-md bg-[#0EBE15] px-4 py-2 text-sm font-semibold text-[#101826] hover:bg-[#09720C] hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isRequestingCode ? "Yuborilmoqda…" : "Tasdiqlash kodini yuborish"}
          </button>
        </div>
      )}

      {passwordStep === "verify" && (
        <div className="mt-4 max-w-sm space-y-3">
          <p className="text-sm text-slate-600">
            {contact} ga 6 xonali tasdiqlash kodi yuborildi.
          </p>

          <div>
            <label className="text-xs text-slate-500">Tasdiqlash kodi</label>
            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
              placeholder="000000"
              disabled={isCodeExpired}
              className="mt-1 w-full rounded-md border border-black/10 px-3 py-2 text-center text-lg tracking-[0.5em] focus:border-[#0EBE15] focus:outline-none focus:ring-1 focus:ring-[#0EBE15] disabled:bg-slate-50 disabled:opacity-60"
            />

            {isCodeExpired ? (
              <button
                type="button"
                onClick={handleResendCode}
                disabled={isRequestingCode}
                className="mt-1.5 text-xs font-semibold text-[#0B8E0F] hover:underline disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isRequestingCode ? "Yuborilmoqda…" : "Kodni qayta yuborish"}
              </button>
            ) : (
              <p className="mt-1.5 text-xs text-slate-400">
                Kod amal qilish muddati:{" "}
                <span className="font-semibold text-slate-600">
                  {formattedTimeLeft}
                </span>
              </p>
            )}
          </div>

          <div>
            <label className="text-xs text-slate-500">Yangi parol</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mt-1 w-full rounded-md border border-black/10 px-3 py-2 text-sm focus:border-[#0EBE15] focus:outline-none focus:ring-1 focus:ring-[#0EBE15]"
            />
            <p className="mt-1 text-[11px] text-slate-400">
              Kamida 9 belgi, 1 harf va 1 maxsus belgi (masalan: !, @, #)
            </p>
          </div>

          {passwordError && (
            <p className="text-xs font-medium text-rose-600">{passwordError}</p>
          )}

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setPasswordStep("old-password")}
              disabled={isConfirming}
              className="text-sm font-medium text-slate-400 hover:text-slate-600 disabled:cursor-not-allowed"
            >
              Orqaga
            </button>
            <button
              type="button"
              onClick={handleCodeSubmit}
              disabled={isConfirming || isCodeExpired}
              className="rounded-md bg-[#0EBE15] px-4 py-2 text-sm font-semibold text-[#101826] hover:bg-[#09720C] hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isConfirming ? "Tekshirilmoqda…" : "Tasdiqlash"}
            </button>
          </div>
        </div>
      )}

      {passwordStep === "done" && (
        <p className="mt-4 flex items-center gap-2 rounded-md bg-emerald-50 px-3 py-2.5 text-sm font-medium text-emerald-700">
          <CheckCircle2 size={16} />
          Parolingiz muvaffaqiyatli yangilandi
        </p>
      )}
    </div>
  );
}
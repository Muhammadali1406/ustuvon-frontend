import { CheckCircle2, KeyRound } from "lucide-react";
import { DEMO_USER } from "@/widgets/user-home/hook/demo-data";

import { usePassword } from "../hook/usePassword";

export default function Password() {
  const {
    passwordForm,
    passwordStep,
    handlePasswordSubmit,
    passwordError,
    setPasswordForm,
    handleCodeSubmit,
    code,
    setCode,
    setPasswordStep,
  } = usePassword();

  return (
    <div className="rounded-xl border border-black/8 bg-white p-5">
      <div className="flex items-center gap-2">
        <KeyRound size={16} className="text-[#0B8E0F]" />
        <p className="text-sm font-semibold text-slate-900">
          Parolni yangilash
        </p>
      </div>

      {passwordStep === "form" && (
        <div className="mt-4 max-w-sm space-y-3">
          <div>
            <label className="text-xs text-slate-500">Eski parol</label>
            <input
              type="password"
              value={passwordForm.oldPassword}
              onChange={(e) =>
                setPasswordForm((f) => ({
                  ...f,
                  oldPassword: e.target.value,
                }))
              }
              className="mt-1 w-full rounded-md border border-black/10 px-3 py-2 text-sm focus:border-[#0EBE15] focus:outline-none focus:ring-1 focus:ring-[#0EBE15]"
            />
          </div>
          <div>
            <label className="text-xs text-slate-500">Yangi parol</label>
            <input
              type="password"
              value={passwordForm.newPassword}
              onChange={(e) =>
                setPasswordForm((f) => ({
                  ...f,
                  newPassword: e.target.value,
                }))
              }
              className="mt-1 w-full rounded-md border border-black/10 px-3 py-2 text-sm focus:border-[#0EBE15] focus:outline-none focus:ring-1 focus:ring-[#0EBE15]"
            />
            <p className="mt-1 text-[11px] text-slate-400">
              Kamida 9 belgi, 1 harf va 1 maxsus belgi (masalan: !, @, #)
            </p>
          </div>
          <div>
            <label className="text-xs text-slate-500">
              Yangi parolni tasdiqlang
            </label>
            <input
              type="password"
              value={passwordForm.confirmPassword}
              onChange={(e) =>
                setPasswordForm((f) => ({
                  ...f,
                  confirmPassword: e.target.value,
                }))
              }
              className="mt-1 w-full rounded-md border border-black/10 px-3 py-2 text-sm focus:border-[#0EBE15] focus:outline-none focus:ring-1 focus:ring-[#0EBE15]"
            />
          </div>

          {passwordError && (
            <p className="text-xs font-medium text-rose-600">{passwordError}</p>
          )}

          <button
            type="button"
            onClick={handlePasswordSubmit}
            className="rounded-md bg-[#0EBE15] px-4 py-2 text-sm font-semibold text-[#101826] hover:bg-[#09720C] hover:text-white"
          >
            Tasdiqlash kodini yuborish
          </button>
        </div>
      )}

      {passwordStep === "verify" && (
        <div className="mt-4 max-w-sm space-y-3">
          <p className="text-sm text-slate-600">
            {DEMO_USER.phone} raqamiga (yoki emailingizga) 6 xonali tasdiqlash
            kodi yuborildi.
          </p>
          <input
            type="text"
            inputMode="numeric"
            maxLength={6}
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
            placeholder="000000"
            className="w-full rounded-md border border-black/10 px-3 py-2 text-center text-lg tracking-[0.5em] focus:border-[#0EBE15] focus:outline-none focus:ring-1 focus:ring-[#0EBE15]"
          />
          {passwordError && (
            <p className="text-xs font-medium text-rose-600">{passwordError}</p>
          )}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setPasswordStep("form")}
              className="text-sm font-medium text-slate-400 hover:text-slate-600"
            >
              Orqaga
            </button>
            <button
              type="button"
              onClick={handleCodeSubmit}
              className="rounded-md bg-[#0EBE15] px-4 py-2 text-sm font-semibold text-[#101826] hover:bg-[#09720C] hover:text-white"
            >
              Tasdiqlash
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

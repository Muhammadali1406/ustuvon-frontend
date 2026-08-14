import { useMemo, useState } from "react";
import {
  Award,
  Calendar,
  CheckCircle2,
  KeyRound,
  Mail,
  Pencil,
  Phone,
  Sparkles,
  Target,
  Trophy,
  User,
  X,
} from "lucide-react";
import { DEMO_USER } from "@/widgets/user-home/hook/demo-data";
import { RESULT_HISTORY } from "@/widgets/user-result/hook/user-result-data";

// ---------------------------------------------------------------------------
// Yordamchi funksiyalar
// ---------------------------------------------------------------------------

function initials(fullName: string) {
  return fullName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

// TZ: parol kamida 9 belgi, kamida 1 harf va 1 maxsus belgidan iborat bo'lishi kerak
function isValidPassword(value: string) {
  return /^(?=.*[A-Za-z])(?=.*[^A-Za-z0-9]).{9,}$/.test(value);
}

// ---------------------------------------------------------------------------
// Presentational pieces
// ---------------------------------------------------------------------------

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-black/8 bg-white p-4">
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[#E7F8E8] text-[#0B8E0F]">
          {icon}
        </span>
        <div>
          <p className="text-lg font-semibold text-slate-900">{value}</p>
          <p className="text-xs text-slate-500">{label}</p>
        </div>
      </div>
    </div>
  );
}

function FieldRow({
  icon,
  label,
  value,
  editing,
  inputValue,
  onChange,
  type = "text",
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  editing: boolean;
  inputValue: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <div className="flex items-center gap-3 py-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-slate-50 text-slate-400">
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-xs text-slate-500">{label}</p>
        {editing ? (
          <input
            type={type}
            value={inputValue}
            onChange={(e) => onChange(e.target.value)}
            className="mt-0.5 w-full rounded-md border border-black/10 px-2.5 py-1.5 text-sm text-slate-800 focus:border-[#0EBE15] focus:outline-none focus:ring-1 focus:ring-[#0EBE15]"
          />
        ) : (
          <p className="truncate text-sm font-medium text-slate-800">{value}</p>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function UserProfile() {
  const [firstName, lastName] = DEMO_USER.fullName.split(" ");

  // Shaxsiy ma'lumotlar — tahrirlash
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    firstName,
    lastName,
    phone: DEMO_USER.phone,
    email: DEMO_USER.email,
  });
  const [savedMessage, setSavedMessage] = useState(false);

  const handleSave = () => {
    // TODO: PATCH /me so'roviga ulanadi
    setIsEditing(false);
    setSavedMessage(true);
    window.setTimeout(() => setSavedMessage(false), 3000);
  };

  const handleCancel = () => {
    setForm({ firstName, lastName, phone: DEMO_USER.phone, email: DEMO_USER.email });
    setIsEditing(false);
  };

  // Parolni yangilash — 2 bosqichli (forma -> SMS/email kod tasdiqlash)
  const [passwordStep, setPasswordStep] = useState<"form" | "verify" | "done">("form");
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [code, setCode] = useState("");
  const [passwordError, setPasswordError] = useState("");

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
    // TODO: backend SMS/email kod yuboradi
    setPasswordStep("verify");
  };

  const handleCodeSubmit = () => {
    if (code.trim().length !== 6) {
      setPasswordError("6 xonali kodni to'liq kiriting");
      return;
    }
    setPasswordError("");
    // TODO: POST /me/password/confirm
    setPasswordStep("done");
    window.setTimeout(() => {
      setPasswordStep("form");
      setPasswordForm({ oldPassword: "", newPassword: "", confirmPassword: "" });
      setCode("");
    }, 2500);
  };

  // Sertifikatlar — 85%+ natijaga ega har bir fandagi eng yaxshi urinish
  const certificates = useMemo(() => {
    const bestBySubject = new Map<string, (typeof RESULT_HISTORY)[number]>();
    for (const result of RESULT_HISTORY) {
      const current = bestBySubject.get(result.subjectId);
      if (!current || result.percent > current.percent) {
        bestBySubject.set(result.subjectId, result);
      }
    }
    return [...bestBySubject.values()]
      .filter((r) => r.percent >= 85)
      .sort((a, b) => b.percent - a.percent);
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-slate-900">Profil</h1>
        <p className="mt-1 text-sm text-slate-500">
          Shaxsiy ma'lumotlaringiz va statistikangiz
        </p>
      </div>

      {/* Profile header card */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-black/8 bg-white p-5">
        <div className="flex items-center gap-4">
          <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#E7F8E8] text-xl font-semibold text-[#0B8E0F]">
            {initials(DEMO_USER.fullName)}
          </span>
          <div>
            <p className="text-lg font-semibold text-slate-900">
              {DEMO_USER.fullName}
            </p>
            <p className="text-sm text-slate-500">{DEMO_USER.userCode}</p>
            <p className="mt-1 flex items-center gap-1 text-xs text-slate-400">
              <Calendar size={12} />
              {DEMO_USER.joinedAt} sanasida qo'shilgan
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <StatCard
          icon={<Target size={16} />}
          label="Ishlangan testlar"
          value={`${DEMO_USER.testsTaken} ta`}
        />
        <StatCard
          icon={<Sparkles size={16} />}
          label="O'rtacha natija"
          value={`${DEMO_USER.avgScore}%`}
        />
        <StatCard
          icon={<Trophy size={16} />}
          label="Eng yaxshi natija"
          value={`${DEMO_USER.bestScore}%`}
        />
      </div>

      {/* Personal info */}
      <div className="rounded-xl border border-black/8 bg-white p-5">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-slate-900">
            Shaxsiy ma'lumotlar
          </p>
          {!isEditing ? (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-1.5 text-sm font-medium text-[#0B8E0F] hover:underline"
            >
              <Pencil size={13} />
              Tahrirlash
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleCancel}
                className="flex items-center gap-1 text-sm font-medium text-slate-400 hover:text-slate-600"
              >
                <X size={13} />
                Bekor qilish
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="rounded-md bg-[#0EBE15] px-3 py-1.5 text-sm font-semibold text-[#101826] hover:bg-[#09720C] hover:text-white"
              >
                Saqlash
              </button>
            </div>
          )}
        </div>

        {savedMessage && (
          <p className="mt-3 flex items-center gap-1.5 rounded-md bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-700">
            <CheckCircle2 size={13} />
            Ma'lumotlar saqlandi
          </p>
        )}

        <div className="mt-2 divide-y divide-black/5">
          <FieldRow
            icon={<User size={16} />}
            label="Ism"
            value={form.firstName}
            editing={isEditing}
            inputValue={form.firstName}
            onChange={(v) => setForm((f) => ({ ...f, firstName: v }))}
          />
          <FieldRow
            icon={<User size={16} />}
            label="Familiya"
            value={form.lastName}
            editing={isEditing}
            inputValue={form.lastName}
            onChange={(v) => setForm((f) => ({ ...f, lastName: v }))}
          />
          <FieldRow
            icon={<Phone size={16} />}
            label="Telefon"
            value={form.phone}
            editing={isEditing}
            inputValue={form.phone}
            onChange={(v) => setForm((f) => ({ ...f, phone: v }))}
            type="tel"
          />
          <FieldRow
            icon={<Mail size={16} />}
            label="Email"
            value={form.email}
            editing={isEditing}
            inputValue={form.email}
            onChange={(v) => setForm((f) => ({ ...f, email: v }))}
            type="email"
          />
        </div>
      </div>

      {/* Certificates */}
      {certificates.length > 0 && (
        <div className="rounded-xl border border-black/8 bg-white p-5">
          <p className="text-sm font-semibold text-slate-900">
            Sertifikatlarim
          </p>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {certificates.map((cert) => (
              <div
                key={cert.id}
                className="flex items-center gap-3 rounded-lg border border-amber-100 bg-amber-50/50 px-4 py-3"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700">
                  <Award size={16} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-slate-800">
                    {cert.subjectName}
                  </p>
                  <p className="text-xs text-slate-500">{cert.date}</p>
                </div>
                <span className="text-sm font-semibold text-amber-700">
                  {cert.percent}%
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Security — change password */}
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
                  setPasswordForm((f) => ({ ...f, oldPassword: e.target.value }))
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
                  setPasswordForm((f) => ({ ...f, newPassword: e.target.value }))
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
    </div>
  );
}
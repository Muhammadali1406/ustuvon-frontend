import { useState } from "react";
import { FieldRow } from "./field-rox-user-profile";
import { CheckCircle2, Mail, Pencil, Phone, User, X } from "lucide-react";
import { DEMO_USER } from "@/widgets/user-home/hook/demo-data";

export default function PersonalInfo() {
  const [firstName, lastName] = DEMO_USER.fullName.split(" ");
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
    setForm({
      firstName,
      lastName,
      phone: DEMO_USER.phone,
      email: DEMO_USER.email,
    });
    setIsEditing(false);
  };
  return (
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
  );
}

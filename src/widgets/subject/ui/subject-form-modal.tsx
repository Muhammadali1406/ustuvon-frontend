// src/pages/admin/subjects/SubjectFormModal.tsx
import { useEffect, useState } from "react";
import {
  SUBJECT_CATEGORIES,
  type Subject,
  type SubjectFormValues,
} from "../lib/type-subject";
import { Modal } from "./modal";
import type { TaxamonySubject } from "@/widgets/test/hook/test-types";

interface SubjectFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: SubjectFormValues) => void;
  initialValues?: TaxamonySubject | null; // berilsa - tahrirlash rejimi
}

const emptyValues: SubjectFormValues = {
  name: "",
  category: SUBJECT_CATEGORIES[0],
};

export function SubjectFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialValues,
}: SubjectFormModalProps) {
  const [values, setValues] = useState<SubjectFormValues>(emptyValues);
  const [error, setError] = useState<string | null>(null);

  const isEditing = Boolean(initialValues);

  useEffect(() => {
    if (isOpen) {
      setValues(
        initialValues
          ? {
              name: initialValues.title,
              category: "DTM",
            }
          : emptyValues,
      );
      setError(null);
    }
  }, [isOpen, initialValues]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!values.name.trim()) {
      setError("Fan nomini kiriting.");
      return;
    }
    onSubmit(values);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? "Fanni tahrirlash" : "Yangi fan qo'shish"}
      description={
        isEditing
          ? "Tanlangan fan ma'lumotlarini yangilang."
          : "Asosiy sahifada ko'rinadigan yangi fan yarating."
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="subject-name"
            className="block text-sm font-medium text-slate-700"
          >
            Fan nomi
          </label>
          <input
            id="subject-name"
            type="text"
            value={values.name}
            onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
            placeholder="Masalan: Matematika"
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#12525A] focus:outline-none focus:ring-1 focus:ring-[#12525A]"
          />
          {error && <p className="mt-1 text-xs text-[#B3423B]">{error}</p>}
        </div>

        <div>
          <label
            htmlFor="subject-category"
            className="block text-sm font-medium text-slate-700"
          >
            Turkum
          </label>
          <select
            id="subject-category"
            value={values.category}
            onChange={(e) =>
              setValues((v) => ({
                ...v,
                category: e.target.value as SubjectFormValues["category"],
              }))
            }
            className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-[#12525A] focus:outline-none focus:ring-1 focus:ring-[#12525A]"
          >
            {SUBJECT_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-2 flex justify-end gap-2 border-t border-slate-100 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Bekor qilish
          </button>
          <button
            type="submit"
            className="rounded-md bg-[#12525A] px-3 py-1.5 text-sm font-medium text-white hover:bg-[#0D3E44]"
          >
            {isEditing ? "Saqlash" : "Qo'shish"}
          </button>
        </div>
      </form>
    </Modal>
  );
}

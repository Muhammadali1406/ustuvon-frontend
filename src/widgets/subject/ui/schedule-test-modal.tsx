// src/pages/admin/subjects/ScheduleTestModal.tsx
import { useEffect, useState } from "react";
import { Modal } from "./modal";
import type { ScheduledTest, Subject } from "../lib/type-subject";

interface ScheduleTestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (scheduled: ScheduledTest) => void;
  subject: Subject | null;
}

function toDateTimeLocal(iso?: string) {
  if (!iso) return "";
  return iso.slice(0, 16); // "YYYY-MM-DDTHH:mm"
}

export function ScheduleTestModal({
  isOpen,
  onClose,
  onSubmit,
  subject,
}: ScheduleTestModalProps) {
  const [date, setDate] = useState("");
  const [notifyViaBot, setNotifyViaBot] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setDate(toDateTimeLocal(subject?.scheduledTest?.date));
      setNotifyViaBot(subject?.scheduledTest?.notifyViaBot ?? true);
      setError(null);
    }
  }, [isOpen, subject]);

  if (!subject) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date) {
      setError("Sana va vaqtni tanlang.");
      return;
    }
    onSubmit({ date: new Date(date).toISOString(), notifyViaBot });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Yangi test rejalashtirish"
      description={`"${subject.name}" fani uchun`}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="schedule-date"
            className="block text-sm font-medium text-slate-700"
          >
            Sana va vaqt
          </label>
          <input
            id="schedule-date"
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-[#12525A] focus:outline-none focus:ring-1 focus:ring-[#12525A]"
          />
          {error && <p className="mt-1 text-xs text-[#B3423B]">{error}</p>}
        </div>

        <label className="flex items-start gap-2 text-sm text-slate-700">
          <input
            type="checkbox"
            checked={notifyViaBot}
            onChange={(e) => setNotifyViaBot(e.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-slate-300 text-[#12525A] focus:ring-[#12525A]"
          />
          <span>
            Telegram bot orqali foydalanuvchilarga xabar yuborilsin
            <span className="block text-xs text-slate-400">
              "Yangi test tashkillanmoqda, qatnashing" bildirishnomasi
              yuboriladi.
            </span>
          </span>
        </label>

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
            className="rounded-md bg-[#C79A3E] px-3 py-1.5 text-sm font-medium text-white hover:bg-[#8A6A24]"
          >
            Rejalashtirish
          </button>
        </div>
      </form>
    </Modal>
  );
}

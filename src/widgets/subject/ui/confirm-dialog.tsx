// src/components/ui/ConfirmDialog.tsx
import { AlertTriangle } from "lucide-react";
import { Modal } from "./modal";

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmLabel?: string;
  isDangerous?: boolean;
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = "Tasdiqlash",
  isDangerous = true,
}: ConfirmDialogProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="" widthClassName="max-w-sm">
      <div className="flex gap-3">
        <div
          className={`flex h-10 w-10 flex-none items-center justify-center rounded-full ${
            isDangerous
              ? "bg-[#B3423B]/10 text-[#B3423B]"
              : "bg-[#12525A]/10 text-[#12525A]"
          }`}
        >
          <AlertTriangle size={18} />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
          <p className="mt-1 text-sm text-slate-500">{description}</p>
        </div>
      </div>

      <div className="mt-5 flex justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          className="rounded-md border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Bekor qilish
        </button>
        <button
          type="button"
          onClick={() => {
            onConfirm();
            onClose();
          }}
          className={`rounded-md px-3 py-1.5 text-sm font-medium text-white ${
            isDangerous
              ? "bg-[#B3423B] hover:bg-[#8A322C]"
              : "bg-[#12525A] hover:bg-[#0D3E44]"
          }`}
        >
          {confirmLabel}
        </button>
      </div>
    </Modal>
  );
}

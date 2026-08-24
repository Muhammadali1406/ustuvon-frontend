
interface TestButtonsProps {
    resetAndClose: () => void;
    validateAndSubmit: (status: "Qoralama" | "Tekshiruvda") => void;
}

export default function TestButtons({ resetAndClose, validateAndSubmit }: TestButtonsProps) {
  return (
    <div className="mt-4 flex justify-end gap-2 border-t border-slate-100 pt-4">
      <button
        type="button"
        onClick={resetAndClose}
        className="rounded-md border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
      >
        Bekor qilish
      </button>
      <button
        type="button"
        onClick={() => validateAndSubmit("Qoralama")}
        className="rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
      >
        Qoralama sifatida saqlash
      </button>
      <button
        type="button"
        onClick={() => validateAndSubmit("Tekshiruvda")}
        className="rounded-md bg-[#12525A] px-3 py-1.5 text-sm font-medium text-white hover:bg-[#0D3E44]"
      >
        Yaratish
      </button>
    </div>
  );
}

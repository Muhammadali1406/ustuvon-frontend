import { useEffect, useState, type FormEvent } from "react";
import { X } from "lucide-react";
import { useCreateCategory } from "./useCreateCategory";

interface CreateCategoryModalProps {
  open: boolean;
  onClose: () => void;
}

export function CreateCategoryModal({
  open,
  onClose,
}: CreateCategoryModalProps) {
  const [title, setTitle] = useState("");
  const [authorFirstName, setAuthorFirstName] = useState("");
  const [authorLastName, setAuthorLastName] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);

  const { createCategory, isCreating, error, reset } = useCreateCategory(() => {
    onClose();
  });

  // Modal yopilganda forma tozalanadi — keyingi safar ochilganda eski
  // qiymatlar qolib ketmasin
  useEffect(() => {
    if (!open) {
      setTitle("");
      setAuthorFirstName("");
      setAuthorLastName("");
      setValidationError(null);
      reset();
    }
  }, [open, reset]);

  // Escape bosilganda yopiladi
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const handleClose = () => {
    if (isCreating) return; // so'rov ketayotganda tasodifan yopib qo'yilmasin
    onClose();
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setValidationError("Kategoriya nomini kiriting");
      return;
    }
    if (!authorFirstName.trim() || !authorLastName.trim()) {
      setValidationError("Muallif ism va familiyasini kiriting");
      return;
    }

    setValidationError(null);
    createCategory({
      title: title.trim(),
      author_first_name: authorFirstName.trim(),
      author_last_name: authorLastName.trim(),
    });
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-90 flex items-center justify-center bg-[#101826]/40 px-4 backdrop-blur-[2px]"
      onClick={handleClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="create-category-title"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl"
      >
        <div className="flex items-center justify-between">
          <h2
            id="create-category-title"
            className="text-base font-semibold text-slate-900"
          >
            Yangi kategoriya
          </h2>
          <button
            type="button"
            onClick={handleClose}
            disabled={isCreating}
            className="rounded-md p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 disabled:cursor-not-allowed"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate className="mt-5 space-y-4">
          {(validationError || error) && (
            <p className="rounded-md bg-rose-50 px-3 py-2 text-xs font-medium text-rose-600">
              {validationError ?? error}
            </p>
          )}

          <div>
            <label className="text-xs text-slate-500">Kategoriya nomi</label>
            <input
              autoFocus
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Masalan: Tabiiy fanlar"
              className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2.5 text-sm focus:border-[#1A5FA8] focus:outline-none focus:ring-1 focus:ring-[#1A5FA8]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-slate-500">Muallif ismi</label>
              <input
                value={authorFirstName}
                onChange={(e) => setAuthorFirstName(e.target.value)}
                className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2.5 text-sm focus:border-[#1A5FA8] focus:outline-none focus:ring-1 focus:ring-[#1A5FA8]"
              />
            </div>
            <div>
              <label className="text-xs text-slate-500">
                Muallif familiyasi
              </label>
              <input
                value={authorLastName}
                onChange={(e) => setAuthorLastName(e.target.value)}
                className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2.5 text-sm focus:border-[#1A5FA8] focus:outline-none focus:ring-1 focus:ring-[#1A5FA8]"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={handleClose}
              disabled={isCreating}
              className="text-sm font-medium text-slate-500 hover:text-slate-700 disabled:cursor-not-allowed"
            >
              Bekor qilish
            </button>
            <button
              type="submit"
              disabled={isCreating}
              className="rounded-lg bg-[#1A5FA8] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#123F70] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isCreating ? "Qo'shilmoqda…" : "Qo'shish"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

import { LayoutGrid, Plus } from "lucide-react";

export function EmptyState({
  hasSubjects,
  onCreate,
}: {
  hasSubjects: boolean;
  onCreate: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-16 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#12525A]/10 text-[#12525A]">
        <LayoutGrid size={20} />
      </div>
      <h3 className="mt-3 text-sm font-semibold text-slate-900">
        {hasSubjects ? "Hech narsa topilmadi" : "Hali fanlar qo'shilmagan"}
      </h3>
      <p className="mt-1 max-w-sm text-sm text-slate-500">
        {hasSubjects
          ? "Qidiruv yoki filtr shartlariga mos fan topilmadi. Boshqa so'z bilan urinib ko'ring."
          : "Foydalanuvchilar asosiy sahifada ko'radigan birinchi fanni qo'shishdan boshlang."}
      </p>
      {!hasSubjects && (
        <button
          type="button"
          onClick={onCreate}
          className="mt-4 inline-flex items-center gap-1.5 rounded-md bg-[#12525A] px-3 py-1.5 text-sm font-medium text-white hover:bg-[#0D3E44]"
        >
          <Plus size={15} />
          Fan qo'shish
        </button>
      )}
    </div>
  );
}

export function StatusToggle({
  isActive,
  onToggle,
}: {
  isActive: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
        isActive
          ? "bg-[#3F7D58]/10 text-[#2F5D42]"
          : "bg-slate-100 text-slate-500"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          isActive ? "bg-[#3F7D58]" : "bg-slate-400"
        }`}
      />
      {isActive ? "Faol" : "Nofaol"}
    </button>
  );
}

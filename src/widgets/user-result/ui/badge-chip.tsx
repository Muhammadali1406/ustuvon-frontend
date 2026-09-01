export function StatChip({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-black/8 bg-white px-4 py-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[#E7F8E8] text-[#0B8E0F]">
        {icon}
      </span>
      <div>
        <p className="text-lg font-semibold text-slate-900">{value}</p>
        <p className="text-xs text-slate-500">{label}</p>
      </div>
    </div>
  );
}

export function percentBadge(percent: number) {
  const tone =
    percent >= 80
      ? "bg-emerald-50 text-emerald-700"
      : percent >= 50
        ? "bg-amber-50 text-amber-700"
        : "bg-rose-50 text-rose-700";
  return (
    <span
      className={`inline-flex rounded-md px-2 py-0.5 text-xs font-medium ${tone}`}
    >
      {percent}%
    </span>
  );
}

// widgets/user-result/ui/badge-chip.tsx ichiga qo'shing
export function statusBadge(isPassed: boolean) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
        isPassed ? "bg-[#E7F8E8] text-[#0B8E0F]" : "bg-red-50 text-red-500"
      }`}
    >
      {isPassed ? "O'tdi" : "O'tmadi"}
    </span>
  );
}

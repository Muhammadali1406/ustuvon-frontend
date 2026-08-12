export function SummaryCard({
  label,
  value,
  accent = "#12525A",
}: {
  label: string;
  value: number;
  accent?: string;
}) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white px-4 py-3">
      <p className="text-xs font-medium text-slate-500">{label}</p>
      <p className="mt-1 text-xl font-semibold" style={{ color: accent }}>
        {value}
      </p>
    </div>
  );
}
export function FieldRow({
  icon,
  label,
  value,
  editing,
  inputValue,
  onChange,
  type = "text",
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  editing: boolean;
  inputValue: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <div className="flex items-center gap-3 py-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-slate-50 text-slate-400">
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-xs text-slate-500">{label}</p>
        {editing ? (
          <input
            type={type}
            value={inputValue}
            onChange={(e) => onChange(e.target.value)}
            className="mt-0.5 w-full rounded-md border border-black/10 px-2.5 py-1.5 text-sm text-slate-800 focus:border-[#0EBE15] focus:outline-none focus:ring-1 focus:ring-[#0EBE15]"
          />
        ) : (
          <p className="truncate text-sm font-medium text-slate-800">{value}</p>
        )}
      </div>
    </div>
  );
}
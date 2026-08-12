import { ChevronDown } from "lucide-react";

export function SelectFilter<T extends string>({
  value,
  onChange,
  allLabel,
  options,
}: {
  value: T | "Barchasi";
  onChange: (value: string) => void;
  allLabel: string;
  options: readonly T[];
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none rounded-md border border-slate-300 bg-white py-2 pl-3 pr-9 text-sm text-slate-700 focus:border-[#12525A] focus:outline-none focus:ring-1 focus:ring-[#12525A]"
      >
        <option value="Barchasi">{allLabel}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <ChevronDown
        size={14}
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
      />
    </div>
  );
}

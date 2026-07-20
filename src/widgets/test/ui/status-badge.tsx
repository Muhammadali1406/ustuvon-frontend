// src/components/ui/StatusBadge.tsx
import type { TestStatus } from "../lib/test-types";

const STATUS_STYLES: Record<TestStatus, string> = {
  Qoralama: "bg-slate-100 text-slate-600 ring-slate-200",
  Tekshiruvda: "bg-[#C79A3E]/10 text-[#8A6A24] ring-[#C79A3E]/30",
  "Nashr qilingan": "bg-[#3F7D58]/10 text-[#2F5D42] ring-[#3F7D58]/20",
};

export function StatusBadge({ status }: { status: TestStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${STATUS_STYLES[status]}`}
    >
      {status}
    </span>
  );
}

import type { UserStatus } from "@/widgets/users/hook/types-users";


const STATUS_STYLES: Record<UserStatus, string> = {
  faol: "bg-slate-100 text-slate-600 ring-slate-200",
  bloklangan: "bg-[#C79A3E]/10 text-[#8A6A24] ring-[#C79A3E]/30",
};

export function StatusBadge({ status }: { status: UserStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${STATUS_STYLES[status]}`}
    >
      {status}
    </span>
  );
}

import type { ColumnDef } from "@tanstack/react-table";
import { Ban, ShieldCheck, UserCheck } from "lucide-react";
import type { ApiUser } from "./types-users";
import { formatJoinedDate, getDisplayCode, getFullName, initials } from "./utils";

interface UserColumnActions {
  onToggleActive: (user: ApiUser) => void;
}

export const columns = ({
  onToggleActive,
}: UserColumnActions): ColumnDef<ApiUser, any>[] => {
  return [
    {
      id: "fullName",
      header: "Foydalanuvchi",
      cell: ({ row }) => {
        const fullName = getFullName(row.original);
        return (
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#1A5FA8]/10 text-xs font-semibold text-[#1A5FA8]">
              {initials(fullName)}
            </span>
            <div className="min-w-0">
              <p className="flex items-center gap-1.5 truncate font-medium text-slate-800">
                {fullName}
                {row.original.is_staff && (
                  <span title="Admin/xodim">
                    <ShieldCheck size={13} className="text-[#1A5FA8]" />
                  </span>
                )}
              </p>
              <p className="truncate text-xs text-slate-400">
                {getDisplayCode(row.original)}
              </p>
            </div>
          </div>
        );
      },
    },
    {
      id: "contact",
      header: "Aloqa",
      cell: ({ row }) => (
        <div className="min-w-0">
          <p className="truncate text-slate-700">
            {row.original.phone ?? "—"}
            {row.original.phone && row.original.is_phone_verified && (
              <span className="ml-1 text-[10px] text-emerald-600">✓</span>
            )}
          </p>
          <p className="truncate text-xs text-slate-400">
            {row.original.email ?? "—"}
            {row.original.email && row.original.is_email_verified && (
              <span className="ml-1 text-[10px] text-emerald-600">✓</span>
            )}
          </p>
        </div>
      ),
    },
    {
      id: "joinedAt",
      header: "Ro'yxatdan o'tgan",
      cell: ({ row }) => formatJoinedDate(row.original.created_at),
    },
    {
      accessorKey: "is_active",
      header: "Holat",
      cell: ({ getValue }) =>
        getValue<boolean>() ? (
          <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">
            Faol
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 rounded-md bg-rose-50 px-2 py-0.5 text-xs font-medium text-rose-700">
            Bloklangan
          </span>
        ),
    },
    {
      id: "actions",
      header: "Amallar",
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
          <button
            type="button"
            title={
              row.original.is_active
                ? "Foydalanuvchini bloklash"
                : "Blokdan chiqarish"
            }
            className="rounded-md p-1.5 text-slate-400 hover:bg-amber-50 hover:text-amber-600"
            onClick={() => onToggleActive(row.original)}
          >
            {row.original.is_active ? (
              <Ban size={15} />
            ) : (
              <UserCheck size={15} />
            )}
          </button>
          {/* O'chirish tugmasi olib tashlandi — backend'da DELETE
              endpointi yo'q, PATCH faqat is_active'ni qabul qiladi */}
        </div>
      ),
    },
  ];
};
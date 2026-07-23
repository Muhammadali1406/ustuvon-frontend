import type { ColumnDef } from "@tanstack/react-table";
import type { UserRow, UserStatus } from "./types-users";
import { initials } from "./utils";
import { StatusBadge } from "@/widgets/test";
import { Ban, Eye, Trash2, UserCheck } from "lucide-react";

export const columns: ColumnDef<UserRow, any>[] = [
  {
    accessorKey: "fullName",
    header: "Foydalanuvchi",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#1A5FA8]/10 text-xs font-semibold text-[#1A5FA8]">
          {initials(row.original.fullName)}
        </span>
        <div className="min-w-0">
          <p className="truncate font-medium text-slate-800">
            {row.original.fullName}
          </p>
          <p className="truncate text-xs text-slate-400">
            {row.original.userCode}
          </p>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "phone",
    header: "Aloqa",
    cell: ({ row }) => (
      <div className="min-w-0">
        <p className="truncate text-slate-700">{row.original.phone}</p>
        <p className="truncate text-xs text-slate-400">{row.original.email}</p>
      </div>
    ),
  },
  { accessorKey: "joinedAt", header: "Ro'yxatdan o'tgan" },
  {
    accessorKey: "testsTaken",
    header: "Testlar",
    cell: ({ getValue }) => `${getValue<number>()} ta`,
  },
  {
    accessorKey: "avgScore",
    header: "O'rtacha ball",
    cell: ({ getValue }) => `${getValue<number>()}%`,
  },
  {
    accessorKey: "bestScore",
    header: "Eng yaxshi natija",
    cell: ({ getValue }) => `${getValue<number>()}%`,
  },
  {
    accessorKey: "status",
    header: "Holat",
    cell: ({ getValue }) => <StatusBadge status={getValue<UserStatus>()} />,
  },
  {
    id: "actions",
    header: "Amallar",
    cell: ({ row }) => (
      <div className="flex items-center gap-1">
        <button
          type="button"
          title="Profilni ko'rish"
          className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          onClick={(e) => e.stopPropagation()}
        >
          <Eye size={15} />
        </button>
        <button
          type="button"
          title={
            row.original.status === "faol"
              ? "Foydalanuvchini bloklash"
              : "Blokdan chiqarish"
          }
          className="rounded-md p-1.5 text-slate-400 hover:bg-amber-50 hover:text-amber-600"
          onClick={(e) => e.stopPropagation()}
        >
          {row.original.status === "faol" ? (
            <Ban size={15} />
          ) : (
            <UserCheck size={15} />
          )}
        </button>
        <button
          type="button"
          title="O'chirish"
          className="rounded-md p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600"
          onClick={(e) => e.stopPropagation()}
        >
          <Trash2 size={15} />
        </button>
      </div>
    ),
  },
];

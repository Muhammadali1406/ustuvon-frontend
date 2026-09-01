import type { ColumnDef } from "@tanstack/react-table";
import { Trash2 } from "lucide-react";
// import { CategoryBadge } from "./category-badge";
import type { TaxamonySubject } from "@/widgets/test/hook/test-types";

interface ColumnActions {
  // onSchedule: (subject: TaxamonySubject) => void;
  // onEdit: (subject: TaxamonySubject) => void;
  onDelete: (subject: TaxamonySubject) => void;
  // onToggleActive: (subject: TaxamonySubject) => void;
}

export function buildSubjectsColumns({
  // onSchedule,
  // onEdit,
  onDelete,
  // onToggleActive,
}: ColumnActions): ColumnDef<TaxamonySubject, any>[] {
  return [
    {
      accessorKey: "name",
      header: "Fan",
      cell: (info) => (
        <span className="font-medium text-slate-900">
          {info?.row?.original?.title}
        </span>
      ),
    },
    // {
    //   accessorKey: "category",
    //   header: "Turkum",
    //   cell: (info) => (
    //     <CategoryBadge category={info?.row?.original?.category} />
    //   ),
    // },
    // {
    //   accessorKey: "testsCount",
    //   header: "Testlar",
    //   cell: (info) => info?.row?.original?.testsCount,
    // },
    // {
    //   accessorKey: "isActive",
    //   header: "Holati",
    //   cell: (info) => {
    //     const subject = info.row.original;
    //     return (
    //       <button
    //         type="button"
    //         onClick={() => onToggleActive(subject)}
    //         className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
    //           subject.isActive
    //             ? "bg-[#3F7D58]/10 text-[#2F5D42]"
    //             : "bg-slate-100 text-slate-500"
    //         }`}
    //       >
    //         <span
    //           className={`h-1.5 w-1.5 rounded-full ${
    //             subject.isActive ? "bg-[#3F7D58]" : "bg-slate-400"
    //           }`}
    //         />
    //         {subject.isActive ? "Faol" : "Nofaol"}
    //       </button>
    //     );
    //   },
    // },
    // {
    //   accessorKey: "createdAt",
    //   header: "Yaratilgan",
    //   cell: (info) =>
    //     info?.row?.original?.createdAt
    //       ? new Date(info.row.original.createdAt).toLocaleDateString("uz-UZ")
    //       : "—",
    // },
    {
      id: "actions",
      header: "Amallar",
      enableSorting: false,
      cell: (info) => {
        const subject = info.row.original;
        return (
          <div className="flex items-center justify-end gap-1">
            {/* <button
              onClick={() => onSchedule(subject)}
              className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              aria-label="Test rejalashtirish"
            >
              <CalendarClock size={16} />
            </button> */}
            {/* <button
              onClick={() => onEdit(subject)}
              className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              aria-label="Tahrirlash"
            >
              <Pencil size={16} />
            </button> */}
            <button
              onClick={() => onDelete(subject)}
              className="rounded-md p-1.5 text-slate-400 hover:bg-[#B3423B]/10 hover:text-[#B3423B]"
              aria-label="O'chirish"
            >
              <Trash2 size={16} />
            </button>
          </div>
        );
      },
    },
  ];
}

// src/pages/admin/subjects/subjectsColumns.tsx
//
// SubjectsPage.tsx ichidagi qo'lda yozilgan <table>/<tr>/<td> o'rniga
// shu columns ta'rifini <DataTable columns={subjectsColumns} data={subjects} />
// bilan ishlating. Boshqa har bir jadval (Foydalanuvchilar, Natijalar, Testlar)
// xuddi shunday - faqat o'ziga xos "columns" faylini yozadi, DataTable'ning
// o'zi o'zgarmaydi.

import type { ColumnDef } from "@tanstack/react-table";
import { CalendarClock, Pencil, Trash2 } from "lucide-react";
import type { Subject } from "../lib/typeSubject";
import { CategoryBadge } from "./category-badge";

interface ColumnActions {
  onSchedule: (subject: Subject) => void;
  onEdit: (subject: Subject) => void;
  onDelete: (subject: Subject) => void;
  onToggleActive: (subject: Subject) => void;
}

export function buildSubjectsColumns({
  onSchedule,
  onEdit,
  onDelete,
  onToggleActive,
}: ColumnActions): ColumnDef<Subject, any>[] {
  return [
    {
      accessorKey: "name",
      header: "Fan",
      cell: (info) => (
        <span className="font-medium text-slate-900">
          {info.getValue() as string}
        </span>
      ),
    },
    {
      accessorKey: "category",
      header: "Turkum",
      cell: (info) => <CategoryBadge category={info.getValue()} />,
    },
    {
      accessorKey: "testsCount",
      header: "Testlar",
    },
    {
      accessorKey: "isActive",
      header: "Holati",
      cell: (info) => {
        const subject = info.row.original;
        return (
          <button
            type="button"
            onClick={() => onToggleActive(subject)}
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
              subject.isActive
                ? "bg-[#3F7D58]/10 text-[#2F5D42]"
                : "bg-slate-100 text-slate-500"
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                subject.isActive ? "bg-[#3F7D58]" : "bg-slate-400"
              }`}
            />
            {subject.isActive ? "Faol" : "Nofaol"}
          </button>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: "Yaratilgan",
      cell: (info) =>
        new Date(info.getValue() as string).toLocaleDateString("uz-UZ"),
    },
    {
      id: "actions",
      header: "Amallar",
      enableSorting: false,
      cell: (info) => {
        const subject = info.row.original;
        return (
          <div className="flex items-center justify-end gap-1">
            <button
              onClick={() => onSchedule(subject)}
              className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              aria-label="Test rejalashtirish"
            >
              <CalendarClock size={16} />
            </button>
            <button
              onClick={() => onEdit(subject)}
              className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              aria-label="Tahrirlash"
            >
              <Pencil size={16} />
            </button>
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

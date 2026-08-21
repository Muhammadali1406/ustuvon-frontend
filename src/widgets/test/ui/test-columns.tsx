// src/pages/admin/tests/testsColumns.tsx
import type { ColumnDef } from "@tanstack/react-table";
import { Copy, Pencil, Sparkles, Trash2, User } from "lucide-react";
import { StatusBadge } from "./status-badge";
import type { Test } from "../hook/test-types";

interface ColumnActions {
  onEdit?: (test: Test) => void;
  onDuplicate?: (test: Test) => void;
  onDelete: (test: Test) => void;
}

export function buildTestsColumns({
  onEdit,
  onDuplicate,
  onDelete,
}: ColumnActions): ColumnDef<Test, any>[] {
  return [
    {
      accessorKey: "title",
      header: "Test",
      cell: (info) => {
        const test = info.row.original;
        return (
          <div>
            <p className="font-medium text-slate-900">{test.title}</p>
            <p className="mt-0.5 flex items-center gap-1 text-xs text-slate-400">
              {test.createdVia === "ai" ? (
                <>
                  <Sparkles size={11} /> AI orqali yaratilgan
                </>
              ) : (
                <>
                  <User size={11} /> Qo'lda kiritilgan
                </>
              )}
            </p>
          </div>
        );
      },
    },
    {
      accessorKey: "subjectName",
      header: "Fan",
    },
    {
      accessorKey: "format",
      header: "Format",
      cell: (info) => (
        <span className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
          {info.getValue() as string}
        </span>
      ),
    },
    {
      accessorKey: "questionsCount",
      header: "Savollar",
    },
    {
      accessorKey: "totalBall",
      header: "Ball",
    },
    {
      accessorKey: "durationMinutes",
      header: "Vaqt",
      cell: (info) => `${info.getValue()} daq`,
    },
    {
      accessorKey: "status",
      header: "Holati",
      cell: (info) => <StatusBadge status={info.getValue()} />,
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
        const test = info.row.original;
        return (
          <div className="flex items-center justify-end gap-1">
            <button
              onClick={() => onEdit?.(test)}
              className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              aria-label="Tahrirlash"
            >
              <Pencil size={16} />
            </button>
            <button
              onClick={() => onDuplicate?.(test)}
              className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              aria-label="Nusxa olish"
            >
              <Copy size={16} />
            </button>
            <button
              onClick={() => onDelete(test)}
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

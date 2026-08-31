import type { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash2 } from "lucide-react";
import { formatRawLabel, type Test } from "../hook/test-types";

interface ColumnActions {
  onEdit?: (test: Test) => void;
  onDelete: (test: Test) => void;
}

export function buildTestsColumns({
  onEdit,
  onDelete,
}: ColumnActions): ColumnDef<Test, any>[] {
  return [
    {
      accessorKey: "title",
      header: "Test",
      cell: (info) => (
        <p className="font-medium text-slate-900">
          {info.getValue() as string}
        </p>
      ),
    },
    {
      accessorKey: "test_type",
      header: "Format",
      cell: (info) => (
        <span className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
          {formatRawLabel(info.getValue() as string)}
        </span>
      ),
    },
    {
      accessorKey: "level",
      header: "Daraja",
      cell: (info) => (
        <span className="rounded-md bg-slate-50 px-2 py-0.5 text-xs font-medium uppercase text-slate-500">
          {info.getValue() as string}
        </span>
      ),
    },
    {
      accessorKey: "questions_count",
      header: "Savollar",
    },
    {
      accessorKey: "transition_assessment",
      header: "O'tish chegarasi",
      cell: (info) => `${info.getValue()}%`,
    },
    {
      accessorKey: "duration_time",
      header: "Vaqt",
      cell: (info) => `${info.getValue()} daq`,
    },
    {
      accessorKey: "is_active",
      header: "Holati",
      cell: (info) =>
        info.getValue() ? (
          <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">
            Faol
          </span>
        ) : (
          <span className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-500">
            Nofaol
          </span>
        ),
    },
    {
      accessorKey: "created_at",
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
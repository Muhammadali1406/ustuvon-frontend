import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronsUpDown,
} from "lucide-react";
import { useState, type ReactNode } from "react";

interface DataTableProps<TData> {
  columns: ColumnDef<TData, any>[];
  data: TData[];
  /** Har bir qatorga tugma/link biriktirish uchun (masalan qator bosilsa tafsilotga o'tish) */
  onRowClick?: (row: TData) => void;
  /** Ma'lumot hali kelmagan holat */
  isLoading?: boolean;
  /** Filtrdan keyin hech narsa topilmasa ko'rsatiladigan holat */
  emptyState?: ReactNode;
  /** Sahifada nechta qator (default 10) */
  pageSize?: number;
}

export function DataTable<TData>({
  columns,
  data,
  onRowClick,
  isLoading,
  emptyState,
  pageSize = 10,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize } },
  });

  const rows = table.getRowModel().rows;

  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const canSort = header.column.getCanSort();
                  const sortDir = header.column.getIsSorted();
                  return (
                    <th key={header.id} className="px-4 py-3 font-medium">
                      {header.isPlaceholder ? null : (
                        <button
                          type="button"
                          disabled={!canSort}
                          onClick={header.column.getToggleSortingHandler()}
                          className={`inline-flex items-center gap-1 ${
                            canSort
                              ? "cursor-pointer select-none hover:text-slate-700"
                              : ""
                          }`}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                          {canSort &&
                            (sortDir === "asc" ? (
                              <ChevronUp size={13} />
                            ) : sortDir === "desc" ? (
                              <ChevronDown size={13} />
                            ) : (
                              <ChevronsUpDown
                                size={13}
                                className="text-slate-300"
                              />
                            ))}
                        </button>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>

          <tbody className="divide-y divide-slate-100">
            {isLoading ? (
              <SkeletonRows columnCount={columns.length} rowCount={pageSize} />
            ) : rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-12 text-center">
                  {emptyState ?? (
                    <span className="text-sm text-slate-400">
                      Ma'lumot topilmadi
                    </span>
                  )}
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr
                  key={row.id}
                  onClick={() => onRowClick?.(row.original)}
                  className={
                    onRowClick
                      ? "cursor-pointer hover:bg-slate-50/60"
                      : "hover:bg-slate-50/60"
                  }
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-3 text-slate-700">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {!isLoading && rows.length > 0 && table.getPageCount() > 1 && (
        <div className="flex items-center justify-between border-t border-slate-100 px-4 py-3">
          <p className="text-xs text-slate-400">
            {table.getState().pagination.pageIndex * pageSize + 1}–
            {Math.min(
              (table.getState().pagination.pageIndex + 1) * pageSize,
              data.length,
            )}{" "}
            / {data.length} ta
          </p>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="rounded-md p-1.5 text-slate-500 hover:bg-slate-100 disabled:pointer-events-none disabled:opacity-30"
              aria-label="Oldingi sahifa"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="px-2 text-xs text-slate-500">
              {table.getState().pagination.pageIndex + 1} /{" "}
              {table.getPageCount()}
            </span>
            <button
              type="button"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="rounded-md p-1.5 text-slate-500 hover:bg-slate-100 disabled:pointer-events-none disabled:opacity-30"
              aria-label="Keyingi sahifa"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function SkeletonRows({
  columnCount,
  rowCount,
}: {
  columnCount: number;
  rowCount: number;
}) {
  return (
    <>
      {Array.from({ length: Math.min(rowCount, 5) }).map((_, i) => (
        <tr key={i}>
          {Array.from({ length: columnCount }).map((__, j) => (
            <td key={j} className="px-4 py-3">
              <div className="h-3.5 w-full max-w-[140px] animate-pulse rounded bg-slate-100" />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}

import { api } from "@/request/api";
import { links } from "@/request/links";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { percentBadge, statusBadge } from "../ui/badge-chip";
import type { ColumnDef } from "@tanstack/react-table";
import type { ExamResultApi } from "./user-result-data";

function formatDate(iso: string) {
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()}`;
}

export function useResult() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["exam-results"],
    queryFn: () => api.get<ExamResultApi[]>(links.exams.results),
  });

  const results = data?.data ?? [];

  const columns = useMemo<ColumnDef<ExamResultApi, any>[]>(
    () => [
      {
        id: "date",
        header: "Sana",
        accessorFn: (row) => row.completed_at,
        cell: ({ getValue }) => formatDate(getValue<string>()),
      },
      { accessorKey: "exam_title", header: "Test" },
      {
        accessorKey: "level",
        header: "Daraja",
        cell: ({ getValue }) => getValue<string>().toUpperCase(),
      },
      {
        accessorKey: "score",
        header: "Ball",
        cell: ({ getValue }) => percentBadge(getValue<number>()),
      },
      {
        accessorKey: "is_passed",
        header: "Holat",
        cell: ({ getValue }) => statusBadge(getValue<boolean>()),
      },
    ],
    [],
  );

  return { results, columns, isLoading, isError };
}

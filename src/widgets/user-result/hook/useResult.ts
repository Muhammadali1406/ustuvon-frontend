import { api } from "@/request/api";
import { links } from "@/request/links";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { percentBadge } from "../ui/badge-chip";
import type { ColumnDef } from "@tanstack/react-table";
import { type ResultRecord } from "@/widgets/user-result/hook/user-result-data";

export function useResult() {
  const { data: result } = useQuery({
    queryKey: [""],
    queryFn: () => api.get(links.exams.results),
  });
  useEffect(() => {
    console.log("user result: ", result);
  }, [result]);

  const columns = useMemo<ColumnDef<ResultRecord, any>[]>(
    () => [
      { accessorKey: "date", header: "Sana" },
      { accessorKey: "subjectName", header: "Fan" },
      { accessorKey: "testTitle", header: "Test" },
      {
        id: "correct",
        header: "To'g'ri javoblar",
        accessorFn: (row) => row.correctCount,
        cell: ({ row }) =>
          `${row.original.correctCount} / ${row.original.totalQuestions}`,
      },
      { accessorKey: "score", header: "Ball" },
      {
        accessorKey: "percent",
        header: "Foiz",
        cell: ({ getValue }) => percentBadge(getValue<number>()),
      },
      {
        accessorKey: "durationMinutes",
        header: "Vaqt",
        cell: ({ getValue }) => `${getValue<number>()} daqiqa`,
      },
    ],
    [],
  );

  return { result, columns };
}

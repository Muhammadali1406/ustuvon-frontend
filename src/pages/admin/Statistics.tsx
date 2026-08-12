import { useMemo } from "react";

import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/table/datatable";
import type { ResultRow } from "@/widgets/statistics/lib/types-statistics";
import {
  buildDailyActivity,
  buildResults,
  buildSubjectPopularity,
} from "@/widgets/statistics/lib/build";
import { percentBadge } from "@/widgets/statistics/ui/persent";
import { Chart } from "@/widgets/statistics/ui/charts";
import { StatCards } from "@/widgets/statistics/ui/stat-cards";

export default function Statistics() {
  const dailyActivity = useMemo(buildDailyActivity, []);
  const subjectPopularity = useMemo(buildSubjectPopularity, []);
  const results = useMemo(buildResults, []);

  const todayUsers = dailyActivity.at(-1)?.activeUsers ?? 0;
  const yesterdayUsers = dailyActivity.at(-2)?.activeUsers ?? 0;
  const usersDeltaPct = yesterdayUsers
    ? Math.round(((todayUsers - yesterdayUsers) / yesterdayUsers) * 100)
    : 0;

  const todayNewUsers = dailyActivity.at(-1)?.newUsers ?? 0;
  const avgPercent = Math.round(
    results.reduce((sum, r) => sum + r.percent, 0) / results.length,
  );
  const topSubject = subjectPopularity[0];

  const columns = useMemo<ColumnDef<ResultRow, any>[]>(
    () => [
      { accessorKey: "fullName", header: "Foydalanuvchi" },
      { accessorKey: "subject", header: "Fan" },
      { accessorKey: "test", header: "Test" },
      { accessorKey: "score", header: "Ball" },
      {
        accessorKey: "percent",
        header: "Foiz",
        cell: ({ getValue }) => percentBadge(getValue<number>()),
      },
      { accessorKey: "date", header: "Sana" },
    ],
    [],
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-slate-900">Statistika</h1>
        <p className="mt-1 text-sm text-slate-500">
          Platformadagi umumiy faollik va natijalar bo'yicha ko'rsatkichlar
        </p>
      </div>

      {/* Stat cards */}
      <StatCards
        todayUsers={todayUsers}
        usersDeltaPct={usersDeltaPct}
        todayNewUsers={todayNewUsers}
        avgPercent={avgPercent}
        topSubject={topSubject}
      />

      {/* Charts */}
      <Chart
        dailyActivity={dailyActivity}
        subjectPopularity={subjectPopularity}
      />

      {/* Results table */}
      <div>
        <p className="mb-3 text-sm font-medium text-slate-700">
          Barcha foydalanuvchilarning so'nggi natijalari
        </p>
        <DataTable columns={columns} data={results} pageSize={8} />
      </div>
    </div>
  );
}

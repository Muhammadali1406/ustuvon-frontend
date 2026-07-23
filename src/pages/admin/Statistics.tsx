import { useMemo } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CircleUserRound, Coins, Target, Trophy, UserPlus } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/table/datatable";
import type { ResultRow } from "@/widgets/statistics/lib/types-statistics";
import {
  buildDailyActivity,
  buildResults,
  buildSubjectPopularity,
} from "@/widgets/statistics/lib/build";
import { StatCard } from "@/widgets/statistics/ui/stat-cards-statistics";
import { percentBadge } from "@/widgets/statistics/ui/persent";
import { ChartCard } from "@/widgets/statistics/ui/chart-card-statistics";

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
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard
          label="Bugungi faol foydalanuvchilar"
          value={todayUsers.toLocaleString("ru-RU")}
          delta={{
            value: `${usersDeltaPct >= 0 ? "+" : ""}${usersDeltaPct}%`,
            direction: usersDeltaPct >= 0 ? "up" : "down",
          }}
          icon={<CircleUserRound size={18} />}
        />
        <StatCard
          label="Yangi foydalanuvchilar"
          value={todayNewUsers.toLocaleString("ru-RU")}
          icon={<UserPlus size={18} />}
        />
        <StatCard
          label="O'rtacha ball"
          value={`${avgPercent}%`}
          icon={<Target size={18} />}
        />
        <StatCard
          label="Eng ko'p ishlangan test"
          value={topSubject.subject}
          icon={<Trophy size={18} />}
        />
        <StatCard
          label="Bugungi tushum"
          value="1 240 000 so'm"
          delta={{ value: "+8%", direction: "up" }}
          icon={<Coins size={18} />}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ChartCard title="Foydalanuvchilar faolligi (oxirgi 14 kun)">
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={dailyActivity} margin={{ left: -20, right: 10 }}>
                <defs>
                  <linearGradient
                    id="activeUsersFill"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#1A5FA8" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="#1A5FA8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#F1F5F9"
                  vertical={false}
                />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 12, fill: "#94A3B8" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: "#94A3B8" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: 8,
                    borderColor: "#E2E8F0",
                    fontSize: 12,
                  }}
                  labelStyle={{ color: "#334155", fontWeight: 500 }}
                />
                <Area
                  type="monotone"
                  dataKey="activeUsers"
                  name="Faol foydalanuvchilar"
                  stroke="#1A5FA8"
                  strokeWidth={2}
                  fill="url(#activeUsersFill)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        <ChartCard title="Fanlar bo'yicha mashxurlik">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart
              data={subjectPopularity}
              layout="vertical"
              margin={{ left: 10 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#F1F5F9"
                horizontal={false}
              />
              <XAxis
                type="number"
                tick={{ fontSize: 11, fill: "#94A3B8" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                type="category"
                dataKey="subject"
                width={110}
                tick={{ fontSize: 12, fill: "#475569" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: 8,
                  borderColor: "#E2E8F0",
                  fontSize: 12,
                }}
                cursor={{ fill: "#F8FAFC" }}
              />
              <Bar
                dataKey="attempts"
                name="Urinishlar"
                fill="#1A5FA8"
                radius={[0, 4, 4, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

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

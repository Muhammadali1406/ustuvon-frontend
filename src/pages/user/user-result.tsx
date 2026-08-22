import { useMemo, useState } from "react";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Search, Sparkles, Target, Trophy } from "lucide-react";
import { SUBJECT_CATALOG } from "@/widgets/user-subject/hook/subject-data";
import { RESULT_HISTORY } from "@/widgets/user-result/hook/user-result-data";
import { DataTable } from "@/components/ui/table/datatable";
import { StatChip } from "@/widgets/user-result/ui/badge-chip";
import { useResult } from "@/widgets/user-result/hook/useResult";

export default function UserResults() {
  const [query, setQuery] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("barchasi");

  const { columns, result } = useResult();

  const subjectOptions = useMemo(
    () => ["barchasi", ...SUBJECT_CATALOG.map((s) => s.id)],
    [],
  );

  const subjectName = (id: string) =>
    id === "barchasi"
      ? "Barcha fanlar"
      : (SUBJECT_CATALOG.find((s) => s.id === id)?.name ?? id);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return RESULT_HISTORY.filter((result) => {
      const matchesQuery =
        !q ||
        result.subjectName.toLowerCase().includes(q) ||
        result.testTitle.toLowerCase().includes(q);
      const matchesSubject =
        subjectFilter === "barchasi" || result.subjectId === subjectFilter;
      return matchesQuery && matchesSubject;
    });
  }, [query, subjectFilter]);

  // Trend grafigi uchun — eskidan yangiga qarab tartiblangan, xronologik
  const trendData = useMemo(
    () =>
      [...RESULT_HISTORY]
        .sort((a, b) => a.dateValue - b.dateValue)
        .map((r) => ({ date: r.date.slice(0, 5), percent: r.percent })),
    [],
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-slate-900">Natijalarim</h1>
        <p className="mt-1 text-sm text-slate-500">
          Ishlagan barcha testlaringiz va rivojlanish dinamikangiz
        </p>
      </div>

      {/* Stat chips */}
      <div className="flex flex-wrap gap-3">
        <StatChip
          icon={<Target size={16} />}
          label="Jami ishlangan testlar"
          value={`${10} ta`}
        />
        <StatChip
          icon={<Sparkles size={16} />}
          label="O'rtacha ball"
          value={`${10}%`}
        />
        <StatChip
          icon={<Trophy size={16} />}
          label="Eng yaxshi natija"
          value={`${10}%`}
        />
      </div>

      {/* Trend chart */}
      <div className="rounded-xl border border-black/8 bg-white p-5">
        <p className="text-sm font-semibold text-slate-900">
          Rivojlanish dinamikasi
        </p>
        <div className="mt-4">
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={trendData} margin={{ left: -20, right: 10 }}>
              <defs>
                <linearGradient
                  id="resultTrendFill"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#0EBE15" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="#0EBE15" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#F1F5F9"
                vertical={false}
              />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 11, fill: "#94A3B8" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                domain={[0, 100]}
                tick={{ fontSize: 11, fill: "#94A3B8" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: 8,
                  borderColor: "#E2E8F0",
                  fontSize: 12,
                }}
                formatter={(value: any) => [`${value}%`, "Natija"]}
              />
              <Area
                type="monotone"
                dataKey="percent"
                stroke="#0B8E0F"
                strokeWidth={2}
                fill="url(#resultTrendFill)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full max-w-xs">
          <Search
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Fan yoki test nomi bo'yicha qidirish"
            className="w-full rounded-lg border border-black/10 bg-white py-2 pl-9 pr-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-[#0EBE15] focus:outline-none focus:ring-1 focus:ring-[#0EBE15]"
          />
        </div>

        <select
          value={subjectFilter}
          onChange={(e) => setSubjectFilter(e.target.value)}
          className="w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-sm text-slate-700 focus:border-[#0EBE15] focus:outline-none focus:ring-1 focus:ring-[#0EBE15] sm:w-56"
        >
          {subjectOptions.map((id) => (
            <option key={id} value={id}>
              {subjectName(id)}
            </option>
          ))}
        </select>
      </div>

      <DataTable
        columns={columns}
        data={filtered}
        pageSize={8}
        emptyState={
          <span className="text-sm text-slate-400">
            Qidiruv shartlariga mos natija topilmadi
          </span>
        }
      />
    </div>
  );
}

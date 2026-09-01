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
import { Loader2, Search, Sparkles, Target, Trophy } from "lucide-react";
import { DataTable } from "@/components/ui/table/datatable";
import { StatChip } from "@/widgets/user-result/ui/badge-chip";
import { useResult } from "@/widgets/user-result/hook/useResult";

export default function UserResults() {
  const [query, setQuery] = useState("");
  const { results, columns, isLoading, isError } = useResult();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return results;
    return results.filter(
      (r) =>
        r.exam_title.toLowerCase().includes(q) ||
        r.level.toLowerCase().includes(q),
    );
  }, [results, query]);

  const stats = useMemo(() => {
    if (results.length === 0) {
      return { total: 0, avg: 0, best: 0 };
    }
    const total = results.length;
    const avg = Math.round(
      results.reduce((sum, r) => sum + r.score, 0) / total,
    );
    const best = Math.max(...results.map((r) => r.score));
    return { total, avg, best };
  }, [results]);

  // Trend grafigi — completed_at bo'yicha xronologik tartiblangan
  const trendData = useMemo(
    () =>
      [...results]
        .sort(
          (a, b) =>
            new Date(a.completed_at).getTime() -
            new Date(b.completed_at).getTime(),
        )
        .map((r) => ({
          date: new Date(r.completed_at).toLocaleDateString("uz-UZ", {
            day: "2-digit",
            month: "2-digit",
          }),
          score: r.score,
        })),
    [results],
  );

  if (isLoading) {
    return (
      <div className="flex min-h-[40vh] flex-col items-center justify-center gap-3 text-slate-500">
        <Loader2 className="animate-spin" size={24} />
        <p className="text-sm">Natijalar yuklanmoqda...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <p className="text-sm font-medium text-red-500">
          Natijalarni yuklashda xatolik yuz berdi.
        </p>
      </div>
    );
  }

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
          value={`${stats.total} ta`}
        />
        <StatChip
          icon={<Sparkles size={16} />}
          label="O'rtacha ball"
          value={`${stats.avg}%`}
        />
        <StatChip
          icon={<Trophy size={16} />}
          label="Eng yaxshi natija"
          value={`${stats.best}%`}
        />
      </div>

      {/* Trend chart */}
      {trendData.length > 0 && (
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
                  formatter={(value: any) => [`${value}%`, "Ball"]}
                />
                <Area
                  type="monotone"
                  dataKey="score"
                  stroke="#0B8E0F"
                  strokeWidth={2}
                  fill="url(#resultTrendFill)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Toolbar */}
      <div className="relative w-full max-w-xs">
        <Search
          size={16}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Test nomi yoki daraja bo'yicha qidirish"
          className="w-full rounded-lg border border-black/10 bg-white py-2 pl-9 pr-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-[#0EBE15] focus:outline-none focus:ring-1 focus:ring-[#0EBE15]"
        />
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
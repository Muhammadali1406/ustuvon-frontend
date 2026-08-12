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
import { ChartCard } from "./chart-card-statistics";

export function Chart({
  dailyActivity,
  subjectPopularity,
}: {
  dailyActivity: any[];
  subjectPopularity: any[];
}) {
  return (
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
  );
}

import { CircleUserRound, Coins, Target, Trophy, UserPlus } from "lucide-react";
import { StatCard } from "./stat-cards-statistics";

export function StatCards({
  todayUsers,
  usersDeltaPct,
  todayNewUsers,
  avgPercent,
  topSubject,
}: {
  todayUsers: number;
  usersDeltaPct: number;
  todayNewUsers: number;
  avgPercent: number;
  topSubject: any;
}) {
  return (
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
  );
}

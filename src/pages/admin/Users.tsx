import { DataTable } from "@/components/ui/table/datatable";
import { StatCard } from "@/widgets/statistics/ui/stat-cards-statistics";
import { STATUS_FILTERS } from "@/widgets/users/lib/mock-data-users";
import type { StatusFilterKey } from "@/widgets/users/lib/types-users";
import { columns } from "@/widgets/users/lib/user-table-column";
import { buildUsers } from "@/widgets/users/lib/utils";
import { CheckCircle2, Search, UserPlus, UsersIcon } from "lucide-react";
import { useMemo, useState } from "react";

export default function Users() {
  const allUsers = useMemo(buildUsers, []);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilterKey>("barchasi");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allUsers.filter((user) => {
      const matchesQuery =
        !q ||
        user.fullName.toLowerCase().includes(q) ||
        user.phone.replace(/\s/g, "").includes(q.replace(/\s/g, "")) ||
        user.email.toLowerCase().includes(q) ||
        user.userCode.toLowerCase().includes(q);

      const matchesStatus =
        statusFilter === "barchasi" || user.status === statusFilter;

      return matchesQuery && matchesStatus;
    });
  }, [allUsers, query, statusFilter]);

  const totalUsers = allUsers.length;
  const activeUsers = allUsers.filter((u) => u.status === "faol").length;
  const newThisWeek = allUsers.filter((u) => {
    const day = Number(u.joinedAt.slice(0, 2));
    return day >= 19; // demo: oxirgi hafta
  }).length;
  const avgTests = Math.round(
    allUsers.reduce((sum, u) => sum + u.testsTaken, 0) / allUsers.length,
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">
            Foydalanuvchilar
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Platformadagi barcha ro'yxatdan o'tgan foydalanuvchilar ro'yxati
          </p>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Jami foydalanuvchilar"
          value={totalUsers.toLocaleString("ru-RU")}
          icon={<UsersIcon size={18} />}
        />
        <StatCard
          label="Faol foydalanuvchilar"
          value={activeUsers.toLocaleString("ru-RU")}
          icon={<CheckCircle2 size={18} />}
        />
        <StatCard
          label="Yangilar (bu hafta)"
          value={newThisWeek.toLocaleString("ru-RU")}
          icon={<UserPlus size={18} />}
        />
        <StatCard
          label="O'rtacha ishlangan test"
          value={`${avgTests} ta`}
          icon={<UsersIcon size={18} />}
        />
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="relative w-full max-w-xs">
          <Search
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ism, telefon, email yoki ID bo'yicha qidirish"
            className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-[#1A5FA8] focus:outline-none focus:ring-1 focus:ring-[#1A5FA8]"
          />
        </div>

        <div className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white p-1">
          {STATUS_FILTERS.map((filter) => (
            <button
              key={filter.key}
              type="button"
              onClick={() => setStatusFilter(filter.key)}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                statusFilter === filter.key
                  ? "bg-[#1A5FA8] text-white"
                  : "text-slate-500 hover:bg-slate-100"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      <DataTable
        columns={columns}
        data={filtered}
        pageSize={8}
        emptyState={
          <span className="text-sm text-slate-400">
            Qidiruv shartlariga mos foydalanuvchi topilmadi
          </span>
        }
      />
    </div>
  );
}

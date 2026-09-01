import { useMemo, useState } from "react";
import { CheckCircle2, ShieldCheck, Search, UserPlus, UsersIcon } from "lucide-react";
import { DataTable } from "@/components/ui/table/datatable";
import { STATUS_FILTERS } from "@/widgets/users/hook/mock-data-users";
import type { StatusFilterKey } from "@/widgets/users/hook/types-users";
import { columns } from "@/widgets/users/hook/user-table-column";
import { useUser } from "@/widgets/users/hook/useUser";
import { getFullName, isWithinLastDays, safeIncludes } from "@/widgets/users/hook/utils";
import { StatCard } from "@/widgets/users/ui/stat-card-users";

export default function Users() {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilterKey>("barchasi");
  const { allUsers, handleToggleActive } = useUser();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allUsers.filter((user) => {
      const fullName = getFullName(user);
      const matchesQuery =
        !q ||
        fullName.toLowerCase().includes(q) ||
        safeIncludes(user.phone, q.replace(/\s/g, "")) ||
        safeIncludes(user.email, q) ||
        user.id.toLowerCase().includes(q);

      const matchesStatus =
        statusFilter === "barchasi" ||
        (statusFilter === "faol" && user.is_active) ||
        (statusFilter === "bloklangan" && !user.is_active);

      return matchesQuery && matchesStatus;
    });
  }, [allUsers, query, statusFilter]);

  const totalUsers = allUsers.length;
  const activeUsers = allUsers.filter((u) => u.is_active).length;

  // Haqiqiy created_at asosida — oldingi kod noto'g'ri edi (formatlangan
  // sananing birinchi 2 belgisini olib, kunni taqqoslardi, oy chegarasini
  // hisobga olmasdi va haqiqiy maydonga asoslanmagan edi)
  const newThisWeek = allUsers.filter((u) => isWithinLastDays(u.created_at, 7)).length;

  const verifiedUsers = allUsers.filter(
    (u) => u.is_phone_verified || u.is_email_verified,
  ).length;

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

      {/* Stat cards — faqat backend haqiqatan bera oladigan maydonlardan
          hisoblangan (testsTaken/avgScore kabi apps.results'ga bog'liq
          statistikalar hali mavjud emas) */}
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
          label="Yangilar (7 kun)"
          value={newThisWeek.toLocaleString("ru-RU")}
          icon={<UserPlus size={18} />}
        />
        <StatCard
          label="Tasdiqlangan foydalanuvchilar"
          value={verifiedUsers.toLocaleString("ru-RU")}
          icon={<ShieldCheck size={18} />}
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
        columns={columns({ onToggleActive: handleToggleActive })}
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
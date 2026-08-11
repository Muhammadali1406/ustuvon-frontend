import { useMemo } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Bot,
  BookOpen,
  CalendarClock,
  ClipboardList,
  Sparkles,
  Users as UsersIcon,
} from "lucide-react";
import { buildActivity, buildReviewQueue, buildScheduledTests } from "@/widgets/dashboard/ui/build";
import { activityIcon, activityIconTone, confidenceTone, MetricCard, QuickActionCard } from "@/widgets/dashboard/ui/activity-confident-quick-metric";



export default function Dashboard() {
  const activity = useMemo(buildActivity, []);
  const scheduledTests = useMemo(buildScheduledTests, []);
  const reviewQueue = useMemo(buildReviewQueue, []);

  const today = new Date(2026, 6, 25).toLocaleDateString("uz-UZ", {
    day: "numeric",
    month: "long",
    weekday: "long",
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold text-slate-900">
          Xush kelibsiz, Shoxrux
        </h1>
        <p className="mt-1 text-sm capitalize text-slate-500">{today}</p>
      </div>

      {/* Key metrics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          label="Jami foydalanuvchilar"
          value="4 218"
          icon={<UsersIcon size={18} />}
        />
        <MetricCard
          label="Jami testlar"
          value="186"
          icon={<ClipboardList size={18} />}
        />
        <MetricCard
          label="Bugungi faol foydalanuvchilar"
          value="312"
          icon={<UsersIcon size={18} />}
        />
        <MetricCard
          label="AI tekshiruvini kutmoqda"
          value={`${reviewQueue.length} ta test`}
          icon={<Bot size={18} />}
          tone="warning"
        />
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        <QuickActionCard
          to="/admin/tests"
          title="Yangi test yaratish"
          description="Fayl yuklang, AI avtomatik formatlaydi"
          icon={<Sparkles size={19} />}
        />
        <QuickActionCard
          to="/admin/subjects"
          title="Fan qo'shish"
          description="Yangi fan yoki bo'lim yaratish"
          icon={<BookOpen size={19} />}
        />
        <QuickActionCard
          to="/admin/users"
          title="Foydalanuvchilarni ko'rish"
          description="Ro'yxat, faollik va holatni boshqarish"
          icon={<UsersIcon size={19} />}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Recent activity */}
        <div className="rounded-lg border border-slate-200 bg-white p-5 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm font-medium text-slate-700">
              So'nggi faoliyat
            </p>
            <Link
              to="/admin/statistics"
              className="flex items-center gap-1 text-xs font-medium text-[#1A5FA8] hover:underline"
            >
              Statistikaga o'tish
              <ArrowRight size={12} />
            </Link>
          </div>

          <ul className="space-y-4">
            {activity.map((item) => (
              <li key={item.id} className="flex items-start gap-3">
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${activityIconTone(
                    item.type,
                  )}`}
                >
                  {activityIcon(item.type)}
                </span>
                <div className="min-w-0 flex-1 border-b border-slate-100 pb-4 last:border-0 last:pb-0">
                  <p className="truncate text-sm text-slate-800">
                    {item.title}
                  </p>
                  <p className="mt-0.5 text-xs text-slate-400">
                    {item.meta} · {item.time}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Right column */}
        <div className="space-y-4">
          {/* Scheduled tests */}
          <div className="rounded-lg border border-slate-200 bg-white p-5">
            <div className="mb-4 flex items-center gap-2">
              <CalendarClock size={16} className="text-[#1A5FA8]" />
              <p className="text-sm font-medium text-slate-700">
                Rejalashtirilgan testlar
              </p>
            </div>
            <ul className="space-y-3">
              {scheduledTests.map((test) => (
                <li
                  key={test.id}
                  className="rounded-md border border-slate-100 p-3"
                >
                  <p className="text-sm font-medium text-slate-800">
                    {test.subject}
                  </p>
                  <p className="mt-0.5 text-xs text-slate-400">
                    {test.date} · {test.audience}
                  </p>
                  <span
                    className={`mt-2 inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-medium ${
                      test.botNotified
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    <Bot size={11} />
                    {test.botNotified
                      ? "Bot orqali e'lon qilindi"
                      : "Bot xabari kutilmoqda"}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* AI review queue */}
          <div className="rounded-lg border border-slate-200 bg-white p-5">
            <div className="mb-4 flex items-center gap-2">
              <Bot size={16} className="text-[#1A5FA8]" />
              <p className="text-sm font-medium text-slate-700">
                AI tekshiruvini kutayotgan testlar
              </p>
            </div>
            <ul className="space-y-3">
              {reviewQueue.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between gap-3 rounded-md border border-slate-100 p-3"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-slate-800">
                      {item.subject}
                    </p>
                    <p className="mt-0.5 text-xs text-slate-400">
                      {item.questionsCount} ta savol · {item.uploadedAt}
                    </p>
                  </div>
                  <span
                    className={`shrink-0 rounded-md px-2 py-0.5 text-xs font-medium ${confidenceTone(
                      item.confidence,
                    )}`}
                  >
                    {item.confidence}%
                  </span>
                </li>
              ))}
            </ul>
            <Link
              to="/admin/tests"
              className="mt-4 flex items-center justify-center gap-1 rounded-md border border-slate-200 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50"
            >
              Barchasini tekshirish
              <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
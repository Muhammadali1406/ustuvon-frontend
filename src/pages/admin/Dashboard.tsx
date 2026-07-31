import { useMemo } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Bot,
  BookOpen,
  CalendarClock,
  ClipboardList,
  FileCheck2,
  Sparkles,
  UserPlus,
  Users as UsersIcon,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type ActivityType = "registration" | "result" | "test_created" | "payment";

interface ActivityItem {
  id: string;
  type: ActivityType;
  title: string;
  meta: string;
  time: string; // "5 daqiqa oldin"
}

interface ScheduledTest {
  id: string;
  subject: string;
  date: string; // "28.07.2026"
  audience: string; // "Milliy Sertifikat guruhi"
  botNotified: boolean;
}

interface ReviewQueueItem {
  id: string;
  subject: string;
  questionsCount: number;
  uploadedAt: string; // "2 soat oldin"
  confidence: number; // AI formatlash ishonchliligi, foizda
}

// ---------------------------------------------------------------------------
// Demo data
// Backend tayyor bo'lgach bu joyga GET /admin/dashboard so'rovi ulanadi.
// ---------------------------------------------------------------------------

function buildActivity(): ActivityItem[] {
  return [
    {
      id: "a1",
      type: "result",
      title: "Malika Islomova IELTS — Variant 9 testini yakunladi",
      meta: "89% natija bilan",
      time: "6 daqiqa oldin",
    },
    {
      id: "a2",
      type: "registration",
      title: "Sherzod Ubaydullayev ro'yxatdan o'tdi",
      meta: "Telefon orqali tasdiqlandi",
      time: "18 daqiqa oldin",
    },
    {
      id: "a3",
      type: "payment",
      title: "Premium test uchun to'lov qabul qilindi",
      meta: "45 000 so'm — Dilnoza Rashidova",
      time: "42 daqiqa oldin",
    },
    {
      id: "a4",
      type: "test_created",
      title: "\"Fizika — Milliy Sertifikat\" testi AI orqali yaratildi",
      meta: "30 ta savol, tekshiruv kutilmoqda",
      time: "1 soat oldin",
    },
    {
      id: "a5",
      type: "result",
      title: "Sardor Aliyev Matematika — Variant 3 testini yakunladi",
      meta: "94% natija bilan",
      time: "2 soat oldin",
    },
    {
      id: "a6",
      type: "registration",
      title: "Zarina Komilova ro'yxatdan o'tdi",
      meta: "Email orqali tasdiqlandi",
      time: "3 soat oldin",
    },
  ];
}

function buildScheduledTests(): ScheduledTest[] {
  return [
    {
      id: "s1",
      subject: "Milliy Sertifikat — Matematika",
      date: "28.07.2026, 10:00",
      audience: "1 240 obunachi",
      botNotified: true,
    },
    {
      id: "s2",
      subject: "DTM — To'liq blok",
      date: "02.08.2026, 09:00",
      audience: "3 480 obunachi",
      botNotified: true,
    },
    {
      id: "s3",
      subject: "IELTS Mock — Reading",
      date: "05.08.2026, 15:00",
      audience: "612 obunachi",
      botNotified: false,
    },
  ];
}

function buildReviewQueue(): ReviewQueueItem[] {
  return [
    {
      id: "r1",
      subject: "Fizika — Milliy Sertifikat",
      questionsCount: 30,
      uploadedAt: "1 soat oldin",
      confidence: 92,
    },
    {
      id: "r2",
      subject: "IELTS — Reading Passage 3",
      questionsCount: 13,
      uploadedAt: "3 soat oldin",
      confidence: 76,
    },
    {
      id: "r3",
      subject: "Matematika — DTM to'plami",
      questionsCount: 45,
      uploadedAt: "5 soat oldin",
      confidence: 98,
    },
  ];
}

// ---------------------------------------------------------------------------
// Small presentational pieces
// ---------------------------------------------------------------------------

function MetricCard({
  label,
  value,
  icon,
  tone = "default",
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  tone?: "default" | "warning";
}) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5">
      <div className="flex items-start justify-between">
        <p className="text-sm text-slate-500">{label}</p>
        <span
          className={`flex h-9 w-9 items-center justify-center rounded-md ${
            tone === "warning"
              ? "bg-amber-50 text-amber-600"
              : "bg-[#1A5FA8]/10 text-[#1A5FA8]"
          }`}
        >
          {icon}
        </span>
      </div>
      <p className="mt-3 text-2xl font-semibold text-slate-900">{value}</p>
    </div>
  );
}

function QuickActionCard({
  to,
  title,
  description,
  icon,
}: {
  to: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <Link
      to={to}
      className="group flex items-center gap-4 rounded-lg border border-slate-200 bg-white p-5 transition-colors hover:border-[#1A5FA8]/40 hover:bg-[#1A5FA8]/5"
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-[#1A5FA8]/10 text-[#1A5FA8]">
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="font-medium text-slate-800">{title}</p>
        <p className="truncate text-sm text-slate-500">{description}</p>
      </div>
      <ArrowRight
        size={16}
        className="shrink-0 text-slate-300 transition-transform group-hover:translate-x-0.5 group-hover:text-[#1A5FA8]"
      />
    </Link>
  );
}

function activityIcon(type: ActivityType) {
  switch (type) {
    case "registration":
      return <UserPlus size={15} />;
    case "result":
      return <FileCheck2 size={15} />;
    case "test_created":
      return <Sparkles size={15} />;
    case "payment":
      return <ClipboardList size={15} />;
  }
}

function activityIconTone(type: ActivityType) {
  switch (type) {
    case "registration":
      return "bg-sky-50 text-sky-600";
    case "result":
      return "bg-emerald-50 text-emerald-600";
    case "test_created":
      return "bg-violet-50 text-violet-600";
    case "payment":
      return "bg-amber-50 text-amber-600";
  }
}

function confidenceTone(confidence: number) {
  if (confidence >= 90) return "text-emerald-600 bg-emerald-50";
  if (confidence >= 80) return "text-amber-600 bg-amber-50";
  return "text-rose-600 bg-rose-50";
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

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
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
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
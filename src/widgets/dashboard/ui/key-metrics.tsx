import {
  AlertTriangle,
  Bot,
  ClipboardList,
  UserCheck,
  UsersIcon,
  Award,
} from "lucide-react";
import { MetricCard } from "./activity-confident-quick-metric";

// ---------------------------------------------------------------------------
// GET /admin-panel/dashboard/ javobiga mos tip
// ---------------------------------------------------------------------------

export interface DashboardMetrics {
  ai_parser_failed: number;
  ai_parser_needs_review: number;
  ai_parser_pending: number;
  ai_parser_published: number;
  new_users_last_7_days: number;
  total_examinations: number;
  total_questions: number;
  total_subjects: number;
  total_users: number;
  verified_users: number;
}

interface KeyMetricsProps {
  metrics?: DashboardMetrics;
}

const EMPTY_METRICS: DashboardMetrics = {
  ai_parser_failed: 0,
  ai_parser_needs_review: 0,
  ai_parser_pending: 0,
  ai_parser_published: 0,
  new_users_last_7_days: 0,
  total_examinations: 0,
  total_questions: 0,
  total_subjects: 0,
  total_users: 0,
  verified_users: 0,
};

function formatCount(value: number): string {
  return value.toLocaleString("ru-RU");
}

export default function KeyMetrics({ metrics }: KeyMetricsProps) {
  const m = metrics ?? EMPTY_METRICS;
  const aiQueueCount = m.ai_parser_needs_review + m.ai_parser_pending;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <MetricCard
        label="Jami foydalanuvchilar"
        value={formatCount(m.total_users)}
        icon={<UsersIcon size={18} />}
      />
      <MetricCard
        label="Tasdiqlangan foydalanuvchilar"
        value={formatCount(m.verified_users)}
        icon={<UserCheck size={18} />}
      />
      <MetricCard
        label="Yangi foydalanuvchilar (7 kun)"
        value={formatCount(m.new_users_last_7_days)}
        icon={<UsersIcon size={18} />}
      />
      <MetricCard
        label="Jami fanlar"
        value={formatCount(m.total_subjects)}
        icon={<Award size={18} />}
      />
      <MetricCard
        label="Jami testlar"
        value={formatCount(m.total_examinations)}
        icon={<ClipboardList size={18} />}
      />
      <MetricCard
        label="AI tekshiruvini kutmoqda"
        value={`${formatCount(aiQueueCount)} ta`}
        icon={<Bot size={18} />}
        tone={aiQueueCount > 0 ? "warning" : "default"}
      />

      {m.ai_parser_failed > 0 && (
        <MetricCard
          label="AI: muvaffaqiyatsiz"
          value={`${formatCount(m.ai_parser_failed)} ta`}
          icon={<AlertTriangle size={18} />}
          tone="warning"
        />
      )}
    </div>
  );
}
import KeyMetrics from "@/widgets/dashboard/ui/key-metrics";
import QuickAction from "@/widgets/dashboard/ui/quick-action";
import ScheduleTest from "@/widgets/dashboard/ui/schedule-test";
import AiReview from "@/widgets/dashboard/ui/ai-review";
import RecentActivity from "@/widgets/dashboard/ui/recent-activity";

export default function Dashboard() {
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

      <KeyMetrics />

      <QuickAction />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Recent activity */}
        <RecentActivity />

        {/* Right column */}
        <div className="space-y-4">
          {/* Scheduled tests */}
          <ScheduleTest />

          {/* AI review queue */}
          <AiReview />
        </div>
      </div>
    </div>
  );
}

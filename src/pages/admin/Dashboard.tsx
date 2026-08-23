import KeyMetrics from "@/widgets/dashboard/ui/key-metrics";
import QuickAction from "@/widgets/dashboard/ui/quick-action";
// import ScheduleTest from "@/widgets/dashboard/ui/schedule-test";
// import AiReview from "@/widgets/dashboard/ui/ai-review";
// import RecentActivity from "@/widgets/dashboard/ui/recent-activity";
import { useDashboard } from "@/widgets/dashboard/hook/useDashboard";

export default function Dashboard() {
  const today = new Date(2026, 6, 25).toLocaleDateString("uz-UZ", {
    day: "numeric",
    month: "long",
    weekday: "long",
  });

  const { dashboard } = useDashboard();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold text-slate-900">
          Xush kelibsiz, Shoxrux
        </h1>
        <p className="mt-1 text-sm capitalize text-slate-500">{today}</p>
      </div>

      <KeyMetrics metrics={dashboard} />

      <QuickAction />

      {/* <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <RecentActivity />

        <div className="space-y-4">
          <ScheduleTest />
          <AiReview />
        </div>
      </div> */}
    </div>
  );
}

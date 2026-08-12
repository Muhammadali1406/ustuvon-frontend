import { MetricCard } from "./activity-confident-quick-metric";
import { Bot, ClipboardList, UsersIcon } from "lucide-react";
import { buildReviewQueue } from "./build";

export default function KeyMetrics() {
  return (
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
        value={`${buildReviewQueue.length} ta test`}
        icon={<Bot size={18} />}
        tone="warning"
      />
    </div>
  );
}

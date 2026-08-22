import { StatCard } from "./stat-card-user-profile";
import { Sparkles, Target, Trophy } from "lucide-react";

export default function StatUserProfile() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      <StatCard
        icon={<Target size={16} />}
        label="Ishlangan testlar"
        value={`${0} ta`}
      />
      <StatCard
        icon={<Sparkles size={16} />}
        label="O'rtacha natija"
        value={`${0}%`}
      />
      <StatCard
        icon={<Trophy size={16} />}
        label="Eng yaxshi natija"
        value={`${0}%`}
      />
    </div>
  );
}

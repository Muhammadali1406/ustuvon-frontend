import { StatCard } from "./stat-card-user-profile";
import { Sparkles, Target, Trophy } from "lucide-react";
import { DEMO_USER } from "@/widgets/user-home/hook/demo-data";

export default function StatUserProfile() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      <StatCard
        icon={<Target size={16} />}
        label="Ishlangan testlar"
        value={`${DEMO_USER.testsTaken} ta`}
      />
      <StatCard
        icon={<Sparkles size={16} />}
        label="O'rtacha natija"
        value={`${DEMO_USER.avgScore}%`}
      />
      <StatCard
        icon={<Trophy size={16} />}
        label="Eng yaxshi natija"
        value={`${DEMO_USER.bestScore}%`}
      />
    </div>
  );
}

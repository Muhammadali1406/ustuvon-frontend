import { useAuthStore } from "@/components/zustand/auth-info";
import { initials } from "../hook/utils";
import { Calendar } from "lucide-react";
import { DEMO_USER } from "@/widgets/user-home/hook/demo-data";

export default function Header() {
  const user = useAuthStore((state) => state.user);
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-black/8 bg-white p-5">
      <div className="flex items-center gap-4">
        <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#E7F8E8] text-xl font-semibold text-[#0B8E0F]">
          {initials(user?.first_name || DEMO_USER.first_name)}
        </span>
        <div>
          <p className="text-lg font-semibold text-slate-900">
            {user?.first_name || DEMO_USER.first_name}
          </p>
          <p className="text-sm text-slate-500">{user?.id || DEMO_USER.id}</p>
          <p className="mt-1 flex items-center gap-1 text-xs text-slate-400">
            <Calendar size={12} />
            {user?.created_at || DEMO_USER.created_at} sanasida qo'shilgan
          </p>
        </div>
      </div>
    </div>
  );
}

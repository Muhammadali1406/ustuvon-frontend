import { DEMO_USER } from "@/pages/user/user-layout";
import { initials } from "../hook/utils";
import { Calendar } from "lucide-react";

export default function Header() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-black/8 bg-white p-5">
      <div className="flex items-center gap-4">
        <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#E7F8E8] text-xl font-semibold text-[#0B8E0F]">
          {initials(DEMO_USER.fullName)}
        </span>
        <div>
          <p className="text-lg font-semibold text-slate-900">
            {DEMO_USER.fullName}
          </p>
          <p className="text-sm text-slate-500">{DEMO_USER.userCode}</p>
          <p className="mt-1 flex items-center gap-1 text-xs text-slate-400">
            <Calendar size={12} />
            {DEMO_USER.joinedAt} sanasida qo'shilgan
          </p>
        </div>
      </div>
    </div>
  );
}

import { type Subject } from "@/widgets/user-subject/hook/subject-data";
import { Link } from "lucide-react";

export function SubjectCard({ subject }: { subject: Subject }) {
  const Icon = subject.icon;
  return (
    <Link
      to={`/app/subjects/${subject.id}`}
      className="group rounded-xl border border-black/8 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-[#0EBE15]/40 hover:shadow-md hover:shadow-[#0EBE15]/10"
    >
      <div className="flex items-start justify-between">
        <span className="flex h-11 w-11 items-center justify-center rounded-md bg-[#E7F8E8] text-[#0B8E0F] transition-colors group-hover:bg-[#0EBE15] group-hover:text-white">
          <Icon size={20} />
        </span>
        <span className="rounded-md bg-slate-50 px-2 py-1 text-[11px] font-medium text-slate-500">
          {subject.category}
        </span>
      </div>

      <p className="mt-4 text-base font-semibold text-slate-900">
        {subject.name}
      </p>
      <p className="mt-1 text-sm leading-relaxed text-slate-500">
        {subject.description}
      </p>
      <p className="mt-3 text-xs font-medium text-[#0B8E0F]">
        {subject.testCount} ta test mavjud
      </p>
    </Link>
  );
}

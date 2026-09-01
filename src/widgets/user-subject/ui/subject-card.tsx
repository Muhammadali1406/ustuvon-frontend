import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";
import type { FlatSubject } from "../hook/subject-types";

interface SubjectCardProps {
  subject: FlatSubject;
}

// Diqqat: backend har bir fan uchun icon ma'lumoti bermaydi (avvalgi
// mock'da har bir fanga qo'lda icon biriktirilgan edi — bu haqiqiy
// ma'lumotda yo'q). Shuning uchun umumiy icon ishlatiladi. Agar backend
// kelajakda subject uchun icon/rang maydoni qo'shsa, shu joy shunga
// almashtiriladi.
export function SubjectCard({ subject }: SubjectCardProps) {
  return (
    <Link
      to={`/app/subjects/${subject.id}`}
      className="group rounded-xl border border-black/8 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-[#0EBE15]/40 hover:shadow-md hover:shadow-[#0EBE15]/10"
    >
      <div className="flex items-start justify-between">
        <span className="flex h-11 w-11 items-center justify-center rounded-md bg-[#E7F8E8] text-[#0B8E0F] transition-colors group-hover:bg-[#0EBE15] group-hover:text-white">
          <BookOpen size={20} />
        </span>
        <span className="rounded-md bg-slate-50 px-2 py-1 text-[11px] font-medium text-slate-500">
          {subject.categoryTitle}
        </span>
      </div>

      <p className="mt-4 text-base font-semibold capitalize text-slate-900">
        {subject.title}
      </p>

      {subject.description && (
        <p className="mt-1 text-sm leading-relaxed text-slate-500">
          {subject.description}
        </p>
      )}

      {subject.modules.length > 0 && (
        <p className="mt-3 text-xs font-medium text-[#0B8E0F]">
          {subject.modules.length} ta modul
        </p>
      )}
    </Link>
  );
}
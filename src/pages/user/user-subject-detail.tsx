import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Clock, FileQuestion, Users2 } from "lucide-react";
import { SUBJECT_CATALOG } from "@/widgets/user-subject/hook/subject-data";
import { TEST_VARIANTS } from "@/widgets/user-subject/hook/test-data";

export default function SubjectDetail() {
  const { subjectId } = useParams<{ subjectId: string }>();

  const subject = SUBJECT_CATALOG.find((s) => s.id === subjectId);
  const variants = subjectId ? TEST_VARIANTS[subjectId] ?? [] : [];

  if (!subject) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-[#0B8E0F]">
          404
        </p>
        <h1 className="mt-2 text-xl font-semibold text-slate-900">
          Bunday fan topilmadi
        </h1>
        <Link
          to="/app/subjects"
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-[#0B8E0F] hover:underline"
        >
          <ArrowLeft size={14} />
          Fanlarga qaytish
        </Link>
      </div>
    );
  }

  const Icon = subject.icon;

  return (
    <div className="space-y-6">
      <Link
        to="/app/subjects"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-800"
      >
        <ArrowLeft size={14} />
        Fanlarga qaytish
      </Link>

      {/* Subject header */}
      <div className="flex items-start gap-4 rounded-xl border border-black/8 bg-white p-5">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-[#E7F8E8] text-[#0B8E0F]">
          <Icon size={22} />
        </span>
        <div>
          <span className="rounded-md bg-slate-50 px-2 py-0.5 text-[11px] font-medium text-slate-500">
            {subject.category}
          </span>
          <h1 className="mt-1.5 text-lg font-semibold text-slate-900">
            {subject.name}
          </h1>
          <p className="mt-1 text-sm text-slate-500">{subject.description}</p>
        </div>
      </div>

      {/* Test variants */}
      <div>
        <h2 className="text-base font-semibold text-slate-900">
          Mavjud testlar
        </h2>

        {variants.length > 0 ? (
          <div className="mt-4 divide-y divide-black/5 rounded-xl border border-black/8 bg-white">
            {variants.map((variant) => (
              <div
                key={variant.id}
                className="flex flex-wrap items-center justify-between gap-3 px-5 py-4"
              >
                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    {subject.name} — {variant.title}
                  </p>
                  <div className="mt-1.5 flex flex-wrap items-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <FileQuestion size={13} />
                      {variant.questionCount} ta savol
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={13} />
                      {variant.durationMinutes} daqiqa
                    </span>
                    <span className="flex items-center gap-1">
                      <Users2 size={13} />
                      {variant.attemptsCount} marta ishlangan
                    </span>
                  </div>
                </div>

                <Link
                  to={`/app/subjects/${subject.id}/tests/${variant.id}`}
                  className="rounded-lg bg-[#0EBE15] px-4 py-2 text-sm font-semibold text-[#101826] transition-colors hover:bg-[#09720C] hover:text-white"
                >
                  Boshlash
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-4 rounded-xl border border-black/8 bg-white py-16 text-center">
            <p className="text-sm text-slate-400">
              Bu fan uchun hozircha test mavjud emas
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
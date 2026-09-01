import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Clock, FileQuestion } from "lucide-react";
import { useSubjectDetail } from "@/widgets/user-subject-detail/useSubjectDetail";
import { useSubject } from "@/widgets/user-subject/hook/useSubject";
import { formatRawLabel } from "@/widgets/test/hook/test-types";

export default function SubjectDetail() {
  const { subjectId } = useParams<{ subjectId: string }>();
  const { examinations, isLoading: examsLoading } = useSubjectDetail();
  const { categories, isLoading: categoriesLoading } = useSubject();

  // Fan sarlavhasi (nomi, kategoriyasi, tavsifi) uchun HAQIQIY ma'lumotni
  // taxonomy daraxtidan topamiz — bu ma'lumot examinations javobida yo'q.
  const subject = categories
    .flatMap((category) =>
      category.subjects.map((s) => ({ ...s, categoryTitle: category.title })),
    )
    .find((s) => String(s.id) === subjectId);

  // MUHIM: GET /exams/examinations/ javobida hech qanday fan bilan
  // bog'lanish maydoni (masalan subject_id) yo'q. Shuning uchun hozircha
  // qaysi fan bosilishidan qat'iy nazar BARCHA faol testlar ko'rsatiladi.
  // Backend testlarni fanga bog'lasa, shu joyga filtr qo'shiladi, masalan:
  //   examinations.filter((t) => t.subject_id === Number(subjectId))
  const activeTests = examinations.filter((test) => test.is_active);

  const isLoading = examsLoading || categoriesLoading;

  if (!isLoading && !subject) {
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
      {subject && (
        <div className="rounded-xl border border-black/8 bg-white p-5">
          <span className="rounded-md bg-slate-50 px-2 py-0.5 text-[11px] font-medium text-slate-500">
            {subject.categoryTitle}
          </span>
          <h1 className="mt-1.5 text-lg font-semibold capitalize text-slate-900">
            {subject.title}
          </h1>
          {subject.description && (
            <p className="mt-1 text-sm text-slate-500">{subject.description}</p>
          )}
        </div>
      )}

      {/* Tests */}
      <div>
        <h2 className="text-base font-semibold text-slate-900">
          Mavjud testlar
        </h2>

        {isLoading ? (
          <div className="mt-4 rounded-xl border border-black/8 bg-white py-16 text-center">
            <p className="text-sm text-slate-400">Yuklanmoqda…</p>
          </div>
        ) : activeTests.length > 0 ? (
          <div className="mt-4 divide-y divide-black/5 rounded-xl border border-black/8 bg-white">
            {activeTests.map((test) => (
              <div
                key={test.id}
                className="flex flex-wrap items-center justify-between gap-3 px-5 py-4"
              >
                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    {test.title}
                  </p>
                  <div className="mt-1.5 flex flex-wrap items-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <FileQuestion size={13} />
                      {test.questions_count} ta savol
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={13} />
                      {test.duration_time} daqiqa
                    </span>
                    <span className="rounded-md bg-slate-50 px-2 py-0.5 text-[11px] font-medium text-slate-500">
                      {formatRawLabel(test.test_type)} · {test.level.toUpperCase()}
                    </span>
                  </div>
                </div>

                <Link
                  to={`/app/subjects/${subjectId}/tests/${test.id}`}
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
              Hozircha faol test mavjud emas
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
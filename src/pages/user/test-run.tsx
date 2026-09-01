import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Clock, Loader2 } from "lucide-react";
import { SUBJECT_CATALOG } from "@/widgets/user-subject/hook/subject-data";
import { useTestRun } from "@/widgets/test-run/useTestRun";

function formatTime(totalSeconds: number) {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  return h > 0 ? `${pad(h)}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`;
}

export default function TestRun() {
  const { subjectId, testId } = useParams<{ subjectId: string; testId: string }>();
  const subject = SUBJECT_CATALOG.find((s) => s.id === subjectId);

  const {
    testRun,
    isLoading,
    isError,
    phase,
    currentIndex,
    currentQuestion,
    totalQuestions,
    answers,
    answeredCount,
    secondsLeft,
    isStarting,
    isSubmitting,
    handleStart,
    selectAnswer,
    goToQuestion,
    handleNext,
    handlePrev,
    handleSubmit,
  } = useTestRun({ testId: testId!, subjectId: subjectId! });

  const backLink = subject ? `/app/subjects/${subject.id}` : "/app/subjects";

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 text-slate-500">
        <Loader2 className="animate-spin" size={24} />
        <p className="text-sm">Test yuklanmoqda...</p>
      </div>
    );
  }

  if (isError || !testRun) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <p className="text-sm font-medium text-red-500">Testni yuklashda xatolik yuz berdi.</p>
        <Link to={backLink} className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[#0B8E0F] hover:underline">
          <ArrowLeft size={14} />
          Orqaga qaytish
        </Link>
      </div>
    );
  }

  if (phase === "intro") {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center text-center">
        <span className="rounded-full bg-[#E7F8E8] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#0B8E0F]">
          {testRun.test_type} · {testRun.level}
        </span>
        <h1 className="mt-4 text-2xl font-semibold text-slate-900">{testRun.title}</h1>
        <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
          <Clock size={16} />
          <span>{formatTime(testRun.duration_time)}</span>
          <span className="text-slate-300">•</span>
          <span>{testRun.questions.length} ta savol</span>
        </div>
        <button
          onClick={handleStart}
          disabled={isStarting}
          className="mt-8 inline-flex items-center justify-center rounded-xl bg-[#0B8E0F] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#097a0c] disabled:opacity-60"
        >
          {isStarting ? "Boshlanmoqda..." : "Testni boshlash"}
        </button>
        <Link to={backLink} className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:underline">
          <ArrowLeft size={14} />
          Orqaga qaytish
        </Link>
      </div>
    );
  }

  if (!currentQuestion) return null;

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-2xl flex-col">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <p className="text-sm font-medium text-slate-900">{testRun.title}</p>
          <p className="text-xs text-slate-500">
            {currentIndex + 1} / {totalQuestions} savol · {answeredCount} ta javob berildi
          </p>
        </div>
        <div className="flex items-center gap-1.5 rounded-lg bg-[#E7F8E8] px-3 py-1.5 text-sm font-semibold text-[#0B8E0F]">
          <Clock size={14} />
          {formatTime(secondsLeft)}
        </div>
      </div>

      <div className="mt-6 flex-1">
        <p className="text-base font-medium text-slate-900">{currentQuestion.text}</p>
        <div className="mt-4 flex flex-col gap-2">
          {currentQuestion.options.map((option) => {
            const isSelected = answers[currentQuestion.id] === option.id;
            return (
              <button
                key={option.id}
                onClick={() => selectAnswer(currentQuestion.id, option.id)}
                className={`rounded-xl border px-4 py-3 text-left text-sm transition ${
                  isSelected
                    ? "border-[#0B8E0F] bg-[#E7F8E8] text-[#0B8E0F]"
                    : "border-slate-200 text-slate-700 hover:border-slate-300"
                }`}
              >
                {option.text}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-1.5">
        {testRun.questions.map((q, idx) => {
          const answered = Boolean(answers[q.id]);
          const isActive = idx === currentIndex;
          return (
            <button
              key={q.id}
              onClick={() => goToQuestion(idx)}
              className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-medium transition ${
                isActive ? "bg-[#0B8E0F] text-white" : answered ? "bg-[#E7F8E8] text-[#0B8E0F]" : "bg-slate-100 text-slate-500"
              }`}
            >
              {idx + 1}
            </button>
          );
        })}
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 disabled:opacity-40"
        >
          Oldingi
        </button>

        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="rounded-xl bg-[#0B8E0F] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#097a0c] disabled:opacity-60"
        >
          {isSubmitting ? "Yuborilmoqda..." : "Topshirish"}
        </button>

        {currentIndex < totalQuestions - 1 && (
          <button onClick={handleNext} className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white">
            Keyingi
          </button>
        )}
      </div>
    </div>
  );
}
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Construction } from "lucide-react";
import { SUBJECT_CATALOG } from "@/widgets/user-subject/hook/subject-data";
import { useTestRun } from "@/widgets/test-run/useTestRun";

export default function TestRun() {
  const { subjectId, testId } = useParams<{
    subjectId: string;
    testId: string;
  }>();
  const subject = SUBJECT_CATALOG.find((s) => s.id === subjectId);
  const { testRun } = useTestRun({
    testId: testId!,
    subjectId: subjectId!,
  });
  console.log("testRun", testRun);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E7F8E8] text-[#0B8E0F]">
        <Construction size={20} />
      </span>
      <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-[#0B8E0F]">
        Test ishlash interfeysi
      </p>
      <h1 className="mt-2 text-xl font-semibold text-slate-900">
        {subject ? `${subject.name} — ` : ""}
        {testId} tez orada boshlanadi
      </h1>
      <p className="mt-2 max-w-sm text-sm text-slate-500">
        Savollar, vaqt hisoblagich va javob varag'i shu yerda ishlaydi — keyingi
        navbatda quramiz.
      </p>
      <Link
        to={subject ? `/app/subjects/${subject.id}` : "/app/subjects"}
        className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-[#0B8E0F] hover:underline"
      >
        <ArrowLeft size={14} />
        Orqaga qaytish
      </Link>
    </div>
  );
}

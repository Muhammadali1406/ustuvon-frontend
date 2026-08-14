import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { ChevronDown, Sparkles, Target, Trophy } from "lucide-react";
import {
  BEST_RESULTS,
  DEMO_USER,
  INITIAL_SUBJECT_COUNT,
  RECENT_RESULTS,
} from "@/widgets/user-home/hook/demo-data";
import {
  percentTone,
  StatChip,
  SubjectCard,
} from "@/widgets/user-home/ui/presentational-pieces";
import { SUBJECT_CATALOG } from "@/widgets/user-subject/hook/subject-data";

export default function Home() {
  const [showAllSubjects, setShowAllSubjects] = useState(false);
 
  const firstName = DEMO_USER.fullName.split(" ")[0];
  const today = useMemo(
    () =>
      new Date(2026, 6, 12).toLocaleDateString("uz-UZ", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
    [],
  );
 
  const visibleSubjects = showAllSubjects
    ? SUBJECT_CATALOG
    : SUBJECT_CATALOG.slice(0, INITIAL_SUBJECT_COUNT);
 
  return (
    <div className="space-y-8">
      {/* Greeting */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">
            Xayrli kun, {firstName}!
          </h1>
          <p className="mt-1 text-sm text-slate-500">{today}</p>
        </div>
 
        <div className="flex flex-wrap gap-3">
          <StatChip
            icon={<Target size={16} />}
            label="Ishlangan testlar"
            value={`${DEMO_USER.testsTaken} ta`}
          />
          <StatChip
            icon={<Sparkles size={16} />}
            label="O'rtacha ball"
            value={`${DEMO_USER.avgScore}%`}
          />
        </div>
      </div>
 
      {/* Subjects */}
      <section>
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-slate-900">Fanlar</h2>
          <Link
            to="/app/subjects"
            className="text-sm font-medium text-[#0B8E0F] hover:underline"
          >
            Barchasi
          </Link>
        </div>
 
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {visibleSubjects.map((subject) => (
            <SubjectCard key={subject.id} subject={subject} />
          ))}
        </div>
 
        {SUBJECT_CATALOG.length > INITIAL_SUBJECT_COUNT && (
          <button
            type="button"
            onClick={() => setShowAllSubjects((v) => !v)}
            className="mx-auto mt-4 flex items-center gap-1.5 rounded-lg border border-black/8 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:border-[#0EBE15]/40 hover:text-[#0B8E0F]"
          >
            {showAllSubjects ? "Kamroq ko'rsatish" : "Ko'proq"}
            <ChevronDown
              size={15}
              className={`transition-transform ${showAllSubjects ? "rotate-180" : ""}`}
            />
          </button>
        )}
      </section>
 
      {/* Recent results */}
      <section>
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-slate-900">
            Oxirgi natijalar
          </h2>
          <Link
            to="/app/results"
            className="text-sm font-medium text-[#0B8E0F] hover:underline"
          >
            Barchasi
          </Link>
        </div>
 
        <div className="mt-4 divide-y divide-black/5 rounded-xl border border-black/8 bg-white">
          {RECENT_RESULTS.map((result) => (
            <div key={result.id} className="flex items-center gap-3 px-4 py-3">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-slate-800">
                  {result.subject}
                </p>
                <p className="truncate text-xs text-slate-500">{result.test}</p>
              </div>
              <span className={`text-sm font-semibold ${percentTone(result.percent)}`}>
                {result.percent}%
              </span>
              <span className="hidden shrink-0 text-xs text-slate-400 sm:block">
                {result.date}
              </span>
            </div>
          ))}
        </div>
      </section>
 
      {/* Best results */}
      <section>
        <h2 className="text-base font-semibold text-slate-900">
          Eng yaxshi natijalarim
        </h2>
 
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {BEST_RESULTS.map((result, index) => (
            <div
              key={result.id}
              className="rounded-xl border border-black/8 bg-white p-4"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E7F8E8] text-[#0B8E0F]">
                  <Trophy size={15} />
                </span>
                {result.percent >= 85 && (
                  <span className="rounded-md bg-amber-50 px-2 py-0.5 text-[11px] font-medium text-amber-700">
                    Sertifikat
                  </span>
                )}
              </div>
              <p className="mt-3 text-sm font-medium text-slate-800">
                {result.subject}
              </p>
              <p className="text-xs text-slate-500">{result.test}</p>
              <div className="mt-2 flex items-center justify-between">
                <span className={`text-lg font-semibold ${percentTone(result.percent)}`}>
                  {result.percent}%
                </span>
                <span className="text-xs text-slate-400">#{index + 1}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

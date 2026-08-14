import { RESULT_HISTORY } from "@/widgets/user-result/hook/user-result-data";
import { Award } from "lucide-react";
import { useMemo } from "react";

export default function SertificateUserProfile() {
  const certificates = useMemo(() => {
    const bestBySubject = new Map<string, (typeof RESULT_HISTORY)[number]>();
    for (const result of RESULT_HISTORY) {
      const current = bestBySubject.get(result.subjectId);
      if (!current || result.percent > current.percent) {
        bestBySubject.set(result.subjectId, result);
      }
    }
    return [...bestBySubject.values()]
      .filter((r) => r.percent >= 85)
      .sort((a, b) => b.percent - a.percent);
  }, []);
  return (
    <div>
      {certificates.length > 0 && (
        <div className="rounded-xl border border-black/8 bg-white p-5">
          <p className="text-sm font-semibold text-slate-900">
            Sertifikatlarim
          </p>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {certificates.map((cert) => (
              <div
                key={cert.id}
                className="flex items-center gap-3 rounded-lg border border-amber-100 bg-amber-50/50 px-4 py-3"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700">
                  <Award size={16} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-slate-800">
                    {cert.subjectName}
                  </p>
                  <p className="text-xs text-slate-500">{cert.date}</p>
                </div>
                <span className="text-sm font-semibold text-amber-700">
                  {cert.percent}%
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

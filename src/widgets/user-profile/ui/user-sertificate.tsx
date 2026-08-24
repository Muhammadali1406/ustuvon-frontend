import { Award, Download } from "lucide-react";
import type { CertificateTypes } from "../hook/types";
import { EmptyState } from "@/components/ui/emptState";

interface CertificateProps {
  certificates: CertificateTypes | undefined;
}

const STATUS_LABEL: Record<string, string> = {
  pending: "Tayyorlanmoqda",
  generated: "Tayyor",
  failed: "Xatolik",
};

const STATUS_TONE: Record<string, string> = {
  pending: "bg-amber-50 text-amber-700",
  generated: "bg-emerald-50 text-emerald-700",
  failed: "bg-rose-50 text-rose-700",
};

export default function SertificateUserProfile({
  certificates,
}: CertificateProps) {
  const certificateList = certificates?.results ?? [];

  return (
    <div className="rounded-xl border border-black/8 bg-white p-5">
      <p className="text-sm font-semibold text-slate-900">Sertifikatlarim</p>

      {certificateList.length > 0 ? (
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {certificateList.map((cert) => (
            <div
              key={cert.id}
              className="flex items-center gap-3 rounded-lg border border-amber-100 bg-amber-50/50 px-4 py-3"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700">
                <Award size={16} />
              </span>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-slate-800">
                  {cert.certificate_number}
                </p>
                <p className="text-xs text-slate-500">
                  {new Date(cert.created_at).toLocaleDateString("uz-UZ")}
                </p>
              </div>

              <span
                className={`rounded-md px-2 py-0.5 text-xs font-medium ${STATUS_TONE[cert.status]}`}
              >
                {STATUS_LABEL[cert.status]}
              </span>

              {cert.pdf_file && cert.status === "generated" && (
                <a
                  href={cert.pdf_file}
                  target="_blank"
                  rel="noreferrer"
                  title="PDF yuklab olish"
                  className="text-amber-700 transition-colors hover:text-amber-900"
                >
                  <Download size={16} />
                </a>
              )}
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Award}
          title="Hali sertifikatingiz yo'q"
          description="Testlarda yuqori natija ko'rsatib, birinchi sertifikatingizni qo'lga kiriting"
          className="mt-4"
        />
      )}
    </div>
  );
}

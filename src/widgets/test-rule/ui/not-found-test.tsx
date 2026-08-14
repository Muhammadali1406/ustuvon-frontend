import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function TestNotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-[#0B8E0F]">
          404
        </p>
        <h1 className="mt-2 text-xl font-semibold text-slate-900">
          Test topilmadi
        </h1>
        <Link
          to="/app/subjects"
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-[#0B8E0F] hover:underline"
        >
          <ArrowLeft size={14} />
          Fanlarga qaytish
        </Link>
      </div>
  )
}

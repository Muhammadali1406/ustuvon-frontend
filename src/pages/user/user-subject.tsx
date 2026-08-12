import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function UserSubjects() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-[#0B8E0F]">
        Fanlar
      </p>
      <h1 className="mt-2 text-xl font-semibold text-slate-900">
        Fan tanlash sahifasi tez orada
      </h1>
      <p className="mt-2 max-w-sm text-sm text-slate-500">
        Bu yerda barcha fanlar, ularning ichidagi testlar va test qoidalari
        ekrani joylashadi.
      </p>
      <Link
        to="/app"
        className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-[#0B8E0F] hover:underline"
      >
        <ArrowLeft size={14} />
        Bosh sahifaga qaytish
      </Link>
    </div>
  );
}
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F6F5F1] px-4 text-center">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-[#1A5FA8]">
          404
        </p>
        <h1 className="mt-2 text-2xl font-bold text-slate-900">
          Sahifa topilmadi
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Qidirilayotgan sahifa mavjud emas yoki ko'chirilgan.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-[#1A5FA8] hover:underline"
        >
          <ArrowLeft size={14} />
          Bosh sahifaga qaytish
        </Link>
      </div>
    </div>
  );
}
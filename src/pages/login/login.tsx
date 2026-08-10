import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function Login() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F6F5F1] px-4">
      <div className="w-full max-w-sm rounded-2xl border border-black/10 bg-white p-8 text-center shadow-sm">
        <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-md bg-[#1A5FA8] text-sm font-bold text-white">
          U
        </span>
        <h1 className="mt-4 text-lg font-semibold text-slate-900">Kirish</h1>
        <p className="mt-2 text-sm text-slate-500">
          Login sahifasi tez orada tayyor bo'ladi.
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
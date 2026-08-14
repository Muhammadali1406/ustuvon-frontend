import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { SUBJECT_CATALOG,type Subject } from "@/widgets/user-subject/hook/subject-data";

// ---------------------------------------------------------------------------
// Presentational pieces
// ---------------------------------------------------------------------------

function SubjectCard({ subject }: { subject: Subject }) {
  const Icon = subject.icon;
  return (
    <Link
      to={`/app/subjects/${subject.id}`}
      className="group rounded-xl border border-black/8 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-[#0EBE15]/40 hover:shadow-md hover:shadow-[#0EBE15]/10"
    >
      <div className="flex items-start justify-between">
        <span className="flex h-11 w-11 items-center justify-center rounded-md bg-[#E7F8E8] text-[#0B8E0F] transition-colors group-hover:bg-[#0EBE15] group-hover:text-white">
          <Icon size={20} />
        </span>
        <span className="rounded-md bg-slate-50 px-2 py-1 text-[11px] font-medium text-slate-500">
          {subject.category}
        </span>
      </div>

      <p className="mt-4 text-base font-semibold text-slate-900">
        {subject.name}
      </p>
      <p className="mt-1 text-sm leading-relaxed text-slate-500">
        {subject.description}
      </p>
      <p className="mt-3 text-xs font-medium text-[#0B8E0F]">
        {subject.testCount} ta test mavjud
      </p>
    </Link>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function UserSubjects() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Barchasi");

  const categories = useMemo(
    () => ["Barchasi", ...new Set(SUBJECT_CATALOG.map((s) => s.category))],
    [],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return SUBJECT_CATALOG.filter((subject) => {
      const matchesQuery = !q || subject.name.toLowerCase().includes(q);
      const matchesCategory =
        activeCategory === "Barchasi" || subject.category === activeCategory;
      return matchesQuery && matchesCategory;
    });
  }, [query, activeCategory]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-slate-900">Fanlar</h1>
        <p className="mt-1 text-sm text-slate-500">
          Qaysi imtihonga tayyorlanayotgan bo'lsangiz ham, shu yerdan boshlang
        </p>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full max-w-xs">
          <Search
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Fan nomi bo'yicha qidirish"
            className="w-full rounded-lg border border-black/10 bg-white py-2 pl-9 pr-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-[#0EBE15] focus:outline-none focus:ring-1 focus:ring-[#0EBE15]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1 rounded-lg border border-black/10 bg-white p-1">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors sm:text-sm ${
                activeCategory === category
                  ? "bg-[#0EBE15] text-[#101826]"
                  : "text-slate-500 hover:bg-slate-100"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((subject) => (
            <SubjectCard key={subject.id} subject={subject} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-black/8 bg-white py-16 text-center">
          <p className="text-sm text-slate-400">
            Qidiruv shartlariga mos fan topilmadi
          </p>
        </div>
      )}
    </div>
  );
}
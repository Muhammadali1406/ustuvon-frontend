import { useMemo, useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { SubjectCard } from "@/widgets/user-subject/ui/subject-card";
import { useSubject } from "@/widgets/user-subject/hook/useSubject";
import type { FlatSubject } from "@/widgets/user-subject/hook/subject-types";

const ALL_CATEGORIES = "Barchasi";

export default function UserSubjects() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState(ALL_CATEGORIES);

  const { categories, isLoading } = useSubject();

  // Backend 2 qatlamli daraxt qaytaradi (Category -> Subject[]). Bu sahifa
  // fanlarni yagona ro'yxat sifatida ko'rsatishi kerak, shuning uchun
  // har bir fanga o'z kategoriyasining nomini biriktirib, tekis ro'yxatga
  // aylantiramiz.
  const flatSubjects = useMemo((): FlatSubject[] => {
    return categories.flatMap((category) =>
      category.subjects.map((subject) => ({
        ...subject,
        categoryId: category.id,
        categoryTitle: category.title,
      })),
    );
  }, [categories]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return flatSubjects.filter((subject) => {
      const matchesQuery = !q || subject.title.toLowerCase().includes(q);
      const matchesCategory =
        activeCategory === ALL_CATEGORIES ||
        subject.categoryTitle === activeCategory;
      return matchesQuery && matchesCategory;
    });
  }, [flatSubjects, query, activeCategory]);

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

        <div className="relative w-full sm:w-56">
          <select
            value={activeCategory}
            onChange={(e) => setActiveCategory(e.target.value)}
            className="w-full appearance-none rounded-lg border border-black/10 bg-white py-2 pl-3 pr-9 text-sm text-slate-700 focus:border-[#0EBE15] focus:outline-none focus:ring-1 focus:ring-[#0EBE15]"
          >
            <option value={ALL_CATEGORIES}>Barcha kategoriyalar</option>
            {categories.map((category) => (
              <option key={category.id} value={category.title}>
                {category.title}
              </option>
            ))}
          </select>
          <ChevronDown
            size={14}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
        </div>
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="rounded-xl border border-black/8 bg-white py-16 text-center">
          <p className="text-sm text-slate-400">Yuklanmoqda…</p>
        </div>
      ) : filtered.length > 0 ? (
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
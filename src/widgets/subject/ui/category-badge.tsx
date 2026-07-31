import type { SubjectCategory } from "../lib/type-subject";

const CATEGORY_STYLES: Record<SubjectCategory, string> = {
  "Tabiiy fanlar": "bg-[#12525A]/10 text-[#0D3E44] ring-[#12525A]/20",
  "Chet tillari": "bg-[#C79A3E]/10 text-[#8A6A24] ring-[#C79A3E]/30",
  Sertifikatlar: "bg-[#5B4B8A]/10 text-[#453770] ring-[#5B4B8A]/20",
  DTM: "bg-[#B3423B]/10 text-[#8A322C] ring-[#B3423B]/20",
};

export function CategoryBadge({ category }: { category: SubjectCategory }) {
  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${CATEGORY_STYLES[category]}`}
    >
      {category}
    </span>
  );
}

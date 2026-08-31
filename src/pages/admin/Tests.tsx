import { useMemo, useState } from "react";
import { FileQuestion, Plus, Search } from "lucide-react";
import { type Test } from "@/widgets/test/hook/test-types";
import { DataTable } from "@/components/ui/table/datatable";
import { buildTestsColumns } from "@/widgets/test/ui/test-columns";
import { ConfirmDialog } from "@/widgets/subject/ui/confirm-dialog";
import { SummaryCard } from "@/widgets/test/ui/summary-card";
import { SelectFilter } from "@/widgets/test/ui/select-filter";
import { CreateTestModal } from "@/components/modals/testCreate/ui/create-test-modal";
import { useTest } from "@/widgets/test/hook/useTest";

const ALL_FORMATS = "Barchasi";

export default function TestsPage() {
  const [search, setSearch] = useState("");
  const [formatFilter, setFormatFilter] = useState<string>(ALL_FORMATS);

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Test | null>(null);

  const { tests, handleDelete, refetch } = useTest();

  // Filtr variantlarini taxamonyTree'dan emas, HAQIQIY ma'lumotdagi
  // test_type qiymatlaridan hosil qilamiz — shunda katta/kichik harf yoki
  // "_" bilan bo'shliq nomutanosibligi bo'lmaydi, filtr har doim mos keladi.
  const availableFormats = useMemo(
    () => [...new Set(tests.map((t) => t.test_type))],
    [tests],
  );

  const filteredTests = useMemo(() => {
    return tests.filter((t) => {
      const matchesSearch = t.title
        .toLowerCase()
        .includes(search.trim().toLowerCase());
      const matchesFormat =
        formatFilter === ALL_FORMATS || t.test_type === formatFilter;
      return matchesSearch && matchesFormat;
    });
  }, [tests, search, formatFilter]);

  const summary = useMemo(
    () => ({
      total: tests.length,
      active: tests.filter((t) => t.is_active).length,
      inactive: tests.filter((t) => !t.is_active).length,
      totalQuestions: tests.reduce((sum, t) => sum + t.questions_count, 0),
    }),
    [tests],
  );

  return (
    <div className="h-full w-full">
      <div className="mx-auto w-full px-4 py-8 sm:px-6 lg:px-8">
        {/* Sarlavha */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
              Testlar
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Testlarni yarating, AI yordamida fayldan generatsiya qiling yoki
              qo'lda tuzing.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setCreateModalOpen(true)}
            className="inline-flex items-center justify-center gap-1.5 rounded-md bg-[#12525A] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#0D3E44] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#12525A] focus-visible:ring-offset-2"
          >
            <Plus size={16} />
            Yangi test yaratish
          </button>
        </div>

        {/* Statistik kartalar */}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <SummaryCard label="Jami testlar" value={summary.total} />
          <SummaryCard
            label="Faol testlar"
            value={summary.active}
            accent="#3F7D58"
          />
          <SummaryCard
            label="Nofaol testlar"
            value={summary.inactive}
            accent="#64748B"
          />
          <SummaryCard label="Jami savollar" value={summary.totalQuestions} />
        </div>

        {/* Filtrlar */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Test nomi bo'yicha qidirish..."
              className="w-full rounded-md border border-slate-300 bg-white py-2 pl-9 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#12525A] focus:outline-none focus:ring-1 focus:ring-[#12525A]"
            />
          </div>

          <SelectFilter
            value={formatFilter}
            onChange={(v) => setFormatFilter(v)}
            allLabel="Barcha formatlar"
            options={availableFormats}
            // SelectFilter ichida qiymatni ko'rsatishda formatRawLabel
            // bilan o'qiladigan shaklga o'girib chiqarishga moslashtiring
            // (masalan "milliy_sertifikat" -> "Milliy Sertifikat"). value
            // baribir xom test_type bo'lib qoladi, faqat LABEL o'zgaradi.
          />
        </div>

        {/* Jadval */}
        <div className="mt-5">
          <DataTable
            columns={buildTestsColumns({
              onDelete: (test) => setDeleteTarget(test),
            })}
            data={filteredTests}
            emptyState={
              <div className="flex flex-col items-center gap-2 py-4">
                <FileQuestion className="text-slate-300" size={22} />
                <p className="text-sm text-slate-500">
                  {tests.length === 0
                    ? "Hali testlar yaratilmagan."
                    : "Qidiruv shartlariga mos test topilmadi."}
                </p>
              </div>
            }
          />
        </div>
      </div>

      <CreateTestModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        refetch={refetch}
      />

      <ConfirmDialog
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => deleteTarget && handleDelete(deleteTarget)}
        title="Testni o'chirmoqchimisiz?"
        description={`"${deleteTarget?.title}" testi va u bilan bog'liq barcha natijalar o'chiriladi. Bu amalni bekor qilib bo'lmaydi.`}
        confirmLabel="Ha, o'chirish"
      />
    </div>
  );
}

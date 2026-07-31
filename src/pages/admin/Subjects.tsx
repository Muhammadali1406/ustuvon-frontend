import { useMemo, useState } from "react";
import { ChevronDown, Plus, Search } from "lucide-react";
import {
  CategoryBadge,
  EmptyState,
  mockSubjects,
  SUBJECT_CATEGORIES,
} from "@/widgets/subject";
import { SubjectFormModal } from "@/widgets/subject/ui/subject-form-modal";
import { ConfirmDialog } from "@/widgets/subject/ui/confirm-dialog";
import { ScheduleTestModal } from "@/widgets/subject/ui/schedule-test-modal";
import { DataTable } from "@/components/ui/table/datatable";
import { buildSubjectsColumns } from "@/widgets/subject/ui/subject-column";
import type {
  SubjectFormValues,
  ScheduledTest,
  Subject,
  SubjectCategory,
} from "@/widgets/subject/lib/type-subject";

type CategoryFilter = SubjectCategory | "Barchasi";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("uz-UZ", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString("uz-UZ", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function SubjectsPage() {
  const [subjects, setSubjects] = useState<Subject[]>(mockSubjects);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] =
    useState<CategoryFilter>("Barchasi");

  const [formModalOpen, setFormModalOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState<Subject | null>(null);

  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [schedulingSubject, setSchedulingSubject] = useState<Subject | null>(
    null,
  );

  const [deleteTarget, setDeleteTarget] = useState<Subject | null>(null);

  const filteredSubjects = useMemo(() => {
    return subjects.filter((s) => {
      const matchesSearch = s.name
        .toLowerCase()
        .includes(search.trim().toLowerCase());
      const matchesCategory =
        categoryFilter === "Barchasi" || s.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [subjects, search, categoryFilter]);

  // --- CRUD amallari (TODO: API bilan almashtiring) ---

  function handleCreate(values: SubjectFormValues) {
    const newSubject: Subject = {
      id: `subj_${Date.now()}`,
      name: values.name.trim(),
      category: values.category,
      isActive: values.isActive,
      testsCount: 0,
      createdAt: new Date().toISOString(),
      scheduledTest: null,
    };
    setSubjects((prev) => [newSubject, ...prev]);
  }

  function handleUpdate(values: SubjectFormValues) {
    if (!editingSubject) return;
    setSubjects((prev) =>
      prev.map((s) => (s.id === editingSubject.id ? { ...s, ...values } : s)),
    );
  }

  function handleDelete(subject: Subject) {
    setSubjects((prev) => prev.filter((s) => s.id !== subject.id));
  }

  function handleToggleActive(subject: Subject) {
    setSubjects((prev) =>
      prev.map((s) =>
        s.id === subject.id ? { ...s, isActive: !s.isActive } : s,
      ),
    );
  }

  function handleSchedule(scheduled: ScheduledTest) {
    if (!schedulingSubject) return;
    setSubjects((prev) =>
      prev.map((s) =>
        s.id === schedulingSubject.id ? { ...s, scheduledTest: scheduled } : s,
      ),
    );
  }

  function openCreateModal() {
    setEditingSubject(null);
    setFormModalOpen(true);
  }

  function openEditModal(subject: Subject) {
    setEditingSubject(subject);
    setFormModalOpen(true);
  }

  function openScheduleModal(subject: Subject) {
    setSchedulingSubject(subject);
    setScheduleModalOpen(true);
  }

  return (
    <div className="h-full">
      <div className="mx-auto w-full px-4 py-4 sm:px-6 lg:px-8">
        {/* Sahifa sarlavhasi */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
              Fanlar
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Platformadagi fanlarni qo'shing, tahrirlang va yangi testlarni
              rejalashtiring.
            </p>
          </div>
          <button
            type="button"
            onClick={openCreateModal}
            className="inline-flex items-center justify-center gap-1.5 rounded-md bg-[#12525A] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#0D3E44] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#12525A] focus-visible:ring-offset-2"
          >
            <Plus size={16} />
            Yangi fan qo'shish
          </button>
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
              placeholder="Fan nomi bo'yicha qidirish..."
              className="w-full rounded-md border border-slate-300 bg-white py-2 pl-9 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#12525A] focus:outline-none focus:ring-1 focus:ring-[#12525A]"
            />
          </div>

          <div className="relative">
            <select
              value={categoryFilter}
              onChange={(e) =>
                setCategoryFilter(e.target.value as CategoryFilter)
              }
              className="appearance-none rounded-md border border-slate-300 bg-white py-2 pl-3 pr-9 text-sm text-slate-700 focus:border-[#12525A] focus:outline-none focus:ring-1 focus:ring-[#12525A]"
            >
              <option value="Barchasi">Barcha turkumlar</option>
              {SUBJECT_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <ChevronDown
              size={14}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
          </div>
        </div>

        {/* Jadval / bo'sh holat */}
        <div className="mt-5 overflow-hidden rounded-lg border border-slate-200 bg-white">
          {filteredSubjects.length === 0 ? (
            <EmptyState
              hasSubjects={subjects.length > 0}
              onCreate={openCreateModal}
            />
          ) : (
            <>
              {/* Desktop jadval */}
              <DataTable
                columns={buildSubjectsColumns({
                  onSchedule: openScheduleModal,
                  onEdit: openEditModal,
                  onDelete: setDeleteTarget,
                  onToggleActive: handleToggleActive,
                })}
                data={filteredSubjects}
              />

              {/* Mobil kartalar */}
              <ul className="divide-y divide-slate-100 sm:hidden">
                {filteredSubjects.map((subject) => (
                  <li key={subject.id} className="px-4 py-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium text-slate-900">
                          {subject.name}
                        </p>
                        <div className="mt-1">
                          <CategoryBadge category={subject.category} />
                        </div>
                      </div>
                      <StatusToggle
                        isActive={subject.isActive}
                        onToggle={() => handleToggleActive(subject)}
                      />
                    </div>

                    <dl className="mt-3 grid grid-cols-2 gap-y-1 text-xs text-slate-500">
                      <dt>Testlar soni</dt>
                      <dd className="text-right text-slate-700">
                        {subject.testsCount}
                      </dd>
                      <dt>Yaratilgan</dt>
                      <dd className="text-right text-slate-700">
                        {formatDate(subject.createdAt)}
                      </dd>
                      {subject.scheduledTest && (
                        <>
                          <dt>Rejalashtirilgan</dt>
                          <dd className="text-right text-[#8A6A24]">
                            {formatDateTime(subject.scheduledTest.date)}
                          </dd>
                        </>
                      )}
                    </dl>

                    <div className="mt-3 flex gap-2">
                      <button
                        onClick={() => openScheduleModal(subject)}
                        className="flex-1 rounded-md border border-slate-200 py-1.5 text-xs font-medium text-slate-700"
                      >
                        Rejalashtirish
                      </button>
                      <button
                        onClick={() => openEditModal(subject)}
                        className="flex-1 rounded-md border border-slate-200 py-1.5 text-xs font-medium text-slate-700"
                      >
                        Tahrirlash
                      </button>
                      <button
                        onClick={() => setDeleteTarget(subject)}
                        className="flex-1 rounded-md border border-[#B3423B]/30 py-1.5 text-xs font-medium text-[#B3423B]"
                      >
                        O'chirish
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        <p className="mt-3 text-xs text-slate-400">
          {filteredSubjects.length} ta fan ko'rsatilmoqda / jami{" "}
          {subjects.length} ta
        </p>
      </div>

      {/* Modallar */}
      <SubjectFormModal
        isOpen={formModalOpen}
        onClose={() => setFormModalOpen(false)}
        onSubmit={editingSubject ? handleUpdate : handleCreate}
        initialValues={editingSubject}
      />

      <ScheduleTestModal
        isOpen={scheduleModalOpen}
        onClose={() => setScheduleModalOpen(false)}
        onSubmit={handleSchedule}
        subject={schedulingSubject}
      />

      <ConfirmDialog
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => deleteTarget && handleDelete(deleteTarget)}
        title="Fanni o'chirmoqchimisiz?"
        description={`"${deleteTarget?.name}" fani va unga bog'liq barcha testlar ro'yxatdan olib tashlanadi. Bu amalni bekor qilib bo'lmaydi.`}
        confirmLabel="Ha, o'chirish"
      />
    </div>
  );
}

// --- Kichik yordamchi komponentlar ---

function StatusToggle({
  isActive,
  onToggle,
}: {
  isActive: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
        isActive
          ? "bg-[#3F7D58]/10 text-[#2F5D42]"
          : "bg-slate-100 text-slate-500"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          isActive ? "bg-[#3F7D58]" : "bg-slate-400"
        }`}
      />
      {isActive ? "Faol" : "Nofaol"}
    </button>
  );
}

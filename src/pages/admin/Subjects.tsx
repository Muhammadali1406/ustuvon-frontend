import { useMemo, useState } from "react";
import { ChevronDown, Plus, Search } from "lucide-react";
import {
  CategoryBadge,
  EmptyState,
  SUBJECT_CATEGORIES,
} from "@/widgets/subject";
import { SubjectFormModal } from "@/widgets/subject/ui/subject-form-modal";
import { ConfirmDialog } from "@/widgets/subject/ui/confirm-dialog";
import { ScheduleTestModal } from "@/widgets/subject/ui/schedule-test-modal";
import { DataTable } from "@/components/ui/table/datatable";
import { buildSubjectsColumns } from "@/widgets/subject/ui/subject-column";
import type {
  Subject,
  SubjectCategory,
} from "@/widgets/subject/lib/type-subject";
import { StatusToggle } from "@/widgets/subject/ui/status-togle";
import { formatDate, formatDateTime } from "@/components/lib/formats";
import { useSubjects } from "@/widgets/subject/lib/useSubject";
import { CreateCategoryModal } from "@/components/modals/categoryCreate/createCategoryModel";

type CategoryFilter = SubjectCategory | "Barchasi";

export default function SubjectsPage() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] =
    useState<CategoryFilter>("Barchasi");

  const [formModalOpen, setFormModalOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState<Subject | null>(null);
  const [categoryModel, setCategoryModel] = useState(false);

  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [schedulingSubject, setSchedulingSubject] = useState<Subject | null>(
    null,
  );

  const [deleteTarget, setDeleteTarget] = useState<Subject | null>(null);

  const {
    subjects,
    handleCreate,
    handleDelete,
    handleUpdate,
    handleSchedule,
    handleToggleActive,
    // deletePending,
    // updatePending,
    // createPending,
  } = useSubjects({ editingSubject, schedulingSubject });

  const filteredSubjects = useMemo(() => {
    if (categoryFilter === "Qo'shish+") {
      setCategoryModel(true);
      setCategoryFilter("Barchasi");
    }
    return subjects.filter((s) => {
      const matchesSearch = s.name
        .toLowerCase()
        .includes(search.trim().toLowerCase());
      const matchesCategory =
        categoryFilter === "Barchasi" || s.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [subjects, search, categoryFilter]);

  const openCreateModal = () => {
    setEditingSubject(null);
    setFormModalOpen(true);
  };

  const openEditModal = (subject: Subject) => {
    setEditingSubject(subject);
    setFormModalOpen(true);
  };

  const openScheduleModal = (subject: Subject) => {
    setSchedulingSubject(subject);
    setScheduleModalOpen(true);
  };

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

      <CreateCategoryModal
        open={categoryModel}
        onClose={() => setCategoryModel(false)}
      />

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

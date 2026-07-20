// src/pages/admin/tests/CreateTestModal.tsx
import { useRef, useState } from "react";
import { createEmptyQuestion, QuestionEditor } from "./question-editor";
import {
  TEST_FORMATS,
  type Question,
  type TestFormValues,
} from "../lib/test-types";
import { FileUp, Loader2, Plus, Sparkles, TriangleAlert } from "lucide-react";
import { Modal } from "@/widgets/subject";

interface SubjectOption {
  id: string;
  name: string;
}

interface CreateTestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: TestFormValues) => void;
  subjects: SubjectOption[];
}

type Tab = "ai" | "manual";
type AiState = "idle" | "processing" | "review" | "failed";

interface TestMeta {
  title: string;
  subjectId: string;
  format: TestFormValues["format"];
  durationMinutes: number;
}

const emptyMeta: TestMeta = {
  title: "",
  subjectId: "",
  format: TEST_FORMATS[0],
  durationMinutes: 60,
};

export function CreateTestModal({
  isOpen,
  onClose,
  onSubmit,
  subjects,
}: CreateTestModalProps) {
  const [tab, setTab] = useState<Tab>("ai");
  const [meta, setMeta] = useState(emptyMeta);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [aiState, setAiState] = useState<AiState>("idle");
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function resetAndClose() {
    setTab("ai");
    setMeta(emptyMeta);
    setQuestions([]);
    setAiState("idle");
    setFileName(null);
    setError(null);
    onClose();
  }

  function handleFileSelected(file: File) {
    setFileName(file.name);
    setAiState("processing");

    // TODO: haqiqiy backend/AI chaqiruvi bilan almashtiring.
    // Bu yerda fayl backendga yuboriladi -> AI savol/javoblarni ajratib,
    // tanlangan formatga (masalan "Milliy Sertifikat — Matematika") moslab beradi.
    setTimeout(() => {
      const succeeded = true; // demo: muvaffaqiyatli holat
      if (!succeeded) {
        setAiState("failed");
        return;
      }
      setQuestions([
        {
          ...createEmptyQuestion(),
          text: "2x + 5 = 17 tenglamani yeching. x nimaga teng?",
          options: [
            { id: "o1", text: "4" },
            { id: "o2", text: "6" },
            { id: "o3", text: "8" },
            { id: "o4", text: "10" },
          ],
          correctOptionId: "o2",
          ball: 2,
        },
        {
          ...createEmptyQuestion(),
          text: "Uchburchakning ichki burchaklari yig'indisi necha darajaga teng?",
          options: [
            { id: "o1", text: "90°" },
            { id: "o2", text: "180°" },
            { id: "o3", text: "270°" },
            { id: "o4", text: "360°" },
          ],
          correctOptionId: "o2",
          ball: 2,
        },
      ]);
      setAiState("review");
      if (!meta.title) {
        setMeta((m) => ({ ...m, title: file.name.replace(/\.[^.]+$/, "") }));
      }
    }, 1600);
  }

  function updateQuestion(id: string, updated: Question) {
    setQuestions((prev) => prev.map((q) => (q.id === id ? updated : q)));
  }

  function removeQuestion(id: string) {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  }

  function addManualQuestion() {
    setQuestions((prev) => [...prev, createEmptyQuestion()]);
  }

  function validateAndSubmit(status: TestFormValues["status"]) {
    if (!meta.title.trim()) return setError("Test nomini kiriting.");
    if (!meta.subjectId) return setError("Fanni tanlang.");
    if (questions.length === 0) return setError("Kamida bitta savol qo'shing.");
    const hasEmptyQuestion = questions.some(
      (q) => !q.text.trim() || q.options.some((o) => !o.text.trim()),
    );
    if (hasEmptyQuestion)
      return setError("Barcha savol va variant matnlarini to'ldiring.");

    setError(null);
    onSubmit({ ...meta, status, questions });
    resetAndClose();
  }

  const canReview = tab === "ai" && aiState === "review";
  const showQuestionList = tab === "manual" || canReview;

  return (
    <Modal
      isOpen={isOpen}
      onClose={resetAndClose}
      title="Yangi test yaratish"
      description="Faylni AI yordamida yuklang yoki savollarni qo'lda kiriting."
      widthClassName="max-w-2xl"
    >
      <div className="max-h-[70vh] overflow-y-auto pr-1">
        {/* Tablar */}
        <div className="flex gap-1 rounded-md bg-slate-100 p-1">
          <TabButton active={tab === "ai"} onClick={() => setTab("ai")}>
            <Sparkles size={14} />
            Fayl orqali (AI)
          </TabButton>
          <TabButton active={tab === "manual"} onClick={() => setTab("manual")}>
            Qo'lda kiritish
          </TabButton>
        </div>

        {/* Umumiy maydonlar */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="col-span-2">
            <label className="block text-sm font-medium text-slate-700">
              Test nomi
            </label>
            <input
              type="text"
              value={meta.title}
              onChange={(e) =>
                setMeta((m) => ({ ...m, title: e.target.value }))
              }
              placeholder="Masalan: Milliy Sertifikat — Matematika #16"
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-[#12525A] focus:outline-none focus:ring-1 focus:ring-[#12525A]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">
              Fan
            </label>
            <select
              value={meta.subjectId}
              onChange={(e) =>
                setMeta((m) => ({ ...m, subjectId: e.target.value }))
              }
              className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:border-[#12525A] focus:outline-none focus:ring-1 focus:ring-[#12525A]"
            >
              <option value="">Tanlang...</option>
              {subjects.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">
              Format
            </label>
            <select
              value={meta.format}
              onChange={(e) =>
                setMeta((m) => ({
                  ...m,
                  format: e.target.value as TestFormValues["format"],
                }))
              }
              className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:border-[#12525A] focus:outline-none focus:ring-1 focus:ring-[#12525A]"
            >
              {TEST_FORMATS.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-slate-700">
              Davomiyligi (daqiqa)
            </label>
            <input
              type="number"
              min={1}
              value={meta.durationMinutes}
              onChange={(e) =>
                setMeta((m) => ({
                  ...m,
                  durationMinutes: Number(e.target.value),
                }))
              }
              className="mt-1 w-32 rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-[#12525A] focus:outline-none focus:ring-1 focus:ring-[#12525A]"
            />
          </div>
        </div>

        {/* AI tab kontenti */}
        {tab === "ai" && (
          <div className="mt-4">
            {aiState === "idle" && (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex w-full flex-col items-center gap-2 rounded-lg border-2 border-dashed border-slate-300 px-4 py-8 text-center hover:border-[#12525A] hover:bg-[#12525A]/5"
              >
                <FileUp className="text-slate-400" size={22} />
                <span className="text-sm font-medium text-slate-700">
                  Faylni tanlash uchun bosing
                </span>
                <span className="text-xs text-slate-400">
                  PDF, DOCX yoki TXT — 20 MB gacha
                </span>
              </button>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.docx,.txt"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileSelected(file);
              }}
            />

            {aiState === "processing" && (
              <div className="flex flex-col items-center gap-2 rounded-lg border border-slate-200 px-4 py-8 text-center">
                <Loader2 className="animate-spin text-[#12525A]" size={22} />
                <p className="text-sm font-medium text-slate-700">
                  "{fileName}" tahlil qilinmoqda...
                </p>
                <p className="text-xs text-slate-400">
                  AI savol, variant va javoblarni ajratib olyapti
                </p>
              </div>
            )}

            {aiState === "failed" && (
              <div className="flex items-start gap-2 rounded-lg border border-[#B3423B]/30 bg-[#B3423B]/5 px-4 py-3 text-sm text-[#8A322C]">
                <TriangleAlert size={16} className="mt-0.5 flex-none" />
                <div>
                  <p className="font-medium">AI faylni to'liq tanimadi</p>
                  <p className="mt-0.5 text-[#8A322C]/80">
                    Savollarni "Qo'lda kiritish" bo'limi orqali qo'shishingiz
                    mumkin.
                  </p>
                </div>
              </div>
            )}

            {aiState === "review" && (
              <p className="mt-1 text-xs text-slate-500">
                AI {questions.length} ta savol topdi. Saqlashdan oldin
                tekshirib, kerak bo'lsa tuzating.
              </p>
            )}
          </div>
        )}

        {/* Savollar ro'yxati (AI review yoki manual) */}
        {showQuestionList && (
          <div className="mt-4 space-y-3">
            {questions.map((q, i) => (
              <QuestionEditor
                key={q.id}
                index={i}
                question={q}
                onChange={(updated) => updateQuestion(q.id, updated)}
                onRemove={() => removeQuestion(q.id)}
              />
            ))}

            <button
              type="button"
              onClick={addManualQuestion}
              className="flex w-full items-center justify-center gap-1.5 rounded-md border border-dashed border-slate-300 py-2 text-sm font-medium text-slate-500 hover:border-[#12525A] hover:text-[#12525A]"
            >
              <Plus size={15} />
              Savol qo'shish
            </button>
          </div>
        )}

        {error && <p className="mt-3 text-xs text-[#B3423B]">{error}</p>}
      </div>

      {/* Amallar */}
      <div className="mt-4 flex justify-end gap-2 border-t border-slate-100 pt-4">
        <button
          type="button"
          onClick={resetAndClose}
          className="rounded-md border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Bekor qilish
        </button>
        <button
          type="button"
          onClick={() => validateAndSubmit("Qoralama")}
          className="rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Qoralama sifatida saqlash
        </button>
        <button
          type="button"
          onClick={() => validateAndSubmit("Tekshiruvda")}
          className="rounded-md bg-[#12525A] px-3 py-1.5 text-sm font-medium text-white hover:bg-[#0D3E44]"
        >
          Tekshiruvga yuborish
        </button>
      </div>
    </Modal>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-1 items-center justify-center gap-1.5 rounded-md py-1.5 text-sm font-medium transition ${
        active
          ? "bg-white text-[#12525A] shadow-sm"
          : "text-slate-500 hover:text-slate-700"
      }`}
    >
      {children}
    </button>
  );
}

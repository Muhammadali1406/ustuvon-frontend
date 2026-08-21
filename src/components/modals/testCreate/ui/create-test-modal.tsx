// src/pages/admin/tests/CreateTestModal.tsx
import { useState } from "react";
import { Plus, Sparkles } from "lucide-react";
import { Modal } from "@/widgets/subject";
import {
  TEST_FORMATS,
  type Question,
  type Test,
  type TestFormValues,
} from "@/widgets/test/lib/test-types";
import TestButtons from "./buttons";
import { TabButton } from "./tab-button";
import {
  createEmptyQuestion,
  QuestionEditor,
} from "@/widgets/test/ui/question-editor";
import Generalfields from "./generalfields";
import { AITab } from "./ai-tab";

export interface SubjectOption {
  id: string;
  name: string;
}

interface CreateTestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: TestFormValues) => void;
  subjects: SubjectOption[];
  initialValues?: Test | null; // berilsa - tahrirlash rejimi
}

type Tab = "ai" | "manual";
export type AiState = "idle" | "processing" | "review" | "failed";

export interface TestMeta {
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

  const resetAndClose = () => {
    setTab("ai");
    setMeta(emptyMeta);
    setQuestions([]);
    setAiState("idle");
    setFileName(null);
    setError(null);
    onClose();
  };

  const handleFileSelected = (file: File) => {
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
  };

  const updateQuestion = (id: string, updated: Question) => {
    setQuestions((prev) => prev.map((q) => (q.id === id ? updated : q)));
  };

  const removeQuestion = (id: string) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  const addManualQuestion = () => {
    setQuestions((prev) => [...prev, createEmptyQuestion()]);
  };

  const validateAndSubmit = (status: TestFormValues["status"]) => {
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
  };

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
        <Generalfields subjects={subjects} meta={meta} setMeta={setMeta} />

        {/* AI tab kontenti */}
        {tab === "ai" && (
          <AITab
            aiState={aiState}
            handleFileSelected={handleFileSelected}
            fileName={fileName}
            questions={questions}
          />
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
      <TestButtons
        validateAndSubmit={validateAndSubmit}
        resetAndClose={resetAndClose}
      />
    </Modal>
  );
}

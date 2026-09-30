import { Plus, Sparkles } from "lucide-react";
import { Modal } from "@/widgets/subject";
import TestButtons from "./buttons";
import { TabButton } from "./tab-button";
import { QuestionEditor } from "@/widgets/test/ui/question-editor";
import Generalfields from "./generalfields";
import { AITab } from "./ai-tab";
import { useCreateTest } from "../hook/useCreateTest";

export interface SubjectOption {
  id: string;
  name: string;
}

interface CreateTestModalProps {
  isOpen: boolean;
  onClose: () => void;
  refetch:()=>void
}

export type AiState = "idle" | "processing" | "review" | "failed";

export function CreateTestModal({ isOpen, onClose,refetch }: CreateTestModalProps) {
  const {
    tab,
    aiState,
    resetAndClose,
    setTab,
    fileName,
    questions,
    error,
    updateQuestion,
    removeQuestion,
    meta,
    setMeta,
    handleFileSelected,
    addManualQuestion,
    handleCreate,
    taxamonyTree,
  } = useCreateTest({ onClose,refetch });

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
        <Generalfields
          taxamonyTree={taxamonyTree}
          meta={meta}
          setMeta={setMeta}
        />

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
                onRemove={() => removeQuestion({ id: q.id })}
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
      <TestButtons resetAndClose={resetAndClose} create={handleCreate} />
    </Modal>
  );
}

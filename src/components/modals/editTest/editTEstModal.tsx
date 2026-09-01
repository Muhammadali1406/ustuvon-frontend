import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { useTestDetail } from "./useTestDetail";

interface EditTestModalProps {
  testId: number | string | null;
  isOpen: boolean;
  onClose: () => void;
  refetch: () => void;
}

export function EditTestModal({
  testId,
  isOpen,
  onClose,
  refetch,
}: EditTestModalProps) {
  const {
    test,
    loading,
    fetchDetail,
    updateTest,
    updateQuestion,
    deleteQuestion,
  } = useTestDetail();
  const [editingQuestionId, setEditingQuestionId] = useState<number | null>(
    null,
  );
  const [draftText, setDraftText] = useState("");

  useEffect(() => {
    if (isOpen && testId != null) fetchDetail(testId);
  }, [isOpen, testId, fetchDetail]);

  if (!isOpen || testId == null) return null;

  const handleSaveTest = async () => {
    if (!test) return;
    await updateTest(test.id, {
      title: test.title,
      duration_time: test.duration_time,
      transition_assessment: test.transition_assessment,
      is_active: test.is_active,
    });
    refetch();
    onClose();
  };

  const handleDeleteQuestion = async (id: number) => {
    await deleteQuestion(id);
  };

  const handleSaveQuestion = async (id: number) => {
    await updateQuestion(id, { text: draftText });
    setEditingQuestionId(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white p-6">
        {loading || !test ? (
          <p className="text-sm text-slate-500">Yuklanmoqda...</p>
        ) : (
          <>
            <h2 className="text-lg font-semibold text-slate-900">
              Testni tahrirlash
            </h2>

            <input
              value={test.title}
              onChange={
                (e) =>
                  (test.title =
                    e.target.value) /* haqiqiy state uchun setTest ishlating */
              }
              className="mt-4 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            />

            <div className="mt-6 space-y-3">
              <h3 className="text-sm font-medium text-slate-700">
                Savollar ({test.questions.length})
              </h3>
              {test.questions.map((q) => (
                <div
                  key={q.id}
                  className="flex items-start justify-between gap-2 rounded-md border border-slate-200 p-3"
                >
                  {editingQuestionId === q.id ? (
                    <div className="flex-1">
                      <textarea
                        defaultValue={q.text}
                        onChange={(e) => setDraftText(e.target.value)}
                        className="w-full rounded-md border border-slate-300 p-2 text-sm"
                      />
                      <div className="mt-2 flex gap-2">
                        <button
                          onClick={() => handleSaveQuestion(q.id)}
                          className="rounded-md bg-[#12525A] px-3 py-1 text-xs text-white"
                        >
                          Saqlash
                        </button>
                        <button
                          onClick={() => setEditingQuestionId(null)}
                          className="rounded-md border px-3 py-1 text-xs"
                        >
                          Bekor qilish
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p
                      className="flex-1 cursor-pointer text-sm text-slate-800"
                      onClick={() => {
                        setEditingQuestionId(q.id);
                        setDraftText(q.text);
                      }}
                    >
                      {q.text}
                    </p>
                  )}
                  <button
                    onClick={() => handleDeleteQuestion(q.id)}
                    className="rounded-md p-1.5 text-slate-400 hover:bg-[#B3423B]/10 hover:text-[#B3423B]"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={onClose}
                className="rounded-md border px-4 py-2 text-sm"
              >
                Yopish
              </button>
              <button
                onClick={handleSaveTest}
                className="rounded-md bg-[#12525A] px-4 py-2 text-sm text-white"
              >
                Saqlash
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

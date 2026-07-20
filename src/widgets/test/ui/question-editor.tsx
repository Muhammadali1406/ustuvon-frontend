// src/components/ui/QuestionEditor.tsx
//
// AI tomonidan generatsiya qilingan savolni tekshirish/tuzatish uchun ham,
// qo'lda savol kiritish uchun ham ishlatiladigan bitta komponent.

import { GripVertical, Trash2 } from "lucide-react";
import type { Question } from "../lib/test-types";

interface QuestionEditorProps {
  index: number;
  question: Question;
  onChange: (question: Question) => void;
  onRemove: () => void;
}

export function QuestionEditor({
  index,
  question,
  onChange,
  onRemove,
}: QuestionEditorProps) {
  function updateOptionText(optionId: string, text: string) {
    onChange({
      ...question,
      options: question.options.map((o) =>
        o.id === optionId ? { ...o, text } : o,
      ),
    });
  }

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4">
      <div className="flex items-start gap-2">
        <span className="mt-2 flex-none text-slate-300">
          <GripVertical size={16} />
        </span>

        <div className="flex-1 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wide text-slate-400">
              {index + 1}-savol
            </span>
            <button
              type="button"
              onClick={onRemove}
              className="rounded-md p-1 text-slate-400 hover:bg-[#B3423B]/10 hover:text-[#B3423B]"
              aria-label="Savolni o'chirish"
            >
              <Trash2 size={15} />
            </button>
          </div>

          <textarea
            value={question.text}
            onChange={(e) => onChange({ ...question, text: e.target.value })}
            placeholder="Savol matnini kiriting..."
            rows={2}
            className="w-full resize-none rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#12525A] focus:outline-none focus:ring-1 focus:ring-[#12525A]"
          />

          <div className="space-y-2">
            {question.options.map((option, optIndex) => (
              <label
                key={option.id}
                className={`flex items-center gap-2 rounded-md border px-3 py-2 text-sm ${
                  question.correctOptionId === option.id
                    ? "border-[#3F7D58]/40 bg-[#3F7D58]/5"
                    : "border-slate-200"
                }`}
              >
                <input
                  type="radio"
                  name={`correct-${question.id}`}
                  checked={question.correctOptionId === option.id}
                  onChange={() =>
                    onChange({ ...question, correctOptionId: option.id })
                  }
                  className="h-4 w-4 flex-none text-[#3F7D58] focus:ring-[#3F7D58]"
                />
                <span className="flex-none text-xs font-medium text-slate-400">
                  {String.fromCharCode(65 + optIndex)}
                </span>
                <input
                  type="text"
                  value={option.text}
                  onChange={(e) => updateOptionText(option.id, e.target.value)}
                  placeholder={`${String.fromCharCode(65 + optIndex)} varianti`}
                  className="flex-1 bg-transparent text-slate-900 placeholder:text-slate-400 focus:outline-none"
                />
              </label>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <label className="text-xs font-medium text-slate-500">Ball:</label>
            <input
              type="number"
              min={0}
              step={0.5}
              value={question.ball}
              onChange={(e) =>
                onChange({ ...question, ball: Number(e.target.value) })
              }
              className="w-20 rounded-md border border-slate-300 px-2 py-1 text-sm text-slate-900 focus:border-[#12525A] focus:outline-none focus:ring-1 focus:ring-[#12525A]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

let idCounter = 0;
export function createEmptyQuestion(): Question {
  idCounter += 1;
  const base = `q_${Date.now()}_${idCounter}`;
  return {
    id: base,
    text: "",
    ball: 1,
    correctOptionId: `${base}_a`,
    options: [
      { id: `${base}_a`, text: "" },
      { id: `${base}_b`, text: "" },
      { id: `${base}_c`, text: "" },
      { id: `${base}_d`, text: "" },
    ],
  };
}

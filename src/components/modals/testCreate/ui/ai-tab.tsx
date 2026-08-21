import { FileUp, Loader2, TriangleAlert } from "lucide-react";
import { useRef } from "react";
import type { AiState } from "./create-test-modal";
import type { Question } from "@/widgets/test/lib/test-types";

interface AiTabProps {
    aiState:AiState;
    handleFileSelected:(file:File)=>void;
    fileName:string|null;
    questions:Question[];
}

export function AITab({ aiState , handleFileSelected , fileName , questions }: AiTabProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  return (
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
              Savollarni "Qo'lda kiritish" bo'limi orqali qo'shishingiz mumkin.
            </p>
          </div>
        </div>
      )}

      {aiState === "review" && (
        <p className="mt-1 text-xs text-slate-500">
          AI {questions.length} ta savol topdi. Saqlashdan oldin tekshirib,
          kerak bo'lsa tuzating.
        </p>
      )}
    </div>
  );
}

import type { Question } from "@/widgets/test/hook/test-types";
import type { ParsedQuestionApi } from "./teast-create-types";

export function mapParsedQuestion(pq: ParsedQuestionApi): Question {
  const options = pq.options.map((opt, index) => ({
    id: `${pq.id}_${String.fromCharCode(97 + index)}`, // _a, _b, _c, _d
    text: opt.text,
  }));
  const correctIndex = pq.options.findIndex((opt) => opt.is_correct);

  return {
    id: pq.id,
    text: pq.text,
    ball: 1, // AI ball bermaydi — standart qiymat, admin tahrirlab o'zgartiradi
    correctOptionId: options[correctIndex]?.id ?? options[0]?.id,
    options,
  };
}

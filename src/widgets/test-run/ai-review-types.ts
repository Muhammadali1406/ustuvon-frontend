export type AiItemStatus = "correct" | "incorrect" | "skipped";

export interface AiReviewOption {
  id: number;
  text: string;
  is_selected: boolean;
  is_correct: boolean;
}

export interface AiReviewItem {
  n: number;
  question_id: number;
  question: string;
  status: AiItemStatus;
  is_correct: boolean;
  options: AiReviewOption[];
  your_answer: { id: number; text: string } | null;
  correct_answers: { id: number; text: string }[];
  explanation: string;
  better_version: string;
  concept: string;
  resources: { title: string; url: string }[];
  ai_generated: boolean;
}

export interface AiReviewReport {
  exam: { id: number; title: string };
  score: {
    total: number;
    correct: number;
    incorrect: number;
    skipped: number;
    percent: number;
  };
  summary: {
    overall_feedback: string;
    strengths: string[];
    weak_areas: string[];
    study_plan: string[];
  };
  items: AiReviewItem[];
  meta: {
    model: string;
    language: string;
    web_research: boolean;
    ai_items: number;
    generated_at: string;
  };
}

export interface AiReviewJob {
  review_id: string;
  status: "processing" | "done" | "failed";
  exam_id: number;
  poll_after_seconds?: number;
  report: AiReviewReport | null;
  error: { code: string; message: string } | null;
}

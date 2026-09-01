import type { Test } from "@/widgets/test/hook/test-types";

export interface QuestionOption {
  id: number;
  text: string;
  is_correct: boolean;
}

export interface Question {
  id: number;
  topic: number;
  text: string;
  options: QuestionOption[];
  created_at: string;
}

export interface TestDetail extends Test {
  questions: Question[];
}
export type ParsingJobStatus =
  | "pending"
  | "processing"
  | "needs_review"
  | "published"
  | "failed";

export interface ParsingJob {
  id: string;
  status: ParsingJobStatus;
  error_message: string;
  questions_count: number;
  confirmed_count: number;
}
 
export interface ParsedQuestionOption {
  text: string;
  is_correct: boolean;
}

export interface ParsedQuestionApi {
  id: string;
  order: number;
  text: string;
  image: string | null;
  options: ParsedQuestionOption[];
  levels: string;
  confidence_score: number | null;
  is_confirmed: boolean;
}

export interface PaginatedParsedQuestions {
  count: number;
  next: string | null;
  previous: string | null;
  results: ParsedQuestionApi[];
}
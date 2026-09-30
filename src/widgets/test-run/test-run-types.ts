export interface ExamOption {
  id: string;
  text: string;
  is_correct?: boolean;
}

export interface ExamQuestion {
  id: string;
  topic: number;
  text: string;
  options: ExamOption[];
  created_at: string;
}

export interface ExamDetail {
  id: string;
  title: string;
  duration_time: number; // daaaaqiqaaaa blyaaaaat
  transition_assessment: number;
  test_type: string;
  level: string;
  questions: ExamQuestion[];
  is_active: boolean;
  created_at: string;
}

export interface ExamSubmitResponse {
  id?: string;
  result_uuid?: string;
  result?: string;
  [key: string]: unknown;
}

export interface ExamSubmitResponse {
  detail: string;
  score: number;
  correct_answers: number;
  total_questions: number;
  is_passed: boolean;
}
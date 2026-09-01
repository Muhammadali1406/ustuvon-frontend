export interface ExamResultApi {
  id: number;
  user_email: string;
  exam_title: string;
  level: string;
  score: number;
  is_passed: boolean;
  completed_at: string; // ISO date
}
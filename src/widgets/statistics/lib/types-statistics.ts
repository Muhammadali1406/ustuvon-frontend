export interface DailyActivityPoint {
  date: string; // "12.07"
  activeUsers: number;
  newUsers: number;
}

export interface SubjectPopularity {
  subject: string;
  attempts: number;
}

export interface ResultRow {
  id: string;
  fullName: string;
  subject: string;
  test: string;
  score: number;
  percent: number;
  date: string; // "12.07.2026"
}

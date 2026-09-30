// src/types/test.ts

export const TEST_FORMATS = [
  "IELTS",
  "SAT",
  "DTM",
  "Milliy Sertifikat",
] as const;

export type TestFormat = (typeof TEST_FORMATS)[number];

export const TEST_STATUSES = [
  "Qoralama",
  "Tekshiruvda",
  "Nashr qilingan",
] as const;

export type TestStatus = (typeof TEST_STATUSES)[number];

export interface QuestionOption {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  text: string;
  imageUrl?: string;
  options: QuestionOption[];
  correctOptionId: string;
  ball: number;
}

export interface Test {
  id: number;
  title: string;
  duration_time: number; // daqiqa
  // Taxmin: "o'tish chegarasi" foizda. Backend bilan tasdiqlanmagan —
  // aniq ma'nosini tekshiring.
  transition_assessment: number;
  test_type: string;
  level: string;
  questions_count: number;
  is_active: boolean;
  created_at: string; // ISO
}

export interface TestFormValues {
  title: string;
  subjectId: string;
  format: TestFormat;
  durationMinutes: number;
  status: TestStatus;
  questions: Question[];
}

export type TaxamonyTopic = {
  id: number;
  title: string;
  order: number;
};

type Module = {
  id: number;
  title: string;
  description: string;
  topics: TaxamonyTopic[];
};
export type TaxamonySubject = {
  id: number;
  title: string;
  description?: string;
  modules: Module[];
};

export type Taxamony = {
  id: number;
  title: TestFormat;
  subjects: TaxamonySubject[];
};


export function formatRawLabel(value: string | null | undefined): string {
  if (!value) return "—";
 
  return value
    .split(/[_\s]+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}
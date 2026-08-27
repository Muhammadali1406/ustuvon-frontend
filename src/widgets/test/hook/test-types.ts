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
  id: string;
  title: string;
  subjectId: string;
  subjectName: string; // ko'rsatish uchun denormalize qilingan
  format: TestFormat;
  questionsCount: number;
  totalBall: number;
  durationMinutes: number;
  status: TestStatus;
  createdAt: string; // ISO
  createdVia: "ai" | "manual";
}

export interface TestFormValues {
  title: string;
  subjectId: string;
  format: TestFormat;
  durationMinutes: number;
  status: TestStatus;
  questions: Question[];
}

type Module = {
  id: number;
  title: string;
  description: string;
};

export type TaxamonySubject = {
  id: number;
  title: string;
  description?: string;
  modules: Module[];
};

export type Taxamony = {
  id: number;
  title: string;
  subjects: TaxamonySubject[];
};
// src/types/subject.ts

export const SUBJECT_CATEGORIES = [
  "Tabiiy fanlar",
  "Chet tillari",
  "Sertifikatlar",
  "DTM",
  "Qo'shish+",
] as const;

export type SubjectCategory = (typeof SUBJECT_CATEGORIES)[number];

export interface ScheduledTest {
  date: string; // ISO datetime
  notifyViaBot: boolean;
}

export interface Subject {
  id: string;
  name: string;
  category: SubjectCategory;
  testsCount: number;
  isActive: boolean;
  createdAt: string; // ISO date
  scheduledTest?: ScheduledTest | null;
}

export interface SubjectFormValues {
  name: string;
  category: string | number;
}

// src/data/mockTests.ts
// TODO: Backend tayyor bo'lgach bu faylni olib tashlab, API chaqiruvi bilan almashtiring.

import type { Test } from "./test-types";

export const mockTests: Test[] = [
  {
    id: "test_1",
    title: "Milliy Sertifikat — Matematika #15",
    subjectId: "subj_1",
    subjectName: "Matematika",
    format: "Milliy Sertifikat",
    questionsCount: 30,
    totalBall: 60,
    durationMinutes: 80,
    status: "Nashr qilingan",
    createdAt: "2026-06-01T10:00:00Z",
    createdVia: "ai",
  },
  {
    id: "test_2",
    title: "IELTS Reading — Practice 4",
    subjectId: "subj_3",
    subjectName: "IELTS",
    format: "IELTS",
    questionsCount: 40,
    totalBall: 40,
    durationMinutes: 60,
    status: "Tekshiruvda",
    createdAt: "2026-06-20T10:00:00Z",
    createdVia: "ai",
  },
  {
    id: "test_3",
    title: "SAT Math — Full Test 2",
    subjectId: "subj_4",
    subjectName: "SAT",
    format: "SAT",
    questionsCount: 58,
    totalBall: 58,
    durationMinutes: 70,
    status: "Qoralama",
    createdAt: "2026-07-10T10:00:00Z",
    createdVia: "manual",
  },
  {
    id: "test_4",
    title: "DTM — Fizika #7",
    subjectId: "subj_2",
    subjectName: "Fizika",
    format: "DTM",
    questionsCount: 30,
    totalBall: 30,
    durationMinutes: 60,
    status: "Nashr qilingan",
    createdAt: "2026-05-14T10:00:00Z",
    createdVia: "ai",
  },
];

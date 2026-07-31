// src/data/mockSubjects.ts
// TODO: Backend tayyor bo'lgach bu faylni olib tashlab, API chaqiruvi bilan almashtiring.

import type { Subject } from "./type-subject";

export const mockSubjects: Subject[] = [
  {
    id: "subj_1",
    name: "Matematika",
    category: "DTM",
    testsCount: 24,
    isActive: true,
    createdAt: "2026-03-12T09:00:00Z",
    scheduledTest: {
      date: "2026-08-02T15:00:00Z",
      notifyViaBot: true,
    },
  },
  {
    id: "subj_2",
    name: "Fizika",
    category: "Tabiiy fanlar",
    testsCount: 18,
    isActive: true,
    createdAt: "2026-02-20T09:00:00Z",
    scheduledTest: null,
  },
  {
    id: "subj_3",
    name: "IELTS",
    category: "Sertifikatlar",
    testsCount: 12,
    isActive: true,
    createdAt: "2026-01-05T09:00:00Z",
    scheduledTest: null,
  },
  {
    id: "subj_4",
    name: "SAT",
    category: "Sertifikatlar",
    testsCount: 9,
    isActive: false,
    createdAt: "2026-04-18T09:00:00Z",
    scheduledTest: null,
  },
  {
    id: "subj_5",
    name: "Ingliz tili",
    category: "Chet tillari",
    testsCount: 31,
    isActive: true,
    createdAt: "2025-11-30T09:00:00Z",
    scheduledTest: null,
  },
];
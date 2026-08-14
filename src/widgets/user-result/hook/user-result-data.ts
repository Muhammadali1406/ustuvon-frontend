// ---------------------------------------------------------------------------
// Foydalanuvchining ishlagan testlari tarixi (demo). Backend tayyor bo'lgach
// GET /me/results bilan almashtiriladi. Home sahifasidagi "Oxirgi natijalar"
// va "Eng yaxshi natijalarim" bloklari ham shu ro'yxatdan hisoblanadi.
// ---------------------------------------------------------------------------

import { SUBJECT_CATALOG } from "@/widgets/user-subject/hook/subject-data";

export interface ResultRecord {
  id: string;
  subjectId: string;
  subjectName: string;
  testTitle: string;
  totalQuestions: number;
  correctCount: number;
  percent: number;
  score: number;
  durationMinutes: number;
  date: string; // "12.07.2026"
  dateValue: number; // saralash uchun timestamp
}

function buildResultHistory(): ResultRecord[] {
  const records: ResultRecord[] = [];
  const startDate = new Date(2026, 5, 1); // 01.06.2026

  for (let i = 0; i < 28; i++) {
    const subject = SUBJECT_CATALOG[i % SUBJECT_CATALOG.length];
    const day = new Date(startDate);
    day.setDate(startDate.getDate() + i * 2);

    const totalQuestions = 30;
    const percent = Math.max(
      35,
      Math.min(98, Math.round(60 + Math.sin(i * 0.8) * 25 + (i % 5))),
    );
    const correctCount = Math.round((percent / 100) * totalQuestions);

    records.push({
      id: `result-${i}`,
      subjectId: subject.id,
      subjectName: subject.name,
      testTitle: `${(i % 8) + 1}-variant`,
      totalQuestions,
      correctCount,
      percent,
      score: Math.round((percent / 100) * 100),
      durationMinutes: 45 + (i % 15),
      date: `${String(day.getDate()).padStart(2, "0")}.${String(
        day.getMonth() + 1,
      ).padStart(2, "0")}.${day.getFullYear()}`,
      dateValue: day.getTime(),
    });
  }

  return records.sort((a, b) => b.dateValue - a.dateValue);
}

export const RESULT_HISTORY: ResultRecord[] = buildResultHistory();

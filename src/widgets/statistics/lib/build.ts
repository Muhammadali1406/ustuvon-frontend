import { NAMES, SUBJECTS } from "./mock-test-data-statistics";
import type {
  DailyActivityPoint,
  ResultRow,
  SubjectPopularity,
} from "./types-statistics";

export function buildDailyActivity(): DailyActivityPoint[] {
  const days = 14;
  const points: DailyActivityPoint[] = [];
  const base = new Date(2026, 6, 10); // 10.07.2026

  for (let i = 0; i < days; i++) {
    const d = new Date(base);
    d.setDate(base.getDate() + i);
    const weekday = d.getDay();
    const weekendDip = weekday === 0 || weekday === 6 ? 0.7 : 1;

    points.push({
      date: `${String(d.getDate()).padStart(2, "0")}.${String(
        d.getMonth() + 1,
      ).padStart(2, "0")}`,
      activeUsers: Math.round((180 + i * 9 + Math.sin(i) * 25) * weekendDip),
      newUsers: Math.round((14 + i * 1.4 + Math.cos(i) * 4) * weekendDip),
    });
  }
  return points;
}

export function buildSubjectPopularity(): SubjectPopularity[] {
  return [
    { subject: "Matematika", attempts: 1284 },
    { subject: "DTM", attempts: 968 },
    { subject: "IELTS", attempts: 742 },
    { subject: "Milliy Sertifikat", attempts: 611 },
    { subject: "Ingliz tili", attempts: 449 },
    { subject: "Fizika", attempts: 320 },
  ];
}

export function buildResults(): ResultRow[] {
  const rows: ResultRow[] = [];
  for (let i = 0; i < 42; i++) {
    const day = 12 + (i % 14);
    const percent = 55 + Math.round(Math.sin(i * 1.3) * 20 + 20);
    rows.push({
      id: `res-${i}`,
      fullName: NAMES[i % NAMES.length],
      subject: SUBJECTS[i % SUBJECTS.length],
      test: `${SUBJECTS[i % SUBJECTS.length]} — Variant ${(i % 9) + 1}`,
      score: Math.round((percent / 100) * 30),
      percent,
      date: `${String(day).padStart(2, "0")}.07.2026`,
    });
  }
  return rows.sort((a, b) => (a.date < b.date ? 1 : -1));
}

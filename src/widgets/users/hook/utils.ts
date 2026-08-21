import { FIRST_NAMES, LAST_NAMES } from "./mock-data-users";
import type { UserRow } from "./types-users";

export function buildUsers(): UserRow[] {
  const rows: UserRow[] = [];

  for (let i = 0; i < 34; i++) {
    const first = FIRST_NAMES[i % FIRST_NAMES.length];
    const last = LAST_NAMES[(i * 3) % LAST_NAMES.length];
    const day = 1 + (i % 27);
    const testsTaken = Math.round(2 + Math.sin(i * 0.7) * 8 + 10);
    const avgScore = Math.max(
      35,
      Math.min(98, Math.round(60 + Math.cos(i * 0.9) * 25)),
    );
    const bestScore = Math.min(100, avgScore + Math.round(5 + (i % 12)));

    rows.push({
      id: `user-${i}`,
      userCode: `UST-${String(1000 + i)}`,
      fullName: `${first} ${last}`,
      phone: `+998 9${(i % 9) + 1} ${String(100 + i).slice(0, 3)} ${String(
        10 + i,
      ).padStart(2, "0")} ${String(20 + i).padStart(2, "0")}`,
      email: `${first.toLowerCase()}.${last.toLowerCase()}@gmail.com`,
      joinedAt: `${String(day).padStart(2, "0")}.07.2026`,
      testsTaken,
      avgScore,
      bestScore,
      status: i % 11 === 0 ? "bloklangan" : "faol",
    });
  }

  return rows;
}

export function initials(fullName: string) {
  return fullName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

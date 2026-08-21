import type { STATUS_FILTERS } from "./mock-data-users";

export type UserStatus = "faol" | "bloklangan";

export interface UserRow {
  id: string;
  userCode: string; // profilda ko'rsatiladigan maxsus id (TZ: "8. Profil")
  fullName: string;
  phone: string;
  email: string;
  joinedAt: string; // "12.07.2026"
  testsTaken: number;
  avgScore: number; // foizda
  bestScore: number; // foizda
  status: UserStatus;
}

export type StatusFilterKey = (typeof STATUS_FILTERS)[number]["key"];

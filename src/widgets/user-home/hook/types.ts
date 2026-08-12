import type { LucideIcon } from "lucide-react";

export interface Subject {
  id: string;
  name: string;
  category: string;
  testCount: number;
  icon: LucideIcon;
}

export interface ResultItem {
  id: string;
  subject: string;
  test: string;
  percent: number;
  date: string;
}

export interface DemoUser {
  fullName: string;
  userCode: string;
  email: string;
  phone: string;
  joinedAt: string;
  testsTaken: number;
  avgScore: number;
  bestScore: number;
}
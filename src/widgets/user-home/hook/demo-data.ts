import type { AuthUser } from "@/components/zustand/auth-info";
import type { DemoUser, ResultItem, Subject } from "./types";
import {
  Atom,
  Award,
  ClipboardCheck,
  Dna,
  FlaskConical,
  Globe,
  Languages,
  Sigma,
} from "lucide-react";

export const DEMO_USER: AuthUser = {
  id: "8f7c9e2a-4b31-4d6e-91a2-5c8f3b7e1042",
  first_name: "John",
  last_name: "Doe",
  phone: "+998901234567",
  email: "john.doe@example.com",
  is_phone_verified: true,
  is_email_verified: true,
  created_at: "2026-08-21T07:30:00Z",
  updated_at: "2026-08-21T07:30:00Z",
};

export const SUBJECTS: Subject[] = [
  {
    id: "matematika",
    name: "Matematika",
    category: "Milliy Sertifikat",
    testCount: 36,
    icon: Sigma,
  },
  {
    id: "fizika",
    name: "Fizika",
    category: "Milliy Sertifikat",
    testCount: 24,
    icon: Atom,
  },
  {
    id: "ielts",
    name: "IELTS",
    category: "Xalqaro sertifikat",
    testCount: 42,
    icon: Languages,
  },
  {
    id: "dtm",
    name: "DTM",
    category: "Davlat test markazi",
    testCount: 128,
    icon: ClipboardCheck,
  },
  {
    id: "sat",
    name: "SAT",
    category: "Xalqaro qabul testi",
    testCount: 18,
    icon: Award,
  },
  {
    id: "ingliz-tili",
    name: "Ingliz tili",
    category: "Barcha darajalar",
    testCount: 54,
    icon: Globe,
  },
  {
    id: "kimyo",
    name: "Kimyo",
    category: "Milliy Sertifikat",
    testCount: 19,
    icon: FlaskConical,
  },
  {
    id: "biologiya",
    name: "Biologiya",
    category: "Milliy Sertifikat",
    testCount: 21,
    icon: Dna,
  },
];

export const INITIAL_SUBJECT_COUNT = 6;

export const RECENT_RESULTS: ResultItem[] = [
  {
    id: "r1",
    subject: "Matematika",
    test: "Milliy Sertifikat — Variant 15",
    percent: 86,
    date: "12.07.2026",
  },
  {
    id: "r2",
    subject: "IELTS",
    test: "Variant 4",
    percent: 74,
    date: "10.07.2026",
  },
  {
    id: "r3",
    subject: "DTM",
    test: "Variant 21",
    percent: 68,
    date: "07.07.2026",
  },
  {
    id: "r4",
    subject: "Fizika",
    test: "Milliy Sertifikat — Variant 8",
    percent: 91,
    date: "03.07.2026",
  },
];

export const BEST_RESULTS: ResultItem[] = [
  {
    id: "b1",
    subject: "Fizika",
    test: "Milliy Sertifikat — Variant 8",
    percent: 91,
    date: "03.07.2026",
  },
  {
    id: "b2",
    subject: "Matematika",
    test: "Milliy Sertifikat — Variant 15",
    percent: 86,
    date: "12.07.2026",
  },
  {
    id: "b3",
    subject: "Ingliz tili",
    test: "Variant 12",
    percent: 82,
    date: "28.06.2026",
  },
];

export const QUICK_STATS = {
  testsTaken: 24,
  avgScore: 78,
  bestScore: 91,
};

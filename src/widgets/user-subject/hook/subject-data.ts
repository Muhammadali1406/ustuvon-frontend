import type { LucideIcon } from "lucide-react";
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

// ---------------------------------------------------------------------------
// Fanlar katalogi — Home, Subjects va SubjectDetail sahifalari shu yerdan
// bitta manbadan foydalanadi. Backend tayyor bo'lgach GET /subjects bilan
// almashtiriladi.
// ---------------------------------------------------------------------------

export interface Subject {
  id: string;
  name: string;
  category: string;
  description: string;
  testCount: number;
  icon: LucideIcon;
}

export const SUBJECT_CATALOG: Subject[] = [
  {
    id: "matematika",
    name: "Matematika",
    category: "Milliy Sertifikat",
    description: "Algebra, geometriya va analiz asoslari bo'yicha testlar",
    testCount: 36,
    icon: Sigma,
  },
  {
    id: "fizika",
    name: "Fizika",
    category: "Milliy Sertifikat",
    description: "Mexanika, elektr va termodinamika bo'yicha testlar",
    testCount: 24,
    icon: Atom,
  },
  {
    id: "ielts",
    name: "IELTS",
    category: "Xalqaro sertifikat",
    description: "Listening, Reading, Writing va Speaking bo'yicha simulyatsiya",
    testCount: 42,
    icon: Languages,
  },
  {
    id: "dtm",
    name: "DTM",
    category: "Davlat test markazi",
    description: "Davlat test markazi rasmiy formatidagi testlar",
    testCount: 128,
    icon: ClipboardCheck,
  },
  {
    id: "sat",
    name: "SAT",
    category: "Xalqaro qabul testi",
    description: "Xorijiy universitetlarga qabul uchun standart test",
    testCount: 18,
    icon: Award,
  },
  {
    id: "ingliz-tili",
    name: "Ingliz tili",
    category: "Til",
    description: "Boshlang'ichdan yuqori darajagacha grammatika va lug'at",
    testCount: 54,
    icon: Globe,
  },
  {
    id: "kimyo",
    name: "Kimyo",
    category: "Milliy Sertifikat",
    description: "Anorganik va organik kimyo bo'yicha testlar",
    testCount: 19,
    icon: FlaskConical,
  },
  {
    id: "biologiya",
    name: "Biologiya",
    category: "Milliy Sertifikat",
    description: "Odam, o'simlik va hayvonot olami bo'yicha testlar",
    testCount: 21,
    icon: Dna,
  },
];
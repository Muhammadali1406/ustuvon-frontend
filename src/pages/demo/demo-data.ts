import {
  BookOpen,
  Calculator,
  ChartColumn,
  Cloud,
  Compass,
  FileSpreadsheet,
  Flag,
  GraduationCap,
  History,
  Layers,
  LayoutList,
  ListOrdered,
  Megaphone,
  Monitor,
  PenTool,
  Save,
  Server,
  ShieldCheck,
  Sparkles,
  ClipboardCheck,
  Timer,
  type LucideIcon,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Bo'limlar (navigatsiya)                                             */
/* ------------------------------------------------------------------ */

export const SECTIONS = [
  { id: "muammo-yechim", no: "01", label: "Muammo → Yechim" },
  { id: "jamoa", no: "02", label: "Jamoa" },
  { id: "nega-biz", no: "03", label: "Nega aynan biz" },
  { id: "yol-xaritasi", no: "04", label: "Yo'l xaritasi" },
  { id: "amalga-oshirish", no: "05", label: "Amalga oshirish" },
  { id: "demo", no: "06", label: "Demo" },
] as const;

/* ------------------------------------------------------------------ */
/* Loyiha havolalari — bo'sh qoldirilgan havola ko'rsatilmaydi         */
/* ------------------------------------------------------------------ */

export const PROJECT_LINKS: {
  label: string;
  note: string;
  href: string;
  external?: boolean;
}[] = [
  { label: "Website", note: "ustuvon.uz", href: "https://ustuvon.uz", external: true },
  { label: "Demo", note: "Demo-video (6.1)", href: "#demo-video" },
  // GitHub va Figma havolalarini shu yerga qo'shing — bo'sh qoldirilgani ko'rsatilmaydi.
  { label: "GitHub", note: "Source code", href: "", external: true },
  { label: "Figma", note: "UI/UX dizayn", href: "", external: true },
];

/* ------------------------------------------------------------------ */
/* 06 — Demo-video                                                     */
/* ------------------------------------------------------------------ */

export const DEMO_VIDEO = {
  id: "l9hAV0ci1sk",
  watchUrl: "https://youtu.be/l9hAV0ci1sk",
  title: "Ustuvon — demo-video",
  description:
    "This video explains how our platform is made, what its purpose is, and what problem we are solving.",
};

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

export const DIRECTIONS = [
  "EdTech",
  "AI",
  "Online Education",
  "Assessment",
  "Certification",
];

export const LANGUAGES = [
  { code: "UZ", name: "O'zbek" },
  { code: "RU", name: "Rus" },
  { code: "EN", name: "Ingliz" },
];

export const MARKET_PATH = [
  "O'zbekiston",
  "Markaziy Osiyo",
];

export const CHAIN = [
  "Test",
  "Kurs",
  "AI",
  "Tahlil",
  "Sertifikat",
  "Professional rivojlanish",
];


/* ------------------------------------------------------------------ */
/* 01 — Muammo                                                         */
/* ------------------------------------------------------------------ */

export const PROBLEMS = [
  {
    title: "Yagona tizim yo'q",
    text: "O'quvchilar uchun yagona ta'lim va baholash tizimi mavjud emas.",
  },
  {
    title: "Yuqori xarajat",
    text: "Ta'lim markazlari professional test tizimini yaratishda katta vaqt va mablag' sarflaydi.",
  },
  {
    title: "Qo'lda raqamlashtirish",
    text: "Savollarni qo'lda online test formatiga o'tkazish ko'p vaqt talab qiladi.",
  },
  {
    title: "Format xilma-xilligi",
    text: "Turli imtihonlar uchun alohida format va tizim yaratishga to'g'ri keladi.",
  },
  {
    title: "Uzilgan jarayon",
    text: "Kurs, test, natija, sertifikat va rivojlanish jarayoni yagona tizimga birlashtirilmagan.",
  },
  {
    title: "Til to'sig'i",
    text: "Kontentni turli tillarga professional moslashtirish murakkab va qimmat jarayon.",
  },
];

export const FRAGMENTS = [
  "Kurs",
  "Test",
  "Natija",
  "Sertifikat",
  "Rivojlanish",
];

/* ------------------------------------------------------------------ */
/* 02 — Yechim                                                         */
/* ------------------------------------------------------------------ */

export const JOURNEY = [
  "Testni tanlaydi",
  "Real imtihon muhitida topshiradi",
  "Natijani oladi",
  "Xatolarini ko'radi",
  "Bilim darajasini tahlil qiladi",
  "Rivojlanish yo'nalishini belgilaydi",
  "Sertifikat oladi",
];

export const TOPIC_SCORES = [
  { topic: "Algebra", value: 82 },
  { topic: "Geometriya", value: 61 },
  { topic: "Ehtimollik", value: 45 },
];

export const EXAM_ENV: { icon: LucideIcon; label: string }[] = [
  { icon: Timer, label: "Vaqt chegarasi" },
  { icon: ListOrdered, label: "Savollarni ketma-ket yoki belgilangan tartibda berish" },
  { icon: LayoutList, label: "Bo'limlarga ajratish" },
  { icon: Save, label: "Javoblarni saqlash" },
  { icon: Flag, label: "Testni yakunlash" },
  { icon: Calculator, label: "Natijani avtomatik hisoblash" },
  { icon: ChartColumn, label: "Natijani tahlil qilish" },
  { icon: FileSpreadsheet, label: "Imtihon statistikasi" },
  { icon: History, label: "Natijalar tarixi" },
];

/* ------------------------------------------------------------------ */
/* 03 — AI Test Generator                                              */
/* ------------------------------------------------------------------ */

export const AI_PIPELINE = [
  { title: "Upload", sub: "PDF / DOCX / XLSX / Text" },
  { title: "Document Processing", sub: "Fayl tuzilmasini o'qish" },
  { title: "OCR / Text Extraction", sub: "Matnni ajratib olish" },
  { title: "AI Analysis", sub: "Mazmunni tahlil qilish" },
  { title: "Question Detection", sub: "Savollarni aniqlash" },
  { title: "Answer Detection", sub: "To'g'ri javoblarni aniqlash" },
  { title: "Exam Format Detection", sub: "Imtihon formatini aniqlash" },
  { title: "Structured JSON", sub: "Tizim tushunadigan struktura" },
  { title: "Admin Review", sub: "Administrator tekshiradi" },
  { title: "Publish", sub: "Foydalanuvchilarga taqdim etiladi" },
];

export const ADMIN_FLOW = [
  "PDF, Word, Excel yoki boshqa manbadagi testni yuklaydi.",
  "AI savollarni tahlil qiladi.",
  "Savollarni belgilangan imtihon formatiga moslashtiradi.",
  "Savol variantlari, to'g'ri javoblar va boshqa parametrlarni ajratadi.",
  "Testni USTUVON tizimida online formatga o'tkazadi.",
  "Administrator testni tekshiradi va tasdiqlaydi.",
  "Tayyor test foydalanuvchilarga taqdim etiladi.",
];

export const EXAM_FORMATS = [
  "IELTS",
  "Milliy sertifikat",
  "Universitet imtihonlari",
  "Maktab fanlari",
  "Kasbiy sertifikatlar",
  "Til imtihonlari",
  "Professional assessment",
  "Boshqa xalqaro imtihonlar",
];

/* ------------------------------------------------------------------ */
/* 04 — Arxitektura                                                    */
/* ------------------------------------------------------------------ */

export const ARCH_LAYERS = [
  "Frontend",
  "Backend API",
  "Authentication",
  "Test Engine",
  "Database",
  "Analytics",
  "Certificate System",
];

export const ENGINE_DUTIES = [
  "Savollarni yuklaydi",
  "Vaqtni boshqaradi",
  "Javoblarni saqlaydi",
  "Test holatini nazorat qiladi",
  "Natijani hisoblaydi",
  "Statistikani yaratadi",
];

/** [daraxt chizig'i, nom] — Exam konfiguratsiyasi */
export const EXAM_TREE: [string, string][] = [
  ["", "Exam"],
  ["├── ", "Sections"],
  ["│   ├── ", "Questions"],
  ["│   ├── ", "Time"],
  ["│   └── ", "Rules"],
  ["├── ", "Scoring"],
  ["└── ", "Result"],
];

export const TECH_STACK: {
  group: string;
  note?: string;
  items: string[];
}[] = [
  {
    group: "Frontend",
    items: [
      "React",
      "Vite",
      "JavaScript / TypeScript",
      "Tailwind CSS",
      "React Router",
      "i18n",
    ],
  },
  {
    group: "Backend",
    items: [
      "Node.js",
      "Express.js",
      "REST API",
      "Authentication / Authorization",
    ],
  },
  {
    group: "Database",
    note: "Kelajakda katta hajmdagi ma'lumotlar uchun arxitektura kengaytiriladi.",
    items: ["MongoDB yoki PostgreSQL"],
  },
  {
    group: "AI",
    items: [
      "Large Language Models",
      "AI API",
      "OCR",
      "Document parsing",
      "Structured output",
      "AI question generation",
      "AI classification",
      "AI content analysis",
    ],
  },
  {
    group: "Infrastructure",
    items: [
      "Cloud server",
      "CDN",
      "Object Storage",
      "Database hosting",
      "Monitoring",
      "Backup",
      "CI/CD",
    ],
  },
  {
    group: "Security",
    items: [
      "JWT / OAuth",
      "Role-Based Access Control",
      "Encryption",
      "Rate limiting",
      "Audit logs",
      "Secure API",
      "Data backup",
    ],
  },
];

/* ------------------------------------------------------------------ */
/* 05 — Jamoa                                                          */
/* ------------------------------------------------------------------ */

export type TeamGroup = "Texnik" | "Ta'limiy" | "Biznes";

export const TEAM_GROUPS: TeamGroup[] = ["Texnik", "Ta'limiy", "Biznes"];

export const TEAM_ROLES: {
  icon: LucideIcon;
  role: string;
  duty: string;
  group: TeamGroup;
  skills: string[];
}[] = [
  {
    icon: Compass,
    role: "Project Manager / Founder",
    duty: "Loyiha strategiyasi, boshqaruv va rivojlantirish",
    group: "Biznes",
    skills: ["Strategiya", "Boshqaruv", "Mahsulot rivoji"],
  },
  {
    icon: Monitor,
    role: "Frontend Developer",
    duty: "Foydalanuvchi interfeysi va web platforma",
    group: "Texnik",
    skills: ["React", "TypeScript", "Tailwind CSS", "React Router", "i18n"],
  },
  {
    icon: Server,
    role: "Backend Developer",
    duty: "Server, API va biznes logika",
    group: "Texnik",
    skills: ["Node.js", "Express.js", "REST API", "Authentication"],
  },
  {
    icon: Layers,
    role: "Full-Stack Developer",
    duty: "Frontend va backend integratsiyasi",
    group: "Texnik",
    skills: ["Frontend + Backend", "API integratsiyasi"],
  },
  {
    icon: PenTool,
    role: "UI/UX Designer",
    duty: "Platforma dizayni va foydalanuvchi tajribasi",
    group: "Texnik",
    skills: ["Figma", "UI/UX dizayn", "Prototiplash"],
  },
  {
    icon: Sparkles,
    role: "AI Engineer",
    duty: "AI Test Generator va AI funksiyalar",
    group: "Texnik",
    skills: ["LLM", "OCR", "Document parsing", "Structured output"],
  },
  {
    icon: ShieldCheck,
    role: "QA Engineer",
    duty: "Testlash va sifat nazorati",
    group: "Texnik",
    skills: ["Testlash", "Sifat nazorati"],
  },
  {
    icon: Cloud,
    role: "DevOps Engineer",
    duty: "Server, deployment, monitoring",
    group: "Texnik",
    skills: ["Cloud", "CI/CD", "Monitoring", "Backup"],
  },
  {
    icon: GraduationCap,
    role: "Education Expert",
    duty: "Ta'lim metodikasi va kurslar",
    group: "Ta'limiy",
    skills: ["Ta'lim metodikasi", "Kurs ssenariysi"],
  },
  {
    icon: ClipboardCheck,
    role: "Test Specialist",
    duty: "Professional test va imtihon savollarini ishlab chiqish",
    group: "Ta'limiy",
    skills: ["Imtihon savollari", "Test formatlari"],
  },
  {
    icon: BookOpen,
    role: "Content Team",
    duty: "Kurslar va o'quv materiallarini tayyorlash",
    group: "Ta'limiy",
    skills: ["O'quv materiallari", "Kurs kontenti"],
  },
  {
    icon: Megaphone,
    role: "Marketing Team",
    duty: "Platformani targ'ib qilish va foydalanuvchilarni jalb qilish",
    group: "Biznes",
    skills: ["Targ'ibot", "Foydalanuvchilarni jalb qilish", "Analytics"],
  },
];

export const PILLAR_MAP: {
  name: string;
  covers: string;
  roles: string[];
}[] = [
  {
    name: "Ta'lim",
    covers: "Ta'lim metodikasi, kurslar va o'quv materiallari",
    roles: ["Education Expert", "Content Team"],
  },
  {
    name: "Baholash",
    covers: "Professional test va imtihon savollari, sifat nazorati",
    roles: ["Test Specialist", "QA Engineer"],
  },
  {
    name: "AI",
    covers: "AI Test Generator va AI funksiyalar",
    roles: ["AI Engineer"],
  },
  {
    name: "Biznes",
    covers: "Strategiya, boshqaruv va foydalanuvchilarni jalb qilish",
    roles: ["Project Manager / Founder", "Marketing Team"],
  },
];

export const BUILDERS = [
  "Frontend Developer",
  "Backend Developer",
  "Full-Stack Developer",
  "UI/UX Designer",
  "DevOps Engineer",
];

export const TOOLS = [
  { name: "GitHub", use: "Source code va jamoaviy development" },
  { name: "Figma", use: "UI/UX design" },
  { name: "Cloud platformalar", use: "Deployment" },
  { name: "AI API xizmatlari", use: "AI funksiyalar" },
  { name: "Analytics platformalar", use: "Foydalanuvchi va mahsulot tahlili" },
];

/* ------------------------------------------------------------------ */
/* 06 — Yo'l xaritasi                                                  */
/* ------------------------------------------------------------------ */

export const PROTOTYPE_PAGES = [
  "Landing Page",
  "Registration",
  "Login",
  "User Profile",
  "Test Catalog",
  "Test Page",
  "Exam Environment",
  "Result Page",
  "Statistics",
  "Certificate",
  "Admin Panel",
];

export const PROTOTYPE_AI_FLOW = [
  "Upload",
  "AI Processing",
  "Question Extraction",
  "Format Conversion",
  "Admin Review",
  "Publish",
];

export const MVP_GROUPS = [
  {
    title: "Foydalanuvchi",
    items: [
      "Ro'yxatdan o'tish",
      "Login",
      "Profil",
      "Test tanlash",
      "Test topshirish",
      "Vaqt nazorati",
      "Natija olish",
      "Natijalar tarixi",
      "Statistikalar",
    ],
  },
  {
    title: "Admin",
    items: [
      "Test yaratish",
      "Savol qo'shish",
      "Savol bazasini boshqarish",
      "Testlarni boshqarish",
      "Foydalanuvchilarni boshqarish",
      "Natijalarni ko'rish",
    ],
  },
  {
    title: "AI",
    items: [
      "Fayldan savollarni olish",
      "Savollarni strukturaga aylantirish",
      "Javoblarni ajratish",
      "Test formatini yaratish",
      "AI yordamida test yaratish",
    ],
  },
  {
    title: "Sertifikat",
    items: [
      "Sertifikat yaratish",
      "Unique Certificate ID",
      "QR verification",
      "Sertifikatni tekshirish",
    ],
  },
];

export const EXPANSION_AFTER_UZ = [
  "Markaziy Osiyo",
  "MDH",
  "Boshqa davlatlar",
  "Global bozor",
];

/* ------------------------------------------------------------------ */
/* 07 — Kurslar va AI                                                  */
/* ------------------------------------------------------------------ */

export const COURSE_STRUCTURE = [
  "Course",
  "Module",
  "Topic",
  "Video",
  "Material",
  "Practice",
  "Test",
  "Result",
  "Certificate",
];

export const PEDAGOGY = [
  "Tushunish",
  "Mashq qilish",
  "Tekshirish",
  "Xatolarni aniqlash",
  "Mustahkamlash",
  "Imtihon",
];

export const DUBBING = [
  { code: "UZ", label: "O'zbekcha audio" },
  { code: "RU", label: "Ruscha dublyaj" },
  { code: "EN", label: "Inglizcha dublyaj" },
];

export const LEARNING_LOOP = [
  "Test",
  "Tahlil",
  "Tavsiya",
  "Kurs",
  "Mashq",
  "Qayta test",
];

export const AI_RECOMMENDATION =
  "Sizda ehtimollik mavzusida qiyinchilik mavjud. Quyidagi darslarni o'rganishingiz va ushbu testlarni qayta ishlashingiz tavsiya etiladi.";

/* ------------------------------------------------------------------ */
/* 08 — Sertifikat va global                                           */
/* ------------------------------------------------------------------ */

export const CERT_FIELDS = [
  "Foydalanuvchi ismi",
  "Kurs / imtihon nomi",
  "Natija",
  "Berilgan sana",
  "Certificate ID",
  "QR Code",
  "USTUVON verification sahifasi",
];

export const EXPANSION = [
  "O'zbekiston",
  "Markaziy Osiyo",
  "MDH",
  "Osiyo",
  "Yevropa",
  "Yaqin Sharq",
  "Global",
];

export const GLOBAL_CAPS = [
  "Ko'p tillilik",
  "Xalqaro sertifikatlash",
  "Xalqaro imtihon formatlari",
  "Global payment",
  "Cloud infrastructure",
  "Yuqori yuklama",
  "Data security",
  "AI personalization",
  "Anti-cheating",
  "Proctoring",
];

/* ------------------------------------------------------------------ */
/* 09 — Ekotizim                                                       */
/* ------------------------------------------------------------------ */

export const ECOSYSTEM = [
  "O'rganadi",
  "Mashq qiladi",
  "Test topshiradi",
  "Natijasini ko'radi",
  "Xatolarini tahlil qiladi",
  "AI tavsiya oladi",
  "Bilimini rivojlantiradi",
  "Imtihon topshiradi",
  "Sertifikat oladi",
  "Kasbiy rivojlanadi",
];

export const ADVANTAGE = [
  "AI Test Generator",
  "Real Exam Environment",
  "Learning Platform",
  "AI Analytics",
  "Certification",
];

/* ------------------------------------------------------------------ */
/* 05 — Arxitektura qatlamlari va amalga oshirish bosqichlari          */
/* ------------------------------------------------------------------ */

export const ARCH_DETAILS: Record<string, { text: string; tech: string[] }> = {
  Frontend: {
    text: "Foydalanuvchi va administrator ko'radigan barcha interfeys.",
    tech: ["React", "Vite", "TypeScript", "Tailwind CSS", "React Router", "i18n"],
  },
  "Backend API": {
    text: "Server, API va biznes logika.",
    tech: ["Node.js", "Express.js", "REST API", "Rate limiting", "Secure API"],
  },
  Authentication: {
    text: "Kim kira oladi va nimaga huquqi bor.",
    tech: ["JWT / OAuth", "Role-Based Access Control", "Audit logs"],
  },
  "Test Engine": {
    text: "Tizimning markaziy qismi: imtihonni boshidan oxirigacha boshqaradi.",
    tech: [
      "Savollarni yuklash",
      "Vaqt nazorati",
      "Javoblarni saqlash",
      "Natijani hisoblash",
    ],
  },
  "Question Bank": {
    text: "Professional savollar bazasi, AI Test Generator bilan to'ldiriladi.",
    tech: ["Professional Question Bank", "AI Test Generator"],
  },
  Database: {
    text: "Boshlang'ich bosqichda; kelajakda katta hajm uchun kengaytiriladi.",
    tech: ["MongoDB yoki PostgreSQL", "Database hosting", "Backup"],
  },
  Analytics: {
    text: "Natijalar, statistika va rivojlanish tahlili.",
    tech: ["Imtihon statistikasi", "Natijalar tarixi", "Analytics platformalar"],
  },
  "Certificate System": {
    text: "Tekshiriladigan sertifikatlar.",
    tech: ["Unique Certificate ID", "QR verification", "Verification sahifasi"],
  },
};

export const PHASES = [
  {
    no: 1,
    name: "Professional test platformasi",
    lead: "Birinchi navbatda USTUVONning assessment qismi ishlab chiqiladi.",
    parts: [
      "Test Engine",
      "Question Bank",
      "Analytics",
      "Certificate System",
      "AI Test Generator",
    ],
  },
  {
    no: 2,
    name: "Online kurslar",
    lead: "Test platformasi barqaror ishlagach, online ta'lim qismi qo'shiladi.",
    parts: ["Kurslar", "Ko'p tilli kontent", "AI Learning System"],
  },
  {
    no: 3,
    name: "Global platformaga aylanish",
    lead: "Platforma dastlab O'zbekiston bozorida sinovdan o'tkaziladi, keyin bosqichma-bosqich kengayadi.",
    parts: ["Xalqaro bozorlar", "Xalqaro sertifikatlash", "Yuqori yuklama"],
  },
];

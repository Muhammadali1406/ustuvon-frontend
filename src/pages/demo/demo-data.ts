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
  { id: "boshi", no: "00", label: "Boshi" },
  { id: "muammo", no: "01", label: "Muammo" },
  { id: "yechim", no: "02", label: "Yechim" },
  { id: "ai-generator", no: "03", label: "AI Generator" },
  { id: "arxitektura", no: "04", label: "Arxitektura" },
  { id: "jamoa", no: "05", label: "Jamoa" },
  { id: "yol-xaritasi", no: "06", label: "Yo'l xaritasi" },
  { id: "kurslar-ai", no: "07", label: "Kurslar va AI" },
  { id: "sertifikat-global", no: "08", label: "Sertifikat va global" },
  { id: "ekotizim", no: "09", label: "Ekotizim" },
] as const;

/* ------------------------------------------------------------------ */
/* Loyiha havolalari — bo'sh qoldirilgan havola ko'rsatilmaydi         */
/* ------------------------------------------------------------------ */

export const PROJECT_LINKS: { label: string; href: string }[] = [
  { label: "Website", href: "https://ustuvon.uz" },
  { label: "GitHub", href: "" },
  { label: "Figma", href: "" },
];

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
  "MDH",
  "Global bozor",
];

export const CHAIN = [
  "Test",
  "Kurs",
  "AI",
  "Tahlil",
  "Sertifikat",
  "Professional rivojlanish",
];

export const FACTS = [
  { value: 3, label: "Boshlang'ich til", note: "O'zbek · Rus · Ingliz" },
  { value: 4, label: "Bosqichli yo'l xaritasi", note: "Idea → Launched" },
  { value: 10, label: "Bosqichli AI pipeline", note: "Upload → Publish" },
  { value: 12, label: "Jamoa roli", note: "Texnik · ta'lim · biznes" },
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
    title: "Real imtihon muhiti yo'q",
    text: "Ko'plab online testlar oddiy savol-javob shaklida — real imtihon muhitini to'liq taqlid qilmaydi.",
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
    title: "Sayoz tahlil",
    text: "O'quvchining bilim darajasi va rivojlanishini chuqur tahlil qilish imkoniyati cheklangan.",
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
  "Question Bank",
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
}[] = [
  {
    icon: Compass,
    role: "Project Manager / Founder",
    duty: "Loyiha strategiyasi, boshqaruv va rivojlantirish",
    group: "Biznes",
  },
  {
    icon: Monitor,
    role: "Frontend Developer",
    duty: "Foydalanuvchi interfeysi va web platforma",
    group: "Texnik",
  },
  {
    icon: Server,
    role: "Backend Developer",
    duty: "Server, API va biznes logika",
    group: "Texnik",
  },
  {
    icon: Layers,
    role: "Full-Stack Developer",
    duty: "Frontend va backend integratsiyasi",
    group: "Texnik",
  },
  {
    icon: PenTool,
    role: "UI/UX Designer",
    duty: "Platforma dizayni va foydalanuvchi tajribasi",
    group: "Texnik",
  },
  {
    icon: Sparkles,
    role: "AI Engineer",
    duty: "AI Test Generator va AI funksiyalar",
    group: "Texnik",
  },
  {
    icon: ShieldCheck,
    role: "QA Engineer",
    duty: "Testlash va sifat nazorati",
    group: "Texnik",
  },
  {
    icon: Cloud,
    role: "DevOps Engineer",
    duty: "Server, deployment, monitoring",
    group: "Texnik",
  },
  {
    icon: GraduationCap,
    role: "Education Expert",
    duty: "Ta'lim metodikasi va kurslar",
    group: "Ta'limiy",
  },
  {
    icon: ClipboardCheck,
    role: "Test Specialist",
    duty: "Professional test va imtihon savollarini ishlab chiqish",
    group: "Ta'limiy",
  },
  {
    icon: BookOpen,
    role: "Content Team",
    duty: "Kurslar va o'quv materiallarini tayyorlash",
    group: "Ta'limiy",
  },
  {
    icon: Megaphone,
    role: "Marketing Team",
    duty: "Platformani targ'ib qilish va foydalanuvchilarni jalb qilish",
    group: "Biznes",
  },
];

export const PILLARS = ["Ta'lim", "Baholash", "AI", "Biznes"];

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
  "Professional Question Bank",
  "Real Exam Environment",
  "Learning Platform",
  "AI Analytics",
  "Certification",
];

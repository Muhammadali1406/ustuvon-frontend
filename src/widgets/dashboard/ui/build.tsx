import type { ActivityItem, ReviewQueueItem, ScheduledTest } from "../hook/dahsboard-type";

export function buildActivity(): ActivityItem[] {
  return [
    {
      id: "a1",
      type: "result",
      title: "Malika Islomova IELTS — Variant 9 testini yakunladi",
      meta: "89% natija bilan",
      time: "6 daqiqa oldin",
    },
    {
      id: "a2",
      type: "registration",
      title: "Sherzod Ubaydullayev ro'yxatdan o'tdi",
      meta: "Telefon orqali tasdiqlandi",
      time: "18 daqiqa oldin",
    },
    {
      id: "a3",
      type: "payment",
      title: "Premium test uchun to'lov qabul qilindi",
      meta: "45 000 so'm — Dilnoza Rashidova",
      time: "42 daqiqa oldin",
    },
    {
      id: "a4",
      type: "test_created",
      title: "\"Fizika — Milliy Sertifikat\" testi AI orqali yaratildi",
      meta: "30 ta savol, tekshiruv kutilmoqda",
      time: "1 soat oldin",
    },
    {
      id: "a5",
      type: "result",
      title: "Sardor Aliyev Matematika — Variant 3 testini yakunladi",
      meta: "94% natija bilan",
      time: "2 soat oldin",
    },
    {
      id: "a6",
      type: "registration",
      title: "Zarina Komilova ro'yxatdan o'tdi",
      meta: "Email orqali tasdiqlandi",
      time: "3 soat oldin",
    },
  ];
}

export function buildScheduledTests(): ScheduledTest[] {
  return [
    {
      id: "s1",
      subject: "Milliy Sertifikat — Matematika",
      date: "28.07.2026, 10:00",
      audience: "1 240 obunachi",
      botNotified: true,
    },
    {
      id: "s2",
      subject: "DTM — To'liq blok",
      date: "02.08.2026, 09:00",
      audience: "3 480 obunachi",
      botNotified: true,
    },
    {
      id: "s3",
      subject: "IELTS Mock — Reading",
      date: "05.08.2026, 15:00",
      audience: "612 obunachi",
      botNotified: false,
    },
  ];
}

export function buildReviewQueue(): ReviewQueueItem[] {
  return [
    {
      id: "r1",
      subject: "Fizika — Milliy Sertifikat",
      questionsCount: 30,
      uploadedAt: "1 soat oldin",
      confidence: 92,
    },
    {
      id: "r2",
      subject: "IELTS — Reading Passage 3",
      questionsCount: 13,
      uploadedAt: "3 soat oldin",
      confidence: 76,
    },
    {
      id: "r3",
      subject: "Matematika — DTM to'plami",
      questionsCount: 45,
      uploadedAt: "5 soat oldin",
      confidence: 98,
    },
  ];
}
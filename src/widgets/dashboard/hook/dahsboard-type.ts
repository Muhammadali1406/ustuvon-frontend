export type ActivityType = "registration" | "result" | "test_created" | "payment";

export interface ActivityItem {
  id: string;
  type: ActivityType;
  title: string;
  meta: string;
  time: string; // "5 daqiqa oldin"
}

export interface ScheduledTest {
  id: string;
  subject: string;
  date: string; // "28.07.2026"
  audience: string; // "Milliy Sertifikat guruhi"
  botNotified: boolean;
}

export interface ReviewQueueItem {
  id: string;
  subject: string;
  questionsCount: number;
  uploadedAt: string; // "2 soat oldin"
  confidence: number; // AI formatlash ishonchliligi, foizda
}
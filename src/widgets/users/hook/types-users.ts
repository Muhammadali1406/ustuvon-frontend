import type { STATUS_FILTERS } from "./mock-data-users";

// Backend GET /admin-panel/users/ haqiqiy javobiga mos (AdminUserList sxemasi).
// userCode, fullName, testsTaken, avgScore, bestScore kabi maydonlar
// backend'da YO'Q — apps.results hali qurilmagan, alohida "kod" maydoni ham
// mavjud emas. Shu sabab bu tip faqat haqiqiy kelayotgan maydonlarni saqlaydi.
export interface ApiUser {
  id: string;
  first_name: string;
  last_name: string;
  phone: string | null;
  email: string | null;
  is_phone_verified: boolean;
  is_email_verified: boolean;
  is_active: boolean;
  is_staff: boolean;
  created_at: string; // ISO
}

export interface PaginatedUsers {
  count: number;
  next: string | null;
  previous: string | null;
  results: ApiUser[];
}

export type StatusFilterKey = (typeof STATUS_FILTERS)[number]["key"];
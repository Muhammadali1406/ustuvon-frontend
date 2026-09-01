import type { ApiUser } from "./types-users";

export function getFullName(user: ApiUser): string {
  return `${user.first_name} ${user.last_name}`.trim();
}

export function initials(fullName: string): string {
  return fullName
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

// Backend'da alohida "foydalanuvchi kodi" maydoni yo'q — UUID'dan vizual
// o'rinbosar hosil qilamiz (AuthUser uchun ham xuddi shunday qildik).
export function getDisplayCode(user: ApiUser): string {
  return `UST-${user.id.slice(0, 6).toUpperCase()}`;
}

export function formatJoinedDate(iso: string): string {
  return new Date(iso).toLocaleDateString("uz-UZ", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function isWithinLastDays(iso: string, days: number): boolean {
  const diffMs = Date.now() - new Date(iso).getTime();
  return diffMs >= 0 && diffMs <= days * 24 * 60 * 60 * 1000;
}

// phone yoki email null bo'lishi mumkin — qidiruvda xavfsiz solishtirish
export function safeIncludes(value: string | null, query: string): boolean {
  if (!value) return false;
  return value.toLowerCase().includes(query.toLowerCase());
}
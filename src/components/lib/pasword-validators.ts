// ---------------------------------------------------------------------------
// validators.ts — bir nechta sahifada (Register, Profil parolni yangilash)
// takrorlanmasligi uchun umumiy tekshiruv funksiyalari.
// ---------------------------------------------------------------------------

// TZ: parol kamida 9 belgi, kamida 1 harf va 1 maxsus belgidan iborat bo'lishi kerak
const PASSWORD_PATTERN = /^(?=.*[A-Za-z])(?=.*[^A-Za-z0-9]).{9,}$/;

export function isValidPassword(value: string): boolean {
  return PASSWORD_PATTERN.test(value);
}

export const PASSWORD_HINT =
  "Kamida 9 belgi, 1 harf va 1 maxsus belgi (masalan: !, @, #)";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(value: string): boolean {
  return EMAIL_PATTERN.test(value);
}

// O'zbekiston raqamlari: +998 bilan yoki bevosita 9 xonali qism
const PHONE_DIGITS_PATTERN = /^\+?\d{9,13}$/;

export function isValidPhone(value: string): boolean {
  return PHONE_DIGITS_PATTERN.test(value.replace(/[\s-]/g, ""));
}

export function normalizePhone(value: string): string {
  const digitsOnly = value.replace(/[\s-]/g, "");
  if (digitsOnly.startsWith("+")) return digitsOnly;
  if (digitsOnly.startsWith("998")) return `+${digitsOnly}`;
  return `+998${digitsOnly}`;
}
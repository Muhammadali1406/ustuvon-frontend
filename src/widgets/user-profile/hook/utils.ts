
export function initials(fullName: string) {
  return fullName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

// TZ: parol kamida 9 belgi, kamida 1 harf va 1 maxsus belgidan iborat bo'lishi kerak
export function isValidPassword(value: string) {
  return /^(?=.*[A-Za-z])(?=.*[^A-Za-z0-9]).{9,}$/.test(value);
}
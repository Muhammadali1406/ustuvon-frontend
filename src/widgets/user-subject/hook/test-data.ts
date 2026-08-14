// ---------------------------------------------------------------------------
// Har bir fan uchun test variantlari (demo). Backend tayyor bo'lgach
// GET /subjects/:id/tests bilan almashtiriladi.
// ---------------------------------------------------------------------------

export interface TestVariant {
  id: string;
  subjectId: string;
  title: string;
  questionCount: number;
  durationMinutes: number;
  attemptsCount: number;
}

function buildVariants(subjectId: string, count: number): TestVariant[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `${subjectId}-v${i + 1}`,
    subjectId,
    title: `${i + 1}-variant`,
    questionCount: 30,
    durationMinutes: 60,
    attemptsCount: Math.max(
      12,
      Math.round(80 + Math.sin(i * 1.7) * 60 + i * 12),
    ),
  }));
}

export const TEST_VARIANTS: Record<string, TestVariant[]> = {
  matematika: buildVariants("matematika", 6),
  fizika: buildVariants("fizika", 5),
  ielts: buildVariants("ielts", 8),
  dtm: buildVariants("dtm", 10),
  sat: buildVariants("sat", 4),
  "ingliz-tili": buildVariants("ingliz-tili", 7),
  kimyo: buildVariants("kimyo", 4),
  biologiya: buildVariants("biologiya", 5),
};
import { Reveal } from "./reveal";
const SUBJECT_CATALOG = [
  { name: "IELTS", tests: 42, note: "Xalqaro til sertifikati" },
  { name: "DTM", tests: 128, note: "Davlat test markazi formatida" },
  { name: "Milliy Sertifikat — Matematika", tests: 36, note: "Rasmiy format" },
  { name: "Milliy Sertifikat — Fizika", tests: 24, note: "Rasmiy format" },
  { name: "SAT", tests: 18, note: "Xalqaro qabul testi" },
  { name: "Ingliz tili", tests: 54, note: "Barcha darajalar uchun" },
];

export function SubjectCatalog() {
  return (
    <section id="fanlar" className="bg-[var(--surface-blue)]/50 py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--brand)]">
            Fanlar
          </p>
          <h2 className="mt-2 u-font-display text-2xl font-bold text-[var(--ink)] md:text-3xl">
            Qaysi imtihonga tayyorlanayotgan bo'lsangiz ham
          </h2>
        </Reveal>

        <Reveal className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SUBJECT_CATALOG.map((subject) => (
            <div
              key={subject.name}
              className="group rounded-xl border border-[var(--ink)]/10 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-[var(--brand)]/30 hover:shadow-md hover:shadow-[var(--brand)]/5"
            >
              <p className="u-font-display text-base font-semibold text-[var(--ink)]">
                {subject.name}
              </p>
              <p className="mt-1 text-sm text-[var(--ink)]/55">
                {subject.note}
              </p>
              <p className="mt-4 u-font-mono text-xs font-medium text-[var(--brand)]">
                {subject.tests} ta test mavjud
              </p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

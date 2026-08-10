import { Reveal } from "./reveal";
const STEPS = [
  {
    number: "01",
    title: "Ro'yxatdan o'ting",
    description: "Telefon yoki email orqali bir necha soniyada akkaunt oching.",
  },
  {
    number: "02",
    title: "Fan va testni tanlang",
    description: "DTM, IELTS, Milliy Sertifikat yoki SAT'dan birini tanlang.",
  },
  {
    number: "03",
    title: "Haqiqiy sharoitda ishlang",
    description: "Vaqt hisoblanadi — xuddi asl imtihondagidek.",
  },
  {
    number: "04",
    title: "Natijangizni ko'ring",
    description: "Ball, foiz va tarixingiz shu zahoti saqlanadi.",
  },
];

export function HowItWorks() {
  return (
    <section
      id="qanday-ishlaydi"
      className="mx-auto max-w-6xl px-4 py-20 md:px-8"
    >
      <Reveal>
        <p className="text-xs font-semibold uppercase tracking-wide text-[#0EBE15]">
          Jarayon
        </p>
        <h2 className="mt-2 u-font-display text-2xl font-bold text-[var(--ink)] md:text-3xl">
          Qanday ishlaydi
        </h2>
      </Reveal>

      <Reveal className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((step) => (
          <div key={step.number}>
            <p className="u-font-mono text-sm font-semibold text-[#0EBE15]">
              {step.number}
            </p>
            <p className="mt-2 u-font-display text-base font-semibold text-[var(--ink)]">
              {step.title}
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-[var(--ink)]/60">
              {step.description}
            </p>
          </div>
        ))}
      </Reveal>
    </section>
  );
}

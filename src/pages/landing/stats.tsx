import { Reveal } from "./reveal";
const STATS = [
  { value: "17", label: "Foydalanuvchi" },
  { value: "350+", label: "Ishlangan test" },
  { value: "6+", label: "Fan yo'nalishi" },
  { value: "4.8/5", label: "O'rtacha baho" },
];

export function StatsBand() {
  return (
    <section className="bg-[#0EBE15]/50 py-14">
      <Reveal className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-4 md:grid-cols-4 md:px-8">
        {STATS.map((stat) => (
          <div key={stat.label} className="text-center md:text-left">
            <p className="u-font-mono text-3xl font-semibold text-[var(--ink)]">
              {stat.value}
            </p>
            <p className="mt-1 text-sm text-[var(--ink)]/80">{stat.label}</p>
          </div>
        ))}
      </Reveal>
    </section>
  );
}

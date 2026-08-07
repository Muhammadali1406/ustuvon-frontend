import { Reveal } from "./reveal";
import {
  ShieldCheck,
  Zap,
  History,
  TrendingUp,
  Gauge,
  Smartphone,
} from "lucide-react";

const FEATURES = [
  {
    icon: ShieldCheck,
    title: "Rasmiy manbalar",
    description: "Har bir test rasmiy va ishonchli manbalar asosida tuziladi.",
  },
  {
    icon: Zap,
    title: "Avtomatik natija",
    description: "Test tugashi bilan natijangiz shu zahoti hisoblanadi.",
  },
  {
    icon: History,
    title: "Natijalar tarixi",
    description:
      "Ishlagan har bir testingiz saqlanadi, istalgan payt qayta ko'rasiz.",
  },
  {
    icon: TrendingUp,
    title: "Rivojlanishni kuzating",
    description: "Ballaringiz vaqt o'tishi bilan qanday o'sayotganini ko'ring.",
  },
  {
    icon: Gauge,
    title: "Tez va sodda",
    description: "Ortiqcha murakkablik yo'q — ro'yxatdan o'ting va boshlang.",
  },
  {
    icon: Smartphone,
    title: "Har qanday qurilmada",
    description: "Telefon, planshet yoki kompyuterda bir xil qulaylikda.",
  },
];

export function FeatureGrid() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 md:px-8">
      <Reveal>
        <p className="text-xs font-semibold uppercase tracking-wide text-[var(--brand)]">
          Nega Ustuvon
        </p>
        <h2 className="mt-2 u-font-display text-2xl font-bold text-[var(--ink)] md:text-3xl">
          Tayyorgarlikni jiddiy qabul qiladigan platforma
        </h2>
      </Reveal>

      <Reveal className="mt-10">
        <div className="grid grid-cols-1 border-b border-l border-[var(--ink)]/10 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="border-r border-t border-[var(--ink)]/10 p-6"
            >
              <feature.icon size={20} className="text-[var(--brand)]" />
              <p className="mt-3 u-font-display text-base font-semibold text-[var(--ink)]">
                {feature.title}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-[var(--ink)]/60">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

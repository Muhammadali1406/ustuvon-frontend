import { Link } from "react-router-dom";
import { Reveal } from "./reveal";

export function ClosingCta() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-20 text-center md:px-8">
      <Reveal>
        <h2 className="u-font-display text-3xl font-bold text-[var(--ink)] md:text-4xl">
          Imtihon kunidan oldin tayyor bo'ling
        </h2>
        <p className="mt-4 text-[var(--ink)]/60">
          Ro'yxatdan o'tish bir necha soniya vaqt oladi — birinchi testingizni
          hoziroq boshlang.
        </p>
        <Link
          to="/register"
          className="mt-8 inline-block rounded-lg bg-[var(--brand)] px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--brand-deep)]"
        >
          Bepul ro'yxatdan o'tish
        </Link>
      </Reveal>
    </section>
  );
}

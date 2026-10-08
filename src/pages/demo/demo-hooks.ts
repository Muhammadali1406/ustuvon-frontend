import { useEffect, useRef, useState } from "react";

export function usePrefersReducedMotion(): boolean {
  const [reduced] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  return reduced;
}

/** Element ko'rinish maydonida ekanligini kuzatadi. `once` — faqat birinchi marta. */
export function useInView<T extends HTMLElement>(threshold = 0.3, once = false) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting && once) observer.disconnect();
      },
      { threshold },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, once]);

  return { ref, inView };
}

/** Har `interval` ms da keyingi indeksga o'tadi. Indeks o'zgarsa taymer qayta boshlanadi. */
export function useCycle(count: number, interval: number, running: boolean) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!running) return;
    const id = window.setTimeout(
      () => setIndex((i) => (i + 1) % count),
      interval,
    );
    return () => window.clearTimeout(id);
  }, [count, interval, running, index]);

  return [index, setIndex] as const;
}

/**
 * Avtomatik aylanuvchi bosqichlar: ekranda ko'ringanda o'zi yuradi,
 * foydalanuvchi bosganda (taqdimotchi boshqaruvi) to'xtaydi.
 */
export function useStepper<T extends HTMLElement>(count: number, interval = 4200) {
  const reduced = usePrefersReducedMotion();
  const { ref, inView } = useInView<T>(0.35);
  const [manual, setManual] = useState(false);
  const running = inView && !manual && !reduced;
  const [index, setIndex] = useCycle(count, interval, running);

  return {
    ref,
    index,
    running,
    manual,
    interval,
    select: (i: number) => {
      setManual(true);
      setIndex(i);
    },
    resume: () => setManual(false),
  };
}

export function useCountUp(target: number, start: boolean, duration = 1200) {
  const reduced = usePrefersReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;
    if (reduced) {
      setValue(target);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      setValue(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, start, duration, reduced]);

  return value;
}

export function scrollToSection(id: string, updateHash = true) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
  if (updateHash) window.history.replaceState(null, "", `#${id}`);
}

import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { SECTIONS } from "./demo-data";
import { scrollToSection } from "./demo-hooks";
import { DemoHero, FactsBand, ProblemSection, SolutionSection, AiGeneratorSection } from "./sections-intro";
import { ArchitectureSection, TeamSection, RoadmapSection } from "./sections-core";
import { LearnSection, CertGlobalSection, EcosystemSection, DemoFooter } from "./sections-future";

export default function DemoPage() {
  const [active, setActive] = useState<string>(SECTIONS[0].id);
  const barRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prev = document.title;
    document.title = "Ustuvon — Demo";
    return () => {
      document.title = prev;
    };
  }, []);

  // Scroll-spy
  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Progress bar
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Keep active pill visible in the nav bar
  useEffect(() => {
    const nav = navRef.current;
    const btn = nav?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    if (nav && btn) {
      nav.scrollTo({
        left: btn.offsetLeft - nav.clientWidth / 2 + btn.clientWidth / 2,
        behavior: "smooth",
      });
    }
  }, [active]);

  // ← / → between sections
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) return;
      const t = e.target as HTMLElement | null;
      if (t && (t.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(t.tagName))) return;
      const i = SECTIONS.findIndex((s) => s.id === active);
      if (e.key === "ArrowRight" && i < SECTIONS.length - 1) {
        e.preventDefault();
        scrollToSection(SECTIONS[i + 1].id);
      } else if (e.key === "ArrowLeft" && i > 0) {
        e.preventDefault();
        scrollToSection(SECTIONS[i - 1].id);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  // Deep link: /demo#ai-generator
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (id) requestAnimationFrame(() => scrollToSection(id, false));
  }, []);

  return (
    <div className="ustuvon-landing ustuvon-demo min-h-screen">
      <header className="sticky top-0 z-50 border-b border-[var(--ink)]/8 bg-[var(--paper)]/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-8">
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/b-logo.png"
              alt="Ustuvon logo"
              className="h-8 w-8 rounded-md object-contain"
            />
            <span className="u-font-display text-lg font-semibold text-[var(--ink)]">
              Ustuvon
            </span>
            <span className="rounded-full border border-[#0EBE15]/30 bg-[#0EBE15]/10 px-2 py-0.5 u-font-mono text-[10px] font-semibold uppercase text-[#0EBE15]">
              Demo
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <Link
              to="/login"
              className="rounded-md px-3 py-2 text-sm font-medium text-[var(--ink)]/70 transition-colors hover:text-[var(--ink)] md:px-4"
            >
              Kirish
            </Link>
            <Link
              to="/register"
              className="rounded-md bg-[#0EBE15]/80 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#03ba09] md:px-4"
            >
              Ro'yxatdan o'tish
            </Link>
          </div>
        </div>
      </header>

      <nav
        aria-label="Bo'limlar"
        className="sticky top-16 z-40 border-b border-[var(--ink)]/8 bg-[var(--paper)]/90 backdrop-blur-md"
      >
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <div
            ref={navRef}
            className="relative flex gap-1 overflow-x-auto py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                type="button"
                data-id={s.id}
                onClick={() => scrollToSection(s.id)}
                className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                  active === s.id
                    ? "bg-[var(--ink)] text-white"
                    : "text-[var(--ink)]/60 hover:bg-[var(--ink)]/5 hover:text-[var(--ink)]"
                }`}
              >
                <span className={`u-font-mono ${active === s.id ? "text-[#0EBE15]" : "text-[var(--ink)]/35"}`}>
                  {s.no}
                </span>
                {s.label}
              </button>
            ))}
          </div>
        </div>
        <div
          ref={barRef}
          className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-[#0EBE15]"
          style={{ transform: "scaleX(0)" }}
        />
      </nav>

      <main>
        <div id="boshi" className="scroll-mt-[6.75rem]">
          <DemoHero />
          <FactsBand />
        </div>
        <ProblemSection />
        <SolutionSection />
        <AiGeneratorSection />
        <ArchitectureSection />
        <TeamSection />
        <RoadmapSection />
        <LearnSection />
        <CertGlobalSection />
        <EcosystemSection />
      </main>
      <DemoFooter />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500;600&display=swap');

        .ustuvon-landing {
          --brand: #1A5FA8;
          --brand-deep: #123F70;
          --ink: #101826;
          --paper: #F6F5F1;
          --surface-blue: #E9F1F8;
          --success: #1E8E5A;
          background-color: var(--paper);
          font-family: 'Inter', ui-sans-serif, system-ui, sans-serif;
        }
        .ustuvon-landing .u-font-display {
          font-family: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif;
        }
        .ustuvon-landing .u-font-mono {
          font-family: 'JetBrains Mono', ui-monospace, monospace;
          font-variant-numeric: tabular-nums;
        }

        @keyframes demoFade { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
        .ustuvon-demo .demo-fade { animation: demoFade 0.45s ease-out both; }

        @keyframes demoProgress { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        .ustuvon-demo .demo-progress { transform-origin: left; animation: demoProgress var(--demo-dur, 4000ms) linear both; }

        @keyframes demoScan { 0% { top: 0; opacity: 0; } 10%, 90% { opacity: 1; } 100% { top: 100%; opacity: 0; } }
        .ustuvon-demo .demo-scan { animation: demoScan 1.6s ease-in-out infinite; }

        @keyframes demoWave { 0%, 100% { transform: scaleY(0.35); } 50% { transform: scaleY(1); } }
        .ustuvon-demo .demo-wave { transform-origin: center; animation: demoWave 1s ease-in-out infinite; }

        @keyframes demoTravel { 0% { top: 0; opacity: 0; } 15%, 85% { opacity: 1; } 100% { top: 100%; opacity: 0; } }
        .ustuvon-demo .demo-travel { animation: demoTravel 1.2s ease-in-out infinite; }

        @keyframes demoPop { 0% { transform: scale(0.5); opacity: 0; } 70% { transform: scale(1.15); opacity: 1; } 100% { transform: scale(1); opacity: 1; } }
        .ustuvon-demo .demo-pop { animation: demoPop 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) both; }

        @keyframes demoRing { from { stroke-dasharray: 0 264; } }
        .ustuvon-demo .demo-ring { animation: demoRing 1.2s ease-out both; }

        @media (prefers-reduced-motion: reduce) {
          .ustuvon-demo *, .ustuvon-demo *::before, .ustuvon-demo *::after {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </div>
  );
}

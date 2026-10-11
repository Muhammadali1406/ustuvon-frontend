import { ArrowDown, Check, ShieldCheck } from "lucide-react";
import { Reveal } from "../landing/reveal";
import { ADVANTAGE, COURSE_STRUCTURE, GLOBAL_CAPS, PEDAGOGY, PHASES, TECH_STACK } from "./demo-data";
import { scrollToSection, useStepper } from "./demo-hooks";
import { Arrow, Card, Chip, Eyebrow, ResumeButton, Section, SectionHead, StepProgress, SubHead, SubNav } from "./demo-ui";
import { ArchitectureExplorer } from "./architecture";
import { AiPipeline, ExamFormatsCard } from "./ai-pipeline";
import { AiLearningCard, CertificateDemo, DubbingCard, EcosystemLoop, RingsMap } from "./future-widgets";

function PhasePanel({ index }: { index: number }) {
  if (index === 0) {
    return (
      <div className="space-y-5">
        <div className="flex flex-wrap gap-2">
          {PHASES[0].parts.map((p) => (
            <Chip key={p} active>
              {p}
            </Chip>
          ))}
        </div>
        <p className="max-w-2xl text-sm leading-relaxed text-[var(--ink)]/65">
          Test Engine imtihonni boshidan oxirigacha boshqaradi: savollarni
          yuklaydi, vaqtni nazorat qiladi, javoblarni saqlaydi va natijani
          hisoblaydi. Har bir imtihon turi uchun alohida konfiguratsiya beriladi.
        </p>
        <button
          type="button"
          onClick={() => scrollToSection("arxitektura")}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0EBE15] transition-colors hover:text-[#03ba09]"
        >
          Arxitekturani ko'rish (5.2) <ArrowDown size={14} />
        </button>
      </div>
    );
  }
  if (index === 1) {
    return (
      <div className="grid items-start gap-6 lg:grid-cols-2">
        <div className="space-y-5">
          <div>
            <Eyebrow>Kurs strukturasi</Eyebrow>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              {COURSE_STRUCTURE.map((c, i) => (
                <span key={c} className="flex items-center gap-2">
                  <Chip active={i === 0 || i === COURSE_STRUCTURE.length - 1}>
                    {c}
                  </Chip>
                  {i < COURSE_STRUCTURE.length - 1 && <Arrow />}
                </span>
              ))}
            </div>
          </div>
          <div>
            <Eyebrow>Pedagogik metodika</Eyebrow>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              {PEDAGOGY.map((p, i) => (
                <span key={p} className="flex items-center gap-2">
                  <Chip>{p}</Chip>
                  {i < PEDAGOGY.length - 1 && <Arrow />}
                </span>
              ))}
            </div>
          </div>
          <p className="text-sm leading-relaxed text-[var(--ink)]/65">
            Har bir kurs oldindan ishlab chiqilgan <b>maxsus ta'lim
            ssenariysi</b> asosida tayyorlanadi.
          </p>
        </div>
        <DubbingCard />
      </div>
    );
  }
  return (
    <div className="grid items-center gap-6 lg:grid-cols-2">
      <RingsMap />
      <div>
        <Eyebrow>Global bosqichda rivojlantiriladi</Eyebrow>
        <div className="mt-3 flex flex-wrap gap-2">
          {GLOBAL_CAPS.map((g) => (
            <Chip key={g}>{g}</Chip>
          ))}
        </div>
      </div>
    </div>
  );
}

function PhaseStepper() {
  const s = useStepper<HTMLDivElement>(PHASES.length, 9000);
  return (
    <div ref={s.ref}>
      <div className="mb-3 flex justify-end">
        <ResumeButton manual={s.manual} onResume={s.resume} />
      </div>
      <div className="grid grid-cols-3 gap-2">
        {PHASES.map((p, i) => {
          const active = i === s.index;
          const done = i < s.index;
          return (
            <button
              key={p.no}
              type="button"
              onClick={() => s.select(i)}
              className={`relative overflow-hidden rounded-lg border px-3 py-3 text-left transition-colors ${
                active
                  ? "border-[#0EBE15] bg-[#0EBE15]/10"
                  : "border-[var(--ink)]/10 bg-white hover:border-[var(--ink)]/25"
              }`}
            >
              <span
                className={`flex items-center gap-1.5 u-font-mono text-[10px] font-semibold tracking-wide sm:text-xs ${
                  active || done ? "text-[#0EBE15]" : "text-[var(--ink)]/40"
                }`}
              >
                {done && <Check size={12} />}
                {p.no}-BOSQICH
              </span>
              <span className="mt-1 block text-xs font-semibold leading-tight text-[var(--ink)] sm:text-sm">
                {p.name}
              </span>
              {active && (
                <StepProgress running={s.running} interval={s.interval} stepKey={s.index} />
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-4 rounded-2xl border border-[var(--ink)]/10 bg-white p-6 shadow-xl shadow-[var(--ink)]/5">
        <p className="text-sm font-medium text-[var(--ink)]/70">
          {PHASES[s.index].lead}
        </p>
        <div key={s.index} className="demo-fade mt-5 min-h-[16rem]">
          <PhasePanel index={s.index} />
        </div>
      </div>
    </div>
  );
}

const AI_TECH = TECH_STACK.find((t) => t.group === "AI")?.items ?? [];

export function ImplementationSection() {
  return (
    <Section id="amalga-oshirish" tone="white">
      <SectionHead
        no="05"
        eyebrow="Amalga oshirish"
        title="Yechim qanday quriladi: bosqichlar, texnologiyalar va AI"
        intro="Avval professional test platformasi, keyin online kurslar, so'ng global bozor. Har bir bosqichning markazida — Test Engine va AI."
      />
      <SubNav
        items={[
          { id: "bosqichlar", no: "5.1", label: "Bosqichlar" },
          { id: "arxitektura", no: "5.2", label: "Arxitektura va texnologiyalar" },
          { id: "ai-vositalari", no: "5.3", label: "AI vositalari va yechimlar" },
          { id: "sertifikat", no: "5.4", label: "Sertifikat" },
          { id: "ekotizim", no: "5.5", label: "Yakuniy konsepsiya" },
        ]}
      />

      <SubHead
        first
        id="bosqichlar"
        no="5.1"
        title="Bosqichlar"
        text="Amalga oshirish uch bosqichda olib boriladi."
      />
      <Reveal>
        <PhaseStepper />
      </Reveal>

      <SubHead
        id="arxitektura"
        no="5.2"
        title="Arxitektura va texnologiyalar"
        text="Test tizimining markaziy qismi — Test Engine. Har bir qatlamni bosib, unda ishlatiladigan texnologiyalarni ko'ring."
      />
      <Reveal>
        <ArchitectureExplorer />
      </Reveal>

      <SubHead
        id="ai-vositalari"
        no="5.3"
        title="AI vositalari va yechimlar"
        text="AI test yaratadi va foydalanuvchini tahlil qiladi — lekin nashr etilishidan oldin har doim inson tekshiradi."
      />
      <Reveal>
        <Eyebrow>AI Test Generator — 10 bosqichli jarayon</Eyebrow>
        <div className="mt-3">
          <AiPipeline />
        </div>
      </Reveal>
      <Reveal className="mt-10 grid items-start gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="rounded-xl border border-[#0EBE15]/40 bg-[#0EBE15]/10 p-5">
            <p className="flex items-center gap-2 u-font-display text-base font-semibold text-[var(--ink)]">
              <ShieldCheck size={18} className="text-[#0EBE15]" />
              Inson tekshiruvi majburiy
            </p>
            <p className="mt-2 text-sm leading-relaxed text-[var(--ink)]/75">
              AI yaratgan test <b>to'g'ridan-to'g'ri foydalanuvchiga
              chiqarilmaydi</b> — avval administrator yoki vakolatli mutaxassis
              tekshiradi.
            </p>
          </div>
          <Card>
            <Eyebrow>AI texnologiyalari</Eyebrow>
            <div className="mt-4 flex flex-wrap gap-2">
              {AI_TECH.map((t) => (
                <Chip key={t} active>
                  {t}
                </Chip>
              ))}
            </div>
          </Card>
          <ExamFormatsCard />
        </div>
        <AiLearningCard />
      </Reveal>

      <SubHead
        id="sertifikat"
        no="5.4"
        title="Sertifikat tizimi"
        text="Har bir tegishli kurs yoki imtihon yakunida tekshiriladigan sertifikat beriladi."
      />
      <Reveal className="max-w-xl">
        <CertificateDemo />
      </Reveal>

      <SubHead
        id="ekotizim"
        no="5.5"
        title="Yakuniy mahsulot konsepsiyasi"
        text="USTUVON oddiy online kurs platformasi yoki oddiy test sayti bo'lishni maqsad qilmaydi — u to'liq ekotizim."
      />
      <Reveal>
        <EcosystemLoop />
      </Reveal>
      <Reveal className="mt-12">
        <Eyebrow>USTUVONning asosiy texnologik ustunligi</Eyebrow>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          {ADVANTAGE.map((a, i) => (
            <span key={a} className="flex items-center gap-3">
              <span className="rounded-lg border border-[var(--ink)]/10 bg-white px-4 py-3 u-font-display text-sm font-semibold text-[var(--ink)] shadow-sm">
                {a}
              </span>
              {i < ADVANTAGE.length - 1 && (
                <span className="u-font-mono text-lg text-[#0EBE15]">+</span>
              )}
            </span>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}

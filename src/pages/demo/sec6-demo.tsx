import { Link } from "react-router-dom";
import { ExternalLink, FileText } from "lucide-react";
import { Reveal } from "../landing/reveal";
import { DEMO_VIDEO } from "./demo-data";
import { Section, SectionHead, SubHead, SubNav } from "./demo-ui";

function VideoFrame() {
  const src = `https://www.youtube-nocookie.com/embed/${DEMO_VIDEO.id}?rel=0`;
  return (
    <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-[var(--ink)]/10 bg-white shadow-xl shadow-[var(--ink)]/10">
      <div className="flex items-center justify-between border-b border-[var(--ink)]/10 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#0EBE15] u-font-display text-[11px] font-bold text-[var(--ink)]">
            U
          </span>
          <span className="u-font-display text-sm font-semibold text-[var(--ink)]">
            Ustuvon · Demo
          </span>
        </div>
        <span className="rounded-full bg-[var(--ink)] px-2.5 py-1 u-font-mono text-[11px] font-medium text-white">
          YouTube
        </span>
      </div>

      <div className="relative aspect-video bg-[var(--ink)]">
        <iframe
          className="absolute inset-0 h-full w-full"
          src={src}
          title={DEMO_VIDEO.title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 text-xs text-[var(--ink)]/55">
        <span>Video ko'rinmasa:</span>
        <a
          href={DEMO_VIDEO.watchUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 font-semibold text-[#0EBE15] transition-colors hover:text-[#03ba09]"
        >
          YouTube'da ochish <ExternalLink size={12} />
        </a>
      </div>
    </div>
  );
}

export function DemoSection() {
  return (
    <Section id="demo" tone="tint">
      <SectionHead
        no="06"
        eyebrow="Demo"
        title="USTUVON amalda"
        intro="Platformaning demo-videosi va uning qisqacha tavsifi."
      />
      <SubNav
        items={[
          { id: "demo-video", no: "6.1", label: "Demo-video" },
          { id: "demo-tavsif", no: "6.2", label: "Demo-videoning tavsifi" },
        ]}
      />

      <SubHead
        first
        id="demo-video"
        no="6.1"
        title="Demo-video"
        text="Platformaning demo-videosi."
      />
      <Reveal>
        <VideoFrame />
      </Reveal>

      <SubHead
        id="demo-tavsif"
        no="6.2"
        title="Demo-videoning tavsifi"
      />
      <Reveal>
        <div className="mx-auto flex max-w-4xl gap-4 rounded-xl border border-[var(--ink)]/10 border-l-4 border-l-[#0EBE15] bg-white p-6">
          <FileText size={22} className="mt-1 shrink-0 text-[#0EBE15]" />
          <p className="u-font-display text-lg font-semibold leading-snug text-[var(--ink)] md:text-xl">
            {DEMO_VIDEO.description}
          </p>
        </div>
      </Reveal>

      <Reveal className="mx-auto mt-20 max-w-3xl text-center">
        <h2 className="u-font-display text-3xl font-bold text-[var(--ink)] md:text-4xl">
          Ta'limning <span className="text-[#0EBE15]">yagona tizimi</span>ni
          birga quramiz
        </h2>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/register"
            className="rounded-lg bg-[#0EBE15] px-8 py-3.5 text-sm font-semibold text-[var(--ink)] transition-colors hover:bg-[#03ba09] hover:text-white"
          >
            Platformani sinab ko'rish
          </Link>
          <Link
            to="/"
            className="rounded-lg border border-[var(--ink)]/15 px-8 py-3.5 text-sm font-semibold text-[var(--ink)] transition-colors hover:border-[var(--ink)]/30"
          >
            Bosh sahifa
          </Link>
        </div>
      </Reveal>
    </Section>
  );
}

import { SiteFooter } from "./footer";
import { ClosingCta } from "./closingCTA";
import { StatsBand } from "./stats";
import { HowItWorks } from "./how";
import { SubjectCatalog } from "./subject";
import { FeatureGrid } from "./feature";
import { SiteHeader } from "./header";
import { Hero } from "./hero";

export default function LandingPage() {
  return (
    <div className="ustuvon-landing min-h-screen">
      <SiteHeader />
      <Hero />
      <FeatureGrid />
      <SubjectCatalog />
      <HowItWorks />
      <StatsBand />
      <ClosingCta />
      <SiteFooter />

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

        @keyframes bubbleFillPop {
          0% { transform: scale(0.5); opacity: 0; }
          70% { transform: scale(1.15); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        .ustuvon-landing .bubble-fill {
          animation: bubbleFillPop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.6s both;
        }
        @media (prefers-reduced-motion: reduce) {
          .ustuvon-landing .bubble-fill { animation: none; }
        }
      `}</style>
    </div>
  );
}

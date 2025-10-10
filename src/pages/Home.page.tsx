import RoadmapSection from "../components/landing/Roadmap.component";
import { ROADMAP } from "../types/types";
import Footer from "../components/landing/Footer.component";
import FAQSection from "../components/landing/FAQ.component";
import SocialSection from "../components/landing/SocialSection.component";
import FinalActionSection from "../components/landing/FinalAction.component";
import TokenomicsSection from "../components/landing/TokenomicsSection.component";
import Header from "../components/landing/Header.component";
import PillarSection from "../components/landing/PillarSection.component";
import Hero from "../components/landing/Hero.component";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-900">
      {/* HEADER */}
      <Header />

      {/* HERO */}
      <Hero />

      {/* TRUST / PILLARS */}
      <PillarSection />

      {/* TOKENOMICS / REVENUE */}
      <TokenomicsSection />

      {/* ROADMAP */}

      <RoadmapSection ROADMAP={ROADMAP} activeIndex={0} />

      {/* SOCIAL PROOF / CARDS — con titolo “asimettrico” */}
      <SocialSection />

      {/* FAQ */}
      <FAQSection />

      {/* CALL TO ACTION FINALE */}
      <FinalActionSection />

      {/* FOOTER */}
      <Footer />
    </div>
  );
}

import React from "react";
import { Header } from "./components/Header";
import { NationalDayHero } from "./components/NationalDayHero";
import { SaudiStatesTimeline } from "./components/SaudiStatesTimeline";
import { KingsAndLeaders } from "./components/KingsAndLeaders";
import { LandmarksGallery } from "./components/LandmarksGallery";
import { NationalAnthemPlayer } from "./components/NationalAnthemPlayer";
import { SaudiAIChat } from "./components/SaudiAIChat";
import { HistoryQuiz } from "./components/HistoryQuiz";
import { Footer } from "./components/Footer";

export default function App() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#08140e] text-[#f3f6f4] font-cairo flex flex-col selection:bg-[#006c35] selection:text-white">
      {/* Top Navigation Bar */}
      <Header onScrollTo={scrollToSection} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero & National Day Countdown */}
        <NationalDayHero
          onOpenAIChat={() => scrollToSection("ai-chat-section")}
          onExploreHistory={() => scrollToSection("leaders-section")}
        />

        {/* The 3 Eras of the Saudi State (الدولة الأولى والثانية والثالثة) */}
        <SaudiStatesTimeline />

        {/* Detailed Kings & Imams Directory */}
        <KingsAndLeaders />

        {/* Interactive AI Historical Guide (Gemini-Powered) */}
        <SaudiAIChat id="ai-chat-section" />

        {/* National Landmarks & Monuments */}
        <LandmarksGallery />

        {/* National Anthem Lyrics & Brass Fanfare */}
        <NationalAnthemPlayer />

        {/* History Knowledge Challenge Quiz */}
        <HistoryQuiz />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

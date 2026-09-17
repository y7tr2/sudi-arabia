import React, { useState } from "react";
import { Sparkles, Menu, X, Shield, Landmark, Crown, Compass, Music, HelpCircle } from "lucide-react";

interface HeaderProps {
  onScrollTo: (elementId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onScrollTo }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "national-day-section", label: "اليوم الوطني", icon: Sparkles },
    { id: "saudi-states-section", label: "مراحل التأسيس", icon: Landmark },
    { id: "leaders-section", label: "سجل الملوك والقادة", icon: Crown },
    { id: "landmarks-section", label: "المعالم التاريخية", icon: Compass },
    { id: "ai-chat-section", label: "المرشد الذكي (AI)", icon: Shield },
    { id: "anthem-section", label: "النشيد الوطني", icon: Music },
    { id: "quiz-section", label: "تحدي التاريخ", icon: HelpCircle },
  ];

  const handleNavClick = (id: string) => {
    onScrollTo(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#07150d]/95 backdrop-blur-md border-b border-[#18442b]">
      {/* Top micro ticker */}
      <div className="bg-gradient-to-r from-[#006c35] via-[#0b4827] to-[#006c35] text-white py-1 px-4 text-center text-xs font-semibold flex items-center justify-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#f6e05e] animate-pulse" />
        <span>بمناسبة اليوم الوطني السعودي (23 سبتمبر) • نحلم ونحقق.. دام عزك يا وطن العطاء والشموخ 🇸🇦</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & National Brand */}
          <div
            onClick={() => handleNavClick("national-day-section")}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-[#006c35] to-[#10b981] flex items-center justify-center border border-[#1bb867]/40 shadow-lg shadow-[#006c35]/30 text-xl group-hover:scale-105 transition-transform">
              🇸🇦
            </div>
            <div className="text-right">
              <span className="text-base sm:text-lg font-black text-white leading-none block">
                تاريخ المملكة العربية السعودية
              </span>
              <span className="text-[11px] text-[#86efac] font-medium block mt-0.5">
                اليوم الوطني 23 سبتمبر • مهد الحضارات والأمجاد
              </span>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className="px-3 py-2 rounded-xl text-xs font-bold text-[#c7dfd2] hover:text-white hover:bg-[#0c2b1b] transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <item.icon className="w-3.5 h-3.5 text-[#34d399]" />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Quick AI CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              id="header-ai-chat-btn"
              onClick={() => handleNavClick("ai-chat-section")}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#006c35] to-[#10b981] text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-[#006c35]/30 hover:brightness-110 transition-all cursor-pointer"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>المرشد الذكي (AI)</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden flex items-center">
            <button
              id="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-[#0e2c1c] border border-[#1c5335] text-white hover:bg-[#16442b] transition-colors cursor-pointer"
              aria-label="القائمة الرئيسية"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#07170f] border-b border-[#1b4e33] px-4 py-4 space-y-2 animate-fade-in">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="w-full text-right px-4 py-3 rounded-xl bg-[#0a2015] hover:bg-[#113523] text-sm font-bold text-[#d2e7db] flex items-center justify-between transition-colors cursor-pointer border border-[#163f29]"
            >
              <div className="flex items-center gap-2.5">
                <item.icon className="w-4 h-4 text-[#10b981]" />
                <span>{item.label}</span>
              </div>
              <span className="text-xs text-[#f6e05e]">⬅</span>
            </button>
          ))}

          <button
            onClick={() => handleNavClick("ai-chat-section")}
            className="w-full text-center mt-2 py-3 rounded-xl bg-[#006c35] text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <Shield className="w-4 h-4" />
            <span>اسأل المرشد التاريخي الذكي (AI)</span>
          </button>
        </div>
      )}
    </header>
  );
};

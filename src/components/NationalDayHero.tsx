import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { Sparkles, Share2, Copy, Check, Heart, Shield, Crown } from "lucide-react";

interface NationalDayHeroProps {
  onOpenAIChat: () => void;
  onExploreHistory: () => void;
}

export const NationalDayHero: React.FC<NationalDayHeroProps> = ({
  onOpenAIChat,
  onExploreHistory,
}) => {
  const [copied, setCopied] = useState(false);
  const [senderName, setSenderName] = useState("");
  const [cardGenerated, setCardGenerated] = useState(false);

  // Countdown to 23 September 2026
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Current year or next national day
    const targetDate = new Date("2026-09-23T00:00:00+03:00").getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const triggerCelebration = () => {
    // Saudi green & gold confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#006c35", "#14944d", "#d4af37", "#fefefe", "#0a3a22"],
    });
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#006c35", "#d4af37", "#ffffff"],
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#006c35", "#d4af37", "#ffffff"],
      });
    }, 250);
  };

  const copyGreetingText = () => {
    const text = `🇸🇦 بمناسبة اليوم الوطني للمملكة العربية السعودية (23 سبتمبر):
"دام عزك يا وطن المجد والشموخ.. نرفع أسمى آيات التهاني والتبريكات لمقام خادم الحرمين الشريفين وسمو ولي عهده الأمين وللشعب السعودي العظيم."
${senderName ? `— مع تحيات: ${senderName}` : ""}
#اليوم_الوطني_السعودي #نحلم_ونحقق`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div id="national-day-section" className="relative overflow-hidden pt-6 pb-16">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#006c35]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-10 w-80 h-80 bg-[#d4af37]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* National Day Badge */}
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#006c35]/25 border border-[#1b8a4f]/50 text-[#85e5aa] mb-6 backdrop-blur-md">
            <span className="w-2.5 h-2.5 rounded-full bg-[#10b981] animate-ping" />
            <span className="text-sm font-semibold tracking-wide">
              اليوم الوطني السعودي المجيد • 23 سبتمبر
            </span>
            <span className="text-xs bg-[#d4af37]/20 text-[#f5d77f] px-2 py-0.5 rounded-md border border-[#d4af37]/30">
              ذكرى التوحيد
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight max-w-4xl tracking-tight mb-6">
            مَوْطِنُ العِزِّ وَالفَخَار
            <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-[#34d399] via-[#85e5aa] to-[#f6e05e]">
              تاريخٌ ضاربٌ في المجد ورؤيةٌ تعانق السحاب
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-[#cbdad0] max-w-3xl leading-relaxed mb-8">
            من دَرَعية الصمود والإمام محمد بن سعود عام 1727م، مروراً بجهاد الإمام تركي في الدولة الثانية، وملحمة التوحيد الكبرى للملك عبد العزيز عام 1932م، وصولاً إلى عصر النهضة العظمى ورؤية 2030.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <button
              id="celebrate-btn"
              onClick={triggerCelebration}
              className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#006c35] to-[#118c49] hover:from-[#0a7a40] hover:to-[#17a356] text-white font-bold text-base shadow-lg shadow-[#006c35]/40 flex items-center gap-2.5 transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <Sparkles className="w-5 h-5 text-[#f6e05e]" />
              احتفل باليوم الوطني (أطلق البهجة 🎉)
            </button>

            <button
              id="ai-guide-btn"
              onClick={onOpenAIChat}
              className="px-7 py-3.5 rounded-xl bg-[#0f2d1e] hover:bg-[#153e2a] border border-[#2b774d] text-[#86efac] font-bold text-base flex items-center gap-2.5 transition-all cursor-pointer shadow-sm"
            >
              <Shield className="w-5 h-5 text-[#34d399]" />
              اسأل المرشد التاريخي الذكي (AI)
            </button>

            <button
              id="explore-history-btn"
              onClick={onExploreHistory}
              className="px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-white font-medium text-base flex items-center gap-2 transition-all cursor-pointer"
            >
              <Crown className="w-5 h-5 text-[#d4af37]" />
              استعراض ملوك وتاريخ الدولة
            </button>
          </div>

          {/* Countdown to September 23 */}
          <div className="w-full max-w-3xl bg-gradient-to-b from-[#0e271a]/90 to-[#091b12]/95 border border-[#1b5e39]/60 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl mb-12">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-[#1b5e39]/40 pb-5 mb-6">
              <div className="flex items-center gap-3 text-right">
                <div className="w-12 h-12 rounded-xl bg-[#006c35]/40 border border-[#10b981]/30 flex items-center justify-center text-2xl">
                  🇸🇦
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">العد التنازلي لليوم الوطني السعودي</h3>
                  <p className="text-sm text-[#94b8a3]">23 سبتمبر • موعدنا مع الفخر وتجديد الولاء والانتماء</p>
                </div>
              </div>
              <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-[#10b981]/20 text-[#6ee7b7] border border-[#10b981]/30">
                ذكرى توحيد المملكة 1351هـ
              </span>
            </div>

            <div className="grid grid-cols-4 gap-3 sm:gap-6 text-center">
              <div className="bg-[#0b1d14] border border-[#1d4f34] rounded-xl p-3 sm:p-4">
                <div className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                  {timeLeft.days}
                </div>
                <div className="text-xs sm:text-sm text-[#85e5aa] font-medium mt-1">يوم</div>
              </div>
              <div className="bg-[#0b1d14] border border-[#1d4f34] rounded-xl p-3 sm:p-4">
                <div className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                  {String(timeLeft.hours).padStart(2, "0")}
                </div>
                <div className="text-xs sm:text-sm text-[#85e5aa] font-medium mt-1">ساعة</div>
              </div>
              <div className="bg-[#0b1d14] border border-[#1d4f34] rounded-xl p-3 sm:p-4">
                <div className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                  {String(timeLeft.minutes).padStart(2, "0")}
                </div>
                <div className="text-xs sm:text-sm text-[#85e5aa] font-medium mt-1">دقيقة</div>
              </div>
              <div className="bg-[#0b1d14] border border-[#1d4f34] rounded-xl p-3 sm:p-4">
                <div className="text-3xl sm:text-5xl font-black text-[#f6e05e] tracking-tight">
                  {String(timeLeft.seconds).padStart(2, "0")}
                </div>
                <div className="text-xs sm:text-sm text-[#f6e05e] font-medium mt-1">ثانية</div>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-[#1b5e39]/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-[#a3c9b3]">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#10b981]" />
                شعار الهوية: <strong className="text-white">"نحلم ونحقق"</strong>
              </span>
              <span>
                مرسوم التوحيد رقم <strong className="text-white">2716</strong> • 17 جمادى الأولى 1351هـ
              </span>
            </div>
          </div>

          {/* Interactive Saudi National Day Greeting Card Maker */}
          <div className="w-full max-w-3xl bg-gradient-to-br from-[#0c2217] via-[#091b12] to-[#07150e] border border-[#216e43]/50 rounded-2xl p-6 sm:p-8 text-right shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-[#d4af37]">
                <Share2 className="w-5 h-5" />
                <h3 className="font-bold text-lg text-white">اصنع بطاقة تهنئتك باليوم الوطني وشاركها</h3>
              </div>
              <span className="text-xs text-[#95bcab] bg-[#006c35]/30 px-3 py-1 rounded-full border border-[#006c35]/50">
                مباشر وسريع
              </span>
            </div>

            <p className="text-sm text-[#a6c7b6] mb-5">
              اكتب اسمك لتوليد رسالة وبطاقة فخر وطنية معتمدة لمشاركتها مع أهلك وأصدقائك عبر واتساب وشبكات التواصل:
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <input
                type="text"
                id="sender-name-input"
                value={senderName}
                onChange={(e) => {
                  setSenderName(e.target.value);
                  setCardGenerated(true);
                }}
                placeholder="اكتب اسمك هنا (مثال: محمد بن سلمان الشمري)..."
                className="flex-1 bg-[#06140d] border border-[#1b5e39] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#10b981] placeholder:text-[#557e67]"
              />
              <button
                id="copy-greeting-btn"
                onClick={copyGreetingText}
                className="px-6 py-3 rounded-xl bg-[#006c35] hover:bg-[#0a8243] text-white font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer whitespace-nowrap"
              >
                {copied ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4 text-[#d4af37]" />}
                {copied ? "تم النسخ بنجاح!" : "نسخ نص التهنئة"}
              </button>
            </div>

            {/* Preview Box */}
            <div className="bg-[#06140d]/80 border border-[#194b2f] rounded-xl p-5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-2 h-full bg-gradient-to-b from-[#10b981] to-[#d4af37]" />
              <div className="flex items-center justify-between text-xs text-[#6ee7b7] mb-2">
                <span>🇸🇦 معايدة اليوم الوطني السعودي</span>
                <span>23 سبتمبر</span>
              </div>
              <p className="text-white text-sm sm:text-base font-medium leading-relaxed font-cairo">
                "دام عزك يا وطن العز والأمجاد والشموخ.. 96 عاماً من الفخر والتاريخ المشرق من عهد المؤسس إلى رؤية المستقبل 2030. حفظ الله بلادنا وولاة أمرنا وشعبنا العظيم."
              </p>
              {senderName.trim() && (
                <div className="mt-3 pt-3 border-t border-[#1a4029] flex items-center justify-end gap-2 text-xs text-[#f6e05e]">
                  <Heart className="w-3.5 h-3.5 fill-[#f6e05e]" />
                  <span>تهنئة مقدمة من: <strong className="text-white text-sm">{senderName}</strong></span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

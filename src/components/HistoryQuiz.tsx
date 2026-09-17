import React, { useState } from "react";
import { QUIZ_QUESTIONS } from "../data/saudiHistory";
import { Award, CheckCircle2, XCircle, RotateCcw, Sparkles, HelpCircle, Trophy } from "lucide-react";
import confetti from "canvas-confetti";

export const HistoryQuiz: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const currentQ = QUIZ_QUESTIONS[currentIdx];

  const handleSelectOption = (idx: number) => {
    if (selectedOption !== null) return; // Prevent changing answer
    setSelectedOption(idx);
    setShowExplanation(true);

    if (idx === currentQ.correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentIdx + 1 < QUIZ_QUESTIONS.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      setQuizFinished(true);
      if (score >= 4) {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 },
          colors: ["#006c35", "#d4af37", "#ffffff"],
        });
      }
    }
  };

  const restartQuiz = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setShowExplanation(false);
    setScore(0);
    setQuizFinished(false);
  };

  return (
    <section id="quiz-section" className="py-16 bg-[#06120b] border-t border-[#173e27]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-right">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#006c35]/25 border border-[#1b8a4f] text-[#86efac] text-xs font-bold mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-[#f6e05e]" />
            اختبر معلوماتك التاريخية
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            تحدي فرسان تاريخ الوطن
          </h2>
          <p className="text-[#a1c4af] mt-2 text-sm sm:text-base">
            اختبر حصيلتك المعرفية عن تأسيس الدولة السعودية الأولى والثانية وتوحيد المملكة وملوكها العظام.
          </p>
        </div>

        {/* Quiz Container */}
        <div className="bg-[#0b1d14] border border-[#1d5236] rounded-3xl p-6 sm:p-8 shadow-2xl">
          {!quizFinished ? (
            <div>
              {/* Progress Bar */}
              <div className="flex items-center justify-between text-xs text-[#86efac] mb-3 font-semibold">
                <span>السؤال {currentIdx + 1} من {QUIZ_QUESTIONS.length}</span>
                <span>النتيجة الحالية: {score} نقاط</span>
              </div>
              <div className="w-full h-2 bg-[#06140d] rounded-full overflow-hidden mb-6">
                <div
                  className="h-full bg-gradient-to-r from-[#006c35] to-[#10b981] transition-all duration-300"
                  style={{ width: `${((currentIdx + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                />
              </div>

              {/* Question */}
              <h3 className="text-lg sm:text-xl font-bold text-white mb-6 leading-snug">
                {currentQ.question}
              </h3>

              {/* Options */}
              <div className="space-y-3 mb-6">
                {currentQ.options.map((option, idx) => {
                  let btnStyle = "bg-[#081910] border-[#18452b] text-[#d6e7dc] hover:bg-[#0e2c1c]";

                  if (selectedOption !== null) {
                    if (idx === currentQ.correctIndex) {
                      btnStyle = "bg-[#064e2b] border-[#10b981] text-white font-bold ring-2 ring-[#10b981]/40";
                    } else if (idx === selectedOption) {
                      btnStyle = "bg-[#541212] border-[#ef4444] text-white";
                    } else {
                      btnStyle = "bg-[#081910] border-[#18452b] text-[#719580] opacity-50";
                    }
                  }

                  return (
                    <button
                      key={idx}
                      id={`quiz-opt-${idx}`}
                      onClick={() => handleSelectOption(idx)}
                      disabled={selectedOption !== null}
                      className={`w-full p-4 rounded-xl border text-right text-sm sm:text-base transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                    >
                      <span>{option}</span>
                      {selectedOption !== null && idx === currentQ.correctIndex && (
                        <CheckCircle2 className="w-5 h-5 text-[#10b981] shrink-0" />
                      )}
                      {selectedOption !== null && idx === selectedOption && idx !== currentQ.correctIndex && (
                        <XCircle className="w-5 h-5 text-[#ef4444] shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation */}
              {showExplanation && (
                <div className="p-4 rounded-xl bg-[#06170e] border border-[#1b5032] mb-6 animate-fade-in">
                  <h4 className="text-xs font-bold text-[#f6e05e] mb-1 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    التوثيق التاريخي:
                  </h4>
                  <p className="text-xs sm:text-sm text-[#b2d5c0] leading-relaxed">
                    {currentQ.explanation}
                  </p>
                </div>
              )}

              {/* Next Button */}
              {selectedOption !== null && (
                <div className="flex justify-end">
                  <button
                    id="quiz-next-btn"
                    onClick={handleNextQuestion}
                    className="px-6 py-3 rounded-xl bg-[#006c35] hover:bg-[#098142] text-white font-bold text-sm transition-all cursor-pointer shadow-lg shadow-[#006c35]/40"
                  >
                    {currentIdx + 1 < QUIZ_QUESTIONS.length ? "السؤال التالي ⬅" : "عرض النتيجة النهائية 🏆"}
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Result Screen */
            <div className="text-center py-6 space-y-6">
              <div className="w-20 h-20 rounded-full bg-[#006c35]/40 border-2 border-[#10b981] flex items-center justify-center text-4xl mx-auto shadow-xl">
                <Trophy className="w-10 h-10 text-[#f6e05e]" />
              </div>

              <div>
                <h3 className="text-2xl font-black text-white">
                  أحسنت! أتممت تحدي تاريخ الوطن
                </h3>
                <p className="text-base text-[#a3c9b4] mt-1">
                  حصلت على <strong className="text-[#f6e05e] text-xl">{score}</strong> من أصل{" "}
                  <strong className="text-white text-xl">{QUIZ_QUESTIONS.length}</strong>
                </p>
              </div>

              <div className="max-w-md mx-auto p-4 rounded-2xl bg-[#06170e] border border-[#1d5236] text-sm text-[#c0dec9] leading-relaxed">
                {score === QUIZ_QUESTIONS.length && "ما شاء الله! أنت مؤرخ وطني فذ تعرف تاريخ بلادك وملوكك بدقة متناهية. 🇸🇦"}
                {score >= 4 && score < QUIZ_QUESTIONS.length && "معلوماتك التاريخية ممتازة وعميقة، وتعرف محطات التأسيس والتوحيد الكبرى! 🇸🇦"}
                {score < 4 && "بداية موفقة! ننصحك بالاطلاع على قسم ملوك ومراحل الدولة لزيادة حصيلتك التاريخية الوطنية. 🇸🇦"}
              </div>

              <button
                id="quiz-restart-btn"
                onClick={restartQuiz}
                className="px-6 py-3 rounded-xl bg-[#0f2d1e] hover:bg-[#16442b] border border-[#237042] text-[#86efac] font-bold text-sm inline-flex items-center gap-2 transition-all cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                إعادة التحدي
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

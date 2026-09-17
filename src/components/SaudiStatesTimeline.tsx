import React, { useState } from "react";
import { SAUDI_STATES } from "../data/saudiHistory";
import { SaudiStateEra } from "../types";
import { Landmark, Calendar, MapPin, Award, CheckCircle2, ChevronLeft, BookOpen } from "lucide-react";

export const SaudiStatesTimeline: React.FC = () => {
  const [selectedEra, setSelectedEra] = useState<SaudiStateEra>("first_state");

  const currentState = SAUDI_STATES.find((s) => s.id === selectedEra) || SAUDI_STATES[0];

  return (
    <section id="saudi-states-section" className="py-16 bg-[#07130c] border-y border-[#173e27]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#006c35]/25 border border-[#1b7e47] text-[#86efac] text-xs font-bold mb-3">
            <Landmark className="w-3.5 h-3.5 text-[#f6e05e]" />
            الجذور التاريخية الراسخة منذ 1727م
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            مراحل نشأة وتأسيس الدولة السعودية
          </h2>
          <p className="text-[#a4c4b2] mt-3 text-base sm:text-lg leading-relaxed">
            كيف بدأت السعودية؟ وكيف توالت مراحلها الثلاث بفضل قيادات آل سعود وتلاحم الشعب حتى أصبحت اليوم إحدى أقوى دول العالم وأكثرها استقراراً وازدهاراً.
          </p>
        </div>

        {/* Tab Switcher for the 3 States */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10 max-w-4xl mx-auto">
          {SAUDI_STATES.map((state) => {
            const isSelected = state.id === selectedEra;
            return (
              <button
                key={state.id}
                id={`tab-${state.id}`}
                onClick={() => setSelectedEra(state.id)}
                className={`p-4 rounded-2xl border text-right transition-all cursor-pointer flex flex-col justify-between relative overflow-hidden ${
                  isSelected
                    ? "bg-gradient-to-br from-[#0c2f1c] to-[#081f12] border-[#299859] shadow-lg shadow-[#006c35]/20 ring-2 ring-[#299859]/30"
                    : "bg-[#091a11]/80 border-[#1a442b] hover:bg-[#0f2a1b] hover:border-[#225738]"
                }`}
              >
                {isSelected && (
                  <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-[#10b981] via-[#f6e05e] to-[#10b981]" />
                )}
                <div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-md inline-block mb-2 ${
                    isSelected ? "bg-[#10b981]/30 text-[#6ee7b7]" : "bg-white/5 text-[#85b597]"
                  }`}>
                    {state.period}
                  </span>
                  <h3 className={`text-lg font-bold ${isSelected ? "text-white" : "text-[#d1e4d8]"}`}>
                    {state.title}
                  </h3>
                </div>
                <div className="mt-3 text-xs text-[#8ab69a] flex items-center justify-between">
                  <span>العاصمة: {state.capital.split(" ")[0]}</span>
                  {isSelected && <ChevronLeft className="w-4 h-4 text-[#f6e05e]" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed State Showcase Card */}
        <div className="bg-[#0b1d14] border border-[#1d4f34] rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left/Content Column */}
            <div className="lg:col-span-7 space-y-6 text-right">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3.5 py-1.5 rounded-lg bg-[#006c35]/40 border border-[#217745] text-[#86efac] text-xs font-bold flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#f6e05e]" />
                  {currentState.period} ({currentState.hijriPeriod})
                </span>
                <span className="px-3.5 py-1.5 rounded-lg bg-[#1a3828] border border-[#285d3f] text-[#c0e0ce] text-xs font-medium flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#34d399]" />
                  العاصمة: {currentState.capital}
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-white mb-2">
                  {currentState.title}
                </h3>
                <p className="text-sm font-semibold text-[#f6e05e] flex items-center gap-1.5">
                  <Award className="w-4 h-4" />
                  المؤسس والقائد الأول: {currentState.founder}
                </p>
              </div>

              {/* Summary quote */}
              <div className="p-4 rounded-xl bg-[#07160e] border-r-4 border-[#10b981] border-y border-l border-[#163e26] text-[#cbdad0] text-sm sm:text-base leading-relaxed">
                {currentState.summary}
              </div>

              {/* Detailed narrative */}
              <div>
                <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#34d399]" />
                  قصة النشأة والتأسيس بالتفصيل:
                </h4>
                <p className="text-sm sm:text-base text-[#a6c7b6] leading-relaxed">
                  {currentState.detailedHistory}
                </p>
              </div>

              {/* Key Highlights */}
              <div>
                <h4 className="text-sm font-bold text-white mb-3">أبرز المحطات والإنجازات الخالدة:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {currentState.highlights.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-[#091810] border border-[#1a442c] flex items-start gap-2.5 text-xs sm:text-sm text-[#e0efe6]"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#10b981] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right/Visual Column */}
            <div className="lg:col-span-5 space-y-4">
              <div className="relative rounded-2xl overflow-hidden border border-[#235d3b] shadow-2xl aspect-[4/3] group">
                <img
                  src={currentState.image}
                  alt={currentState.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#06120b] via-[#06120b]/30 to-transparent" />
                <div className="absolute bottom-4 right-4 left-4 text-right">
                  <span className="text-xs font-bold text-[#f6e05e] uppercase tracking-wider block mb-1">
                    شاهد على العراقة
                  </span>
                  <p className="text-sm font-bold text-white">
                    {currentState.capital} • منطلق الأمجاد
                  </p>
                </div>
              </div>

              {/* Historical Context Callout */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-[#0e271a] to-[#07160e] border border-[#215f3b] text-right">
                <h5 className="text-sm font-bold text-white mb-2 flex items-center justify-end gap-1.5">
                  <span>الأثر التاريخي المستمر</span>
                  <Award className="w-4 h-4 text-[#f6e05e]" />
                </h5>
                <p className="text-xs text-[#a2c8b2] leading-relaxed">
                  {selectedEra === "first_state" && (
                    "تعتبر الدولة السعودية الأولى الأساس الفكري والسياسي الذي وضع هوية الجزيرة العربية ككيان موحد، وعادت جذورها للاحتفاء السنوي الرسمي بـ 'يوم التأسيس' في 22 فبراير."
                  )}
                  {selectedEra === "second_state" && (
                    "أثبتت الدولة السعودية الثانية أن انتماء المواطن للدولة السعودية أصيل لا يمكن محوه، وكرست مدينة الرياض كمركز الحكم والإشعاع الحضاري المستمر حتى اليوم."
                  )}
                  {selectedEra === "third_state" && (
                    "مثّل توحيد المملكة في 23 سبتمبر 1932م المعجزة السياسية والعسكرية الكبرى في القرن العشرين، حيث أزال الحدود القبلية وصنع أعظم تلاحم وطني في تاريخ العرب الحديث."
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

import React, { useState } from "react";
import { HISTORIC_LEADERS } from "../data/saudiHistory";
import { HistoricLeader } from "../types";
import { Crown, Search, Calendar, MapPin, Quote, Sparkles, X, CheckCircle2 } from "lucide-react";

export const KingsAndLeaders: React.FC = () => {
  const [filter, setFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeLeaderModal, setActiveLeaderModal] = useState<HistoricLeader | null>(null);

  const filteredLeaders = HISTORIC_LEADERS.filter((leader) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "kings" && leader.era === "kings") ||
      (filter === "first_state" && leader.era === "first_state") ||
      (filter === "second_state" && leader.era === "second_state") ||
      (filter === "vision2030" && leader.era === "vision2030");

    const matchesSearch =
      leader.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      leader.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      leader.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <section id="leaders-section" className="py-16 bg-[#08150e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/40 text-[#f5d77f] text-xs font-bold mb-3">
            <Crown className="w-3.5 h-3.5 text-[#f6e05e]" />
            قادة وملوك صنعوا التاريخ وحفظوا العهد
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            سجل الخالدين: أئمة وملوك السعودية بالأسماء والإنجازات
          </h2>
          <p className="text-[#a4c5b3] mt-3 text-base sm:text-lg">
            من الإمام محمد بن سعود مؤسس الدولة الأولى عام 1727م إلى خادم الحرمين الشريفين الملك سلمان وولي عهده الأمير محمد بن سلمان؛ سيرة رجال قادوا الملحمة وصنعوا المجد.
          </p>
        </div>

        {/* Filters and Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          {/* Era Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: "all", label: "الكل (" + HISTORIC_LEADERS.length + ")" },
              { id: "kings", label: "ملوك المملكة" },
              { id: "vision2030", label: "رؤية 2030" },
              { id: "first_state", label: "أئمة الدولة الأولى" },
              { id: "second_state", label: "أئمة الدولة الثانية" },
            ].map((tab) => (
              <button
                key={tab.id}
                id={`filter-${tab.id}`}
                onClick={() => setFilter(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  filter === tab.id
                    ? "bg-[#006c35] text-white shadow-md shadow-[#006c35]/40 border border-[#1b8a4f]"
                    : "bg-[#0c2317] text-[#9dc4ae] hover:bg-[#123322] border border-[#1a442b]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-[#608b73] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              id="search-leaders-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث بالاسم أو اللقب..."
              className="w-full bg-[#0c2317] border border-[#1b5032] rounded-xl pr-9 pl-3 py-2 text-white text-xs sm:text-sm focus:outline-none focus:border-[#10b981] placeholder:text-[#557e67]"
            />
          </div>
        </div>

        {/* Grid of Leaders */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredLeaders.map((leader) => (
            <div
              key={leader.id}
              id={`leader-card-${leader.id}`}
              className="bg-[#0b1d14] border border-[#1d4f34] rounded-2xl overflow-hidden hover:border-[#2f8854] hover:shadow-xl hover:shadow-[#006c35]/20 transition-all group flex flex-col justify-between"
            >
              <div>
                {/* Header Image & Era Badge */}
                <div className="relative aspect-[4/3] bg-gradient-to-b from-[#091a11] to-[#0b1d14] overflow-hidden">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b1d14] via-[#0b1d14]/40 to-transparent" />
                  
                  <div className="absolute top-3 right-3">
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#006c35]/80 backdrop-blur-md text-[#86efac] border border-[#10b981]/40 shadow">
                      {leader.era === "kings" && "ملوك المملكة"}
                      {leader.era === "vision2030" && "رؤية 2030"}
                      {leader.era === "first_state" && "الدولة الأولى"}
                      {leader.era === "second_state" && "الدولة الثانية"}
                    </span>
                  </div>

                  <div className="absolute bottom-2 right-3 left-3 text-right">
                    <span className="text-xs text-[#d4af37] font-semibold block">
                      {leader.reign}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                      {leader.name}
                    </h3>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-4 text-right space-y-3">
                  <p className="text-xs font-semibold text-[#6ee7b7] line-clamp-1">
                    {leader.title}
                  </p>
                  <p className="text-xs text-[#a3c9b4] line-clamp-2 leading-relaxed">
                    {leader.description}
                  </p>

                  {leader.famousQuote && (
                    <div className="p-2.5 rounded-lg bg-[#07160e] border border-[#163e26] text-[11px] text-[#e3ece7] italic">
                      <Quote className="w-3 h-3 text-[#d4af37] inline-block ml-1" />
                      "{leader.famousQuote}"
                    </div>
                  )}
                </div>
              </div>

              {/* Card Footer Button */}
              <div className="p-4 pt-0">
                <button
                  id={`view-details-${leader.id}`}
                  onClick={() => setActiveLeaderModal(leader)}
                  className="w-full py-2.5 rounded-xl bg-[#0f2d1e] hover:bg-[#16442b] border border-[#20633b] text-[#86efac] font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#f6e05e]" />
                  عرض كافة الإنجازات والتفاصيل
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for Leader Details */}
        {activeLeaderModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
            <div className="bg-[#0b1d14] border border-[#277346] rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto text-right">
              <button
                id="close-leader-modal-btn"
                onClick={() => setActiveLeaderModal(null)}
                className="absolute top-5 left-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col sm:flex-row items-center gap-5 border-b border-[#1b4d31] pb-6 mb-6">
                <img
                  src={activeLeaderModal.image}
                  alt={activeLeaderModal.name}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-2 border-[#10b981]"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Crown className="w-4 h-4 text-[#d4af37]" />
                    <span className="text-xs text-[#86efac] font-bold">
                      {activeLeaderModal.era === "kings" ? "ملوك المملكة العربية السعودية" : "قادة وأئمة الدولة السعودية"}
                    </span>
                  </div>
                  <h3 className="text-2xl font-black text-white">
                    {activeLeaderModal.name}
                  </h3>
                  <p className="text-sm text-[#d4af37] font-medium mt-0.5">
                    {activeLeaderModal.title}
                  </p>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-[#a0c5b0] mt-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#10b981]" />
                      فترة الحكم: {activeLeaderModal.reign}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#10b981]" />
                      العاصمة: {activeLeaderModal.capitalCity}
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h4 className="text-sm font-bold text-white mb-2">نبذة تاريخية وسيرة القائد:</h4>
                <p className="text-sm text-[#cbdcd2] leading-relaxed">
                  {activeLeaderModal.description}
                </p>
              </div>

              {/* Achievements */}
              <div className="mb-6">
                <h4 className="text-sm font-bold text-white mb-3">أبرز المحطات والإنجازات الوطنية:</h4>
                <div className="space-y-2">
                  {activeLeaderModal.keyAchievements.map((ach, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-[#07160e] border border-[#163d27] flex items-start gap-2.5 text-xs sm:text-sm text-[#e0efe6]"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#10b981] shrink-0 mt-0.5" />
                      <span>{ach}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Significance & Quote */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-[#0c2a1b] to-[#07170f] border border-[#1d5c36] space-y-2">
                <h5 className="text-xs font-bold text-[#f6e05e]">الأثر التاريخي الخالد:</h5>
                <p className="text-xs text-[#bcdcc8]">
                  {activeLeaderModal.historicalSignificance}
                </p>
                {activeLeaderModal.famousQuote && (
                  <div className="pt-2 border-t border-[#17462a] text-xs text-white italic">
                    "{activeLeaderModal.famousQuote}"
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

import React, { useState } from "react";
import { HISTORIC_LANDMARKS } from "../data/saudiHistory";
import { HistoricLandmark } from "../types";
import { MapPin, Landmark, Sparkles, X, Compass } from "lucide-react";

export const LandmarksGallery: React.FC = () => {
  const [selectedLandmark, setSelectedLandmark] = useState<HistoricLandmark | null>(null);

  return (
    <section id="landmarks-section" className="py-16 bg-[#08170f] border-t border-[#19452b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#006c35]/25 border border-[#1b8a4f] text-[#86efac] text-xs font-bold mb-3">
            <Compass className="w-3.5 h-3.5 text-[#f6e05e]" />
            شواهد المجد من الطين إلى ناطحات السحاب
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            معالم وطنية وتاريخية خالدة في ذاكرة الوطن
          </h2>
          <p className="text-[#a5c5b4] mt-3 text-base sm:text-lg">
            من قصر المصمك حيث انطلقت ملحمة التوحيد، وحي الطريف عاصمة الدرعية، إلى جبل طويق رمز الهمة ونيوم مدينة المستقبل.
          </p>
        </div>

        {/* Landmarks Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {HISTORIC_LANDMARKS.map((landmark) => (
            <div
              key={landmark.id}
              id={`landmark-card-${landmark.id}`}
              onClick={() => setSelectedLandmark(landmark)}
              className="bg-[#0b1d14] border border-[#1b4e33] rounded-2xl overflow-hidden hover:border-[#2f8854] hover:shadow-2xl hover:shadow-[#006c35]/30 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={landmark.image}
                  alt={landmark.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1d14] via-[#0b1d14]/30 to-transparent" />
                <div className="absolute top-3 right-3">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#006c35]/85 backdrop-blur-md text-[#86efac] border border-[#10b981]/30">
                    {landmark.era}
                  </span>
                </div>
                <div className="absolute bottom-3 right-3 left-3 text-right">
                  <h3 className="text-lg font-bold text-white leading-tight">
                    {landmark.name}
                  </h3>
                  <p className="text-xs text-[#d4af37] flex items-center justify-start gap-1 mt-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {landmark.location}
                  </p>
                </div>
              </div>

              <div className="p-4 text-right space-y-3">
                <p className="text-xs text-[#a2c8b2] line-clamp-2 leading-relaxed">
                  {landmark.description}
                </p>
                <div className="pt-2 border-t border-[#153e27] flex items-center justify-between text-xs text-[#86efac]">
                  <span className="font-semibold">عرض الأهمية التاريخية</span>
                  <Sparkles className="w-3.5 h-3.5 text-[#f6e05e]" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedLandmark && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
            <div className="bg-[#0b1d14] border border-[#277346] rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto text-right">
              <button
                id="close-landmark-modal-btn"
                onClick={() => setSelectedLandmark(null)}
                className="absolute top-5 left-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="rounded-2xl overflow-hidden mb-5 aspect-[16/9] relative border border-[#1c5335]">
                <img
                  src={selectedLandmark.image}
                  alt={selectedLandmark.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1d14] via-transparent to-transparent" />
                <div className="absolute bottom-4 right-4 text-right">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#10b981]/30 text-[#6ee7b7] border border-[#10b981]/40 mb-2 inline-block">
                    {selectedLandmark.era}
                  </span>
                  <h3 className="text-2xl font-black text-white">
                    {selectedLandmark.name}
                  </h3>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs text-[#f6e05e]">
                  <MapPin className="w-4 h-4" />
                  <span>الموقع: {selectedLandmark.location}</span>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-white mb-1">عن المعلم:</h4>
                  <p className="text-sm text-[#cbdcd1] leading-relaxed">
                    {selectedLandmark.description}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#081810] border border-[#18442a]">
                  <h4 className="text-xs font-bold text-[#86efac] mb-1.5 flex items-center gap-1.5">
                    <Landmark className="w-4 h-4 text-[#f6e05e]" />
                    الأهمية التاريخية والوطنية:
                  </h4>
                  <p className="text-xs sm:text-sm text-[#d1e5d9] leading-relaxed">
                    {selectedLandmark.significance}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

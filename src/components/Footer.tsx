import React from "react";
import { Heart, Sparkles, Shield, Landmark } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#040e08] border-t border-[#133c24] pt-14 pb-8 text-right">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1 */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🇸🇦</span>
              <div>
                <h3 className="text-xl font-black text-white">
                  بوابة تاريخ المملكة واليوم الوطني السعودي
                </h3>
                <p className="text-xs text-[#86efac]">
                  منصة وطنية شاملة توثق تاريخ التأسيس والتوحيد ورؤية المستقبل
                </p>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-[#94bda6] leading-relaxed max-w-xl">
              ثلاثة قرون من العزة والشموخ بدأت من تأسيس الدرعية عام 1727م، وتجددت في الدولة الثانية 1824م، وتوجت بتوحيد المملكة العربية السعودية في 23 سبتمبر 1932م، وتزدهر اليوم في أبهى صورها نحو عام 2030.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#f6e05e]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>دام عزك يا وطن.. نحلم ونحقق 🇸🇦</span>
            </div>
          </div>

          {/* Col 2: Milestones */}
          <div>
            <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <Landmark className="w-4 h-4 text-[#10b981]" />
              محطات المجد الكبرى
            </h4>
            <ul className="space-y-2 text-xs text-[#9bbfa9]">
              <li>• 1727م (1139هـ): تأسيس الدولة الأولى (الدرعية)</li>
              <li>• 1824م (1240هـ): تأسيس الدولة الثانية (الرياض)</li>
              <li>• 1902م (1319هـ): استرداد الرياض (قصر المصمك)</li>
              <li>• 1932م (1351هـ): إعلان توحيد المملكة (اليوم الوطني)</li>
              <li>• 2030م: رؤية الحاضر للمستقبل والريادة العالمية</li>
            </ul>
          </div>

          {/* Col 3: Royal Quotes */}
          <div>
            <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#d4af37]" />
              من أقوال القادة
            </h4>
            <div className="p-3 rounded-xl bg-[#06170e] border border-[#17432a] text-xs text-[#d1e5d9] italic leading-relaxed">
              "همة السعوديين مثل جبل طويق، ولن تنكسر إلا إذا انهد هذا الجبل وتساوى بالأرض."
              <span className="block mt-1 font-bold text-[#f6e05e] not-italic">
                — الأمير محمد بن سلمان بن عبد العزيز
              </span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-[#123821] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#6e9681]">
          <span>
            جميع الحقوق محفوظة للمملكة العربية السعودية وأبنائها الأوفياء • 1448هـ / 2026م
          </span>
          <span className="flex items-center gap-1.5 text-[#86efac]">
            <span>صُنع بحب وفخر واعتزاز بالوطن</span>
            <Heart className="w-3.5 h-3.5 fill-[#10b981] text-[#10b981]" />
          </span>
        </div>
      </div>
    </footer>
  );
};

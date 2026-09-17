import React, { useState, useRef } from "react";
import { NATIONAL_ANTHEM } from "../data/saudiHistory";
import { Volume2, VolumeX, Play, Square, Music, Sparkles, Feather } from "lucide-react";

// Synthesizer notes for the Saudi Royal National Anthem melody fanfare
const SAUDI_ANTHEM_NOTES = [
  // "سارعي للمجد والعلياء"
  { note: 392.00, dur: 0.4 }, // G4
  { note: 440.00, dur: 0.4 }, // A4
  { note: 523.25, dur: 0.6 }, // C5
  { note: 440.00, dur: 0.4 }, // A4
  { note: 392.00, dur: 0.4 }, // G4
  { note: 523.25, dur: 0.8 }, // C5
  // "مجدي لخالق السماء"
  { note: 587.33, dur: 0.4 }, // D5
  { note: 659.25, dur: 0.5 }, // E5
  { note: 587.33, dur: 0.4 }, // D5
  { note: 523.25, dur: 0.8 }, // C5
  // "وارفعي الخفاق أخضر"
  { note: 440.00, dur: 0.4 }, // A4
  { note: 523.25, dur: 0.4 }, // C5
  { note: 587.33, dur: 0.6 }, // D5
  { note: 523.25, dur: 0.4 }, // C5
  { note: 440.00, dur: 0.5 }, // A4
  // "يحمل النور المسطر"
  { note: 392.00, dur: 0.4 }, // G4
  { note: 440.00, dur: 0.4 }, // A4
  { note: 523.25, dur: 0.8 }, // C5
  // "رددي: الله أكبر يا موطني"
  { note: 659.25, dur: 0.5 }, // E5
  { note: 587.33, dur: 0.4 }, // D5
  { note: 523.25, dur: 0.6 }, // C5
  { note: 440.00, dur: 0.4 }, // A4
  { note: 523.25, dur: 0.9 }, // C5
  // "عاش الملك: للعلم والوطن!"
  { note: 587.33, dur: 0.4 }, // D5
  { note: 659.25, dur: 0.4 }, // E5
  { note: 698.46, dur: 0.5 }, // F5
  { note: 659.25, dur: 0.4 }, // E5
  { note: 587.33, dur: 0.5 }, // D5
  { note: 523.25, dur: 1.2 }, // C5 (final sustained note)
];

export const NationalAnthemPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const isCancelledRef = useRef<boolean>(false);

  const stopAudio = () => {
    isCancelledRef.current = true;
    if (audioCtxRef.current) {
      try {
        audioCtxRef.current.close();
      } catch (e) {
        // ignore
      }
      audioCtxRef.current = null;
    }
    setIsPlaying(false);
  };

  const playAnthemSynthesizer = async () => {
    if (isPlaying) {
      stopAudio();
      return;
    }

    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;
      isCancelledRef.current = false;
      setIsPlaying(true);

      let currentTime = ctx.currentTime + 0.1;

      // Play each note with warm brass/horn harmonics
      SAUDI_ANTHEM_NOTES.forEach((item) => {
        // Main fundamental oscillator
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        // Overtone harmonic for brass feel
        const osc2 = ctx.createOscillator();
        const gain2 = ctx.createGain();

        osc.type = "triangle";
        osc.frequency.setValueAtTime(item.note, currentTime);

        osc2.type = "sine";
        osc2.frequency.setValueAtTime(item.note * 2, currentTime);

        // Envelope
        gain.gain.setValueAtTime(0.001, currentTime);
        gain.gain.exponentialRampToValueAtTime(0.18, currentTime + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, currentTime + item.dur - 0.03);

        gain2.gain.setValueAtTime(0.001, currentTime);
        gain2.gain.exponentialRampToValueAtTime(0.06, currentTime + 0.05);
        gain2.gain.exponentialRampToValueAtTime(0.001, currentTime + item.dur - 0.03);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc2.connect(gain2);
        gain2.connect(ctx.destination);

        osc.start(currentTime);
        osc.stop(currentTime + item.dur);

        osc2.start(currentTime);
        osc2.stop(currentTime + item.dur);

        currentTime += item.dur;
      });

      // Schedule completion reset
      const totalDuration = (currentTime - ctx.currentTime) * 1000;
      setTimeout(() => {
        if (!isCancelledRef.current) {
          setIsPlaying(false);
        }
      }, totalDuration);
    } catch (e) {
      console.error("Audio error:", e);
      setIsPlaying(false);
    }
  };

  return (
    <section id="anthem-section" className="py-16 bg-[#07150e] border-t border-[#173e27]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#0c2719] via-[#091e13] to-[#07160e] border-2 border-[#1f633d] rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          {/* Emblem background watermark */}
          <div className="absolute top-1/2 left-8 -translate-y-1/2 opacity-5 pointer-events-none text-9xl">
            🌴
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8 border-b border-[#1b5032] pb-6">
            <div className="text-right">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10b981]/20 text-[#6ee7b7] text-xs font-bold mb-2">
                <Music className="w-3.5 h-3.5 text-[#f6e05e]" />
                رمز العزة والسيادة الوطنية
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                {NATIONAL_ANTHEM.title}
              </h2>
              <p className="text-xs sm:text-sm text-[#95c1a8] mt-1">
                كلمات: {NATIONAL_ANTHEM.author} • ألحان وتوزيع: {NATIONAL_ANTHEM.composer}
              </p>
            </div>

            {/* Audio Toggle Button */}
            <button
              id="anthem-audio-toggle-btn"
              onClick={playAnthemSynthesizer}
              className={`px-6 py-3.5 rounded-2xl font-bold text-sm flex items-center gap-3 transition-all cursor-pointer shadow-lg ${
                isPlaying
                  ? "bg-[#b91c1c] hover:bg-[#dc2626] text-white shadow-red-900/40"
                  : "bg-[#006c35] hover:bg-[#098142] text-white shadow-[#006c35]/40"
              }`}
            >
              {isPlaying ? (
                <>
                  <Square className="w-4 h-4 fill-current" />
                  <span>إيقاف العزف</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current text-[#f6e05e]" />
                  <span>استماع للعزف الوطني (مارش)</span>
                </>
              )}
            </button>
          </div>

          {/* Calligraphic Lyrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center my-6">
            {NATIONAL_ANTHEM.lyrics.map((verse, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-[#081810]/80 border border-[#1b4e33] hover:border-[#2b7f4e] transition-all"
              >
                <p className="text-xl sm:text-2xl font-black text-white font-amiri tracking-wide mb-1">
                  {verse.verse}
                </p>
                <p className="text-lg sm:text-xl font-bold text-[#86efac] font-amiri">
                  {verse.sub}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-5 border-t border-[#18462b] flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#7ea991]">
            <span className="flex items-center gap-1.5">
              <Feather className="w-3.5 h-3.5 text-[#f6e05e]" />
              {NATIONAL_ANTHEM.year}
            </span>
            <span>دام عزك يا وطن التوحيد والشموخ 🇸🇦</span>
          </div>
        </div>
      </div>
    </section>
  );
};

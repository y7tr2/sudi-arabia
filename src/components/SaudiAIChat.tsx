import React, { useState, useRef, useEffect } from "react";
import Markdown from "react-markdown";
import { ChatMessage } from "../types";
import { Bot, Send, Sparkles, User, Copy, Check, RotateCcw, ShieldCheck, Loader2 } from "lucide-react";

interface SaudiAIChatProps {
  id?: string;
}

const INITIAL_SUGGESTIONS = [
  "كيف بدأت الدولة السعودية الأولى عام 1727م ومن أسسها بالدرعية؟",
  "احكِ لي قصة استرداد الرياض وفتح قصر المصمك عام 1902م بالتفصيل",
  "ما هي قصة سيف الأجرب ودور الإمام تركي بن عبد الله في الدولة الثانية؟",
  "من هم ملوك المملكة العربية السعودية السبعة وأهم إنجازاتهم؟",
  "ما الفرق الدقيق بين يوم التأسيس واليوم الوطني السعودي؟",
  "ما هي أبرز مستهدفات ومشاريع رؤية السعودية 2030؟",
  "اكتب لي كلمة فخر وقصيدة شعرية بمناسبة اليوم الوطني 23 سبتمبر",
];

export const SaudiAIChat: React.FC<SaudiAIChatProps> = ({ id = "ai-chat-section" }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome-msg",
      sender: "assistant",
      text: `أهلاً بك يا ابن الوطن وزائره الكريم! 🇸🇦
أنا **المرشد التاريخي السعودي الذكي**، ومهمتي تزويدك بكافة تفاصيل تاريخ المملكة العربية السعودية المجيد:
- نشأة الدولة السعودية الأولى عام 1727م في الدرعية على يد الإمام محمد بن سعود وأئمتها.
- الدولة السعودية الثانية وبطولات الإمام تركي بن عبد الله وسيف الأجرب.
- ملحمة التوحيد الكبرى للملك عبد العزيز رحمه الله وفتح قصر المصمك وإعلان المملكة في 23 سبتمبر 1932م.
- إنجازات ملوك المملكة العظام حتى عهد خادم الحرمين الشريفين الملك سلمان وولي عهده الأمير محمد بن سلمان ورؤية 2030.

تفضل بسؤالي عما تشاء، أو اختر من الأسئلة المقترحة بالأسفل:`,
      timestamp: new Date().toLocaleTimeString("ar-SA", { hour: "2-digit", minute: "2-digit" }),
    },
  ]);

  const [inputPrompt, setInputPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSendMessage = async (customText?: string) => {
    const textToSend = (customText || inputPrompt).trim();
    if (!textToSend || loading) return;

    const userMessage: ChatMessage = {
      id: "user-" + Date.now(),
      sender: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString("ar-SA", { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputPrompt("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          history: messages.map((m) => ({ sender: m.sender, text: m.text })),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "تعذر الحصول على رد من الخادم.");
      }

      const assistantMessage: ChatMessage = {
        id: "ai-" + Date.now(),
        sender: "assistant",
        text: data.reply || "عذراً، لم يرد أي نص من النموذج.",
        timestamp: new Date().toLocaleTimeString("ar-SA", { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: any) {
      const errorMessage: ChatMessage = {
        id: "err-" + Date.now(),
        sender: "assistant",
        text: `⚠️ **تنبيه:** ${err.message || "حدث خطأ غير متوقع. يرجى التحقق من الاتصال والمحاولة لاحقاً."}`,
        timestamp: new Date().toLocaleTimeString("ar-SA", { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: "welcome-msg",
        sender: "assistant",
        text: `مرحباً مجدداً! جاهز للإجابة عن تاريخ المملكة ورجالها واليوم الوطني بالتفصيل. تفضل بسؤالك. 🇸🇦`,
        timestamp: new Date().toLocaleTimeString("ar-SA", { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  };

  return (
    <section id={id} className="py-16 bg-[#06120b] border-t border-[#194b2f]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#006c35]/25 border border-[#1b8a4f] text-[#86efac] text-xs font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#f6e05e]" />
            ذكاء اصطناعي سعودي متخصص (مدعوم بـ Gemini)
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            المرشد التاريخي الذكي للمملكة
          </h2>
          <p className="text-[#a4c5b3] mt-2 text-sm sm:text-base">
            اسأل الذكاء الاصطناعي عن أي حقبة، أو معركة، أو حاكم، أو إنجاز في تاريخ السعودية منذ 1727م وحتى رؤية 2030 بالتفصيل والأسماء.
          </p>
        </div>

        {/* Chat Card */}
        <div className="bg-[#0b1d14] border border-[#1d5236] rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[650px] relative">
          {/* Chat Top Bar */}
          <div className="bg-[#0e2a1c] px-6 py-4 border-b border-[#1b4e33] flex items-center justify-between text-right">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#006c35] to-[#10b981] flex items-center justify-center text-white shadow-md">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-white text-sm sm:text-base">
                    المرشد التاريخي والوطني
                  </h3>
                  <span className="text-[10px] bg-[#10b981]/20 text-[#6ee7b7] px-2 py-0.5 rounded-full border border-[#10b981]/30 font-semibold">
                    متصل
                  </span>
                </div>
                <p className="text-xs text-[#8ab69a]">
                  موثق بالتواريخ والأئمة والملوك والوثائق التاريخية
                </p>
              </div>
            </div>

            <button
              id="reset-chat-btn"
              onClick={handleResetChat}
              title="إعادة بدء المحادثة"
              className="p-2 rounded-xl bg-[#091b12] hover:bg-[#123824] border border-[#1b4d32] text-[#86efac] text-xs flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">محادثة جديدة</span>
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {messages.map((msg) => {
              const isUser = msg.sender === "user";
              return (
                <div
                  key={msg.id}
                  id={`chat-msg-${msg.id}`}
                  className={`flex items-start gap-3 text-right ${
                    isUser ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-1 shadow ${
                      isUser
                        ? "bg-[#10b981] text-black font-bold"
                        : "bg-[#006c35] text-[#f6e05e]"
                    }`}
                  >
                    {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>

                  <div
                    className={`max-w-[85%] rounded-2xl p-4 relative group ${
                      isUser
                        ? "bg-[#13492c] text-white border border-[#217747]"
                        : "bg-[#081810] text-[#e3ece7] border border-[#1a442c]"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3 text-[11px] text-[#7da78f] mb-1.5 border-b border-white/5 pb-1">
                      <span className="font-semibold text-white">
                        {isUser ? "أنت" : "المرشد التاريخي السعودي"}
                      </span>
                      <span>{msg.timestamp}</span>
                    </div>

                    <div className="text-sm leading-relaxed prose prose-invert max-w-none prose-p:my-1 prose-headings:text-[#f6e05e] prose-headings:my-2 prose-ul:my-1 prose-li:my-0.5">
                      <Markdown>{msg.text}</Markdown>
                    </div>

                    {!isUser && (
                      <div className="mt-3 pt-2 border-t border-[#133823] flex items-center justify-end">
                        <button
                          id={`copy-msg-${msg.id}`}
                          onClick={() => copyToClipboard(msg.id, msg.text)}
                          className="text-[11px] text-[#86efac] hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          {copiedId === msg.id ? (
                            <>
                              <Check className="w-3 h-3 text-[#10b981]" />
                              <span>تم النسخ</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>نسخ الإجابة</span>
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {loading && (
              <div className="flex items-start gap-3 text-right">
                <div className="w-8 h-8 rounded-xl bg-[#006c35] text-[#f6e05e] flex items-center justify-center shrink-0 mt-1">
                  <Bot className="w-4 h-4 animate-spin" />
                </div>
                <div className="bg-[#081810] border border-[#1a442c] rounded-2xl p-4 text-xs text-[#86efac] flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-[#10b981]" />
                  <span>المرشد التاريخي يراجع السجلات والوثائق لكتابة الإجابة...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions Carousel */}
          <div className="px-4 py-2.5 bg-[#091a11] border-t border-[#16422a] overflow-x-auto no-scrollbar flex items-center gap-2">
            <span className="text-[11px] font-bold text-[#f6e05e] shrink-0 flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              أسئلة مقترحة:
            </span>
            {INITIAL_SUGGESTIONS.map((sug, idx) => (
              <button
                key={idx}
                id={`suggestion-${idx}`}
                onClick={() => handleSendMessage(sug)}
                className="text-[11px] bg-[#0c2418] hover:bg-[#123824] text-[#a4cbbb] hover:text-white border border-[#1c4e33] rounded-full px-3 py-1 whitespace-nowrap transition-colors cursor-pointer shrink-0"
              >
                {sug}
              </button>
            ))}
          </div>

          {/* Chat Input Bar */}
          <div className="p-4 bg-[#0a2015] border-t border-[#1b4e33]">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                id="ai-chat-input"
                value={inputPrompt}
                onChange={(e) => setInputPrompt(e.target.value)}
                placeholder="اكتب سؤالك التاريخي بالتفصيل (مثال: كيف توحدت المملكة ومن شارك مع الملك عبد العزيز؟)..."
                disabled={loading}
                className="flex-1 bg-[#06140d] border border-[#1a5032] rounded-xl px-4 py-3 text-white text-xs sm:text-sm focus:outline-none focus:border-[#10b981] placeholder:text-[#527d66] disabled:opacity-50"
              />
              <button
                type="submit"
                id="ai-send-btn"
                disabled={loading || !inputPrompt.trim()}
                className="px-5 py-3 rounded-xl bg-[#006c35] hover:bg-[#0a8243] disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-[#006c35]/40"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4 rotate-180" />}
                <span className="hidden sm:inline">إرسال</span>
              </button>
            </form>
            <div className="flex items-center justify-between text-[11px] text-[#6d9681] mt-2 px-1">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#10b981]" />
                مبني على مصادر تاريخية موثوقة (دارة الملك عبد العزيز والمراجع الوطنية)
              </span>
              <span>اليوم الوطني السعودي • 23 سبتمبر</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini client lazily/safely
  let aiClient: GoogleGenAI | null = null;
  function getAI() {
    if (!aiClient && process.env.GEMINI_API_KEY) {
      aiClient = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
    }
    return aiClient;
  }

  // AI Chat Route for Saudi Historical and National Day Guide
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      if (!message || typeof message !== "string") {
        return res.status(400).json({ error: "الرجاء إرسال سؤال أو نص صحيح." });
      }

      const ai = getAI();
      if (!ai) {
        return res.status(500).json({
          error: "مفتاح GEMINI_API_KEY غير متوفر حالياً في إعدادات البيئة. يرجى التأكد من إضافة المفتاح في لوحة الأسرار (Secrets).",
        });
      }

      const systemInstruction = `
أنت "المرشد التاريخي السعودي الذكي" وخبير تاريخ وتراث المملكة العربية السعودية ومناسباتها الوطنية (اليوم الوطني السعودي 23 سبتمبر، ويوم التأسيس 22 فبراير).
تتحدث باللغة العربية الفصحى الراقية وبأسلوب فخور وموثق تاريخياً وودود وملهم.

معارفك التأسيسية الشاملة تشمل:
1. الدولة السعودية الأولى (1139هـ / 1727م - 1233هـ / 1818م):
   - تأسيس الإمام محمد بن سعود لإمارة الدرعية وبدء الدولة السعودية الأولى.
   - الأئمة الأربعة: الإمام محمد بن سعود، الإمام عبد العزيز بن محمد، الإمام سعود بن عبد العزيز الكبير (سعود الكبير)، الإمام عبد الله بن سعود.
   - الدرعية عاصمة الصمود وحي الطريف التاريخي.

2. الدولة السعودية الثانية (1240هـ / 1824م - 1309هـ / 1891م):
   - المؤسس الإمام تركي بن عبد الله آل سعود واسترداد الرياض عام 1824م وصاحب سيف الأجرب الشهير.
   - الإمام فيصل بن تركي والأئمة اللاحقون حتى الإمام عبد الرحمن بن فيصل.

3. الدولة السعودية الثالثة وتوحيد المملكة (1319هـ / 1902م - حتى اليوم):
   - استرداد الرياض وملحمة قصر المصمك بقيادة الملك عبد العزيز بن عبد الرحمن آل سعود في 5 شوال 1319هـ / 15 يناير 1902م مع رجاله الستين المخلصين.
   - معارك ومسيرة التوحيد المباركة لمدة 30 عاماً وتوحيد أرجاء شبه الجزيرة العربية.
   - صدور الأمر الملكي رقم 2716 بتاريخ 17 جمادى الأولى 1351هـ بتوحيد البلاد باسم "المملكة العربية السعودية" ابتداءً من يوم الخميس 21 جمادى الأولى 1351هـ الموافق 23 سبتمبر 1932م (اليوم الوطني).

4. ملوك المملكة وإنجازاتهم:
   - الملك عبد العزيز (المؤسس والموحد، اكتشاف النفط، إرساء الأمن).
   - الملك سعود (تأسيس مجلس الوزراء، جامعة الملك سعود، توسعة الحرمين).
   - الملك فيصل (النهضة التعليمية الكبرى، التضامن الإسلامي، حماية ثروات الأمة).
   - الملك خالد (عصر الرخاء والتنمية وإنشاء الهيئة الملكية للجبيل وينبع).
   - الملك فهد (خادم الحرمين الشريفين، التوسعات التاريخية للحرمين، مجمع الملك فهد لطباعة المصحف).
   - الملك عبد الله (مدينة الملك عبد الله الاقتصادية، جامعة كاوست، برنامج الابتعاث، توسعة المطاف).
   - خادم الحرمين الشريفين الملك سلمان بن عبد العزيز (عصر الحزم والتحول، نصرة قضايا الأمة، قفزات التنمية).
   - صاحب السمو الملكي الأمير محمد بن سلمان بن عبد العزيز ولي العهد رئيس مجلس الوزراء (مهندس رؤية السعودية 2030، مشاريع نيوم وذا لاين والقدية والبحر الأحمر وبوابة الدرعية ومبادرة السعودية الخضراء والذكاء الاصطناعي).

5. اليوم الوطني السعودي:
   - يوافق 23 سبتمبر من كل عام.
   - تذكير بالوحدة والولاء والتلاحم بين القيادة والشعب، واستعراض الإنجازات والاعتزاز بالهوية.

قواعد الإجابة:
- اذكر الأسماء الدقيقة والتواريخ الهجرية والميلادية عند الحديث عن الأحداث التاريخية.
- نسق إجابتك باستخدام عناوين ونقاط واضحة إذا كانت الإجابة تفصيلية.
- كن ملبياً ومفصلاً إذا طلب المستخدم تفاصيل عن القادة أو الحروب أو نشأة الدولة.
- يمكنك كتابة أبيات شعر وطنية أو تهنئة عند الطلب.
`;

      // Build conversation contents
      const contents: Array<{ role: string; parts: Array<{ text: string }> }> = [];

      if (Array.isArray(history)) {
        for (const item of history.slice(-8)) {
          if (item.sender === "user") {
            contents.push({ role: "user", parts: [{ text: item.text }] });
          } else if (item.sender === "assistant" || item.sender === "bot") {
            contents.push({ role: "model", parts: [{ text: item.text }] });
          }
        }
      }

      contents.push({ role: "user", parts: [{ text: message }] });

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: contents as any,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      const replyText = response.text || "عذراً، لم أتمكن من الحصول على إجابة في هذه اللحظة.";
      return res.json({ reply: replyText });
    } catch (error: any) {
      console.error("AI Error:", error);
      return res.status(500).json({
        error: error.message || "حدث خطأ أثناء معالجة الطلب.",
      });
    }
  });

  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", time: new Date().toISOString() });
  });

  // Vite middleware in dev or static files in production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});

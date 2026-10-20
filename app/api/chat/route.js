import { NextResponse } from "next/server";
import { GoogleGenAI, ThinkingLevel } from "@google/genai";

export const maxDuration = 60;

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_KEY });

const MODEL = process.env.GEMINI_MODEL || "gemini-3.8-flash";
const FALLBACK_MODEL = process.env.GEMINI_FALLBACK_MODEL || "gemini-3.5-flash";

const NO_MD =
  " Markdown ishlatma: yulduzcha, #, backtick yozma. Oddiy matn va raqamli ro'yxat ishlat.";

const PROMPTS = {
  widget:
    "Sen blog yozishda yordam beradigan yordamchisan. Sarlavha, tavsif va kategoriya bo'yicha maslahat berasan. Faqat o'zbek tilida, qisqa va aniq javob ber." +
    NO_MD,
  admin:
    "Sen Global HR admin panelidagi yordamchisan. Admin blog yoki yangi davlat qo'shayotganda unga ma'lumot topishda va matn yozishda yordam berasan. Foydalanuvchi qaysi tilda yozsa, o'sha tilda javob ber (asosan o'zbekcha). Aniq bo'l, bilmagan narsangni to'qima." +
    NO_MD,
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// 503 (band) va 429 (limit) vaqtinchalik xato, qayta urinsa bo'ladi
const isRetryable = (e) => {
  const s = e?.status ?? e?.code;
  return (
    s === 503 ||
    s === 429 ||
    /UNAVAILABLE|high demand|overloaded/i.test(String(e?.message))
  );
};

async function generateWithRetry(params) {
  // 1) asosiy model, 3 urinish
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      return await ai.models.generateContent({ ...params, model: MODEL });
    } catch (e) {
      if (!isRetryable(e)) throw e;
      if (attempt < 2) await sleep(1000 * (attempt + 1)); // oxirgisida kutmaymiz
    }
  }
  // 2) zaxira model (thinking sozlamasiz)
  const { thinkingConfig, ...restConfig } = params.config;
  return await ai.models.generateContent({
    contents: params.contents,
    config: restConfig,
    model: FALLBACK_MODEL,
  });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const message = body.message;
    const history = Array.isArray(body.history) ? body.history : [];
    const mode = typeof body.mode === "string" ? body.mode : "widget";

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "message kerak" }, { status: 400 });
    }

    // Gemini tarixi 'user' bilan boshlanishi kerak
    const clean = history.slice(-10);
    while (clean.length && clean[0].role !== "user") clean.shift();

    const contents = [
      ...clean.map((m) => ({
        role: m.role === "ai" ? "model" : "user",
        parts: [{ text: String(m.text).slice(0, 4000) }],
      })),
      { role: "user", parts: [{ text: message.slice(0, 4000) }] },
    ];

    const response = await generateWithRetry({
      contents,
      config: {
        systemInstruction: PROMPTS[mode] || PROMPTS.widget,
        thinkingConfig: { thinkingLevel: ThinkingLevel.MEDIUM },
      },
    });

    return NextResponse.json({
      output_text: response.text || "Javob bo'sh keldi, qayta urinib ko'r.",
    });
  } catch (error) {
    console.error("Gemini error:", error);
    if (isRetryable(error)) {
      return NextResponse.json(
        { error: "AI hozir band, bir ozdan keyin qayta urinib ko'ring." },
        { status: 503 }
      );
    }
    return NextResponse.json({ error: "AI javob bera olmadi" }, { status: 500 });
  }
}
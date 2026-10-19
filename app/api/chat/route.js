import { NextResponse } from "next/server";
import { GoogleGenAI, ThinkingLevel } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_KEY });

const MODEL = process.env.GEMINI_MODEL || "gemini-3.5-flash";

export async function POST(request) {
  try {
    const { message } = await request.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "message kerak" }, { status: 400 });
    }
    const response = await ai.models.generateContent({
      model: MODEL,
      contents: message,
      systemInstruction:
    "Sen blog yozishda yordam beradigan yordamchisan. Sarlavha, tavsif va kategoriya bo'yicha maslahat berasan. " +
    "Faqat o'zbek tilida, qisqa va aniq javob ber. Markdown ishlatma: yulduzcha, #, backtick yozma, oddiy matn va raqamli ro'yxat bo'lsin.",
  
      config: {
        thinkingConfig: { thinkingLevel: ThinkingLevel.MEDIUM },
      },
    });

    return NextResponse.json({ output_text: response.text });
  } catch (error) {
    console.error("Gemini error:", error);
    return NextResponse.json({ error: "AI javob bera olmadi" }, { status: 500 });
  }
}
import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(request) {
  try {
    const { message } = await request.json();

    const response = await client.responses.create({
      model: "gpt-5-nano",
      input: message,
      store: true,
    });

    return NextResponse.json({ output_text: response.output_text });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
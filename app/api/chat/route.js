import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({ apiKey: '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' });

export async function POST(request) {
  try {
    const { message } = await request.json();

    const response = await client.responses.create({
      model: "gpt-4.1",
      input: message,
    });

    return NextResponse.json({ output_text: response.output_text });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
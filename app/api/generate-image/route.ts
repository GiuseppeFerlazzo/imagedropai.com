import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const prompt = body.prompt;

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { error: "A valid prompt is required" },
        { status: 400 },
      );
    }

    const result = await openai.images.generate({
      model: "gpt-image-1",
      prompt,
    });

    const imageBase64 = result.data?.[0]?.b64_json;

    if (!imageBase64) {
      return NextResponse.json(
        { error: "Image generation failed" },
        { status: 500 },
      );
    }

    return NextResponse.json({
      image: `data:image/png;base64,${imageBase64}`,
    });
  } catch (error) {
    console.error("Image generation error:", error);

    return NextResponse.json(
      { error: "Failed to generate image" },
      { status: 500 },
    );
  }
}

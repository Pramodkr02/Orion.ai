import { NextResponse } from "next/server";
import { extractTextFromPDF } from "@/lib/pdf";
import { analyzeResume } from "@/lib/groq";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (file.type !== "application/pdf") {
      return NextResponse.json({ error: "Only PDF files are allowed" }, { status: 400 });
    }

    // 1. Process file in memory (no disk write involved)
    // Convert Blob/File to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 2. Extract Text
    const text = await extractTextFromPDF(buffer);

    // 3. Analyze with AI
    const analysis = await analyzeResume(text);

    // 4. Return Result
    return NextResponse.json({ success: true, data: analysis });

  } catch (error) {
    console.error("ATS API Error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

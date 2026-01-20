import Groq from "groq-sdk";
import { ATS_ANALYSIS_PROMPT } from "@/config/ats-prompt";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

/**
 * Sends resume text to Groq AI for ATS analysis.
 * @param {string} resumeText - The extracted text from the resume.
 * @returns {Promise<Object>} - The structured JSON analysis.
 */
export async function analyzeResume(resumeText) {
  if (!resumeText || resumeText.trim().length === 0) {
    throw new Error("Resume text is empty.");
  }

  try {
    const userMessage = "Analyze this resume:\n\n" + resumeText;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: ATS_ANALYSIS_PROMPT,
        },
        {
          role: "user",
          content: userMessage,
        },
      ],
      model: "llama3-70b-8192", // Using a high-performance model for accurate JSON handling
      temperature: 0.2, // Low temperature for consistent output
      stream: false,
      response_format: { type: "json_object" }, // Enforce JSON mode if supported
    });

    const content = chatCompletion.choices[0]?.message?.content;

    if (!content) {
      throw new Error("AI returned empty response.");
    }

    // Attempt to parse JSON strictly
    try {
        return JSON.parse(content);
    } catch (parseError) {
        console.error("JSON Parse Error:", parseError, "Raw Content:", content);
        // Fallback: cleanup potential markdown wrappers if prompt instruction failed
        const cleaned = content.replace(/```json/g, "").replace(/```/g, "").trim();
        return JSON.parse(cleaned);
    }

  } catch (error) {
    console.error("Groq Analysis Error:", error);
    throw new Error("Failed to analyze resume with AI.");
  }
}

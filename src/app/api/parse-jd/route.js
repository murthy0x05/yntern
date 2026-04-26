import { generateJSON } from "@/lib/gemini";
import { parseJDPrompt } from "@/lib/prompts";
import { DEMO_PARSED_JD } from "@/lib/demoData";

export async function POST(request) {
  try {
    const { jdText, useDemo } = await request.json();

    if (useDemo) {
      return Response.json({ success: true, data: DEMO_PARSED_JD, isDemo: true });
    }

    if (!jdText || jdText.trim().length < 20) {
      return Response.json(
        { success: false, error: "Please provide a valid job description." },
        { status: 400 }
      );
    }

    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === "your_gemini_api_key_here") {
      return Response.json({ success: true, data: DEMO_PARSED_JD, isDemo: true });
    }

    const prompt = parseJDPrompt(jdText);
    const parsed = await generateJSON(prompt, { temperature: 0.3 });
    return Response.json({ success: true, data: parsed });
  } catch (error) {
    console.error("Parse JD error:", error);
    return Response.json({ success: true, data: DEMO_PARSED_JD, isDemo: true });
  }
}

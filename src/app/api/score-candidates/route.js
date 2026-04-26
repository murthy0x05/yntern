import { generateJSON } from "@/lib/gemini";
import { scoreCandidatesPrompt } from "@/lib/prompts";
import { DEMO_SCORES } from "@/lib/demoData";

export async function POST(request) {
  try {
    const { parsedJD, candidates, useDemo } = await request.json();

    if (useDemo) {
      return Response.json({ success: true, data: DEMO_SCORES, isDemo: true });
    }

    if (!parsedJD || !candidates) {
      return Response.json(
        { success: false, error: "Parsed JD and candidates are required." },
        { status: 400 }
      );
    }

    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === "your_gemini_api_key_here") {
      return Response.json({ success: true, data: DEMO_SCORES, isDemo: true });
    }

    const prompt = scoreCandidatesPrompt(parsedJD, candidates);
    const result = await generateJSON(prompt, { temperature: 0.2, maxTokens: 12000 });
    const scores = Array.isArray(result) ? result : result.scores || [];
    return Response.json({ success: true, data: scores });
  } catch (error) {
    console.error("Score candidates error:", error);
    return Response.json({ success: true, data: DEMO_SCORES, isDemo: true });
  }
}

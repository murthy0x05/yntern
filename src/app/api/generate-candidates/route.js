import { generateJSON } from "@/lib/gemini";
import { generateCandidatesPrompt } from "@/lib/prompts";
import { DEMO_CANDIDATES } from "@/lib/demoData";

export async function POST(request) {
  try {
    const { parsedJD, useDemo } = await request.json();

    if (useDemo) {
      return Response.json({ success: true, data: DEMO_CANDIDATES, isDemo: true });
    }

    if (!parsedJD) {
      return Response.json(
        { success: false, error: "Parsed JD is required." },
        { status: 400 }
      );
    }

    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === "your_gemini_api_key_here") {
      return Response.json({ success: true, data: DEMO_CANDIDATES, isDemo: true });
    }

    const prompt = generateCandidatesPrompt(parsedJD);
    const result = await generateJSON(prompt, { temperature: 0.8, maxTokens: 12000 });
    const candidates = Array.isArray(result) ? result : result.candidates || [];
    return Response.json({ success: true, data: candidates });
  } catch (error) {
    console.error("Generate candidates error:", error);
    return Response.json({ success: true, data: DEMO_CANDIDATES, isDemo: true });
  }
}

import { generateJSON } from "@/lib/gemini";
import { simulateOutreachPrompt } from "@/lib/prompts";
import { DEMO_OUTREACH } from "@/lib/demoData";

export async function POST(request) {
  try {
    const { parsedJD, candidate, candidateScore, useDemo } = await request.json();

    if (useDemo && DEMO_OUTREACH[candidate?.id]) {
      return Response.json({
        success: true,
        data: DEMO_OUTREACH[candidate.id],
        isDemo: true,
      });
    }

    if (!parsedJD || !candidate) {
      return Response.json(
        { success: false, error: "Parsed JD and candidate are required." },
        { status: 400 }
      );
    }

    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === "your_gemini_api_key_here") {
      // Generate a basic fallback if no demo data for this candidate
      const fallback = DEMO_OUTREACH[candidate.id] || generateFallbackOutreach(candidate);
      return Response.json({ success: true, data: fallback, isDemo: true });
    }

    const prompt = simulateOutreachPrompt(parsedJD, candidate, candidateScore);
    const result = await generateJSON(prompt, { temperature: 0.85, maxTokens: 8192 });
    return Response.json({ success: true, data: result });
  } catch (error) {
    console.error("Simulate outreach error:", error);
    const fallback = DEMO_OUTREACH[candidate?.id] || generateFallbackOutreach(candidate);
    return Response.json({ success: true, data: fallback, isDemo: true });
  }
}

function generateFallbackOutreach(candidate) {
  const name = candidate?.name || "Candidate";
  const isOpen = candidate?.open_to_change !== false;
  const interestScore = isOpen ? 65 : 35;

  return {
    messages: [
      { role: "recruiter", text: `Hi ${name}! I came across your profile and was impressed by your background. We have an exciting opportunity that I think could be a great fit. Would you be open to a quick chat?`, sentiment: 0.8 },
      { role: "candidate", text: isOpen ? "Thanks for reaching out! I'm always open to hearing about interesting opportunities. What can you tell me about the role?" : "Hi, thanks for the message. I'm fairly content in my current position, but I suppose I can hear more.", sentiment: isOpen ? 0.6 : 0.2 },
      { role: "recruiter", text: "Great! It's a Senior Full-Stack Engineer role on our AI Platform team. You'd be building the web infrastructure that powers our ML systems — dashboards, APIs, deployment pipelines. Fully remote with competitive compensation.", sentiment: 0.8 },
      { role: "candidate", text: isOpen ? "That sounds interesting! The AI/ML angle is appealing. What does the tech stack look like?" : "I see. What's the compensation range? That would be a key factor for me.", sentiment: isOpen ? 0.6 : 0.3 },
      { role: "recruiter", text: "We use React/Next.js, Node.js, Python, and Kubernetes. The salary range is $180k-$230k plus equity. We're a Series B company growing fast.", sentiment: 0.8 },
      { role: "candidate", text: isOpen ? "The tech stack is right in my wheelhouse, and the comp range works. I'd be interested in learning more about the team and the problems you're solving." : "That's within range, but I'd need to see a significant step up from my current package to consider moving. I'll think about it.", sentiment: isOpen ? 0.7 : 0.3 },
    ],
    interest_score: interestScore,
    interest_signals: {
      enthusiasm: isOpen ? 70 : 30,
      questions_asked: isOpen ? 65 : 40,
      salary_alignment: isOpen ? 75 : 50,
      timeline_willingness: isOpen ? 70 : 30,
      objections_severity: isOpen ? 75 : 40,
      flight_risk: isOpen ? 35 : 60,
    },
    key_moments: [
      { message_index: 1, label: isOpen ? "Showed openness to opportunities" : "Expressed contentment with current role" },
      { message_index: 3, label: isOpen ? "Asked about tech stack — engaged" : "Immediately focused on compensation — transactional" },
    ],
    summary: isOpen
      ? `${name} showed moderate interest in the role, particularly the AI/ML angle. Compensation expectations align and they're engaged in the conversation.`
      : `${name} appears satisfied in their current role. They showed limited enthusiasm and immediately focused on compensation, suggesting they'd only move for a significant package increase.`,
  };
}

import { NextResponse } from "next/server";
import { generateJSON } from "@/lib/gemini";

export async function POST(request) {
  try {
    const { title, skills, responsibilities, experience } = await request.json();

    const prompt = `You are an expert technical interviewer. Generate exactly 5 assessment questions for a candidate applying for the "${title}" role.

The role requires these skills: ${(skills || []).join(", ")}
Experience level: ${experience || "mid-level"}
Key responsibilities: ${(responsibilities || []).join("; ")}

Generate a mix of:
- 2 technical questions specific to the required skills
- 1 problem-solving/system design question
- 1 behavioral/situational question
- 1 question about career goals and role fit

Return a JSON array of exactly 5 question strings. Example format:
["Question 1?", "Question 2?", "Question 3?", "Question 4?", "Question 5?"]

Make questions specific, professional, and relevant to the role. Each question should be 1-2 sentences.`;

    const result = await generateJSON(prompt);
    let questions;
    try {
      questions = typeof result === "string" ? JSON.parse(result) : result;
    } catch {
      questions = null;
    }

    if (Array.isArray(questions) && questions.length >= 5) {
      return NextResponse.json({ success: true, questions: questions.slice(0, 5) });
    }

    // Fallback: generate from skills
    const fallback = (skills || []).slice(0, 3).map(
      (s) => `Describe your experience with ${s}. What have you built using it and what challenges did you face?`
    );
    while (fallback.length < 5) {
      fallback.push([
        "Walk us through how you would design a scalable backend system for this role.",
        "Describe a time you had to resolve a conflict or disagreement within your team.",
        "What excites you most about this role, and where do you see yourself in 2-3 years?",
      ][fallback.length - (skills || []).slice(0, 3).length] || "Tell us about a project you are most proud of.");
    }

    return NextResponse.json({ success: true, questions: fallback.slice(0, 5) });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

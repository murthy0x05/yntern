/**
 * Gemini API Client — enhanced version
 * Centralized client for all AI interactions.
 */
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

/**
 * Get a Gemini model instance.
 * Uses gemini-2.0-flash for speed — ideal for hackathon demos.
 */
export function getModel(modelName = "gemini-2.0-flash") {
  return genAI.getGenerativeModel({ model: modelName });
}

/**
 * Generate structured JSON from a prompt.
 * @param {string} prompt - The full prompt string
 * @param {object} options - Generation config overrides
 * @returns {Promise<object>} Parsed JSON response
 */
export async function generateJSON(prompt, options = {}) {
  const model = getModel(options.model);
  const result = await model.generateContent({
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    generationConfig: {
      temperature: options.temperature ?? 0.7,
      topP: options.topP ?? 0.9,
      maxOutputTokens: options.maxTokens ?? 8192,
      responseMimeType: "application/json",
    },
  });

  const text = result.response.text();
  try {
    return JSON.parse(text);
  } catch {
    // Sometimes the model wraps JSON in markdown code blocks
    const match = text.match(/```json\n?([\s\S]*?)\n?```/);
    if (match) return JSON.parse(match[1]);
    // Try cleaning any leading/trailing text
    const cleaned = text.replace(/^[^[{]*/, "").replace(/[^}\]]*$/, "");
    return JSON.parse(cleaned);
  }
}

/**
 * Generate a text response from a prompt.
 * @param {string} prompt
 * @param {object} options
 * @returns {Promise<string>}
 */
export async function generateText(prompt, options = {}) {
  const model = getModel(options.model);
  const result = await model.generateContent({
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    generationConfig: {
      temperature: options.temperature ?? 0.7,
      topP: options.topP ?? 0.9,
      maxOutputTokens: options.maxTokens ?? 4096,
    },
  });

  return result.response.text();
}

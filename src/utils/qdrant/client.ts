import { QdrantClient } from "@qdrant/js-client-rest";

const qdrantUrl = process.env.QDRANT_URL;
const qdrantApiKey = process.env.QDRANT_API_KEY;

if (!qdrantUrl) {
  console.warn("QDRANT_URL is not set. Qdrant features will not work.");
}

export const qdrant = new QdrantClient({
  url: qdrantUrl || "http://localhost:6333",
  apiKey: qdrantApiKey,
});

export const COLLECTION_NAME = "candidates";
export const EMBEDDING_MODEL = "sentence-transformers/all-MiniLM-L6-v2";
export const VECTOR_SIZE = 384;

/**
 * Ensures the candidates collection exists in Qdrant.
 * Creates it with the correct vector config if missing.
 */
export async function ensureCollection(): Promise<void> {
  try {
    await qdrant.getCollection(COLLECTION_NAME);
  } catch {
    await qdrant.createCollection(COLLECTION_NAME, {
      vectors: {
        size: VECTOR_SIZE,
        distance: "Cosine",
      },
    });
  }
}

/**
 * Builds the embedding text string from a candidate's profile fields.
 * This text is what gets embedded into the vector space.
 */
export function buildEmbeddingText(profile: {
  name: string;
  title: string;
  skills?: string[];
  bio?: string;
  experience_level?: string;
  work_preference?: string;
  country?: string;
  company?: string;
  education?: string;
}): string {
  const parts: string[] = [];

  parts.push(profile.name);
  parts.push(profile.title);

  if (profile.skills && profile.skills.length > 0) {
    parts.push(`Skills: ${profile.skills.join(", ")}`);
  }

  if (profile.experience_level) {
    parts.push(`${profile.experience_level} experience`);
  }

  if (profile.work_preference) {
    parts.push(profile.work_preference);
  }

  if (profile.country) {
    parts.push(profile.country);
  }

  if (profile.company) {
    parts.push(`at ${profile.company}`);
  }

  if (profile.education) {
    parts.push(profile.education);
  }

  if (profile.bio) {
    parts.push(profile.bio);
  }

  return parts.join(" | ");
}

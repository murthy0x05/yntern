import {
  qdrant,
  COLLECTION_NAME,
  EMBEDDING_MODEL,
  ensureCollection,
  buildEmbeddingText,
} from "@/utils/qdrant/client";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firestoreDocId, name, title, skills, bio, experience_level, work_preference, country, company, education } = body;

    if (!firestoreDocId || !name || !title) {
      return Response.json(
        { error: "firestoreDocId, name, and title are required" },
        { status: 400 }
      );
    }

    await ensureCollection();

    const embeddingText = buildEmbeddingText({
      name,
      title,
      skills,
      bio,
      experience_level,
      work_preference,
      country,
      company,
      education,
    });

    // Upsert using Qdrant Cloud Inference — pass text + model instead of a raw vector
    await qdrant.upsert(COLLECTION_NAME, {
      points: [
        {
          id: firestoreDocId,
          vector: {
            text: embeddingText,
            model: EMBEDDING_MODEL,
          } as any, // Cloud Inference text-based vector
          payload: {
            firestoreDocId,
            name,
            title,
            skills: skills || [],
            experience_level: experience_level || "",
            work_preference: work_preference || "",
            country: country || "",
            company: company || "",
            education: education || "",
            initials: name
              .split(" ")
              .map((n: string) => n[0])
              .join("")
              .substring(0, 2)
              .toUpperCase(),
          },
        },
      ],
    });

    return Response.json({ success: true, embeddingText });
  } catch (error: any) {
    console.error("Candidate upsert failed:", error);
    return Response.json(
      { error: error.message || "Failed to upsert candidate" },
      { status: 500 }
    );
  }
}

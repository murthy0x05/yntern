import {
  qdrant,
  COLLECTION_NAME,
  EMBEDDING_MODEL,
  ensureCollection,
} from "@/utils/qdrant/client";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { query, limit = 10, filters } = body;

    if (!query || typeof query !== "string") {
      return Response.json(
        { error: "query is required and must be a string" },
        { status: 400 }
      );
    }

    await ensureCollection();

    // Build optional payload filters for Qdrant
    const filter: any = { must: [] };

    if (filters?.skills && filters.skills.length > 0) {
      filter.must.push({
        key: "skills",
        match: { any: filters.skills },
      });
    }

    if (filters?.country) {
      filter.must.push({
        key: "country",
        match: { value: filters.country },
      });
    }

    if (filters?.experience_level) {
      filter.must.push({
        key: "experience_level",
        match: { value: filters.experience_level },
      });
    }

    if (filters?.work_preference) {
      filter.must.push({
        key: "work_preference",
        match: { value: filters.work_preference },
      });
    }

    // Query using Qdrant Cloud Inference — pass text + model
    const searchResult = await qdrant.query(COLLECTION_NAME, {
      query: {
        text: query,
        model: EMBEDDING_MODEL,
      } as any, // Cloud Inference text-based query
      limit: Math.min(limit, 50),
      with_payload: true,
      ...(filter.must.length > 0 ? { filter } : {}),
    });

    const results = searchResult.points.map((point: any) => ({
      firestoreDocId: point.payload?.firestoreDocId || point.id,
      similarity: Math.round((point.score || 0) * 100),
      name: point.payload?.name || "",
      title: point.payload?.title || "",
      skills: point.payload?.skills || [],
      experience_level: point.payload?.experience_level || "",
      work_preference: point.payload?.work_preference || "",
      country: point.payload?.country || "",
      company: point.payload?.company || "",
      initials: point.payload?.initials || "",
    }));

    return Response.json({ results });
  } catch (error: any) {
    console.error("Search failed:", error);
    return Response.json(
      { error: error.message || "Search failed" },
      { status: 500 }
    );
  }
}

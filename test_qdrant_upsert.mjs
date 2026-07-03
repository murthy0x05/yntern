import { QdrantClient } from "@qdrant/js-client-rest";

const qdrant = new QdrantClient({
  url: "https://38594cf9-4f4e-43a5-a449-c2af9898d787.eu-central-1-0.aws.cloud.qdrant.io",
  apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3MiOiJtIiwic3ViamVjdCI6ImFwaS1rZXk6YmE2ZGI5YWEtZjQ0Ny00ZDlmLTlhM2ItMjc3YzllNzJhNDgxIn0.xgEOZMxZ_tFTNTmGiGd1xR83-IZDJ1-ZmklFP5a2oEQ",
});

const COLLECTION_NAME = "candidates";
const EMBEDDING_MODEL = "sentence-transformers/all-MiniLM-L6-v2";
const VECTOR_SIZE = 384;

async function testQdrant() {
  console.log("Testing Qdrant connection...");
  
  // 1. Check/create collection
  try {
    console.log("Checking if collection exists...");
    await qdrant.getCollection(COLLECTION_NAME);
    console.log("Collection exists.");
  } catch (err) {
    console.log("Collection does not exist or error:", err.message);
    try {
      console.log("Attempting to create collection...");
      await qdrant.createCollection(COLLECTION_NAME, {
        vectors: {
          size: VECTOR_SIZE,
          distance: "Cosine",
        },
      });
      console.log("Collection created successfully.");
    } catch (createErr) {
      console.error("Failed to create collection:", createErr.message);
      return;
    }
  }

  // 2. Try to upsert using Cloud Inference
  try {
    console.log("Attempting to upsert point with Cloud Inference...");
    await qdrant.upsert(COLLECTION_NAME, {
      points: [
        {
          id: "test-id-1234",
          vector: {
            text: "This is a test candidate profile for Qdrant Cloud Inference.",
            model: EMBEDDING_MODEL,
          },
          payload: {
            name: "Test User"
          },
        },
      ],
    });
    console.log("Upsert successful!");
  } catch (upsertErr) {
    console.error("Failed to upsert:", upsertErr);
  }
}

testQdrant();

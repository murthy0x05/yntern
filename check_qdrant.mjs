import { QdrantClient } from "@qdrant/js-client-rest";

const qdrant = new QdrantClient({
  url: "https://38594cf9-4f4e-43a5-a449-c2af9898d787.eu-central-1-0.aws.cloud.qdrant.io",
  apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3MiOiJtIiwic3ViamVjdCI6ImFwaS1rZXk6YmE2ZGI5YWEtZjQ0Ny00ZDlmLTlhM2ItMjc3YzllNzJhNDgxIn0.xgEOZMxZ_tFTNTmGiGd1xR83-IZDJ1-ZmklFP5a2oEQ",
});

async function check() {
  try {
    const collectionInfo = await qdrant.getCollection("candidates");
    console.log("Collection info:", collectionInfo);

    const points = await qdrant.scroll("candidates", {
      limit: 10,
      with_payload: true,
      with_vector: false
    });
    console.log("\nFound candidates in Qdrant:");
    points.points.forEach((p, i) => {
      console.log(`\nCandidate ${i + 1}:`);
      console.log(`Name: ${p.payload?.name}`);
      console.log(`Title: ${p.payload?.title}`);
      console.log(`Skills: ${p.payload?.skills?.join(", ")}`);
      console.log(`Experience: ${p.payload?.experience_level}`);
    });
  } catch (err) {
    console.error("Error:", err.message);
  }
}

check();

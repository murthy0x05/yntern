import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { QdrantClient } from "@qdrant/js-client-rest";
import { v5 as uuidv5 } from "uuid";

const firebaseConfig = {
  apiKey: "AIzaSyDIDY_C57efZSITgVrjRvDeZmXld7s5A2w",
  authDomain: "yntern-murthy0x05.firebaseapp.com",
  projectId: "yntern-murthy0x05",
  storageBucket: "yntern-murthy0x05.firebasestorage.app",
  messagingSenderId: "87327648042",
  appId: "1:87327648042:web:abf2a7b1bc3f61e8301653"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const qdrantUrl = "https://38594cf9-4f4e-43a5-a449-c2af9898d787.eu-central-1-0.aws.cloud.qdrant.io";
const qdrantApiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3MiOiJtIiwic3ViamVjdCI6ImFwaS1rZXk6YmE2ZGI5YWEtZjQ0Ny00ZDlmLTlhM2ItMjc3YzllNzJhNDgxIn0.xgEOZMxZ_tFTNTmGiGd1xR83-IZDJ1-ZmklFP5a2oEQ";

const qdrant = new QdrantClient({
  url: qdrantUrl,
  apiKey: qdrantApiKey,
});

const NAMESPACE = "1b671a64-40d5-491e-99b0-da01ff1f3341";
const COLLECTION_NAME = "candidates";
const EMBEDDING_MODEL = "sentence-transformers/all-MiniLM-L6-v2";
const VECTOR_SIZE = 384;

function buildEmbeddingText(profile) {
  const parts = [];
  if (profile.name) parts.push(profile.name);
  if (profile.title) parts.push(profile.title);
  if (profile.skills && profile.skills.length > 0) parts.push(`Skills: ${profile.skills.join(", ")}`);
  if (profile.experience_level) parts.push(`${profile.experience_level} experience`);
  if (profile.work_preference) parts.push(profile.work_preference);
  if (profile.country) parts.push(profile.country);
  if (profile.company) parts.push(`at ${profile.company}`);
  if (profile.education) parts.push(profile.education);
  if (profile.bio) parts.push(profile.bio);
  return parts.join(" | ");
}

async function sync() {
  try {
    await qdrant.getCollection(COLLECTION_NAME);
  } catch {
    console.log("Creating Qdrant collection...");
    await qdrant.createCollection(COLLECTION_NAME, {
      vectors: {
        size: VECTOR_SIZE,
        distance: "Cosine",
      },
    });
  }

  const querySnapshot = await getDocs(collection(db, "candidates"));
  console.log(`Syncing ${querySnapshot.size} candidates to Qdrant...`);

  const points = [];
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    if (!data.name || !data.title) return; // Skip invalid records

    const qdrantId = uuidv5(doc.id, NAMESPACE);
    const embeddingText = buildEmbeddingText(data);

    points.push({
      id: qdrantId,
      vector: {
        text: embeddingText,
        model: EMBEDDING_MODEL,
      },
      payload: {
        firestoreDocId: doc.id,
        name: data.name,
        title: data.title,
        skills: data.skills || [],
        experience_level: data.experience_level || "",
        work_preference: data.work_preference || "",
        country: data.country || "",
        company: data.company || "",
        initials: data.initials || data.name.substring(0, 2).toUpperCase(),
      },
    });
  });

  if (points.length > 0) {
    console.log(`Upserting ${points.length} points...`);
    await qdrant.upsert(COLLECTION_NAME, { points });
    console.log("Sync complete!");
  } else {
    console.log("No valid candidates to sync.");
  }
}

sync().then(() => process.exit(0)).catch(e => console.error(e));

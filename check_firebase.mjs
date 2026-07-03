import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

// We'll hardcode the config just to be safe, from .env.local
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

async function check() {
  const querySnapshot = await getDocs(collection(db, "candidates"));
  console.log(`Found ${querySnapshot.size} candidates in Firestore.`);
  querySnapshot.forEach((doc) => {
    console.log(`\nDocument ID: ${doc.id}`);
    const data = doc.data();
    console.log(`Name: ${data.name}`);
    console.log(`Title: ${data.title}`);
    console.log(`Skills: ${data.skills?.join(", ")}`);
    console.log(`Experience: ${data.experience_level}`);
  });
}

check().then(() => process.exit(0)).catch(e => console.error(e));

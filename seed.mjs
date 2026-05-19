import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, doc, setDoc } from 'firebase/firestore';

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

const candidates = [
  { id: "1", name: 'Maya Chen', title: 'Staff Software Engineer', company: 'Stripe', location: 'San Francisco, CA', skills: ['Go', 'Distributed Systems', 'Kubernetes', 'gRPC'], match_score: 94, interest_score: 87, initials: 'MC', experience: '8 years' },
  { id: "2", name: 'Arjun Patel', title: 'Senior Backend Engineer', company: 'Confluent', location: 'Remote (US)', skills: ['Java', 'Kafka', 'AWS', 'Microservices'], match_score: 91, interest_score: 72, initials: 'AP', experience: '6 years' },
  { id: "3", name: 'Sarah Kim', title: 'Principal Engineer', company: 'Datadog', location: 'New York, NY', skills: ['Python', 'Observability', 'Terraform', 'CI/CD'], match_score: 88, interest_score: 91, initials: 'SK', experience: '10 years' },
  { id: "4", name: 'Liam O\'Brien', title: 'Full-Stack Engineer', company: 'Vercel', location: 'Dublin, Ireland', skills: ['TypeScript', 'React', 'Node.js', 'Next.js'], match_score: 85, interest_score: 68, initials: 'LO', experience: '5 years' },
  { id: "5", name: 'Fatima Al-Rashid', title: 'ML Infrastructure Engineer', company: 'DeepMind', location: 'London, UK', skills: ['Python', 'TensorFlow', 'CUDA', 'MLOps'], match_score: 82, interest_score: 94, initials: 'FA', experience: '7 years' },
  { id: "6", name: 'James Rodriguez', title: 'DevOps Lead', company: 'HashiCorp', location: 'Austin, TX', skills: ['Terraform', 'Docker', 'AWS', 'Go'], match_score: 79, interest_score: 81, initials: 'JR', experience: '9 years' },
  { id: "7", name: 'Yuki Tanaka', title: 'Systems Architect', company: 'Sony', location: 'Tokyo, Japan', skills: ['C++', 'Rust', 'System Design', 'Performance'], match_score: 76, interest_score: 65, initials: 'YT', experience: '12 years' },
  { id: "8", name: 'Priya Sharma', title: 'Cloud Engineer', company: 'Google Cloud', location: 'Bangalore, India', skills: ['GCP', 'Kubernetes', 'Python', 'BigQuery'], match_score: 73, interest_score: 88, initials: 'PS', experience: '4 years' }
];

const chats = [
  { candidate_id: "1", status: 'Awaiting Review', summary: 'Strong interest. Expected base $220k. Available in 3 weeks.' },
  { candidate_id: "3", status: 'Interviewing', summary: 'Scheduled for technical screen on Thursday. Mentioned competing offer.' },
  { candidate_id: "4", status: 'Declined', summary: 'Not looking to move right now. Happy with current project.' },
  { candidate_id: "6", status: 'Offered', summary: 'Offer extended. Waiting for response.' }
];

async function seed() {
    console.log("Starting seed...");
    for (const c of candidates) {
        await setDoc(doc(db, "candidates", c.id), c);
    }
    console.log("Seeded candidates");
    
    for (const c of chats) {
        await addDoc(collection(db, "chats"), c);
    }
    console.log("Seeded chats");
    
    console.log("Seeding complete!");
    process.exit(0);
}

seed().catch(console.error);

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { auth, db } from "@/utils/firebase/client";
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { CountrySelect } from "./country-select";
import { SkillTagInput } from "./skill-tag-input";

const EXPERIENCE_LEVELS = [
  "Student / Fresher",
  "1–2 years",
  "3–5 years",
  "5–10 years",
  "10+ years",
];

const WORK_PREFERENCES = ["Remote", "On-site", "Hybrid", "Open to all"];
const EMPLOYMENT_TYPES = ["Full-time", "Part-time", "Contract", "Internship"];
const AVAILABILITY_OPTIONS = ["Immediately", "In 2 weeks", "In 1 month", "Open to offers"];

export default function CandidateRegisterPage() {
  // Step 1 fields
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Step 2 fields
  const [profession, setProfession] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [bio, setBio] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [workPreference, setWorkPreference] = useState("");
  const [country, setCountry] = useState("");
  const [company, setCompany] = useState("");
  const [education, setEducation] = useState("");

  // Step 3 fields
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");
  const [languages, setLanguages] = useState<string[]>([]);
  const [employmentType, setEmploymentType] = useState<string[]>([]);
  const [availability, setAvailability] = useState("");
  const [relocation, setRelocation] = useState("No");

  // UI state
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [oauthUser, setOauthUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleStep1Continue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !username || !email || !password) {
      setError("Please fill in all fields");
      return;
    }
    setStep(2);
  };

  const handleStep2Continue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!profession || skills.length === 0 || !experienceLevel || !workPreference || !country) {
      setError("Please fill in all required fields and add at least one skill");
      return;
    }
    setStep(3);
  };

  const toggleEmploymentType = (type: string) => {
    setEmploymentType((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleStep3Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setLoading(true);
    setError("");

    try {
      let userId: string;

      if (oauthUser) {
        // OAuth user — already authenticated, just need to create profile
        userId = oauthUser.uid;
      } else {
        // Email/password user — create auth account first
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        userId = userCredential.user.uid;
      }

      const initials = name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .substring(0, 2)
        .toUpperCase() || "CN";

      const candidateData = {
        auth_user_id: userId,
        name,
        username,
        title: profession,
        skills,
        bio: bio || "",
        experience_level: experienceLevel,
        work_preference: workPreference,
        country,
        company: company || "",
        education: education || "",
        linkedin: linkedin || "",
        github: github || "",
        languages: languages || [],
        employment_type: employmentType || [],
        availability: availability || "",
        relocation: relocation || "No",
        initials,
        created_at: serverTimestamp(),
      };

      // Create candidate profile in Firestore
      const docRef = await addDoc(collection(db, "candidates"), candidateData);

      // Upsert candidate into Qdrant for vector search
      try {
        await fetch("/api/candidates/upsert", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firestoreDocId: docRef.id,
            ...candidateData,
          }),
        });
      } catch (qdrantError) {
        // Non-blocking — registration succeeds even if Qdrant is down
        console.error("Qdrant upsert failed (non-blocking):", qdrantError);
      }

      router.push("/candidate");
    } catch (err: any) {
      setError(err.message || "Failed to register");
      setLoading(false);
    }
  };

  const handleOAuth = async (providerName: "google" | "github") => {
    try {
      const provider = providerName === "google" ? new GoogleAuthProvider() : new GithubAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Pre-fill name from OAuth profile if available
      if (user.displayName) setName(user.displayName);
      if (user.email) setEmail(user.email);

      // Store the OAuth user and go to Step 2 to collect profile details
      setOauthUser(user);
      setStep(2);
    } catch (err: any) {
      setError(err.message || "Failed to sign in with provider");
    }
  };

  return (
    <div className="bg-[#f9f9f9] text-[#1b1b1b] font-[Inter] text-base antialiased h-screen overflow-hidden flex">
      {/* Floating Error Bar */}
      {error && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 bg-red-50 border border-red-200 text-red-600 pl-5 pr-3 py-2.5 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.08)] text-sm font-[Inter] flex items-center gap-3 animate-in slide-in-from-top-4 fade-in duration-300">
          <span className="material-symbols-outlined text-[18px]">error</span>
          <span className="mr-2">{error}</span>
          <button 
            onClick={() => setError("")}
            className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-red-100 transition-colors cursor-pointer text-red-500"
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      )}

      {/* Left Column: Video Container */}
      <div className="hidden md:block md:w-1/2 p-3 pr-0">
        <div className="w-full h-full relative overflow-hidden rounded-2xl">
          <video
            autoPlay
            className="w-full h-full object-cover absolute inset-0"
            loop
            muted
            playsInline
          >
            <source
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260419_065931_e3ca7b53-d32e-4ad5-81de-dc9d6fcfda6d.mp4"
              type="video/mp4"
            />
          </video>
          <div className="absolute inset-0 bg-black/10 mix-blend-overlay" />
        </div>
      </div>

      {/* Right Column: Registration Form */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 overflow-y-auto relative">
        <div className="w-full max-w-md flex flex-col gap-4 py-8">
          {/* Header */}
          <div className="mb-2">
            <div className="flex items-center justify-between mb-2">
              <h1
                className="italic text-black"
                style={{
                  fontFamily: "'Instrument Serif'",
                  fontSize: "36px",
                  lineHeight: "1.2",
                }}
              >
                {step === 1 ? "Welcome candidate" : step === 2 ? "Build your profile" : "Just a few more details"}
              </h1>
              <span className="px-2.5 py-0.5 bg-[#eef2ff] text-[#6366f1] rounded-full font-[Inter] text-[11px] font-semibold whitespace-nowrap ml-3">
                Step {step} of 3
              </span>
            </div>
            <p className="font-[Inter] text-sm text-[#4c4546] mt-1">
              {step === 1
                ? "Begin your journey with Yntern."
                : step === 2
                ? "Tell us about your skills so recruiters can find you."
                : "Help recruiters understand your preferences and availability."}
            </p>
          </div>

          {/* Step 1: Account Basics */}
          {step === 1 && (
            <>
              <form className="flex flex-col gap-5 w-full" onSubmit={handleStep1Continue}>
                <div className="flex flex-row gap-5 w-full">
                  <div className="flex flex-col gap-2 flex-1">
                    <label
                      className="font-[Inter] text-[12px] font-semibold tracking-[0.05em] text-[#4c4546] uppercase"
                      htmlFor="name"
                    >
                      Name
                    </label>
                    <input
                      className="w-full bg-transparent border-0 border-b border-[#cfc4c5] px-0 py-1.5 font-[Inter] text-sm text-[#1b1b1b] placeholder:text-[#7e7576] focus:ring-0 focus:border-black transition-colors outline-none"
                      id="name"
                      name="name"
                      placeholder="e.g. Pavan Kumar"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-2 flex-1">
                    <label
                      className="font-[Inter] text-[12px] font-semibold tracking-[0.05em] text-[#4c4546] uppercase"
                      htmlFor="username"
                    >
                      Username
                    </label>
                    <input
                      className="w-full bg-transparent border-0 border-b border-[#cfc4c5] px-0 py-1.5 font-[Inter] text-sm text-[#1b1b1b] placeholder:text-[#7e7576] focus:ring-0 focus:border-black transition-colors outline-none"
                      id="username"
                      name="username"
                      placeholder="e.g. pavankumar"
                      type="text"
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    className="font-[Inter] text-[12px] font-semibold tracking-[0.05em] text-[#4c4546] uppercase"
                    htmlFor="email"
                  >
                    Email Address
                  </label>
                  <input
                    className="w-full bg-transparent border-0 border-b border-[#cfc4c5] px-0 py-1.5 font-[Inter] text-sm text-[#1b1b1b] placeholder:text-[#7e7576] focus:ring-0 focus:border-black transition-colors outline-none"
                    id="email"
                    name="email"
                    placeholder="candidate@yntern.com"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    className="font-[Inter] text-[12px] font-semibold tracking-[0.05em] text-[#4c4546] uppercase"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    className="w-full bg-transparent border-0 border-b border-[#cfc4c5] px-0 py-1.5 font-[Inter] text-sm text-[#1b1b1b] placeholder:text-[#7e7576] focus:ring-0 focus:border-black transition-colors outline-none"
                    id="password"
                    name="password"
                    placeholder="••••••••"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button
                  className="w-full bg-black text-white font-[Inter] text-[11px] font-semibold tracking-[0.05em] rounded-full py-3 mt-3 hover:opacity-80 transition-opacity duration-300 flex items-center justify-center gap-2 cursor-pointer"
                  type="submit"
                >
                  Continue
                  <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>
                    arrow_forward
                  </span>
                </button>
              </form>

              {/* Divider */}
              <div className="flex items-center gap-4 w-full py-2">
                <div className="h-px bg-[#cfc4c5] flex-grow" />
                <span className="font-[Inter] text-[12px] font-semibold text-[#4c4546] uppercase">
                  Or
                </span>
                <div className="h-px bg-[#cfc4c5] flex-grow" />
              </div>

              {/* Social Logins */}
              <div className="flex flex-col gap-3 w-full">
                <button
                  className="w-full bg-transparent border border-[#cfc4c5] text-[#1b1b1b] font-[Inter] text-[11px] font-semibold rounded-full py-2.5 hover:border-black hover:bg-[#eeeeee] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                  type="button"
                  onClick={() => handleOAuth("google")}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                  Register with Google
                </button>
                <button
                  className="w-full bg-transparent border border-[#cfc4c5] text-[#1b1b1b] font-[Inter] text-[11px] font-semibold rounded-full py-2.5 hover:border-black hover:bg-[#eeeeee] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                  type="button"
                  onClick={() => handleOAuth("github")}
                >
                  <svg aria-hidden="true" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      clipRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      fillRule="evenodd"
                    />
                  </svg>
                  Register with GitHub
                </button>
              </div>
              <div className="mt-2 text-center">
                <p className="font-[Inter] text-sm text-[#4c4546]">
                  Already a member?{" "}
                  <Link
                    className="text-black hover:underline underline-offset-4 border-b border-transparent hover:border-black transition-all"
                    href="/login"
                  >
                    Login
                  </Link>
                </p>
              </div>
            </>
          )}

          {/* Step 2: Work & Skills */}
          {step === 2 && (
            <form className="flex flex-col gap-5 w-full" onSubmit={handleStep2Continue}>
              <div className="flex flex-row gap-5 w-full">
                <div className="flex flex-col gap-2 flex-1">
                  <label
                    className="font-[Inter] text-[12px] font-semibold tracking-[0.05em] text-[#4c4546] uppercase"
                    htmlFor="profession"
                  >
                    Profession *
                  </label>
                  <input
                    className="w-full bg-transparent border-0 border-b border-[#cfc4c5] px-0 py-1.5 font-[Inter] text-sm text-[#1b1b1b] placeholder:text-[#7e7576] focus:ring-0 focus:border-black transition-colors outline-none"
                    id="profession"
                    name="profession"
                    placeholder="e.g. Full-Stack Developer"
                    type="text"
                    required
                    value={profession}
                    onChange={(e) => setProfession(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <label
                    className="font-[Inter] text-[12px] font-semibold tracking-[0.05em] text-[#4c4546] uppercase"
                    htmlFor="experience"
                  >
                    Experience *
                  </label>
                  <select
                    className="w-full bg-transparent border-0 border-b border-[#cfc4c5] px-0 py-1.5 font-[Inter] text-sm text-[#1b1b1b] focus:ring-0 focus:border-black transition-colors outline-none cursor-pointer"
                    id="experience"
                    required
                    value={experienceLevel}
                    onChange={(e) => setExperienceLevel(e.target.value)}
                  >
                    <option disabled value="">Select level</option>
                    {EXPERIENCE_LEVELS.map((level) => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label
                  className="font-[Inter] text-[12px] font-semibold tracking-[0.05em] text-[#4c4546] uppercase"
                >
                  Skills *
                </label>
                <SkillTagInput skills={skills} onChange={setSkills} />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  className="font-[Inter] text-[12px] font-semibold tracking-[0.05em] text-[#4c4546] uppercase"
                  htmlFor="bio"
                >
                  Bio / Summary <span className="normal-case font-normal">(optional)</span>
                </label>
                <textarea
                  className="w-full bg-transparent border-0 border-b border-[#cfc4c5] px-0 py-1.5 font-[Inter] text-sm text-[#1b1b1b] placeholder:text-[#7e7576] focus:ring-0 focus:border-black transition-colors outline-none resize-none"
                  id="bio"
                  name="bio"
                  placeholder="Tell recruiters about yourself in a few sentences..."
                  rows={2}
                  maxLength={300}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
                {bio.length > 0 && (
                  <p className="font-[Inter] text-[10px] text-[#848484] text-right">
                    {bio.length}/300
                  </p>
                )}
              </div>

              <div className="flex flex-row gap-5 w-full">
                <div className="flex flex-col gap-2 flex-1">
                  <label
                    className="font-[Inter] text-[12px] font-semibold tracking-[0.05em] text-[#4c4546] uppercase"
                    htmlFor="work_preference"
                  >
                    Work Preference *
                  </label>
                  <select
                    className="w-full bg-transparent border-0 border-b border-[#cfc4c5] px-0 py-1.5 font-[Inter] text-sm text-[#1b1b1b] focus:ring-0 focus:border-black transition-colors outline-none cursor-pointer"
                    id="work_preference"
                    required
                    value={workPreference}
                    onChange={(e) => setWorkPreference(e.target.value)}
                  >
                    <option disabled value="">Select preference</option>
                    {WORK_PREFERENCES.map((pref) => (
                      <option key={pref} value={pref}>{pref}</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <label
                    className="font-[Inter] text-[12px] font-semibold tracking-[0.05em] text-[#4c4546] uppercase"
                    htmlFor="country"
                  >
                    Country *
                  </label>
                  <CountrySelect value={country} onChange={setCountry} />
                </div>
              </div>

              <div className="flex flex-row gap-5 w-full">
                <div className="flex flex-col gap-2 flex-1">
                  <label
                    className="font-[Inter] text-[12px] font-semibold tracking-[0.05em] text-[#4c4546] uppercase"
                    htmlFor="company"
                  >
                    Current Company <span className="normal-case font-normal">(optional)</span>
                  </label>
                  <input
                    className="w-full bg-transparent border-0 border-b border-[#cfc4c5] px-0 py-1.5 font-[Inter] text-sm text-[#1b1b1b] placeholder:text-[#7e7576] focus:ring-0 focus:border-black transition-colors outline-none"
                    id="company"
                    name="company"
                    placeholder="e.g. Google, Freelance"
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <label
                    className="font-[Inter] text-[12px] font-semibold tracking-[0.05em] text-[#4c4546] uppercase"
                    htmlFor="education"
                  >
                    Education <span className="normal-case font-normal">(optional)</span>
                  </label>
                  <input
                    className="w-full bg-transparent border-0 border-b border-[#cfc4c5] px-0 py-1.5 font-[Inter] text-sm text-[#1b1b1b] placeholder:text-[#7e7576] focus:ring-0 focus:border-black transition-colors outline-none"
                    id="education"
                    name="education"
                    placeholder="e.g. B.Tech in CS"
                    type="text"
                    value={education}
                    onChange={(e) => setEducation(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-3">
                {!oauthUser && (
                  <button
                    className="flex-1 bg-transparent border border-[#cfc4c5] text-[#4c4546] font-[Inter] text-[11px] font-semibold tracking-[0.05em] rounded-full py-3 hover:border-black hover:text-black transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                    type="button"
                    onClick={() => setStep(1)}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>
                      arrow_back
                    </span>
                    Back
                  </button>
                )}
                <button
                  className="flex-1 bg-black text-white font-[Inter] text-[11px] font-semibold tracking-[0.05em] rounded-full py-3 hover:opacity-80 transition-opacity duration-300 flex items-center justify-center gap-2 cursor-pointer"
                  type="submit"
                >
                  Continue
                  <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>
                    arrow_forward
                  </span>
                </button>
              </div>
            </form>
          )}

          {/* Step 3: Links & Extras */}
          {step === 3 && (
            <form className="flex flex-col gap-5 w-full" onSubmit={handleStep3Submit}>
              <div className="flex flex-row gap-5 w-full">
                <div className="flex flex-col gap-2 flex-1">
                  <label
                    className="font-[Inter] text-[12px] font-semibold tracking-[0.05em] text-[#4c4546] uppercase"
                    htmlFor="linkedin"
                  >
                    LinkedIn <span className="normal-case font-normal">(optional)</span>
                  </label>
                  <input
                    className="w-full bg-transparent border-0 border-b border-[#cfc4c5] px-0 py-1.5 font-[Inter] text-sm text-[#1b1b1b] placeholder:text-[#7e7576] focus:ring-0 focus:border-black transition-colors outline-none"
                    id="linkedin"
                    name="linkedin"
                    placeholder="linkedin.com/in/username"
                    type="text"
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <label
                    className="font-[Inter] text-[12px] font-semibold tracking-[0.05em] text-[#4c4546] uppercase"
                    htmlFor="github"
                  >
                    GitHub/Portfolio <span className="normal-case font-normal">(optional)</span>
                  </label>
                  <input
                    className="w-full bg-transparent border-0 border-b border-[#cfc4c5] px-0 py-1.5 font-[Inter] text-sm text-[#1b1b1b] placeholder:text-[#7e7576] focus:ring-0 focus:border-black transition-colors outline-none"
                    id="github"
                    name="github"
                    placeholder="github.com/username"
                    type="text"
                    value={github}
                    onChange={(e) => setGithub(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label
                  className="font-[Inter] text-[12px] font-semibold tracking-[0.05em] text-[#4c4546] uppercase"
                >
                  Languages Spoken <span className="normal-case font-normal">(optional)</span>
                </label>
                <SkillTagInput skills={languages} onChange={setLanguages} maxSkills={5} />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  className="font-[Inter] text-[12px] font-semibold tracking-[0.05em] text-[#4c4546] uppercase"
                >
                  Employment Type *
                </label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {EMPLOYMENT_TYPES.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => toggleEmploymentType(type)}
                      className={`px-3 py-1.5 rounded-full font-[Inter] text-[12px] font-medium border transition-colors cursor-pointer ${
                        employmentType.includes(type)
                          ? "bg-[#eef2ff] border-[#6366f1] text-[#4338ca]"
                          : "bg-white border-[#cfc4c5] text-[#4c4546] hover:border-[#6366f1]"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-row gap-5 w-full">
                <div className="flex flex-col gap-2 flex-1">
                  <label
                    className="font-[Inter] text-[12px] font-semibold tracking-[0.05em] text-[#4c4546] uppercase"
                    htmlFor="availability"
                  >
                    Availability *
                  </label>
                  <select
                    className="w-full bg-transparent border-0 border-b border-[#cfc4c5] px-0 py-1.5 font-[Inter] text-sm text-[#1b1b1b] focus:ring-0 focus:border-black transition-colors outline-none cursor-pointer"
                    id="availability"
                    required
                    value={availability}
                    onChange={(e) => setAvailability(e.target.value)}
                  >
                    <option disabled value="">Select availability</option>
                    {AVAILABILITY_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <label
                    className="font-[Inter] text-[12px] font-semibold tracking-[0.05em] text-[#4c4546] uppercase"
                    htmlFor="relocation"
                  >
                    Willing to Relocate?
                  </label>
                  <select
                    className="w-full bg-transparent border-0 border-b border-[#cfc4c5] px-0 py-1.5 font-[Inter] text-sm text-[#1b1b1b] focus:ring-0 focus:border-black transition-colors outline-none cursor-pointer"
                    id="relocation"
                    value={relocation}
                    onChange={(e) => setRelocation(e.target.value)}
                  >
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 mt-3">
                <button
                  className="flex-1 bg-transparent border border-[#cfc4c5] text-[#4c4546] font-[Inter] text-[11px] font-semibold tracking-[0.05em] rounded-full py-3 hover:border-black hover:text-black transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                  type="button"
                  onClick={() => setStep(2)}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>
                    arrow_back
                  </span>
                  Back
                </button>
                <button
                  className="flex-1 bg-black text-white font-[Inter] text-[11px] font-semibold tracking-[0.05em] rounded-full py-3 hover:opacity-80 transition-opacity duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  type="submit"
                  disabled={loading || employmentType.length === 0 || !availability}
                >
                  {loading ? "Creating Account..." : "Create Account"}
                  {!loading && (
                    <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>
                      check
                    </span>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

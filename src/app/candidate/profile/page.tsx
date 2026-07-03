"use client";

import { useAuth } from "@/lib/hooks/useAuth";
import { db } from "@/utils/firebase/client";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import Link from "next/link";

type CandidateProfile = {
  docId: string;
  name: string;
  username: string;
  title: string;
  skills: string[];
  bio: string;
  experience_level: string;
  work_preference: string;
  country: string;
  company: string;
  education: string;
  initials: string;
  linkedin?: string;
  github?: string;
  languages?: string[];
  employment_type?: string[];
  availability?: string;
  relocation?: string;
};

export default function CandidateProfilePage() {
  const { user, loading: authLoading } = useAuth();
  const [profile, setProfile] = useState<CandidateProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      if (!user) return;

      try {
        const q = query(
          collection(db, "candidates"),
          where("auth_user_id", "==", user.uid)
        );
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          const docData = snapshot.docs[0];
          const d = docData.data();
          setProfile({
            docId: docData.id,
            name: d.name || user.displayName || "Candidate",
            username: d.username || "",
            title: d.title || "",
            skills: d.skills || [],
            bio: d.bio || "",
            experience_level: d.experience_level || "",
            work_preference: d.work_preference || "",
            country: d.country || "",
            company: d.company || "",
            education: d.education || "",
            linkedin: d.linkedin || "",
            github: d.github || "",
            languages: d.languages || [],
            employment_type: d.employment_type || [],
            availability: d.availability || "",
            relocation: d.relocation || "No",
            initials:
              d.initials ||
              (d.name || "C")
                .split(" ")
                .map((n: string) => n[0])
                .join("")
                .substring(0, 2)
                .toUpperCase(),
          });
        }
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      }
      setLoading(false);
    }

    if (!authLoading) {
      fetchProfile();
    }
  }, [user, authLoading]);

  if (authLoading || loading) {
    return (
      <div className="max-w-[1440px] mx-auto w-full px-6 lg:px-12 flex-1 flex flex-col gap-10 pt-6 pb-12 animate-pulse">
        <div className="h-32 bg-[#e5e5e5] rounded-2xl w-full max-w-2xl mb-8" />
        <div className="h-64 bg-[#e5e5e5] rounded-2xl w-full" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center h-[calc(100vh-56px)] bg-[#fafafa]">
        <h2 className="text-xl font-semibold mb-4">Please log in to view your profile</h2>
        <Link href="/login" className="px-6 py-2 bg-black text-white rounded-full">
          Go to Login
        </Link>
      </div>
    );
  }

  const displayName = profile?.name || user.displayName || "Candidate";
  const initials =
    profile?.initials ||
    displayName
      .split(" ")
      .map((n: string) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase() || "CN";

  const email = user.email || "No email provided";

  return (
    <div className="max-w-[1440px] mx-auto w-full px-6 lg:px-12 flex-1 flex flex-col gap-10 pt-6 pb-12">
      {/* Profile Header */}
      <section className="flex flex-col md:flex-row items-start gap-6 animate-fade-rise">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center text-white text-[28px] font-semibold shrink-0 shadow-[0_4px_20px_rgba(99,102,241,0.25)]">
          {initials}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1
              className="text-black"
              style={{
                fontFamily: "'Instrument Serif'",
                fontSize: "36px",
                lineHeight: "1.2",
              }}
            >
              {displayName}
            </h1>
            <span className="px-3 py-1 bg-[#ecfdf5] text-[#059669] rounded-full font-[Inter] text-[11px] font-semibold uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
              {profile?.availability === "Immediately" ? "Immediately Available" : "Open to Work"}
            </span>
          </div>
          <p className="font-[Inter] text-[14px] text-[#4c4546] mt-1">
            {profile?.title || "Candidate"} · Yntern
          </p>
          <div className="flex flex-wrap items-center gap-4 mt-3">
            <span className="flex items-center gap-1.5 font-[Inter] text-[12px] text-[#848484]">
              <span className="material-symbols-outlined text-[16px]">
                location_on
              </span>
              {profile?.country || "Remote"} {profile?.relocation === "Yes" && "(Willing to relocate)"}
            </span>
            {profile?.work_preference && (
              <span className="flex items-center gap-1.5 font-[Inter] text-[12px] text-[#848484]">
                <span className="material-symbols-outlined text-[16px]">
                  work
                </span>
                {profile.work_preference}
              </span>
            )}
            {profile?.experience_level && (
              <span className="flex items-center gap-1.5 font-[Inter] text-[12px] text-[#848484]">
                <span className="material-symbols-outlined text-[16px]">
                  schedule
                </span>
                {profile.experience_level}
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          {profile?.linkedin && (
            <a
              href={`https://${profile.linkedin.replace(/^https?:\/\//, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 border border-[#cfc4c5] rounded-full text-[#4c4546] hover:text-[#0077b5] hover:border-[#0077b5] transition-all"
              title="LinkedIn"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          )}
          {profile?.github && (
            <a
              href={`https://${profile.github.replace(/^https?:\/\//, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 border border-[#cfc4c5] rounded-full text-[#4c4546] hover:text-black hover:border-black transition-all"
              title="GitHub / Portfolio"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
            </a>
          )}
          <button
            className="flex items-center justify-center gap-2 px-5 py-2 h-10 border border-[#cfc4c5] rounded-full font-[Inter] text-[12px] font-semibold uppercase tracking-widest text-[#4c4546] hover:border-black hover:text-black transition-all cursor-pointer w-full md:w-auto"
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">edit</span>
            Edit Profile
          </button>
        </div>
      </section>

      {/* About & Preferences — 2 col */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-rise-delay">
        {/* About */}
        <section className="bg-white border border-[#cfc4c5] rounded-xl p-6 h-full flex flex-col">
          <h3 className="font-[Inter] text-[12px] font-semibold tracking-[0.08em] text-[#4c4546] uppercase mb-3">
            About
          </h3>
          <p className="font-[Inter] text-[14px] text-[#1b1b1b] leading-relaxed flex-1">
            {profile?.bio || "No bio added yet. Edit your profile to tell recruiters about yourself."}
          </p>
        </section>

        {/* Preferences */}
        <section className="bg-white border border-[#cfc4c5] rounded-xl p-6 flex flex-col gap-4">
          <h3 className="font-[Inter] text-[12px] font-semibold tracking-[0.08em] text-[#4c4546] uppercase">
            Preferences
          </h3>
          <div className="grid grid-cols-2 gap-y-4">
            <div>
              <p className="font-[Inter] text-[11px] text-[#848484] uppercase tracking-wide mb-1">
                Availability
              </p>
              <p className="font-[Inter] text-[13px] font-medium text-black">
                {profile?.availability || "Not specified"}
              </p>
            </div>
            <div>
              <p className="font-[Inter] text-[11px] text-[#848484] uppercase tracking-wide mb-1">
                Relocation
              </p>
              <p className="font-[Inter] text-[13px] font-medium text-black">
                {profile?.relocation === "Yes" ? "Willing to relocate" : "Not willing to relocate"}
              </p>
            </div>
            <div className="col-span-2">
              <p className="font-[Inter] text-[11px] text-[#848484] uppercase tracking-wide mb-2">
                Preferred Roles
              </p>
              {profile?.employment_type && profile.employment_type.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {profile.employment_type.map((type) => (
                    <span
                      key={type}
                      className="px-2.5 py-1 bg-[#f5f3ff] text-[#6366f1] rounded-lg font-[Inter] text-[12px] font-medium"
                    >
                      {type}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="font-[Inter] text-[13px] text-black">Not specified</p>
              )}
            </div>
          </div>
        </section>
      </div>

      {/* Skills & Languages — 2 col */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-rise-delay">
        {/* Skills */}
        <section className="bg-white border border-[#cfc4c5] rounded-xl p-6 flex flex-col gap-4">
          <h3 className="font-[Inter] text-[12px] font-semibold tracking-[0.08em] text-[#4c4546] uppercase">
            Skills
          </h3>
          {profile?.skills && profile.skills.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-[#eef2ff] text-[#4338ca] rounded-full font-[Inter] text-[12px] font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full gap-2 py-4">
              <span className="material-symbols-outlined text-[24px] text-[#cfc4c5]">
                build
              </span>
              <p className="font-[Inter] text-[13px] text-[#848484]">
                No skills added yet
              </p>
            </div>
          )}
        </section>

        {/* Languages */}
        <section className="bg-white border border-[#cfc4c5] rounded-xl p-6 flex flex-col gap-4">
          <h3 className="font-[Inter] text-[12px] font-semibold tracking-[0.08em] text-[#4c4546] uppercase">
            Languages
          </h3>
          {profile?.languages && profile.languages.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {profile.languages.map((lang) => (
                <span
                  key={lang}
                  className="px-3 py-1 bg-[#f3f3f3] text-[#4c4546] rounded-full font-[Inter] text-[12px] font-medium"
                >
                  {lang}
                </span>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full gap-2 py-4">
              <span className="material-symbols-outlined text-[24px] text-[#cfc4c5]">
                language
              </span>
              <p className="font-[Inter] text-[13px] text-[#848484]">
                No languages added yet
              </p>
            </div>
          )}
        </section>
      </div>

      {/* Experience & Education */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-rise-delay-2">
        {/* Company */}
        <section className="bg-white border border-[#cfc4c5] rounded-xl p-6">
          <h3 className="font-[Inter] text-[12px] font-semibold tracking-[0.08em] text-[#4c4546] uppercase mb-3">
            Experience
          </h3>
          {profile?.company ? (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#f5f3ff] flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px] text-[#6366f1]">
                  work
                </span>
              </div>
              <div>
                <p className="font-[Inter] text-[15px] font-semibold text-black">
                  {profile.title}
                </p>
                <p className="font-[Inter] text-[13px] text-[#4c4546]">
                  {profile.company} · {profile.experience_level}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-2 py-4">
              <span className="material-symbols-outlined text-[24px] text-[#cfc4c5]">
                work_history
              </span>
              <p className="font-[Inter] text-[13px] text-[#848484]">
                No experience added yet
              </p>
            </div>
          )}
        </section>

        {/* Education */}
        <section className="bg-white border border-[#cfc4c5] rounded-xl p-6">
          <h3 className="font-[Inter] text-[12px] font-semibold tracking-[0.08em] text-[#4c4546] uppercase mb-3">
            Education
          </h3>
          {profile?.education ? (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#eef2ff] flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px] text-[#6366f1]">
                  school
                </span>
              </div>
              <p className="font-[Inter] text-[15px] font-semibold text-black">
                {profile.education}
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-2 py-4">
              <span className="material-symbols-outlined text-[24px] text-[#cfc4c5]">
                school
              </span>
              <p className="font-[Inter] text-[13px] text-[#848484]">
                No education added yet
              </p>
            </div>
          )}
        </section>
      </div>

      {/* Contact info (Email) now at the bottom or we can just skip it, but let's keep it */}
      <section className="bg-white border border-[#cfc4c5] rounded-xl p-6 flex flex-col gap-4 w-full md:max-w-md animate-fade-rise-delay-2">
        <h3 className="font-[Inter] text-[12px] font-semibold tracking-[0.08em] text-[#4c4546] uppercase">
          Contact
        </h3>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#fff1f2] flex items-center justify-center">
            <span className="material-symbols-outlined text-[20px] text-[#e11d48]">
              mail
            </span>
          </div>
          <div>
            <p className="font-[Inter] text-[11px] text-[#848484] uppercase tracking-wide">
              Email
            </p>
            <p className="font-[Inter] text-[14px] font-medium text-black">
              {email}
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}

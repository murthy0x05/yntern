"use client";

import { useAuth } from "@/lib/hooks/useAuth";
import { db } from "@/utils/firebase/client";
import { collection, query, where, getDocs, doc, updateDoc } from "firebase/firestore";
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
      <section className="flex items-start gap-6 animate-fade-rise">
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
              Open to Work
            </span>
          </div>
          <p className="font-[Inter] text-[14px] text-[#4c4546] mt-1">
            {profile?.title || "Candidate"} · Yntern
          </p>
          <div className="flex items-center gap-4 mt-3">
            <span className="flex items-center gap-1.5 font-[Inter] text-[12px] text-[#848484]">
              <span className="material-symbols-outlined text-[16px]">
                location_on
              </span>
              {profile?.country || "Remote"}
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
        <button
          className="flex items-center gap-2 px-5 py-2 border border-[#cfc4c5] rounded-full font-[Inter] text-[12px] font-semibold uppercase tracking-widest text-[#4c4546] hover:border-black hover:text-black transition-all cursor-pointer"
          type="button"
        >
          <span className="material-symbols-outlined text-[16px]">edit</span>
          Edit Profile
        </button>
      </section>

      {/* About */}
      <section className="bg-white border border-[#cfc4c5] rounded-xl p-6 animate-fade-rise-delay">
        <h3 className="font-[Inter] text-[12px] font-semibold tracking-[0.08em] text-[#4c4546] uppercase mb-3">
          About
        </h3>
        <p className="font-[Inter] text-[14px] text-[#1b1b1b] leading-relaxed">
          {profile?.bio || "No bio added yet. Edit your profile to tell recruiters about yourself."}
        </p>
      </section>

      {/* Contact & Skills — 2 col */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-rise-delay">
        {/* Contact Info */}
        <section className="bg-white border border-[#cfc4c5] rounded-xl p-6 flex flex-col gap-4">
          <h3 className="font-[Inter] text-[12px] font-semibold tracking-[0.08em] text-[#4c4546] uppercase">
            Contact
          </h3>
          <div className="flex flex-col gap-3">
            {[
              {
                icon: "mail",
                label: "Email",
                value: email,
                color: "#6366f1",
              },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: item.color + "15" }}
                >
                  <span
                    className="material-symbols-outlined text-[18px]"
                    style={{ color: item.color }}
                  >
                    {item.icon}
                  </span>
                </div>
                <div>
                  <p className="font-[Inter] text-[11px] text-[#848484] uppercase tracking-wide">
                    {item.label}
                  </p>
                  <p className="font-[Inter] text-[13px] text-black">
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

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
    </div>
  );
}

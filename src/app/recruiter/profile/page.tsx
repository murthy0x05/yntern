"use client";

import { useState } from "react";

const RECRUITER = {
  name: "Sarah Jenkins",
  initials: "SJ",
  title: "Senior Technical Recruiter",
  company: "Yntern Inc.",
  email: "sarah.jenkins@yntern.com",
  phone: "+1 (415) 928-3047",
  location: "San Francisco, CA",
  timezone: "Pacific Time (PT)",
  linkedin: "linkedin.com/in/sarahjenkins",
  bio: "Passionate about connecting exceptional talent with transformative opportunities. Specializing in engineering and product leadership hiring across startups and scale-ups. 8+ years of full-cycle recruiting experience.",
  joinedDate: "January 2024",
  specializations: [
    "Engineering",
    "Product",
    "Design",
    "Data Science",
    "DevOps",
  ],
  industries: [
    "SaaS",
    "FinTech",
    "AI/ML",
    "Developer Tools",
    "Cloud Infrastructure",
  ],
};

const HIRING_STATS = [
  {
    label: "Total Hires",
    value: 127,
    icon: "person_check",
    color: "#10b981",
    bg: "#ecfdf5",
  },
  {
    label: "Active Roles",
    value: 3,
    icon: "work",
    color: "#6366f1",
    bg: "#eef2ff",
  },
  {
    label: "Avg. Time to Fill",
    value: 24,
    suffix: "d",
    icon: "schedule",
    color: "#f59e0b",
    bg: "#fffbeb",
  },
  {
    label: "Offer Accept Rate",
    value: 92,
    suffix: "%",
    icon: "trending_up",
    color: "#3b82f6",
    bg: "#eff6ff",
  },
];

const RECENT_HIRES = [
  {
    name: "Alex Morgan",
    role: "Staff Engineer",
    company: "Stripe → Yntern",
    date: "Mar 2026",
    initials: "AM",
  },
  {
    name: "Priya Nair",
    role: "Product Lead",
    company: "Meta → Yntern",
    date: "Feb 2026",
    initials: "PN",
  },
  {
    name: "Kevin Liu",
    role: "Data Scientist",
    company: "Netflix → Yntern",
    date: "Jan 2026",
    initials: "KL",
  },
  {
    name: "Diana Rossi",
    role: "UX Lead",
    company: "Figma → Yntern",
    date: "Dec 2025",
    initials: "DR",
  },
];

const PREFERENCES = [
  {
    label: "Email Notifications",
    description: "Get notified when new candidates match your roles",
    enabled: true,
  },
  {
    label: "Weekly Digest",
    description: "Receive a weekly summary of candidate activity",
    enabled: true,
  },
  {
    label: "AI Auto-Outreach",
    description: "Let AI send initial messages to high-match candidates",
    enabled: false,
  },
  {
    label: "Calendar Sync",
    description: "Sync interview schedules with Google Calendar",
    enabled: true,
  },
];

function Toggle({
  enabled,
  onToggle,
}: {
  enabled: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      className={`relative w-10 h-[22px] rounded-full transition-colors duration-300 cursor-pointer ${
        enabled ? "bg-[#6366f1]" : "bg-[#cfc4c5]"
      }`}
      onClick={onToggle}
      type="button"
    >
      <div
        className={`absolute top-[3px] w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-300 ${
          enabled ? "translate-x-[22px]" : "translate-x-[3px]"
        }`}
      />
    </button>
  );
}

export default function ProfilePage() {
  const [prefs, setPrefs] = useState(PREFERENCES);
  const [activeTab, setActiveTab] = useState<"overview" | "settings">(
    "overview",
  );

  const togglePref = (index: number) => {
    setPrefs((p) =>
      p.map((item, i) =>
        i === index ? { ...item, enabled: !item.enabled } : item,
      ),
    );
  };

  return (
    <div className="max-w-[1440px] mx-auto w-full px-6 lg:px-12 flex-1 flex flex-col gap-10 pt-6 pb-12">
      {/* Profile Header */}
      <section className="flex items-start gap-6 animate-fade-rise">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center text-white text-[28px] font-semibold shrink-0 shadow-[0_4px_20px_rgba(99,102,241,0.25)]">
          {RECRUITER.initials}
        </div>
        <div className="flex-1">
          <h1
            className="text-black"
            style={{
              fontFamily: "'Instrument Serif'",
              fontSize: "36px",
              lineHeight: "1.2",
            }}
          >
            {RECRUITER.name}
          </h1>
          <p className="font-[Inter] text-[14px] text-[#4c4546] mt-1">
            {RECRUITER.title} · {RECRUITER.company}
          </p>
          <div className="flex items-center gap-4 mt-3">
            <span className="flex items-center gap-1.5 font-[Inter] text-[12px] text-[#848484]">
              <span className="material-symbols-outlined text-[16px]">
                location_on
              </span>
              {RECRUITER.location}
            </span>
            <span className="flex items-center gap-1.5 font-[Inter] text-[12px] text-[#848484]">
              <span className="material-symbols-outlined text-[16px]">
                schedule
              </span>
              {RECRUITER.timezone}
            </span>
            <span className="flex items-center gap-1.5 font-[Inter] text-[12px] text-[#848484]">
              <span className="material-symbols-outlined text-[16px]">
                calendar_today
              </span>
              Joined {RECRUITER.joinedDate}
            </span>
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

      {/* Tabs */}
      <div className="flex gap-1 border-b border-[#cfc4c5]/50 animate-fade-rise-delay">
        <button
          className={`px-5 py-2.5 font-[Inter] text-[13px] font-medium border-b-2 transition-all cursor-pointer ${
            activeTab === "overview"
              ? "border-[#6366f1] text-[#6366f1]"
              : "border-transparent text-[#4c4546] hover:text-black"
          }`}
          onClick={() => setActiveTab("overview")}
          type="button"
        >
          Overview
        </button>
        <button
          className={`px-5 py-2.5 font-[Inter] text-[13px] font-medium border-b-2 transition-all cursor-pointer ${
            activeTab === "settings"
              ? "border-[#6366f1] text-[#6366f1]"
              : "border-transparent text-[#4c4546] hover:text-black"
          }`}
          onClick={() => setActiveTab("settings")}
          type="button"
        >
          Settings
        </button>
      </div>

      {activeTab === "overview" && (
        <div className="flex flex-col gap-10 animate-fade-rise">
          {/* Bio */}
          <section className="bg-white border border-[#cfc4c5] rounded-xl p-6">
            <h3 className="font-[Inter] text-[12px] font-semibold tracking-[0.08em] text-[#4c4546] uppercase mb-3">
              About
            </h3>
            <p className="font-[Inter] text-[14px] text-[#1b1b1b] leading-relaxed">
              {RECRUITER.bio}
            </p>
          </section>

          {/* Contact & Details — 2 col */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Contact Info */}
            <section className="bg-white border border-[#cfc4c5] rounded-xl p-6 flex flex-col gap-4">
              <h3 className="font-[Inter] text-[12px] font-semibold tracking-[0.08em] text-[#4c4546] uppercase">
                Contact Information
              </h3>
              <div className="flex flex-col gap-3">
                {[
                  {
                    icon: "mail",
                    label: "Email",
                    value: RECRUITER.email,
                    color: "#6366f1",
                  },
                  {
                    icon: "phone",
                    label: "Phone",
                    value: RECRUITER.phone,
                    color: "#10b981",
                  },
                  {
                    icon: "link",
                    label: "LinkedIn",
                    value: RECRUITER.linkedin,
                    color: "#3b82f6",
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

            {/* Specializations */}
            <section className="bg-white border border-[#cfc4c5] rounded-xl p-6 flex flex-col gap-4">
              <h3 className="font-[Inter] text-[12px] font-semibold tracking-[0.08em] text-[#4c4546] uppercase">
                Specializations
              </h3>
              <div className="flex flex-wrap gap-2">
                {RECRUITER.specializations.map((s) => (
                  <span
                    key={s}
                    className="px-3.5 py-1.5 bg-[#eef2ff] border border-[#c7d2fe]/40 rounded-full font-[Inter] text-[12px] font-medium text-[#4338ca]"
                  >
                    {s}
                  </span>
                ))}
              </div>
              <h3 className="font-[Inter] text-[12px] font-semibold tracking-[0.08em] text-[#4c4546] uppercase mt-2">
                Industries
              </h3>
              <div className="flex flex-wrap gap-2">
                {RECRUITER.industries.map((ind) => (
                  <span
                    key={ind}
                    className="px-3.5 py-1.5 bg-[#ecfdf5] border border-[#a7f3d0]/40 rounded-full font-[Inter] text-[12px] font-medium text-[#059669]"
                  >
                    {ind}
                  </span>
                ))}
              </div>
            </section>
          </div>

          {/* Hiring Stats */}
          <section>
            <h3 className="font-[Inter] text-[12px] font-semibold tracking-[0.08em] text-[#4c4546] uppercase mb-4">
              Hiring Performance
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {HIRING_STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white border border-[#cfc4c5] rounded-xl p-5 flex flex-col gap-3 hover:border-black transition-all duration-500 group"
                >
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform"
                    style={{ backgroundColor: stat.bg }}
                  >
                    <span
                      className="material-symbols-outlined text-[20px]"
                      style={{ color: stat.color }}
                    >
                      {stat.icon}
                    </span>
                  </div>
                  <div>
                    <p
                      className="text-black font-semibold"
                      style={{ fontSize: "28px", lineHeight: "1.2" }}
                    >
                      {stat.value}
                      {stat.suffix || ""}
                    </p>
                    <p className="font-[Inter] text-[12px] font-semibold tracking-[0.05em] text-[#4c4546] uppercase mt-1">
                      {stat.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Recent Hires */}
          <section>
            <h3 className="font-[Inter] text-[12px] font-semibold tracking-[0.08em] text-[#4c4546] uppercase mb-4">
              Recent Hires
            </h3>
            <div className="bg-white border border-[#cfc4c5] rounded-xl overflow-hidden">
              {RECENT_HIRES.map((hire, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-4 px-6 py-4 hover:bg-[#fafafa] transition-colors ${
                    i < RECENT_HIRES.length - 1
                      ? "border-b border-[#cfc4c5]/20"
                      : ""
                  }`}
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center text-white text-[12px] font-semibold shrink-0">
                    {hire.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-[Inter] text-[14px] font-semibold text-black">
                      {hire.name}
                    </p>
                    <p className="font-[Inter] text-[12px] text-[#4c4546]">
                      {hire.role}
                    </p>
                  </div>
                  <p className="font-[Inter] text-[12px] text-[#848484] hidden sm:block">
                    {hire.company}
                  </p>
                  <span className="font-[Inter] text-[12px] text-[#848484] whitespace-nowrap">
                    {hire.date}
                  </span>
                  <span className="w-6 h-6 rounded-full bg-[#ecfdf5] flex items-center justify-center">
                    <span className="material-symbols-outlined text-[14px] text-[#10b981]">
                      check
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {activeTab === "settings" && (
        <div className="flex flex-col gap-8 animate-fade-rise">
          {/* Preferences */}
          <section className="bg-white border border-[#cfc4c5] rounded-xl p-6">
            <h3 className="font-[Inter] text-[12px] font-semibold tracking-[0.08em] text-[#4c4546] uppercase mb-5">
              Notification Preferences
            </h3>
            <div className="flex flex-col gap-0">
              {prefs.map((pref, i) => (
                <div
                  key={i}
                  className={`flex items-center justify-between py-4 ${
                    i < prefs.length - 1 ? "border-b border-[#cfc4c5]/20" : ""
                  }`}
                >
                  <div>
                    <p className="font-[Inter] text-[14px] font-medium text-black">
                      {pref.label}
                    </p>
                    <p className="font-[Inter] text-[12px] text-[#848484] mt-0.5">
                      {pref.description}
                    </p>
                  </div>
                  <Toggle
                    enabled={pref.enabled}
                    onToggle={() => togglePref(i)}
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Account Actions */}
          <section className="bg-white border border-[#cfc4c5] rounded-xl p-6">
            <h3 className="font-[Inter] text-[12px] font-semibold tracking-[0.08em] text-[#4c4546] uppercase mb-5">
              Account
            </h3>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between py-3 border-b border-[#cfc4c5]/20">
                <div>
                  <p className="font-[Inter] text-[14px] font-medium text-black">
                    Change Password
                  </p>
                  <p className="font-[Inter] text-[12px] text-[#848484] mt-0.5">
                    Update your account password
                  </p>
                </div>
                <button
                  className="px-4 py-1.5 border border-[#cfc4c5] rounded-full font-[Inter] text-[12px] font-medium text-[#4c4546] hover:border-black hover:text-black transition-all cursor-pointer"
                  type="button"
                >
                  Update
                </button>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-[#cfc4c5]/20">
                <div>
                  <p className="font-[Inter] text-[14px] font-medium text-black">
                    Two-Factor Authentication
                  </p>
                  <p className="font-[Inter] text-[12px] text-[#848484] mt-0.5">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <button
                  className="px-4 py-1.5 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] rounded-full font-[Inter] text-[12px] font-medium text-white hover:shadow-[0_4px_16px_rgba(99,102,241,0.3)] transition-all cursor-pointer"
                  type="button"
                >
                  Enable
                </button>
              </div>
              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="font-[Inter] text-[14px] font-medium text-[#f43f5e]">
                    Delete Account
                  </p>
                  <p className="font-[Inter] text-[12px] text-[#848484] mt-0.5">
                    Permanently delete your account and all data
                  </p>
                </div>
                <button
                  className="px-4 py-1.5 border border-[#fecdd3] rounded-full font-[Inter] text-[12px] font-medium text-[#f43f5e] hover:bg-[#fff1f2] hover:border-[#f43f5e] transition-all cursor-pointer"
                  type="button"
                >
                  Delete
                </button>
              </div>
            </div>
          </section>

          {/* Connected Apps */}
          <section className="bg-white border border-[#cfc4c5] rounded-xl p-6">
            <h3 className="font-[Inter] text-[12px] font-semibold tracking-[0.08em] text-[#4c4546] uppercase mb-5">
              Connected Services
            </h3>
            <div className="flex flex-col gap-4">
              {[
                {
                  name: "Google Calendar",
                  icon: "calendar_month",
                  status: "Connected",
                  color: "#10b981",
                  connected: true,
                },
                {
                  name: "Slack",
                  icon: "chat",
                  status: "Connected",
                  color: "#10b981",
                  connected: true,
                },
                {
                  name: "LinkedIn Recruiter",
                  icon: "link",
                  status: "Not Connected",
                  color: "#848484",
                  connected: false,
                },
              ].map((app, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-4 py-3 ${
                    i < 2 ? "border-b border-[#cfc4c5]/20" : ""
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-[#f3f3f3] flex items-center justify-center">
                    <span className="material-symbols-outlined text-[20px] text-[#4c4546]">
                      {app.icon}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="font-[Inter] text-[14px] font-medium text-black">
                      {app.name}
                    </p>
                    <p
                      className="font-[Inter] text-[12px] mt-0.5"
                      style={{ color: app.color }}
                    >
                      {app.status}
                    </p>
                  </div>
                  <button
                    className={`px-4 py-1.5 rounded-full font-[Inter] text-[12px] font-medium transition-all cursor-pointer ${
                      app.connected
                        ? "border border-[#cfc4c5] text-[#4c4546] hover:border-[#f43f5e] hover:text-[#f43f5e]"
                        : "bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white hover:shadow-[0_4px_16px_rgba(99,102,241,0.3)]"
                    }`}
                    type="button"
                  >
                    {app.connected ? "Disconnect" : "Connect"}
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

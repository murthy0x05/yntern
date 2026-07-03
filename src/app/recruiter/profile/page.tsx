"use client";

import { useState } from "react";
import { useAuth } from "@/lib/hooks/useAuth";
import Link from "next/link";

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
  const { user, loading } = useAuth();
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

  if (loading) {
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

  // Fallback defaults for properties that might not be on the user object yet
  const displayName = user.displayName || "Recruiter";
  const initials = displayName
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase() || "RC";
    
  const email = user.email || "No email provided";
  
  // Real stats will be fetched from Firestore
  const HIRING_STATS: any[] = [];
  const RECENT_HIRES: any[] = [];

  return (
    <div className="max-w-[1440px] mx-auto w-full px-6 lg:px-12 flex-1 flex flex-col gap-10 pt-6 pb-12">
      {/* Profile Header */}
      <section className="flex items-start gap-6 animate-fade-rise">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center text-white text-[28px] font-semibold shrink-0 shadow-[0_4px_20px_rgba(99,102,241,0.25)]">
          {initials}
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
            {displayName}
          </h1>
          <p className="font-[Inter] text-[14px] text-[#4c4546] mt-1">
            Recruiter · Yntern
          </p>
          <div className="flex items-center gap-4 mt-3">
            <span className="flex items-center gap-1.5 font-[Inter] text-[12px] text-[#848484]">
              <span className="material-symbols-outlined text-[16px]">
                location_on
              </span>
              Remote
            </span>
            <span className="flex items-center gap-1.5 font-[Inter] text-[12px] text-[#848484]">
              <span className="material-symbols-outlined text-[16px]">
                calendar_today
              </span>
              Joined {new Date().toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}
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
              Passionate about connecting exceptional talent with transformative opportunities. Add your bio here once the profile editor is integrated.
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
                    value: email,
                    color: "#6366f1",
                  }
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
              <div className="flex flex-col items-center justify-center h-full gap-2 py-4">
                <span className="material-symbols-outlined text-[24px] text-[#cfc4c5]">
                  category
                </span>
                <p className="font-[Inter] text-[13px] text-[#848484]">
                  No specializations added yet
                </p>
              </div>
            </section>
          </div>

          {/* Hiring Stats */}
          <section>
            <h3 className="font-[Inter] text-[12px] font-semibold tracking-[0.08em] text-[#4c4546] uppercase mb-4">
              Hiring Performance
            </h3>
            {HIRING_STATS.length > 0 ? (
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
            ) : (
              <div className="bg-white border border-[#cfc4c5] rounded-xl p-10 flex flex-col items-center justify-center gap-3">
                <span className="material-symbols-outlined text-[32px] text-[#cfc4c5]">
                  bar_chart
                </span>
                <p className="font-[Inter] text-[14px] text-[#4c4546] text-center max-w-sm">
                  Your hiring performance metrics will appear here once you start recruiting candidates.
                </p>
              </div>
            )}
          </section>

          {/* Recent Hires */}
          <section>
            <h3 className="font-[Inter] text-[12px] font-semibold tracking-[0.08em] text-[#4c4546] uppercase mb-4">
              Recent Hires
            </h3>
            <div className="bg-white border border-[#cfc4c5] rounded-xl overflow-hidden">
              {RECENT_HIRES.length > 0 ? (
                RECENT_HIRES.map((hire, i) => (
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
                ))
              ) : (
                <div className="p-10 flex flex-col items-center justify-center gap-3">
                  <span className="material-symbols-outlined text-[32px] text-[#cfc4c5]">
                    group_add
                  </span>
                  <p className="font-[Inter] text-[14px] text-[#4c4546] text-center">
                    No recent hires to display yet.
                  </p>
                </div>
              )}
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

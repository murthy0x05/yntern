"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const STATS = [
  {
    label: "Profile Strength",
    value: 78,
    icon: "shield_person",
    suffix: "%",
    color: "#10b981",
    bg: "#ecfdf5",
  },
  {
    label: "Job Matches",
    value: 12,
    icon: "work",
    suffix: "",
    color: "#6366f1",
    bg: "#eef2ff",
  },
  {
    label: "Active Applications",
    value: 4,
    icon: "assignment",
    suffix: "",
    color: "#f59e0b",
    bg: "#fffbeb",
  },
  {
    label: "Interview Invites",
    value: 2,
    icon: "event",
    suffix: "",
    color: "#3b82f6",
    bg: "#eff6ff",
  },
];

const ACTIVITY = [
  {
    text: "You matched 94% with Staff Engineer at Stripe",
    time: "1h ago",
    icon: "bolt",
    color: "#10b981",
    bg: "#ecfdf5",
  },
  {
    text: "AI recruiter from Vercel sent you a message",
    time: "3h ago",
    icon: "smart_toy",
    color: "#8b5cf6",
    bg: "#f5f3ff",
  },
  {
    text: "Application for ML Engineer at DeepMind moved to Interview",
    time: "5h ago",
    icon: "trending_up",
    color: "#3b82f6",
    bg: "#eff6ff",
  },
  {
    text: "Your profile analyzer found 3 improvement areas",
    time: "1d ago",
    icon: "auto_awesome",
    color: "#f59e0b",
    bg: "#fffbeb",
  },
  {
    text: "New job match: Senior Frontend Engineer at Figma",
    time: "1d ago",
    icon: "work",
    color: "#6366f1",
    bg: "#eef2ff",
  },
];

function AnimatedNumber({
  value,
  suffix = "",
}: {
  value: number;
  suffix?: string;
}) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let start = 0;
    const duration = 1200;
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = value / steps;
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setDisplay(value);
        clearInterval(timer);
      } else {
        setDisplay(Math.floor(start));
      }
    }, stepTime);
    return () => clearInterval(timer);
  }, [value]);
  return (
    <span>
      {display}
      {suffix}
    </span>
  );
}

export default function CandidateDashboard() {
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className="max-w-[1440px] mx-auto w-full px-6 lg:px-12 flex-1 flex flex-col gap-12 pt-6 pb-12">
      {/* Welcome */}
      <section className="flex flex-col gap-2 animate-fade-rise">
        <h1
          className="text-black"
          style={{
            fontFamily: "'Instrument Serif'",
            fontSize: "40px",
            lineHeight: "1.2",
          }}
        >
          {greeting}, Pavan
        </h1>
        <p className="font-[Inter] text-sm text-[#4c4546]">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-rise-delay">
        {STATS.map((stat) => (
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
                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="font-[Inter] text-[12px] font-semibold tracking-[0.05em] text-[#4c4546] uppercase mt-1">
                {stat.label}
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* Quick Actions */}
      <section className="flex flex-col gap-4 animate-fade-rise-delay">
        <h3
          className="text-black"
          style={{
            fontFamily: "'Instrument Serif'",
            fontSize: "32px",
            lineHeight: "1.2",
          }}
        >
          Quick Actions
        </h3>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/candidate/profile"
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white rounded-full font-[Inter] text-[12px] font-semibold uppercase tracking-widest hover:shadow-[0_4px_16px_rgba(99,102,241,0.3)] transition-all"
          >
            <span className="material-symbols-outlined text-[16px]">edit</span>
            Update Profile
          </Link>
          <Link
            href="/candidate/jobs"
            className="flex items-center gap-2 px-5 py-2.5 border border-[#10b981] text-[#059669] rounded-full font-[Inter] text-[12px] font-semibold uppercase tracking-widest hover:bg-[#ecfdf5] transition-all"
          >
            <span className="material-symbols-outlined text-[16px]">
              search
            </span>
            Browse Jobs
          </Link>
          <Link
            href="/candidate/insights"
            className="flex items-center gap-2 px-5 py-2.5 border border-[#cfc4c5] text-[#4c4546] rounded-full font-[Inter] text-[12px] font-semibold uppercase tracking-widest hover:border-black hover:text-black transition-all"
          >
            <span className="material-symbols-outlined text-[16px]">
              insights
            </span>
            Check Insights
          </Link>
        </div>
      </section>

      {/* Recent Activity */}
      <section className="flex flex-col gap-6 animate-fade-rise-delay-2">
        <div className="flex justify-between items-end border-b border-[#cfc4c5]/50 pb-4">
          <h3
            className="text-black"
            style={{
              fontFamily: "'Instrument Serif'",
              fontSize: "32px",
              lineHeight: "1.2",
            }}
          >
            Recent Activity
          </h3>
        </div>
        <div className="flex flex-col">
          {ACTIVITY.map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-4 py-4 border-b border-[#cfc4c5]/20 last:border-0 hover:bg-[#f3f3f3]/50 px-3 -mx-3 rounded-lg transition-colors group"
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 transition-transform group-hover:scale-110"
                style={{ backgroundColor: item.bg }}
              >
                <span
                  className="material-symbols-outlined text-[18px]"
                  style={{ color: item.color }}
                >
                  {item.icon}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-[Inter] text-sm text-black">{item.text}</p>
              </div>
              <span className="font-[Inter] text-[12px] text-[#848484] whitespace-nowrap shrink-0">
                {item.time}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

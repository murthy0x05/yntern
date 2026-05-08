"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const STATS = [
  {
    label: "Active Sessions",
    value: 3,
    icon: "rocket_launch",
    suffix: "",
    color: "#6366f1",
    bg: "#eef2ff",
  },
  {
    label: "Candidates Found",
    value: 44,
    icon: "group",
    suffix: "",
    color: "#10b981",
    bg: "#ecfdf5",
  },
  {
    label: "Interviews Lined Up",
    value: 7,
    icon: "event",
    suffix: "",
    color: "#f59e0b",
    bg: "#fffbeb",
  },
  {
    label: "Avg. Match Score",
    value: 84,
    icon: "speed",
    suffix: "%",
    color: "#3b82f6",
    bg: "#eff6ff",
  },
];

const SESSIONS = [
  {
    id: 1,
    title: "Senior Staff Engineer",
    domain: "Distributed Systems · San Francisco / Remote",
    icon: "terminal",
    status: "In Progress",
    statusColor: "bg-[#eff6ff] text-[#2563eb]",
    candidates: 12,
  },
  {
    id: 2,
    title: "Product Design Lead",
    domain: "0 to 1 Consumer · New York",
    icon: "design_services",
    status: "Refining",
    statusColor: "bg-[#fffbeb] text-[#d97706]",
    candidates: 4,
  },
  {
    id: 3,
    title: "VP of Growth Marketing",
    domain: "B2B SaaS · London / Remote",
    icon: "monitoring",
    status: "Ready for Review",
    statusColor: "bg-[#ecfdf5] text-[#059669]",
    candidates: 28,
  },
];

const ACTIVITY = [
  {
    text: "New high-match candidate found for Senior Staff Engineer",
    time: "2h ago",
    icon: "person_add",
    color: "#10b981",
    bg: "#ecfdf5",
  },
  {
    text: "AI outreach completed for Product Design Lead — 3 responded",
    time: "4h ago",
    icon: "smart_toy",
    color: "#8b5cf6",
    bg: "#f5f3ff",
  },
  {
    text: "VP of Growth Marketing shortlist is ready for review",
    time: "6h ago",
    icon: "checklist",
    color: "#059669",
    bg: "#ecfdf5",
  },
  {
    text: "Interview scheduled with Maya Chen for Staff Engineer role",
    time: "1d ago",
    icon: "calendar_month",
    color: "#f59e0b",
    bg: "#fffbeb",
  },
  {
    text: "2 new candidates matched for Product Design Lead",
    time: "1d ago",
    icon: "group_add",
    color: "#3b82f6",
    bg: "#eff6ff",
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

export default function DashboardPage() {
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
          {greeting}, Sarah
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

      {/* Active Sessions */}
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
            Active Sessions
          </h3>
          <Link
            className="font-[Inter] text-[12px] font-semibold uppercase tracking-widest text-[#4c4546] hover:text-black transition-colors"
            href="#"
          >
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SESSIONS.map((session) => (
            <div
              key={session.id}
              className="group border border-[#cfc4c5] bg-white rounded-xl p-5 hover:border-black transition-all duration-500 flex flex-col gap-4 cursor-pointer hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(0,0,0,0.04)]"
            >
              <div className="flex justify-between items-start">
                <div className="w-8 h-8 rounded-full bg-[#eeeeee] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[#4c4546]">
                    {session.icon}
                  </span>
                </div>
                <span
                  className={`font-[Inter] text-[12px] font-semibold uppercase ${session.statusColor} px-3 py-1 rounded-full`}
                >
                  {session.status}
                </span>
              </div>
              <div>
                <h4
                  className="text-black mb-2 group-hover:underline decoration-1 underline-offset-4"
                  style={{
                    fontFamily: "'Instrument Serif'",
                    fontSize: "22px",
                    lineHeight: "1.2",
                  }}
                >
                  {session.title}
                </h4>
                <p className="font-[Inter] text-sm text-[#4c4546]">
                  {session.domain}
                </p>
              </div>
              <div className="mt-auto pt-4 border-t border-[#cfc4c5]/30 flex justify-between items-center">
                <span className="font-[Inter] text-[12px] font-semibold text-[#4c4546] uppercase tracking-wide">
                  {session.candidates} Candidates Found
                </span>
                <span className="material-symbols-outlined text-black opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0 duration-300">
                  east
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Activity */}
      <section className="flex flex-col gap-6">
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

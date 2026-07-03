"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useAuth } from "@/lib/hooks/useAuth";

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
  const { user, loading } = useAuth();
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  // TODO: Fetch real stats from Firebase
  const STATS: any[] = [];
  
  // TODO: Fetch real sessions from Firebase
  const SESSIONS: any[] = [];
  
  // TODO: Fetch real activity from Firebase
  const ACTIVITY: any[] = [];

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
          {greeting}{!loading && user ? `, ${user.email?.split('@')[0] || 'Recruiter'}` : ''}
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
        {STATS.length > 0 ? (
          STATS.map((stat) => (
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
          ))
        ) : (
          <div className="col-span-full py-8 text-center bg-[#fafafa] rounded-xl border border-[#cfc4c5] border-dashed">
            <span className="material-symbols-outlined text-4xl text-[#848484] mb-2">query_stats</span>
            <p className="font-[Inter] text-[#4c4546]">No stats available yet.</p>
          </div>
        )}
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
          {SESSIONS.length > 0 ? (
            SESSIONS.map((session) => (
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
            ))
          ) : (
            <div className="col-span-full py-12 text-center bg-[#fafafa] rounded-xl border border-[#cfc4c5] border-dashed">
              <span className="material-symbols-outlined text-4xl text-[#848484] mb-2">rocket_launch</span>
              <p className="font-[Inter] text-[#4c4546]">No active sessions.</p>
            </div>
          )}
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
          {ACTIVITY.length > 0 ? (
            ACTIVITY.map((item, i) => (
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
            ))
          ) : (
             <div className="py-12 text-center flex flex-col items-center">
              <span className="material-symbols-outlined text-4xl text-[#848484] mb-2">history</span>
              <p className="font-[Inter] text-[#4c4546]">No recent activity to show.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

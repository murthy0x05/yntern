"use client";

import Link from "next/link";
import { useState } from "react";

export default function TheaterPage() {
  // TODO: Fetch real candidates that have completed AI interviews from Firebase
  const CANDIDATES: any[] = [];
  const [activeId, setActiveId] = useState<number | null>(null);

  if (CANDIDATES.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center h-[calc(100vh-56px)] bg-[#fafafa]">
        <div className="w-24 h-24 bg-white border border-[#cfc4c5] rounded-full flex items-center justify-center mb-6 shadow-sm">
          <span className="material-symbols-outlined text-[40px] text-[#8b5cf6]">
            smart_toy
          </span>
        </div>
        <h2
          className="text-black mb-3 text-center"
          style={{
            fontFamily: "'Instrument Serif'",
            fontSize: "36px",
            lineHeight: "1.2",
          }}
        >
          Waiting for AI Interviews
        </h2>
        <p className="font-[Inter] text-[15px] text-[#4c4546] text-center max-w-md mb-8">
          The Recruiter Theater is where you can review candidates after they complete their AI-led interviews. 
          Currently, no candidates have completed this stage.
        </p>
        <Link
          href="/recruiter"
          className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full font-[Inter] text-[13px] font-semibold hover:opacity-80 transition-opacity"
        >
          <span className="material-symbols-outlined text-[18px]">
            arrow_back
          </span>
          Return to Dashboard
        </Link>
      </div>
    );
  }

  const active = CANDIDATES.find((c) => c.id === activeId);

  return (
    <div className="flex-1 flex h-[calc(100vh-56px)] overflow-hidden">
      {/* Left Panel — Candidate List */}
      <div className="w-[320px] border-r border-[#cfc4c5] bg-white overflow-y-auto shrink-0">
        <div className="p-4 border-b border-[#cfc4c5]/30">
          <h2
            className="text-black mb-1"
            style={{
              fontFamily: "'Instrument Serif'",
              fontSize: "24px",
              lineHeight: "1.2",
            }}
          >
            Shortlist
          </h2>
          <p className="font-[Inter] text-[12px] text-[#848484]">
            {CANDIDATES.length} candidates
          </p>
        </div>
        <div className="flex flex-col">
          {CANDIDATES.map((c) => (
            <button
              key={c.id}
              className={`w-full flex items-start gap-3 p-4 text-left transition-all duration-300 cursor-pointer border-b border-[#cfc4c5]/15 ${activeId === c.id ? "bg-[#f3f3f3]" : "hover:bg-[#fafafa]"}`}
              onClick={() => setActiveId(c.id)}
              type="button"
            >
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-[12px] font-semibold shrink-0 ${activeId === c.id ? "bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] text-white" : "bg-[#eeeeee] text-[#4c4546]"}`}
              >
                {c.initials}
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-[Inter] text-[13px] font-semibold text-black truncate">
                  {c.name}
                </p>
                <p className="font-[Inter] text-[12px] text-[#4c4546] truncate">
                  {c.title}
                </p>
                <div className="flex items-center gap-3 mt-1.5">
                  <span className="font-[Inter] text-[11px] text-[#10b981] font-semibold">
                    M: {c.matchScore}
                  </span>
                  <span className="font-[Inter] text-[11px] text-[#6366f1] font-semibold">
                    I: {c.interestScore}
                  </span>
                </div>
              </div>
              {activeId === c.id && (
                <div className="w-0.5 h-full bg-black absolute right-0 top-0" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Right Panel — Profile Detail */}
      {active && (
        <div className="flex-1 overflow-y-auto">
          {/* Rest of the detail view will go here once backend is connected */}
          <div className="max-w-3xl mx-auto px-8 py-8 flex flex-col gap-8">
            <section className="flex items-start gap-5">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center text-white text-[20px] font-semibold shrink-0">
                {active.initials}
              </div>
              <div className="flex-1">
                <h1
                  className="text-black mb-1"
                  style={{
                    fontFamily: "'Instrument Serif'",
                    fontSize: "32px",
                    lineHeight: "1.2",
                  }}
                >
                  {active.name}
                </h1>
                <p className="font-[Inter] text-[14px] text-[#4c4546]">
                  {active.title} · {active.company}
                </p>
              </div>
            </section>
          </div>
        </div>
      )}
    </div>
  );
}

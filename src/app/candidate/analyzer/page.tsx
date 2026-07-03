"use client";

import Link from "next/link";

export default function AnalyzerPage() {
  return (
    <div className="max-w-[1440px] mx-auto w-full px-6 lg:px-12 flex-1 flex flex-col gap-10 pt-6 pb-12">
      {/* Header */}
      <section className="flex flex-col gap-2 animate-fade-rise">
        <h1
          className="text-black"
          style={{
            fontFamily: "'Instrument Serif'",
            fontSize: "36px",
            lineHeight: "1.2",
          }}
        >
          AI Profile Analyzer
        </h1>
        <p className="font-[Inter] text-sm text-[#4c4546]">
          Your profile is analyzed against current market demands and
          top-performing candidates.
        </p>
      </section>

      {/* Empty State */}
      <section className="flex-1 flex flex-col items-center justify-center animate-fade-rise-delay mt-20">
        <div className="w-20 h-20 bg-[#f3f3f3] rounded-full flex items-center justify-center mb-6">
          <span className="material-symbols-outlined text-[32px] text-[#848484]">
            query_stats
          </span>
        </div>
        <h2 className="font-[Inter] text-xl font-semibold text-black mb-2">
          Profile Analysis Pending...
        </h2>
        <p className="font-[Inter] text-[14px] text-[#4c4546] text-center max-w-sm mb-8">
          We need a bit more data before we can provide a complete profile analysis.
          Once we have enough data, you'll see your overall score and skill gaps here.
        </p>
        <Link
          href="/candidate"
          className="bg-black text-white px-6 py-2.5 rounded-full font-[Inter] text-sm font-semibold hover:opacity-80 transition-opacity"
        >
          Return to Dashboard
        </Link>
      </section>
    </div>
  );
}

"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#f9f9f9] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-20 h-20 bg-white border border-[#cfc4c5] rounded-full flex items-center justify-center shadow-sm mb-6 animate-fade-rise">
        <span className="material-symbols-outlined text-[32px] text-[#4c4546]">
          route
        </span>
      </div>
      <h1
        className="text-black mb-3 animate-fade-rise-delay"
        style={{
          fontFamily: "'Instrument Serif'",
          fontSize: "48px",
          lineHeight: "1.1",
        }}
      >
        Page Not Found
      </h1>
      <p className="font-[Inter] text-sm text-[#4c4546] max-w-md mx-auto mb-8 animate-fade-rise-delay-2">
        We couldn't find the page you were looking for. It might have been moved, deleted, or you may have typed the URL incorrectly.
      </p>
      <div className="flex items-center justify-center gap-4 animate-fade-rise-delay-2">
        <Link
          href="/"
          className="px-6 py-2.5 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white rounded-full font-[Inter] text-[12px] font-semibold uppercase tracking-widest hover:shadow-[0_4px_16px_rgba(99,102,241,0.3)] transition-all"
        >
          Return Home
        </Link>
        <button
          onClick={() => window.history.back()}
          className="px-6 py-2.5 border border-[#cfc4c5] text-[#4c4546] rounded-full font-[Inter] text-[12px] font-semibold uppercase tracking-widest hover:border-black hover:text-black hover:bg-white transition-all cursor-pointer"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}

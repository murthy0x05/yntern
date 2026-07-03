"use client";

import { useState } from "react";
import Link from "next/link";

type Candidate = {
  firestoreDocId: string;
  name: string;
  title: string;
  skills: string[];
  similarity: number;
  experience_level: string;
  work_preference: string;
  country: string;
  company: string;
  initials: string;
};

function ScoreBar({
  score,
  label,
  color,
}: {
  score: number;
  label: string;
  color: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="font-[Inter] text-[11px] font-semibold text-[#4c4546] uppercase tracking-wide w-14 shrink-0">
        {label}
      </span>
      <div className="flex-1 h-1.5 bg-[#f3f3f3] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{ width: `${score}%`, backgroundColor: color }}
        />
      </div>
      <span className="font-[Inter] text-[12px] font-semibold text-black w-8 text-right">
        {score}%
      </span>
    </div>
  );
}

export default function DiscoverPage() {
  const [search, setSearch] = useState("");
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    if (!search.trim()) return;

    setLoading(true);
    setHasSearched(true);

    try {
      const res = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: search.trim(), limit: 20 }),
      });
      const data = await res.json();
      setCandidates(data.results || []);
    } catch (err) {
      console.error("Search failed:", err);
      setCandidates([]);
    }

    setLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="max-w-[1440px] mx-auto w-full px-6 lg:px-12 flex-1 flex flex-col gap-8 pt-6 pb-12">
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
          Candidate Discovery
        </h1>
        <p className="font-[Inter] text-sm text-[#4c4546]">
          {hasSearched
            ? `${candidates.length} candidates matched for "${search}"`
            : "Search for candidates using natural language — e.g. \"React developer in India with 3+ years\""}
        </p>
      </section>

      {/* Search Bar */}
      <section className="flex flex-col sm:flex-row gap-4 items-start sm:items-center animate-fade-rise-delay">
        <div className="relative group flex-1 max-w-xl">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#4c4546] text-[18px] pointer-events-none group-focus-within:text-black transition-colors">
            search
          </span>
          <input
            className="w-full bg-white border border-[#cfc4c5] rounded-full py-2.5 pl-9 pr-3 text-sm font-[Inter] focus:outline-none focus:border-black transition-all placeholder:text-[#848484]"
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Describe the candidate you're looking for..."
            type="text"
            value={search}
          />
        </div>
        <button
          className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-[Inter] text-[12px] font-semibold uppercase tracking-widest transition-all duration-300 cursor-pointer ${
            search.trim()
              ? "bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white hover:shadow-[0_4px_16px_rgba(99,102,241,0.3)]"
              : "bg-[#e2e2e2] text-[#848484] cursor-not-allowed"
          }`}
          disabled={!search.trim() || loading}
          onClick={handleSearch}
          type="button"
        >
          {loading ? (
            <>
              <span className="material-symbols-outlined text-[16px] animate-spin">
                progress_activity
              </span>
              Searching...
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-[16px]">search</span>
              Search
            </>
          )}
        </button>
      </section>

      {/* Results Grid */}
      {candidates.length > 0 && (
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-5 animate-fade-rise-delay-2">
          {candidates.map((c) => (
            <Link
              href="/recruiter/theater"
              key={c.firestoreDocId}
              className="group border border-[#cfc4c5] bg-white rounded-xl p-5 hover:border-black transition-all duration-500 flex flex-col gap-4 cursor-pointer hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(0,0,0,0.04)]"
            >
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center text-white text-[13px] font-semibold shrink-0">
                  {c.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-[Inter] text-[15px] font-semibold text-black group-hover:underline decoration-1 underline-offset-4">
                    {c.name}
                  </h4>
                  <p className="font-[Inter] text-[13px] text-[#4c4546]">
                    {c.title}{c.company ? ` · ${c.company}` : ""}
                  </p>
                  <p className="font-[Inter] text-[12px] text-[#848484] mt-0.5">
                    {c.country || "Remote"} · {c.experience_level}
                  </p>
                </div>
                <span className="material-symbols-outlined text-black opacity-0 group-hover:opacity-100 transition-all duration-300">
                  open_in_new
                </span>
              </div>
              {c.skills.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {c.skills.map((s) => (
                    <span
                      key={s}
                      className="px-2.5 py-0.5 bg-[#f3f3f3] rounded-full font-[Inter] text-[11px] font-medium text-[#4c4546]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              )}
              <div className="flex flex-col gap-2 pt-2">
                <ScoreBar color="#10b981" label="Match" score={c.similarity} />
              </div>
            </Link>
          ))}
        </section>
      )}

      {/* Empty States */}
      {hasSearched && candidates.length === 0 && !loading && (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <span className="material-symbols-outlined text-[48px] text-[#cfc4c5]">
            search_off
          </span>
          <p className="font-[Inter] text-sm text-[#848484]">
            No candidates match your search
          </p>
        </div>
      )}

      {!hasSearched && (
        <div className="flex flex-col items-center justify-center py-20 gap-4 animate-fade-rise-delay-2">
          <div className="w-20 h-20 rounded-full bg-[#f5f3ff] flex items-center justify-center">
            <span className="material-symbols-outlined text-[36px] text-[#8b5cf6]">
              person_search
            </span>
          </div>
          <h3
            className="text-black text-center"
            style={{ fontFamily: "'Instrument Serif'", fontSize: "24px" }}
          >
            Start discovering talent
          </h3>
          <p className="font-[Inter] text-sm text-[#848484] text-center max-w-md">
            Use natural language to search — try &quot;Python developer with ML experience&quot; or &quot;UX designer in Europe&quot;
          </p>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";

type Candidate = {
  id: number;
  name: string;
  title: string;
  company: string;
  location: string;
  skills: string[];
  matchScore: number;
  interestScore: number;
  initials: string;
  experience: string;
};

const FILTERS = [
  "All Skills",
  "Go",
  "Python",
  "TypeScript",
  "Java",
  "Kubernetes",
  "AWS",
];

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
        {score}
      </span>
    </div>
  );
}

export default function DiscoverPage() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All Skills");
  const [sortBy, setSortBy] = useState("match");
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCandidates() {
      const supabase = createClient();
      const { data, error } = await supabase.from("candidates").select("*");
      
      if (data) {
        const mapped = data.map((c) => ({
          ...c,
          matchScore: c.match_score,
          interestScore: c.interest_score,
        }));
        setCandidates(mapped);
      }
      setLoading(false);
    }
    
    fetchCandidates();
  }, []);

  const filtered = candidates.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.title.toLowerCase().includes(search.toLowerCase());
    const matchesFilter =
      activeFilter === "All Skills" ||
      c.skills.some((s) => s.toLowerCase() === activeFilter.toLowerCase());
    return matchesSearch && matchesFilter;
  }).sort((a, b) => {
    if (sortBy === "match") return b.matchScore - a.matchScore;
    if (sortBy === "interest") return b.interestScore - a.interestScore;
    return 0;
  });

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center pt-20">
        <p className="font-[Inter] text-sm text-[#848484] animate-pulse">Loading talent pool...</p>
      </div>
    );
  }

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
          {filtered.length} candidates matched for{" "}
          <span className="font-semibold text-black">
            Senior Staff Engineer
          </span>
        </p>
      </section>

      {/* Filter Bar */}
      <section className="flex flex-col sm:flex-row gap-4 items-start sm:items-center animate-fade-rise-delay">
        <div className="relative group flex-1 max-w-sm">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#4c4546] text-[18px] pointer-events-none group-focus-within:text-black transition-colors">
            search
          </span>
          <input
            className="w-full bg-white border border-[#cfc4c5] rounded-full py-2 pl-9 pr-3 text-sm font-[Inter] focus:outline-none focus:border-black transition-all placeholder:text-[#848484]"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search candidates..."
            type="text"
            value={search}
          />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {FILTERS.map((f) => (
            <button
              key={f}
              className={`px-3.5 py-1.5 rounded-full font-[Inter] text-[12px] font-medium border transition-all duration-300 cursor-pointer ${activeFilter === f ? "bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white border-transparent" : "bg-white text-[#4c4546] border-[#cfc4c5] hover:border-black hover:text-black"}`}
              onClick={() => setActiveFilter(f)}
              type="button"
            >
              {f}
            </button>
          ))}
          <div className="w-px h-5 bg-[#cfc4c5]/50 mx-1" />
          <select
            className="bg-white border border-[#cfc4c5] rounded-full px-3.5 py-1.5 font-[Inter] text-[12px] font-medium text-[#4c4546] focus:outline-none focus:border-black cursor-pointer appearance-none pr-7 bg-no-repeat bg-[right_8px_center]"
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='16' viewBox='0 -960 960 960' width='16'%3E%3Cpath d='M480-345 240-585l56-56 184 184 184-184 56 56-240 240Z'/%3E%3C/svg%3E\")",
            }}
            value={sortBy}
          >
            <option value="match">Best Match</option>
            <option value="interest">Highest Interest</option>
          </select>
        </div>
      </section>

      {/* Results Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-5 animate-fade-rise-delay-2">
        {filtered.map((c) => (
          <Link
            href="/recruiter/theater"
            key={c.id}
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
                  {c.title} · {c.company}
                </p>
                <p className="font-[Inter] text-[12px] text-[#848484] mt-0.5">
                  {c.location} · {c.experience}
                </p>
              </div>
              <span className="material-symbols-outlined text-black opacity-0 group-hover:opacity-100 transition-all duration-300">
                open_in_new
              </span>
            </div>
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
            <div className="flex flex-col gap-2 pt-2">
              <ScoreBar color="#10b981" label="Match" score={c.matchScore} />
              <ScoreBar
                color="#6366f1"
                label="Interest"
                score={c.interestScore}
              />
            </div>
          </Link>
        ))}
      </section>

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <span className="material-symbols-outlined text-[48px] text-[#cfc4c5]">
            search_off
          </span>
          <p className="font-[Inter] text-sm text-[#848484]">
            No candidates match your criteria
          </p>
        </div>
      )}
    </div>
  );
}

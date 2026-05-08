"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";

const FILTERS = ["All", "Remote", "Full-time", "Contract", "On-site"];

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

export default function JobFeedPage() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [savedJobs, setSavedJobs] = useState<number[]>([]);
  const [jobs, setJobs] = useState<any[]>([]);
  const supabase = createClient();

  useEffect(() => {
    const fetchJobs = async () => {
      const { data } = await supabase.from("jobs").select("*").order("id");
      if (data) setJobs(data);
    };
    fetchJobs();
  }, [supabase]);

  const filtered = jobs.filter((j) => {
    const searchLower = search.toLowerCase();
    const matchesSearch =
      j.role?.toLowerCase().includes(searchLower) ||
      j.company?.toLowerCase().includes(searchLower) ||
      (j.skills && j.skills.some((skill: string) => skill.toLowerCase().includes(searchLower)));
    const matchesFilter =
      activeFilter === "All" ||
      j.location?.toLowerCase().includes(activeFilter.toLowerCase()) ||
      j.type?.toLowerCase().includes(activeFilter.toLowerCase());
    return matchesSearch && matchesFilter;
  });

  const toggleSave = (id: number) => {
    setSavedJobs((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
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
          Job Match Feed
        </h1>
        <p className="font-[Inter] text-sm text-[#4c4546]">
          {filtered.length} AI-matched opportunities based on your profile
        </p>
      </section>

      {/* Filters */}
      <section className="flex flex-col sm:flex-row gap-4 items-start sm:items-center animate-fade-rise-delay">
        <div className="relative group flex-1 max-w-sm">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#4c4546] text-[18px] pointer-events-none group-focus-within:text-black transition-colors">
            search
          </span>
          <input
            className="w-full bg-white border border-[#cfc4c5] rounded-full py-2 pl-9 pr-3 text-sm font-[Inter] focus:outline-none focus:border-black transition-all placeholder:text-[#848484]"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search roles or companies..."
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
        </div>
      </section>

      {/* Jobs Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-5 animate-fade-rise-delay-2">
        {filtered.map((job) => (
          <div
            key={job.id}
            className="group border border-[#cfc4c5] bg-white rounded-xl p-5 hover:border-black transition-all duration-500 flex flex-col gap-4 hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(0,0,0,0.04)]"
          >
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center text-white text-[13px] font-semibold shrink-0">
                {job.initials}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-[Inter] text-[15px] font-semibold text-black">
                  {job.role}
                </h4>
                <p className="font-[Inter] text-[13px] text-[#4c4546]">
                  {job.company}
                </p>
                <p className="font-[Inter] text-[12px] text-[#848484] mt-0.5">
                  {job.location}
                </p>
              </div>
              <span className="font-[Inter] text-[12px] text-[#848484] whitespace-nowrap">
                {job.posted}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-[Inter] text-[13px] font-semibold text-[#10b981]">
                {job.salary}
              </span>
              <span className="px-2 py-0.5 bg-[#f3f3f3] rounded-full font-[Inter] text-[11px] text-[#4c4546]">
                {job.type}
              </span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {job.skills && job.skills.map((s: string) => (
                <span
                  key={s}
                  className="px-2.5 py-0.5 bg-[#eef2ff] rounded-full font-[Inter] text-[11px] font-medium text-[#4338ca]"
                >
                  {s}
                </span>
              ))}
            </div>

            <div className="flex flex-col gap-2">
              <ScoreBar color="#10b981" label="Match" score={job.match_score} />
              <ScoreBar
                color="#6366f1"
                label="Interest"
                score={job.interest_score}
              />
            </div>

            <div className="flex items-center gap-3 pt-2 border-t border-[#cfc4c5]/20">
              <button
                className="flex-1 flex items-center justify-center gap-2 py-2 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white rounded-full font-[Inter] text-[12px] font-semibold uppercase tracking-widest hover:shadow-[0_4px_16px_rgba(99,102,241,0.3)] transition-all cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-[16px]">
                  send
                </span>
                Apply
              </button>
              <button
                className={`flex items-center justify-center gap-1.5 px-4 py-2 border rounded-full font-[Inter] text-[12px] font-semibold uppercase tracking-widest transition-all cursor-pointer ${savedJobs.includes(job.id) ? "border-[#f59e0b] text-[#d97706] bg-[#fffbeb]" : "border-[#cfc4c5] text-[#4c4546] hover:border-black hover:text-black"}`}
                onClick={() => toggleSave(job.id)}
                type="button"
              >
                <span className="material-symbols-outlined text-[16px]">
                  {savedJobs.includes(job.id) ? "bookmark" : "bookmark_border"}
                </span>
                {savedJobs.includes(job.id) ? "Saved" : "Save"}
              </button>
            </div>
          </div>
        ))}
      </section>

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 px-6 border border-dashed border-[#cfc4c5] bg-[#fafafa] rounded-2xl animate-fade-rise">
          <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center mb-4">
            <span className="material-symbols-outlined text-[32px] text-[#cfc4c5]">
              search_off
            </span>
          </div>
          <h3 className="font-[Instrument_Serif] text-[28px] text-black mb-2">No matches found</h3>
          <p className="font-[Inter] text-sm text-[#848484] text-center max-w-sm mb-6">
            We couldn't find any opportunities matching "{search}" or your selected filters. Try adjusting your search criteria.
          </p>
          <button
            onClick={() => {
              setSearch("");
              setActiveFilter("All");
            }}
            className="px-6 py-2.5 bg-white border border-[#cfc4c5] hover:border-black hover:text-black transition-colors rounded-full font-[Inter] text-[12px] font-semibold text-[#4c4546] uppercase tracking-widest cursor-pointer"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}

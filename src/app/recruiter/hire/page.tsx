"use client";

import { useState, useRef, useEffect } from "react";
import Plan from "@/components/ui/agent-plan";

const TEMPLATES = [
  {
    label: "Software Engineer",
    icon: "code",
    color: "#6366f1",
    jd: "We are looking for a Software Engineer with 3+ years of experience in full-stack development. Proficiency in React, Node.js, and cloud infrastructure (AWS/GCP) is required. The ideal candidate thrives in fast-paced startup environments and writes clean testable code.",
  },
  {
    label: "Product Manager",
    icon: "inventory_2",
    color: "#10b981",
    jd: "Seeking a Product Manager to own the end-to-end product lifecycle for our B2B SaaS platform. 5+ years of PM experience, strong analytical skills, and a track record of shipping 0-to-1 products required.",
  },
  {
    label: "Data Scientist",
    icon: "query_stats",
    color: "#3b82f6",
    jd: "We need a Data Scientist proficient in Python, SQL, and ML frameworks (TensorFlow/PyTorch). The role involves building predictive models, running A/B tests, and deriving actionable insights from large datasets.",
  },
  {
    label: "UX Designer",
    icon: "palette",
    color: "#f59e0b",
    jd: "Looking for a UX Designer with exceptional interaction design and user research skills. You'll lead design for our consumer mobile app, conducting usability testing and creating high-fidelity prototypes in Figma.",
  },
];

import { createClient } from "@/utils/supabase/client";

type Candidate = {
  name: string;
  role: string;
  matchScore: number;
  skills: string[];
  experience: string;
  avatar: string;
};

export default function HirePage() {
  const [jdText, setJdText] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedJD, setSubmittedJD] = useState("");
  const [showPlan, setShowPlan] = useState(true);
  const [planStatus, setPlanStatus] = useState<"running" | "done">("running");
  const [showResults, setShowResults] = useState(false);
  const [selectedCandidates, setSelectedCandidates] = useState<Set<string>>(
    new Set(),
  );
  const [deadline, setDeadline] = useState("");
  const [outreachSent, setOutreachSent] = useState(false);
  const [matchedCandidates, setMatchedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    async function fetchCandidates() {
      const supabase = createClient();
      const { data } = await supabase
        .from("candidates")
        .select("*")
        .order("match_score", { ascending: false })
        .limit(6);

      if (data) {
        const mapped = data.map((c) => ({
          name: c.name,
          role: c.title,
          matchScore: c.match_score,
          skills: c.skills,
          experience: c.experience,
          avatar: c.initials,
        }));
        setMatchedCandidates(mapped);
      }
    }
    fetchCandidates();
  }, []);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      setJdText(text);
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    };
    reader.readAsText(file);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  useEffect(() => {
    const ta = textareaRef.current;
    if (ta) {
      ta.style.height = "auto";
      ta.style.height = Math.max(56, Math.min(ta.scrollHeight, 320)) + "px";
    }
  }, [jdText]);

  const handleSubmit = () => {
    if (!jdText.trim()) return;
    setSubmittedJD(jdText);
    setIsSubmitted(true);
    setPlanStatus("running");
    setShowPlan(true);
    setShowResults(false);
    setOutreachSent(false);
    setSelectedCandidates(new Set());
    setDeadline("");
  };

  const handleNewSearch = () => {
    setIsSubmitted(false);
    setSubmittedJD("");
    setJdText("");
    setShowPlan(true);
    setPlanStatus("running");
    setShowResults(false);
    setOutreachSent(false);
    setSelectedCandidates(new Set());
    setDeadline("");
  };

  const handlePlanComplete = () => {
    setPlanStatus("done");
    setShowPlan(false);
    setShowResults(true);
    // Select all candidates by default
    setSelectedCandidates(new Set(matchedCandidates.map((c) => c.name)));
  };

  const toggleCandidate = (name: string) => {
    setSelectedCandidates((prev) => {
      const next = new Set(prev);
      if (next.has(name)) {
        next.delete(name);
      } else {
        next.add(name);
      }
      return next;
    });
  };

  const toggleAll = () => {
    if (selectedCandidates.size === matchedCandidates.length) {
      setSelectedCandidates(new Set());
    } else {
      setSelectedCandidates(new Set(matchedCandidates.map((c) => c.name)));
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-start px-6 pb-16 pt-10 overflow-y-auto">
      {/* Header */}
      <div className="text-center mb-10 animate-fade-rise">
        <h1
          className="text-black mb-3"
          style={{
            fontFamily: "'Instrument Serif'",
            fontSize: "44px",
            lineHeight: "1.15",
            letterSpacing: "-0.5px",
          }}
        >
          {isSubmitted ? "Scouting in progress" : "What role are you hiring for?"}
        </h1>
        <p className="font-[Inter] text-sm text-[#4c4546] max-w-lg mx-auto">
          {isSubmitted
            ? "Our AI agent is analyzing your requirements and matching candidates."
            : "Paste a complete job description or describe the ideal candidate — our AI will find the best matches."}
        </p>
      </div>

      {/* Chat box container */}
      <div
        className={`w-full max-w-2xl overflow-hidden transition-all duration-500 ${!isSubmitted ? "animate-fade-rise-delay" : ""} ${isFocused && !isSubmitted ? "shadow-[0_0_0_1px_rgba(99,102,241,0.5),0_8px_40px_rgba(99,102,241,0.08)]" : "shadow-[0_0_0_1px_rgba(207,196,197,1),0_2px_12px_rgba(0,0,0,0.03)]"} rounded-2xl bg-white`}
      >
        {/* Text area / JD preview */}
        <div className="px-5 pt-5 pb-2">
          {isSubmitted ? (
            <div className="flex flex-col gap-2">
              <span className="font-[Inter] text-[11px] font-semibold uppercase tracking-[0.08em] text-[#848484]">
                Job Description
              </span>
              <p className="font-[Inter] text-sm text-[#1b1b1b] leading-relaxed">
                {submittedJD}
              </p>
            </div>
          ) : (
            <textarea
              ref={textareaRef}
              className="w-full bg-transparent border-none resize-none focus:ring-0 font-[Inter] text-sm text-black placeholder:text-[#848484] outline-none leading-relaxed"
              onBlur={() => setIsFocused(false)}
              onChange={(e) => setJdText(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.metaKey || e.ctrlKey))
                  handleSubmit();
              }}
              placeholder="Describe the role, required skills, experience level, and any cultural fit attributes..."
              rows={1}
              style={{ minHeight: "56px" }}
              value={jdText}
            />
          )}
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-[#cfc4c5]/30 bg-[#fafafa] rounded-b-2xl">
          {isSubmitted ? (
            <>
              <button
                className="flex items-center gap-1.5 px-3 py-1.5 text-[#4c4546] hover:text-black hover:bg-[#eeeeee] rounded-lg transition-all text-sm cursor-pointer"
                type="button"
                onClick={handleNewSearch}
              >
                <span className="material-symbols-outlined text-[18px]">
                  arrow_back
                </span>
                <span className="font-[Inter] text-[12px] font-medium">
                  New Search
                </span>
              </button>
              <div className="flex items-center gap-2">
                {planStatus === "running" ? (
                  <span className="flex items-center gap-1.5 font-[Inter] text-[12px] text-[#8b5cf6] font-medium">
                    <span className="material-symbols-outlined text-[16px] animate-spin">
                      progress_activity
                    </span>
                    Scouting...
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 font-[Inter] text-[12px] text-green-600 font-medium">
                    <span className="material-symbols-outlined text-[16px]">
                      check_circle
                    </span>
                    Complete
                  </span>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept=".txt,.md,.json,.csv"
                  onChange={handleFileUpload}
                />
                <button
                  className="flex items-center gap-1.5 px-3 py-1.5 text-[#4c4546] hover:text-black hover:bg-[#eeeeee] rounded-lg transition-all text-sm cursor-pointer"
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    upload_file
                  </span>
                  <span className="font-[Inter] text-[12px] font-medium hidden sm:inline">
                    Upload JD
                  </span>
                </button>
                <div className="w-px h-5 bg-[#cfc4c5]/50" />
                <button
                  className="flex items-center gap-1.5 px-3 py-1.5 text-[#8b5cf6] hover:bg-[#f5f3ff] rounded-lg transition-all text-sm cursor-pointer"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    smart_toy
                  </span>
                  <span className="font-[Inter] text-[12px] font-medium hidden sm:inline">
                    Gemini Pro
                  </span>
                  <span className="material-symbols-outlined text-[14px]">
                    expand_more
                  </span>
                </button>
              </div>
              <button
                className={`flex items-center gap-2 px-5 py-2 rounded-full font-[Inter] text-[12px] font-semibold uppercase tracking-widest transition-all duration-300 cursor-pointer ${jdText.trim() ? "bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white hover:shadow-[0_4px_16px_rgba(99,102,241,0.3)]" : "bg-[#e2e2e2] text-[#848484] cursor-not-allowed"}`}
                disabled={!jdText.trim()}
                onClick={handleSubmit}
                type="button"
              >
                Scout Candidates
                <span className="material-symbols-outlined text-[16px]">
                  arrow_forward
                </span>
              </button>
            </>
          )}
        </div>

        {/* Collapsible Agent Plan — extends from the bottom of the chat box */}
        {isSubmitted && (
          <div className="border-t border-[#cfc4c5]/30">
            <button
              className="w-full flex items-center justify-between px-5 py-3 hover:bg-[#f5f3ff]/50 transition-colors cursor-pointer"
              onClick={() => setShowPlan(!showPlan)}
              type="button"
            >
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-[#8b5cf6]">
                  account_tree
                </span>
                <span className="font-[Inter] text-[11px] font-semibold uppercase tracking-[0.08em] text-[#4c4546]">
                  Agent Plan
                </span>
                <span
                  className={`font-[Inter] text-[10px] font-semibold px-2 py-0.5 rounded-full ${planStatus === "done" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}`}
                >
                  {planStatus}
                </span>
              </div>
              <span
                className={`material-symbols-outlined text-[18px] text-[#848484] transition-transform duration-300 ${showPlan ? "rotate-180" : ""}`}
              >
                expand_more
              </span>
            </button>
            <div className={`border-t border-[#cfc4c5]/20 ${showPlan ? 'block' : 'hidden'}`}>
              <Plan onComplete={handlePlanComplete} />
            </div>
          </div>
        )}
      </div>

      {/* Templates — only visible when not submitted */}
      {!isSubmitted && (
        <>
          <div className="mt-8 flex flex-col items-center gap-3 animate-fade-rise-delay-2">
            <p className="font-[Inter] text-[12px] font-semibold tracking-[0.08em] text-[#848484] uppercase">
              Quick templates
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {TEMPLATES.map((t) => (
                <button
                  key={t.label}
                  className="flex items-center gap-1.5 px-4 py-2 border border-[#cfc4c5] rounded-full font-[Inter] text-[13px] text-[#4c4546] hover:border-black hover:text-black hover:bg-white transition-all duration-300 cursor-pointer bg-white/60"
                  onClick={() => {
                    setJdText(t.jd);
                    textareaRef.current?.focus();
                  }}
                  type="button"
                >
                  <span
                    className="material-symbols-outlined text-[16px]"
                    style={{ color: t.color }}
                  >
                    {t.icon}
                  </span>
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <p className="mt-6 font-[Inter] text-[11px] text-[#848484]">
            Press{" "}
            <kbd className="px-1.5 py-0.5 bg-[#f3f3f3] border border-[#cfc4c5]/50 rounded text-[10px] font-mono">
              Ctrl
            </kbd>{" "}
            +{" "}
            <kbd className="px-1.5 py-0.5 bg-[#f3f3f3] border border-[#cfc4c5]/50 rounded text-[10px] font-mono">
              Enter
            </kbd>{" "}
            to submit
          </p>
        </>
      )}

      {/* Inline Candidate Results */}
      {showResults && (
        <div className="w-full max-w-2xl mt-8 animate-fade-rise">
          {/* Results header */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2
                className="text-black"
                style={{
                  fontFamily: "'Instrument Serif'",
                  fontSize: "28px",
                  lineHeight: "1.2",
                }}
              >
                Matched Candidates
              </h2>
              <p className="font-[Inter] text-[12px] text-[#848484] mt-1">
                {matchedCandidates.length} candidates found •{" "}
                {selectedCandidates.size} selected
              </p>
            </div>
            <button
              className="font-[Inter] text-[11px] font-semibold text-[#8b5cf6] hover:text-[#6366f1] transition-colors cursor-pointer uppercase tracking-widest"
              onClick={toggleAll}
              type="button"
            >
              {selectedCandidates.size === matchedCandidates.length
                ? "Deselect All"
                : "Select All"}
            </button>
          </div>

          {/* Candidate cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {matchedCandidates.map((candidate, idx) => {
              const isSelected = selectedCandidates.has(candidate.name);
              return (
                <div
                  key={candidate.name}
                  className={`relative bg-white border rounded-xl p-4 cursor-pointer transition-all duration-300 hover:shadow-md ${isSelected ? "border-[#8b5cf6] shadow-[0_0_0_1px_rgba(139,92,246,0.3)]" : "border-[#cfc4c5]/60"}`}
                  onClick={() => toggleCandidate(candidate.name)}
                  style={{
                    animationDelay: `${idx * 80}ms`,
                    animation: "fade-rise 0.4s ease forwards",
                    opacity: 0,
                  }}
                >
                  {/* Checkbox */}
                  <div className="absolute top-3 right-3">
                    <div
                      className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${isSelected ? "bg-[#8b5cf6] border-[#8b5cf6]" : "border-[#cfc4c5] bg-white"}`}
                    >
                      {isSelected && (
                        <span className="material-symbols-outlined text-white text-[14px]">
                          check
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Avatar + info */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center text-white font-[Inter] text-[12px] font-bold">
                      {candidate.avatar}
                    </div>
                    <div>
                      <p className="font-[Inter] text-sm font-semibold text-[#1b1b1b]">
                        {candidate.name}
                      </p>
                      <p className="font-[Inter] text-[11px] text-[#848484]">
                        {candidate.role} • {candidate.experience}
                      </p>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {candidate.skills.map((skill) => (
                      <span
                        key={skill}
                        className="font-[Inter] text-[10px] font-medium px-2 py-0.5 bg-[#f5f3ff] text-[#6366f1] rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Match score bar */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-[Inter] text-[10px] font-semibold text-[#848484] uppercase tracking-widest">
                        Match
                      </span>
                      <span className="font-[Inter] text-[11px] font-bold text-green-600">
                        {candidate.matchScore}%
                      </span>
                    </div>
                    <div className="h-1.5 bg-[#f3f3f3] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-green-400 to-emerald-500 transition-all duration-500"
                        style={{ width: `${candidate.matchScore}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Deadline picker + Send outreach */}
          {!outreachSent ? (
            <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-6 bg-white border border-[#cfc4c5] rounded-2xl p-5 shadow-[0_4px_20px_rgba(0,0,0,0.04)] animate-fade-rise">
              {/* Left: Deadline picker */}
              <div className="flex items-center gap-3 flex-1">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#f5f3ff] flex-shrink-0">
                  <span className="material-symbols-outlined text-[20px] text-[#8b5cf6]">
                    calendar_month
                  </span>
                </div>
                <div className="flex flex-col gap-1 flex-1">
                  <label
                    htmlFor="deadline"
                    className="font-[Inter] text-[10px] font-semibold uppercase tracking-[0.08em] text-[#848484]"
                  >
                    Conversational Outreach Deadline
                  </label>
                  <input
                    type="datetime-local"
                    id="deadline"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="font-[Inter] text-sm text-[#1b1b1b] bg-[#f9f9f9] border border-[#cfc4c5]/60 rounded-lg px-3 py-2 outline-none focus:border-[#8b5cf6] focus:ring-1 focus:ring-[#8b5cf6]/30 hover:border-[#8b5cf6]/50 transition-all"
                  />
                </div>
              </div>

              {/* Divider */}
              <div className="hidden sm:block w-px h-14 bg-[#cfc4c5]/50" />

              {/* Right: Send button */}
              <div className="flex flex-col items-end gap-2">
                <p className="font-[Inter] text-[11px] text-[#848484]">
                  {selectedCandidates.size} of {matchedCandidates.length}{" "}
                  selected
                </p>
                <button
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-[Inter] text-[12px] font-semibold uppercase tracking-widest transition-all duration-300 cursor-pointer ${
                    selectedCandidates.size > 0 && deadline
                      ? "bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white hover:shadow-[0_4px_16px_rgba(99,102,241,0.3)]"
                      : "bg-[#e2e2e2] text-[#848484] cursor-not-allowed"
                  }`}
                  disabled={selectedCandidates.size === 0 || !deadline}
                  onClick={() => setOutreachSent(true)}
                  type="button"
                >
                  Send Outreach
                  <span className="material-symbols-outlined text-[16px]">
                    send
                  </span>
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-6 flex items-center gap-3 bg-green-50 border border-green-200 rounded-2xl p-5 animate-fade-rise">
              <span className="material-symbols-outlined text-[24px] text-green-600">
                check_circle
              </span>
              <div>
                <p className="font-[Inter] text-sm font-semibold text-green-800">
                  Outreach sent to {selectedCandidates.size} candidates
                </p>
                <p className="font-[Inter] text-[12px] text-green-600 mt-0.5">
                  Candidates will receive an email &amp; portal notification
                  with a deadline of{" "}
                  {new Date(deadline).toLocaleString("en-IN", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

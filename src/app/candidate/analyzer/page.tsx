"use client";

const OVERALL_SCORE = 78;

const BREAKDOWN = [
  { label: "Skills Coverage", score: 85, color: "#6366f1" },
  { label: "Experience Depth", score: 72, color: "#8b5cf6" },
  { label: "Project Impact", score: 68, color: "#3b82f6" },
  { label: "Communication", score: 82, color: "#10b981" },
  { label: "Market Demand", score: 91, color: "#f59e0b" },
];

const SUGGESTIONS = [
  {
    text: 'Add 2-3 quantified achievements to your current role (e.g., "reduced load time by 40%")',
    severity: "quick",
    icon: "check_circle",
    color: "#10b981",
  },
  {
    text: "Include a link to your portfolio or a live project demo",
    severity: "quick",
    icon: "check_circle",
    color: "#10b981",
  },
  {
    text: "Add Docker and CI/CD experience — these appear in 73% of matching job descriptions",
    severity: "moderate",
    icon: "info",
    color: "#f59e0b",
  },
  {
    text: "Obtain an AWS certification to strengthen your cloud credentials",
    severity: "moderate",
    icon: "info",
    color: "#f59e0b",
  },
  {
    text: "Gain distributed systems experience — this is a top skill gap for Staff-level roles",
    severity: "high",
    icon: "priority_high",
    color: "#f43f5e",
  },
  {
    text: "Consider contributing to popular open-source projects to boost your GitHub presence",
    severity: "moderate",
    icon: "info",
    color: "#f59e0b",
  },
];

const SKILL_GAPS = [
  { skill: "Kubernetes", demand: 89, yours: 45 },
  { skill: "System Design", demand: 92, yours: 55 },
  { skill: "GraphQL", demand: 71, yours: 30 },
  { skill: "Rust", demand: 64, yours: 10 },
  { skill: "Terraform", demand: 68, yours: 20 },
];

function ScoreCircle({ score }: { score: number }) {
  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (score / 100) * circumference;
  const getColor = (s: number) =>
    s >= 80 ? "#10b981" : s >= 60 ? "#f59e0b" : "#f43f5e";
  return (
    <div className="relative w-36 h-36">
      <svg className="w-36 h-36 -rotate-90" viewBox="0 0 120 120">
        <circle
          cx="60"
          cy="60"
          fill="none"
          r="54"
          stroke="#f3f3f3"
          strokeWidth="6"
        />
        <circle
          cx="60"
          cy="60"
          fill="none"
          r="54"
          stroke={getColor(score)}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          strokeWidth="6"
          style={{ transition: "stroke-dashoffset 1.5s ease-out" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-[Inter] text-[32px] font-bold text-black">
          {score}
        </span>
        <span className="font-[Inter] text-[11px] text-[#848484] uppercase tracking-wider">
          out of 100
        </span>
      </div>
    </div>
  );
}

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

      {/* Score + Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-6 animate-fade-rise-delay">
        <section className="bg-white border border-[#cfc4c5] rounded-xl p-8 flex flex-col items-center gap-4">
          <h3 className="font-[Inter] text-[12px] font-semibold tracking-[0.08em] text-[#4c4546] uppercase">
            Overall Score
          </h3>
          <ScoreCircle score={OVERALL_SCORE} />
          <p className="font-[Inter] text-[13px] text-[#4c4546] text-center max-w-[200px]">
            Your profile is{" "}
            <span className="font-semibold text-[#f59e0b]">above average</span>{" "}
            — a few tweaks can push it into the top tier.
          </p>
          <button
            className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white rounded-full font-[Inter] text-[12px] font-semibold uppercase tracking-widest hover:shadow-[0_4px_16px_rgba(99,102,241,0.3)] transition-all cursor-pointer mt-2"
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">
              refresh
            </span>
            Re-Analyze
          </button>
        </section>

        <section className="bg-white border border-[#cfc4c5] rounded-xl p-6 flex flex-col gap-4">
          <h3 className="font-[Inter] text-[12px] font-semibold tracking-[0.08em] text-[#4c4546] uppercase">
            Score Breakdown
          </h3>
          <div className="flex flex-col gap-4">
            {BREAKDOWN.map((item) => (
              <div key={item.label} className="flex items-center gap-4">
                <span className="font-[Inter] text-[13px] text-black w-36 shrink-0">
                  {item.label}
                </span>
                <div className="flex-1 h-2 bg-[#f3f3f3] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000 ease-out"
                    style={{
                      width: `${item.score}%`,
                      backgroundColor: item.color,
                    }}
                  />
                </div>
                <span
                  className="font-[Inter] text-[14px] font-bold w-8 text-right"
                  style={{ color: item.color }}
                >
                  {item.score}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* AI Suggestions */}
      <section className="animate-fade-rise-delay-2">
        <h3 className="font-[Inter] text-[12px] font-semibold tracking-[0.08em] text-[#4c4546] uppercase mb-4">
          AI Recommendations
        </h3>
        <div className="bg-white border border-[#cfc4c5] rounded-xl overflow-hidden">
          {SUGGESTIONS.map((s, i) => (
            <div
              key={i}
              className={`flex items-start gap-4 px-6 py-4 hover:bg-[#fafafa] transition-colors ${i < SUGGESTIONS.length - 1 ? "border-b border-[#cfc4c5]/20" : ""}`}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                style={{ backgroundColor: s.color + "15" }}
              >
                <span
                  className="material-symbols-outlined text-[18px]"
                  style={{ color: s.color }}
                >
                  {s.icon}
                </span>
              </div>
              <div className="flex-1">
                <p className="font-[Inter] text-[14px] text-black">{s.text}</p>
              </div>
              <span
                className={`px-2.5 py-0.5 rounded-full font-[Inter] text-[10px] font-semibold uppercase tracking-wider shrink-0 ${
                  s.severity === "quick"
                    ? "bg-[#ecfdf5] text-[#059669]"
                    : s.severity === "moderate"
                      ? "bg-[#fffbeb] text-[#d97706]"
                      : "bg-[#fff1f2] text-[#e11d48]"
                }`}
              >
                {s.severity === "quick"
                  ? "Quick Win"
                  : s.severity === "moderate"
                    ? "Medium"
                    : "High Impact"}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Skill Gap Analysis */}
      <section>
        <h3 className="font-[Inter] text-[12px] font-semibold tracking-[0.08em] text-[#4c4546] uppercase mb-4">
          Skill Gap Analysis
        </h3>
        <div className="bg-white border border-[#cfc4c5] rounded-xl p-6">
          <div className="flex items-center gap-6 mb-4">
            <span className="flex items-center gap-2 font-[Inter] text-[11px] text-[#848484]">
              <span className="w-3 h-1.5 rounded-full bg-[#6366f1]" /> Market
              Demand
            </span>
            <span className="flex items-center gap-2 font-[Inter] text-[11px] text-[#848484]">
              <span className="w-3 h-1.5 rounded-full bg-[#10b981]" /> Your
              Level
            </span>
          </div>
          <div className="flex flex-col gap-4">
            {SKILL_GAPS.map((gap) => (
              <div key={gap.skill} className="flex flex-col gap-1.5">
                <span className="font-[Inter] text-[13px] font-medium text-black">
                  {gap.skill}
                </span>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-[#f3f3f3] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#6366f1] rounded-full transition-all duration-700"
                        style={{ width: `${gap.demand}%` }}
                      />
                    </div>
                    <span className="font-[Inter] text-[11px] text-[#6366f1] w-6 text-right font-semibold">
                      {gap.demand}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-[#f3f3f3] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#10b981] rounded-full transition-all duration-700"
                        style={{ width: `${gap.yours}%` }}
                      />
                    </div>
                    <span className="font-[Inter] text-[11px] text-[#10b981] w-6 text-right font-semibold">
                      {gap.yours}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

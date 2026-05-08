"use client";

const MARKET_SCORE = 82;

const TRENDING_SKILLS = [
  { skill: "AI/ML Engineering", demand: 95, trend: "+18%", color: "#6366f1" },
  { skill: "Rust", demand: 82, trend: "+24%", color: "#f59e0b" },
  { skill: "Kubernetes", demand: 88, trend: "+12%", color: "#3b82f6" },
  { skill: "Next.js", demand: 79, trend: "+15%", color: "#10b981" },
  { skill: "System Design", demand: 91, trend: "+8%", color: "#8b5cf6" },
  { skill: "DevOps/SRE", demand: 85, trend: "+11%", color: "#06b6d4" },
];

const SALARY_DATA = {
  role: "Full-Stack Developer",
  level: "Mid-Senior",
  min: 120,
  median: 175,
  max: 240,
  yours: 160,
  currency: "$",
  unit: "k/yr",
};

const INDUSTRY_DEMAND = [
  {
    industry: "AI/ML Startups",
    activity: "Very High",
    openRoles: 2400,
    icon: "auto_awesome",
    color: "#6366f1",
    bg: "#eef2ff",
  },
  {
    industry: "FinTech",
    activity: "High",
    openRoles: 1800,
    icon: "account_balance",
    color: "#10b981",
    bg: "#ecfdf5",
  },
  {
    industry: "Developer Tools",
    activity: "High",
    openRoles: 1200,
    icon: "code",
    color: "#3b82f6",
    bg: "#eff6ff",
  },
  {
    industry: "Cloud / Infra",
    activity: "Moderate",
    openRoles: 950,
    icon: "cloud",
    color: "#f59e0b",
    bg: "#fffbeb",
  },
];

const CAREER_PATH = [
  {
    role: "Full-Stack Developer",
    level: "Current",
    timeframe: "Now",
    active: true,
  },
  {
    role: "Senior Full-Stack Engineer",
    level: "Next Step",
    timeframe: "1-2 years",
    active: false,
  },
  {
    role: "Staff Engineer / Tech Lead",
    level: "Growth",
    timeframe: "3-5 years",
    active: false,
  },
  {
    role: "Engineering Manager / Principal",
    level: "Leadership",
    timeframe: "5+ years",
    active: false,
  },
];

const LEARNING = [
  {
    title: "System Design for Interviews",
    provider: "Educative",
    type: "Course",
    priority: "High",
    color: "#f43f5e",
    icon: "school",
  },
  {
    title: "AWS Solutions Architect",
    provider: "AWS",
    type: "Certification",
    priority: "Medium",
    color: "#f59e0b",
    icon: "workspace_premium",
  },
  {
    title: "Advanced TypeScript Patterns",
    provider: "Total TypeScript",
    type: "Course",
    priority: "Quick Win",
    color: "#10b981",
    icon: "code",
  },
  {
    title: "Kubernetes for Developers",
    provider: "Linux Foundation",
    type: "Certification",
    priority: "Medium",
    color: "#f59e0b",
    icon: "deployed_code",
  },
];

function MarketScoreCircle({ score }: { score: number }) {
  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (score / 100) * circumference;
  return (
    <div className="relative w-32 h-32">
      <svg className="w-32 h-32 -rotate-90" viewBox="0 0 120 120">
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
          stroke="#6366f1"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          strokeWidth="6"
          style={{ transition: "stroke-dashoffset 1.5s ease-out" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-[Inter] text-[28px] font-bold text-black">
          {score}
        </span>
        <span className="font-[Inter] text-[10px] text-[#848484] uppercase tracking-wider">
          percentile
        </span>
      </div>
    </div>
  );
}

export default function InsightsPage() {
  const salaryRange = SALARY_DATA.max - SALARY_DATA.min;
  const medianPos =
    ((SALARY_DATA.median - SALARY_DATA.min) / salaryRange) * 100;
  const yoursPos = ((SALARY_DATA.yours - SALARY_DATA.min) / salaryRange) * 100;

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
          Insights & Career Intelligence
        </h1>
        <p className="font-[Inter] text-sm text-[#4c4546]">
          AI-powered market analysis based on your profile and current hiring
          trends
        </p>
      </section>

      {/* Market Position + Salary — 2 col */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-rise-delay">
        {/* Market Position */}
        <section className="bg-white border border-[#cfc4c5] rounded-xl p-6 flex items-center gap-6">
          <MarketScoreCircle score={MARKET_SCORE} />
          <div className="flex flex-col gap-2">
            <h3 className="font-[Inter] text-[12px] font-semibold tracking-[0.08em] text-[#4c4546] uppercase">
              Market Position
            </h3>
            <p className="font-[Inter] text-[14px] text-black leading-relaxed">
              You rank in the{" "}
              <span className="font-bold text-[#6366f1]">82nd percentile</span>{" "}
              among Full-Stack Developers in your experience range.
            </p>
            <p className="font-[Inter] text-[12px] text-[#848484]">
              Top candidates in your bracket have 2+ certifications and
              open-source contributions.
            </p>
          </div>
        </section>

        {/* Salary Insights */}
        <section className="bg-white border border-[#cfc4c5] rounded-xl p-6 flex flex-col gap-4">
          <h3 className="font-[Inter] text-[12px] font-semibold tracking-[0.08em] text-[#4c4546] uppercase">
            Salary Insights — {SALARY_DATA.role}
          </h3>
          <div className="relative mt-4 mb-8">
            {/* Range bar */}
            <div className="h-2 bg-gradient-to-r from-[#f3f3f3] via-[#10b981] to-[#f3f3f3] rounded-full" />
            {/* Min/Max labels */}
            <span className="absolute -bottom-5 left-0 font-[Inter] text-[11px] text-[#848484]">
              {SALARY_DATA.currency}
              {SALARY_DATA.min}
              {SALARY_DATA.unit}
            </span>
            <span className="absolute -bottom-5 right-0 font-[Inter] text-[11px] text-[#848484]">
              {SALARY_DATA.currency}
              {SALARY_DATA.max}
              {SALARY_DATA.unit}
            </span>
            {/* Median marker */}
            <div
              className="absolute top-[-6px]"
              style={{ left: `${medianPos}%`, transform: "translateX(-50%)" }}
            >
              <div className="w-0.5 h-5 bg-[#4c4546]" />
              <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 font-[Inter] text-[10px] text-[#4c4546] whitespace-nowrap font-semibold">
                Median {SALARY_DATA.currency}
                {SALARY_DATA.median}k
              </span>
            </div>
            {/* Your position */}
            <div
              className="absolute top-[-8px]"
              style={{ left: `${yoursPos}%`, transform: "translateX(-50%)" }}
            >
              <div className="w-4 h-4 rounded-full bg-[#6366f1] border-2 border-white shadow-[0_0_8px_rgba(99,102,241,0.4)]" />
              <span className="absolute -top-5 left-1/2 -translate-x-1/2 font-[Inter] text-[10px] text-[#6366f1] whitespace-nowrap font-bold">
                You: {SALARY_DATA.currency}
                {SALARY_DATA.yours}k
              </span>
            </div>
          </div>
        </section>
      </div>

      {/* Trending Skills */}
      <section className="animate-fade-rise-delay-2">
        <h3 className="font-[Inter] text-[12px] font-semibold tracking-[0.08em] text-[#4c4546] uppercase mb-4">
          Trending Skills in Your Domain
        </h3>
        <div className="bg-white border border-[#cfc4c5] rounded-xl p-6">
          <div className="flex flex-col gap-4">
            {TRENDING_SKILLS.map((item) => (
              <div key={item.skill} className="flex items-center gap-4">
                <span className="font-[Inter] text-[13px] text-black w-40 shrink-0">
                  {item.skill}
                </span>
                <div className="flex-1 h-2 bg-[#f3f3f3] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000 ease-out"
                    style={{
                      width: `${item.demand}%`,
                      backgroundColor: item.color,
                    }}
                  />
                </div>
                <span
                  className="font-[Inter] text-[13px] font-bold w-8 text-right"
                  style={{ color: item.color }}
                >
                  {item.demand}
                </span>
                <span className="font-[Inter] text-[11px] font-semibold text-[#10b981] w-10 text-right">
                  {item.trend}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Demand */}
      <section>
        <h3 className="font-[Inter] text-[12px] font-semibold tracking-[0.08em] text-[#4c4546] uppercase mb-4">
          Industry Hiring Activity
        </h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {INDUSTRY_DEMAND.map((ind) => (
            <div
              key={ind.industry}
              className="bg-white border border-[#cfc4c5] rounded-xl p-5 flex flex-col gap-3 hover:border-black transition-all duration-500 group"
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform"
                style={{ backgroundColor: ind.bg }}
              >
                <span
                  className="material-symbols-outlined text-[20px]"
                  style={{ color: ind.color }}
                >
                  {ind.icon}
                </span>
              </div>
              <p className="font-[Inter] text-[14px] font-semibold text-black">
                {ind.industry}
              </p>
              <div className="flex items-center justify-between">
                <span
                  className={`px-2 py-0.5 rounded-full font-[Inter] text-[10px] font-semibold uppercase tracking-wider ${
                    ind.activity === "Very High"
                      ? "bg-[#ecfdf5] text-[#059669]"
                      : ind.activity === "High"
                        ? "bg-[#eff6ff] text-[#2563eb]"
                        : "bg-[#fffbeb] text-[#d97706]"
                  }`}
                >
                  {ind.activity}
                </span>
                <span className="font-[Inter] text-[12px] text-[#848484]">
                  {ind.openRoles.toLocaleString()} roles
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Career Path */}
      <section>
        <h3 className="font-[Inter] text-[12px] font-semibold tracking-[0.08em] text-[#4c4546] uppercase mb-4">
          Suggested Career Path
        </h3>
        <div className="bg-white border border-[#cfc4c5] rounded-xl p-6">
          <div className="flex items-center gap-0">
            {CAREER_PATH.map((step, i) => (
              <div key={i} className="flex items-center flex-1">
                <div className="flex flex-col items-center gap-2 flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      step.active
                        ? "bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] text-white shadow-[0_0_12px_rgba(99,102,241,0.3)]"
                        : "bg-[#f3f3f3] text-[#4c4546]"
                    }`}
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {step.active ? "person" : "arrow_forward"}
                    </span>
                  </div>
                  <div className="text-center">
                    <p
                      className={`font-[Inter] text-[13px] font-semibold ${step.active ? "text-[#6366f1]" : "text-black"}`}
                    >
                      {step.role}
                    </p>
                    <p className="font-[Inter] text-[11px] text-[#848484]">
                      {step.timeframe}
                    </p>
                  </div>
                </div>
                {i < CAREER_PATH.length - 1 && (
                  <div
                    className={`h-0.5 w-8 shrink-0 ${step.active ? "bg-[#6366f1]" : "bg-[#e2e2e2]"}`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Recommendations */}
      <section>
        <h3 className="font-[Inter] text-[12px] font-semibold tracking-[0.08em] text-[#4c4546] uppercase mb-4">
          Recommended Learning
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {LEARNING.map((item, i) => (
            <div
              key={i}
              className="bg-white border border-[#cfc4c5] rounded-xl p-5 flex items-start gap-4 hover:border-black transition-all duration-500 group"
            >
              <div className="w-10 h-10 rounded-xl bg-[#eef2ff] flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[20px] text-[#6366f1]">
                  {item.icon}
                </span>
              </div>
              <div className="flex-1">
                <p className="font-[Inter] text-[14px] font-semibold text-black">
                  {item.title}
                </p>
                <p className="font-[Inter] text-[12px] text-[#4c4546]">
                  {item.provider} · {item.type}
                </p>
              </div>
              <span
                className={`px-2.5 py-0.5 rounded-full font-[Inter] text-[10px] font-semibold uppercase tracking-wider shrink-0 ${
                  item.priority === "High"
                    ? "bg-[#fff1f2] text-[#e11d48]"
                    : item.priority === "Medium"
                      ? "bg-[#fffbeb] text-[#d97706]"
                      : "bg-[#ecfdf5] text-[#059669]"
                }`}
              >
                {item.priority}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

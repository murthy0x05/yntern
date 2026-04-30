"use client";

import { useState } from "react";

const CANDIDATES = [
  {
    id: 1, name: "Maya Chen", title: "Staff Software Engineer", company: "Stripe", location: "San Francisco, CA", initials: "MC", experience: "8 years",
    skills: ["Go", "Distributed Systems", "Kubernetes", "gRPC", "PostgreSQL"], matchScore: 94, interestScore: 87,
    matchBreakdown: [
      { label: "Technical Skills", score: 96 },
      { label: "Experience Level", score: 92 },
      { label: "Domain Expertise", score: 95 },
      { label: "Cultural Fit", score: 88 },
      { label: "Leadership", score: 90 },
    ],
    experienceTimeline: [
      { role: "Staff Software Engineer", company: "Stripe", period: "2022 – Present" },
      { role: "Senior Engineer", company: "Uber", period: "2019 – 2022" },
      { role: "Software Engineer", company: "MongoDB", period: "2016 – 2019" },
    ],
    conversation: [
      { sender: "ai", text: "Hi Maya! I came across your profile and was impressed by your distributed systems work at Stripe. We have an exciting Staff Engineer role — would you be open to learning more?" },
      { sender: "candidate", text: "Hi! Thanks for reaching out. I'm always open to hearing about interesting opportunities. What's the tech stack like?" },
      { sender: "ai", text: "The stack is Go-based with heavy use of Kubernetes and gRPC — right up your alley. The team is building a next-gen real-time data platform. Interested in a deeper conversation?" },
      { sender: "candidate", text: "That sounds very aligned with what I've been doing. I'd love to chat with the hiring manager. Can we set something up for next week?" },
    ],
  },
  {
    id: 2, name: "Arjun Patel", title: "Senior Backend Engineer", company: "Confluent", location: "Remote (US)", initials: "AP", experience: "6 years",
    skills: ["Java", "Kafka", "AWS", "Microservices", "Spring Boot"], matchScore: 91, interestScore: 72,
    matchBreakdown: [
      { label: "Technical Skills", score: 93 },
      { label: "Experience Level", score: 85 },
      { label: "Domain Expertise", score: 90 },
      { label: "Cultural Fit", score: 92 },
      { label: "Leadership", score: 78 },
    ],
    experienceTimeline: [
      { role: "Senior Backend Engineer", company: "Confluent", period: "2021 – Present" },
      { role: "Backend Engineer", company: "Twitter", period: "2019 – 2021" },
    ],
    conversation: [
      { sender: "ai", text: "Hi Arjun! Your Kafka expertise at Confluent caught our attention. We're looking for a senior engineer who can lead our event-driven architecture. Interested?" },
      { sender: "candidate", text: "Thanks! I'm fairly happy at Confluent but open to hearing more. What's the team size and scope?" },
      { sender: "ai", text: "The team is 12 engineers, and the role involves both IC work and technical mentoring. Competitive equity package too." },
      { sender: "candidate", text: "Sounds interesting. Let me think about it and get back to you by end of week." },
    ],
  },
  {
    id: 3, name: "Sarah Kim", title: "Principal Engineer", company: "Datadog", location: "New York, NY", initials: "SK", experience: "10 years",
    skills: ["Python", "Observability", "Terraform", "CI/CD", "Go"], matchScore: 88, interestScore: 91,
    matchBreakdown: [
      { label: "Technical Skills", score: 90 },
      { label: "Experience Level", score: 95 },
      { label: "Domain Expertise", score: 85 },
      { label: "Cultural Fit", score: 86 },
      { label: "Leadership", score: 94 },
    ],
    experienceTimeline: [
      { role: "Principal Engineer", company: "Datadog", period: "2020 – Present" },
      { role: "Staff Engineer", company: "Netflix", period: "2016 – 2020" },
      { role: "Senior SRE", company: "Google", period: "2014 – 2016" },
    ],
    conversation: [
      { sender: "ai", text: "Hi Sarah! With your principal-level experience across Datadog, Netflix, and Google, you'd be an incredible fit for our Staff Engineer role. Would love to chat!" },
      { sender: "candidate", text: "I appreciate you reaching out! I've actually been looking for my next challenge. Tell me about the company culture." },
      { sender: "ai", text: "We value engineering excellence, async-first communication, and deep technical ownership. Engineers own their services end-to-end." },
      { sender: "candidate", text: "That's exactly what I'm looking for. Let's schedule a call — I'm very interested!" },
    ],
  },
  {
    id: 4, name: "Fatima Al-Rashid", title: "ML Infrastructure Engineer", company: "DeepMind", location: "London, UK", initials: "FA", experience: "7 years",
    skills: ["Python", "TensorFlow", "CUDA", "MLOps", "Kubernetes"], matchScore: 82, interestScore: 94,
    matchBreakdown: [
      { label: "Technical Skills", score: 88 },
      { label: "Experience Level", score: 80 },
      { label: "Domain Expertise", score: 75 },
      { label: "Cultural Fit", score: 90 },
      { label: "Leadership", score: 78 },
    ],
    experienceTimeline: [
      { role: "ML Infrastructure Engineer", company: "DeepMind", period: "2021 – Present" },
      { role: "ML Engineer", company: "Spotify", period: "2018 – 2021" },
    ],
    conversation: [
      { sender: "ai", text: "Hi Fatima! Your ML infrastructure work at DeepMind is impressive. We're building a platform that could benefit from your expertise. Open to exploring?" },
      { sender: "candidate", text: "Absolutely! I've been looking to apply my skills in a product-focused environment. What ML challenges are you tackling?" },
      { sender: "ai", text: "We're building real-time recommendation and matching systems at scale. Your CUDA and MLOps experience would be incredibly valuable." },
      { sender: "candidate", text: "This sounds fantastic. I'd love to have a technical deep-dive with your team. When can we schedule it?" },
    ],
  },
];

function ScoreCircle({ score, label, color }: { score: number; label: string; color: string }) {
  const circumference = 2 * Math.PI * 36;
  const offset = circumference - (score / 100) * circumference;
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-20 h-20">
        <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
          <circle cx="40" cy="40" fill="none" r="36" stroke="#f3f3f3" strokeWidth="5" />
          <circle cx="40" cy="40" fill="none" r="36" stroke={color} strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" strokeWidth="5" style={{ transition: "stroke-dashoffset 1s ease-out" }} />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-[Inter] text-[18px] font-bold text-black">{score}</span>
        </div>
      </div>
      <span className="font-[Inter] text-[11px] font-semibold text-[#4c4546] uppercase tracking-wide">{label}</span>
    </div>
  );
}

export default function TheaterPage() {
  const [activeId, setActiveId] = useState(1);
  const active = CANDIDATES.find((c) => c.id === activeId)!;

  return (
    <div className="flex-1 flex h-[calc(100vh-56px)] overflow-hidden">
      {/* Left Panel — Candidate List */}
      <div className="w-[320px] border-r border-[#cfc4c5] bg-white overflow-y-auto shrink-0">
        <div className="p-4 border-b border-[#cfc4c5]/30">
          <h2 className="text-black mb-1" style={{ fontFamily: "'Instrument Serif'", fontSize: "24px", lineHeight: "1.2" }}>Shortlist</h2>
          <p className="font-[Inter] text-[12px] text-[#848484]">{CANDIDATES.length} candidates</p>
        </div>
        <div className="flex flex-col">
          {CANDIDATES.map((c) => (
            <button key={c.id} className={`w-full flex items-start gap-3 p-4 text-left transition-all duration-300 cursor-pointer border-b border-[#cfc4c5]/15 ${activeId === c.id ? "bg-[#f3f3f3]" : "hover:bg-[#fafafa]"}`} onClick={() => setActiveId(c.id)} type="button">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center text-[12px] font-semibold shrink-0 ${activeId === c.id ? "bg-black text-white" : "bg-[#eeeeee] text-[#4c4546]"}`}>{c.initials}</div>
              <div className="min-w-0 flex-1">
                <p className="font-[Inter] text-[13px] font-semibold text-black truncate">{c.name}</p>
                <p className="font-[Inter] text-[12px] text-[#4c4546] truncate">{c.title}</p>
                <div className="flex items-center gap-3 mt-1.5">
                  <span className="font-[Inter] text-[11px] text-[#848484]">M: {c.matchScore}</span>
                  <span className="font-[Inter] text-[11px] text-[#848484]">I: {c.interestScore}</span>
                </div>
              </div>
              {activeId === c.id && <div className="w-0.5 h-full bg-black absolute right-0 top-0" />}
            </button>
          ))}
        </div>
      </div>

      {/* Right Panel — Profile Detail */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-8 py-8 flex flex-col gap-8">
          {/* Hero */}
          <section className="flex items-start gap-5">
            <div className="w-16 h-16 rounded-full bg-black flex items-center justify-center text-white text-[20px] font-semibold shrink-0">{active.initials}</div>
            <div className="flex-1">
              <h1 className="text-black mb-1" style={{ fontFamily: "'Instrument Serif'", fontSize: "32px", lineHeight: "1.2" }}>{active.name}</h1>
              <p className="font-[Inter] text-[14px] text-[#4c4546]">{active.title} · {active.company}</p>
              <p className="font-[Inter] text-[13px] text-[#848484] mt-0.5">{active.location} · {active.experience}</p>
            </div>
          </section>

          {/* Scores */}
          <section className="flex items-center gap-10 p-6 bg-white border border-[#cfc4c5] rounded-xl">
            <ScoreCircle color="#1b1b1b" label="Match" score={active.matchScore} />
            <ScoreCircle color="#4c4546" label="Interest" score={active.interestScore} />
            <div className="flex-1 flex flex-col gap-2.5 pl-6 border-l border-[#cfc4c5]/30">
              {active.matchBreakdown.map((b) => (
                <div key={b.label} className="flex items-center gap-3">
                  <span className="font-[Inter] text-[11px] text-[#4c4546] w-28 shrink-0">{b.label}</span>
                  <div className="flex-1 h-1.5 bg-[#f3f3f3] rounded-full overflow-hidden">
                    <div className="h-full bg-black rounded-full transition-all duration-700" style={{ width: `${b.score}%` }} />
                  </div>
                  <span className="font-[Inter] text-[11px] font-semibold text-black w-6 text-right">{b.score}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Skills */}
          <section>
            <h3 className="font-[Inter] text-[12px] font-semibold tracking-[0.08em] text-[#4c4546] uppercase mb-3">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {active.skills.map((s) => (
                <span key={s} className="px-3.5 py-1.5 bg-[#f3f3f3] border border-[#cfc4c5]/30 rounded-full font-[Inter] text-[12px] font-medium text-black">{s}</span>
              ))}
            </div>
          </section>

          {/* Experience */}
          <section>
            <h3 className="font-[Inter] text-[12px] font-semibold tracking-[0.08em] text-[#4c4546] uppercase mb-4">Experience</h3>
            <div className="flex flex-col gap-0">
              {active.experienceTimeline.map((exp, i) => (
                <div key={i} className="flex gap-4 relative pl-6">
                  <div className="absolute left-[7px] top-2 w-2 h-2 rounded-full bg-black" />
                  {i < active.experienceTimeline.length - 1 && <div className="absolute left-[10px] top-5 bottom-0 w-px bg-[#cfc4c5]" />}
                  <div className="pb-6">
                    <p className="font-[Inter] text-[14px] font-semibold text-black">{exp.role}</p>
                    <p className="font-[Inter] text-[13px] text-[#4c4546]">{exp.company} · {exp.period}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Conversation Log */}
          <section>
            <h3 className="font-[Inter] text-[12px] font-semibold tracking-[0.08em] text-[#4c4546] uppercase mb-4">AI Outreach Conversation</h3>
            <div className="flex flex-col gap-3 bg-[#fafafa] border border-[#cfc4c5]/30 rounded-xl p-5">
              {active.conversation.map((msg, i) => (
                <div key={i} className={`flex gap-3 ${msg.sender === "ai" ? "" : "flex-row-reverse"}`}>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-semibold shrink-0 ${msg.sender === "ai" ? "bg-[#eeeeee] text-[#4c4546]" : "bg-black text-white"}`}>
                    {msg.sender === "ai" ? <span className="material-symbols-outlined text-[14px]">smart_toy</span> : active.initials}
                  </div>
                  <div className={`max-w-[75%] px-4 py-2.5 rounded-2xl font-[Inter] text-[13px] leading-relaxed ${msg.sender === "ai" ? "bg-white border border-[#cfc4c5]/30 text-black rounded-tl-sm" : "bg-black text-white rounded-tr-sm"}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Actions */}
          <section className="flex items-center gap-3 pt-2 pb-4">
            <button className="flex items-center gap-2 px-6 py-2.5 bg-black text-white rounded-full font-[Inter] text-[12px] font-semibold uppercase tracking-widest hover:bg-black/90 transition-all cursor-pointer" type="button">
              <span className="material-symbols-outlined text-[16px]">star</span>
              Shortlist
            </button>
            <button className="flex items-center gap-2 px-6 py-2.5 border border-[#cfc4c5] text-black rounded-full font-[Inter] text-[12px] font-semibold uppercase tracking-widest hover:border-black transition-all cursor-pointer" type="button">
              <span className="material-symbols-outlined text-[16px]">calendar_month</span>
              Schedule Interview
            </button>
            <button className="flex items-center gap-2 px-6 py-2.5 border border-[#cfc4c5] text-[#4c4546] rounded-full font-[Inter] text-[12px] font-semibold uppercase tracking-widest hover:border-black hover:text-black transition-all cursor-pointer" type="button">
              Pass
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}

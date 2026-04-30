"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

const TEMPLATES = [
  { label: "Software Engineer", icon: "code", jd: "We are looking for a Software Engineer with 3+ years of experience in full-stack development. Proficiency in React, Node.js, and cloud infrastructure (AWS/GCP) is required. The ideal candidate thrives in fast-paced startup environments and writes clean testable code." },
  { label: "Product Manager", icon: "inventory_2", jd: "Seeking a Product Manager to own the end-to-end product lifecycle for our B2B SaaS platform. 5+ years of PM experience, strong analytical skills, and a track record of shipping 0-to-1 products required." },
  { label: "Data Scientist", icon: "query_stats", jd: "We need a Data Scientist proficient in Python, SQL, and ML frameworks (TensorFlow/PyTorch). The role involves building predictive models, running A/B tests, and deriving actionable insights from large datasets." },
  { label: "UX Designer", icon: "palette", jd: "Looking for a UX Designer with exceptional interaction design and user research skills. You'll lead design for our consumer mobile app, conducting usability testing and creating high-fidelity prototypes in Figma." },
];

export default function JDInputPage() {
  const [jdText, setJdText] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();

  useEffect(() => {
    const ta = textareaRef.current;
    if (ta) {
      ta.style.height = "auto";
      ta.style.height = Math.max(56, Math.min(ta.scrollHeight, 320)) + "px";
    }
  }, [jdText]);

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 pb-16">
      <div className="text-center mb-10 animate-fade-rise">
        <h1 className="text-black mb-3" style={{ fontFamily: "'Instrument Serif'", fontSize: "44px", lineHeight: "1.15", letterSpacing: "-0.5px" }}>
          What role are you hiring for?
        </h1>
        <p className="font-[Inter] text-sm text-[#4c4546] max-w-lg mx-auto">
          Paste a complete job description or describe the ideal candidate — our AI will find the best matches.
        </p>
      </div>

      <div className={`w-full max-w-2xl animate-fade-rise-delay transition-all duration-500 ${isFocused ? "shadow-[0_0_0_1px_rgba(0,0,0,1),0_8px_40px_rgba(0,0,0,0.06)]" : "shadow-[0_0_0_1px_rgba(207,196,197,1),0_2px_12px_rgba(0,0,0,0.03)]"} rounded-2xl bg-white`}>
        <div className="px-5 pt-5 pb-2">
          <textarea ref={textareaRef} className="w-full bg-transparent border-none resize-none focus:ring-0 font-[Inter] text-sm text-black placeholder:text-[#848484] outline-none leading-relaxed" onBlur={() => setIsFocused(false)} onChange={(e) => setJdText(e.target.value)} onFocus={() => setIsFocused(true)} onKeyDown={(e) => { if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) router.push("/dashboard/discover"); }} placeholder="Describe the role, required skills, experience level, and any cultural fit attributes..." rows={1} style={{ minHeight: "56px" }} value={jdText} />
        </div>
        <div className="flex items-center justify-between px-4 py-3 border-t border-[#cfc4c5]/30 bg-[#fafafa] rounded-b-2xl">
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-[#4c4546] hover:text-black hover:bg-[#eeeeee] rounded-lg transition-all text-sm cursor-pointer" type="button">
              <span className="material-symbols-outlined text-[18px]">upload_file</span>
              <span className="font-[Inter] text-[12px] font-medium hidden sm:inline">Upload JD</span>
            </button>
            <div className="w-px h-5 bg-[#cfc4c5]/50" />
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-[#4c4546] hover:text-black hover:bg-[#eeeeee] rounded-lg transition-all text-sm cursor-pointer" type="button">
              <span className="material-symbols-outlined text-[18px]">smart_toy</span>
              <span className="font-[Inter] text-[12px] font-medium hidden sm:inline">Gemini Pro</span>
              <span className="material-symbols-outlined text-[14px]">expand_more</span>
            </button>
          </div>
          <button className={`flex items-center gap-2 px-5 py-2 rounded-full font-[Inter] text-[12px] font-semibold uppercase tracking-widest transition-all duration-300 cursor-pointer ${jdText.trim() ? "bg-black text-white hover:bg-black/90" : "bg-[#e2e2e2] text-[#848484] cursor-not-allowed"}`} disabled={!jdText.trim()} onClick={() => jdText.trim() && router.push("/dashboard/discover")} type="button">
            Scout Candidates
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>
      </div>

      <div className="mt-8 flex flex-col items-center gap-3 animate-fade-rise-delay-2">
        <p className="font-[Inter] text-[12px] font-semibold tracking-[0.08em] text-[#848484] uppercase">Quick templates</p>
        <div className="flex flex-wrap justify-center gap-2">
          {TEMPLATES.map((t) => (
            <button key={t.label} className="flex items-center gap-1.5 px-4 py-2 border border-[#cfc4c5] rounded-full font-[Inter] text-[13px] text-[#4c4546] hover:border-black hover:text-black hover:bg-white transition-all duration-300 cursor-pointer bg-white/60" onClick={() => { setJdText(t.jd); textareaRef.current?.focus(); }} type="button">
              <span className="material-symbols-outlined text-[16px]">{t.icon}</span>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-6 font-[Inter] text-[11px] text-[#848484]">
        Press <kbd className="px-1.5 py-0.5 bg-[#f3f3f3] border border-[#cfc4c5]/50 rounded text-[10px] font-mono">Ctrl</kbd> + <kbd className="px-1.5 py-0.5 bg-[#f3f3f3] border border-[#cfc4c5]/50 rounded text-[10px] font-mono">Enter</kbd> to submit
      </p>
    </div>
  );
}

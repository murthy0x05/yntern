"use client";

/**
 * JDInput — Job Description input with demo mode button.
 * Step 1 of the pipeline.
 */
import { useState } from "react";
import styles from "./JDInput.module.css";
import { DEMO_JD } from "@/lib/demoData";

export default function JDInput({ onSubmit, isLoading }) {
  const [jdText, setJdText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (jdText.trim().length >= 20) {
      onSubmit(jdText, false);
    }
  };

  const handleDemo = () => {
    setJdText(DEMO_JD);
    onSubmit(DEMO_JD, true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <div className={styles.badge}>
          <span className={styles.badgeDot} />
          AI-Powered Talent Intelligence
        </div>
        <h2 className={styles.heading}>
          Paste a Job Description.
          <br />
          <span className={styles.gradient}>Let AI find your perfect candidates.</span>
        </h2>
        <p className={styles.subtitle}>
          Our AI agent parses your JD, discovers matching candidates, simulates outreach
          conversations, and delivers a ranked shortlist — scored on both match quality
          and genuine interest.
        </p>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.textareaWrapper}>
          <textarea
            id="jd-input"
            className={styles.textarea}
            value={jdText}
            onChange={(e) => setJdText(e.target.value)}
            placeholder="Paste a full job description here... (minimum 20 characters)"
            rows={12}
            disabled={isLoading}
            aria-label="Job Description"
          />
          <div className={styles.textareaFooter}>
            <span className={styles.charCount}>
              {jdText.length} characters
              {jdText.length > 0 && jdText.length < 20 && (
                <span className={styles.warning}> — need at least 20</span>
              )}
            </span>
          </div>
        </div>

        <div className={styles.actions}>
          <button
            type="submit"
            className={`btn btn-primary btn-lg ${styles.submitBtn}`}
            disabled={isLoading || jdText.trim().length < 20}
          >
            {isLoading ? (
              <>
                <span className={styles.spinner} />
                Analyzing...
              </>
            ) : (
              <>
                🚀 Analyze & Scout
              </>
            )}
          </button>

          <button
            type="button"
            className={`btn btn-secondary ${styles.demoBtn}`}
            onClick={handleDemo}
            disabled={isLoading}
          >
            ⚡ Try Demo
          </button>
        </div>
      </form>

      <div className={styles.features}>
        {[
          { icon: "🧠", title: "Smart JD Parsing", desc: "Extracts skills, requirements, and culture signals" },
          { icon: "🔍", title: "AI Candidate Discovery", desc: "Finds and matches candidates with explainable scoring" },
          { icon: "💬", title: "Simulated Outreach", desc: "AI conversations to gauge genuine candidate interest" },
          { icon: "📊", title: "Ranked Shortlist", desc: "Dual-scored candidates: Match + Interest" },
        ].map((f) => (
          <div key={f.title} className={styles.feature}>
            <span className={styles.featureIcon}>{f.icon}</span>
            <h4 className={styles.featureTitle}>{f.title}</h4>
            <p className={styles.featureDesc}>{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

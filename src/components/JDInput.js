"use client";

/**
 * JDInput — Job Description input with simplified hero, tips, and example JD.
 */
import { useState } from "react";
import styles from "./JDInput.module.css";

const EXAMPLE_JD = `Senior Full-Stack Engineer — FinTech Startup (Series B)

About Us
We are a fast-growing FinTech company building the next generation of digital banking infrastructure. Backed by top-tier VCs, we serve 2M+ users and process $500M+ in monthly transactions.

Role Overview
We're looking for a Senior Full-Stack Engineer to lead development of customer-facing products across our web and mobile platforms. You'll work closely with product, design, and data teams to ship features that directly impact revenue.

Key Responsibilities
• Architect and build scalable web applications using React/Next.js and Node.js
• Design and implement RESTful APIs and GraphQL endpoints
• Lead code reviews, mentor junior engineers, and establish engineering best practices
• Collaborate with product managers to translate requirements into technical solutions
• Optimize application performance, security, and reliability
• Contribute to system design decisions and technical roadmap

Requirements
• 5+ years of professional software engineering experience
• Strong proficiency in TypeScript, React, and Node.js
• Experience with PostgreSQL, Redis, and cloud platforms (AWS or GCP)
• Familiarity with CI/CD pipelines, Docker, and microservices architecture
• Track record of shipping production-grade applications at scale
• Excellent communication and collaboration skills

Nice to Have
• Experience in FinTech, payments, or banking domains
• Knowledge of Kubernetes and infrastructure-as-code (Terraform)
• Contributions to open-source projects
• Experience with real-time systems (WebSockets, event-driven architecture)

Compensation
• $160K–$200K base + equity
• Remote-first with optional NYC/SF office
• Comprehensive benefits, 401k match, unlimited PTO`;

export default function JDInput({ onSubmit, isLoading }) {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (text.trim().length >= 20) {
      onSubmit(text, false);
    }
  };

  const handleDemo = () => {
    onSubmit(EXAMPLE_JD, true);
  };

  const handleLoadExample = () => {
    setText(EXAMPLE_JD);
  };

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <h1 className={styles.heading}>
          Welcome, Recruiter.
        </h1>
        <p className={styles.subtitle}>
          Paste a Job Description below and let our AI find, score, and engage your ideal candidates.
        </p>
      </div>

      <div className={styles.inputArea}>
        <textarea
          className={styles.textarea}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste your full job description here... (minimum 20 characters)"
          rows={10}
          disabled={isLoading}
        />
        <div className={styles.charCount}>
          {text.length} characters
        </div>
      </div>

      <div className={styles.actions}>
        <button
          className="btn btn-primary btn-lg"
          onClick={handleSubmit}
          disabled={isLoading || text.trim().length < 20}
        >
          Analyze & Scout
        </button>
        <button
          className="btn btn-secondary btn-lg"
          onClick={handleDemo}
          disabled={isLoading}
        >
          Quick Demo
        </button>
      </div>

      {/* Tips & Example */}
      <div className={styles.tipsSection}>
        <div className={styles.tipsCard}>
          <h3 className={styles.tipsTitle}>Tips for a great Job Description</h3>
          <ul className={styles.tipsList}>
            <li>Be specific about required skills, frameworks, and tools</li>
            <li>Include years of experience and seniority level</li>
            <li>Mention the team size, reporting structure, and work culture</li>
            <li>Add compensation range and benefits to attract top talent</li>
            <li>Describe key responsibilities and expected impact</li>
            <li>Specify location preference (remote, hybrid, on-site)</li>
          </ul>
        </div>
        <div className={styles.exampleCard}>
          <div className={styles.exampleHeader}>
            <h3 className={styles.tipsTitle}>Example JD</h3>
            <button
              className="btn btn-ghost btn-sm"
              onClick={handleLoadExample}
              disabled={isLoading}
            >
              Load this example
            </button>
          </div>
          <pre className={styles.exampleText}>
            {EXAMPLE_JD.slice(0, 400)}...
          </pre>
        </div>
      </div>
    </div>
  );
}

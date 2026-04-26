"use client";

/**
 * AgentThinking — Real-time AI processing visualization.
 * Shows pipeline steps, elapsed time, and animated progress during each stage.
 * Replaces the simple loading spinner with a premium "mission control" view.
 */
import { useState, useEffect, useRef } from "react";
import styles from "./AgentThinking.module.css";

const THINKING_PHASES = {
  "parse-jd": [
    { label: "Reading job description", duration: 800 },
    { label: "Extracting key requirements", duration: 1200 },
    { label: "Identifying required skills", duration: 1000 },
    { label: "Analyzing seniority & culture", duration: 900 },
    { label: "Structuring parsed output", duration: 600 },
  ],
  discover: [
    { label: "Initializing candidate pool", duration: 600 },
    { label: "Generating candidate profiles", duration: 1500 },
    { label: "Matching against requirements", duration: 1200 },
    { label: "Computing skill overlap scores", duration: 1000 },
    { label: "Ranking by match quality", duration: 800 },
  ],
  outreach: [
    { label: "Building candidate persona", duration: 700 },
    { label: "Crafting outreach strategy", duration: 900 },
    { label: "Simulating conversation", duration: 1800 },
    { label: "Analyzing sentiment signals", duration: 800 },
    { label: "Computing interest score", duration: 600 },
  ],
};

export default function AgentThinking({ stage = "parse-jd", message, isDemo }) {
  const phases = THINKING_PHASES[stage] || THINKING_PHASES["parse-jd"];
  const [activePhase, setActivePhase] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const startTime = useRef(Date.now());

  // Advance through phases
  useEffect(() => {
    if (activePhase >= phases.length) return;

    const timer = setTimeout(() => {
      setActivePhase((prev) => Math.min(prev + 1, phases.length - 1));
    }, phases[activePhase].duration);

    return () => clearTimeout(timer);
  }, [activePhase, phases]);

  // Elapsed time counter
  useEffect(() => {
    const interval = setInterval(() => {
      setElapsed(((Date.now() - startTime.current) / 1000).toFixed(1));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Token count simulation
  const estimatedTokens = Math.round(elapsed * 42 + Math.random() * 10);

  return (
    <div className={styles.overlay}>
      <div className={styles.card}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.pulseIndicator}>
            <span className={styles.pulseDot} />
            <span className={styles.headerLabel}>Agent Processing</span>
          </div>
          {isDemo && (
            <span className="badge badge-warning">Demo Mode</span>
          )}
        </div>

        {/* Main message */}
        <p className={styles.message}>{message}</p>

        {/* Phase timeline */}
        <div className={styles.phases}>
          {phases.map((phase, i) => {
            const isComplete = i < activePhase;
            const isActive = i === activePhase;
            const isPending = i > activePhase;

            return (
              <div
                key={i}
                className={`${styles.phase} ${isComplete ? styles.phaseComplete : ""} ${isActive ? styles.phaseActive : ""} ${isPending ? styles.phasePending : ""}`}
              >
                <div className={styles.phaseIcon}>
                  {isComplete ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : isActive ? (
                    <div className={styles.miniSpinner} />
                  ) : (
                    <span className={styles.phaseNumber}>{i + 1}</span>
                  )}
                </div>
                <span className={styles.phaseLabel}>{phase.label}</span>
              </div>
            );
          })}
        </div>

        {/* Metrics footer */}
        <div className={styles.metrics}>
          <div className={styles.metric}>
            <span className={styles.metricValue}>{elapsed}s</span>
            <span className={styles.metricLabel}>Elapsed</span>
          </div>
          <div className={styles.metric}>
            <span className={styles.metricValue}>{estimatedTokens}</span>
            <span className={styles.metricLabel}>Tokens</span>
          </div>
          <div className={styles.metric}>
            <span className={styles.metricValue}>{activePhase + 1}/{phases.length}</span>
            <span className={styles.metricLabel}>Steps</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className={styles.progressTrack}>
          <div
            className={styles.progressFill}
            style={{ width: `${((activePhase + 1) / phases.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}

"use client";

/**
 * CandidateCard — Expandable candidate card with match details, radar chart, and actions.
 */
import { useState } from "react";
import styles from "./CandidateCard.module.css";
import ScoreGauge from "./ScoreGauge";
import RadarChart from "./RadarChart";

export default function CandidateCard({ candidate, score, rank, onSimulateOutreach }) {
  const [expanded, setExpanded] = useState(false);

  if (!candidate || !score) return null;

  const initials = candidate.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div
      className={`${styles.card} ${expanded ? styles.expanded : ""}`}
      style={{ animationDelay: `${rank * 0.08}s` }}
    >
      {/* Header */}
      <div className={styles.header} onClick={() => setExpanded(!expanded)}>
        <div className={styles.rank}>#{rank}</div>
        <div className={styles.avatar}>{initials}</div>
        <div className={styles.info}>
          <h3 className={styles.name}>{candidate.name}</h3>
          <p className={styles.role}>
            {candidate.current_role} at <strong>{candidate.current_company}</strong>
          </p>
          <div className={styles.meta}>
            <span>{candidate.experience_years}y exp</span>
            <span>•</span>
            <span>{candidate.location}</span>
            <span>•</span>
            <span>{candidate.availability}</span>
          </div>
        </div>
        <div className={styles.scores}>
          <ScoreGauge score={score.match_score} label="Match" size={64} strokeWidth={5} />
        </div>
        <button
          className={styles.expandBtn}
          aria-label={expanded ? "Collapse" : "Expand"}
        >
          {expanded ? "▲" : "▼"}
        </button>
      </div>

      {/* Expanded Detail */}
      {expanded && (
        <div className={styles.detail}>
          <div className={styles.detailGrid}>
            {/* Left: Radar + Dimensions */}
            <div className={styles.radarSection}>
              <RadarChart scores={score.dimension_scores} size={200} />
              <div className={styles.dimensions}>
                {Object.entries(score.dimension_scores || {}).map(([key, val]) => (
                  <div key={key} className={styles.dimension}>
                    <span className={styles.dimLabel}>
                      {key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                    </span>
                    <div className={styles.dimBar}>
                      <div
                        className={styles.dimFill}
                        style={{
                          width: `${val}%`,
                          background:
                            val >= 80
                              ? "var(--success)"
                              : val >= 60
                                ? "var(--accent-light)"
                                : val >= 40
                                  ? "var(--warning)"
                                  : "var(--danger)",
                        }}
                      />
                    </div>
                    <span className={styles.dimValue}>{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Details */}
            <div className={styles.detailsSection}>
              {/* Explanation */}
              <div className={styles.block}>
                <h4 className={styles.blockTitle}>AI Assessment</h4>
                <p className={styles.explanation}>{score.explanation}</p>
              </div>

              {/* Skills Match */}
              <div className={styles.block}>
                <h4 className={styles.blockTitle}>Skills Analysis</h4>
                <div className={styles.skillsGrid}>
                  <div>
                    <span className={styles.skillsLabel}>✓ Matched</span>
                    <div className={styles.tags}>
                      {score.matched_skills?.map((s) => (
                        <span key={s} className="badge badge-success">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className={styles.skillsLabel}>✗ Missing</span>
                    <div className={styles.tags}>
                      {score.missing_skills?.map((s) => (
                        <span key={s} className="badge badge-danger">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Strengths & Concerns */}
              <div className={styles.twoCol}>
                <div className={styles.block}>
                  <h4 className={styles.blockTitle}>💪 Strengths</h4>
                  <ul className={styles.bulletList}>
                    {score.strengths?.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </div>
                <div className={styles.block}>
                  <h4 className={styles.blockTitle}>⚠️ Concerns</h4>
                  <ul className={styles.bulletList}>
                    {score.concerns?.map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Candidate Info */}
              <div className={styles.block}>
                <h4 className={styles.blockTitle}>Candidate Profile</h4>
                <p className={styles.summary}>{candidate.linkedin_summary}</p>
                <div className={styles.profileMeta}>
                  <span>🎓 {candidate.education}</span>
                  <span>💰 {candidate.salary_expectation}</span>
                  <span>
                    {candidate.open_to_change ? "🟢 Open to change" : "🔴 Not actively looking"}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className={styles.actions}>
                <button
                  className="btn btn-primary"
                  onClick={() => onSimulateOutreach?.(candidate)}
                >
                  💬 Simulate Outreach
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

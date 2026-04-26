"use client";

/**
 * JDAnalysis — Animated display of parsed JD results.
 * Shows extracted fields one-by-one with typing effects.
 */
import { useState, useEffect } from "react";
import styles from "./JDAnalysis.module.css";

export default function JDAnalysis({ parsedJD, onProceed, isDemo }) {
  const [visibleFields, setVisibleFields] = useState(0);
  const totalFields = 8;

  useEffect(() => {
    if (!parsedJD) return;
    const interval = setInterval(() => {
      setVisibleFields((v) => {
        if (v >= totalFields) {
          clearInterval(interval);
          return v;
        }
        return v + 1;
      });
    }, 200);
    return () => clearInterval(interval);
  }, [parsedJD]);

  if (!parsedJD) return null;

  const importanceColor = (imp) => {
    if (imp === "critical") return "badge-danger";
    if (imp === "high") return "badge-warning";
    return "badge-accent";
  };

  const confidenceColor = (conf) => {
    if (conf >= 0.85) return styles.confHigh;
    if (conf >= 0.65) return styles.confMedium;
    return styles.confLow;
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <div className={styles.statusRow}>
            {isDemo && <span className="badge badge-warning">Demo Data</span>}
            <span className="badge badge-success">✓ Parsed Successfully</span>
          </div>
          <h2 className={styles.title}>JD Analysis Complete</h2>
          <p className={styles.subtitle}>
            AI extracted {parsedJD.required_skills?.length || 0} required skills,{" "}
            {parsedJD.preferred_skills?.length || 0} preferred skills, and{" "}
            {parsedJD.culture_signals?.length || 0} culture signals.
          </p>
        </div>
        <button className="btn btn-primary" onClick={onProceed}>
          🔍 Discover Candidates →
        </button>
      </div>

      <div className={styles.grid}>
        {/* Role & Department */}
        {visibleFields >= 1 && (
          <div className={`${styles.field} animate-in`}>
            <span className={styles.fieldLabel}>Role</span>
            <span className={styles.fieldValue}>{parsedJD.role_title}</span>
          </div>
        )}

        {visibleFields >= 1 && (
          <div className={`${styles.field} animate-in`} style={{ animationDelay: "0.05s" }}>
            <span className={styles.fieldLabel}>Department</span>
            <span className={styles.fieldValue}>{parsedJD.department}</span>
          </div>
        )}

        {visibleFields >= 2 && (
          <div className={`${styles.field} animate-in`} style={{ animationDelay: "0.1s" }}>
            <span className={styles.fieldLabel}>Experience</span>
            <span className={styles.fieldValue}>
              {parsedJD.experience_range?.min}–{parsedJD.experience_range?.max} years
            </span>
          </div>
        )}

        {visibleFields >= 2 && (
          <div className={`${styles.field} animate-in`} style={{ animationDelay: "0.15s" }}>
            <span className={styles.fieldLabel}>Work Model</span>
            <span className={styles.fieldValue} style={{ textTransform: "capitalize" }}>
              {parsedJD.work_model || parsedJD.location}
            </span>
          </div>
        )}

        {visibleFields >= 3 && (
          <div className={`${styles.field} animate-in`} style={{ animationDelay: "0.2s" }}>
            <span className={styles.fieldLabel}>Compensation</span>
            <span className={styles.fieldValue}>{parsedJD.compensation_hint || "Not specified"}</span>
          </div>
        )}

        {visibleFields >= 3 && (
          <div className={`${styles.field} animate-in`} style={{ animationDelay: "0.25s" }}>
            <span className={styles.fieldLabel}>Education</span>
            <span className={styles.fieldValue}>{parsedJD.education}</span>
          </div>
        )}
      </div>

      {/* Required Skills */}
      {visibleFields >= 4 && (
        <div className={`${styles.section} animate-in`} style={{ animationDelay: "0.3s" }}>
          <h3 className={styles.sectionTitle}>Required Skills</h3>
          <div className={styles.skills}>
            {parsedJD.required_skills?.map((s, i) => (
              <div
                key={s.skill}
                className={styles.skillChip}
                style={{ animationDelay: `${0.3 + i * 0.06}s` }}
              >
                <span className={styles.skillName}>{s.skill}</span>
                <span className={`badge ${importanceColor(s.importance)}`}>
                  {s.importance}
                </span>
                <div className={styles.confidence}>
                  <div
                    className={`${styles.confBar} ${confidenceColor(s.confidence)}`}
                    style={{ width: `${s.confidence * 100}%` }}
                  />
                </div>
                <span className={styles.confLabel}>{Math.round(s.confidence * 100)}%</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Preferred Skills */}
      {visibleFields >= 5 && (
        <div className={`${styles.section} animate-in`} style={{ animationDelay: "0.5s" }}>
          <h3 className={styles.sectionTitle}>Preferred Skills</h3>
          <div className={styles.tags}>
            {parsedJD.preferred_skills?.map((s) => (
              <span key={s} className={`badge badge-accent`}>{s}</span>
            ))}
          </div>
        </div>
      )}

      {/* Culture Signals */}
      {visibleFields >= 6 && (
        <div className={`${styles.section} animate-in`} style={{ animationDelay: "0.6s" }}>
          <h3 className={styles.sectionTitle}>Culture Signals</h3>
          <div className={styles.tags}>
            {parsedJD.culture_signals?.map((s) => (
              <span key={s} className={`badge badge-success`}>{s}</span>
            ))}
          </div>
        </div>
      )}

      {/* Key Responsibilities */}
      {visibleFields >= 7 && (
        <div className={`${styles.section} animate-in`} style={{ animationDelay: "0.7s" }}>
          <h3 className={styles.sectionTitle}>Key Responsibilities</h3>
          <ul className={styles.list}>
            {parsedJD.key_responsibilities?.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Deal Breakers */}
      {visibleFields >= 8 && (
        <div className={`${styles.section} animate-in`} style={{ animationDelay: "0.8s" }}>
          <h3 className={styles.sectionTitle}>⚠️ Deal Breakers</h3>
          <div className={styles.tags}>
            {parsedJD.deal_breakers?.map((d) => (
              <span key={d} className={`badge badge-danger`}>{d}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

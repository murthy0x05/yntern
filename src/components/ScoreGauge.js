"use client";

/**
 * ScoreGauge — Animated circular score indicator (SVG-based).
 */
import { useEffect, useState } from "react";
import styles from "./ScoreGauge.module.css";

export default function ScoreGauge({ score = 0, label = "Score", size = 80, strokeWidth = 6 }) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animatedScore / 100) * circumference;

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedScore(score), 100);
    return () => clearTimeout(timer);
  }, [score]);

  const getColor = (s) => {
    if (s >= 85) return "var(--success)";
    if (s >= 65) return "var(--accent-light)";
    if (s >= 45) return "var(--warning)";
    return "var(--danger)";
  };

  return (
    <div className={styles.gauge} style={{ width: size, height: size }}>
      <svg viewBox={`0 0 ${size} ${size}`} className={styles.svg}>
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--border)"
          strokeWidth={strokeWidth}
        />
        {/* Score arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={getColor(score)}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={styles.scoreArc}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <div className={styles.labelGroup}>
        <span className={styles.value} style={{ color: getColor(score) }}>
          {animatedScore}
        </span>
        <span className={styles.label}>{label}</span>
      </div>
    </div>
  );
}

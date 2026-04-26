"use client";

/**
 * PipelineHeader — Floating bubble-style step indicator below the navbar.
 */
import styles from "./PipelineHeader.module.css";

const STAGES = [
  { id: 1, label: "JD Input" },
  { id: 2, label: "Analysis" },
  { id: 3, label: "Discovery" },
  { id: 4, label: "Outreach" },
  { id: 5, label: "Dashboard" },
];

export default function PipelineHeader({ currentStage = 1, onStageClick }) {
  return (
    <div className={styles.wrapper}>
      <nav className={styles.pipeline} aria-label="Pipeline stages">
        {STAGES.map((stage, i) => {
          const isActive = stage.id === currentStage;
          const isComplete = stage.id < currentStage;
          const isUpcoming = stage.id > currentStage;

          return (
            <div key={stage.id} className={styles.stageWrapper}>
              {i > 0 && (
                <div
                  className={`${styles.connector} ${isComplete ? styles.connectorComplete : ""}`}
                />
              )}
              <button
                className={`${styles.stage} ${isActive ? styles.active : ""} ${isComplete ? styles.complete : ""} ${isUpcoming ? styles.upcoming : ""}`}
                onClick={() => isComplete && onStageClick?.(stage.id)}
                disabled={isUpcoming}
                aria-current={isActive ? "step" : undefined}
              >
                <span className={styles.bubble}>
                  {isComplete ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  ) : (
                    <span className={styles.bubbleNumber}>{stage.id}</span>
                  )}
                </span>
                <span className={styles.stageLabel}>{stage.label}</span>
              </button>
            </div>
          );
        })}
      </nav>
    </div>
  );
}

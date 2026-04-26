"use client";

/**
 * PipelineHeader — 5-stage step indicator showing pipeline progress.
 * Each stage lights up as the agent progresses through the pipeline.
 */
import styles from "./PipelineHeader.module.css";
import ThemeToggle from "./ThemeToggle";
import Image from "next/image";

const STAGES = [
  { id: 1, label: "JD Input", icon: "📄", description: "Paste or upload a job description" },
  { id: 2, label: "Analysis", icon: "🧠", description: "AI parses and structures the JD" },
  { id: 3, label: "Discovery", icon: "🔍", description: "Find & score matching candidates" },
  { id: 4, label: "Outreach", icon: "💬", description: "Simulate candidate conversations" },
  { id: 5, label: "Dashboard", icon: "📊", description: "View ranked shortlist" },
];

export default function PipelineHeader({ currentStage = 1, onStageClick }) {
  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <Image src="/logo.svg" alt="yntern logo" width={28} height={28} className={styles.logoImage} />
        <h1 className={styles.title}>yntern</h1>
      </div>
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
                title={stage.description}
                aria-current={isActive ? "step" : undefined}
              >
                <span className={styles.stageIcon}>
                  {isComplete ? "✓" : stage.icon}
                </span>
                <span className={styles.stageLabel}>{stage.label}</span>
              </button>
            </div>
          );
        })}
      </nav>
      <ThemeToggle />
    </header>
  );
}

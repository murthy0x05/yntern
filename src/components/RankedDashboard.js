"use client";

/**
 * RankedDashboard — Final ranked shortlist with filters, sorting, and candidate comparison.
 * Step 5 of the pipeline — the recruiter's action center.
 */
import { useState, useMemo } from "react";
import styles from "./RankedDashboard.module.css";
import ScoreGauge from "./ScoreGauge";

export default function RankedDashboard({ candidates, onViewOutreach }) {
  const [sortBy, setSortBy] = useState("combined");
  const [filterMinScore, setFilterMinScore] = useState(0);
  const [selectedIds, setSelectedIds] = useState(new Set());

  const sorted = useMemo(() => {
    if (!candidates) return [];
    return [...candidates]
      .filter((c) => {
        const score =
          sortBy === "match"
            ? c.score?.match_score
            : sortBy === "interest"
              ? c.outreach?.interest_score || 0
              : c.combined_score;
        return (score || 0) >= filterMinScore;
      })
      .sort((a, b) => {
        if (sortBy === "match")
          return (b.score?.match_score || 0) - (a.score?.match_score || 0);
        if (sortBy === "interest")
          return (b.outreach?.interest_score || 0) - (a.outreach?.interest_score || 0);
        return (b.combined_score || 0) - (a.combined_score || 0);
      });
  }, [candidates, sortBy, filterMinScore]);

  const toggleSelect = (id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const stats = useMemo(() => {
    if (!candidates) return {};
    const avgMatch =
      candidates.reduce((s, c) => s + (c.score?.match_score || 0), 0) /
      candidates.length;
    const avgInterest =
      candidates.filter((c) => c.outreach).reduce((s, c) => s + (c.outreach?.interest_score || 0), 0) /
      (candidates.filter((c) => c.outreach).length || 1);
    const strong = candidates.filter(
      (c) => (c.combined_score || 0) >= 70
    ).length;
    return {
      total: candidates.length,
      avgMatch: Math.round(avgMatch),
      avgInterest: Math.round(avgInterest),
      strong,
    };
  }, [candidates]);

  return (
    <div className={styles.container}>
      {/* Stats Bar */}
      <div className={styles.statsBar}>
        <div className={styles.stat}>
          <span className={styles.statValue}>{stats.total}</span>
          <span className={styles.statLabel}>Candidates</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statValue}>{stats.strong}</span>
          <span className={styles.statLabel}>Strong Matches</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statValue}>{stats.avgMatch}</span>
          <span className={styles.statLabel}>Avg Match</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statValue}>{stats.avgInterest}</span>
          <span className={styles.statLabel}>Avg Interest</span>
        </div>
      </div>

      {/* Controls */}
      <div className={styles.controls}>
        <div className={styles.sortGroup}>
          <span className={styles.controlLabel}>Sort by:</span>
          {["combined", "match", "interest"].map((opt) => (
            <button
              key={opt}
              className={`btn btn-sm ${sortBy === opt ? "btn-primary" : "btn-ghost"}`}
              onClick={() => setSortBy(opt)}
            >
              {opt.charAt(0).toUpperCase() + opt.slice(1)}
            </button>
          ))}
        </div>
        <div className={styles.filterGroup}>
          <span className={styles.controlLabel}>Min Score:</span>
          <input
            type="range"
            min={0}
            max={90}
            step={10}
            value={filterMinScore}
            onChange={(e) => setFilterMinScore(Number(e.target.value))}
            className={styles.slider}
          />
          <span className={styles.filterValue}>{filterMinScore}+</span>
        </div>
      </div>

      {/* Table */}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.thSelect}></th>
              <th className={styles.thRank}>#</th>
              <th>Candidate</th>
              <th className={styles.thScore}>Match</th>
              <th className={styles.thScore}>Interest</th>
              <th className={styles.thScore}>Combined</th>
              <th>Top Skills</th>
              <th>Availability</th>
              <th className={styles.thActions}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((c, i) => {
              const isSelected = selectedIds.has(c.id);
              return (
                <tr
                  key={c.id}
                  className={`${styles.row} ${isSelected ? styles.rowSelected : ""}`}
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  <td>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleSelect(c.id)}
                      className={styles.checkbox}
                    />
                  </td>
                  <td className={styles.rank}>{i + 1}</td>
                  <td>
                    <div className={styles.candidateCell}>
                      <div className={styles.candidateAvatar}>
                        {c.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <div className={styles.candidateName}>{c.name}</div>
                        <div className={styles.candidateRole}>
                          {c.current_role} · {c.current_company}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className={styles.scoreCell}>
                    <ScoreGauge
                      score={c.score?.match_score || 0}
                      label=""
                      size={44}
                      strokeWidth={4}
                    />
                  </td>
                  <td className={styles.scoreCell}>
                    {c.outreach ? (
                      <ScoreGauge
                        score={c.outreach.interest_score}
                        label=""
                        size={44}
                        strokeWidth={4}
                      />
                    ) : (
                      <span className={styles.pending}>—</span>
                    )}
                  </td>
                  <td className={styles.scoreCell}>
                    <span
                      className={styles.combinedScore}
                      style={{
                        color:
                          c.combined_score >= 80
                            ? "var(--success)"
                            : c.combined_score >= 60
                              ? "var(--accent-light)"
                              : c.combined_score >= 40
                                ? "var(--warning)"
                                : "var(--danger)",
                      }}
                    >
                      {c.combined_score}
                    </span>
                  </td>
                  <td>
                    <div className={styles.tags}>
                      {c.score?.matched_skills?.slice(0, 3).map((s) => (
                        <span key={s} className="badge badge-accent">
                          {s}
                        </span>
                      ))}
                      {(c.score?.matched_skills?.length || 0) > 3 && (
                        <span className="badge badge-accent">
                          +{c.score.matched_skills.length - 3}
                        </span>
                      )}
                    </div>
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        c.availability === "immediate" || c.availability === "2 weeks"
                          ? "badge-success"
                          : c.availability === "1 month"
                            ? "badge-warning"
                            : "badge-danger"
                      }`}
                    >
                      {c.availability}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn btn-ghost btn-sm"
                      onClick={() => onViewOutreach?.(c)}
                      title={
                        c.outreach
                          ? "View outreach conversation"
                          : "Simulate outreach"
                      }
                    >
                      {c.outreach ? "💬 View" : "💬 Simulate"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {sorted.length === 0 && (
        <div className={styles.empty}>
          No candidates match the current filter. Try lowering the minimum score.
        </div>
      )}

      {/* Selected comparison footer */}
      {selectedIds.size > 0 && (
        <div className={styles.selectionBar}>
          <span>{selectedIds.size} candidate{selectedIds.size > 1 ? "s" : ""} selected</span>
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => setSelectedIds(new Set())}
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
}

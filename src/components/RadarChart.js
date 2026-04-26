"use client";

/**
 * RadarChart — 6-axis SVG radar visualization for match dimensions.
 */
import styles from "./RadarChart.module.css";

const DIMENSIONS = [
  { key: "skill_match", label: "Skills" },
  { key: "experience_fit", label: "Experience" },
  { key: "education_match", label: "Education" },
  { key: "culture_fit", label: "Culture" },
  { key: "availability", label: "Availability" },
  { key: "salary_alignment", label: "Salary" },
];

export default function RadarChart({ scores = {}, size = 200 }) {
  const center = size / 2;
  const maxRadius = size / 2 - 30;
  const angleStep = (2 * Math.PI) / DIMENSIONS.length;

  const getPoint = (index, value) => {
    const angle = angleStep * index - Math.PI / 2;
    const radius = (value / 100) * maxRadius;
    return {
      x: center + radius * Math.cos(angle),
      y: center + radius * Math.sin(angle),
    };
  };

  // Generate grid lines (20%, 40%, 60%, 80%, 100%)
  const gridLevels = [20, 40, 60, 80, 100];

  // Generate the data polygon
  const dataPoints = DIMENSIONS.map((d, i) => {
    const val = scores[d.key] || 0;
    return getPoint(i, val);
  });
  const dataPath = dataPoints.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") + " Z";

  return (
    <div className={styles.chart}>
      <svg viewBox={`0 0 ${size} ${size}`} className={styles.svg}>
        {/* Grid circles */}
        {gridLevels.map((level) => {
          const points = DIMENSIONS.map((_, i) => getPoint(i, level));
          const path = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") + " Z";
          return (
            <path
              key={level}
              d={path}
              fill="none"
              stroke="var(--border)"
              strokeWidth="1"
              opacity={0.5}
            />
          );
        })}

        {/* Axis lines */}
        {DIMENSIONS.map((_, i) => {
          const end = getPoint(i, 100);
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={end.x}
              y2={end.y}
              stroke="var(--border)"
              strokeWidth="1"
              opacity={0.3}
            />
          );
        })}

        {/* Data polygon */}
        <path
          d={dataPath}
          fill="rgba(99, 102, 241, 0.15)"
          stroke="var(--accent-light)"
          strokeWidth="2"
          className={styles.dataPath}
        />

        {/* Data points */}
        {dataPoints.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r="4"
            fill="var(--accent-light)"
            stroke="var(--bg-primary)"
            strokeWidth="2"
            className={styles.dataPoint}
          />
        ))}

        {/* Labels */}
        {DIMENSIONS.map((d, i) => {
          const labelPoint = getPoint(i, 120);
          return (
            <text
              key={d.key}
              x={labelPoint.x}
              y={labelPoint.y}
              textAnchor="middle"
              dominantBaseline="middle"
              className={styles.label}
              fill="var(--text-muted)"
              fontSize="10"
              fontWeight="600"
            >
              {d.label}
            </text>
          );
        })}
      </svg>
    </div>
  );
}

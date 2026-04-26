"use client";

/**
 * AssessmentModal — Shows a generated assessment link for a candidate.
 * Recruiter can copy the link or send it via email.
 */
import { useState, useMemo } from "react";
import styles from "./AssessmentModal.module.css";

export default function AssessmentModal({ candidate, parsedJD, onClose }) {
  const [copied, setCopied] = useState(false);

  // Build assessment data and encode it into the URL
  const assessmentLink = useMemo(() => {
    const data = {
      t: parsedJD?.title || "Software Engineer",
      s: (parsedJD?.required_skills || []).slice(0, 8),
      n: candidate?.name || "Candidate",
      c: parsedJD?.company || "Company",
      r: (parsedJD?.responsibilities || []).slice(0, 4),
      e: parsedJD?.experience_range || "3-5 years",
    };
    const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(data))));
    return `${window.location.origin}/assess?d=${encoded}`;
  }, [candidate, parsedJD]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(assessmentLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const input = document.createElement("input");
      input.value = assessmentLink;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleEmail = () => {
    const subject = encodeURIComponent(
      `Assessment Invitation — ${parsedJD?.title || "Open Position"}`
    );
    const body = encodeURIComponent(
      `Hi ${candidate?.name || "there"},\n\n` +
      `You've been shortlisted for the ${parsedJD?.title || "open"} position` +
      `${parsedJD?.company ? ` at ${parsedJD.company}` : ""}.\n\n` +
      `Please complete a brief assessment at the link below:\n` +
      `${assessmentLink}\n\n` +
      `The assessment consists of 5 questions relevant to the role and typically takes 10-15 minutes.\n\n` +
      `Best regards,\nThe Hiring Team`
    );
    window.open(`mailto:?subject=${subject}&body=${body}`, "_blank");
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h3 className={styles.title}>Send Assessment</h3>
          <button className={styles.closeBtn} onClick={onClose}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        <p className={styles.description}>
          Send <strong>{candidate?.name}</strong> a personalized assessment link.
          They will answer 5 questions relevant to the <strong>{parsedJD?.title}</strong> role,
          and you will receive an explainable score.
        </p>

        {/* Link display */}
        <div className={styles.linkBox}>
          <input
            className={styles.linkInput}
            value={assessmentLink}
            readOnly
            onClick={(e) => e.target.select()}
          />
          <button
            className={`btn btn-sm ${copied ? "btn-primary" : "btn-secondary"}`}
            onClick={handleCopy}
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>

        {/* Actions */}
        <div className={styles.actions}>
          <button className="btn btn-primary btn-lg" onClick={handleEmail} style={{ flex: 1 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            Send via Email
          </button>
          <button className="btn btn-secondary btn-lg" onClick={onClose} style={{ flex: 1 }}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

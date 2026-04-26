"use client";

/**
 * ChatReplay — Animated conversation replay with typing indicators and sentiment timeline.
 * The most visually impressive component — shows AI outreach playing out in real-time.
 */
import { useState, useEffect, useRef } from "react";
import styles from "./ChatReplay.module.css";
import ScoreGauge from "./ScoreGauge";

export default function ChatReplay({ outreach, candidate, onClose }) {
  const [visibleMessages, setVisibleMessages] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const chatEndRef = useRef(null);

  const messages = outreach?.messages || [];

  useEffect(() => {
    if (!isPlaying || visibleMessages >= messages.length) {
      setIsTyping(false);
      return;
    }

    // Show typing indicator, then reveal message
    setIsTyping(true);
    const typingTimer = setTimeout(() => {
      setIsTyping(false);
      setVisibleMessages((v) => v + 1);
    }, 800 + Math.random() * 600);

    return () => clearTimeout(typingTimer);
  }, [visibleMessages, isPlaying, messages.length]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [visibleMessages, isTyping]);

  const handleSkipToEnd = () => {
    setIsPlaying(false);
    setIsTyping(false);
    setVisibleMessages(messages.length);
  };

  const handleReplay = () => {
    setVisibleMessages(0);
    setIsPlaying(true);
  };

  const sentimentToEmoji = (s) => {
    if (s >= 0.7) return "😊";
    if (s >= 0.3) return "🙂";
    if (s >= -0.3) return "😐";
    if (s >= -0.7) return "😕";
    return "😟";
  };

  const sentimentToColor = (s) => {
    if (s >= 0.5) return "var(--success)";
    if (s >= 0) return "var(--accent-light)";
    if (s >= -0.5) return "var(--warning)";
    return "var(--danger)";
  };

  const isComplete = visibleMessages >= messages.length;

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerInfo}>
            <div className={styles.avatar}>
              {candidate?.name?.split(" ").map((n) => n[0]).join("").toUpperCase()}
            </div>
            <div>
              <h3 className={styles.headerName}>
                Outreach: {candidate?.name}
              </h3>
              <p className={styles.headerRole}>
                {candidate?.current_role} at {candidate?.current_company}
              </p>
            </div>
          </div>
          <div className={styles.headerActions}>
            {!isComplete && (
              <button className="btn btn-ghost btn-sm" onClick={handleSkipToEnd}>
                Skip ⏭
              </button>
            )}
            {isComplete && (
              <button className="btn btn-ghost btn-sm" onClick={handleReplay}>
                Replay 🔄
              </button>
            )}
            <button className="btn btn-ghost btn-sm" onClick={onClose}>
              ✕
            </button>
          </div>
        </div>

        <div className={styles.body}>
          {/* Chat Messages */}
          <div className={styles.chat}>
            <div className={styles.messages}>
              {messages.slice(0, visibleMessages).map((msg, i) => {
                const isKeyMoment = outreach?.key_moments?.some(
                  (km) => km.message_index === i
                );
                const keyMoment = outreach?.key_moments?.find(
                  (km) => km.message_index === i
                );

                return (
                  <div key={i}>
                    {isKeyMoment && (
                      <div className={styles.keyMoment}>
                        ⚡ {keyMoment.label}
                      </div>
                    )}
                    <div
                      className={`${styles.message} ${
                        msg.role === "recruiter"
                          ? styles.recruiter
                          : styles.candidate
                      }`}
                      style={{ animationDelay: "0s" }}
                    >
                      <div className={styles.msgHeader}>
                        <span className={styles.msgRole}>
                          {msg.role === "recruiter" ? "🤖 Recruiter" : `👤 ${candidate?.name?.split(" ")[0]}`}
                        </span>
                        <span
                          className={styles.sentiment}
                          style={{ color: sentimentToColor(msg.sentiment) }}
                        >
                          {sentimentToEmoji(msg.sentiment)} {msg.sentiment > 0 ? "+" : ""}
                          {msg.sentiment?.toFixed(1)}
                        </span>
                      </div>
                      <p className={styles.msgText}>{msg.text}</p>
                    </div>
                  </div>
                );
              })}

              {/* Typing indicator */}
              {isTyping && (
                <div
                  className={`${styles.message} ${
                    messages[visibleMessages]?.role === "recruiter"
                      ? styles.recruiter
                      : styles.candidate
                  }`}
                >
                  <div className={styles.typing}>
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Sentiment Timeline */}
            {visibleMessages > 1 && (
              <div className={styles.timeline}>
                <span className={styles.timelineLabel}>Sentiment</span>
                <div className={styles.timelineBars}>
                  {messages.slice(0, visibleMessages).map((msg, i) => (
                    <div
                      key={i}
                      className={styles.timelineBar}
                      style={{
                        height: `${Math.abs(msg.sentiment) * 40 + 4}px`,
                        background: sentimentToColor(msg.sentiment),
                        opacity: msg.role === "candidate" ? 1 : 0.4,
                      }}
                      title={`${msg.role}: ${msg.sentiment}`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Results Panel (shows when complete) */}
          {isComplete && (
            <div className={styles.results}>
              <h4 className={styles.resultsTitle}>Outreach Results</h4>

              <div className={styles.gauges}>
                <ScoreGauge
                  score={outreach.interest_score}
                  label="Interest"
                  size={90}
                  strokeWidth={6}
                />
              </div>

              {/* Interest Signals */}
              <div className={styles.signals}>
                {Object.entries(outreach.interest_signals || {}).map(
                  ([key, val]) => (
                    <div key={key} className={styles.signal}>
                      <span className={styles.signalLabel}>
                        {key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                      </span>
                      <div className={styles.signalBar}>
                        <div
                          className={styles.signalFill}
                          style={{
                            width: `${val}%`,
                            background:
                              key === "flight_risk" || key === "objections_severity"
                                ? val > 50
                                  ? "var(--danger)"
                                  : "var(--success)"
                                : val >= 70
                                  ? "var(--success)"
                                  : val >= 40
                                    ? "var(--warning)"
                                    : "var(--danger)",
                          }}
                        />
                      </div>
                      <span className={styles.signalValue}>{val}</span>
                    </div>
                  )
                )}
              </div>

              {/* Summary */}
              <div className={styles.summaryBlock}>
                <h4 className={styles.resultsTitle}>Summary</h4>
                <p className={styles.summaryText}>{outreach.summary}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

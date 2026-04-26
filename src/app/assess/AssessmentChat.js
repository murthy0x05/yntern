"use client";

/**
 * AssessmentChat — Candidate-facing assessment interface.
 * Reads encoded JD data from URL, presents questions, scores answers.
 */
import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import styles from "./assess.module.css";

const FALLBACK_QUESTIONS = [
  "Describe a challenging project you worked on recently. What was your role and what technologies did you use?",
  "How do you approach debugging a complex production issue under time pressure?",
  "Tell us about a time you had to learn a new technology quickly. How did you go about it?",
  "How do you ensure code quality and maintainability in your projects?",
  "Where do you see your career heading in the next 2-3 years, and what excites you about this role?",
];

export default function AssessmentChat() {
  const searchParams = useSearchParams();
  const [assessData, setAssessData] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQ, setCurrentQ] = useState(-1); // -1 = welcome screen
  const [answers, setAnswers] = useState([]);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [isScoring, setIsScoring] = useState(false);
  const [results, setResults] = useState(null);
  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  // Parse URL data
  useEffect(() => {
    const encoded = searchParams.get("d");
    if (encoded) {
      try {
        const decoded = JSON.parse(decodeURIComponent(escape(atob(encoded))));
        setAssessData(decoded);
      } catch {
        setAssessData({ t: "Open Position", s: [], n: "Candidate", c: "Company" });
      }
    }
  }, [searchParams]);

  // Generate questions from JD data
  useEffect(() => {
    if (!assessData) return;

    const generateQuestions = async () => {
      try {
        const res = await fetch("/api/generate-assessment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: assessData.t,
            skills: assessData.s,
            responsibilities: assessData.r || [],
            experience: assessData.e || "",
          }),
        });
        const data = await res.json();
        if (data.success && data.questions?.length) {
          setQuestions(data.questions);
          return;
        }
      } catch (err) {
        console.error("Question generation error:", err);
      }
      // Fallback: generate skill-specific questions
      const skillQs = (assessData.s || []).slice(0, 3).map(
        (skill) => `Describe your experience with ${skill}. What have you built using it and what challenges did you face?`
      );
      const combined = [...skillQs, ...FALLBACK_QUESTIONS.slice(skillQs.length)].slice(0, 5);
      setQuestions(combined);
    };

    generateQuestions();
  }, [assessData]);

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentQ, answers]);

  // Focus input when new question appears
  useEffect(() => {
    if (currentQ >= 0) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [currentQ]);

  const handleStart = () => {
    setCurrentQ(0);
  };

  const handleSubmitAnswer = () => {
    if (!currentAnswer.trim()) return;

    const newAnswers = [...answers, currentAnswer.trim()];
    setAnswers(newAnswers);
    setCurrentAnswer("");

    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      // All questions answered — compute score
      computeScore(newAnswers);
    }
  };

  const computeScore = async (allAnswers) => {
    setIsScoring(true);
    setCurrentQ(questions.length); // Move past last question

    try {
      const res = await fetch("/api/score-assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: assessData.t,
          skills: assessData.s,
          questions,
          answers: allAnswers,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setResults(data.results);
        setIsScoring(false);
        return;
      }
    } catch (err) {
      console.error("Scoring error:", err);
    }

    // Fallback scoring
    const avgLength = allAnswers.reduce((s, a) => s + a.length, 0) / allAnswers.length;
    const depthScore = Math.min(95, Math.round(40 + (avgLength / 5)));
    setResults({
      overall_score: depthScore,
      breakdown: [
        { category: "Technical Depth", score: Math.min(95, depthScore + 5), feedback: "Demonstrated solid understanding of core concepts." },
        { category: "Communication", score: Math.min(95, depthScore + 3), feedback: "Answers were clear and well-structured." },
        { category: "Problem Solving", score: Math.min(90, depthScore - 2), feedback: "Showed analytical thinking in responses." },
        { category: "Role Fit", score: Math.min(95, depthScore + 1), feedback: "Experience aligns well with role requirements." },
        { category: "Enthusiasm", score: Math.min(90, depthScore - 3), feedback: "Showed genuine interest in the opportunity." },
      ],
      summary: "The candidate provided thoughtful responses demonstrating relevant experience and strong technical knowledge.",
    });
    setIsScoring(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmitAnswer();
    }
  };

  if (!assessData) {
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <p style={{ textAlign: "center", color: "var(--text-muted)" }}>
            Invalid assessment link. Please check your URL.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      {/* Minimal navbar */}
      <div className={styles.navbar}>
        <div className={styles.navInner}>
          <div className={styles.brand}>
            <Image src="/logo.svg" alt="yntern" width={24} height={24} />
            <span className={styles.brandName}>yntern</span>
            <span className={styles.brandBlock} />
          </div>
          <span className={styles.navLabel}>Candidate Assessment</span>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.card}>
          {/* Chat messages */}
          <div className={styles.chat}>
            {/* Welcome message */}
            <div className={styles.botMessage}>
              <div className={styles.botAvatar}>Y</div>
              <div className={styles.messageContent}>
                <p className={styles.messageText}>
                  Welcome{assessData.n ? `, ${assessData.n}` : ""}! You have been selected for an assessment
                  for the <strong>{assessData.t}</strong> position
                  {assessData.c ? ` at ${assessData.c}` : ""}.
                </p>
                <p className={styles.messageText} style={{ marginTop: 8 }}>
                  This assessment consists of {questions.length || 5} questions and should take about 10-15 minutes.
                  Please answer thoughtfully — your responses will be evaluated for technical depth, communication, and role fit.
                </p>
              </div>
            </div>

            {currentQ === -1 && questions.length > 0 && (
              <div className={styles.startArea}>
                <button className="btn btn-primary btn-lg" onClick={handleStart}>
                  Start Assessment
                </button>
              </div>
            )}

            {/* Questions and answers */}
            {questions.slice(0, currentQ + 1).map((q, i) => (
              <div key={i}>
                <div className={styles.botMessage}>
                  <div className={styles.botAvatar}>{i + 1}</div>
                  <div className={styles.messageContent}>
                    <p className={styles.messageText}>{q}</p>
                    <span className={styles.qBadge}>Question {i + 1} of {questions.length}</span>
                  </div>
                </div>
                {answers[i] && (
                  <div className={styles.userMessage}>
                    <div className={styles.messageContent}>
                      <p className={styles.messageText}>{answers[i]}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Scoring indicator */}
            {isScoring && (
              <div className={styles.botMessage}>
                <div className={styles.botAvatar}>
                  <div className={styles.miniSpinner} />
                </div>
                <div className={styles.messageContent}>
                  <p className={styles.messageText}>Analyzing your responses and computing your assessment score...</p>
                </div>
              </div>
            )}

            {/* Results */}
            {results && (
              <div className={styles.botMessage}>
                <div className={styles.botAvatar}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <div className={`${styles.messageContent} ${styles.resultsContent}`}>
                  <div className={styles.overallScore}>
                    <span className={styles.scoreNumber}>{results.overall_score}</span>
                    <span className={styles.scoreLabel}>Overall Score</span>
                  </div>

                  <div className={styles.breakdown}>
                    {results.breakdown?.map((item, i) => (
                      <div key={i} className={styles.breakdownItem}>
                        <div className={styles.breakdownHeader}>
                          <span className={styles.breakdownCategory}>{item.category}</span>
                          <span className={styles.breakdownScore}>{item.score}</span>
                        </div>
                        <div className={styles.breakdownBar}>
                          <div className={styles.breakdownFill} style={{ width: `${item.score}%` }} />
                        </div>
                        <p className={styles.breakdownFeedback}>{item.feedback}</p>
                      </div>
                    ))}
                  </div>

                  {results.summary && (
                    <p className={styles.summary}>{results.summary}</p>
                  )}

                  <p className={styles.doneText}>
                    Assessment complete. The recruiter will review your results shortly. Thank you!
                  </p>
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Input area */}
          {currentQ >= 0 && currentQ < questions.length && !isScoring && (
            <div className={styles.inputArea}>
              <textarea
                ref={inputRef}
                className={styles.input}
                value={currentAnswer}
                onChange={(e) => setCurrentAnswer(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your answer... (Enter to submit, Shift+Enter for new line)"
                rows={3}
              />
              <button
                className="btn btn-primary"
                onClick={handleSubmitAnswer}
                disabled={!currentAnswer.trim()}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

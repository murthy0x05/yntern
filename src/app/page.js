"use client";

/**
 * yntern — Main Page Orchestrator
 * Manages the 5-stage AI talent scouting pipeline.
 */
import { useState, useCallback } from "react";
import styles from "./page.module.css";
import Navbar from "@/components/Navbar";
import PipelineHeader from "@/components/PipelineHeader";
import JDInput from "@/components/JDInput";
import JDAnalysis from "@/components/JDAnalysis";
import CandidateCard from "@/components/CandidateCard";
import ChatReplay from "@/components/ChatReplay";
import RankedDashboard from "@/components/RankedDashboard";
import AgentThinking from "@/components/AgentThinking";
import AssessmentModal from "@/components/AssessmentModal";
import Footer from "@/components/Footer";

export default function Home() {
  // Pipeline state
  const [stage, setStage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isDemo, setIsDemo] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [thinkingStage, setThinkingStage] = useState("parse-jd");

  // Data state
  const [jdText, setJdText] = useState("");
  const [parsedJD, setParsedJD] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [scores, setScores] = useState([]);
  const [outreachData, setOutreachData] = useState({});

  // UI state
  const [activeOutreach, setActiveOutreach] = useState(null);
  const [outreachCandidate, setOutreachCandidate] = useState(null);
  const [assessCandidate, setAssessCandidate] = useState(null);

  // ── Step 1: Parse JD ──
  const handleJDSubmit = useCallback(async (text, useDemo) => {
    setJdText(text);
    setIsDemo(useDemo);
    setIsLoading(true);
    setThinkingStage("parse-jd");
    setLoadingMessage("Parsing job description...");

    try {
      const res = await fetch("/api/parse-jd", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jdText: text, useDemo }),
      });
      const data = await res.json();
      if (data.success) {
        setParsedJD(data.data);
        if (data.isDemo) setIsDemo(true);
        setStage(2);
      }
    } catch (err) {
      console.error("Parse error:", err);
    } finally {
      setIsLoading(false);
      setLoadingMessage("");
    }
  }, []);

  // ── Step 2→3: Discover & Score Candidates ──
  const handleDiscover = useCallback(async () => {
    setIsLoading(true);
    setThinkingStage("discover");
    setLoadingMessage("Discovering matching candidates...");

    try {
      const candRes = await fetch("/api/generate-candidates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ parsedJD, useDemo: isDemo }),
      });
      const candData = await candRes.json();

      if (candData.success) {
        const rawCandidates = candData.data;

        setLoadingMessage("Scoring and ranking candidates...");
        const scoreRes = await fetch("/api/score-candidates", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            parsedJD,
            candidates: rawCandidates,
            useDemo: isDemo,
          }),
        });
        const scoreData = await scoreRes.json();

        if (scoreData.success) {
          const scoreArray = scoreData.data;
          setScores(scoreArray);

          const merged = rawCandidates
            .map((c) => ({
              ...c,
              score: scoreArray.find((s) => s.candidate_id === c.id),
            }))
            .sort((a, b) => (b.score?.match_score || 0) - (a.score?.match_score || 0));

          setCandidates(merged);
          setStage(3);
        }
      }
    } catch (err) {
      console.error("Discovery error:", err);
    } finally {
      setIsLoading(false);
      setLoadingMessage("");
    }
  }, [parsedJD, isDemo]);

  // ── Step 3→4: Simulate Outreach ──
  const handleSimulateOutreach = useCallback(
    async (candidate) => {
      setOutreachCandidate(candidate);

      if (outreachData[candidate.id]) {
        setActiveOutreach(outreachData[candidate.id]);
        return;
      }

      setThinkingStage("outreach");
      setLoadingMessage(`Simulating outreach with ${candidate.name}...`);
      setIsLoading(true);

      try {
        const res = await fetch("/api/simulate-outreach", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            parsedJD,
            candidate,
            candidateScore: candidate.score,
            useDemo: isDemo,
          }),
        });
        const data = await res.json();

        if (data.success) {
          setOutreachData((prev) => ({ ...prev, [candidate.id]: data.data }));
          setActiveOutreach(data.data);

          setCandidates((prev) =>
            prev.map((c) =>
              c.id === candidate.id
                ? {
                    ...c,
                    outreach: data.data,
                    combined_score: Math.round(
                      (c.score?.match_score || 0) * 0.6 +
                        (data.data?.interest_score || 50) * 0.4
                    ),
                  }
                : c
            )
          );
        }
      } catch (err) {
        console.error("Outreach error:", err);
      } finally {
        setIsLoading(false);
        setLoadingMessage("");
      }
    },
    [parsedJD, isDemo, outreachData]
  );

  const handleCloseOutreach = useCallback(() => {
    setActiveOutreach(null);
    setOutreachCandidate(null);
  }, []);

  const handleGoToDashboard = useCallback(() => {
    setStage(5);
  }, []);

  const handleStageClick = useCallback((s) => {
    setStage(s);
  }, []);

  return (
    <div className={styles.app}>
      <Navbar />
      <PipelineHeader currentStage={stage} onStageClick={handleStageClick} />

      {/* Agent Thinking overlay */}
      {isLoading && (
        <AgentThinking
          stage={thinkingStage}
          message={loadingMessage}
          isDemo={isDemo}
        />
      )}

      <main className={styles.main}>
        {/* Stage 1: JD Input */}
        {stage === 1 && (
          <JDInput onSubmit={handleJDSubmit} isLoading={isLoading} />
        )}

        {/* Stage 2: JD Analysis */}
        {stage === 2 && (
          <JDAnalysis
            parsedJD={parsedJD}
            onProceed={handleDiscover}
            isDemo={isDemo}
          />
        )}

        {/* Stage 3: Discovery & Matching */}
        {stage === 3 && (
          <div className={styles.pageContent}>
            <div className={styles.discoveryHeader}>
              <div>
                <h2>Candidate Discovery & Matching</h2>
                <p className={styles.discoverySubtitle}>
                  Found {candidates.length} candidates. Click any card to see
                  detailed analysis and run outreach simulations.
                </p>
              </div>
              <button className="btn btn-primary" onClick={handleGoToDashboard}>
                View Dashboard
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </button>
            </div>

            <div className={styles.candidatesList}>
              {candidates.map((c, i) => (
                <CandidateCard
                  key={c.id}
                  candidate={c}
                  score={c.score}
                  rank={i + 1}
                  onSimulateOutreach={handleSimulateOutreach}
                />
              ))}
            </div>
          </div>
        )}

        {/* Stage 5: Dashboard */}
        {stage === 5 && (
          <div className={styles.pageContent}>
            <div className={styles.dashboardHeader}>
              <h2>Ranked Shortlist</h2>
              <p className={styles.discoverySubtitle}>
                Final ranked candidates scored on Match (60%) + Interest (40%).
                Simulate outreach for candidates without interest scores.
              </p>
            </div>
            <RankedDashboard
              candidates={candidates}
              onViewOutreach={(c) => {
                if (c.outreach) {
                  setOutreachCandidate(c);
                  setActiveOutreach(c.outreach);
                } else {
                  handleSimulateOutreach(c);
                }
              }}
              onSendAssessment={(c) => setAssessCandidate(c)}
            />
          </div>
        )}
      </main>

      {/* Chat Replay Modal */}
      {activeOutreach && outreachCandidate && (
        <ChatReplay
          outreach={activeOutreach}
          candidate={outreachCandidate}
          onClose={handleCloseOutreach}
        />
      )}

      <Footer />

      {/* Assessment Modal */}
      {assessCandidate && (
        <AssessmentModal
          candidate={assessCandidate}
          parsedJD={parsedJD}
          onClose={() => setAssessCandidate(null)}
        />
      )}
    </div>
  );
}

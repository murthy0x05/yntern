"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { CheckCircle2, Circle, Loader2 } from "lucide-react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";

// Type definitions
interface Subtask {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  tools?: string[];
}

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  level: number;
  dependencies: string[];
  subtasks: Subtask[];
}

interface PlanProps {
  onComplete?: () => void;
}

// Initial task data — Yntern AI Scouting Pipeline
const createInitialTasks = (): Task[] => [
  {
    id: "1",
    title: "Parse Job Description",
    description:
      "Analyze and extract structured requirements from the submitted job description",
    status: "in-progress",
    priority: "high",
    level: 0,
    dependencies: [],
    subtasks: [
      {
        id: "1.1",
        title: "Extract role title & seniority level",
        description:
          "Identify the job title, seniority band (junior/mid/senior/lead), and department from the JD text",
        status: "in-progress",
        priority: "high",
        tools: ["gemini-pro", "nlp-parser"],
      },
      {
        id: "1.2",
        title: "Identify required skills & technologies",
        description:
          "Parse hard skills, programming languages, frameworks, and certifications mentioned in the JD",
        status: "pending",
        priority: "high",
        tools: ["gemini-pro", "skills-taxonomy"],
      },
      {
        id: "1.3",
        title: "Determine experience & qualifications",
        description:
          "Extract years of experience, education requirements, and domain expertise expectations",
        status: "pending",
        priority: "medium",
        tools: ["gemini-pro"],
      },
      {
        id: "1.4",
        title: "Analyze culture fit attributes",
        description:
          "Identify soft skills, work style preferences, and cultural fit signals from the JD",
        status: "pending",
        priority: "medium",
        tools: ["gemini-pro", "sentiment-analyzer"],
      },
    ],
  },
  {
    id: "2",
    title: "Search Yntern Candidate Pool",
    description:
      "Query registered candidates on the Yntern platform to find profiles matching the parsed JD requirements",
    status: "pending",
    priority: "high",
    level: 1,
    dependencies: ["1"],
    subtasks: [
      {
        id: "2.1",
        title: "Vector-search candidate resumes",
        description:
          "Run semantic similarity search across all uploaded resumes to surface candidates with relevant experience and skills",
        status: "pending",
        priority: "high",
        tools: ["firestore", "vector-search"],
      },
      {
        id: "2.2",
        title: "Filter by skills & experience",
        description:
          "Apply structured filters on extracted skill tags, years of experience, and education level from candidate profiles",
        status: "pending",
        priority: "high",
        tools: ["firestore", "skills-taxonomy"],
      },
      {
        id: "2.3",
        title: "Analyze platform activity",
        description:
          "Review candidate engagement data — profile completeness, last active date, and AI assessment scores on the platform",
        status: "pending",
        priority: "medium",
        tools: ["firestore", "analytics-engine"],
      },
      {
        id: "2.4",
        title: "Check availability status",
        description:
          "Filter out candidates who have marked themselves as unavailable or are currently in an active hiring pipeline",
        status: "pending",
        priority: "medium",
        tools: ["firestore"],
      },
    ],
  },
  {
    id: "3",
    title: "Evaluate & Rank Candidates",
    description:
      "Score each candidate against the parsed JD requirements and produce a ranked list",
    status: "pending",
    priority: "high",
    level: 1,
    dependencies: ["1", "2"],
    subtasks: [
      {
        id: "3.1",
        title: "Compute skill-match score",
        description:
          "Calculate a weighted score based on how many required and preferred skills each candidate has",
        status: "pending",
        priority: "high",
        tools: ["gemini-pro", "scoring-engine"],
      },
      {
        id: "3.2",
        title: "Assess experience alignment",
        description:
          "Compare candidate tenure, role progression, and domain experience against JD requirements",
        status: "pending",
        priority: "high",
        tools: ["resume-parser", "gemini-pro"],
      },
      {
        id: "3.3",
        title: "Predict culture fit probability",
        description:
          "Use NLP to compare candidate communication style and values signals with company culture indicators",
        status: "pending",
        priority: "medium",
        tools: ["gemini-pro", "sentiment-analyzer"],
      },
      {
        id: "3.4",
        title: "Generate composite ranking",
        description:
          "Combine all scores into a final weighted ranking with confidence intervals",
        status: "pending",
        priority: "high",
        tools: ["scoring-engine"],
      },
    ],
  },
  {
    id: "4",
    title: "Simulate AI Outreach",
    description:
      "Conduct conversational outreach simulations to gauge candidate interest and availability",
    status: "pending",
    priority: "medium",
    level: 1,
    dependencies: ["3"],
    subtasks: [
      {
        id: "4.1",
        title: "Generate personalized messages",
        description:
          "Craft tailored outreach messages for each top candidate based on their profile and the role",
        status: "pending",
        priority: "high",
        tools: ["gemini-pro", "template-engine"],
      },
      {
        id: "4.2",
        title: "Run conversation simulations",
        description:
          "Simulate multi-turn conversations to assess candidate interest, salary expectations, and timeline",
        status: "pending",
        priority: "high",
        tools: ["gemini-pro", "conversation-agent"],
      },
      {
        id: "4.3",
        title: "Score interest & availability",
        description:
          "Assign an interest score (1–10) based on simulated responses and engagement signals",
        status: "pending",
        priority: "medium",
        tools: ["scoring-engine", "sentiment-analyzer"],
      },
    ],
  },
  {
    id: "5",
    title: "Generate Final Shortlist",
    description:
      "Compile the final shortlist of top candidates with detailed profiles and recommendations",
    status: "pending",
    priority: "high",
    level: 1,
    dependencies: ["3", "4"],
    subtasks: [
      {
        id: "5.1",
        title: "Rank by match score",
        description:
          "Produce a final ordered list based on technical match score",
        status: "pending",
        priority: "high",
        tools: ["scoring-engine"],
      },
      {
        id: "5.2",
        title: "Generate candidate summary cards",
        description:
          "Create rich profile cards for each shortlisted candidate with key highlights and AI insights",
        status: "pending",
        priority: "high",
        tools: ["gemini-pro", "template-engine"],
      },
      {
        id: "5.3",
        title: "Prepare recruiter brief",
        description:
          "Compile a comprehensive scouting report with methodology notes, match rationale, and next steps",
        status: "pending",
        priority: "medium",
        tools: ["gemini-pro", "markdown-processor"],
      },
    ],
  },
];

export default function Plan({ onComplete }: PlanProps) {
  const [tasks, setTasks] = useState<Task[]>(createInitialTasks);
  const [expandedTasks, setExpandedTasks] = useState<string[]>(["1"]);
  const [expandedSubtasks, setExpandedSubtasks] = useState<{
    [key: string]: boolean;
  }>({});
  const [isComplete, setIsComplete] = useState(false);
  const completeFired = useRef(false);

  // Auto-progression: advance subtasks & tasks through the pipeline
  useEffect(() => {
    if (isComplete) return;

    const timer = setInterval(() => {
      setTasks((prev) => {
        const updated = prev.map((t) => ({
          ...t,
          subtasks: t.subtasks.map((s) => ({ ...s })),
        }));

        // Find the current in-progress task
        const activeTask = updated.find((t) => t.status === "in-progress");
        if (!activeTask) {
          // Check if there's a pending task whose dependencies are all completed
          const nextTask = updated.find((t) => {
            if (t.status !== "pending") return false;
            return t.dependencies.every((depId) => {
              const dep = updated.find((d) => d.id === depId);
              return dep?.status === "completed";
            });
          });
          if (nextTask) {
            nextTask.status = "in-progress";
            if (nextTask.subtasks.length > 0) {
              nextTask.subtasks[0].status = "in-progress";
            }
            // Auto-expand the newly active task
            setExpandedTasks((ex) =>
              ex.includes(nextTask.id) ? ex : [...ex, nextTask.id],
            );
          } else {
            // All tasks done
            const allDone = updated.every((t) => t.status === "completed");
            if (allDone) {
              setIsComplete(true);
            }
          }
          return updated;
        }

        // Find the current in-progress subtask
        const activeSubtask = activeTask.subtasks.find(
          (s) => s.status === "in-progress",
        );

        if (activeSubtask) {
          // Complete it
          activeSubtask.status = "completed";

          // Start the next pending subtask
          const nextSubtask = activeTask.subtasks.find(
            (s) => s.status === "pending",
          );
          if (nextSubtask) {
            nextSubtask.status = "in-progress";
          } else {
            // All subtasks done — complete the task
            activeTask.status = "completed";
          }
        } else {
          // No active subtask but task is in-progress — start first pending subtask
          const nextSubtask = activeTask.subtasks.find(
            (s) => s.status === "pending",
          );
          if (nextSubtask) {
            nextSubtask.status = "in-progress";
          } else {
            activeTask.status = "completed";
          }
        }

        return updated;
      });
    }, 1200); // Each subtask takes ~1.2s

    return () => clearInterval(timer);
  }, [isComplete]);

  // Fire onComplete callback once
  useEffect(() => {
    if (isComplete && onComplete && !completeFired.current) {
      completeFired.current = true;
      // Small delay so user sees the final "completed" state
      const timeout = setTimeout(onComplete, 1500);
      return () => clearTimeout(timeout);
    }
  }, [isComplete, onComplete]);

  // Reduced motion preference
  const prefersReducedMotion =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  const animType: "tween" | "spring" = prefersReducedMotion
    ? "tween"
    : "spring";

  // Toggle task expansion
  const toggleTaskExpansion = useCallback((taskId: string) => {
    setExpandedTasks((prev) =>
      prev.includes(taskId)
        ? prev.filter((id) => id !== taskId)
        : [...prev, taskId],
    );
  }, []);

  // Toggle subtask expansion
  const toggleSubtaskExpansion = useCallback(
    (taskId: string, subtaskId: string) => {
      const key = `${taskId}-${subtaskId}`;
      setExpandedSubtasks((prev) => ({
        ...prev,
        [key]: !prev[key],
      }));
    },
    [],
  );

  // Animation variants
  const taskVariants = {
    hidden: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : -5,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: animType,
        stiffness: 500,
        damping: 30,
        duration: prefersReducedMotion ? 0.2 : undefined,
      },
    },
    exit: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : -5,
      transition: { duration: 0.15 },
    },
  };

  const subtaskListVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      overflow: "hidden" as const,
    },
    visible: {
      height: "auto",
      opacity: 1,
      overflow: "visible" as const,
      transition: {
        duration: 0.25,
        staggerChildren: prefersReducedMotion ? 0 : 0.05,
        when: "beforeChildren" as const,
        ease: [0.2, 0.65, 0.3, 0.9] as [number, number, number, number],
      },
    },
    exit: {
      height: 0,
      opacity: 0,
      overflow: "hidden" as const,
      transition: {
        duration: 0.2,
        ease: [0.2, 0.65, 0.3, 0.9] as [number, number, number, number],
      },
    },
  };

  const subtaskVariants = {
    hidden: {
      opacity: 0,
      x: prefersReducedMotion ? 0 : -10,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: animType,
        stiffness: 500,
        damping: 25,
        duration: prefersReducedMotion ? 0.2 : undefined,
      },
    },
    exit: {
      opacity: 0,
      x: prefersReducedMotion ? 0 : -10,
      transition: { duration: 0.15 },
    },
  };

  const subtaskDetailsVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      overflow: "hidden" as const,
    },
    visible: {
      opacity: 1,
      height: "auto",
      overflow: "visible" as const,
      transition: {
        duration: 0.25,
        ease: [0.2, 0.65, 0.3, 0.9] as [number, number, number, number],
      },
    },
  };

  const statusBadgeVariants = {
    initial: { scale: 1 },
    animate: {
      scale: prefersReducedMotion ? 1 : [1, 1.08, 1],
      transition: {
        duration: 0.35,
        ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number],
      },
    },
  };

  // Helper: render status icon for tasks
  const renderTaskIcon = (status: string) => {
    if (status === "completed") {
      return <CheckCircle2 className="h-4.5 w-4.5 text-green-500" />;
    }
    if (status === "in-progress") {
      return <Loader2 className="h-4.5 w-4.5 text-blue-500 animate-spin" />;
    }
    return <Circle className="text-muted-foreground h-4.5 w-4.5" />;
  };

  // Helper: render status icon for subtasks
  const renderSubtaskIcon = (status: string) => {
    if (status === "completed") {
      return <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />;
    }
    if (status === "in-progress") {
      return <Loader2 className="h-3.5 w-3.5 text-blue-500 animate-spin" />;
    }
    return <Circle className="text-muted-foreground h-3.5 w-3.5" />;
  };

  // Progress calculation
  const totalSubtasks = tasks.reduce((acc, t) => acc + t.subtasks.length, 0);
  const completedSubtasks = tasks.reduce(
    (acc, t) => acc + t.subtasks.filter((s) => s.status === "completed").length,
    0,
  );
  const progressPercent =
    totalSubtasks > 0
      ? Math.round((completedSubtasks / totalSubtasks) * 100)
      : 0;

  return (
    <div className="bg-background text-foreground h-full overflow-auto p-2">
      <motion.div
        className="bg-card border-border rounded-lg border shadow overflow-hidden"
        initial={{ opacity: 0, y: 10 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.3,
            ease: [0.2, 0.65, 0.3, 0.9],
          },
        }}
      >
        {/* Progress bar */}
        <div className="px-4 pt-4 pb-2">
          <div className="flex items-center justify-between mb-2">
            <span className="font-[Inter] text-[11px] font-semibold uppercase tracking-[0.08em] text-[#848484]">
              {isComplete ? "Scouting Complete" : "Scouting in progress..."}
            </span>
            <span className="font-[Inter] text-[11px] font-semibold text-[#848484]">
              {progressPercent}%
            </span>
          </div>
          <div className="h-1.5 bg-[#f3f3f3] rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[#6366f1] to-[#8b5cf6]"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>

        <LayoutGroup>
          <div className="p-4 pt-2 overflow-hidden">
            <ul className="space-y-1 overflow-hidden">
              {tasks.map((task, index) => {
                const isExpanded = expandedTasks.includes(task.id);
                const isCompleted = task.status === "completed";

                return (
                  <motion.li
                    key={task.id}
                    className={` ${index !== 0 ? "mt-1 pt-2" : ""} `}
                    initial="hidden"
                    animate="visible"
                    variants={taskVariants}
                  >
                    {/* Task row */}
                    <motion.div
                      className="group flex items-center px-3 py-1.5 rounded-md"
                      whileHover={{
                        backgroundColor: "rgba(0,0,0,0.03)",
                        transition: { duration: 0.2 },
                      }}
                    >
                      <div className="mr-2 flex-shrink-0">
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={task.status}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{
                              duration: 0.2,
                              ease: [0.2, 0.65, 0.3, 0.9],
                            }}
                          >
                            {renderTaskIcon(task.status)}
                          </motion.div>
                        </AnimatePresence>
                      </div>

                      <motion.div
                        className="flex min-w-0 flex-grow cursor-pointer items-center justify-between"
                        onClick={() => toggleTaskExpansion(task.id)}
                      >
                        <div className="mr-2 flex-1 truncate">
                          <span
                            className={`text-sm font-[Inter] ${isCompleted ? "text-muted-foreground line-through" : ""}`}
                          >
                            {task.title}
                          </span>
                        </div>

                        <div className="flex flex-shrink-0 items-center space-x-2 text-xs">
                          {task.dependencies.length > 0 && (
                            <div className="flex items-center mr-2">
                              <div className="flex flex-wrap gap-1">
                                {task.dependencies.map((dep, idx) => (
                                  <motion.span
                                    key={idx}
                                    className="bg-secondary/40 text-secondary-foreground rounded px-1.5 py-0.5 text-[10px] font-medium shadow-sm"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{
                                      duration: 0.2,
                                      delay: idx * 0.05,
                                    }}
                                  >
                                    {dep}
                                  </motion.span>
                                ))}
                              </div>
                            </div>
                          )}

                          <motion.span
                            className={`rounded px-1.5 py-0.5 text-[11px] font-medium ${task.status === "completed"
                                ? "bg-green-100 text-green-700"
                                : task.status === "in-progress"
                                  ? "bg-blue-100 text-blue-700"
                                  : "bg-muted text-muted-foreground"
                              }`}
                            variants={statusBadgeVariants}
                            initial="initial"
                            animate="animate"
                            key={task.status}
                          >
                            {task.status}
                          </motion.span>
                        </div>
                      </motion.div>
                    </motion.div>

                    {/* Subtasks */}
                    <AnimatePresence mode="wait">
                      {isExpanded && task.subtasks.length > 0 && (
                        <motion.div
                          className="relative overflow-hidden"
                          variants={subtaskListVariants}
                          initial="hidden"
                          animate="visible"
                          exit="hidden"
                          layout
                        >
                          <div className="absolute top-0 bottom-0 left-[20px] border-l-2 border-dashed border-muted-foreground/30" />
                          <ul className="border-muted mt-1 mr-2 mb-1.5 ml-3 space-y-0.5">
                            {task.subtasks.map((subtask) => {
                              const subtaskKey = `${task.id}-${subtask.id}`;
                              const isSubtaskExpanded =
                                expandedSubtasks[subtaskKey];

                              return (
                                <motion.li
                                  key={subtask.id}
                                  className="group flex flex-col py-0.5 pl-6"
                                  onClick={() =>
                                    toggleSubtaskExpansion(task.id, subtask.id)
                                  }
                                  variants={subtaskVariants}
                                  initial="hidden"
                                  animate="visible"
                                  exit="exit"
                                  layout
                                >
                                  <motion.div
                                    className="flex flex-1 items-center rounded-md p-1"
                                    whileHover={{
                                      backgroundColor: "rgba(0,0,0,0.03)",
                                      transition: { duration: 0.2 },
                                    }}
                                    layout
                                  >
                                    <div className="mr-2 flex-shrink-0">
                                      <AnimatePresence mode="wait">
                                        <motion.div
                                          key={subtask.status}
                                          initial={{
                                            opacity: 0,
                                            scale: 0.8,
                                          }}
                                          animate={{
                                            opacity: 1,
                                            scale: 1,
                                          }}
                                          exit={{
                                            opacity: 0,
                                            scale: 0.8,
                                          }}
                                          transition={{
                                            duration: 0.2,
                                            ease: [0.2, 0.65, 0.3, 0.9],
                                          }}
                                        >
                                          {renderSubtaskIcon(subtask.status)}
                                        </motion.div>
                                      </AnimatePresence>
                                    </div>

                                    <span
                                      className={`cursor-pointer text-sm font-[Inter] ${subtask.status === "completed" ? "text-muted-foreground line-through" : ""}`}
                                    >
                                      {subtask.title}
                                    </span>
                                  </motion.div>

                                  <AnimatePresence mode="wait">
                                    {isSubtaskExpanded && (
                                      <motion.div
                                        className="text-muted-foreground border-foreground/20 mt-1 ml-1.5 border-l border-dashed pl-5 text-xs overflow-hidden"
                                        variants={subtaskDetailsVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="hidden"
                                        layout
                                      >
                                        <p className="py-1">
                                          {subtask.description}
                                        </p>
                                        {subtask.tools &&
                                          subtask.tools.length > 0 && (
                                            <div className="mt-0.5 mb-1 flex flex-wrap items-center gap-1.5">
                                              <span className="text-muted-foreground font-medium">
                                                MCP Servers:
                                              </span>
                                              <div className="flex flex-wrap gap-1">
                                                {subtask.tools.map(
                                                  (tool, idx) => (
                                                    <motion.span
                                                      key={idx}
                                                      className="bg-secondary/40 text-secondary-foreground rounded px-1.5 py-0.5 text-[10px] font-medium shadow-sm"
                                                      initial={{
                                                        opacity: 0,
                                                        y: -5,
                                                      }}
                                                      animate={{
                                                        opacity: 1,
                                                        y: 0,
                                                        transition: {
                                                          duration: 0.2,
                                                          delay: idx * 0.05,
                                                        },
                                                      }}
                                                    >
                                                      {tool}
                                                    </motion.span>
                                                  ),
                                                )}
                                              </div>
                                            </div>
                                          )}
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </motion.li>
                              );
                            })}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.li>
                );
              })}
            </ul>
          </div>
        </LayoutGroup>
      </motion.div>
    </div>
  );
}

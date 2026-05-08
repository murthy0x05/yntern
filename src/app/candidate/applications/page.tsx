"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";

const STAGES = ["Applied", "Screening", "Interview", "Offer", "Hired"];

function PipelineDots({ currentStage }: { currentStage: number }) {
  return (
    <div className="flex items-center gap-0">
      {STAGES.map((stage, i) => {
        const isCompleted = currentStage >= 0 && i <= currentStage;
        const isCurrent = i === currentStage;
        return (
          <div key={stage} className="flex items-center">
            <div className="relative group">
              <div
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  isCurrent
                    ? "bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] scale-125 shadow-[0_0_8px_rgba(99,102,241,0.4)]"
                    : isCompleted
                      ? "bg-[#10b981]"
                      : "bg-[#e2e2e2]"
                }`}
              />
              <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 font-[Inter] text-[9px] text-[#848484] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                {stage}
              </span>
            </div>
            {i < STAGES.length - 1 && (
              <div
                className={`w-6 h-0.5 ${isCompleted && i < currentStage ? "bg-[#10b981]" : "bg-[#e2e2e2]"}`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<any[]>([]);
  const supabase = createClient();

  useEffect(() => {
    const fetchApplications = async () => {
      const { data } = await supabase
        .from("applications")
        .select("*")
        .order("created_at", { ascending: false });

      if (data) {
        const formatted = data.map((app) => {
          let currentStage = STAGES.indexOf(app.stage);
          if (app.status === "Withdrawn") currentStage = -1;
          if (app.status === "Declined") currentStage = -2;

          let statusColor = "bg-[#eef2ff] text-[#4338ca]"; // Default: Applied
          if (app.status === "In Review" || app.status === "Screening")
            statusColor = "bg-[#fffbeb] text-[#d97706]";
          else if (
            app.status === "Interview" ||
            app.status === "Interview Scheduled"
          )
            statusColor = "bg-[#eff6ff] text-[#2563eb]";
          else if (app.status === "Offer Extended" || app.status === "Offer")
            statusColor = "bg-[#ecfdf5] text-[#059669]";
          else if (app.status === "Withdrawn")
            statusColor = "bg-[#f3f3f3] text-[#848484]";
          else if (app.status === "Declined")
            statusColor = "bg-[#fff1f2] text-[#e11d48]";

          return {
            ...app,
            initials: app.company?.substring(0, 2).toUpperCase() || "??",
            applied: new Date(app.created_at).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            }),
            currentStage,
            statusColor,
          };
        });
        setApplications(formatted);
      }
    };
    fetchApplications();
  }, [supabase]);

  const SUMMARY = [
    {
      label: "Applied",
      value: applications.length,
      icon: "send",
      color: "#6366f1",
      bg: "#eef2ff",
    },
    {
      label: "In Review",
      value: applications.filter((a) => a.stage === "Screening").length,
      icon: "visibility",
      color: "#f59e0b",
      bg: "#fffbeb",
    },
    {
      label: "Interview",
      value: applications.filter((a) => a.stage === "Interview").length,
      icon: "event",
      color: "#3b82f6",
      bg: "#eff6ff",
    },
    {
      label: "Offer",
      value: applications.filter((a) => a.stage === "Offer").length,
      icon: "workspace_premium",
      color: "#10b981",
      bg: "#ecfdf5",
    },
  ];
  return (
    <div className="max-w-[1440px] mx-auto w-full px-6 lg:px-12 flex-1 flex flex-col gap-8 pt-6 pb-12">
      {/* Header */}
      <section className="flex flex-col gap-2 animate-fade-rise">
        <h1
          className="text-black"
          style={{
            fontFamily: "'Instrument Serif'",
            fontSize: "36px",
            lineHeight: "1.2",
          }}
        >
          Application Tracker
        </h1>
        <p className="font-[Inter] text-sm text-[#4c4546]">
          Track the status of all your applications in one place
        </p>
      </section>

      {/* Summary Stats */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-rise-delay">
        {SUMMARY.map((stat) => (
          <div
            key={stat.label}
            className="bg-white border border-[#cfc4c5] rounded-xl p-5 flex items-center gap-4 hover:border-black transition-all duration-500 group"
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform"
              style={{ backgroundColor: stat.bg }}
            >
              <span
                className="material-symbols-outlined text-[20px]"
                style={{ color: stat.color }}
              >
                {stat.icon}
              </span>
            </div>
            <div>
              <p
                className="text-black font-semibold"
                style={{ fontSize: "24px", lineHeight: "1.2" }}
              >
                {stat.value}
              </p>
              <p className="font-[Inter] text-[12px] font-semibold tracking-[0.05em] text-[#4c4546] uppercase">
                {stat.label}
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* Application List */}
      <section className="animate-fade-rise-delay-2">
        <div className="bg-white border border-[#cfc4c5] rounded-xl overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-[1fr_140px_160px_140px_120px] px-6 py-3 border-b border-[#cfc4c5]/30 bg-[#fafafa]">
            <span className="font-[Inter] text-[11px] font-semibold text-[#848484] uppercase tracking-wider">
              Position
            </span>
            <span className="font-[Inter] text-[11px] font-semibold text-[#848484] uppercase tracking-wider">
              Applied
            </span>
            <span className="font-[Inter] text-[11px] font-semibold text-[#848484] uppercase tracking-wider">
              Pipeline
            </span>
            <span className="font-[Inter] text-[11px] font-semibold text-[#848484] uppercase tracking-wider">
              Status
            </span>
            <span className="font-[Inter] text-[11px] font-semibold text-[#848484] uppercase tracking-wider text-right">
              Action
            </span>
          </div>
          {/* Rows */}
          {applications.map((app, i) => (
            <div
              key={app.id}
              className={`grid grid-cols-[1fr_140px_160px_140px_120px] px-6 py-4 items-center hover:bg-[#fafafa] transition-colors ${i < applications.length - 1 ? "border-b border-[#cfc4c5]/15" : ""}`}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center text-white text-[11px] font-semibold shrink-0">
                  {app.initials}
                </div>
                <div>
                  <p className="font-[Inter] text-[13px] font-semibold text-black">
                    {app.role}
                  </p>
                  <p className="font-[Inter] text-[12px] text-[#4c4546]">
                    {app.company}
                  </p>
                </div>
              </div>
              <span className="font-[Inter] text-[12px] text-[#848484]">
                {app.applied}
              </span>
              <PipelineDots currentStage={app.currentStage} />
              <span
                className={`px-2.5 py-0.5 rounded-full font-[Inter] text-[10px] font-semibold uppercase tracking-wider w-fit ${app.statusColor}`}
              >
                {app.status}
              </span>
              <div className="flex justify-end">
                <button
                  className="px-3 py-1 border border-[#cfc4c5] rounded-full font-[Inter] text-[11px] text-[#4c4546] hover:border-black hover:text-black transition-all cursor-pointer"
                  type="button"
                >
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

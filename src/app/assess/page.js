"use client";

import { Suspense } from "react";
import AssessmentChat from "./AssessmentChat";

export default function AssessPage() {
  return (
    <Suspense fallback={<div style={{ padding: "2rem", textAlign: "center", color: "var(--text-muted)" }}>Loading assessment...</div>}>
      <AssessmentChat />
    </Suspense>
  );
}

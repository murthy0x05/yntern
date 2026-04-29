# AI-Powered Talent Scouting & Engagement Agent

An end-to-end AI agent that takes a raw Job Description, parses it into structured requirements, discovers and matches candidates, simulates conversational outreach, and outputs a **ranked shortlist** scored on **Match Score** and **Interest Score**.

## 🚀 The Core Idea

The goal of this project is to make the recruitment process transparent. The AI agent shows its "thinking" — revealing the reasoning, pipeline stages, and decision-making in real-time.

## 🏗 Architecture Overview

The system operates as a 5-Stage Pipeline:

1. **JD Parser Agent**: Extracts structured fields (skills, experience, role type, culture signals) from raw JD text, displaying extracted taxonomy in real-time with confidence scores.
2. **Candidate Discovery Engine**: Generates a synthetic candidate pool or searches a seeded database, visualizing the search space and filtering funnel.
3. **Matching & Scoring Engine**: Scores each candidate against JD requirements with **explainable reasoning** (radar charts, skill gap analysis, written justification).
4. **Conversational Outreach Simulator**: AI simulates both recruiter AND candidate sides of an outreach conversation. It provides a live chat replay showing negotiation dynamics and interest signals.
5. **Recruiter Dashboard (Ranked Output)**: Combined Match Score + Interest Score leads to a final ranked shortlist on an interactive dashboard with filters, comparisons, and exportable reports.

## 🛠 Tech Stack

- **Frontend:** Next.js 16
- **Styling:** Vanilla CSS with CSS custom properties
- **AI/LLM:** Google Gemini API (`gemini-2.0-flash`)
- **Database:** Supabase (PostgreSQL) (Planned)
- **Deployment:** Vercel (Planned)

## ✨ Key Features (The WOW Factors)

- **"Agent Thinking" Visualization:** Real-time pipeline visualization where each stage lights up as it processes.
- **Explainable AI Throughout:** Every score has a "Why?" button. Every decision is justified to build trust and transparency.
- **Live Conversation Replay:** Chat simulation plays out in real-time, demonstrating sophisticated AI reasoning.
- **Dual-Score Innovation:** Ranks candidates on a combined Match Score and an Interest Score derived from simulated conversations.

## 🏁 Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `src/app/page.js`. The page auto-updates as you edit the file.

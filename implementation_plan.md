# AI-Powered Talent Scouting & Engagement Agent

## The Core Idea

An end-to-end AI agent that takes a raw Job Description → parses it into structured requirements → discovers/matches candidates → simulates conversational outreach → outputs a **ranked shortlist** scored on **Match Score** + **Interest Score**.

The key to winning: **Make the invisible visible.** Judges love seeing the AI "think" — show the reasoning, the pipeline stages, the decision-making in real-time.

---

## Architecture Overview

```mermaid
graph LR
    A[📄 Job Description Input] --> B[🧠 JD Parser Agent]
    B --> C[🔍 Candidate Discovery Engine]
    C --> D[⚡ Matching & Scoring Engine]
    D --> E[💬 Conversational Outreach Simulator]
    E --> F[📊 Ranked Dashboard Output]
    
    style A fill:#1a1a2e,stroke:#e94560,color:#fff
    style B fill:#1a1a2e,stroke:#0f3460,color:#fff
    style C fill:#1a1a2e,stroke:#0f3460,color:#fff
    style D fill:#1a1a2e,stroke:#0f3460,color:#fff
    style E fill:#1a1a2e,stroke:#e94560,color:#fff
    style F fill:#1a1a2e,stroke:#16213e,color:#fff
```

### 5-Stage Pipeline

| Stage | What It Does | WOW Factor |
|-------|-------------|------------|
| **1. JD Parser** | Extracts structured fields (skills, experience, role type, culture signals) from raw JD text | Shows extracted taxonomy in real-time with confidence scores |
| **2. Candidate Discovery** | Generates a synthetic candidate pool (since we can't scrape LinkedIn) OR searches a seeded database | Visualizes the search space and filtering funnel |
| **3. Match Scoring** | Scores each candidate against JD requirements with **explainable reasoning** | Radar charts, skill gap analysis, and written justification per candidate |
| **4. Conversational Outreach** | AI simulates both recruiter AND candidate sides of an outreach conversation | Live chat replay showing negotiation dynamics and interest signals |
| **5. Ranked Output** | Combined Match Score + Interest Score → final ranked shortlist | Interactive dashboard with filters, comparisons, and exportable reports |

---

## Tech Stack Recommendation

### Option A: Full-Stack Web App (Recommended for Hackathon) ✅

| Layer | Technology | Why |
|-------|-----------|-----|
| **Frontend** | **Next.js 14 (App Router)** | SSR, API routes, fast iteration, great DX |
| **Styling** | **Vanilla CSS with CSS custom properties** | Full control over premium aesthetics, dark mode, animations |
| **AI/LLM** | **Google Gemini API (gemini-2.0-flash)** | Free tier, fast, great at structured extraction and conversation |
| **Database** | **Supabase (PostgreSQL)** | Free tier, real-time subscriptions, auth if needed |
| **Vector Search** | **Supabase pgvector** OR **in-memory cosine similarity** | For semantic candidate matching |
| **Deployment** | **Vercel** | Zero-config Next.js deployment |

### Option B: Simpler Stack (If time-constrained)

| Layer | Technology |
|-------|-----------|
| **Frontend** | Single-page HTML/CSS/JS |
| **Backend** | Node.js Express API |
| **AI** | Gemini API |
| **Data** | In-memory JSON (no DB) |

> [!IMPORTANT]
> **My recommendation is Option A.** For a hackathon, the UI/UX is 50% of the impression. A polished Next.js app with real-time visualizations will destroy a CLI tool or basic form. But if you're extremely time-limited, Option B gets you to a working demo faster.

---

## Detailed Module Breakdown

### Module 1: JD Parser Agent 🧠

**Input:** Raw Job Description text (pasted or uploaded)

**Output:** Structured JSON:
```json
{
  "role_title": "Senior Backend Engineer",
  "department": "Platform Engineering",
  "experience_range": { "min": 5, "max": 8 },
  "required_skills": [
    { "skill": "Python", "importance": "critical", "confidence": 0.95 },
    { "skill": "Kubernetes", "importance": "high", "confidence": 0.88 },
    { "skill": "System Design", "importance": "high", "confidence": 0.82 }
  ],
  "preferred_skills": ["Go", "Terraform", "AWS"],
  "education": "BS/MS in CS or equivalent",
  "culture_signals": ["fast-paced", "ownership-driven", "remote-friendly"],
  "compensation_range": "$180k-$220k",
  "location": "Remote (US timezone preferred)",
  "deal_breakers": ["Must have production Kubernetes experience"]
}
```

**WOW Factor:**
- Show a **live extraction animation** — as the AI parses, fields populate one-by-one with typing effects
- Display **confidence scores** as colored badges (green/yellow/red)
- Allow the recruiter to **edit/override** any extracted field before proceeding

**Implementation:**
- Single Gemini API call with a structured output schema (JSON mode)
- Use `responseSchema` to enforce the output format
- Prompt engineering with few-shot examples for accuracy

---

### Module 2: Candidate Discovery Engine 🔍

> [!WARNING]
> **The biggest caveat of this project.** You can't scrape LinkedIn/GitHub in a hackathon demo. You need a strategy for candidate data.

**Three approaches (pick one or combine):**

#### Approach A: Synthetic Candidate Generation (Recommended) ✅
- Use Gemini to **generate realistic candidate profiles** based on the parsed JD
- Generate 15-25 candidates with varying match levels (some perfect, some partial, some poor)
- Each profile has: name, skills, experience, education, current role, salary expectations, availability, personality traits
- **Why this works:** You control the data quality, and you can demonstrate the full pipeline without external dependencies

#### Approach B: Seeded Database
- Pre-load 50-100 diverse candidate profiles into Supabase
- Use vector embeddings for semantic search
- More realistic but requires upfront data prep

#### Approach C: Resume Upload + Parsing
- Let the recruiter upload a batch of resumes (PDFs)
- Parse them with Gemini into structured profiles
- Most realistic but adds complexity and time

**My recommendation:** Start with **Approach A** (synthetic), then add **Approach C** as a bonus feature if time permits. This is the smartest hackathon strategy — you get a working demo fast, and the resume upload shows real-world applicability.

---

### Module 3: Matching & Scoring Engine ⚡

This is where **explainability** wins the hackathon.

**Scoring Dimensions:**
```
Match Score = weighted_sum(
  skill_match      × 0.35,   // Hard skill overlap
  experience_fit   × 0.20,   // Years + seniority alignment  
  education_match  × 0.10,   // Degree relevance
  culture_fit      × 0.15,   // Work style alignment
  availability     × 0.10,   // Timeline match
  salary_alignment × 0.10    // Compensation expectations
)
```

**Explainability Features (THE differentiator):**
1. **Radar Chart** per candidate — 6-axis visualization of match dimensions
2. **Skill Gap Analysis** — "Candidate has 4/6 required skills. Missing: Kubernetes, Terraform"
3. **Written Justification** — AI-generated paragraph explaining why this candidate was scored this way
4. **Comparative View** — Side-by-side comparison of any 2-3 candidates

**Implementation:**
- Hybrid approach: Use **cosine similarity** on skill embeddings for the base score
- Use **Gemini** for the qualitative justification and culture fit assessment
- Cache all explanations for instant retrieval

---

### Module 4: Conversational Outreach Simulator 💬

This is the **most unique and impressive** part of the project.

**How it works:**
1. For each top candidate, the AI simulates a **multi-turn conversation** between a recruiter persona and the candidate persona
2. The candidate persona is generated from their profile (personality, motivations, concerns)
3. The conversation covers: role introduction → candidate questions → salary discussion → interest level → next steps
4. After the conversation, the AI extracts an **Interest Score** based on conversation signals

**Interest Score Signals:**
| Signal | Weight | Example |
|--------|--------|---------|
| Enthusiasm level | 25% | "That sounds really exciting!" vs "I'm not sure..." |
| Questions asked | 20% | Asking about team/growth = high interest |
| Salary alignment | 20% | Accepted range vs pushed back significantly |
| Timeline willingness | 15% | "I can start in 2 weeks" vs "Maybe in 6 months" |
| Objections raised | 10% | Number and severity of concerns |
| Competitor mentions | 10% | "I'm also talking to Google" = flight risk |

**WOW Factor:**
- **Live chat replay** — show the conversation playing out message-by-message with typing indicators
- **Sentiment timeline** — a line chart showing candidate sentiment throughout the conversation
- **Key moments highlighted** — AI flags the critical moments ("Candidate showed hesitation about relocation")
- Let the recruiter **intervene** — they can edit a recruiter message and re-run the conversation from that point

**Implementation:**
- Use Gemini with **system instructions** defining both personas
- Multi-turn chat with `generateContent` and chat history
- Post-conversation analysis prompt to extract Interest Score + key moments

---

### Module 5: Recruiter Dashboard 📊

**The final output — this is what the recruiter acts on.**

**Features:**
1. **Ranked Table** — Candidates sorted by combined score (Match × 0.6 + Interest × 0.4)
2. **Quick Filters** — Filter by score threshold, skill, availability
3. **Candidate Cards** — Expandable cards with full profile, match explanation, conversation summary
4. **Export** — Download shortlist as PDF/CSV
5. **Pipeline View** — Kanban-style board (Discovered → Matched → Engaged → Shortlisted)

**Visual Design:**
- Dark mode with glass morphism
- Animated score gauges
- Smooth transitions between views
- Real-time feel (even if pre-computed)

---

## 🏆 WOW Factor Differentiators (What Wins Hackathons)

### 1. **"Agent Thinking" Visualization**
Show a real-time pipeline visualization where each stage lights up as it processes. Display intermediate outputs, token counts, and processing time. Judges LOVE seeing the AI work.

### 2. **Explainable AI Throughout**
Every score has a "Why?" button. Every decision is justified. This addresses the #1 concern enterprises have about AI — trust and transparency.

### 3. **Live Conversation Replay**
The chat simulation playing out in real-time is visually stunning and demonstrates sophisticated AI reasoning. No other team will have this.

### 4. **Dual-Score Innovation**
Most people would just do match scoring. The **Interest Score from simulated conversations** is a novel concept that shows you're thinking about the full recruitment funnel.

### 5. **One-Click Demo Mode**
Pre-load a compelling JD (e.g., "Senior AI Engineer at a startup") so judges can see the full pipeline in 60 seconds without typing anything.

### 6. **Recruiter Feedback Loop**
Let the recruiter thumbs-up/thumbs-down candidates, and show how the AI would adjust future recommendations based on that feedback. Even if it's simple re-ranking, it demonstrates learning.

---

## Caveats & Risks

| Risk | Mitigation |
|------|-----------|
| **Gemini API rate limits** | Cache all responses aggressively. Pre-compute demo data. Use `gemini-2.0-flash` for speed. |
| **Candidate data realism** | Invest time in the synthetic generation prompt. Use real-world job titles, companies, and skill sets. |
| **Conversation quality** | Few-shot prompt the candidate personas. Test with multiple personality types. |
| **Demo reliability** | Pre-compute one full pipeline run and cache it. Live demo + cached fallback. |
| **Scoring consistency** | Use temperature=0 for scoring calls. Validate scores are in expected ranges. |
| **Time pressure** | Build Module 1→5 in order. Each module is independently demoable. |

---

## Performance Optimizations

1. **Parallel API calls** — Score multiple candidates simultaneously
2. **Streaming responses** — Use Gemini's streaming API for the chat simulation (real-time feel)
3. **Progressive rendering** — Show results as they come in, don't wait for everything
4. **Smart caching** — Cache JD parsing, candidate generation, and match scores in Supabase
5. **Optimistic UI** — Show skeleton loaders and animated placeholders while AI processes

---

## Phased Build Plan

### Phase 1: Foundation (2-3 hours)
- [ ] Set up Next.js project with design system (dark theme, typography, animations)
- [ ] Build the JD input page with paste/upload
- [ ] Implement JD Parser with Gemini API
- [ ] Display parsed results with live animation

### Phase 2: Core Engine (3-4 hours)
- [ ] Build synthetic candidate generation
- [ ] Implement matching & scoring engine
- [ ] Create radar charts and explainability UI
- [ ] Build candidate cards with match details

### Phase 3: Conversation (2-3 hours)
- [ ] Implement conversational outreach simulator
- [ ] Build chat replay UI with typing indicators
- [ ] Extract Interest Score from conversations
- [ ] Add sentiment timeline visualization

### Phase 4: Dashboard & Polish (2-3 hours)
- [ ] Build final ranked dashboard
- [ ] Add filters, sorting, and export
- [ ] Implement demo mode with pre-loaded data
- [ ] Polish animations, transitions, and edge cases

### Phase 5: Bonus (if time permits)
- [ ] Resume upload + parsing (Approach C)
- [ ] Recruiter feedback loop
- [ ] Pipeline visualization ("Agent Thinking" view)
- [ ] PDF export of shortlist

---

## Open Questions

> [!IMPORTANT]
> **Please answer these before we start building:**

1. **Hackathon timeline** — How many hours do you have? This determines whether we go with Option A (full-stack) or Option B (simpler).

2. **Demo format** — Is it a live demo to judges, a recorded video, or a deployed URL they review asynchronously?

3. **Team size** — Are you working solo or with a team? This affects how we split the work.

4. **Gemini API access** — Do you already have a Gemini API key? Are you on the free tier?

5. **Supabase** — Do you already have a Supabase project, or should we go fully in-memory?

6. **Any mandatory requirements** — Does the hackathon specify any particular tech constraints (e.g., must use a specific API, must be open source)?

7. **Deployment requirement** — Do you need it deployed live, or is localhost acceptable for the demo?

8. **Design preferences** — Any specific design direction? I'm thinking a dark, premium "mission control" aesthetic with accent colors — think Bloomberg Terminal meets modern SaaS.

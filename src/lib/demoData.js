/**
 * Demo data — pre-computed pipeline results for instant demo mode.
 * Also serves as fallback if API key is missing or Gemini is down.
 */

export const DEMO_JD = `Senior Full-Stack Engineer — AI Platform

About the Role:
We're looking for a Senior Full-Stack Engineer to join our AI Platform team. You'll build the web applications and APIs that power our machine learning infrastructure, serving millions of predictions daily. This is a high-impact role where you'll work at the intersection of web engineering and AI.

Requirements:
- 5-8 years of professional software engineering experience
- Expert in React/Next.js and modern JavaScript/TypeScript
- Strong backend experience with Node.js and Python
- Experience with cloud platforms (AWS/GCP) and containerization (Docker, Kubernetes)
- Familiarity with ML pipelines and model serving (TensorFlow Serving, MLflow, etc.)
- Experience with PostgreSQL and Redis
- Strong system design skills — you've built systems handling 10k+ RPS

Nice to Have:
- Experience with real-time data streaming (Kafka, Pub/Sub)
- Contributions to open-source projects
- Experience with LLM integration and prompt engineering
- Knowledge of monitoring/observability (Datadog, Grafana)

What We Offer:
- Competitive salary: $180,000 - $230,000 base
- Remote-first culture with quarterly team offsites
- Generous equity package
- Unlimited PTO and flexible hours
- $5,000 annual learning budget

We value ownership, curiosity, and moving fast with intention. Our team is small (12 engineers) but ships like a team of 50.`;

export const DEMO_PARSED_JD = {
  role_title: "Senior Full-Stack Engineer",
  department: "AI Platform",
  company_hint: "Not specified",
  experience_range: { min: 5, max: 8 },
  required_skills: [
    { skill: "React/Next.js", importance: "critical", confidence: 0.95 },
    { skill: "Node.js", importance: "critical", confidence: 0.92 },
    { skill: "Python", importance: "high", confidence: 0.88 },
    { skill: "TypeScript", importance: "high", confidence: 0.90 },
    { skill: "AWS/GCP", importance: "high", confidence: 0.85 },
    { skill: "Docker/Kubernetes", importance: "high", confidence: 0.87 },
    { skill: "PostgreSQL", importance: "high", confidence: 0.90 },
    { skill: "System Design", importance: "critical", confidence: 0.82 },
    { skill: "ML Pipelines", importance: "medium", confidence: 0.70 },
    { skill: "Redis", importance: "medium", confidence: 0.85 },
  ],
  preferred_skills: [
    "Kafka/Pub/Sub",
    "Open Source",
    "LLM Integration",
    "Datadog/Grafana",
  ],
  education: "BS/MS in Computer Science or equivalent",
  culture_signals: [
    "ownership-driven",
    "curiosity-valued",
    "fast-paced",
    "remote-friendly",
    "small team",
  ],
  compensation_hint: "$180,000 - $230,000",
  location: "Remote-first",
  work_model: "remote",
  key_responsibilities: [
    "Build web applications and APIs for ML infrastructure",
    "Serve millions of predictions daily",
    "Work at the intersection of web engineering and AI",
    "Contribute to system design for 10k+ RPS systems",
  ],
  deal_breakers: [
    "Must have 5+ years of experience",
    "Must have React/Next.js expertise",
    "Must have cloud platform experience",
  ],
};

export const DEMO_CANDIDATES = [
  {
    id: "cand_001",
    name: "Priya Sharma",
    current_role: "Senior Software Engineer",
    current_company: "Stripe",
    experience_years: 7,
    education: "M.S. Computer Science, Stanford University",
    skills: [
      "React", "Next.js", "TypeScript", "Node.js", "Python", "AWS",
      "Kubernetes", "PostgreSQL", "Redis", "System Design", "GraphQL",
    ],
    location: "San Francisco, USA",
    salary_expectation: "$190k-$220k",
    availability: "2 weeks",
    personality_traits: ["ambitious", "detail-oriented", "collaborative"],
    career_motivations: ["technical leadership", "cutting-edge AI work", "equity upside"],
    linkedin_summary:
      "Senior engineer at Stripe building payment infrastructure at scale. Passionate about intersection of distributed systems and AI. Former Google intern.",
    open_to_change: true,
  },
  {
    id: "cand_002",
    name: "Marcus Chen",
    current_role: "Staff Engineer",
    current_company: "Netflix",
    experience_years: 9,
    education: "B.S. Computer Engineering, MIT",
    skills: [
      "React", "TypeScript", "Java", "Python", "AWS", "Kubernetes",
      "PostgreSQL", "Kafka", "System Design", "ML Pipelines", "TensorFlow",
    ],
    location: "Los Angeles, USA",
    salary_expectation: "$220k-$260k",
    availability: "1 month",
    personality_traits: ["analytical", "reserved", "thorough"],
    career_motivations: ["technical depth", "work-life balance", "impactful products"],
    linkedin_summary:
      "Staff engineer at Netflix leading personalization platform. Built recommendation systems serving 200M+ users. Deep expertise in ML infra.",
    open_to_change: false,
  },
  {
    id: "cand_003",
    name: "Sarah Okonkwo",
    current_role: "Full-Stack Developer",
    current_company: "Shopify",
    experience_years: 5,
    education: "B.S. Software Engineering, University of Waterloo",
    skills: [
      "React", "Next.js", "TypeScript", "Node.js", "Ruby on Rails",
      "PostgreSQL", "Redis", "Docker", "GCP", "GraphQL",
    ],
    location: "Toronto, Canada",
    salary_expectation: "$170k-$195k",
    availability: "2 weeks",
    personality_traits: ["energetic", "creative", "team-player"],
    career_motivations: ["learning AI/ML", "remote work", "startup culture"],
    linkedin_summary:
      "Full-stack developer at Shopify building merchant tools. Love solving complex UI challenges. Active open-source contributor to Next.js ecosystem.",
    open_to_change: true,
  },
  {
    id: "cand_004",
    name: "Raj Patel",
    current_role: "ML Platform Engineer",
    current_company: "Uber",
    experience_years: 6,
    education: "M.S. Data Science, Carnegie Mellon University",
    skills: [
      "Python", "TensorFlow", "MLflow", "Kubernetes", "AWS", "Docker",
      "PostgreSQL", "Kafka", "React", "System Design",
    ],
    location: "Seattle, USA",
    salary_expectation: "$185k-$210k",
    availability: "1 month",
    personality_traits: ["curious", "data-driven", "independent"],
    career_motivations: ["ML engineering leadership", "building from scratch", "equity"],
    linkedin_summary:
      "ML Platform engineer at Uber building model serving infrastructure handling 100k+ predictions/sec. Bridge between ML research and production engineering.",
    open_to_change: true,
  },
  {
    id: "cand_005",
    name: "Elena Rodriguez",
    current_role: "Frontend Lead",
    current_company: "Figma",
    experience_years: 8,
    education: "B.A. Design + CS Minor, RISD",
    skills: [
      "React", "TypeScript", "Next.js", "CSS/Design Systems", "WebGL",
      "Node.js", "Performance Optimization", "A11y",
    ],
    location: "New York, USA",
    salary_expectation: "$200k-$240k",
    availability: "3 months",
    personality_traits: ["perfectionist", "design-minded", "outspoken"],
    career_motivations: ["design-engineering", "creative tools", "large impact"],
    linkedin_summary:
      "Frontend Lead at Figma building collaborative design tools. Obsessed with performance and pixel-perfection. Speaker at React Conf 2024.",
    open_to_change: false,
  },
  {
    id: "cand_006",
    name: "David Kim",
    current_role: "Backend Engineer",
    current_company: "Datadog",
    experience_years: 4,
    education: "B.S. Computer Science, UC Berkeley",
    skills: [
      "Go", "Python", "Kubernetes", "Docker", "AWS", "PostgreSQL",
      "Kafka", "Datadog", "Grafana", "Prometheus",
    ],
    location: "San Francisco, USA",
    salary_expectation: "$160k-$185k",
    availability: "immediate",
    personality_traits: ["eager", "humble", "fast-learner"],
    career_motivations: ["full-stack growth", "AI exposure", "mentorship"],
    linkedin_summary:
      "Backend engineer at Datadog working on observability pipelines. Strong in infrastructure but eager to expand into full-stack and AI. Cal grad.",
    open_to_change: true,
  },
  {
    id: "cand_007",
    name: "Aisha Mohammed",
    current_role: "Senior Platform Engineer",
    current_company: "Vercel",
    experience_years: 6,
    education: "M.S. Computer Science, Georgia Tech",
    skills: [
      "Next.js", "React", "TypeScript", "Node.js", "Edge Computing",
      "PostgreSQL", "Redis", "Docker", "AWS", "Serverless",
    ],
    location: "Austin, USA",
    salary_expectation: "$180k-$210k",
    availability: "2 weeks",
    personality_traits: ["proactive", "communicative", "systems-thinker"],
    career_motivations: ["platform engineering", "AI/ML integration", "leadership path"],
    linkedin_summary:
      "Senior Platform Engineer at Vercel working on edge runtime and serverless infrastructure. Deep Next.js expertise. Building the future of web deployment.",
    open_to_change: true,
  },
  {
    id: "cand_008",
    name: "James Wright",
    current_role: "Junior Developer",
    current_company: "Local Agency",
    experience_years: 2,
    education: "Bootcamp Graduate, General Assembly",
    skills: [
      "JavaScript", "React", "HTML/CSS", "Node.js", "MongoDB",
      "Git", "Basic Python",
    ],
    location: "Denver, USA",
    salary_expectation: "$90k-$110k",
    availability: "immediate",
    personality_traits: ["enthusiastic", "scrappy", "learning-focused"],
    career_motivations: ["career growth", "mentorship", "big tech experience"],
    linkedin_summary:
      "Self-taught developer who transitioned from marketing. Building web apps at a local agency. Hungry to learn and grow in a fast-paced environment.",
    open_to_change: true,
  },
];

export const DEMO_SCORES = [
  {
    candidate_id: "cand_001",
    match_score: 92,
    dimension_scores: {
      skill_match: 95,
      experience_fit: 90,
      education_match: 95,
      culture_fit: 90,
      availability: 95,
      salary_alignment: 85,
    },
    matched_skills: ["React/Next.js", "TypeScript", "Node.js", "Python", "AWS", "Kubernetes", "PostgreSQL", "Redis", "System Design"],
    missing_skills: ["ML Pipelines"],
    explanation: "Priya is an exceptional match. Her Stripe experience demonstrates ability to build high-scale systems, and she has nearly all required skills. The only gap is direct ML pipeline experience, but her Stanford CS background and AI interest suggest quick ramp-up.",
    strengths: ["Full-stack expertise at scale", "Strong system design background"],
    concerns: ["Limited direct ML pipeline experience"],
  },
  {
    candidate_id: "cand_002",
    match_score: 78,
    dimension_scores: {
      skill_match: 80,
      experience_fit: 85,
      education_match: 90,
      culture_fit: 65,
      availability: 75,
      salary_alignment: 55,
    },
    matched_skills: ["React", "TypeScript", "Python", "AWS", "Kubernetes", "PostgreSQL", "Kafka", "System Design", "ML Pipelines"],
    missing_skills: ["Next.js", "Node.js (primary)"],
    explanation: "Marcus has excellent technical depth and ML pipeline experience from Netflix. However, his salary expectations exceed the range by $30-40k, and his reserved personality may not align with the fast-paced startup culture. He's also not actively looking.",
    strengths: ["Deep ML infrastructure experience", "Staff-level system design"],
    concerns: ["Salary misalignment", "Not actively seeking change"],
  },
  {
    candidate_id: "cand_003",
    match_score: 85,
    dimension_scores: {
      skill_match: 88,
      experience_fit: 78,
      education_match: 85,
      culture_fit: 95,
      availability: 95,
      salary_alignment: 90,
    },
    matched_skills: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "Redis", "Docker", "GCP"],
    missing_skills: ["Python (backend)", "Kubernetes", "ML Pipelines", "System Design (at scale)"],
    explanation: "Sarah is a strong culture fit with solid full-stack skills and Next.js expertise. Her Shopify experience shows she can build at scale. Gaps in ML and system design could be addressed with mentoring given her learning motivation.",
    strengths: ["Perfect culture match", "Strong Next.js and full-stack skills"],
    concerns: ["At the low end of experience range", "No ML pipeline background"],
  },
  {
    candidate_id: "cand_004",
    match_score: 88,
    dimension_scores: {
      skill_match: 85,
      experience_fit: 88,
      education_match: 95,
      culture_fit: 88,
      availability: 80,
      salary_alignment: 92,
    },
    matched_skills: ["Python", "Kubernetes", "AWS", "Docker", "PostgreSQL", "Kafka", "React", "System Design", "ML Pipelines", "TensorFlow"],
    missing_skills: ["Next.js", "TypeScript", "Node.js (primary)"],
    explanation: "Raj brings exactly the ML platform expertise the role needs. His CMU data science degree and Uber ML infra experience are highly relevant. The gap is in frontend/Next.js depth — he has React skills but isn't a frontend expert.",
    strengths: ["Direct ML pipeline experience", "System design at Uber scale"],
    concerns: ["Frontend/Next.js depth is limited"],
  },
  {
    candidate_id: "cand_005",
    match_score: 68,
    dimension_scores: {
      skill_match: 72,
      experience_fit: 80,
      education_match: 60,
      culture_fit: 55,
      availability: 40,
      salary_alignment: 65,
    },
    matched_skills: ["React", "TypeScript", "Next.js", "Node.js"],
    missing_skills: ["Python", "AWS/GCP", "Kubernetes", "PostgreSQL", "ML Pipelines", "System Design"],
    explanation: "Elena is a world-class frontend engineer but the role needs full-stack and ML infrastructure skills she doesn't have. Her 3-month availability and above-range salary expectations are additional concerns.",
    strengths: ["Exceptional frontend/React expertise", "Performance optimization skills"],
    concerns: ["Missing critical backend/infra skills", "3-month availability window"],
  },
  {
    candidate_id: "cand_006",
    match_score: 62,
    dimension_scores: {
      skill_match: 60,
      experience_fit: 55,
      education_match: 80,
      culture_fit: 75,
      availability: 100,
      salary_alignment: 95,
    },
    matched_skills: ["Python", "Kubernetes", "Docker", "AWS", "PostgreSQL", "Kafka", "Datadog"],
    missing_skills: ["React/Next.js", "TypeScript", "Node.js", "ML Pipelines", "System Design"],
    explanation: "David has strong backend infrastructure skills and his Datadog experience is directly relevant for observability. However, he's 1 year below the minimum experience requirement and lacks frontend skills critical for this full-stack role.",
    strengths: ["Strong infrastructure/observability background", "Budget-friendly salary"],
    concerns: ["Below minimum experience requirement", "No frontend experience"],
  },
  {
    candidate_id: "cand_007",
    match_score: 91,
    dimension_scores: {
      skill_match: 92,
      experience_fit: 85,
      education_match: 90,
      culture_fit: 92,
      availability: 95,
      salary_alignment: 90,
    },
    matched_skills: ["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL", "Redis", "Docker", "AWS", "Edge Computing"],
    missing_skills: ["Python (backend)", "Kubernetes", "ML Pipelines"],
    explanation: "Aisha is an outstanding match. Her Vercel experience means she lives and breathes Next.js and modern web infrastructure. The edge computing and serverless expertise is highly transferable. Minor gaps in Python backend and ML pipelines.",
    strengths: ["Deep Next.js platform expertise from Vercel", "Proactive leadership material"],
    concerns: ["Limited ML pipeline experience"],
  },
  {
    candidate_id: "cand_008",
    match_score: 28,
    dimension_scores: {
      skill_match: 25,
      experience_fit: 15,
      education_match: 30,
      culture_fit: 45,
      availability: 100,
      salary_alignment: 100,
    },
    matched_skills: ["JavaScript", "React", "Node.js"],
    missing_skills: ["TypeScript", "Python", "AWS/GCP", "Kubernetes", "PostgreSQL", "Redis", "System Design", "ML Pipelines"],
    explanation: "James is significantly underqualified for this senior role. With only 2 years experience from a bootcamp and no cloud/infra/ML skills, there's a major gap. His enthusiasm is noted but this role requires 5+ years minimum.",
    strengths: ["Enthusiasm and growth mindset", "Immediately available"],
    concerns: ["3 years below minimum experience", "Missing most required skills"],
  },
];

export const DEMO_OUTREACH = {
  cand_001: {
    messages: [
      { role: "recruiter", text: "Hi Priya! I came across your impressive profile — your work at Stripe on payment infrastructure at scale is exactly the kind of expertise we're looking for. We have a Senior Full-Stack Engineer role on our AI Platform team that I think would be a great fit. Would you be open to learning more?", sentiment: 0.8 },
      { role: "candidate", text: "Hi! Thanks for reaching out. I've been curious about AI platform roles — the intersection of web engineering and ML is really exciting to me. What does the team look like?", sentiment: 0.7 },
      { role: "recruiter", text: "Great question! It's a tight-knit team of 12 engineers building web applications and APIs that power our ML infrastructure — we serve millions of predictions daily. You'd be working with React/Next.js on the frontend and Python/Node.js on the backend. The role is fully remote.", sentiment: 0.8 },
      { role: "candidate", text: "That sounds really compelling! 12 engineers shipping that volume of work is impressive. I love small, high-impact teams. I should mention though — I don't have direct ML pipeline experience. Is that a dealbreaker?", sentiment: 0.6 },
      { role: "recruiter", text: "Not at all — your Stanford CS background and system design experience are more important. We have ML engineers who handle the model side. We need someone who can build the platform around it. Think APIs, dashboards, deployment pipelines. Your Stripe experience is perfect for this.", sentiment: 0.85 },
      { role: "candidate", text: "Oh, that's exactly the kind of work I enjoy! Building the infrastructure and interfaces that make ML accessible. What's the compensation looking like?", sentiment: 0.8 },
      { role: "recruiter", text: "The range is $180k-$230k base, plus a generous equity package. For someone with your experience, I'd expect us to be competitive. We also offer unlimited PTO, a $5k learning budget, and quarterly team offsites.", sentiment: 0.8 },
      { role: "candidate", text: "That's right in my range, honestly. I'm currently at $195k at Stripe so anything north of $200k base would be motivating. The equity piece is interesting too — what stage is the company?", sentiment: 0.85 },
      { role: "recruiter", text: "We're Series B, growing fast but still early enough for meaningful equity. Your shares would have significant upside. Would you be open to a technical conversation with our engineering lead this week?", sentiment: 0.85 },
      { role: "candidate", text: "Absolutely! I could do Thursday or Friday afternoon. I'm genuinely excited about this — it checks a lot of boxes for me. Can you send over more details about the tech stack and any system design docs?", sentiment: 0.9 },
    ],
    interest_score: 88,
    interest_signals: {
      enthusiasm: 90,
      questions_asked: 85,
      salary_alignment: 88,
      timeline_willingness: 92,
      objections_severity: 85,
      flight_risk: 30,
    },
    key_moments: [
      { message_index: 1, label: "Candidate shows genuine curiosity about AI platform work" },
      { message_index: 3, label: "Proactively discloses ML experience gap — shows honesty" },
      { message_index: 7, label: "Strong salary alignment — current comp is within range" },
      { message_index: 9, label: "Enthusiastic about next steps — asks for technical details" },
    ],
    summary: "Highly engaged conversation. Priya showed genuine excitement about the AI platform intersection and the small team culture. Salary expectations align well. The only concern raised (ML pipeline experience) was addressed satisfactorily. She's ready to move fast with scheduling.",
  },
  cand_004: {
    messages: [
      { role: "recruiter", text: "Hi Raj! Your ML Platform work at Uber is impressive — building model serving at 100k+ predictions/sec is exactly the scale we operate at. We have a Senior Full-Stack Engineer role on our AI Platform team. Interested in hearing more?", sentiment: 0.8 },
      { role: "candidate", text: "Hey! Thanks — yeah, ML platform work is my passion. But I notice the title says 'Full-Stack Engineer.' I'm primarily a platform/backend engineer. How much frontend is involved?", sentiment: 0.4 },
      { role: "recruiter", text: "Honest answer: it's about 40% frontend (React/Next.js dashboards and interfaces), 40% backend (APIs and data pipelines), and 20% infra. Your ML platform expertise is the hardest skill to find — we can support you ramping up on the frontend side.", sentiment: 0.7 },
      { role: "candidate", text: "I appreciate the transparency. I do have some React experience but I wouldn't call myself a frontend expert. That said, I'm genuinely interested in the ML platform side. What does 'millions of predictions daily' look like in your architecture?", sentiment: 0.6 },
      { role: "recruiter", text: "We run a microservices architecture on Kubernetes with TensorFlow Serving and custom model endpoints. The platform team builds the deployment pipeline, monitoring dashboards, A/B testing framework, and feature stores. Very similar to what you've built at Uber.", sentiment: 0.8 },
      { role: "candidate", text: "That actually sounds really familiar! I've worked with TensorFlow Serving extensively. The monitoring and A/B testing piece is interesting — at Uber we use a custom solution but it's always interesting to see different approaches. What's the salary range?", sentiment: 0.75 },
      { role: "recruiter", text: "The range is $180k-$230k base plus equity. Given your unique ML platform background, I think we'd be at the upper end of that range.", sentiment: 0.8 },
      { role: "candidate", text: "That works for me — I'm at $195k now and was hoping for $200k+ in any move. The equity could be compelling depending on the stage. I'd want to understand the growth trajectory of the platform team too. Is there a path to leading the ML infra side?", sentiment: 0.7 },
      { role: "recruiter", text: "Absolutely. With your experience, a tech lead path for ML infrastructure is very realistic within 12-18 months. We're growing the team and need someone to own that domain. Want to set up a call with our CTO?", sentiment: 0.85 },
      { role: "candidate", text: "Let me think about it over the weekend and get back to you Monday. I need to consider the frontend component — it's not a dealbreaker but I want to make sure I'd be set up for success. Can you share any documentation about the tech stack?", sentiment: 0.6 },
    ],
    interest_score: 72,
    interest_signals: {
      enthusiasm: 70,
      questions_asked: 90,
      salary_alignment: 85,
      timeline_willingness: 60,
      objections_severity: 65,
      flight_risk: 40,
    },
    key_moments: [
      { message_index: 1, label: "Immediate concern about frontend requirements" },
      { message_index: 5, label: "Architecture similarity sparked genuine interest" },
      { message_index: 7, label: "Asked about leadership path — strong growth signal" },
      { message_index: 9, label: "Wants to 'think about it' — moderate hesitation" },
    ],
    summary: "Raj showed strong interest in the ML platform aspects but has legitimate concerns about the frontend component. His technical questions were insightful and showed genuine curiosity. Salary alignment is good. The weekend deliberation signal suggests he's seriously considering but not immediately sold.",
  },
  cand_007: {
    messages: [
      { role: "recruiter", text: "Hi Aisha! Your work at Vercel on edge runtime and serverless infrastructure is fascinating. We're building an AI Platform and need someone with deep Next.js platform expertise — your name keeps coming up in our research. Got 5 minutes?", sentiment: 0.85 },
      { role: "candidate", text: "Hi! That's flattering, thank you. I love what I do at Vercel but I'm always curious about what's next. An AI Platform role sounds intriguing — what would my day-to-day look like?", sentiment: 0.7 },
      { role: "recruiter", text: "You'd be building the web layer of our ML infrastructure — think dashboards for model monitoring, APIs for prediction serving, deployment pipelines, and developer tools. Your edge computing and serverless expertise would help us innovate on how we serve models.", sentiment: 0.8 },
      { role: "candidate", text: "Oh interesting! Serving ML models at the edge is something I've been thinking about a lot. At Vercel we're seeing teams try to do exactly this with our Edge Functions. I'd love to be on the other side, building the platform that needs this infrastructure.", sentiment: 0.85 },
      { role: "recruiter", text: "Exactly! You'd bring a unique perspective that most ML engineers don't have. The role is fully remote, and the team is 12 people who ship fast. We value ownership and the comp range is $180k-$230k plus equity.", sentiment: 0.8 },
      { role: "candidate", text: "Remote is essential for me — glad to hear that. The salary range works. I'm at $190k now. Honestly, what excites me most is the AI/ML integration angle. I've been wanting to go deeper into that space. What would my learning curve look like on the ML side?", sentiment: 0.8 },
      { role: "recruiter", text: "We have dedicated ML engineers for the model development. Your role is platform engineering — making ML accessible and scalable through great tooling. Think of it as applying your Vercel-style platform thinking to the AI space. We also have a $5k learning budget.", sentiment: 0.85 },
      { role: "candidate", text: "That's perfect positioning for my career goals. I want to be a platform engineering leader, and the AI domain is where the most interesting problems are. What's the interview process like?", sentiment: 0.85 },
      { role: "recruiter", text: "It's a 4-step process: intro call with our CTO, a system design session, a coding exercise (take-home or live, your choice), and a culture fit chat. We try to complete it within 2 weeks. When could you start?", sentiment: 0.8 },
      { role: "candidate", text: "I'd need to give 2 weeks notice at Vercel. I could start the interview process this week if you send over the details. I'm genuinely excited about this — it feels like the right next step for me.", sentiment: 0.9 },
    ],
    interest_score: 90,
    interest_signals: {
      enthusiasm: 92,
      questions_asked: 85,
      salary_alignment: 90,
      timeline_willingness: 95,
      objections_severity: 92,
      flight_risk: 20,
    },
    key_moments: [
      { message_index: 3, label: "Connected personal interest (edge ML) with role — strong alignment" },
      { message_index: 5, label: "Career motivation aligns perfectly with role" },
      { message_index: 7, label: "Explicitly states this aligns with career goals" },
      { message_index: 9, label: "Ready to start interview process immediately" },
    ],
    summary: "Exceptional engagement from Aisha. She connected deeply with the role's intersection of platform engineering and AI. Her Vercel background makes her uniquely qualified and she clearly sees this as a career-defining move. Salary alignment is perfect and she's ready to move immediately.",
  },
};

/**
 * Get full demo pipeline results for instant demo mode.
 */
export function getDemoResults() {
  const scores = DEMO_SCORES;
  const candidatesWithScores = DEMO_CANDIDATES.map((candidate) => {
    const score = scores.find((s) => s.candidate_id === candidate.id);
    const outreach = DEMO_OUTREACH[candidate.id] || null;
    return {
      ...candidate,
      score,
      outreach,
      combined_score: score
        ? Math.round(score.match_score * 0.6 + (outreach?.interest_score || 50) * 0.4)
        : 0,
    };
  });

  // Sort by combined score descending
  candidatesWithScores.sort((a, b) => b.combined_score - a.combined_score);

  return {
    jd: DEMO_JD,
    parsedJD: DEMO_PARSED_JD,
    candidates: candidatesWithScores,
    scores,
  };
}

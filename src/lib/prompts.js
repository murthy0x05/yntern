export function parseJDPrompt(jdText) {
  return `You are an expert HR analyst. Parse the following Job Description and extract structured information.

JOB DESCRIPTION:
"""
${jdText}
"""

Return a JSON object with exactly this structure:
{
  "role_title": "string — the job title",
  "department": "string — department or team (infer if not stated)",
  "company_hint": "string — company name if mentioned, else 'Not specified'",
  "experience_range": { "min": number, "max": number },
  "required_skills": [
    { "skill": "string", "importance": "critical|high|medium", "confidence": 0.0-1.0 }
  ],
  "preferred_skills": ["string"],
  "education": "string — education requirements",
  "culture_signals": ["string — e.g. 'fast-paced', 'collaborative'"],
  "compensation_hint": "string — salary range if mentioned, else 'Not specified'",
  "location": "string",
  "work_model": "remote|hybrid|onsite|flexible",
  "key_responsibilities": ["string — top 4 responsibilities"],
  "deal_breakers": ["string — absolute must-haves"]
}

Be thorough. Assign confidence scores based on how explicitly each skill is mentioned. If something is implied rather than stated, use lower confidence (0.5-0.7).`;
}

export function generateCandidatesPrompt(parsedJD) {
  return `You are a talent sourcing AI. Based on the following parsed Job Description, generate 8 realistic candidate profiles with VARYING match levels — some excellent, some good, some mediocre.

PARSED JOB DESCRIPTION:
${JSON.stringify(parsedJD, null, 2)}

Generate a JSON array of 8 candidate objects. Each candidate must have:
{
  "id": "unique string id like cand_001",
  "name": "realistic full name — use diverse names",
  "current_role": "their current job title",
  "current_company": "a realistic company name",
  "experience_years": number,
  "education": "degree and university",
  "skills": ["list of their actual skills — should partially overlap with JD"],
  "location": "city, country",
  "salary_expectation": "string like '$150k-$170k'",
  "availability": "immediate|2 weeks|1 month|3 months",
  "personality_traits": ["e.g. ambitious, reserved, detail-oriented"],
  "career_motivations": ["what they want — e.g. 'technical leadership', 'work-life balance'"],
  "linkedin_summary": "a brief 2-sentence professional summary",
  "open_to_change": true/false — roughly 60% should be true
}

IMPORTANT:
- Make 2-3 candidates excellent matches (most skills, right experience)
- Make 2-3 candidates good but imperfect matches (missing 1-2 key skills)
- Make 2 candidates mediocre matches (different background, fewer overlaps)
- Use realistic, diverse names and backgrounds
- Vary experience levels around the JD range`;
}

export function scoreCandidatesPrompt(parsedJD, candidates) {
  return `You are an expert talent matching AI. Score each candidate against the Job Description.

PARSED JOB DESCRIPTION:
${JSON.stringify(parsedJD, null, 2)}

CANDIDATES:
${JSON.stringify(candidates, null, 2)}

For each candidate, return a JSON array of scoring objects:
[
  {
    "candidate_id": "string",
    "match_score": 0-100,
    "dimension_scores": {
      "skill_match": 0-100,
      "experience_fit": 0-100,
      "education_match": 0-100,
      "culture_fit": 0-100,
      "availability": 0-100,
      "salary_alignment": 0-100
    },
    "matched_skills": ["skills they have that the JD wants"],
    "missing_skills": ["skills the JD wants that they lack"],
    "explanation": "2-3 sentence justification for the score. Be specific about why.",
    "strengths": ["top 2 strengths for this role"],
    "concerns": ["top 1-2 concerns"]
  }
]

Be rigorous with scoring:
- 90-100: Near-perfect match
- 75-89: Strong match with minor gaps
- 60-74: Decent match, notable gaps
- 40-59: Weak match
- Below 40: Poor match

Weight skill_match most heavily (35%), then experience_fit (20%), culture_fit (15%), salary_alignment (10%), availability (10%), education (10%).`;
}

export function simulateOutreachPrompt(parsedJD, candidate, candidateScore) {
  return `You are simulating a realistic recruitment outreach conversation. Generate a multi-turn chat between a recruiter and a candidate.

JOB DETAILS:
- Role: ${parsedJD.role_title}
- Company: ${parsedJD.company_hint}
- Key Skills: ${parsedJD.required_skills?.map(s => s.skill).join(', ')}
- Location: ${parsedJD.location}
- Compensation: ${parsedJD.compensation_hint}

CANDIDATE PROFILE:
- Name: ${candidate.name}
- Current Role: ${candidate.current_role} at ${candidate.current_company}
- Experience: ${candidate.experience_years} years
- Skills: ${candidate.skills?.join(', ')}
- Salary Expectation: ${candidate.salary_expectation}
- Availability: ${candidate.availability}
- Open to Change: ${candidate.open_to_change}
- Personality: ${candidate.personality_traits?.join(', ')}
- Motivations: ${candidate.career_motivations?.join(', ')}
- Match Score: ${candidateScore?.match_score}/100

Generate a JSON object with:
{
  "messages": [
    { "role": "recruiter"|"candidate", "text": "message text", "sentiment": -1.0 to 1.0 }
  ],
  "interest_score": 0-100,
  "interest_signals": {
    "enthusiasm": 0-100,
    "questions_asked": 0-100,
    "salary_alignment": 0-100,
    "timeline_willingness": 0-100,
    "objections_severity": 0-100,
    "flight_risk": 0-100
  },
  "key_moments": [
    { "message_index": number, "label": "brief description of why this moment matters" }
  ],
  "summary": "2-3 sentence summary of how the conversation went"
}

RULES:
- Generate 8-12 messages total
- The recruiter introduces the opportunity warmly
- The candidate responds based on their personality and motivations
- Include salary discussion
- Candidate who is open_to_change=true and has high match should show HIGH interest (70-95)
- Candidate who is open_to_change=false should show LOWER interest (20-50)
- Make the conversation feel natural and realistic
- Sentiment should range from -1 (very negative) to 1 (very positive)`;
}

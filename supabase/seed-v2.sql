-- Insert Recruiters
INSERT INTO recruiters (id, name, company) VALUES
(1, 'John Doe', 'Stripe'),
(2, 'Jane Smith', 'Vercel');

-- Insert Jobs (from jobs page)
INSERT INTO jobs (id, recruiter_id, company, initials, role, location, salary, type, match_score, interest_score, posted) VALUES
(1, 1, 'Stripe', 'ST', 'Staff Software Engineer', 'San Francisco, CA · Remote', '$220k – $300k', 'Full-time', 94, 87, '2h ago'),
(2, 2, 'Vercel', 'VC', 'Senior Frontend Engineer', 'Remote', '$180k – $240k', 'Full-time', 91, 82, '5h ago'),
(3, 1, 'Figma', 'FG', 'Product Engineer', 'San Francisco, CA', '$190k – $260k', 'Full-time', 88, 90, '1d ago'),
(4, 2, 'DeepMind', 'DM', 'ML Infrastructure Engineer', 'London, UK', '£120k – £180k', 'Full-time', 82, 94, '1d ago'),
(5, 1, 'Databricks', 'DB', 'Senior Data Engineer', 'Remote (US)', '$200k – $270k', 'Full-time', 79, 76, '2d ago'),
(6, 2, 'Linear', 'LN', 'Full-Stack Developer', 'Remote', '$160k – $210k', 'Full-time', 86, 88, '3d ago');

-- Insert Applications (from applications page)
-- Mapping to candidates by ID since we don't have the exact ones. Let's just use candidate_id 1 for all for the current demo candidate.
-- Or just create them. Let's use candidate_id 1 (Maya Chen)
INSERT INTO applications (id, candidate_id, job_id, status, stage, company, role) VALUES
(1, 1, 1, 'Interview Scheduled', 'Interview', 'Stripe', 'Staff Software Engineer'),
(2, 1, 2, 'In Review', 'Screening', 'Vercel', 'Senior Frontend Engineer'),
(3, 1, 3, 'Offer Extended', 'Offer', 'Figma', 'Product Engineer'),
(4, 1, 4, 'Applied', 'Applied', 'DeepMind', 'ML Infrastructure Engineer'),
(5, 1, 6, 'Screening', 'Screening', 'Linear', 'Full-Stack Developer'),
(6, 1, 5, 'Withdrawn', 'Withdrawn', 'Databricks', 'Senior Data Engineer');

-- Insert Messages (from messages page)
-- Assume chats exist (ID 1, 2, 3)
INSERT INTO chats (id, candidate_id, status, summary) VALUES 
(1, 1, 'active', 'Chat with Maya Chen'),
(2, 2, 'active', 'Chat with Arjun Patel'),
(3, 3, 'active', 'Chat with Sarah Kim')
ON CONFLICT DO NOTHING;

INSERT INTO messages (chat_id, sender, text, time) VALUES
(1, 'ai', 'Hi Maya! I came across your profile and was impressed by your distributed systems work at Stripe. We have an exciting Staff Engineer role — would you be open to learning more?', '10:30 AM'),
(1, 'candidate', 'Hi! Thanks for reaching out. I''m always open to hearing about interesting opportunities. What''s the tech stack like?', '11:15 AM'),
(1, 'ai', 'The stack is Go-based with heavy use of Kubernetes and gRPC — right up your alley. The team is building a next-gen real-time data platform. Interested in a deeper conversation?', '11:16 AM'),
(1, 'candidate', 'That sounds very aligned with what I''ve been doing. I''d love to chat with the hiring manager. Can we set something up for next week?', '11:45 AM'),

(2, 'ai', 'Hi Arjun! Your Kafka expertise at Confluent caught our attention. We''re looking for a senior engineer who can lead our event-driven architecture. Interested?', 'Yesterday, 2:00 PM'),
(2, 'candidate', 'Thanks! I''m fairly happy at Confluent but open to hearing more. What''s the team size and scope?', 'Yesterday, 4:30 PM'),
(2, 'ai', 'The team is 12 engineers, and the role involves both IC work and technical mentoring. Competitive equity package too.', 'Yesterday, 4:32 PM'),
(2, 'candidate', 'Sounds interesting. Let me think about it and get back to you by end of week.', 'Today, 9:15 AM'),

(3, 'ai', 'Hi Sarah! With your principal-level experience across Datadog, Netflix, and Google, you''d be an incredible fit for our Staff Engineer role. Would love to chat!', 'Mon, 10:00 AM'),
(3, 'candidate', 'I appreciate you reaching out! I''ve actually been looking for my next challenge. Tell me about the company culture.', 'Mon, 1:20 PM'),
(3, 'ai', 'We value engineering excellence, async-first communication, and deep technical ownership. Engineers own their services end-to-end.', 'Mon, 1:22 PM'),
(3, 'candidate', 'That''s exactly what I''m looking for. Let''s schedule a call — I''m very interested!', 'Mon, 3:00 PM');

-- Create candidates table
CREATE TABLE candidates (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    title TEXT NOT NULL,
    company TEXT,
    location TEXT,
    skills TEXT[] NOT NULL DEFAULT '{}',
    match_score INTEGER NOT NULL DEFAULT 0,
    interest_score INTEGER NOT NULL DEFAULT 0,
    initials TEXT,
    experience TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Insert mock data
INSERT INTO candidates (name, title, company, location, skills, match_score, interest_score, initials, experience) VALUES
('Maya Chen', 'Staff Software Engineer', 'Stripe', 'San Francisco, CA', ARRAY['Go', 'Distributed Systems', 'Kubernetes', 'gRPC'], 94, 87, 'MC', '8 years'),
('Arjun Patel', 'Senior Backend Engineer', 'Confluent', 'Remote (US)', ARRAY['Java', 'Kafka', 'AWS', 'Microservices'], 91, 72, 'AP', '6 years'),
('Sarah Kim', 'Principal Engineer', 'Datadog', 'New York, NY', ARRAY['Python', 'Observability', 'Terraform', 'CI/CD'], 88, 91, 'SK', '10 years'),
('Liam O''Brien', 'Full-Stack Engineer', 'Vercel', 'Dublin, Ireland', ARRAY['TypeScript', 'React', 'Node.js', 'Next.js'], 85, 68, 'LO', '5 years'),
('Fatima Al-Rashid', 'ML Infrastructure Engineer', 'DeepMind', 'London, UK', ARRAY['Python', 'TensorFlow', 'CUDA', 'MLOps'], 82, 94, 'FA', '7 years'),
('James Rodriguez', 'DevOps Lead', 'HashiCorp', 'Austin, TX', ARRAY['Terraform', 'Docker', 'AWS', 'Go'], 79, 81, 'JR', '9 years'),
('Yuki Tanaka', 'Systems Architect', 'Sony', 'Tokyo, Japan', ARRAY['C++', 'Rust', 'System Design', 'Performance'], 76, 65, 'YT', '12 years'),
('Priya Sharma', 'Cloud Engineer', 'Google Cloud', 'Bangalore, India', ARRAY['GCP', 'Kubernetes', 'Python', 'BigQuery'], 73, 88, 'PS', '4 years');

-- Create chats/messages table
CREATE TABLE chats (
    id SERIAL PRIMARY KEY,
    candidate_id INTEGER REFERENCES candidates(id),
    status TEXT NOT NULL,
    summary TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Insert mock chats
INSERT INTO chats (candidate_id, status, summary) VALUES
(1, 'Awaiting Review', 'Strong interest. Expected base $220k. Available in 3 weeks.'),
(3, 'Interviewing', 'Scheduled for technical screen on Thursday. Mentioned competing offer.'),
(4, 'Declined', 'Not looking to move right now. Happy with current project.'),
(6, 'Offered', 'Offer extended. Waiting for response.');

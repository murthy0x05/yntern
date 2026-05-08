"use client";

const CANDIDATE = {
  name: "Pavan Kumar",
  initials: "PK",
  title: "Full-Stack Developer",
  location: "Hyderabad, India",
  email: "pavan@yntern.com",
  phone: "+91 98765 43210",
  linkedin: "linkedin.com/in/pavankumar",
  github: "github.com/pavankumar",
  portfolio: "pavankumar.dev",
  availability: "Open to Work",
  bio: "Passionate full-stack developer with 3+ years building scalable web applications. Experienced in React, Next.js, Node.js, and cloud infrastructure. Strong interest in AI/ML integration and developer tools. Looking for impactful roles at innovative companies.",
  skills: [
    { name: "React", level: 95 },
    { name: "Next.js", level: 90 },
    { name: "TypeScript", level: 88 },
    { name: "Node.js", level: 85 },
    { name: "Python", level: 78 },
    { name: "PostgreSQL", level: 82 },
    { name: "AWS", level: 75 },
    { name: "Docker", level: 72 },
  ],
  experience: [
    {
      role: "Full-Stack Developer",
      company: "TechStartup Inc.",
      period: "2023 – Present",
      description:
        "Led development of the core product platform, built real-time collaboration features, and improved page load times by 40%.",
    },
    {
      role: "Frontend Engineer",
      company: "Digital Agency Co.",
      period: "2021 – 2023",
      description:
        "Built responsive web applications for enterprise clients, implemented design systems, and mentored junior developers.",
    },
    {
      role: "Software Intern",
      company: "CodeLabs",
      period: "2020 – 2021",
      description:
        "Developed internal tools and contributed to open-source projects. Built automated testing pipelines.",
    },
  ],
  education: [
    {
      degree: "B.Tech in Computer Science",
      institution: "IIT Hyderabad",
      year: "2020",
      gpa: "8.9/10",
    },
  ],
};

export default function CandidateProfilePage() {
  return (
    <div className="max-w-[1440px] mx-auto w-full px-6 lg:px-12 flex-1 flex flex-col gap-10 pt-6 pb-12">
      {/* Profile Header */}
      <section className="flex items-start gap-6 animate-fade-rise">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center text-white text-[28px] font-semibold shrink-0 shadow-[0_4px_20px_rgba(99,102,241,0.25)]">
          {CANDIDATE.initials}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1
              className="text-black"
              style={{
                fontFamily: "'Instrument Serif'",
                fontSize: "36px",
                lineHeight: "1.2",
              }}
            >
              {CANDIDATE.name}
            </h1>
            <span className="px-3 py-1 bg-[#ecfdf5] text-[#059669] rounded-full font-[Inter] text-[11px] font-semibold uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
              {CANDIDATE.availability}
            </span>
          </div>
          <p className="font-[Inter] text-[14px] text-[#4c4546] mt-1">
            {CANDIDATE.title}
          </p>
          <div className="flex items-center gap-4 mt-3">
            <span className="flex items-center gap-1.5 font-[Inter] text-[12px] text-[#848484]">
              <span className="material-symbols-outlined text-[16px]">
                location_on
              </span>
              {CANDIDATE.location}
            </span>
          </div>
        </div>
        <button
          className="flex items-center gap-2 px-5 py-2 border border-[#cfc4c5] rounded-full font-[Inter] text-[12px] font-semibold uppercase tracking-widest text-[#4c4546] hover:border-black hover:text-black transition-all cursor-pointer"
          type="button"
        >
          <span className="material-symbols-outlined text-[16px]">edit</span>
          Edit Profile
        </button>
      </section>

      {/* About */}
      <section className="bg-white border border-[#cfc4c5] rounded-xl p-6 animate-fade-rise-delay">
        <h3 className="font-[Inter] text-[12px] font-semibold tracking-[0.08em] text-[#4c4546] uppercase mb-3">
          About
        </h3>
        <p className="font-[Inter] text-[14px] text-[#1b1b1b] leading-relaxed">
          {CANDIDATE.bio}
        </p>
      </section>

      {/* Contact & Skills — 2 col */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-rise-delay">
        {/* Contact Info */}
        <section className="bg-white border border-[#cfc4c5] rounded-xl p-6 flex flex-col gap-4">
          <h3 className="font-[Inter] text-[12px] font-semibold tracking-[0.08em] text-[#4c4546] uppercase">
            Contact
          </h3>
          <div className="flex flex-col gap-3">
            {[
              {
                icon: "mail",
                label: "Email",
                value: CANDIDATE.email,
                color: "#6366f1",
              },
              {
                icon: "phone",
                label: "Phone",
                value: CANDIDATE.phone,
                color: "#10b981",
              },
              {
                icon: "link",
                label: "LinkedIn",
                value: CANDIDATE.linkedin,
                color: "#3b82f6",
              },
              {
                icon: "code",
                label: "GitHub",
                value: CANDIDATE.github,
                color: "#1b1b1b",
              },
              {
                icon: "language",
                label: "Portfolio",
                value: CANDIDATE.portfolio,
                color: "#8b5cf6",
              },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: item.color + "15" }}
                >
                  <span
                    className="material-symbols-outlined text-[18px]"
                    style={{ color: item.color }}
                  >
                    {item.icon}
                  </span>
                </div>
                <div>
                  <p className="font-[Inter] text-[11px] text-[#848484] uppercase tracking-wide">
                    {item.label}
                  </p>
                  <p className="font-[Inter] text-[13px] text-black">
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section className="bg-white border border-[#cfc4c5] rounded-xl p-6 flex flex-col gap-4">
          <h3 className="font-[Inter] text-[12px] font-semibold tracking-[0.08em] text-[#4c4546] uppercase">
            Skills
          </h3>
          <div className="flex flex-col gap-3">
            {CANDIDATE.skills.map((skill) => (
              <div key={skill.name} className="flex items-center gap-3">
                <span className="font-[Inter] text-[13px] text-black w-24 shrink-0">
                  {skill.name}
                </span>
                <div className="flex-1 h-1.5 bg-[#f3f3f3] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${skill.level}%`,
                      background: "linear-gradient(90deg, #6366f1, #10b981)",
                    }}
                  />
                </div>
                <span className="font-[Inter] text-[11px] font-semibold text-[#4c4546] w-8 text-right">
                  {skill.level}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Experience */}
      <section className="animate-fade-rise-delay-2">
        <h3 className="font-[Inter] text-[12px] font-semibold tracking-[0.08em] text-[#4c4546] uppercase mb-4">
          Experience
        </h3>
        <div className="flex flex-col gap-0">
          {CANDIDATE.experience.map((exp, i) => (
            <div key={i} className="flex gap-4 relative pl-6">
              <div className="absolute left-[7px] top-2 w-2 h-2 rounded-full bg-[#6366f1]" />
              {i < CANDIDATE.experience.length - 1 && (
                <div className="absolute left-[10px] top-5 bottom-0 w-px bg-[#c7d2fe]" />
              )}
              <div className="pb-6 bg-white border border-[#cfc4c5] rounded-xl p-5 flex-1 hover:border-black transition-all duration-300">
                <p className="font-[Inter] text-[15px] font-semibold text-black">
                  {exp.role}
                </p>
                <p className="font-[Inter] text-[13px] text-[#4c4546]">
                  {exp.company} · {exp.period}
                </p>
                <p className="font-[Inter] text-[13px] text-[#848484] mt-2 leading-relaxed">
                  {exp.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section>
        <h3 className="font-[Inter] text-[12px] font-semibold tracking-[0.08em] text-[#4c4546] uppercase mb-4">
          Education
        </h3>
        {CANDIDATE.education.map((edu, i) => (
          <div
            key={i}
            className="bg-white border border-[#cfc4c5] rounded-xl p-5 flex items-center gap-4"
          >
            <div className="w-10 h-10 rounded-xl bg-[#eef2ff] flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px] text-[#6366f1]">
                school
              </span>
            </div>
            <div className="flex-1">
              <p className="font-[Inter] text-[15px] font-semibold text-black">
                {edu.degree}
              </p>
              <p className="font-[Inter] text-[13px] text-[#4c4546]">
                {edu.institution} · {edu.year}
              </p>
            </div>
            <span className="font-[Inter] text-[13px] font-semibold text-[#10b981]">
              GPA: {edu.gpa}
            </span>
          </div>
        ))}
      </section>
    </div>
  );
}

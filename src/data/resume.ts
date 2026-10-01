// All site content lives here. Edit this file to update the website.

// TODO: replace the placeholder links with real URLs.
export const profile = {
  name: "Sanjay Subramanian",
  tagline: "Backend + AI engineer @ Waterloo",
  education: "Bachelor of Mathematics in AI, Minor in Computer Science",
  school: "University of Waterloo",
  graduation: "Expected April 2029",
  email: "sanjaysubb2006@gmail.com",
  github: "https://github.com/your-username",
  linkedin: "https://www.linkedin.com/in/your-profile",
  resume: "/resume.pdf",
};

export type Job = {
  title: string;
  company: string;
  location: string;
  dates: string;
  highlights: string[];
};

export const experience: Job[] = [
  {
    title: "Software Developer",
    company: "Macaca AI",
    location: "Remote",
    dates: "Aug 2026 – Present",
    highlights: [
      "Designed async job pipelines on Redis Streams with retry, backoff, and dead-letter queues to isolate slow providers.",
      "Extended a RAG pipeline that chunks and embeds uploaded documents into Qdrant for per-tenant knowledge retrieval.",
    ],
  },
  {
    title: "Software Engineering Intern",
    company: "U Plus",
    location: "Richmond Hill, ON",
    dates: "Jan 2026 – Apr 2026",
    highlights: [
      "Rebuilt the payment flow in React/TypeScript, boosting checkout conversion by 11% and cutting completion time by 35%.",
      "Right-sized EC2 instances and added request-driven auto-scaling, cutting monthly cloud costs by $3,800.",
    ],
  },
  {
    title: "Software Engineering Intern",
    company: "Mercury Inc",
    location: "Remote",
    dates: "May 2025 – Aug 2025",
    highlights: [
      "Deferred non-critical scripts and lazy-loaded checkout images, improving LCP by 210ms and bounce rate by 12%.",
      "Wrote 180+ Jest and React Testing Library tests for the checkout flow, raising coverage from 41% to 85%.",
    ],
  },
  {
    title: "Software Engineering Intern",
    company: "Terre Sky",
    location: "Remote",
    dates: "Jan 2025 – Apr 2025",
    highlights: [
      "Wrote modular Terraform scripts to provision all AWS infrastructure, cutting staging setup from 1 hour to 5 minutes.",
      "Engineered a Rust data ingestion service processing 5,000+ events/second at sub-10ms latency.",
    ],
  },
];

export type Project = {
  name: string;
  date: string;
  tech: string[];
  highlights: string[];
  link: string;
};

// TODO: replace the placeholder project links.
export const projects: Project[] = [
  {
    name: "Offline Voice Assistant",
    date: "Jan 2026",
    tech: ["Python", "faster-whisper", "Ollama", "asyncio"],
    highlights: [
      "Event-driven pipeline with asyncio queues, achieving under 800ms end-to-end latency.",
      "Runs fully offline with faster-whisper for speech-to-text and Llama 3.2 via Ollama — no API costs.",
    ],
    link: "https://github.com/your-username/offline-voice-assistant",
  },
  {
    name: "Personal Finance Tracker",
    date: "Sep 2025",
    tech: ["React", "TypeScript", "FastAPI", "PostgreSQL", "Docker"],
    highlights: [
      "Full CRUD with AG Grid editable tables and real-time validation, cutting data entry errors by 25%.",
      "JWT auth with bcrypt hashing for 100+ accounts with row-level data isolation.",
    ],
    link: "https://github.com/your-username/finance-tracker",
  },
];

export const skills: Record<string, string[]> = {
  Languages: ["Python", "Go", "C", "C++", "SQL", "JavaScript", "TypeScript", "HTML/CSS"],
  Frameworks: ["React", "Next.js", "Node.js", "Flask", "FastAPI", "GraphQL", "Ant Design"],
  Tools: ["Git", "Docker", "Kubernetes", "AWS", "Terraform", "Redis", "GitHub Actions"],
  Libraries: ["pandas", "NumPy", "Matplotlib", "LangGraph", "CrewAI", "Jest", "React Testing Library"],
  Certifications: ["AWS Cloud Practitioner", "AWS AI Practitioner", "OCP Java SE 11"],
};

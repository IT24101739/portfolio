export interface SkillItem {
  name: string;
  level?: "beginner" | "intermediate" | "advanced" | "expert";
  icon?: string;
}

export interface SkillCategory {
  title: string;
  icon: string;
  description?: string;
  skills: SkillItem[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Programming Languages",
    icon: "code-2",
    description: "Core languages used for AI modeling, backend services, and application development",
    skills: [
      { name: "Python", level: "advanced" },
      { name: "TypeScript", level: "intermediate" },
      { name: "JavaScript", level: "advanced" },
      { name: "Java", level: "intermediate" },
      { name: "C++", level: "intermediate" },
      { name: "SQL", level: "advanced" },
      { name: "HTML5 / CSS3", level: "advanced" },
    ],
  },
  {
    title: "AI & Machine Learning",
    icon: "brain-circuit",
    description: "Frameworks, math libraries, and tools for building and training intelligent systems",
    skills: [
      { name: "PyTorch", level: "intermediate" },
      { name: "TensorFlow", level: "intermediate" },
      { name: "Scikit-Learn", level: "advanced" },
      { name: "NumPy & Pandas", level: "advanced" },
      { name: "Computer Vision (OpenCV)", level: "intermediate" },
      { name: "NLP & Transformers", level: "intermediate" },
      { name: "Data Preprocessing", level: "advanced" },
    ],
  },
  {
    title: "Frontend Development",
    icon: "monitor",
    description: "Building responsive, modern, and accessible user interfaces",
    skills: [
      { name: "React.js", level: "advanced" },
      { name: "Next.js (App Router)", level: "advanced" },
      { name: "Tailwind CSS", level: "advanced" },
      { name: "Framer Motion", level: "intermediate" },
      { name: "Responsive UI/UX", level: "advanced" },
      { name: "State Management", level: "intermediate" },
    ],
  },
  {
    title: "Backend & APIs",
    icon: "server",
    description: "Architecting reliable server-side APIs, microservices, and logic",
    skills: [
      { name: "Node.js", level: "intermediate" },
      { name: "Express.js", level: "intermediate" },
      { name: "FastAPI", level: "intermediate" },
      { name: "RESTful Architecture", level: "advanced" },
      { name: "Authentication (JWT)", level: "intermediate" },
      { name: "API Integration", level: "advanced" },
    ],
  },
  {
    title: "Databases & Storage",
    icon: "database",
    description: "Data modeling, relational design, and persistent storage management",
    skills: [
      { name: "PostgreSQL", level: "intermediate" },
      { name: "MySQL", level: "advanced" },
      { name: "MongoDB", level: "intermediate" },
      { name: "SQLite", level: "advanced" },
      { name: "Database Schema Design", level: "advanced" },
    ],
  },
  {
    title: "Developer Tools & DevOps",
    icon: "wrench",
    description: "Essential workflow, version control, and containerization tooling",
    skills: [
      { name: "Git & GitHub", level: "advanced" },
      { name: "VS Code & JetBrains", level: "advanced" },
      { name: "Docker (Containers)", level: "intermediate" },
      { name: "Linux / Shell Scripting", level: "intermediate" },
      { name: "Postman API Client", level: "advanced" },
      { name: "Vercel Deployment", level: "advanced" },
    ],
  },
];

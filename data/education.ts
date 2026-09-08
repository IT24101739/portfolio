export interface EducationEntry {
  id: string;
  institution: string;
  institutionShort: string;
  degree: string;
  specialization: string;
  startYear?: number;
  endYear?: number;
  status: "current" | "completed";
  levelType: "tertiary" | "secondary";
  location?: string;
  description?: string;
  highlights?: string[];
  subjects?: string[];
  stream?: string;
  logo?: string;
}

export interface CertificationEntry {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  credentialUrl?: string;
  badge?: string;
  skills: string[];
  keyLearnings?: string[];
  description?: string;
}

export const education: EducationEntry[] = [
  {
    id: "sliit-bsc",
    institution: "Sri Lanka Institute of Information Technology",
    institutionShort: "SLIIT",
    degree: "BSc (Hons) in Information Technology",
    specialization: "Artificial Intelligence",
    startYear: 2024,
    endYear: 2028,
    status: "current",
    levelType: "tertiary",
    location: "Malabe, Sri Lanka",
    description:
      "Comprehensive four-year honors degree program specifically focused on Artificial Intelligence. The curriculum combines advanced mathematical modeling, machine learning theory, computer vision, natural language processing, and production-grade full-stack software development.",
    highlights: [
      "Machine Learning & Pattern Recognition",
      "Deep Learning & Neural Network Architectures",
      "Data Structures & Algorithmic Analysis",
      "Object-Oriented Software Engineering",
      "Database Systems & Query Optimization",
      "Computer Vision & NLP Fundamentals",
    ],
  },
  {
    id: "mrc-al",
    institution: "Mahinda Rajapaksha College – Homagama",
    institutionShort: "MRC",
    degree: "G.C.E. Advanced Level (A/L)",
    specialization: "Technology Stream",
    status: "completed",
    levelType: "secondary",
    location: "Homagama, Sri Lanka",
    stream: "Technology Stream",
    description:
      "Secondary education completed in the Technology Stream, building foundational knowledge in engineering technology, physical sciences, and modern computing prior to pursuing undergraduate studies in Artificial Intelligence at SLIIT.",
    highlights: [
      "Engineering Technology",
      "Science for Technology",
      "Information Technology",
    ],
    subjects: [
      "Engineering Technology",
      "Science for Technology",
      "Information Technology",
    ],
  },
];

export const certifications: CertificationEntry[] = [
  {
    id: "sliit-aiml-stage1",
    title: "AI/ML Engineer - Stage 1",
    issuer: "SLIIT",
    date: "Jul 2025",
    credentialId: "nvmv1pm18q",
    credentialUrl: "https://code.sliit.org/certificates/nvmv1pml8q",
    badge: "AI & ML Specialization",
    skills: ["Machine Learning", "Model Training", "Data Science"],
    keyLearnings: [
      "Learnt data preprocessing and cleaning; trained simple regression and classification models;",
      "Understood the AI/ML lifecycle.",
    ],
  },
  {
    id: "google-genai",
    title: "Introduction to Generative AI",
    issuer: "Google",
    date: "Nov 2024",
    credentialId: "12985809",
    credentialUrl: "https://www.skills.google/public_profiles/ac635ad9-8edd-49c1-8509-0181059d365f/badges/12985809",
    badge: "Google Cloud",
    skills: ["Generative AI", "Foundation Models", "Model Fine-Tuning"],
    keyLearnings: [
      "Explored the GenAI landscape; differentiated model types like GANs and VAEs;",
      "Understood the basic process of model fine-tuning.",
    ],
  },
  {
    id: "google-llm",
    title: "Introduction to Large Language Models",
    issuer: "Google",
    date: "Nov 2024",
    credentialId: "12986456",
    credentialUrl: "https://www.skills.google/public_profiles/ac635ad9-8edd-49c1-8509-0181059d365f/badges/12986456",
    badge: "Google Cloud",
    skills: ["LLMs", "Prompt Engineering", "NLP"],
    keyLearnings: [
      "Mastered core LLM concepts and architectures;",
      "Implemented basic prompt engineering technique;",
      "Discussed the ethical implications of LLMs.",
    ],
  },
  {
    id: "google-responsible-ai",
    title: "Introduction to Responsible AI",
    issuer: "Google",
    date: "Nov 2024",
    credentialId: "12986508",
    credentialUrl: "https://www.skills.google/public_profiles/ac635ad9-8edd-49c1-8509-0181059d365f/badges/12986508",
    badge: "Google Cloud",
    skills: ["Responsible AI", "AI Ethics", "Bias Mitigation"],
    keyLearnings: [
      "Learnt to identify and mitigate bias in datasets;",
      "Ensured transparency in AI decision-making;",
      "Applied responsible AI principles.",
    ],
  },
  {
    id: "cisco-cybersecurity",
    title: "Introduction to Cybersecurity",
    issuer: "Cisco",
    date: "Jul 2024",
    credentialId: "20240708-7-iz2kt1",
    credentialUrl: "https://www.credly.com/badges/f4b62ec1-dd40-4fff-a8e8-14013ba15d49/linked_in_profile",
    badge: "Cisco Academy",
    skills: ["Cybersecurity", "Network Defense", "Threat Analysis"],
    keyLearnings: [
      "Identified common cyber threats;",
      "Configured simple network firewalls and VPNs;",
      "Applied secure development practices.",
    ],
  },
  {
    id: "uom-python",
    title: "Python for Beginners",
    issuer: "Uni of Moratuwa",
    date: "Feb 2024",
    badge: "Grade: Pass",
    credentialId: "1296456",
    credentialUrl: "/certificates/Python_for_Beginners_E-Certificate.pdf",
    skills: ["Python", "Algorithms", "Data Structures"],
    keyLearnings: [
      "Mastered core Python syntax and data types;",
      "Implemented fundamental algorithms and data structures;",
      "Wrote modular, clean Python code.",
    ],
  },
];

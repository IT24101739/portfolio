export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image?: string;
  category?: "AI / ML" | "Full-Stack" | "Computer Vision" | "NLP";
  technologies: string[];
  github: string;
  demo?: string;
  featured: boolean;
  status: "completed" | "in-progress" | "planned";
  metrics?: string;
  year: number;
}

export const projects: Project[] = [
  {
    id: "neuroscan-ai",
    title: "NeuroScan AI — Medical Diagnostic Classifier",
    description:
      "Deep learning pipeline trained on medical imaging datasets to detect abnormalities. Features custom convolutional layers, gradient-weighted class activation mapping (Grad-CAM), and inference optimization.",
    category: "AI / ML",
    technologies: ["PyTorch", "Python", "OpenCV", "CNNs", "NumPy", "Matplotlib"],
    github: "https://github.com/maleesha-maddegoda",
    demo: "",
    featured: true,
    status: "completed",
    metrics: "94.8% Validation Accuracy",
    year: 2024,
  },
  {
    id: "omnichat-rag",
    title: "OmniChat — Context-Aware Intelligent Assistant",
    description:
      "Full-stack AI assistant featuring Retrieval-Augmented Generation (RAG). Leverages semantic vector search, FastAPI backend microservices, and a sleek, reactive Next.js chat interface.",
    category: "Full-Stack",
    technologies: ["Next.js", "TypeScript", "FastAPI", "Python", "Tailwind CSS", "PostgreSQL"],
    github: "https://github.com/maleesha-maddegoda",
    demo: "https://linkedin.com/in/maleesha-maddegoda",
    featured: true,
    status: "completed",
    metrics: "< 120ms Vector Retrieval",
    year: 2025,
  },
  {
    id: "visionpulse-tracking",
    title: "VisionPulse — Real-Time Spatial Object Detection",
    description:
      "Real-time visual inference application designed for multiple-object tracking across video streams. Features spatial bounding box trajectory estimation and an interactive telemetry analytics dashboard.",
    category: "Computer Vision",
    technologies: ["Python", "OpenCV", "YOLOv8", "React", "WebSockets", "Flask"],
    github: "https://github.com/maleesha-maddegoda",
    demo: "",
    featured: true,
    status: "in-progress",
    metrics: "60 FPS Processing Pipeline",
    year: 2025,
  },
];

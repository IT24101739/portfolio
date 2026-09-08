"use client";

import { motion } from "framer-motion";
import { Brain, Cpu, Eye, MessageSquare, Database, Sparkles, Binary } from "lucide-react";
import { SectionReveal } from "./section-reveal";

/* ─── Animated Neural Network SVG ─── */
function NeuralNetwork() {
  const layers = [
    { x: 50, nodes: [1, 2, 3], y: [110, 190, 270], label: "Input" },
    { x: 175, nodes: [1, 2, 3, 4], y: [70, 150, 230, 310], label: "Hidden 1" },
    { x: 300, nodes: [1, 2, 3, 4], y: [70, 150, 230, 310], label: "Hidden 2" },
    { x: 425, nodes: [1, 2, 3], y: [110, 190, 270], label: "Dense" },
    { x: 550, nodes: [1, 2], y: [150, 230], label: "Output" },
  ];

  const connections: { x1: number; y1: number; x2: number; y2: number }[] = [];

  for (let li = 0; li < layers.length - 1; li++) {
    const l1 = layers[li];
    const l2 = layers[li + 1];
    for (const y1 of l1.y) {
      for (const y2 of l2.y) {
        connections.push({ x1: l1.x, y1, x2: l2.x, y2 });
      }
    }
  }

  const allNodes = layers.flatMap((l) => l.y.map((y) => ({ x: l.x, y })));

  return (
    <div
      className="relative w-full"
      style={{ maxWidth: 620, margin: "0 auto" }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 600 380"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
      >
        {/* Connection Lines */}
        {connections.map((c, i) => (
          <motion.line
            key={i}
            x1={c.x1}
            y1={c.y1}
            x2={c.x2}
            y2={c.y2}
            stroke="url(#ai-line-grad)"
            strokeWidth="0.75"
            initial={{ opacity: 0, pathLength: 0 }}
            animate={{ opacity: 0.35, pathLength: 1 }}
            transition={{ duration: 1.5, delay: i * 0.005, ease: "easeOut" }}
          />
        ))}

        {/* Animated Data Flow Pulses */}
        {connections.slice(0, 10).map((c, i) => (
          <motion.circle
            key={`pulse-${i}`}
            r="3"
            fill="var(--color-accent)"
            opacity={0.85}
            initial={{ cx: c.x1, cy: c.y1, opacity: 0 }}
            animate={{
              cx: [c.x1, c.x2],
              cy: [c.y1, c.y2],
              opacity: [0, 0.95, 0],
            }}
            transition={{
              duration: 2.2,
              delay: i * 0.45 + 0.8,
              repeat: Infinity,
              repeatDelay: 2.5,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Standard Nodes */}
        {allNodes.map((node, i) => (
          <motion.circle
            key={i}
            cx={node.x}
            cy={node.y}
            r="8"
            fill="var(--color-bg-card)"
            stroke="url(#ai-node-grad)"
            strokeWidth="2"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.15 + i * 0.03, ease: "backOut" }}
          />
        ))}

        {/* Output Nodes (Highlighted Glow) */}
        {layers[4].y.map((y, i) => (
          <motion.circle
            key={`out-${i}`}
            cx={layers[4].x}
            cy={y}
            r="11"
            fill="url(#ai-output-grad)"
            stroke="var(--color-accent)"
            strokeWidth="2"
            initial={{ scale: 0 }}
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}

        {/* Gradients */}
        <defs>
          <linearGradient id="ai-line-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.6" />
            <stop offset="100%" stopColor="var(--color-green2)" stopOpacity="0.4" />
          </linearGradient>
          <radialGradient id="ai-node-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--color-accent)" />
            <stop offset="100%" stopColor="var(--color-green2)" />
          </radialGradient>
          <radialGradient id="ai-output-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0.3" />
          </radialGradient>
        </defs>
      </svg>

      {/* Layer Labels */}
      <div
        className="flex justify-between text-[10px] sm:text-xs font-mono font-medium mt-4 px-1 sm:px-2"
        style={{ color: "var(--color-text-muted)" }}
        aria-hidden="true"
      >
        {layers.map((l) => (
          <span key={l.label}>{l.label}</span>
        ))}
      </div>
    </div>
  );
}

interface FocusArea {
  icon: typeof Brain;
  title: string;
  badge: string;
  description: string;
  tags: string[];
}

const aiFocusAreas: FocusArea[] = [
  {
    icon: Brain,
    title: "Machine Learning",
    badge: "Algorithms & Math",
    description:
      "Hands-on study of supervised, unsupervised, and ensemble methods. Implementing decision trees, SVMs, clustering, and regression models with solid mathematical foundations.",
    tags: ["Scikit-Learn", "Regression", "Clustering", "SVM", "Model Evaluation"],
  },
  {
    icon: Cpu,
    title: "Deep Learning",
    badge: "Neural Networks",
    description:
      "Architecting multilayer perceptrons, convolutional neural networks (CNNs), and recurrent architectures. Focused on gradient descent optimization and regularization techniques.",
    tags: ["PyTorch", "TensorFlow", "CNNs", "Backpropagation", "Loss Functions"],
  },
  {
    icon: MessageSquare,
    title: "Natural Language Processing",
    badge: "Language AI",
    description:
      "Exploring tokenization, semantic embeddings, sequence modeling, and transformer foundations. Building intelligent text classification and search applications.",
    tags: ["Transformers", "Embeddings", "Tokenization", "Sentiment Analysis"],
  },
  {
    icon: Eye,
    title: "Computer Vision",
    badge: "Spatial Perception",
    description:
      "Investigating image processing, object detection, spatial bounding boxes, and visual feature extraction for real-world automated visual understanding.",
    tags: ["OpenCV", "Object Detection", "Image Filters", "Feature Maps"],
  },
  {
    icon: Database,
    title: "Data Science & Analysis",
    badge: "Feature Engineering",
    description:
      "Transforming raw, unstructured data into clean, structured datasets through robust exploratory data analysis, imputation, normalization, and statistical reasoning.",
    tags: ["Pandas", "NumPy", "EDA", "Statistical Analysis", "Data Pipelines"],
  },
  {
    icon: Binary,
    title: "Applied AI Engineering",
    badge: "Production Integration",
    description:
      "Deploying trained machine learning models into live software pipelines via RESTful APIs, containerized services, and reactive user interfaces.",
    tags: ["FastAPI", "Model Serving", "Docker Basics", "RESTful APIs"],
  },
];

export function AIFocus() {
  return (
    <section
      id="ai-focus"
      aria-labelledby="ai-focus-heading"
      className="relative section-py overflow-hidden"
      style={{ background: "var(--color-bg-primary)" }}
    >
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 30%, rgba(57,255,20,0.035) 0%, transparent 70%)",
        }}
      />

      <div className="section-container relative z-10">
        {/* Header */}
        <SectionReveal className="section-header-block">
          <div className="section-eyebrow">
            <span className="section-eyebrow-number">02</span>
            <span className="section-eyebrow-slash">/</span>
            <span className="section-eyebrow-label">Specialization</span>
          </div>
          <h2 id="ai-focus-heading" className="section-title">
            Artificial Intelligence &amp;{" "}
            <span className="gradient-text">Machine Learning</span>
          </h2>
          <div className="section-accent-line" aria-hidden="true" />
          <p className="section-subtitle">
            Comprehensive honors degree curriculum centered around intelligent systems,
            algorithmic theory, and applied neural model engineering.
          </p>
        </SectionReveal>

        {/* Top Interactive Architecture + Overview Grid */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-20">

          {/* Left: Neural Network Visualizer (7 cols) */}
          <SectionReveal className="lg:col-span-7 h-full">
            <div className="card-box relative overflow-hidden h-full flex flex-col justify-center p-4 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-2 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[var(--color-accent)]">
                  <Sparkles size={14} className="shrink-0" />
                  <span>Neural Architecture Visualizer</span>
                </div>
                <span className="text-[10px] sm:text-xs font-mono px-2.5 py-0.5 sm:py-1 rounded-full bg-[var(--color-accent-dim)] border border-[var(--color-border-accent)] text-[var(--color-accent)] whitespace-nowrap">
                  Simulated Feedforward
                </span>
              </div>
              <NeuralNetwork />
            </div>
          </SectionReveal>

          {/* Right: Academic Focus Pillars (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <SectionReveal delay={0.15}>
              <div className="card-box space-y-5">
                <h3 className="font-display font-bold text-xl" style={{ color: "var(--color-text-primary)" }}>
                  Curriculum &amp; Academic Foundation
                </h3>
                <p className="text-base leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                  As an undergraduate at SLIIT specializing in Artificial Intelligence, my studies
                  synthesize advanced linear algebra, probability, and calculus with deep software
                  engineering practices.
                </p>
                <p className="text-base leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                  Rather than viewing AI as black-box APIs, my training focuses on understanding the
                  mathematical foundations behind gradient optimization, loss convergence, and
                  efficient model evaluation.
                </p>

                {/* Key AI stats */}
                <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[var(--color-border)]">
                  {[
                    { value: "2024", label: "Started" },
                    { value: "2028", label: "Graduation" },
                    { value: "SLIIT", label: "Campus" },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center p-2 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)]">
                      <div className="font-display font-bold text-base text-[var(--color-accent)]">
                        {stat.value}
                      </div>
                      <div className="text-[11px] font-medium text-[var(--color-text-muted)]">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>

        {/* Generous Section Breathing Space & High-Tech Divider */}
        <div
          className="ai-domains-divider"
          style={{
            width: "100%",
            height: "1px",
            background: "linear-gradient(90deg, transparent 0%, rgba(57, 255, 20, 0.45) 20%, rgba(255, 255, 255, 0.22) 50%, rgba(57, 255, 20, 0.45) 80%, transparent 100%)",
            boxShadow: "0 0 16px rgba(57, 255, 20, 0.15)",
          }}
          aria-hidden="true"
        />

        {/* Section Subheading with Distinct Spacing */}
        <div className="ai-domains-header" style={{ marginBottom: "3rem" }}>
          <SectionReveal delay={0.2}>
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-accent)]">
                <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-pulse" />
                <span>Specialized AI Disciplines</span>
              </div>
              <h3 className="font-display font-bold text-2xl md:text-3xl text-[var(--color-text-primary)]">
                Core Technical Domains
              </h3>
              <p className="text-sm md:text-base text-[var(--color-text-secondary)] max-w-2xl mt-1 leading-relaxed">
                Foundational and applied areas of machine learning, deep neural architectures, computer vision, and intelligent data systems.
              </p>
            </div>
          </SectionReveal>
        </div>

        {/* 6 AI Domains Grid — Spacious & Rich */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {aiFocusAreas.map((area, i) => (
            <SectionReveal key={area.title} delay={0.1 + i * 0.06} className="h-full">
              <div className="card-box h-full flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-105"
                      style={{
                        background: "var(--color-accent-dim)",
                        border: "1px solid var(--color-border)",
                      }}
                      aria-hidden="true"
                    >
                      <area.icon size={20} style={{ color: "var(--color-accent)" }} />
                    </div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-[var(--color-text-muted)]">
                      {area.badge}
                    </span>
                  </div>

                  <h4 className="font-display font-bold text-lg mb-2.5 text-[var(--color-text-primary)]">
                    {area.title}
                  </h4>
                  <p className="text-sm leading-relaxed text-[var(--color-text-secondary)] mb-5">
                    {area.description}
                  </p>
                </div>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[var(--color-border)]">
                  {area.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-1 rounded-md font-medium"
                      style={{
                        background: "var(--color-bg-secondary)",
                        color: "var(--color-text-muted)",
                        border: "1px solid var(--color-border)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>

      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { Brain, Cpu, Eye, MessageSquare, Database, Sparkles, Binary, ArrowRight, Workflow, Server } from "lucide-react";
import { SectionReveal } from "./section-reveal";

/* ─── Animated Neural Network SVG Visualizer with Electric Cyan & Purple ─── */
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
        {/* Connection Lines with Cyan/Purple Gradients */}
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

        {/* Animated Data Flow Pulses in Electric Cyan */}
        {connections.slice(0, 10).map((c, i) => (
          <motion.circle
            key={`pulse-${i}`}
            r="3"
            fill="#00F0FF"
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

        {/* Output Nodes (Highlighted Glow in Electric Cyan) */}
        {layers[4].y.map((y, i) => (
          <motion.circle
            key={`out-${i}`}
            cx={layers[4].x}
            cy={y}
            r="11"
            fill="url(#ai-output-grad)"
            stroke="#00F0FF"
            strokeWidth="2"
            initial={{ scale: 0 }}
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}

        {/* Gradients */}
        <defs>
          <linearGradient id="ai-line-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#A855F7" stopOpacity="0.45" />
          </linearGradient>
          <radialGradient id="ai-node-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00F0FF" />
            <stop offset="100%" stopColor="#A855F7" />
          </radialGradient>
          <radialGradient id="ai-output-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#00F0FF" stopOpacity="0.25" />
          </radialGradient>
        </defs>
      </svg>

      {/* Layer Labels in JetBrains Mono */}
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

export function AIFocus() {
  return (
    <section
      id="ai-focus"
      aria-labelledby="ai-focus-heading"
      className="relative section-py overflow-hidden bg-transparent"
    >
      {/* Subtle ambient radial depth gradient */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 30%, rgba(0, 240, 255, 0.04) 0%, rgba(168, 85, 247, 0.02) 50%, transparent 70%)",
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

          {/* Left: Neural Network Visualizer with subtle glowing depth (7 cols) */}
          <SectionReveal className="lg:col-span-7 h-full">
            <div className="card-box relative overflow-hidden h-full flex flex-col justify-center p-4 sm:p-6">
              {/* Subtle radial glow behind the Visualizer */}
              <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle at 50% 50%, rgba(0, 240, 255, 0.10) 0%, rgba(168, 85, 247, 0.05) 45%, transparent 75%)",
                  filter: "blur(20px)",
                }}
              />

              <div className="relative z-10">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-2 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[var(--color-accent)] font-mono">
                    <Sparkles size={14} className="shrink-0" />
                    <span>Neural Architecture Visualizer</span>
                  </div>
                  <span className="text-[10px] sm:text-xs font-mono px-2.5 py-0.5 sm:py-1 rounded-full bg-[var(--color-accent-dim)] border border-[var(--color-border-strong)] text-[var(--color-accent)] whitespace-nowrap">
                    Simulated Feedforward
                  </span>
                </div>
                <NeuralNetwork />
              </div>
            </div>
          </SectionReveal>

          {/* Right: Academic Focus Pillars (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <SectionReveal delay={0.15}>
              <div className="card-box space-y-5">
                <h3 className="font-sans font-bold text-xl" style={{ color: "var(--color-text-primary)" }}>
                  Curriculum &amp; Academic Foundation
                </h3>
                <p className="text-base leading-relaxed text-[var(--color-text-secondary)]">
                  As an undergraduate at SLIIT specializing in Artificial Intelligence, my studies
                  synthesize advanced linear algebra, probability, and calculus with deep software
                  engineering practices.
                </p>
                <p className="text-base leading-relaxed text-[var(--color-text-secondary)]">
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
                    <div key={stat.label} className="text-center p-2.5 rounded-xl bg-[var(--color-bg-pill)] border border-[var(--color-border-subtle)]">
                      <div className="font-mono font-bold text-base text-[var(--color-accent)]">
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

        {/* Glowing High-Tech Divider */}
        <div className="ai-domains-divider" aria-hidden="true" />

        {/* Section Subheading with Distinct Spacing */}
        <div className="ai-domains-header" style={{ marginBottom: "3.5rem" }}>
          <SectionReveal delay={0.2}>
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-accent)]">
                <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-pulse shadow-[0_0_8px_var(--color-accent)]" />
                <span>Specialized AI Disciplines</span>
              </div>
              <h3 className="font-sans font-bold text-2xl md:text-3xl text-[var(--color-text-primary)]">
                Core Technical Domains
              </h3>
              <p className="text-sm md:text-base text-[var(--color-text-secondary)] max-w-2xl mt-1 leading-relaxed font-sans">
                Foundational and applied areas of machine learning, deep neural architectures, computer vision, and intelligent data systems.
              </p>
            </div>
          </SectionReveal>
        </div>

        {/* ══════════════════════════════════════════════════════════════
            CSS GRID "BENTO BOX" LAYOUT
            Each category is a distinct glassmorphic card with semi-transparent background & backdrop-blur
           ══════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">

          {/* 1. Spatial Perception (Computer Vision) — Large Bento Feature (7 cols) */}
          <SectionReveal delay={0.05} className="lg:col-span-7 h-full">
            <div className="bento-card h-full flex flex-col justify-between group">
              {/* Subtle back ambient glow */}
              <div
                aria-hidden="true"
                className="absolute top-0 right-0 w-48 h-48 rounded-full pointer-events-none opacity-40 group-hover:opacity-70 transition-opacity"
                style={{
                  background: "radial-gradient(circle, rgba(0, 240, 255, 0.2) 0%, transparent 70%)",
                  filter: "blur(20px)",
                }}
              />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-105"
                    style={{
                      background: "rgba(0, 240, 255, 0.08)",
                      border: "1px solid rgba(0, 240, 255, 0.28)",
                    }}
                    aria-hidden="true"
                  >
                    <Eye size={22} className="text-[#00F0FF]" />
                  </div>
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[rgba(0,240,255,0.06)] border border-[rgba(0,240,255,0.25)] text-[#00F0FF]">
                    Spatial Perception
                  </span>
                </div>

                <h4 className="font-sans font-bold text-xl mb-2 text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors">
                  Computer Vision
                </h4>
                <p className="text-sm leading-relaxed text-[var(--color-text-secondary)] mb-6 font-sans">
                  Investigating spatial bounding boxes, visual feature extraction, and convolutional kernels for automated visual understanding, edge object localization, and real-time inference.
                </p>
              </div>

              {/* Tech Tags with -translate-y-1 lift and glow on hover */}
              <div className="relative z-10 flex flex-wrap gap-2 pt-4 border-t border-[var(--color-border-subtle)]">
                {["OpenCV", "Object Detection", "Image Filters", "Feature Maps", "YOLO"].map((tag) => (
                  <span key={tag} className="tech-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </SectionReveal>

          {/* 2. Language AI (Natural Language Processing) — Bento Feature (5 cols) */}
          <SectionReveal delay={0.1} className="lg:col-span-5 h-full">
            <div className="bento-card h-full flex flex-col justify-between group">
              <div
                aria-hidden="true"
                className="absolute bottom-0 right-0 w-44 h-44 rounded-full pointer-events-none opacity-30 group-hover:opacity-60 transition-opacity"
                style={{
                  background: "radial-gradient(circle, rgba(168, 85, 247, 0.25) 0%, transparent 70%)",
                  filter: "blur(20px)",
                }}
              />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-105"
                    style={{
                      background: "rgba(168, 85, 247, 0.1)",
                      border: "1px solid rgba(168, 85, 247, 0.3)",
                    }}
                    aria-hidden="true"
                  >
                    <MessageSquare size={22} className="text-[#A855F7]" />
                  </div>
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[rgba(168,85,247,0.08)] border border-[rgba(168,85,247,0.25)] text-[#A855F7]">
                    Language AI
                  </span>
                </div>

                <h4 className="font-sans font-bold text-xl mb-2 text-[var(--color-text-primary)] group-hover:text-[#A855F7] transition-colors">
                  Natural Language Processing
                </h4>
                <p className="text-sm leading-relaxed text-[var(--color-text-secondary)] mb-6 font-sans">
                  Exploring tokenization, semantic embeddings, sequence modeling, and transformer foundations for intelligent contextual search and text classification.
                </p>
              </div>

              <div className="relative z-10 flex flex-wrap gap-2 pt-4 border-t border-[var(--color-border-subtle)]">
                {["Transformers", "Embeddings", "Tokenization", "Sentiment Analysis"].map((tag) => (
                  <span key={tag} className="tech-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </SectionReveal>

          {/* 3. Neural Networks (Deep Learning) — Bento Card (4 cols) */}
          <SectionReveal delay={0.15} className="lg:col-span-4 h-full">
            <div className="bento-card h-full flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-105"
                    style={{
                      background: "rgba(0, 240, 255, 0.08)",
                      border: "1px solid rgba(0, 240, 255, 0.25)",
                    }}
                    aria-hidden="true"
                  >
                    <Cpu size={20} className="text-[#00F0FF]" />
                  </div>
                  <span className="text-[10.5px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[rgba(0,240,255,0.06)] border border-[rgba(0,240,255,0.2)] text-[#00F0FF]">
                    Neural Networks
                  </span>
                </div>

                <h4 className="font-sans font-bold text-lg mb-2 text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors">
                  Deep Learning
                </h4>
                <p className="text-sm leading-relaxed text-[var(--color-text-secondary)] mb-5 font-sans">
                  Architecting multilayer perceptrons, CNNs, and recurrent networks with backpropagation and loss optimization.
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[var(--color-border-subtle)]">
                {["PyTorch", "TensorFlow", "CNNs", "Backprop"].map((tag) => (
                  <span key={tag} className="tech-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </SectionReveal>

          {/* 4. Algorithms & Math (Machine Learning) — Bento Card (4 cols) */}
          <SectionReveal delay={0.2} className="lg:col-span-4 h-full">
            <div className="bento-card h-full flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-105"
                    style={{
                      background: "rgba(0, 240, 255, 0.08)",
                      border: "1px solid rgba(0, 240, 255, 0.25)",
                    }}
                    aria-hidden="true"
                  >
                    <Brain size={20} className="text-[#00F0FF]" />
                  </div>
                  <span className="text-[10.5px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[rgba(0,240,255,0.06)] border border-[rgba(0,240,255,0.2)] text-[#00F0FF]">
                    Algorithms &amp; Math
                  </span>
                </div>

                <h4 className="font-sans font-bold text-lg mb-2 text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors">
                  Machine Learning
                </h4>
                <p className="text-sm leading-relaxed text-[var(--color-text-secondary)] mb-5 font-sans">
                  Supervised and unsupervised models: SVMs, ensemble trees, clustering, and rigorous statistical validation.
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[var(--color-border-subtle)]">
                {["Scikit-Learn", "SVM", "Clustering", "Ensembles"].map((tag) => (
                  <span key={tag} className="tech-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </SectionReveal>

          {/* 5. Feature Engineering (Data Science & Analysis) — Bento Card (4 cols) */}
          <SectionReveal delay={0.25} className="lg:col-span-4 h-full">
            <div className="bento-card h-full flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-105"
                    style={{
                      background: "rgba(168, 85, 247, 0.1)",
                      border: "1px solid rgba(168, 85, 247, 0.28)",
                    }}
                    aria-hidden="true"
                  >
                    <Database size={20} className="text-[#A855F7]" />
                  </div>
                  <span className="text-[10.5px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[rgba(168,85,247,0.08)] border border-[rgba(168,85,247,0.25)] text-[#A855F7]">
                    Feature Engineering
                  </span>
                </div>

                <h4 className="font-sans font-bold text-lg mb-2 text-[var(--color-text-primary)] group-hover:text-[#A855F7] transition-colors">
                  Data Science &amp; Analysis
                </h4>
                <p className="text-sm leading-relaxed text-[var(--color-text-secondary)] mb-5 font-sans">
                  Transforming raw unstructured data into robust feature sets through EDA, normalization, and statistical pipelines.
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[var(--color-border-subtle)]">
                {["Pandas", "NumPy", "EDA", "Pipelines"].map((tag) => (
                  <span key={tag} className="tech-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </SectionReveal>

          {/* 6. Production Integration (Applied AI Engineering) — Wide Bento Showcase (12 cols) */}
          <SectionReveal delay={0.3} className="lg:col-span-12">
            <div className="bento-card group">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center"
                      style={{
                        background: "rgba(0, 240, 255, 0.08)",
                        border: "1px solid rgba(0, 240, 255, 0.3)",
                      }}
                      aria-hidden="true"
                    >
                      <Binary size={20} className="text-[#00F0FF]" />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#00F0FF] block">
                        Production Integration
                      </span>
                      <h4 className="font-sans font-bold text-xl text-[var(--color-text-primary)]">
                        Applied AI Engineering &amp; Model Serving
                      </h4>
                    </div>
                  </div>
                  <p className="text-sm md:text-base leading-relaxed text-[var(--color-text-secondary)] max-w-3xl font-sans">
                    Bridging the laboratory-to-production divide: packaging trained neural models into containerized microservices, high-throughput RESTful endpoints, and intuitive reactive client interfaces.
                  </p>
                </div>

                {/* Pipeline visual blocks */}
                <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 lg:gap-3 shrink-0">
                  {[
                    { icon: Brain, label: "Trained Model" },
                    { icon: Workflow, label: "FastAPI Pipeline" },
                    { icon: Server, label: "Docker Microservice" },
                  ].map((step, idx) => (
                    <div key={step.label} className="flex items-center gap-2">
                      <div className="px-3 py-2 rounded-xl bg-[var(--color-bg-pill)] border border-[var(--color-border-subtle)] flex items-center gap-2">
                        <step.icon size={14} className="text-[var(--color-accent)]" />
                        <span className="text-xs font-mono font-semibold text-[var(--color-text-primary)]">{step.label}</span>
                      </div>
                      {idx < 2 && <ArrowRight size={14} className="text-[var(--color-text-muted)] hidden sm:block" />}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-5 mt-5 border-t border-[var(--color-border-subtle)]">
                {["FastAPI", "Model Serving", "Docker Basics", "RESTful APIs", "Next.js Integration"].map((tag) => (
                  <span key={tag} className="tech-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </SectionReveal>

        </div>

      </div>
    </section>
  );
}

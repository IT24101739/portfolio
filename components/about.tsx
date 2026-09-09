"use client";

import { Brain, Code2, Lightbulb } from "lucide-react";
import { SectionReveal } from "./section-reveal";

const highlights = [
  {
    icon: Brain,
    title: "AI & ML Specialization",
    description:
      "Deeply immersed in the mathematical foundations, algorithm implementations, and practical model training that power intelligent systems.",
  },
  {
    icon: Code2,
    title: "Full-Stack Software Mindset",
    description:
      "Passionate about end-to-end architecture — connecting robust backend services and AI pipelines with responsive, accessible user interfaces.",
  },
  {
    icon: Lightbulb,
    title: "Continuous Exploration",
    description:
      "Constantly exploring emerging AI research, novel frameworks, and applying cutting-edge ideas to solve real-world technical problems.",
  },
];

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative section-py overflow-hidden bg-transparent"
    >
      {/* Subtle background ambient glow */}
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-[550px] h-[550px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at top right, rgba(0, 240, 255, 0.04) 0%, rgba(168, 85, 247, 0.02) 45%, transparent 70%)",
        }}
      />

      <div className="section-container relative z-10">
        {/* Section Header */}
        <SectionReveal className="section-header-block">
          <div className="section-eyebrow">
            <span className="section-eyebrow-number">01</span>
            <span className="section-eyebrow-slash">/</span>
            <span className="section-eyebrow-label">About Me</span>
          </div>
          <h2 id="about-heading" className="section-title">
            Who I Am
          </h2>
          <div className="section-accent-line" aria-hidden="true" />
          <p className="section-subtitle">
            An aspiring AI &amp; ML Engineer combining strong academic rigor with a hands-on
            full-stack engineering discipline.
          </p>
        </SectionReveal>

        {/* Narrative Bio */}
        <SectionReveal delay={0.1} className="max-w-4xl mx-auto mb-12 sm:mb-16">
          <div className="card-box p-6 sm:p-8 md:p-10 space-y-5 text-base md:text-lg leading-relaxed text-[var(--color-text-secondary)] font-sans">
            <p>
              I&apos;m <strong style={{ color: "var(--color-text-primary)", fontWeight: 600 }}>Maleesha Vimukthi Sanjula Maddegoda</strong>, a
              third-year undergraduate at the{" "}
              <strong style={{ color: "var(--color-accent)", fontWeight: 600 }}>
                Sri Lanka Institute of Information Technology (SLIIT)
              </strong>
              , specializing in Artificial Intelligence under the BSc (Hons) in Information
              Technology program.
            </p>
            <p>
              My engineering journey is centered on bridging the gap between theoretical
              machine learning concepts and scalable, production-ready software systems. Whether
              designing convolutional neural networks for computer vision or architecting reactive
              Next.js web applications, I focus on clean code, solid data structures, and measurable impact.
            </p>
            <p>
              I believe the most compelling technology emerges at the intersection of deep
              algorithmic curiosity and thoughtful software craftsmanship.
            </p>
          </div>
        </SectionReveal>

        {/* Core Capability Pillars - 3 column responsive cards */}
        <div className="space-y-6">
          <SectionReveal delay={0.15}>
            <div className="text-center">
              <h3
                className="font-mono font-semibold text-xs sm:text-sm uppercase tracking-wider mb-2"
                style={{ color: "var(--color-text-muted)" }}
              >
                Core Strengths &amp; Engineering Focus
              </h3>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {highlights.map((item, i) => (
              <SectionReveal key={item.title} delay={0.2 + i * 0.08} className="h-full">
                <div className="card-box h-full p-6 sm:p-7 flex flex-col items-start gap-4 transition-all duration-300 hover:translate-y-[-3px] hover:border-[var(--color-accent)] hover:shadow-[0_8px_24px_var(--color-glow)] group">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: "var(--color-accent-dim)",
                      border: "1px solid var(--color-border-strong)",
                    }}
                    aria-hidden="true"
                  >
                    <item.icon size={22} style={{ color: "var(--color-accent)" }} />
                  </div>
                  <div>
                    <h4
                      className="text-base sm:text-lg font-semibold mb-2 font-sans text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors"
                    >
                      {item.title}
                    </h4>
                    <p className="text-sm leading-relaxed text-[var(--color-text-secondary)] font-sans">
                      {item.description}
                    </p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

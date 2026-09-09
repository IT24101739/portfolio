"use client";

import { GraduationCap, Brain, Code2, Lightbulb, BookOpen, Compass } from "lucide-react";
import { SectionReveal } from "./section-reveal";
import { personalInfo } from "@/data/personal";

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

const academicDetails = [
  { label: "Current Level", value: personalInfo.currentYear },
  { label: "Degree Program", value: personalInfo.degree },
  { label: "Specialization", value: personalInfo.specialization },
  { label: "Institution", value: personalInfo.university },
  { label: "Campus Location", value: "Malabe, Sri Lanka" },
  { label: "Study Period", value: `${personalInfo.startYear} — ${personalInfo.graduationYear}` },
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

        {/* Main 2-Column Content Grid */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">

          {/* Left Column: Bio & Core Pillars (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <SectionReveal delay={0.1}>
              <div className="space-y-5 text-base md:text-lg leading-relaxed text-[var(--color-text-secondary)] font-sans">
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

            {/* Core Capability Pillars */}
            <div className="space-y-4 pt-2">
              <SectionReveal delay={0.15}>
                <h3
                  className="font-mono font-semibold text-xs uppercase tracking-wider mb-2"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  Core Strengths &amp; Focus
                </h3>
              </SectionReveal>

              {highlights.map((item, i) => (
                <SectionReveal key={item.title} delay={0.2 + i * 0.08}>
                  <div className="card-box flex gap-5 items-start">
                    <div
                      className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center"
                      style={{
                        background: "var(--color-accent-dim)",
                        border: "1px solid var(--color-border)",
                      }}
                      aria-hidden="true"
                    >
                      <item.icon size={20} style={{ color: "var(--color-accent)" }} />
                    </div>
                    <div>
                      <h4
                        className="text-base font-semibold mb-1 font-sans"
                        style={{ color: "var(--color-text-primary)" }}
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

          {/* Right Column: Academic Details & Progress (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">

            {/* Currently Card */}
            <SectionReveal delay={0.15}>
              <div className="card-box space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-[var(--color-border)]">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ background: "var(--color-accent-dim)" }}
                    aria-hidden="true"
                  >
                    <BookOpen size={18} style={{ color: "var(--color-accent)" }} />
                  </div>
                  <div>
                    <h3 className="font-sans font-bold text-base" style={{ color: "var(--color-text-primary)" }}>
                      Academic Snapshot
                    </h3>
                    <p className="text-xs font-mono" style={{ color: "var(--color-accent)" }}>
                      SLIIT AI Specialization
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {academicDetails.map((detail) => (
                    <div key={detail.label} className="flex flex-col gap-0.5">
                      <span className="text-xs uppercase tracking-wider font-mono font-semibold" style={{ color: "var(--color-text-muted)" }}>
                        {detail.label}
                      </span>
                      <span className="text-sm font-medium font-sans" style={{ color: "var(--color-text-primary)" }}>
                        {detail.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </SectionReveal>

            {/* Degree Progress Card */}
            <SectionReveal delay={0.25}>
              <div className="card-box space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <GraduationCap size={18} style={{ color: "var(--color-accent)" }} aria-hidden="true" />
                    <span className="font-sans font-bold text-sm" style={{ color: "var(--color-text-primary)" }}>
                      Undergraduate Progress
                    </span>
                  </div>
                  <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md" style={{ background: "var(--color-accent-dim)", color: "var(--color-accent)" }}>
                    Year 3 of 4 · 75%
                  </span>
                </div>

                {/* Progress bar */}
                <div
                  className="h-2 rounded-full overflow-hidden"
                  style={{ background: "rgba(255,255,255,0.06)" }}
                  role="progressbar"
                  aria-valuenow={75}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label="Undergraduate degree completion: 75%"
                >
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{
                      width: "75%",
                      background: "linear-gradient(90deg, #00F0FF, #A855F7)",
                      boxShadow: "0 0 10px var(--color-accent-glow)",
                    }}
                  />
                </div>

                <div className="flex justify-between text-xs font-mono" style={{ color: "var(--color-text-muted)" }}>
                  <span>2024 (Commenced)</span>
                  <span>2028 (Expected Graduation)</span>
                </div>
              </div>
            </SectionReveal>

            {/* Career Direction & Collaboration Card */}
            <SectionReveal delay={0.3}>
              <div className="card-box space-y-3">
                <div className="flex items-center gap-2.5">
                  <Compass size={18} style={{ color: "var(--color-accent)" }} aria-hidden="true" />
                  <h3 className="font-sans font-bold text-sm" style={{ color: "var(--color-text-primary)" }}>
                    Career Objective
                  </h3>
                </div>
                <p className="text-sm leading-relaxed text-[var(--color-text-secondary)] font-sans">
                  Seeking to contribute to forward-thinking AI/ML teams, applied research laboratories,
                  and software engineering groups — solving complex problems with scalable, responsible intelligence.
                </p>
              </div>
            </SectionReveal>

          </div>
        </div>
      </div>
    </section>
  );
}

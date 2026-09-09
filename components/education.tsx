"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  BookOpen,
  CheckCircle2,
  Sparkles,
  GraduationCap,
  School,
  Calendar,
  MapPin,
  Award,
  Layers,
} from "lucide-react";
import { SectionReveal } from "./section-reveal";
import { education } from "@/data/education";

export function Education() {
  const sliit = education.find((e) => e.id === "sliit-bsc") || education[0];
  const mrc = education.find((e) => e.id === "mrc-al") || education[1];

  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 75%", "end 60%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 25,
    restDelta: 0.001,
  });

  return (
    <section
      id="education"
      aria-labelledby="education-heading"
      className="relative section-py overflow-hidden bg-transparent"
    >
      {/* Ambient background glow */}
      <div
        aria-hidden="true"
        className="absolute bottom-10 left-0 w-[550px] h-[500px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at bottom left, rgba(0, 240, 255, 0.04) 0%, rgba(168, 85, 247, 0.02) 45%, transparent 70%)",
        }}
      />

      <div className="section-container relative z-10">
        {/* Section Header */}
        <SectionReveal className="section-header-block">
          <div className="section-eyebrow">
            <span className="section-eyebrow-number">03</span>
            <span className="section-eyebrow-slash">/</span>
            <span className="section-eyebrow-label">Academic Journey</span>
          </div>
          <h2 id="education-heading" className="section-title">
            Education &amp; Academic Timeline
          </h2>
          <div className="section-accent-line" aria-hidden="true" />
          <p className="section-subtitle">
            A structured chronological progression from foundational technology studies to advanced degree specializations in Artificial Intelligence.
          </p>
        </SectionReveal>

        {/* ── Main Connected Timeline Structure ── */}
        <div ref={timelineRef} className="relative">
          {/* Static Track Line behind dynamic line */}
          <div
            aria-hidden="true"
            className="hidden md:block absolute left-8 top-8 bottom-8 w-[2px] bg-[var(--color-border-subtle)] pointer-events-none"
          />

          {/* Dynamic Progressively Drawn Timeline Spine Line (Framer Motion) */}
          <motion.div
            aria-hidden="true"
            className="hidden md:block absolute left-8 top-8 bottom-8 w-[2px] origin-top pointer-events-none"
            style={{
              scaleY: smoothProgress,
              background:
                "linear-gradient(180deg, #00F0FF 0%, #A855F7 65%, rgba(0, 240, 255, 0.4) 100%)",
              boxShadow: "0 0 16px rgba(0, 240, 255, 0.5), 0 0 8px rgba(168, 85, 247, 0.4)",
            }}
          />

          <div className="flex flex-col gap-12 md:gap-16">

            {/* ══════════════════════════════════════════════════════════════
                MILESTONE 02: SLIIT Higher Education (Current Degree 2024–2028)
               ══════════════════════════════════════════════════════════════ */}
            <SectionReveal delay={0.1}>
              <div className="relative md:pl-20">
                {/* Active Timeline Node on Spine */}
                <div
                  aria-hidden="true"
                  className="hidden md:flex absolute left-4.5 top-8 -translate-x-1/2 w-8 h-8 rounded-full items-center justify-center border-2 border-[#00F0FF] bg-[var(--color-bg-primary)] shadow-[0_0_20px_rgba(0,240,255,0.5)] z-20"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00F0FF] animate-pulse" />
                </div>

                {/* Milestone Badge Bar */}
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-accent)] bg-[var(--color-accent-dim)] border border-[var(--color-border-strong)]">
                    <Calendar size={13} />
                    <span>{sliit.startYear} — {sliit.endYear} · Present</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-[var(--color-text-secondary)] border border-[var(--color-border-subtle)] bg-[var(--color-bg-pill)]">
                    <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] shadow-[0_0_6px_var(--color-accent)]" />
                    Active 3rd Year
                  </span>
                </div>

                {/* Main SLIIT Card */}
                <div className="card-box flex flex-col gap-7 md:gap-8 overflow-hidden">
                  {/* Glowing Top Border Accent */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[2px]"
                    style={{
                      background:
                        "linear-gradient(90deg, #00F0FF 0%, #A855F7 100%)",
                    }}
                    aria-hidden="true"
                  />

                  {/* Header Row */}
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 pb-6 border-b border-[var(--color-border-subtle)]">
                    <div className="flex items-start gap-4">
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                        style={{
                          background: "var(--color-accent-dim)",
                          border: "1px solid var(--color-border-strong)",
                          boxShadow: "0 0 20px rgba(0, 240, 255, 0.15)",
                        }}
                        aria-hidden="true"
                      >
                        <GraduationCap size={28} className="text-[var(--color-accent)]" />
                      </div>
                      <div>
                        <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-accent)] block mb-0.5">
                          Higher Education · Tertiary Institution
                        </span>
                        <h3 className="font-sans font-bold text-2xl md:text-3xl text-[var(--color-text-primary)]">
                          {sliit.institution}
                        </h3>
                        <p className="text-base font-medium text-[var(--color-text-secondary)] mt-1">
                          {sliit.degree} —{" "}
                          <span className="text-[var(--color-accent)] font-semibold">
                            {sliit.specialization}
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold self-start lg:self-center border border-[var(--color-border-subtle)] bg-[var(--color-bg-pill)] text-[var(--color-text-secondary)]">
                      <MapPin size={14} className="text-[var(--color-accent)]" />
                      <span>{sliit.location || "Malabe, Sri Lanka"}</span>
                    </div>
                  </div>

                  {/* 4 Quick Facts Pills */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { label: "Degree Program", value: "BSc (Hons) IT" },
                      { label: "Specialization", value: "Artificial Intelligence", highlight: true },
                      { label: "Duration", value: "4 Years (Full-Time)" },
                      { label: "Status", value: "3rd Year Ongoing" },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="p-3.5 rounded-xl border flex flex-col justify-between"
                        style={{
                          background: "var(--color-bg-card)",
                          borderColor: "var(--color-border-subtle)",
                        }}
                      >
                        <div className="text-[10px] font-mono uppercase tracking-wider text-[var(--color-text-muted)] mb-1">
                          {item.label}
                        </div>
                        <div
                          className="font-sans font-bold text-sm"
                          style={{
                            color: item.highlight ? "var(--color-accent)" : "var(--color-text-primary)",
                          }}
                        >
                          {item.value}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Program Overview (Theme-adaptive secondary text) */}
                  <div className="space-y-2">
                    <h4 className="font-sans font-semibold text-base text-[var(--color-text-primary)] flex items-center gap-2">
                      <BookOpen size={17} className="text-[var(--color-accent)]" />
                      <span>Curriculum Focus &amp; Program Scope</span>
                    </h4>
                    <p className="text-[15px] md:text-base leading-relaxed text-[var(--color-text-secondary)] font-sans">
                      {sliit.description}
                    </p>
                  </div>

                  {/* Coursework Tag Clusters */}
                  {sliit.highlights && sliit.highlights.length > 0 && (
                    <div className="pt-6 border-t border-[var(--color-border-subtle)] space-y-3">
                      <div className="flex items-center gap-2">
                        <Sparkles size={15} className="text-[var(--color-accent)]" />
                        <h4 className="font-mono font-semibold text-xs uppercase tracking-wider text-[var(--color-text-secondary)]">
                          Core Academic Modules &amp; Competencies
                        </h4>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {sliit.highlights.map((highlight) => (
                          <span
                            key={highlight}
                            className="tech-tag"
                          >
                            <CheckCircle2 size={12} className="text-[var(--color-accent)] shrink-0" />
                            <span>{highlight}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 4-Year Academic Progression Stepper */}
                  <div className="pt-6 border-t border-[var(--color-border-subtle)] space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-mono font-semibold text-xs uppercase tracking-wider text-[var(--color-text-secondary)] flex items-center gap-2">
                        <Layers size={15} className="text-[var(--color-accent)]" />
                        <span>Academic Milestone Roadmap</span>
                      </h4>
                      <span className="font-mono text-xs font-bold text-[var(--color-accent)]">
                        Year 3 of 4
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      {[
                        {
                          year: "Year 1 (2024)",
                          desc: "Foundations & Programming",
                          status: "Completed",
                        },
                        {
                          year: "Year 2 (2025)",
                          desc: "Algorithms & Software Eng",
                          status: "Completed",
                        },
                        {
                          year: "Year 3 (2026)",
                          desc: "Advanced AI, ML & Deep Models",
                          status: "In Progress",
                        },
                        {
                          year: "Year 4 (2028)",
                          desc: "Research Capstone & Degree",
                          status: "Upcoming",
                        },
                      ].map((step) => {
                        const isCurrent = step.status === "In Progress";
                        return (
                          <div
                            key={step.year}
                            className="p-3.5 rounded-xl border text-left flex flex-col justify-between transition-all"
                            style={{
                              background: isCurrent
                                ? "var(--color-accent-dim)"
                                : "var(--color-bg-card)",
                              borderColor: isCurrent
                                ? "var(--color-border-strong)"
                                : "var(--color-border-subtle)",
                            }}
                          >
                            <div className="flex items-center justify-between mb-1.5">
                              <span className="text-xs font-bold font-mono text-[var(--color-text-primary)]">
                                {step.year}
                              </span>
                              <span
                                className="text-[10px] font-semibold px-2 py-0.5 rounded-full font-mono"
                                style={{
                                  background: isCurrent
                                    ? "var(--color-accent)"
                                    : step.status === "Completed"
                                    ? "rgba(0, 240, 255, 0.15)"
                                    : "var(--color-bg-pill)",
                                  color: isCurrent
                                    ? "#0A0F1C"
                                    : step.status === "Completed"
                                    ? "var(--color-accent)"
                                    : "var(--color-text-muted)",
                                }}
                              >
                                {step.status}
                              </span>
                            </div>
                            <div className="text-xs text-[var(--color-text-secondary)]">
                              {step.desc}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </SectionReveal>

            {/* ══════════════════════════════════════════════════════════════
                MILESTONE 01: Secondary / Pre-University Education (MRC)
               ══════════════════════════════════════════════════════════════ */}
            {mrc && (
              <SectionReveal delay={0.2}>
                <div className="relative md:pl-20">
                  {/* Timeline Node on Spine */}
                  <div
                    aria-hidden="true"
                    className="hidden md:flex absolute left-4.5 top-8 -translate-x-1/2 w-8 h-8 rounded-full items-center justify-center border-2 border-[var(--color-border-strong)] bg-[var(--color-bg-primary)] shadow-[0_0_12px_rgba(0,240,255,0.2)] z-20"
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-[#A855F7]" />
                  </div>

                  {/* Milestone Badge Bar */}
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-text-secondary)] bg-[var(--color-bg-pill)] border border-[var(--color-border-subtle)]">
                      <School size={13} className="text-[#A855F7]" />
                      <span>Pre-University Foundation · Secondary Education</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-[#A855F7] border border-[rgba(168,85,247,0.3)] bg-[rgba(168,85,247,0.08)]">
                      <CheckCircle2 size={12} />
                      Completed
                    </span>
                  </div>

                  {/* Main MRC Card */}
                  <div className="card-box flex flex-col gap-7 md:gap-8 overflow-hidden">
                    {/* Glowing Top Border Accent */}
                    <div
                      className="absolute top-0 left-0 right-0 h-[2px]"
                      style={{
                        background:
                          "linear-gradient(90deg, #A855F7 0%, #00F0FF 100%)",
                      }}
                      aria-hidden="true"
                    />

                    {/* Header Row */}
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 pb-6 border-b border-[var(--color-border-subtle)]">
                      <div className="flex items-start gap-4">
                        <div
                          className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                          style={{
                            background: "rgba(168, 85, 247, 0.1)",
                            border: "1px solid rgba(168, 85, 247, 0.35)",
                            boxShadow: "0 0 20px rgba(168, 85, 247, 0.12)",
                          }}
                          aria-hidden="true"
                        >
                          <School size={28} className="text-[#A855F7]" />
                        </div>
                        <div>
                          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#A855F7] block mb-0.5">
                            Secondary Education · Advanced Level
                          </span>
                          <h3 className="font-sans font-bold text-2xl md:text-3xl text-[var(--color-text-primary)]">
                            {mrc.institution}
                          </h3>
                          <p className="text-base font-medium text-[var(--color-text-secondary)] mt-1">
                            {mrc.degree} —{" "}
                            <span className="text-[var(--color-accent)] font-semibold">
                              {mrc.stream || mrc.specialization}
                            </span>
                          </p>
                        </div>
                      </div>

                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold self-start lg:self-center border border-[var(--color-border-subtle)] bg-[var(--color-bg-pill)] text-[var(--color-text-secondary)]">
                        <MapPin size={14} className="text-[#A855F7]" />
                        <span>{mrc.location || "Homagama, Sri Lanka"}</span>
                      </div>
                    </div>

                    {/* Quick Facts Pills */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {[
                        { label: "Level", value: mrc.degree },
                        { label: "Stream", value: mrc.stream || "Technology", highlight: true },
                        { label: "Campus", value: "Homagama" },
                        { label: "Outcome", value: "Pre-University Complete" },
                      ].map((item) => (
                        <div
                          key={item.label}
                          className="p-3.5 rounded-xl border flex flex-col justify-between"
                          style={{
                            background: "var(--color-bg-card)",
                            borderColor: "var(--color-border-subtle)",
                          }}
                        >
                          <div className="text-[10px] font-mono uppercase tracking-wider text-[var(--color-text-muted)] mb-1">
                            {item.label}
                          </div>
                          <div
                            className="font-sans font-bold text-sm"
                            style={{
                              color: item.highlight ? "var(--color-accent)" : "var(--color-text-primary)",
                            }}
                          >
                            {item.value}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Overview Description */}
                    <div className="space-y-2">
                      <h4 className="font-sans font-semibold text-base text-[var(--color-text-primary)] flex items-center gap-2">
                        <Award size={17} className="text-[#A855F7]" />
                        <span>Academic Foundation &amp; Focus</span>
                      </h4>
                      <p className="text-[15px] md:text-base leading-relaxed text-[var(--color-text-secondary)] font-sans">
                        {mrc.description}
                      </p>
                    </div>

                    {/* A/L Subjects Tag Clusters */}
                    {(mrc.subjects || mrc.highlights) && (
                      <div className="pt-6 border-t border-[var(--color-border-subtle)] space-y-3">
                        <div className="flex items-center gap-2">
                          <BookOpen size={15} className="text-[#A855F7]" />
                          <h4 className="font-mono font-semibold text-xs uppercase tracking-wider text-[var(--color-text-secondary)]">
                            Core Advanced Level Subjects
                          </h4>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {(mrc.subjects || mrc.highlights)!.map((subject) => (
                            <span
                              key={subject}
                              className="tech-tag"
                            >
                              <CheckCircle2 size={12} className="text-[#A855F7] shrink-0" />
                              <span>{subject}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </SectionReveal>
            )}

          </div>
        </div>
      </div>
    </section>
  );
}

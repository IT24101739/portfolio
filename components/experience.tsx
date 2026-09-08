"use client";

import { Briefcase, Clock } from "lucide-react";
import { SectionReveal } from "./section-reveal";

export function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ background: "var(--color-bg-secondary)" }}
    >
      <div className="section-container relative z-10">
        <SectionReveal>
          <div className="section-eyebrow">
            <span className="section-eyebrow-label">Career Journey</span>
            <span className="section-eyebrow-slash">/</span>
            <span className="section-eyebrow-label" style={{ color: "var(--color-accent)" }}>Experience</span>
          </div>
          <h2
            id="experience-heading"
            className="font-display font-bold mb-4 tracking-tight"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Professional Journey
          </h2>
          <div
            className="w-12 h-0.5 mb-12"
            style={{ background: "var(--color-accent)" }}
            aria-hidden="true"
          />
        </SectionReveal>

        {/*
          ─────────────────────────────────────────────────────────────────────
          EXPERIENCE PLACEHOLDER
          When professional experience is available, replace the content below
          with experience entries using the following structure:

          {
            id: string,
            company: string,
            role: string,
            startDate: string,
            endDate: string | "Present",
            location: string,
            type: "full-time" | "part-time" | "internship" | "contract",
            description: string,
            highlights: string[],
            technologies: string[],
            logo?: string,
          }
          ─────────────────────────────────────────────────────────────────────
        */}

        <SectionReveal delay={0.1}>
          <div
            className="rounded-2xl p-10 text-center max-w-xl mx-auto"
            style={{
              background: "var(--color-bg-card)",
              border: "1px solid var(--color-border)",
            }}
          >
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
              style={{ background: "var(--color-accent-dim)" }}
              aria-hidden="true"
            >
              <Briefcase size={28} style={{ color: "var(--color-accent)" }} />
            </div>

            <h3
              className="font-display font-semibold text-lg mb-3"
              style={{ color: "var(--color-text-primary)" }}
            >
              Experience Coming Soon
            </h3>

            <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--color-text-secondary)" }}>
              Professional experience will be added here as my career journey develops. This
              section is architected and ready for internships, part-time roles, projects, and
              full-time positions.
            </p>

            <div
              className="flex items-center justify-center gap-2 text-xs"
              style={{ color: "var(--color-text-muted)" }}
            >
              <Clock size={12} aria-hidden="true" />
              <span>Currently building foundational skills through academic studies</span>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}

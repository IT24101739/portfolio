"use client";

import {
  Award,
  CheckCircle2,
  ExternalLink,
  Brain,
  Sparkles,
  Bot,
  ShieldCheck,
  Shield,
  Code2,
} from "lucide-react";
import { SectionReveal } from "./section-reveal";
import { certifications } from "@/data/education";

function getCertIcon(id: string) {
  switch (id) {
    case "sliit-aiml-stage1":
      return Brain;
    case "google-genai":
      return Sparkles;
    case "google-llm":
      return Bot;
    case "google-responsible-ai":
      return ShieldCheck;
    case "cisco-cybersecurity":
      return Shield;
    case "uom-python":
      return Code2;
    default:
      return Award;
  }
}

export function Certifications() {
  return (
    <section
      id="certifications"
      aria-labelledby="certifications-heading"
      className="relative section-py overflow-hidden bg-transparent"
    >
      {/* Ambient background glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-0 w-[500px] h-[500px] -translate-y-1/2 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at left, rgba(0, 240, 255, 0.04) 0%, rgba(168, 85, 247, 0.02) 45%, transparent 70%)",
        }}
      />

      <div className="section-container relative z-10">
        {/* Section Header */}
        <SectionReveal className="section-header-block">
          <div className="section-eyebrow">
            <span className="section-eyebrow-number">06</span>
            <span className="section-eyebrow-slash">/</span>
            <span className="section-eyebrow-label">Credentials</span>
          </div>
          <h2
            id="certifications-heading"
            className="section-title"
          >
            Certifications &amp; <span className="gradient-text">Continuous Learning</span>
          </h2>
          <div className="section-accent-line" aria-hidden="true" />
          <p className="section-subtitle">
            Formal milestones, specialized training tracks, and applied engineering certifications
            supplementing undergraduate studies.
          </p>
        </SectionReveal>

        {/* 6 High-Tech, Professional Certification Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, i) => {
            const Icon = getCertIcon(cert.id);
            const isFeatured = i === 0;
            return (
              <SectionReveal key={cert.id} delay={i * 0.05} className="h-full">
                <article
                  className={`card-box relative h-full flex flex-col justify-between p-5 sm:p-6 transition-all duration-300 rounded-[22px] ${
                    isFeatured
                      ? "border border-[var(--color-accent)] shadow-[0_0_24px_var(--color-glow)]"
                      : "hover:border-[var(--color-accent)] hover:shadow-[0_0_25px_var(--color-glow)]"
                  }`}
                  style={{
                    background: "var(--color-bg-card)",
                  }}
                >
                  <div>
                    {/* Top Row: Unboxed Icon + Date & Badge Pill */}
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <div className="text-[var(--color-accent)]" aria-hidden="true">
                        <Icon size={22} strokeWidth={2} />
                      </div>

                      <div className="flex items-center gap-2 flex-wrap justify-end">
                        <span className="text-xs font-mono text-[var(--color-text-muted)]">
                          {cert.date}
                        </span>
                        {cert.badge && (
                          <span
                            className="text-xs font-mono font-medium px-2.5 py-0.5 rounded-full"
                            style={{
                              border: "1px solid var(--color-border-strong)",
                              background: "var(--color-accent-dim)",
                              color: "var(--color-accent)",
                            }}
                          >
                            {cert.badge}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="font-sans font-bold text-lg text-[var(--color-text-primary)] leading-snug mb-1">
                      {cert.title}
                    </h3>

                    {/* Issuer */}
                    <p className="text-xs text-[var(--color-text-secondary)] mb-4 flex items-center gap-1.5">
                      <span className="text-[var(--color-accent)] text-sm leading-none">•</span>
                      <span>{cert.issuer}</span>
                    </p>

                    {/* Key Learning Gains Section */}
                    {cert.keyLearnings && cert.keyLearnings.length > 0 && (
                      <div
                        className="mb-5 rounded-xl"
                        style={{
                          padding: "12px 14px",
                          background: "var(--color-bg-pill)",
                          border: "1px solid var(--color-border-subtle)",
                        }}
                      >
                        <p className="text-xs font-mono font-semibold text-[var(--color-text-primary)] mb-2">
                          Key Learning Gains:
                        </p>
                        <ul className="space-y-1.5 text-xs text-[var(--color-text-secondary)] leading-relaxed font-sans">
                          {cert.keyLearnings.map((bullet, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-[var(--color-accent)] text-xs font-bold shrink-0 mt-0.5 select-none">
                                •
                              </span>
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Footer: Verification Bar & Action Button */}
                  <div
                    className="pt-4 flex flex-col gap-3"
                    style={{ borderTop: "1px solid var(--color-border-subtle)" }}
                  >
                    {/* Verified Credential & ID line */}
                    <div className="flex items-center justify-between text-xs text-[var(--color-text-secondary)]">
                      <div className="flex items-center gap-1.5 text-[var(--color-text-primary)]">
                        <CheckCircle2 size={14} className="text-[var(--color-accent)]" />
                        <span className="font-medium">Verified Credential</span>
                      </div>
                      {cert.credentialId && (
                        <span
                          className="font-mono text-xs px-2 py-0.5 rounded"
                          style={{
                            background: "var(--color-bg-pill)",
                            border: "1px solid var(--color-border-subtle)",
                            color: "var(--color-text-secondary)",
                          }}
                        >
                          ID: {cert.credentialId}
                        </span>
                      )}
                    </div>

                    {/* Action Button */}
                    <a
                      href={
                        cert.credentialUrl ||
                        "https://www.linkedin.com/in/maleesha-maddegoda/details/certifications/"
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold transition-all duration-200 group/btn border border-[var(--color-accent)]/35 bg-[var(--color-accent-dim)] text-[var(--color-accent)] hover:border-[var(--color-accent)] hover:shadow-[0_0_16px_var(--color-glow)]"
                    >
                      <span>Show Credential</span>
                      <ExternalLink
                        size={13}
                        className="transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                      />
                    </a>
                  </div>
                </article>
              </SectionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

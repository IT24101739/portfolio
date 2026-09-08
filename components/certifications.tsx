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
      className="relative section-py overflow-hidden"
      style={{ background: "var(--color-bg-primary)" }}
    >
      {/* Ambient background glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-0 w-[500px] h-[500px] -translate-y-1/2 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at left, rgba(57,255,20,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="section-container relative z-10">
        {/* Section Header */}
        <SectionReveal className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#39ff14]/40 bg-[#39ff14]/10 text-[#39ff14] text-xs font-mono font-semibold mb-6">
            06 / CREDENTIALS
          </div>
          <h2
            id="certifications-heading"
            className="font-display font-bold text-3xl md:text-5xl text-white tracking-tight mb-3"
          >
            Certifications &amp; <span className="text-[#39ff14]">Continuous Learning</span>
          </h2>
          <div className="w-12 h-1 rounded-full bg-[#39ff14] mb-5" />
          <p className="text-sm md:text-base text-neutral-400 max-w-3xl leading-relaxed">
            Formal milestones, specialized training tracks, and applied engineering certifications
            supplementing undergraduate studies.
          </p>
        </SectionReveal>

        {/* 6 High-Tech, Professional Certification Cards Matching Mockup */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, i) => {
            const Icon = getCertIcon(cert.id);
            const isFeatured = i === 0; // Top-left featured card matching mockup green glow
            return (
              <SectionReveal key={cert.id} delay={i * 0.05} className="h-full">
                <article
                  className={`relative h-full flex flex-col justify-between transition-all duration-300 ${
                    isFeatured
                      ? "border border-[#39ff14]/80 shadow-[0_0_24px_rgba(57,255,20,0.18)]"
                      : "border border-neutral-800/80 hover:border-[#39ff14]/70 hover:shadow-[0_0_20px_rgba(57,255,20,0.15)]"
                  }`}
                  style={{
                    background: "#0c100c",
                    padding: "26px 24px",
                    borderRadius: "20px",
                  }}
                >
                  <div>
                    {/* Top Row: Unboxed Icon + Date & Badge Pill */}
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <div className="text-[#39ff14]" aria-hidden="true">
                        <Icon size={22} strokeWidth={2} />
                      </div>

                      <div className="flex items-center gap-2 flex-wrap justify-end">
                        <span className="text-xs font-mono text-neutral-400">
                          {cert.date}
                        </span>
                        {cert.badge && (
                          <span
                            className="text-xs font-medium px-2.5 py-0.5 rounded-full"
                            style={{
                              border: "1px solid rgba(57,255,20,0.4)",
                              background: "rgba(57,255,20,0.08)",
                              color: "#39ff14",
                            }}
                          >
                            {cert.badge}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="font-display font-bold text-lg text-white leading-snug mb-1">
                      {cert.title}
                    </h3>

                    {/* Issuer */}
                    <p className="text-xs text-neutral-400 mb-4 flex items-center gap-1.5">
                      <span className="text-[#39ff14] text-sm leading-none">•</span>
                      <span>{cert.issuer}</span>
                    </p>

                    {/* Key Learning Gains Section */}
                    {cert.keyLearnings && cert.keyLearnings.length > 0 && (
                      <div
                        className="mb-5 rounded-xl"
                        style={{
                          padding: "12px 14px",
                          background: "rgba(255, 255, 255, 0.025)",
                          border: "1px solid rgba(255, 255, 255, 0.05)",
                        }}
                      >
                        <p className="text-xs font-semibold text-neutral-200 mb-2">
                          Key Learning Gains:
                        </p>
                        <ul className="space-y-1.5 text-xs text-neutral-300 leading-relaxed">
                          {cert.keyLearnings.map((bullet, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-[#39ff14] text-xs font-bold shrink-0 mt-0.5 select-none">
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
                    style={{ borderTop: "1px solid rgba(255, 255, 255, 0.08)" }}
                  >
                    {/* Verified Credential & ID line */}
                    <div className="flex items-center justify-between text-xs text-neutral-400">
                      <div className="flex items-center gap-1.5 text-neutral-300">
                        <CheckCircle2 size={14} className="text-[#39ff14]" />
                        <span className="font-medium">Verified Credential</span>
                      </div>
                      {cert.credentialId && (
                        <span
                          className="font-mono text-xs px-2 py-0.5 rounded"
                          style={{
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(255,255,255,0.06)",
                            color: "#a3a3a3",
                          }}
                        >
                          ID: {cert.credentialId}
                        </span>
                      )}
                    </div>

                    {/* Full-width Action Button with generous internal padding */}
                    <a
                      href={
                        cert.credentialUrl ||
                        "https://www.linkedin.com/in/maleesha-maddegoda/details/certifications/"
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold transition-all duration-200 group/btn"
                      style={{
                        border: "1px solid rgba(57, 255, 20, 0.4)",
                        background: "rgba(57, 255, 20, 0.06)",
                        color: "#39ff14",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "rgba(57, 255, 20, 0.18)";
                        e.currentTarget.style.borderColor = "#39ff14";
                        e.currentTarget.style.boxShadow = "0 0 16px rgba(57,255,20,0.25)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "rgba(57, 255, 20, 0.06)";
                        e.currentTarget.style.borderColor = "rgba(57, 255, 20, 0.4)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
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

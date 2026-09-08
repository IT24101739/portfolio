"use client";

import { useState } from "react";
import { Mail, ArrowRight, MessageSquare, CheckCircle2, Copy, Check } from "lucide-react";
import { LinkedInIcon, GitHubIcon } from "./icons";
import { SectionReveal } from "./section-reveal";
import { personalInfo } from "@/data/personal";

export function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (personalInfo.email) {
      navigator.clipboard.writeText(personalInfo.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative section-py overflow-hidden"
      style={{ background: "var(--color-bg-secondary)" }}
    >
      {/* Background radial glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 100%, rgba(57,255,20,0.045) 0%, transparent 70%)",
        }}
      />

      <div className="section-container relative z-10">
        {/* Header */}
        <SectionReveal className="section-header-block">
          <div className="section-eyebrow">
            <span className="section-eyebrow-number">07</span>
            <span className="section-eyebrow-slash">/</span>
            <span className="section-eyebrow-label">Contact</span>
          </div>
          <h2 id="contact-heading" className="section-title">
            Let&apos;s Connect &amp;{" "}
            <span className="gradient-text">Collaborate</span>
          </h2>
          <div className="section-accent-line" aria-hidden="true" />
          <p className="section-subtitle">
            Whether you are a recruiter, software engineer, researcher, or fellow student,
            I am always eager to discuss new ideas, projects, and opportunities.
          </p>
        </SectionReveal>

        {/* 2-Column Content Grid */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">

          {/* Left Column: Contact Cards (6 cols) */}
          <div className="lg:col-span-6 flex flex-col gap-5">
            <SectionReveal delay={0.1}>
              <h3
                className="font-display font-semibold text-sm uppercase tracking-wider mb-2"
                style={{ color: "var(--color-text-muted)" }}
              >
                Direct Communication Channels
              </h3>
            </SectionReveal>

            {/* LinkedIn Card */}
            <SectionReveal delay={0.15}>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="card-box flex items-center justify-between gap-3 sm:gap-4 p-4 sm:p-5 group w-full min-w-0"
                style={{ textDecoration: "none" }}
                aria-label="Connect with Maleesha on LinkedIn (opens in new tab)"
              >
                <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                  <div
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105"
                    style={{
                      background: "var(--color-accent-dim)",
                      border: "1px solid var(--color-border-strong)",
                      color: "var(--color-accent)",
                    }}
                    aria-hidden="true"
                  >
                    <LinkedInIcon size={20} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[11px] sm:text-xs uppercase tracking-wider font-semibold text-[var(--color-text-muted)] block mb-0.5 truncate">
                      Professional Network
                    </span>
                    <h4 className="font-display font-bold text-sm sm:text-base text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors truncate">
                      {personalInfo.name} on LinkedIn
                    </h4>
                    <span className="text-[11px] sm:text-xs text-[var(--color-accent)] block truncate">
                      Primary Contact Channel · Active
                    </span>
                  </div>
                </div>
                <ArrowRight
                  size={18}
                  className="text-[var(--color-accent)] opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all shrink-0"
                  aria-hidden="true"
                />
              </a>
            </SectionReveal>

            {/* GitHub Card */}
            <SectionReveal delay={0.2}>
              <a
                href="https://github.com/maleesha-maddegoda"
                target="_blank"
                rel="noopener noreferrer"
                className="card-box flex items-center justify-between gap-3 sm:gap-4 p-4 sm:p-5 group w-full min-w-0"
                style={{ textDecoration: "none" }}
                aria-label="View Maleesha's GitHub Profile (opens in new tab)"
              >
                <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                  <div
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105"
                    style={{
                      background: "var(--color-bg-secondary)",
                      border: "1px solid var(--color-border)",
                      color: "var(--color-text-primary)",
                    }}
                    aria-hidden="true"
                  >
                    <GitHubIcon size={20} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[11px] sm:text-xs uppercase tracking-wider font-semibold text-[var(--color-text-muted)] block mb-0.5 truncate">
                      Code Repositories
                    </span>
                    <h4 className="font-display font-bold text-sm sm:text-base text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors truncate">
                      github.com/maleesha-maddegoda
                    </h4>
                    <span className="text-[11px] sm:text-xs text-[var(--color-text-muted)] block truncate">
                      Open-Source Projects &amp; Lab Work
                    </span>
                  </div>
                </div>
                <ArrowRight
                  size={18}
                  className="text-[var(--color-text-muted)] group-hover:text-[var(--color-accent)] group-hover:translate-x-1 transition-all shrink-0"
                  aria-hidden="true"
                />
              </a>
            </SectionReveal>

            {/* Direct Email Card */}
            <SectionReveal delay={0.25}>
              <a
                href={personalInfo.gmailComposeUrl || `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(personalInfo.email)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="card-box flex items-center justify-between gap-3 sm:gap-4 p-4 sm:p-5 group w-full min-w-0"
                style={{ textDecoration: "none" }}
                aria-label={`Open Gmail to compose email to ${personalInfo.email} (opens in new tab)`}
              >
                <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                  <div
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105"
                    style={{
                      background: "var(--color-accent-dim)",
                      border: "1px solid var(--color-border-strong)",
                      color: "var(--color-accent)",
                    }}
                    aria-hidden="true"
                  >
                    <Mail size={20} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[11px] sm:text-xs uppercase tracking-wider font-semibold text-[var(--color-text-muted)] block mb-0.5 truncate">
                      Direct Email · Gmail
                    </span>
                    <h4 className="font-display font-bold text-xs sm:text-base text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors truncate">
                      {personalInfo.email}
                    </h4>
                    <span className="text-[11px] sm:text-xs text-[var(--color-accent)] block truncate">
                      Click to open Gmail &amp; compose
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="px-2 sm:px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1 sm:gap-1.5 transition-all cursor-pointer"
                    style={{
                      background: copied ? "var(--color-accent)" : "rgba(255,255,255,0.06)",
                      border: "1px solid",
                      borderColor: copied ? "var(--color-accent)" : "var(--color-border)",
                      color: copied ? "#050505" : "var(--color-text-secondary)",
                    }}
                    title="Copy email to clipboard"
                    aria-label="Copy email address"
                  >
                    {copied ? <Check size={12} className="stroke-[2.5]" /> : <Copy size={12} />}
                    <span className="hidden sm:inline">{copied ? "Copied!" : "Copy"}</span>
                  </button>

                  <ArrowRight
                    size={18}
                    className="text-[var(--color-accent)] opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all shrink-0"
                    aria-hidden="true"
                  />
                </div>
              </a>
            </SectionReveal>
          </div>

          {/* Right Column: Collaboration & Opportunity Box (6 cols) */}
          <div className="lg:col-span-6">
            <SectionReveal delay={0.15}>
              <div className="card-box p-5 sm:p-8 md:p-10 space-y-5 sm:space-y-6">
                <div className="flex items-center gap-3.5 pb-5 border-b border-[var(--color-border)]">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background: "var(--color-accent-dim)",
                      border: "1px solid var(--color-border-strong)",
                      color: "var(--color-accent)",
                    }}
                    aria-hidden="true"
                  >
                    <MessageSquare size={22} />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-xl text-[var(--color-text-primary)]">
                      Open to Opportunities
                    </h3>
                    <p className="text-xs text-[var(--color-accent)] font-semibold">
                      Undergraduate Internship &amp; Project Availability
                    </p>
                  </div>
                </div>

                <p className="text-sm md:text-base leading-relaxed text-[var(--color-text-secondary)]">
                  I am actively seeking internship opportunities, research collaborations, and junior
                  engineering engagements where I can apply my AI/ML knowledge and full-stack software
                  development skills to meaningful, real-world problems.
                </p>

                {/* Checklist */}
                <div className="space-y-3 pt-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] block mb-2">
                    Areas of Collaboration:
                  </span>
                  {[
                    "AI & Machine Learning Internships (Summer / Industrial Placement)",
                    "Applied Computer Vision & NLP Research Projects",
                    "Full-Stack Web & Backend Engineering Collaborations",
                    "Technical Discussions, Hackathons & Open-Source Work",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <CheckCircle2 size={16} className="text-[var(--color-accent)] flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-[var(--color-text-secondary)]">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Direct Action Buttons */}
                <div className="pt-4 flex flex-col sm:flex-row gap-3">
                  <a
                    href={personalInfo.gmailComposeUrl || `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(personalInfo.email)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary flex-1 justify-center text-center text-sm py-3.5"
                    aria-label={`Open Gmail to compose email to ${personalInfo.email} (opens in new tab)`}
                  >
                    <Mail size={18} aria-hidden="true" />
                    <span>Compose on Gmail</span>
                  </a>
                  <a
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary flex-1 justify-center text-center text-sm py-3.5"
                    aria-label="Connect on LinkedIn (opens in new tab)"
                  >
                    <LinkedInIcon size={18} aria-hidden="true" />
                    <span>LinkedIn Message</span>
                  </a>
                </div>
              </div>
            </SectionReveal>
          </div>

        </div>
      </div>
    </section>
  );
}

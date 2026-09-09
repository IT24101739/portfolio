"use client";

import { ExternalLink, Rocket, Sparkles, CheckCircle2, Clock } from "lucide-react";
import { GitHubIcon } from "./icons";
import { SectionReveal } from "./section-reveal";
import { projects, Project } from "@/data/projects";

/* ─── Individual Project Showcase Card ─── */
function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="card-box h-full flex flex-col justify-between group relative overflow-hidden p-7 md:p-8">
      {/* Top Banner Accent */}
      <div>
        {/* Category & Status Row */}
        <div className="flex items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-2">
            <span
              className="text-xs font-mono font-semibold px-3 py-1 rounded-full text-[var(--color-accent)]"
              style={{
                background: "var(--color-accent-dim)",
                border: "1px solid var(--color-border-strong)",
              }}
            >
              {project.category || "AI Project"}
            </span>
          </div>

          {/* Status Badge */}
          <div
            className="flex items-center gap-1.5 text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full"
            style={{
              background:
                project.status === "completed"
                  ? "rgba(0, 240, 255, 0.1)"
                  : "rgba(251, 191, 36, 0.1)",
              color:
                project.status === "completed"
                  ? "#00F0FF"
                  : "#fbbf24",
              border: `1px solid ${
                project.status === "completed"
                  ? "rgba(0, 240, 255, 0.3)"
                  : "rgba(251, 191, 36, 0.3)"
              }`,
            }}
          >
            {project.status === "completed" ? (
              <CheckCircle2 size={11} />
            ) : (
              <Clock size={11} />
            )}
            <span>{project.status === "completed" ? "Completed" : "In Progress"}</span>
          </div>
        </div>

        {/* Project Title */}
        <h3
          className="font-sans font-bold text-xl mb-3 transition-colors duration-200 group-hover:text-[var(--color-accent)]"
          style={{ color: "var(--color-text-primary)" }}
        >
          {project.title}
        </h3>

        {/* Metric Highlight if available */}
        {project.metrics && (
          <div className="flex items-center gap-2 mb-4">
            <Sparkles size={13} className="text-[var(--color-accent)]" />
            <span className="text-xs font-mono font-semibold text-[var(--color-accent)]">
              Metric: {project.metrics}
            </span>
          </div>
        )}

        {/* Description */}
        <p className="text-sm leading-relaxed text-[var(--color-text-secondary)] mb-6 font-sans">
          {project.description}
        </p>
      </div>

      <div>
        {/* Technologies Pills with hover lift & glow */}
        {project.technologies.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-6 pt-4 border-t border-[var(--color-border-subtle)]">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="tech-tag"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold rounded-xl transition-all duration-200"
              style={{
                background: "var(--color-bg-pill)",
                color: "var(--color-text-primary)",
                border: "1px solid var(--color-border-subtle)",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = "var(--color-border-strong)";
                el.style.color = "var(--color-accent)";
                el.style.background = "var(--color-accent-dim)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = "var(--color-border-subtle)";
                el.style.color = "var(--color-text-primary)";
                el.style.background = "var(--color-bg-pill)";
              }}
              aria-label={`View ${project.title} on GitHub (opens in new tab)`}
            >
              <GitHubIcon size={14} />
              <span>Source Code</span>
            </a>
          )}

          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-bold rounded-xl transition-all duration-200"
              style={{
                background: "var(--color-accent)",
                color: "#0A0F1C",
                textDecoration: "none",
                boxShadow: "0 0 16px var(--color-accent-glow)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.boxShadow = "0 0 24px var(--color-accent-glow)";
                el.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.boxShadow = "0 0 16px var(--color-accent-glow)";
                el.style.transform = "translateY(0)";
              }}
              aria-label={`View ${project.title} live demo (opens in new tab)`}
            >
              <ExternalLink size={14} />
              <span>Explore</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export function Projects() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="relative section-py overflow-hidden bg-transparent"
    >
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 w-[600px] h-[500px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at top left, rgba(0, 240, 255, 0.04) 0%, rgba(168, 85, 247, 0.02) 45%, transparent 70%)",
        }}
      />

      <div className="section-container relative z-10">
        {/* Header */}
        <SectionReveal className="section-header-block">
          <div className="section-eyebrow">
            <span className="section-eyebrow-number">05</span>
            <span className="section-eyebrow-slash">/</span>
            <span className="section-eyebrow-label">Portfolio Work</span>
          </div>
          <h2 id="projects-heading" className="section-title">
            Featured Projects
          </h2>
          <div className="section-accent-line" aria-hidden="true" />
          <p className="section-subtitle">
            A selection of academic and exploratory applications showcasing deep learning pipelines,
            computer vision experiments, and reactive full-stack engineering.
          </p>
        </SectionReveal>

        {/* 3 Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {projects.map((project, i) => (
            <SectionReveal key={project.id} delay={i * 0.1} className="h-full">
              <ProjectCard project={project} />
            </SectionReveal>
          ))}
        </div>

        {/* Footer Research & Capstone Note */}
        <SectionReveal delay={0.3}>
          <div className="card-box p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <Rocket size={20} className="text-[var(--color-accent)] flex-shrink-0" />
              <div>
                <h4 className="font-sans font-semibold text-sm text-[var(--color-text-primary)]">
                  Upcoming 3rd Year Research &amp; Capstone
                </h4>
                <p className="text-xs text-[var(--color-text-secondary)] mt-0.5 font-sans">
                  Currently architecting advanced multi-modal AI models and edge deployment experiments at SLIIT.
                </p>
              </div>
            </div>
            <a
              href="https://github.com/maleesha-maddegoda"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono font-semibold px-4 py-2 rounded-lg transition-colors duration-200 self-center sm:self-auto border border-[var(--color-border-subtle)] bg-[var(--color-bg-pill)] text-[var(--color-accent)] hover:border-[var(--color-accent)]"
              style={{
                whiteSpace: "nowrap",
                textDecoration: "none",
              }}
            >
              View GitHub Profile →
            </a>
          </div>
        </SectionReveal>

      </div>
    </section>
  );
}

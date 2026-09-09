"use client";

import { useState } from "react";
import {
  Code2,
  BrainCircuit,
  Monitor,
  Server,
  Database,
  Wrench,
} from "lucide-react";
import { SectionReveal } from "./section-reveal";
import { skillCategories } from "@/data/skills";

const categoryIconMap: Record<string, React.ReactNode> = {
  "code-2": <Code2 size={22} />,
  "brain-circuit": <BrainCircuit size={22} />,
  "monitor": <Monitor size={22} />,
  "server": <Server size={22} />,
  "database": <Database size={22} />,
  "wrench": <Wrench size={22} />,
};

type FilterType = "all" | "ai" | "core" | "web" | "devops";

export function Skills() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  const filteredCategories = skillCategories.filter((cat) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "ai") return cat.title.toLowerCase().includes("ai") || cat.title.toLowerCase().includes("machine");
    if (activeFilter === "core") return cat.title.toLowerCase().includes("programming");
    if (activeFilter === "web") return cat.title.toLowerCase().includes("frontend") || cat.title.toLowerCase().includes("backend");
    if (activeFilter === "devops") return cat.title.toLowerCase().includes("tools") || cat.title.toLowerCase().includes("database");
    return true;
  });

  const totalSkills = skillCategories.reduce((acc, cat) => acc + cat.skills.length, 0);

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="relative section-py overflow-hidden bg-transparent"
    >
      {/* Soft background ambient glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 right-0 w-[550px] h-[550px] -translate-y-1/2 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at right, rgba(0, 240, 255, 0.035) 0%, rgba(168, 85, 247, 0.02) 45%, transparent 70%)",
        }}
      />

      <div className="section-container relative z-10">
        {/* Header */}
        <SectionReveal className="section-header-block">
          <div className="section-eyebrow">
            <span className="section-eyebrow-number">04</span>
            <span className="section-eyebrow-slash">/</span>
            <span className="section-eyebrow-label">Technical Stack</span>
          </div>
          <h2 id="skills-heading" className="section-title">
            Skills &amp; Technologies
          </h2>
          <div className="section-accent-line" aria-hidden="true" />
          <p className="section-subtitle">
            Curated technical proficiencies organized into specialized domains spanning Artificial Intelligence, algorithmic engineering, and scalable web architecture.
          </p>

          {/* Domain Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 mt-8">
            {[
              { id: "all", label: `All Domains (${totalSkills})` },
              { id: "ai", label: "AI & Machine Learning" },
              { id: "core", label: "Languages" },
              { id: "web", label: "Full-Stack & APIs" },
              { id: "devops", label: "Databases & DevOps" },
            ].map((tab) => {
              const isActive = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id as FilterType)}
                  className="px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all duration-200 cursor-pointer"
                  style={{
                    background: isActive ? "var(--color-accent-dim)" : "rgba(255,255,255,0.025)",
                    border: "1px solid",
                    borderColor: isActive ? "var(--color-border-strong)" : "rgba(255,255,255,0.07)",
                    color: isActive ? "var(--color-accent)" : "rgba(255, 255, 255, 0.7)",
                    boxShadow: isActive ? "0 0 20px rgba(0, 240, 255, 0.15)" : "none",
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </SectionReveal>

        {/* Modular Grid of Categories */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category, i) => (
            <SectionReveal key={category.title} delay={i * 0.06} className="h-full">
              <div className="card-box h-full flex flex-col justify-between group overflow-hidden">
                {/* Glowing Top Subtle Bar on Hover */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, var(--color-accent), transparent)",
                  }}
                  aria-hidden="true"
                />

                <div>
                  {/* Category Header */}
                  <div className="flex items-center gap-3.5 mb-4">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-105"
                      style={{
                        background: "var(--color-accent-dim)",
                        border: "1px solid var(--color-border-strong)",
                        color: "var(--color-accent)",
                        boxShadow: "0 0 16px rgba(0, 240, 255, 0.1)",
                      }}
                      aria-hidden="true"
                    >
                      {categoryIconMap[category.icon] || <Code2 size={22} />}
                    </div>
                    <div>
                      <h3
                        className="font-sans font-bold text-lg leading-snug group-hover:text-[var(--color-accent)] transition-colors"
                        style={{ color: "var(--color-text-primary)" }}
                      >
                        {category.title}
                      </h3>
                      <span className="text-[11px] font-mono text-[var(--color-text-muted)] flex items-center gap-1.5 mt-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] opacity-80" />
                        {category.skills.length} Technologies
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  {category.description && (
                    <p className="text-[14px] leading-relaxed text-[var(--color-text-secondary)] mb-6 font-sans">
                      {category.description}
                    </p>
                  )}
                </div>

                {/* Tech Tag Clusters with Lift and Glow */}
                <div className="pt-4 border-t border-[var(--color-border-subtle)]">
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <span
                        key={skill.name}
                        className="tech-tag"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] opacity-85" />
                        <span>{skill.name}</span>
                        {skill.level === "advanced" && (
                          <span className="text-[9px] font-mono text-[var(--color-accent)] opacity-80">
                            ★
                          </span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

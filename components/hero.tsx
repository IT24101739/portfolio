"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowDown,
  Brain,
  Code2,
  Network,
  Cpu,
  GraduationCap,
  Building2,
  Sparkles,
  Calendar,
  Mail,
  Terminal,
} from "lucide-react";
import { LinkedInIcon } from "./icons";
import Image from "next/image";
import { personalInfo } from "@/data/personal";

/* ─── Animated AI Grid Background ─── */
function AIGrid() {
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Technical grid */}
      <div className="grid-bg opacity-50" />

      {/* Subtle radial depth gradient behind Hero — Deep glowing effect */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 75% 55% at 50% 15%, rgba(0, 240, 255, 0.08) 0%, rgba(168, 85, 247, 0.04) 45%, transparent 75%)",
        }}
      />

      {/* Subtle side glow — right */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 45% 65% at 85% 45%, rgba(0, 240, 255, 0.05) 0%, transparent 70%)",
        }}
      />

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40"
        style={{ background: "linear-gradient(to top, var(--color-bg-primary), transparent)" }}
      />
    </div>
  );
}

/* ─── 5 Path Badges Orbiting Profile ─── */
const pathItems = [
  {
    icon: Brain,
    label: "AI & Machine Learning",
    shortLabel: "AI & ML",
    pos: "-top-3 sm:top-0 left-1/2 -translate-x-1/2",
    yAnim: [0, -6, 0],
    xAnim: [0, 0, 0],
    duration: 3.8,
    delay: 0,
  },
  {
    icon: Code2,
    label: "Full-Stack Development",
    shortLabel: "Full-Stack Dev",
    pos: "top-[14%] -left-1 sm:-left-3",
    yAnim: [0, 5, 0],
    xAnim: [0, -3, 0],
    duration: 4.2,
    delay: 0.7,
  },
  {
    icon: Network,
    label: "Deep Learning",
    shortLabel: "Deep Learning",
    pos: "top-[14%] -right-1 sm:-right-3",
    yAnim: [0, -5, 0],
    xAnim: [0, 3, 0],
    duration: 4,
    delay: 1.4,
  },
  {
    icon: GraduationCap,
    label: "SLIIT · AI Specialization",
    shortLabel: "SLIIT · AI Spec",
    pos: "bottom-[12%] -left-1 sm:-left-3",
    yAnim: [0, 6, 0],
    xAnim: [0, -3, 0],
    duration: 4.4,
    delay: 2.1,
  },
  {
    icon: Cpu,
    label: "Computer Vision & NLP",
    shortLabel: "CV & NLP",
    pos: "bottom-[12%] -right-1 sm:-right-3",
    yAnim: [0, -6, 0],
    xAnim: [0, 3, 0],
    duration: 3.9,
    delay: 2.8,
  },
];

/* ─── Stylized Geometric Deep Tech Profile Image Component ─── */
function ProfileImage() {
  return (
    <div className="relative w-[290px] h-[290px] sm:w-[380px] sm:h-[380px] lg:w-[450px] lg:h-[450px] mx-auto my-6 sm:my-4 select-none flex items-center justify-center">
      {/* ─── Ambient Glow Halo ─── */}
      <div
        aria-hidden="true"
        className="absolute inset-4 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(0, 240, 255, 0.15) 0%, rgba(168, 85, 247, 0.08) 45%, transparent 70%)",
          filter: "blur(24px)",
        }}
      />

      {/* ─── Outer Geometric Cyber Ring with Cyan Accents ─── */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute inset-2 sm:inset-4 rounded-full border border-dashed pointer-events-none"
        style={{ borderColor: "rgba(0, 240, 255, 0.3)" }}
        aria-hidden="true"
      />

      {/* ─── Secondary Counter-Rotating Ring with Neon Purple Accents ─── */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 52, repeat: Infinity, ease: "linear" }}
        className="absolute inset-8 sm:inset-10 rounded-full border border-dotted pointer-events-none opacity-50"
        style={{ borderColor: "rgba(168, 85, 247, 0.35)" }}
        aria-hidden="true"
      />

      {/* ─── Pulsing Radar Halo ─── */}
      <motion.div
        animate={{ scale: [0.98, 1.04, 0.98], opacity: [0.25, 0.6, 0.25] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-10 sm:inset-12 rounded-full pointer-events-none"
        style={{
          border: "1px solid rgba(0, 240, 255, 0.25)",
          boxShadow: "0 0 35px rgba(0, 240, 255, 0.15)",
        }}
        aria-hidden="true"
      />

      {/* ─── HUD Corner Brackets around frame ─── */}
      <div className="absolute inset-12 sm:inset-16 pointer-events-none opacity-60">
        <span className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-[#00F0FF]" />
        <span className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-[#00F0FF]" />
        <span className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-[#00F0FF]" />
        <span className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-[#00F0FF]" />
      </div>

      {/* ─── Connecting Neural Node Lines (SVG) ─── */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden="true"
      >
        <line x1="50%" y1="20%" x2="50%" y2="8%" stroke="rgba(0,240,255,0.25)" strokeDasharray="3 3" strokeWidth="1" />
        <line x1="28%" y1="28%" x2="16%" y2="18%" stroke="rgba(0,240,255,0.25)" strokeDasharray="3 3" strokeWidth="1" />
        <line x1="72%" y1="28%" x2="84%" y2="18%" stroke="rgba(0,240,255,0.25)" strokeDasharray="3 3" strokeWidth="1" />
        <line x1="28%" y1="72%" x2="16%" y2="82%" stroke="rgba(0,240,255,0.25)" strokeDasharray="3 3" strokeWidth="1" />
        <line x1="72%" y1="72%" x2="84%" y2="82%" stroke="rgba(0,240,255,0.25)" strokeDasharray="3 3" strokeWidth="1" />
      </svg>

      {/* ─── Center Photo Geometric Frame ─── */}
      <div className="relative w-[170px] h-[170px] sm:w-[230px] sm:h-[230px] lg:w-[270px] lg:h-[270px] rounded-full group/photo">
        {/* Outer subtle cyan glow */}
        <div
          aria-hidden="true"
          className="absolute -inset-3 rounded-full pointer-events-none transition-opacity duration-500 group-hover/photo:opacity-100 opacity-60"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(0, 240, 255, 0.28) 0%, transparent 70%)",
          }}
        />

        {/* Rotating dashed ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
          className="absolute -inset-2 rounded-full border border-dashed pointer-events-none"
          style={{ borderColor: "rgba(0, 240, 255, 0.45)" }}
          aria-hidden="true"
        />

        {/* Inner static accent border */}
        <div
          className="absolute -inset-1 rounded-full border pointer-events-none"
          style={{ borderColor: "rgba(0, 240, 255, 0.25)" }}
          aria-hidden="true"
        />

        {/* Image container with subtle grayscale filter transitioning to full color on hover */}
        <div
          className="relative w-full h-full rounded-full overflow-hidden transition-all duration-500"
          style={{
            border: "2.5px solid rgba(0, 240, 255, 0.6)",
            boxShadow: "0 0 35px rgba(0, 240, 255, 0.22), inset 0 0 24px rgba(0,0,0,0.7)",
            background: "var(--color-bg-card)",
          }}
        >
          <Image
            src="/images/profile.jpg"
            alt="Maleesha Maddegoda - AI & ML Engineer and Full-Stack Developer"
            fill
            priority
            sizes="(max-width: 640px) 170px, (max-width: 1024px) 230px, 270px"
            className="object-cover object-[center_20%] grayscale group-hover/photo:grayscale-0 transition-all duration-500 ease-out"
          />
        </div>
      </div>

      {/* ─── 5 Orbiting Badges Around Profile (Theme-Adaptive) ─── */}
      {pathItems.map((item) => (
        <motion.div
          key={item.label}
          animate={{
            y: item.yAnim,
            x: item.xAnim,
          }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: item.delay,
          }}
          whileHover={{ scale: 1.08, y: -4 }}
          className={`absolute ${item.pos} z-20 flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1 sm:py-2 rounded-full text-[10px] sm:text-xs font-semibold shadow-xl whitespace-nowrap backdrop-blur-md transition-all duration-300 cursor-default select-none border`}
          style={{
            background: "var(--color-bg-glass)",
            borderColor: "var(--color-border-subtle)",
            color: "var(--color-accent)",
            boxShadow:
              "0 4px 16px var(--color-card-shadow), 0 0 10px var(--color-glow)",
          }}
        >
          {/* Glowing accent LED dot */}
          <span
            className="w-1.5 h-1.5 rounded-full shrink-0"
            style={{
              background: "var(--color-accent)",
              boxShadow: "0 0 8px var(--color-accent)",
            }}
            aria-hidden="true"
          />

          <item.icon
            size={13}
            className="shrink-0"
            style={{
              color: "var(--color-accent)",
              filter: "drop-shadow(0 0 4px rgba(0, 240, 255, 0.5))",
            }}
            aria-hidden="true"
          />

          <span
            style={{
              color: "var(--color-accent)",
              fontWeight: 600,
              letterSpacing: "0.02em",
            }}
          >
            <span className="sm:hidden">{item.shortLabel}</span>
            <span className="hidden sm:inline">{item.label}</span>
          </span>
        </motion.div>
      ))}
    </div>
  );
}

/* ─── Typed Title Animation ─── */
function AnimatedTitle({ titles }: { titles: string[] }) {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let titleIdx = 0;
    let charIdx = 0;
    let direction: "forward" | "backward" = "forward";
    let timeout: ReturnType<typeof setTimeout>;

    const type = () => {
      const currentTitle = titles[titleIdx];
      if (!containerRef.current) return;

      if (direction === "forward") {
        charIdx++;
        containerRef.current.textContent = currentTitle.slice(0, charIdx);
        if (charIdx === currentTitle.length) {
          direction = "backward";
          timeout = setTimeout(type, 2200);
          return;
        }
      } else {
        charIdx--;
        containerRef.current.textContent = currentTitle.slice(0, charIdx);
        if (charIdx === 0) {
          direction = "forward";
          titleIdx = (titleIdx + 1) % titles.length;
        }
      }

      timeout = setTimeout(type, direction === "forward" ? 80 : 45);
    };

    timeout = setTimeout(type, 400);
    return () => clearTimeout(timeout);
  }, [titles]);

  return (
    <span className="inline-flex items-center">
      <span ref={containerRef}>{titles[0]}</span>
      <motion.span
        aria-hidden="true"
        className="ml-1 inline-block w-0.5 h-[1.1em] rounded-full align-middle"
        style={{ background: "var(--color-accent)" }}
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity }}
      />
    </span>
  );
}

/* ─── FadeUp animation wrapper ─── */
function FadeUp({
  children,
  delay = 0,
  className,
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

/* ─── Hero Section ─── */
export function Hero() {
  return (
    <section
      id="home"
      aria-label="Hero section"
      className="relative min-h-screen flex flex-col justify-start lg:justify-center overflow-x-hidden hero-section bg-transparent"
    >
      <AIGrid />

      <div className="section-container relative z-10 w-full pt-1 sm:pt-2 lg:pt-0">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-start lg:items-center">

          {/* ── Left: Text Content (7 cols) ── */}
          <div className="lg:col-span-7 text-center lg:text-left flex flex-col items-center lg:items-start">

            {/* Live Status Pill (Terminal Monospace) */}
            <FadeUp delay={0} className="mb-4 sm:mb-6">
              <div
                className="inline-flex items-center gap-2 sm:gap-2.5 px-3.5 sm:px-4 py-1.5 rounded-full border text-[10px] sm:text-xs font-mono tracking-wide backdrop-blur-md"
                style={{
                  background: "rgba(0, 240, 255, 0.05)",
                  borderColor: "rgba(0, 240, 255, 0.28)",
                  boxShadow: "0 0 20px rgba(0, 240, 255, 0.1)",
                }}
              >
                <span className="relative flex h-2 w-2 shrink-0">
                  <span
                    className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                    style={{ background: "var(--color-accent)" }}
                  />
                  <span
                    className="relative inline-flex rounded-full h-2 w-2"
                    style={{ background: "var(--color-accent)", boxShadow: "0 0 6px var(--color-accent)" }}
                  />
                </span>
                <span className="uppercase tracking-wider font-bold" style={{ color: "var(--color-accent)" }}>
                  Aspiring AI &amp; ML Engineer
                </span>
                <span className="opacity-25 hidden sm:inline" style={{ color: "var(--color-text-muted)" }}>|</span>
                <span className="font-medium hidden sm:inline" style={{ color: "var(--color-text-secondary)" }}>
                  SLIIT AI Specialization
                </span>
              </div>
            </FadeUp>

            {/* Main Headline (Clean Sans-Serif Inter) */}
            <FadeUp delay={0.1} className="mb-4 sm:mb-6">
              <h1
                className="font-sans font-extrabold leading-[1.08] tracking-tight text-center lg:text-left"
                style={{
                  fontSize: "clamp(2.4rem, 6.4vw, 4.8rem)",
                  color: "var(--color-text-primary)",
                }}
              >
                <span className="block sm:inline">Maleesha </span>
                <span className="gradient-text block sm:inline">Maddegoda</span>
              </h1>
            </FadeUp>

            {/* Animated Dynamic Role Badge / Terminal display (JetBrains Mono) */}
            <FadeUp delay={0.2} className="mb-5 sm:mb-7 w-full flex justify-center lg:justify-start">
              <div
                className="inline-flex items-center gap-2.5 sm:gap-3 px-4 py-2 rounded-xl border text-xs sm:text-base font-mono backdrop-blur-sm max-w-full"
                style={{
                  background: "var(--color-bg-card)",
                  borderColor: "var(--color-border-subtle)",
                }}
              >
                <Terminal size={15} className="shrink-0" style={{ color: "var(--color-accent)" }} aria-hidden="true" />
                <span className="text-[11px] sm:text-xs uppercase tracking-wider font-semibold shrink-0" style={{ color: "var(--color-text-muted)" }}>
                  Focus:
                </span>
                <span
                  className="font-semibold text-xs sm:text-base truncate"
                  style={{ color: "var(--color-text-primary)" }}
                  aria-label={`Specialization: ${personalInfo.titles.join(" and ")}`}
                >
                  <AnimatedTitle titles={personalInfo.titles} />
                </span>
              </div>
            </FadeUp>

            {/* Tagline / Bio Description (Theme-adaptive secondary text) */}
            <FadeUp delay={0.3} className="mb-7 sm:mb-9">
              <p
                className="leading-relaxed max-w-xl text-[14px] sm:text-base md:text-lg text-[var(--color-text-secondary)] px-2 sm:px-0 font-sans"
              >
                {personalInfo.tagline}
              </p>
            </FadeUp>

            {/* ── Primary & Secondary Differentiated Action CTAs ── */}
            <FadeUp delay={0.4} className="w-full">
              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 justify-center lg:justify-start w-full sm:w-auto">
                {/* Primary CTA: Solid Electric Cyan Button */}
                <a
                  href="#projects"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="btn-primary hero-action-btn group cursor-pointer w-full sm:w-auto max-w-[320px] sm:max-w-none"
                  aria-label="Explore my projects"
                >
                  <ArrowDown size={16} className="shrink-0 transition-transform duration-300 group-hover:translate-y-0.5" aria-hidden="true" />
                  <span>Explore Projects</span>
                </a>

                {/* Secondary Ghost CTA 1: LinkedIn */}
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary hero-action-btn group cursor-pointer w-full sm:w-auto max-w-[320px] sm:max-w-none"
                  aria-label="Connect with Maleesha on LinkedIn (opens in new tab)"
                >
                  <LinkedInIcon size={16} className="shrink-0 transition-colors group-hover:text-[var(--color-accent)]" aria-hidden="true" />
                  <span>Connect on LinkedIn</span>
                </a>

                {/* Secondary Ghost CTA 2: Email */}
                {personalInfo.gmailComposeUrl && (
                  <a
                    href={personalInfo.gmailComposeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary hero-action-btn group cursor-pointer w-full sm:w-auto max-w-[320px] sm:max-w-none"
                    aria-label="Open Gmail to compose email to Maleesha (opens in new tab)"
                  >
                    <Mail size={16} className="shrink-0 transition-colors group-hover:text-[var(--color-accent)]" aria-hidden="true" />
                    <span>Email Me</span>
                  </a>
                )}
              </div>
            </FadeUp>
          </div>

          {/* ── Right: Profile Image (5 cols) ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex justify-center pt-6 sm:pt-4 lg:pt-0"
          >
            <ProfileImage />
          </motion.div>
        </div>

        {/* ── Tier 2: Academic Profile & Milestones Ribbon (Full-Width Dashboard) ── */}
        <FadeUp delay={0.5} className="w-full mt-14 sm:mt-16 lg:mt-20 pt-8 sm:pt-10 border-t border-[var(--color-border-subtle)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 sm:mb-8">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-accent)] opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[var(--color-accent)] shadow-[0_0_8px_var(--color-accent)]" />
              </span>
              <h2 className="font-sans font-bold text-lg sm:text-xl md:text-2xl text-[var(--color-text-primary)] tracking-tight">
                Academic Profile &amp; Timeline
              </h2>
            </div>
            <span className="text-xs font-mono px-3.5 py-1.5 rounded-full bg-[var(--color-accent-dim)] border border-[var(--color-border-strong)] text-[var(--color-accent)] font-semibold inline-flex items-center gap-2 self-start sm:self-auto">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" />
              SLIIT Undergraduate
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 w-full">
            {[
              {
                icon: Building2,
                label: "Institution",
                badge: "Computing",
                value: "SLIIT",
                sub: "Faculty of Computing",
              },
              {
                icon: GraduationCap,
                label: "Degree Program",
                badge: "Honors",
                value: "BSc (Hons) in IT",
                sub: "AI Specialization",
                highlight: true,
              },
              {
                icon: Sparkles,
                label: "Current Level",
                badge: "Year 3",
                value: "3rd Year Undergraduate",
                sub: "AI & ML Specialization",
              },
              {
                icon: Calendar,
                label: "Graduation Target",
                badge: "Class of 2028",
                value: "2024 — 2028",
                sub: "4-Year Honors Degree",
              },
            ].map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="p-4 sm:p-5 rounded-2xl border text-left transition-all duration-300 hover:translate-y-[-3px] group relative overflow-hidden cursor-default card-box hover:border-[var(--color-accent)] hover:shadow-[0_8px_24px_var(--color-glow)] flex flex-col justify-between gap-2.5"
                >
                  {/* Top Header: Icon + Category Label + Badge Pill */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-[var(--color-accent-dim)] border border-[var(--color-border-strong)] text-[var(--color-accent)] shrink-0">
                        <Icon size={14} aria-hidden="true" />
                      </div>
                      <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--color-text-muted)] font-medium">
                        {stat.label}
                      </span>
                    </div>
                    {stat.badge && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[var(--color-bg-pill)] border border-[var(--color-border-subtle)] text-[var(--color-text-muted)] group-hover:border-[var(--color-accent)]/40 group-hover:text-[var(--color-accent)] transition-colors shrink-0">
                        {stat.badge}
                      </span>
                    )}
                  </div>

                  {/* Middle: Prominent Value */}
                  <div className="font-sans font-bold text-base sm:text-lg text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors leading-snug">
                    {stat.value}
                  </div>

                  {/* Bottom: Subtitle with optional highlight dot */}
                  <div className="text-xs font-medium text-[var(--color-text-secondary)] flex items-center gap-1.5">
                    {stat.highlight && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] shadow-[0_0_6px_var(--color-accent)] shrink-0" />
                    )}
                    <span style={{ color: stat.highlight ? "var(--color-accent)" : undefined }}>
                      {stat.sub}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

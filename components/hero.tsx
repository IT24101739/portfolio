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
      <div className="grid-bg opacity-70" />

      {/* Soft green radial glow — top center */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 65% 50% at 50% 0%, rgba(57,255,20,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Subtle side glow — right */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 40% 60% at 85% 50%, rgba(34,197,94,0.04) 0%, transparent 70%)",
        }}
      />

      {/* Floating data nodes — green only */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: i % 3 === 0 ? 3.5 : 2,
            height: i % 3 === 0 ? 3.5 : 2,
            left: `${6 + i * 8}%`,
            top: `${10 + (i % 6) * 15}%`,
            background:
              i % 2 === 0
                ? "rgba(57,255,20,0.6)"
                : "rgba(34,197,94,0.45)",
            boxShadow: i % 3 === 0
              ? "0 0 8px rgba(57,255,20,0.5)"
              : "none",
          }}
          animate={{ y: [0, -18, 0], opacity: [0.25, 0.75, 0.25] }}
          transition={{
            duration: 3.5 + (i % 4) * 0.8,
            delay: i * 0.3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Neural connection lines — green strokes */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.06]"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="hero-line-1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#39ff14" stopOpacity="0" />
            <stop offset="50%" stopColor="#39ff14" stopOpacity="1" />
            <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="hero-line-2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22c55e" stopOpacity="0" />
            <stop offset="50%" stopColor="#22c55e" stopOpacity="1" />
            <stop offset="100%" stopColor="#39ff14" stopOpacity="0" />
          </linearGradient>
        </defs>
        <line x1="5%"  y1="20%" x2="25%" y2="45%" stroke="url(#hero-line-1)" strokeWidth="0.8" />
        <line x1="25%" y1="45%" x2="48%" y2="28%" stroke="url(#hero-line-2)" strokeWidth="0.8" />
        <line x1="48%" y1="28%" x2="72%" y2="52%" stroke="url(#hero-line-1)" strokeWidth="0.8" />
        <line x1="72%" y1="52%" x2="92%" y2="33%" stroke="url(#hero-line-2)" strokeWidth="0.8" />
        <line x1="25%" y1="45%" x2="48%" y2="70%" stroke="url(#hero-line-1)" strokeWidth="0.8" />
        <line x1="48%" y1="70%" x2="72%" y2="52%" stroke="url(#hero-line-2)" strokeWidth="0.8" />
        {[[5,20],[25,45],[48,28],[72,52],[92,33],[48,70]].map(([cx,cy],i) => (
          <circle
            key={i}
            cx={`${cx}%`}
            cy={`${cy}%`}
            r="2.5"
            fill={i % 2 === 0 ? "#39ff14" : "#22c55e"}
            opacity="0.8"
          />
        ))}
      </svg>

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

/* ─── Profile Image Component with Animated Orbit ─── */
function ProfileImage() {
  return (
    <div className="relative w-[290px] h-[290px] sm:w-[380px] sm:h-[380px] lg:w-[450px] lg:h-[450px] mx-auto my-6 sm:my-4 select-none flex items-center justify-center">
      {/* ─── Background Orbit Track (Outer Animated Dashed Ring) ─── */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
        className="absolute inset-2 sm:inset-4 rounded-full border border-dashed pointer-events-none"
        style={{ borderColor: "rgba(57,255,20,0.25)" }}
        aria-hidden="true"
      />

      {/* ─── Secondary Counter-Rotating Ring ─── */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 48, repeat: Infinity, ease: "linear" }}
        className="absolute inset-8 sm:inset-10 rounded-full border border-dotted pointer-events-none opacity-40"
        style={{ borderColor: "rgba(57,255,20,0.2)" }}
        aria-hidden="true"
      />

      {/* ─── Pulsing Radar Halo ─── */}
      <motion.div
        animate={{ scale: [0.98, 1.04, 0.98], opacity: [0.25, 0.55, 0.25] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-10 sm:inset-12 rounded-full pointer-events-none"
        style={{
          border: "1px solid rgba(57,255,20,0.2)",
          boxShadow: "0 0 35px rgba(57,255,20,0.12)",
        }}
        aria-hidden="true"
      />

      {/* ─── Connecting Neural Node Lines (SVG) ─── */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden="true"
      >
        <line x1="50%" y1="20%" x2="50%" y2="8%" stroke="rgba(57,255,20,0.25)" strokeDasharray="3 3" strokeWidth="1" />
        <line x1="28%" y1="28%" x2="16%" y2="18%" stroke="rgba(57,255,20,0.25)" strokeDasharray="3 3" strokeWidth="1" />
        <line x1="72%" y1="28%" x2="84%" y2="18%" stroke="rgba(57,255,20,0.25)" strokeDasharray="3 3" strokeWidth="1" />
        <line x1="28%" y1="72%" x2="16%" y2="82%" stroke="rgba(57,255,20,0.25)" strokeDasharray="3 3" strokeWidth="1" />
        <line x1="72%" y1="72%" x2="84%" y2="82%" stroke="rgba(57,255,20,0.25)" strokeDasharray="3 3" strokeWidth="1" />
      </svg>

      {/* ─── Center Photo Circle ─── */}
      <div className="relative w-[170px] h-[170px] sm:w-[230px] sm:h-[230px] lg:w-[270px] lg:h-[270px] rounded-full">
        {/* Outer subtle glow */}
        <div
          aria-hidden="true"
          className="absolute -inset-3 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(57,255,20,0.2) 0%, transparent 70%)",
            animation: "pulse-ring 4s ease-in-out infinite",
          }}
        />

        {/* Rotating dashed ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
          className="absolute -inset-2 rounded-full border border-dashed pointer-events-none"
          style={{ borderColor: "rgba(57,255,20,0.35)" }}
          aria-hidden="true"
        />

        {/* Inner static accent border */}
        <div
          className="absolute -inset-1 rounded-full border pointer-events-none"
          style={{ borderColor: "rgba(57,255,20,0.2)" }}
          aria-hidden="true"
        />

        {/* Image container */}
        <div
          className="relative w-full h-full rounded-full overflow-hidden"
          style={{
            border: "2.5px solid rgba(57,255,20,0.5)",
            boxShadow: "0 0 35px rgba(57,255,20,0.18), inset 0 0 24px rgba(0,0,0,0.6)",
            background: "var(--color-bg-card)",
          }}
        >
          <Image
            src="/images/profile.jpg"
            alt="Maleesha Maddegoda - AI & ML Engineer and Full-Stack Developer"
            fill
            priority
            sizes="(max-width: 640px) 170px, (max-width: 1024px) 230px, 270px"
            className="object-cover object-[center_20%]"
          />
        </div>
      </div>

      {/* ─── 5 Orbiting Badges Around Profile (Green Text According to Theme) ─── */}
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
          className={`absolute ${item.pos} z-20 flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3.5 py-1 sm:py-2 rounded-full text-[10px] sm:text-xs font-semibold shadow-2xl whitespace-nowrap backdrop-blur-md transition-all duration-300 cursor-default select-none`}
          style={{
            background: "rgba(10, 15, 10, 0.92)",
            border: "1px solid rgba(57, 255, 20, 0.45)",
            color: "var(--color-accent)",
            textShadow: "0 0 10px rgba(57, 255, 20, 0.45)",
            boxShadow:
              "0 0 20px rgba(57, 255, 20, 0.18), 0 8px 24px rgba(0, 0, 0, 0.65)",
          }}
        >
          {/* Glowing neon green LED dot */}
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
              filter: "drop-shadow(0 0 4px rgba(57,255,20,0.5))",
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
      transition={{ duration: 0.65, delay, ease: "easeOut" }}
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
      className="relative min-h-[calc(100dvh-60px)] lg:min-h-[calc(100dvh-76px)] block lg:flex lg:flex-col lg:justify-center overflow-x-hidden pt-6 sm:pt-10 lg:pt-14 pb-16 md:pb-24"
      style={{ background: "var(--color-bg-primary)" }}
    >
      <AIGrid />

      <div className="section-container relative z-10 w-full pt-2 sm:pt-4 lg:pt-0">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-start lg:items-center">

          {/* ── Left: Text Content (7 cols) ── */}
          <div className="lg:col-span-7 text-center lg:text-left flex flex-col items-center lg:items-start">

            {/* Live Status Pill */}
            <FadeUp delay={0} className="mb-3.5 sm:mb-5">
              <div
                className="inline-flex items-center gap-2 sm:gap-2.5 px-3 sm:px-3.5 py-1.5 rounded-full border text-[10px] sm:text-xs font-mono tracking-wide backdrop-blur-md"
                style={{
                  background: "rgba(57, 255, 20, 0.05)",
                  borderColor: "rgba(57, 255, 20, 0.25)",
                  boxShadow: "0 0 20px rgba(57, 255, 20, 0.08)",
                }}
              >
                <span className="relative flex h-2 w-2 shrink-0">
                  <span
                    className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                    style={{ background: "var(--color-accent)" }}
                  />
                  <span
                    className="relative inline-flex rounded-full h-2 w-2"
                    style={{ background: "var(--color-accent)" }}
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

            {/* Main Headline */}
            <FadeUp delay={0.1} className="mb-3 sm:mb-4">
              <h1
                className="font-display font-bold leading-[1.08] tracking-tight text-center lg:text-left"
                style={{
                  fontSize: "clamp(2.2rem, 6.2vw, 4.6rem)",
                  color: "var(--color-text-primary)",
                }}
              >
                <span className="block sm:inline">Maleesha </span>
                <span className="gradient-text block sm:inline">Maddegoda</span>
              </h1>
            </FadeUp>

            {/* Animated Dynamic Role Badge / Terminal display */}
            <FadeUp delay={0.2} className="mb-4 sm:mb-6 w-full flex justify-center lg:justify-start">
              <div
                className="inline-flex items-center gap-2 sm:gap-2.5 px-3 sm:px-3.5 py-1.5 rounded-xl border text-xs sm:text-base font-mono backdrop-blur-sm max-w-full"
                style={{
                  background: "rgba(255, 255, 255, 0.025)",
                  borderColor: "rgba(255, 255, 255, 0.09)",
                }}
              >
                <Terminal size={14} className="shrink-0" style={{ color: "var(--color-accent)" }} aria-hidden="true" />
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

            {/* Tagline / Bio Description */}
            <FadeUp delay={0.3} className="mb-6 sm:mb-8">
              <p
                className="leading-relaxed max-w-xl text-[14px] sm:text-base md:text-lg text-[var(--color-text-secondary)] px-2 sm:px-0"
              >
                {personalInfo.tagline}
              </p>
            </FadeUp>

            {/* ── Primary & Secondary Action Dock ── */}
            <FadeUp delay={0.4} className="w-full mb-8 sm:mb-12">
              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-3.5 justify-center lg:justify-start w-full sm:w-auto">
                <a
                  href="#projects"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="hero-action-btn group relative cursor-pointer w-full sm:w-auto max-w-[320px] sm:max-w-none"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    gap: "10px",
                    padding: "14px 28px",
                    minHeight: "48px",
                    lineHeight: 1,
                    borderRadius: "12px",
                    whiteSpace: "nowrap",
                    boxSizing: "border-box",
                    background: "var(--color-accent)",
                    color: "#050505",
                    fontWeight: 700,
                    fontSize: "14px",
                    boxShadow: "0 4px 20px rgba(57, 255, 20, 0.25)",
                    transition: "all 0.3s ease",
                  }}
                  aria-label="Explore my projects"
                >
                  <ArrowDown size={16} className="shrink-0 transition-transform duration-300 group-hover:translate-y-0.5" aria-hidden="true" />
                  <span style={{ lineHeight: 1 }}>Explore Projects</span>
                </a>

                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-action-btn group relative cursor-pointer w-full sm:w-auto max-w-[320px] sm:max-w-none"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    gap: "10px",
                    padding: "14px 28px",
                    minHeight: "48px",
                    lineHeight: 1,
                    borderRadius: "12px",
                    whiteSpace: "nowrap",
                    boxSizing: "border-box",
                    background: "rgba(18, 18, 18, 0.75)",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    backdropFilter: "blur(12px)",
                    color: "var(--color-text-primary)",
                    fontWeight: 600,
                    fontSize: "14px",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--color-accent)";
                    e.currentTarget.style.color = "var(--color-accent)";
                    e.currentTarget.style.boxShadow = "0 0 20px rgba(57, 255, 20, 0.2)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.12)";
                    e.currentTarget.style.color = "var(--color-text-primary)";
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                  aria-label="Connect with Maleesha on LinkedIn (opens in new tab)"
                >
                  <LinkedInIcon size={16} className="shrink-0 text-[var(--color-accent)]" aria-hidden="true" />
                  <span style={{ lineHeight: 1 }}>Connect on LinkedIn</span>
                </a>

                {personalInfo.gmailComposeUrl && (
                  <a
                    href={personalInfo.gmailComposeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hero-action-btn group relative cursor-pointer w-full sm:w-auto max-w-[320px] sm:max-w-none"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "center",
                      gap: "10px",
                      padding: "14px 28px",
                      minHeight: "48px",
                      lineHeight: 1,
                      borderRadius: "12px",
                      whiteSpace: "nowrap",
                      boxSizing: "border-box",
                      background: "rgba(18, 18, 18, 0.75)",
                      border: "1px solid rgba(255, 255, 255, 0.12)",
                      backdropFilter: "blur(12px)",
                      color: "var(--color-text-primary)",
                      fontWeight: 600,
                      fontSize: "14px",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "var(--color-accent)";
                      e.currentTarget.style.color = "var(--color-accent)";
                      e.currentTarget.style.boxShadow = "0 0 20px rgba(57, 255, 20, 0.2)";
                      e.currentTarget.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.12)";
                      e.currentTarget.style.color = "var(--color-text-primary)";
                      e.currentTarget.style.boxShadow = "none";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                    aria-label="Open Gmail to compose email to Maleesha (opens in new tab)"
                  >
                    <Mail size={16} className="shrink-0 text-[var(--color-accent)]" aria-hidden="true" />
                    <span style={{ lineHeight: 1 }}>Email Me</span>
                  </a>
                )}
              </div>
            </FadeUp>

            {/* ── Academic Profile & Key Metrics Panel (Clearly Separated) ── */}
            <FadeUp delay={0.5} className="w-full pt-7" style={{ borderTop: "1px solid rgba(255, 255, 255, 0.09)" }}>
              {/* Eyebrow label so it clearly reads as informational data, not more buttons */}
              <div className="flex items-center gap-2 mb-3 text-[11px] font-mono uppercase tracking-wider text-[var(--color-text-muted)] justify-center lg:justify-start">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] opacity-80" />
                <span>Academic Profile &amp; Timeline</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full">
                {[
                  {
                    icon: Building2,
                    label: "Institution",
                    value: personalInfo.universityShort,
                    sub: "Faculty of Computing",
                  },
                  {
                    icon: GraduationCap,
                    label: "Degree Program",
                    value: "BSc (Hons) IT",
                    sub: "AI Specialization",
                    highlight: true,
                  },
                  {
                    icon: Sparkles,
                    label: "Current Level",
                    value: personalInfo.currentYear.split(" ")[0] + " " + personalInfo.currentYear.split(" ")[1],
                    sub: "Undergraduate",
                  },
                  {
                    icon: Calendar,
                    label: "Graduation",
                    value: personalInfo.graduationYear.toString(),
                    sub: "Class of " + personalInfo.graduationYear,
                  },
                ].map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={stat.label}
                      className="p-3 sm:p-3.5 rounded-xl border text-left transition-all duration-300 hover:translate-y-[-2px] group relative overflow-hidden cursor-default"
                      style={{
                        background: "rgba(255, 255, 255, 0.02)",
                        borderColor: "rgba(255, 255, 255, 0.08)",
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget;
                        el.style.borderColor = "var(--color-border-strong)";
                        el.style.background = "rgba(57, 255, 20, 0.04)";
                        el.style.boxShadow = "0 8px 24px rgba(57, 255, 20, 0.08)";
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget;
                        el.style.borderColor = "rgba(255, 255, 255, 0.08)";
                        el.style.background = "rgba(255, 255, 255, 0.02)";
                        el.style.boxShadow = "none";
                      }}
                    >
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <Icon size={13} className="text-[var(--color-accent)] opacity-80" aria-hidden="true" />
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--color-text-muted)]">
                          {stat.label}
                        </span>
                      </div>
                      <div className="font-display font-bold text-sm sm:text-base text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors">
                        {stat.value}
                      </div>
                      <div
                        className="text-[10px] mt-0.5 truncate font-medium"
                        style={{
                          color: stat.highlight ? "var(--color-accent)" : "var(--color-text-muted)",
                        }}
                      >
                        {stat.sub}
                      </div>
                    </div>
                  );
                })}
              </div>
            </FadeUp>
          </div>

          {/* ── Right: Profile Image (5 cols) ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-5 flex justify-center"
          >
            <ProfileImage />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

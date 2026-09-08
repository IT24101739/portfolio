"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Cpu, ArrowRight } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { personalInfo } from "@/data/personal";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "AI Focus", href: "#ai-focus" },
  { label: "Education", href: "#education" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Active section detection with proper offset
      const sections = navLinks.map((link) => link.href.replace("#", ""));
      for (const section of [...sections].reverse()) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setMobileOpen(false);
      }
    };
    if (mobileOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mobileOpen]);

  // Close mobile menu on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <motion.header
      ref={navRef}
      role="banner"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: isScrolled
          ? "var(--color-bg-glass)"
          : "transparent",
        backdropFilter: isScrolled ? "blur(16px) saturate(180%)" : "none",
        WebkitBackdropFilter: isScrolled ? "blur(16px) saturate(180%)" : "none",
        borderBottom: "1px solid var(--color-border)",
      }}
    >
      <div className="w-full px-6 sm:px-8 lg:px-10 xl:px-12">
        <div className="relative flex items-center justify-between h-[76px]">

          {/* ═════════════════════════════════════════════════════════════════
              LEFT: Compact Logo + Name + Professional Subtitle
              ═════════════════════════════════════════════════════════════════ */}
          <button
            onClick={() => handleNavClick("#home")}
            className="flex items-center gap-3 group cursor-pointer border-none bg-transparent p-0 text-left shrink-0 z-10"
            aria-label="Go to top of page"
          >
            {/* Compact square logo with subtle green border & glow */}
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 group-hover:scale-105"
              style={{
                background: "var(--color-bg-card)",
                border: "1px solid var(--color-border-strong)",
                boxShadow: "0 0 10px rgba(57, 255, 20, 0.12)",
              }}
            >
              <Cpu size={16} style={{ color: "var(--color-accent)" }} aria-hidden="true" />
            </div>

            {/* Name + Subtitle */}
            <div className="flex flex-col">
              <span
                className="font-display font-bold text-[15px] sm:text-[16px] tracking-tight leading-tight transition-colors group-hover:text-[var(--color-accent)]"
                style={{ color: "var(--color-text-primary)" }}
              >
                {personalInfo.name}
              </span>
              <span
                className="font-mono text-[9px] sm:text-[10px] tracking-[0.14em] uppercase font-semibold mt-0.5 leading-none"
                style={{
                  color: "var(--color-accent)",
                  opacity: 0.85,
                }}
              >
                AI &amp; ML ENGINEER · FULL-STACK DEVELOPER
              </span>
            </div>
          </button>

          {/* ═════════════════════════════════════════════════════════════════
              CENTER: Truly Centered Navigation Links
              ═════════════════════════════════════════════════════════════════ */}
          <nav
            aria-label="Main navigation"
            className="hidden lg:flex items-center gap-3 xl:gap-5 2xl:gap-7 absolute left-1/2 -translate-x-1/2 z-10"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  aria-current={isActive ? "page" : undefined}
                  className="relative py-2 px-1 text-[13.5px] xl:text-[14px] font-medium transition-colors duration-200 cursor-pointer border-none bg-transparent whitespace-nowrap shrink-0 group"
                  style={{
                    color: isActive
                      ? "var(--color-accent)"
                      : "var(--color-text-secondary)",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = "var(--color-accent)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = "var(--color-text-secondary)";
                    }
                  }}
                >
                  <span>{link.label}</span>

                  {/* Subtle active indicator: understated bottom line with spring transition */}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-indicator"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full"
                      style={{
                        background: "var(--color-accent)",
                        boxShadow: "0 0 8px var(--color-accent-glow)",
                      }}
                      transition={{ type: "spring", stiffness: 420, damping: 32 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* ═════════════════════════════════════════════════════════════════
              RIGHT: Premium "Let's Connect →" CTA + Theme Toggle + Robot
              ═════════════════════════════════════════════════════════════════ */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0 ml-auto z-10">

            {/* Premium Attractive "Let's Connect" CTA Button */}
            <button
              onClick={() => handleNavClick("#contact")}
              className="group relative hidden sm:inline-flex items-center gap-2.5 px-4 py-2 rounded-xl text-[13px] font-semibold transition-all duration-300 cursor-pointer overflow-hidden"
              style={{
                background: "linear-gradient(135deg, rgba(57, 255, 20, 0.12) 0%, rgba(18, 18, 18, 0.85) 100%)",
                border: "1px solid rgba(57, 255, 20, 0.35)",
                color: "var(--color-accent)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                boxShadow: "0 2px 12px rgba(0, 0, 0, 0.4), 0 0 15px rgba(57, 255, 20, 0.08)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-1.5px) scale(1.02)";
                e.currentTarget.style.borderColor = "var(--color-accent)";
                e.currentTarget.style.boxShadow = "0 6px 24px rgba(0, 0, 0, 0.5), 0 0 25px rgba(57, 255, 20, 0.32)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0) scale(1)";
                e.currentTarget.style.borderColor = "rgba(57, 255, 20, 0.35)";
                e.currentTarget.style.boxShadow = "0 2px 12px rgba(0, 0, 0, 0.4), 0 0 15px rgba(57, 255, 20, 0.08)";
              }}
              aria-label="Navigate to contact section to connect"
            >
              {/* Shimmering highlight sweep on hover */}
              <span
                aria-hidden="true"
                className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"
              />

              {/* Status beacon dot with pulse ring */}
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-accent)] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-accent)] shadow-[0_0_8px_var(--color-accent)]" />
              </span>

              <span className="tracking-wide">Let&apos;s Connect</span>

              {/* Icon badge with slide and glow animation */}
              <span className="w-5 h-5 rounded-md flex items-center justify-center bg-[var(--color-accent-dim)] border border-[rgba(57,255,20,0.3)] transition-all duration-300 group-hover:border-[var(--color-accent)] group-hover:bg-[var(--color-accent)] group-hover:text-[#050505]">
                <ArrowRight size={11} className="transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
              </span>
            </button>

            {/* Compact High-Tech Theme Toggle */}
            <ThemeToggle />

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              className="lg:hidden w-9 h-9 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)] flex items-center justify-center transition-all duration-200 hover:border-[var(--color-border-strong)] hover:bg-[var(--color-accent-dim)] cursor-pointer"
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen ? (
                  <motion.span
                    key="close"
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.15 }}
                  >
                    <X size={18} style={{ color: "var(--color-accent)" }} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ opacity: 0, rotate: 90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: -90 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Menu size={18} style={{ color: "var(--color-text-secondary)" }} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>

        </div>
      </div>

      {/* ═════════════════════════════════════════════════════════════════
          MOBILE SLIDE-DOWN DRAWER MENU
          ═════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            role="menu"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden"
            style={{
              background: "var(--color-bg-glass)",
              backdropFilter: "blur(20px) saturate(180%)",
              WebkitBackdropFilter: "blur(20px) saturate(180%)",
              borderTop: "1px solid var(--color-border)",
            }}
          >
            <div className="max-w-[1440px] mx-auto px-6 py-6">
              {/* Navigation Links list */}
              <ul role="list" className="flex flex-col gap-1">
                {navLinks.map((link, i) => {
                  const isActive = activeSection === link.href.replace("#", "");
                  return (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.025, duration: 0.2 }}
                    >
                      <button
                        onClick={() => handleNavClick(link.href)}
                        role="menuitem"
                        aria-current={isActive ? "page" : undefined}
                        className="w-full text-left px-3 py-2.5 text-[15px] font-medium rounded-lg transition-all duration-200 cursor-pointer border-none flex items-center justify-between"
                        style={{
                          background: isActive ? "var(--color-accent-dim)" : "transparent",
                          color: isActive
                            ? "var(--color-accent)"
                            : "var(--color-text-secondary)",
                          borderLeft: isActive
                            ? "2px solid var(--color-accent)"
                            : "2px solid transparent",
                        }}
                      >
                        <span>{link.label}</span>
                        {isActive && (
                          <span
                            className="w-1.5 h-1.5 rounded-full"
                            style={{
                              background: "var(--color-accent)",
                              boxShadow: "0 0 6px var(--color-accent)",
                            }}
                          />
                        )}
                      </button>
                    </motion.li>
                  );
                })}
              </ul>

              {/* Action row at bottom of mobile menu */}
              <div
                className="mt-5 pt-4 flex items-center justify-between gap-3 text-xs"
                style={{
                  borderTop: "1px solid var(--color-border)",
                }}
              >
                <div className="flex items-center gap-2 font-mono text-[11px]" style={{ color: "var(--color-text-muted)" }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] animate-pulse" />
                  <span>Available for collaborations</span>
                </div>

                <button
                  onClick={() => handleNavClick("#contact")}
                  className="group inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-all duration-200"
                  style={{
                    background: "linear-gradient(135deg, rgba(57, 255, 20, 0.12) 0%, rgba(18, 18, 18, 0.85) 100%)",
                    border: "1px solid rgba(57, 255, 20, 0.35)",
                    color: "var(--color-accent)",
                    boxShadow: "0 0 12px rgba(57, 255, 20, 0.1)",
                  }}
                >
                  <span>Let&apos;s Connect</span>
                  <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

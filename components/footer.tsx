"use client";

import { Cpu, ArrowUp, Mail } from "lucide-react";
import { LinkedInIcon } from "./icons";
import { personalInfo } from "@/data/personal";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      role="contentinfo"
      aria-label="Site footer"
      className="relative"
      style={{
        background: "var(--color-bg-secondary)",
        borderTop: "1px solid var(--color-border)",
      }}
    >
      <div className="section-container py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left: Branding */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <div className="flex items-center gap-2.5">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, var(--color-accent) 0%, var(--color-green2) 100%)",
                }}
                aria-hidden="true"
              >
                <Cpu size={16} style={{ color: "#050505" }} />
              </div>
              <span
                className="font-display font-bold text-base"
                style={{ color: "var(--color-text-primary)" }}
              >
                {personalInfo.name}
              </span>
            </div>

            <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
              {personalInfo.titles.join(" | ")}
            </p>
          </div>

          {/* Center: Nav Links */}
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              {[
                { label: "Home", href: "#home" },
                { label: "About", href: "#about" },
                { label: "AI Focus", href: "#ai-focus" },
                { label: "Education", href: "#education" },
                { label: "Skills", href: "#skills" },
                { label: "Projects", href: "#projects" },
                { label: "Certifications", href: "#certifications" },
                { label: "Contact", href: "#contact" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      const id = link.href.replace("#", "");
                      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="text-xs transition-colors duration-200"
                    style={{ color: "var(--color-text-muted)", textDecoration: "none" }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.color = "var(--color-accent)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.color = "var(--color-text-muted)";
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right: Social + Back to top */}
          <div className="flex items-center gap-3">
            {/* Email */}
            {personalInfo.email && (
              <a
                href={personalInfo.gmailComposeUrl || `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(personalInfo.email)}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Compose email to ${personalInfo.email} on Gmail (opens in new tab)`}
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200"
                style={{
                  background: "var(--color-bg-card)",
                  border: "1px solid var(--color-border)",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = "var(--color-border-accent)";
                  el.style.background = "var(--color-accent-dim)";
                  el.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = "var(--color-border)";
                  el.style.background = "var(--color-bg-card)";
                  el.style.transform = "translateY(0)";
                }}
              >
                <Mail size={15} style={{ color: "var(--color-accent)" }} aria-hidden="true" />
              </a>
            )}

            {/* LinkedIn */}
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Maleesha Maddegoda on LinkedIn (opens in new tab)"
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200"
              style={{
                background: "var(--color-bg-card)",
                border: "1px solid var(--color-border)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = "var(--color-border-accent)";
                el.style.background = "var(--color-accent-dim)";
                el.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = "var(--color-border)";
                el.style.background = "var(--color-bg-card)";
                el.style.transform = "translateY(0)";
              }}
            >
              <LinkedInIcon size={15} style={{ color: "var(--color-accent)" }} aria-hidden="true" />
            </a>

            {/* Back to top */}
            <button
              onClick={scrollToTop}
              aria-label="Scroll back to top of page"
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 cursor-pointer"
              style={{
                background: "var(--color-bg-card)",
                border: "1px solid var(--color-border)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = "var(--color-border-accent)";
                el.style.background = "var(--color-accent-dim)";
                el.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = "var(--color-border)";
                el.style.background = "var(--color-bg-card)";
                el.style.transform = "translateY(0)";
              }}
            >
              <ArrowUp size={15} style={{ color: "var(--color-text-muted)" }} aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Divider */}
        <div
          className="my-8"
          style={{
            height: "1px",
            background: "var(--color-border)",
          }}
          aria-hidden="true"
        />

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-center">
          <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
            © {currentYear} {personalInfo.fullName}. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
            Built with Next.js · TypeScript · Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}

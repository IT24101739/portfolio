"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)] opacity-60" />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="group relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 cursor-pointer overflow-hidden"
      style={{
        background: "rgba(18, 18, 18, 0.75)",
        border: "1px solid rgba(57, 255, 20, 0.25)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.4), inset 0 0 12px rgba(57, 255, 20, 0.04)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--color-accent)";
        e.currentTarget.style.boxShadow = "0 0 18px rgba(57, 255, 20, 0.35), inset 0 0 14px rgba(57, 255, 20, 0.12)";
        e.currentTarget.style.transform = "scale(1.05)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(57, 255, 20, 0.25)";
        e.currentTarget.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.4), inset 0 0 12px rgba(57, 255, 20, 0.04)";
        e.currentTarget.style.transform = "scale(1)";
      }}
    >
      {/* Subtle ambient backglow */}
      <span
        aria-hidden="true"
        className="absolute inset-0 rounded-xl bg-[var(--color-accent)] opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"
      />

      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.div
            key="moon"
            initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
            transition={{ type: "spring", stiffness: 380, damping: 22 }}
            className="flex items-center justify-center relative"
          >
            <Moon
              size={17}
              className="text-[var(--color-accent)] transition-transform duration-300 group-hover:rotate-12"
              style={{
                filter: "drop-shadow(0 0 6px rgba(57, 255, 20, 0.6))",
              }}
            />
            {/* Ambient starlight sparkle dot */}
            <span className="absolute -top-1 -right-1 w-1 h-1 rounded-full bg-[var(--color-accent)] animate-pulse" />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ opacity: 0, rotate: 90, scale: 0.6 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: -90, scale: 0.6 }}
            transition={{ type: "spring", stiffness: 380, damping: 22 }}
            className="flex items-center justify-center relative"
          >
            <Sun
              size={17}
              className="text-[var(--color-accent)] transition-transform duration-500 group-hover:rotate-45"
              style={{
                filter: "drop-shadow(0 0 6px rgba(57, 255, 20, 0.5))",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}

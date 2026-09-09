"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "framer-motion";

const subscribe = () => () => {};

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );

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
      className="group relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 cursor-pointer overflow-hidden border border-[var(--color-border-subtle)] bg-[var(--color-bg-pill)] text-[var(--color-accent)] hover:border-[var(--color-accent)] hover:shadow-[0_0_18px_var(--color-glow)] hover:scale-105"
      style={{
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
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
                filter: "drop-shadow(0 0 6px rgba(0, 240, 255, 0.6))",
              }}
            />
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
                filter: "drop-shadow(0 0 6px rgba(0, 240, 255, 0.5))",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}

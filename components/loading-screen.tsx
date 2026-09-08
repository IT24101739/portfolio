"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Sparkles } from "lucide-react";

interface Node {
  x: number;
  y: number;
  size: number;
  pulsePhase: number;
}

interface Signal {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  progress: number;
  speed: number;
  size: number;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
}

export function LoadingScreen({ onComplete }: { onComplete?: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"converging" | "revealing" | "ready" | "exiting">("converging");
  const [isVisible, setIsVisible] = useState(true);

  // Skip handler
  const handleSkip = () => {
    setPhase("exiting");
    setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, 500);
  };

  // Lock scroll while active
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isVisible]);

  // Keyboard shortcut (ESC) to skip
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleSkip();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Progress counter simulation
  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 8) + 4;
      if (current >= 100) {
        current = 100;
        setProgress(100);
        clearInterval(interval);
      } else {
        setProgress(current);
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // Sequence controller
  useEffect(() => {
    // 0.7s: Start revealing the name in the center as border signals converge
    const timer1 = setTimeout(() => {
      setPhase("revealing");
    }, 700);

    // 2.2s: Full neural sync reached
    const timer2 = setTimeout(() => {
      setPhase("ready");
    }, 2100);

    // 2.6s: Begin smooth exit transition
    const timer3 = setTimeout(() => {
      setPhase("exiting");
    }, 2600);

    // 3.1s: Complete and unmount loading screen
    const timer4 = setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, 3100);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [onComplete]);

  // Canvas Neural Network Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initNetwork();
    };
    window.addEventListener("resize", handleResize);

    // Network elements
    let borderNodes: Node[] = [];
    let hiddenNodes: Node[] = [];
    let signals: Signal[] = [];
    let ripples: Ripple[] = [];
    let center = { x: width / 2, y: height / 2 };

    const initNetwork = () => {
      center = { x: width / 2, y: height / 2 };
      borderNodes = [];
      hiddenNodes = [];
      signals = [];
      ripples = [];

      const borderCountX = Math.max(6, Math.floor(width / 140));
      const borderCountY = Math.max(4, Math.floor(height / 140));

      // 1. Top & Bottom border nodes
      for (let i = 0; i <= borderCountX; i++) {
        const x = (width / borderCountX) * i;
        borderNodes.push({ x, y: 0, size: 2.5, pulsePhase: Math.random() * Math.PI });
        borderNodes.push({ x, y: height, size: 2.5, pulsePhase: Math.random() * Math.PI });
      }

      // 2. Left & Right border nodes
      for (let i = 1; i < borderCountY; i++) {
        const y = (height / borderCountY) * i;
        borderNodes.push({ x: 0, y, size: 2.5, pulsePhase: Math.random() * Math.PI });
        borderNodes.push({ x: width, y, size: 2.5, pulsePhase: Math.random() * Math.PI });
      }

      // 3. Intermediate Hidden Layer Nodes around center
      const hiddenCount = 14;
      const radiusX = Math.min(width * 0.28, 320);
      const radiusY = Math.min(height * 0.28, 220);

      for (let i = 0; i < hiddenCount; i++) {
        const angle = (i / hiddenCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.2;
        const rX = radiusX * (0.8 + Math.random() * 0.4);
        const rY = radiusY * (0.8 + Math.random() * 0.4);
        hiddenNodes.push({
          x: center.x + Math.cos(angle) * rX,
          y: center.y + Math.sin(angle) * rY,
          size: 2,
          pulsePhase: Math.random() * Math.PI,
        });
      }
    };

    initNetwork();

    let lastSignalSpawn = 0;

    const render = (time: number) => {
      ctx.fillStyle = "rgba(5, 5, 5, 0.28)"; // soft trailing effect
      ctx.fillRect(0, 0, width, height);

      // Spawn signal impulses from perimeter border inwards
      if (time - lastSignalSpawn > 65) {
        lastSignalSpawn = time;

        // Choose a random border node
        const bNode = borderNodes[Math.floor(Math.random() * borderNodes.length)];
        // Connect to nearest hidden node
        let closestHidden = hiddenNodes[0];
        let minDist = Infinity;
        for (const h of hiddenNodes) {
          const d = Math.hypot(h.x - bNode.x, h.y - bNode.y);
          if (d < minDist) {
            minDist = d;
            closestHidden = h;
          }
        }

        if (bNode && closestHidden) {
          signals.push({
            fromX: bNode.x,
            fromY: bNode.y,
            toX: closestHidden.x,
            toY: closestHidden.y,
            progress: 0,
            speed: 0.024 + Math.random() * 0.02,
            size: 2.2,
          });
        }

        // Also randomly spawn signals from hidden layer into the center
        if (Math.random() > 0.3 && hiddenNodes.length > 0) {
          const hNode = hiddenNodes[Math.floor(Math.random() * hiddenNodes.length)];
          signals.push({
            fromX: hNode.x,
            fromY: hNode.y,
            toX: center.x,
            toY: center.y,
            progress: 0,
            speed: 0.03 + Math.random() * 0.025,
            size: 3,
          });
        }
      }

      // Draw faint structural synaptic pathways
      ctx.lineWidth = 0.7;
      ctx.strokeStyle = "rgba(57, 255, 20, 0.07)";
      for (const b of borderNodes) {
        for (const h of hiddenNodes) {
          const dist = Math.hypot(h.x - b.x, h.y - b.y);
          if (dist < Math.min(width, height) * 0.58) {
            ctx.beginPath();
            ctx.moveTo(b.x, b.y);
            ctx.lineTo(h.x, h.y);
            ctx.stroke();
          }
        }
      }

      // Connect hidden nodes to center
      ctx.lineWidth = 0.9;
      ctx.strokeStyle = "rgba(57, 255, 20, 0.12)";
      for (const h of hiddenNodes) {
        ctx.beginPath();
        ctx.moveTo(h.x, h.y);
        ctx.lineTo(center.x, center.y);
        ctx.stroke();
      }

      // Connect hidden nodes to each other in ring
      ctx.strokeStyle = "rgba(57, 255, 20, 0.08)";
      for (let i = 0; i < hiddenNodes.length; i++) {
        const next = hiddenNodes[(i + 1) % hiddenNodes.length];
        ctx.beginPath();
        ctx.moveTo(hiddenNodes[i].x, hiddenNodes[i].y);
        ctx.lineTo(next.x, next.y);
        ctx.stroke();
      }

      // Update and draw traveling signals
      for (let i = signals.length - 1; i >= 0; i--) {
        const s = signals[i];
        s.progress += s.speed;

        if (s.progress >= 1) {
          // If signal reached center, emit a ripple
          if (Math.hypot(s.toX - center.x, s.toY - center.y) < 15) {
            ripples.push({
              x: center.x,
              y: center.y,
              radius: 10,
              maxRadius: 180 + Math.random() * 80,
              alpha: 0.65,
            });
          }
          signals.splice(i, 1);
          continue;
        }

        const currX = s.fromX + (s.toX - s.fromX) * s.progress;
        const currY = s.fromY + (s.toY - s.fromY) * s.progress;

        // Signal tail/head
        ctx.save();
        ctx.fillStyle = "#ffffff";
        ctx.shadowColor = "#39ff14";
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(currX, currY, s.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Update and draw ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += 2.8;
        r.alpha -= 0.015;

        if (r.alpha <= 0 || r.radius >= r.maxRadius) {
          ripples.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.strokeStyle = `rgba(57, 255, 20, ${r.alpha * 0.4})`;
        ctx.lineWidth = 1.2;
        ctx.shadowColor = "#39ff14";
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      // Draw border nodes
      for (const b of borderNodes) {
        b.pulsePhase += 0.05;
        const pulse = 1 + Math.sin(b.pulsePhase) * 0.3;
        ctx.fillStyle = "rgba(57, 255, 20, 0.65)";
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.size * pulse, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw hidden nodes
      for (const h of hiddenNodes) {
        h.pulsePhase += 0.06;
        const pulse = 1 + Math.sin(h.pulsePhase) * 0.35;
        ctx.fillStyle = "rgba(57, 255, 20, 0.8)";
        ctx.beginPath();
        ctx.arc(h.x, h.y, h.size * pulse, 0, Math.PI * 2);
        ctx.fill();
      }

      // Central core glow
      ctx.save();
      const grad = ctx.createRadialGradient(center.x, center.y, 0, center.x, center.y, 140);
      grad.addColorStop(0, "rgba(57, 255, 20, 0.18)");
      grad.addColorStop(0.5, "rgba(57, 255, 20, 0.05)");
      grad.addColorStop(1, "transparent");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(center.x, center.y, 140, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {phase !== "exiting" ? (
        <motion.div
          key="neural-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, filter: "blur(8px)" }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050505] select-none overflow-hidden cursor-default"
          style={{ willChange: "opacity, transform" }}
        >
          {/* Background Canvas */}
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

          {/* Corner Tech Brackets (Cyber HUD) */}
          <div className="absolute top-6 left-6 flex items-center gap-2 pointer-events-none opacity-60">
            <span className="w-2.5 h-2.5 border-t-2 border-l-2 border-[var(--color-accent)]" />
            <span className="font-mono text-[10px] tracking-widest uppercase text-[var(--color-text-muted)]">
              SYS.INITIALIZE // PORTFOLIO
            </span>
          </div>

          <div className="absolute top-6 right-6 flex items-center gap-3 z-20">
            {/* Skip button */}
            <button
              onClick={handleSkip}
              className="font-mono text-[11px] px-3 py-1 rounded border border-[rgba(255,255,255,0.1)] bg-[rgba(0,0,0,0.4)] text-[var(--color-text-muted)] hover:text-[var(--color-accent)] hover:border-[var(--color-border-accent)] transition-all cursor-pointer backdrop-blur-md"
              title="Skip intro animation"
            >
              Skip <span className="opacity-50">[ESC]</span>
            </button>
          </div>

          <div className="absolute bottom-6 left-6 pointer-events-none opacity-50 font-mono text-[10px] text-[var(--color-text-muted)]">
            NEURAL_NODES: ACTIVE // CONVERGENCE: 100%
          </div>

          <div className="absolute bottom-6 right-6 pointer-events-none opacity-60">
            <span className="w-2.5 h-2.5 border-b-2 border-r-2 border-[var(--color-accent)] block" />
          </div>

          {/* Central Neural Interface & Name Reveal */}
          <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-xl">
            {/* Core Neural Icon */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative w-16 h-16 sm:w-20 sm:h-20 mb-6 flex items-center justify-center"
            >
              {/* Spinning Outer Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border border-dashed"
                style={{ borderColor: "rgba(57, 255, 20, 0.4)" }}
              />

              {/* Counter-spinning Inner Ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute inset-2 rounded-full border border-dotted"
                style={{ borderColor: "rgba(57, 255, 20, 0.6)" }}
              />

              {/* Glowing Core */}
              <div
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shadow-lg"
                style={{
                  background: "radial-gradient(circle, rgba(57,255,20,0.2) 0%, rgba(5,5,5,0.9) 100%)",
                  border: "1px solid var(--color-accent)",
                  boxShadow: "0 0 25px rgba(57, 255, 20, 0.35)",
                }}
              >
                <Cpu size={22} className="text-[var(--color-accent)] animate-pulse" />
              </div>
            </motion.div>

            {/* Eyebrow Status */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[11px] font-mono uppercase tracking-widest mb-3"
              style={{
                background: "rgba(57, 255, 20, 0.06)",
                borderColor: "rgba(57, 255, 20, 0.25)",
                color: "var(--color-accent)",
              }}
            >
              <Sparkles size={12} />
              <span>Neural Network Synchronized</span>
            </motion.div>

            {/* Name Reveal: "Maleesha Maddegoda" */}
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.96 }}
              animate={phase !== "converging" ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 15, scale: 0.96 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <h1
                className="font-display font-bold tracking-tight text-3xl sm:text-5xl md:text-6xl text-white leading-tight"
                style={{
                  textShadow: "0 0 40px rgba(57, 255, 20, 0.3)",
                }}
              >
                Maleesha{" "}
                <span
                  className="gradient-text"
                  style={{
                    filter: "drop-shadow(0 0 16px rgba(57, 255, 20, 0.45))",
                  }}
                >
                  Maddegoda
                </span>
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={phase !== "converging" ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mt-3 font-mono text-xs sm:text-sm tracking-wider uppercase text-[var(--color-text-secondary)]"
            >
              AI &amp; ML Engineer <span className="text-[var(--color-accent)]">·</span> Full-Stack Developer
            </motion.p>

            {/* Progress Bar & Percentage */}
            <motion.div
              initial={{ opacity: 0, width: "60%" }}
              animate={{ opacity: 1, width: "100%" }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mt-6 w-56 sm:w-72 max-w-full"
            >
              <div className="flex justify-between items-center text-[10px] font-mono text-[var(--color-text-muted)] mb-1.5">
                <span>CONNECTING SYNAPSES</span>
                <span className="text-[var(--color-accent)] font-semibold">{progress}%</span>
              </div>
              <div
                className="h-1 w-full rounded-full overflow-hidden"
                style={{ background: "rgba(255, 255, 255, 0.08)" }}
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: "linear-gradient(90deg, var(--color-green2) 0%, var(--color-accent) 100%)",
                    boxShadow: "0 0 12px var(--color-accent)",
                    width: `${progress}%`,
                  }}
                  transition={{ ease: "easeOut" }}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

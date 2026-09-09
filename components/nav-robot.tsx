"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type RobotState =
  | "walk-right"
  | "jump"
  | "sit-swing"
  | "slip-fall"
  | "hang-swing"
  | "climb-up"
  | "celebrate";

export function NavRobot() {
  const [state, setState] = useState<RobotState>("walk-right");
  const [speech, setSpeech] = useState<string | null>(null);
  const [clickCount, setClickCount] = useState(0);

  // Animation state sequence
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (state === "walk-right") {
      timer = setTimeout(() => {
        setState("jump");
      }, 3600);
    } else if (state === "jump") {
      timer = setTimeout(() => {
        setState("sit-swing");
      }, 1600);
    } else if (state === "sit-swing") {
      timer = setTimeout(() => {
        setState("slip-fall");
        setSpeech("Whoa! ⚡");
      }, 4400);
    } else if (state === "slip-fall") {
      timer = setTimeout(() => {
        setState("hang-swing");
        setSpeech("Holding on!");
      }, 900);
    } else if (state === "hang-swing") {
      timer = setTimeout(() => {
        setState("climb-up");
        setSpeech(null);
      }, 3600);
    } else if (state === "climb-up") {
      timer = setTimeout(() => {
        setState("celebrate");
        setSpeech("Safe! 🤖✨");
      }, 2100);
    } else if (state === "celebrate") {
      timer = setTimeout(() => {
        setSpeech(null);
        setState("walk-right");
      }, 2600);
    }

    return () => clearTimeout(timer);
  }, [state]);

  const handleRobotClick = () => {
    setClickCount((c) => c + 1);
    const greetings = [
      "Beep boop! 👋",
      "I'm Maleesha's AI Bot! ⚡",
      "Neural nodes synced! 🚀",
      "All systems operational! 💙",
      "Watch my acrobatic tricks! 🎪",
    ];
    setSpeech(greetings[clickCount % greetings.length]);
    setTimeout(() => setSpeech(null), 2500);
  };

  return (
    <div
      className="hidden lg:flex items-center justify-center relative select-none z-30 shrink-0"
      style={{
        width: "48px",
        height: "48px",
      }}
    >
      <motion.div
        onClick={handleRobotClick}
        title="Hi! I'm your AI companion in the right corner. Click me!"
        className="relative cursor-pointer group"
        animate={
          state === "walk-right"
            ? { x: [-10, 10, -10], y: [0, -3, 0, -3, 0] }
            : state === "jump"
            ? { x: 0, y: [-4, -26, -4, -16, 0] }
            : state === "sit-swing"
            ? { x: 0, y: 16 }
            : state === "slip-fall"
            ? { x: [0, 4, -2], y: [16, 32, 44], rotate: [0, 18, -12, 6] }
            : state === "hang-swing"
            ? { x: 0, y: 44, rotate: [-14, 14, -10, 10, -4, 0] }
            : state === "climb-up"
            ? { x: [0, -3, 2, 0], y: [44, 28, 12, 0], rotate: [0, -8, 6, 0] }
            : { x: 0, y: [0, -18, 0], rotate: [0, 360, 360] }
        }
        transition={{
          duration:
            state === "walk-right"
              ? 3.6
              : state === "jump"
              ? 1.6
              : state === "sit-swing"
              ? 0.5
              : state === "slip-fall"
              ? 0.9
              : state === "hang-swing"
              ? 3.6
              : state === "climb-up"
              ? 2.1
              : 1.4,
          ease: state === "slip-fall" ? "easeIn" : "easeInOut",
        }}
      >
        {/* Interactive Speech Bubble */}
        <AnimatePresence>
          {speech && (
            <motion.div
              initial={{ opacity: 0, y: 4, scale: 0.8 }}
              animate={{ opacity: 1, y: -24, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
              className="absolute -top-4 right-0 whitespace-nowrap px-2.5 py-1 rounded-full text-[10.5px] font-mono font-bold bg-[#0A0F1C] text-[#00F0FF] border border-[#00F0FF]/70 shadow-[0_0_12px_rgba(0,240,255,0.45)] pointer-events-none z-40"
            >
              {speech}
              <div className="absolute -bottom-1 right-4 w-2 h-2 bg-[#0A0F1C] border-b border-r border-[#00F0FF]/70 rotate-45" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Robot Visual SVG */}
        <svg
          width="44"
          height="48"
          viewBox="0 0 44 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_0_10px_rgba(0,240,255,0.55)] transition-transform duration-200 group-hover:scale-110"
        >
          {/* Pulsing AI Antenna */}
          <line x1="22" y1="10" x2="22" y2="4" stroke="#00F0FF" strokeWidth="2" strokeLinecap="round" />
          <circle cx="22" cy="3" r="3" fill="#00F0FF" className="animate-pulse" />
          <circle cx="22" cy="3" r="5" fill="#00F0FF" opacity="0.4" className="animate-ping" />

          {/* Robot Head */}
          <rect
            x="11"
            y="9"
            width="22"
            height="16"
            rx="5"
            fill="#0D1527"
            stroke="#00F0FF"
            strokeWidth="1.6"
          />

          {/* Cyber Ears */}
          <rect x="8" y="14" width="3" height="6" rx="1.5" fill="#00F0FF" />
          <rect x="33" y="14" width="3" height="6" rx="1.5" fill="#00F0FF" />

          {/* Visor Display Screen */}
          <rect x="14" y="12" width="16" height="9" rx="3" fill="#0A0F1C" />

          {/* Expressive Visor Eyes */}
          {state === "slip-fall" || state === "hang-swing" ? (
            <g fill="#00F0FF">
              <circle cx="18" cy="16.5" r="2.6" />
              <circle cx="26" cy="16.5" r="2.6" />
              <line x1="17" y1="13.5" x2="19" y2="13.5" stroke="#00F0FF" strokeWidth="1" />
              <line x1="25" y1="13.5" x2="27" y2="13.5" stroke="#00F0FF" strokeWidth="1" />
            </g>
          ) : state === "climb-up" ? (
            <g stroke="#00F0FF" strokeWidth="1.5" strokeLinecap="round">
              <line x1="16" y1="15" x2="19" y2="17" />
              <line x1="16" y1="18" x2="19" y2="16" />
              <line x1="28" y1="15" x2="25" y2="17" />
              <line x1="28" y1="18" x2="25" y2="16" />
            </g>
          ) : state === "celebrate" || state === "sit-swing" ? (
            <g stroke="#00F0FF" strokeWidth="1.6" strokeLinecap="round" fill="none">
              <path d="M16 17.5C16.5 15.5 19.5 15.5 20 17.5" />
              <path d="M24 17.5C24.5 15.5 27.5 15.5 28 17.5" />
            </g>
          ) : (
            <g fill="#00F0FF">
              <rect x="16" y="15" width="3" height="4" rx="1.5" />
              <rect x="25" y="15" width="3" height="4" rx="1.5" />
            </g>
          )}

          {/* Neck */}
          <rect x="19" y="25" width="6" height="2" fill="#A855F7" />

          {/* Robot Torso */}
          <rect
            x="12"
            y="27"
            width="20"
            height="13"
            rx="4"
            fill="#0D1527"
            stroke="#00F0FF"
            strokeWidth="1.4"
          />

          {/* Glowing AI Matrix Heart */}
          <circle cx="22" cy="33.5" r="3.2" fill="#00F0FF" opacity="0.95" />
          <circle cx="22" cy="33.5" r="5" fill="#00F0FF" opacity="0.25" />

          {/* Arms & Hands */}
          {state === "hang-swing" || state === "slip-fall" ? (
            <g stroke="#00F0FF" strokeWidth="2.4" strokeLinecap="round">
              <motion.line
                x1="12"
                y1="29"
                x2="10"
                y2="7"
                animate={{ y2: [6, 8, 6] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
              />
              <circle cx="10" cy="6" r="2.2" fill="#00F0FF" />

              <motion.line
                x1="32"
                y1="29"
                x2="34"
                y2="7"
                animate={{ y2: [8, 6, 8] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
              />
              <circle cx="34" cy="6" r="2.2" fill="#00F0FF" />
            </g>
          ) : state === "climb-up" ? (
            <g stroke="#00F0FF" strokeWidth="2.4" strokeLinecap="round">
              <line x1="12" y1="31" x2="8" y2="21" />
              <circle cx="8" cy="21" r="2.2" fill="#00F0FF" />
              <line x1="32" y1="31" x2="36" y2="21" />
              <circle cx="36" cy="21" r="2.2" fill="#00F0FF" />
            </g>
          ) : state === "celebrate" ? (
            <g stroke="#00F0FF" strokeWidth="2.4" strokeLinecap="round">
              <motion.line
                x1="12"
                y1="30"
                x2="6"
                y2="16"
                animate={{ rotate: [-10, 10, -10] }}
                transition={{ repeat: Infinity, duration: 0.4 }}
              />
              <circle cx="6" cy="16" r="2.2" fill="#00F0FF" />
              <motion.line
                x1="32"
                y1="30"
                x2="38"
                y2="16"
                animate={{ rotate: [10, -10, 10] }}
                transition={{ repeat: Infinity, duration: 0.4 }}
              />
              <circle cx="38" cy="16" r="2.2" fill="#00F0FF" />
            </g>
          ) : state === "walk-right" ? (
            <g stroke="#00F0FF" strokeWidth="2.2" strokeLinecap="round">
              <motion.line
                x1="12"
                y1="30"
                x2="8"
                y2="37"
                animate={{ x2: [6, 12, 6], y2: [37, 33, 37] }}
                transition={{ repeat: Infinity, duration: 0.6 }}
              />
              <motion.line
                x1="32"
                y1="30"
                x2="36"
                y2="37"
                animate={{ x2: [38, 32, 38], y2: [33, 37, 33] }}
                transition={{ repeat: Infinity, duration: 0.6 }}
              />
            </g>
          ) : (
            <g stroke="#00F0FF" strokeWidth="2" strokeLinecap="round">
              <line x1="12" y1="30" x2="9" y2="36" />
              <line x1="32" y1="30" x2="35" y2="36" />
            </g>
          )}

          {/* Legs & Feet */}
          {state === "sit-swing" ? (
            <g stroke="#00F0FF" strokeWidth="2.4" strokeLinecap="round">
              <motion.g
                animate={{ rotate: [-26, 30, -26] }}
                style={{ originX: "17px", originY: "40px" }}
                transition={{ repeat: Infinity, duration: 1.1, ease: "easeInOut" }}
              >
                <line x1="17" y1="40" x2="17" y2="47" />
                <circle cx="17" cy="48" r="2" fill="#00F0FF" />
              </motion.g>

              <motion.g
                animate={{ rotate: [30, -26, 30] }}
                style={{ originX: "27px", originY: "40px" }}
                transition={{ repeat: Infinity, duration: 1.1, ease: "easeInOut" }}
              >
                <line x1="27" y1="40" x2="27" y2="47" />
                <circle cx="27" cy="48" r="2" fill="#00F0FF" />
              </motion.g>
            </g>
          ) : state === "hang-swing" || state === "slip-fall" ? (
            <g stroke="#00F0FF" strokeWidth="2.4" strokeLinecap="round">
              <motion.line
                x1="17"
                y1="40"
                x2="15"
                y2="47"
                animate={{ x2: [13, 19, 13], y2: [47, 44, 47] }}
                transition={{ repeat: Infinity, duration: 0.5, ease: "easeInOut" }}
              />
              <circle cx="15" cy="47" r="1.8" fill="#00F0FF" />
              <motion.line
                x1="27"
                y1="40"
                x2="29"
                y2="47"
                animate={{ x2: [31, 25, 31], y2: [44, 47, 44] }}
                transition={{ repeat: Infinity, duration: 0.5, ease: "easeInOut" }}
              />
              <circle cx="29" cy="47" r="1.8" fill="#00F0FF" />
            </g>
          ) : state === "walk-right" ? (
            <g stroke="#00F0FF" strokeWidth="2.4" strokeLinecap="round">
              <motion.line
                x1="17"
                y1="40"
                x2="14"
                y2="46"
                animate={{ x2: [12, 20, 12], y2: [46, 42, 46] }}
                transition={{ repeat: Infinity, duration: 0.6 }}
              />
              <motion.line
                x1="27"
                y1="40"
                x2="30"
                y2="46"
                animate={{ x2: [32, 24, 32], y2: [42, 46, 42] }}
                transition={{ repeat: Infinity, duration: 0.6 }}
              />
            </g>
          ) : state === "jump" ? (
            <g stroke="#00F0FF" strokeWidth="2.4" strokeLinecap="round">
              <line x1="17" y1="40" x2="15" y2="44" />
              <line x1="27" y1="40" x2="29" y2="44" />
            </g>
          ) : (
            <g stroke="#00F0FF" strokeWidth="2.4" strokeLinecap="round">
              <line x1="17" y1="40" x2="17" y2="47" />
              <circle cx="17" cy="47" r="2" fill="#00F0FF" />
              <line x1="27" y1="40" x2="27" y2="47" />
              <circle cx="27" cy="47" r="2" fill="#00F0FF" />
            </g>
          )}
        </svg>
      </motion.div>
    </div>
  );
}

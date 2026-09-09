"use client";

import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  pulseSpeed: number;
  pulsePhase: number;
  glow: number; // 0 to 1
  isHub: boolean;
}

interface DataPacket {
  fromIndex: number;
  toIndex: number;
  progress: number;
  speed: number;
  color: string;
}

interface CursorSpark {
  nodeIndex: number;
  progress: number; // 0 to 1 (travels from node to cursor)
  speed: number;
  color: string;
}

export function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Mouse coordinates (null when not over window or idle)
    let mouse: { x: number; y: number } | null = null;
    let smoothMouse: { x: number; y: number } | null = null;
    let mouseActive = false;
    let idleTimer: NodeJS.Timeout | null = null;

    // Node & Packet state
    let nodes: Node[] = [];
    let packets: DataPacket[] = [];
    let cursorSparks: CursorSpark[] = [];

    const isMobile = width < 768;
    const maxDistance = isMobile ? 115 : 155;
    const cursorRadius = isMobile ? 140 : 195;
    const maxCursorConnections = isMobile ? 6 : 9;
    const maxPackets = isMobile ? 18 : 34;

    const setupCanvasSize = () => {
      if (!canvas) return;
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const initNodes = () => {
      nodes = [];
      packets = [];
      cursorSparks = [];
      const count = isMobile ? 38 : 72;

      for (let i = 0; i < count; i++) {
        const isHub = i % 8 === 0;
        const baseRadius = isHub ? 3.4 : 1.8 + Math.random() * 1.2;
        const x = Math.random() * width;
        const y = Math.random() * height;

        nodes.push({
          x,
          y,
          vx: (Math.random() - 0.5) * (isHub ? 0.28 : 0.42),
          vy: (Math.random() - 0.5) * (isHub ? 0.28 : 0.42),
          radius: baseRadius,
          baseRadius,
          pulseSpeed: 0.02 + Math.random() * 0.03,
          pulsePhase: Math.random() * Math.PI * 2,
          glow: 0,
          isHub,
        });
      }
    };

    setupCanvasSize();
    initNodes();

    const handleResize = () => {
      setupCanvasSize();
      initNodes();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse = { x: e.clientX, y: e.clientY };
      if (!smoothMouse) {
        smoothMouse = { x: e.clientX, y: e.clientY };
      }
      mouseActive = true;

      if (idleTimer) clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        mouseActive = false;
      }, 3500);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const t = e.touches[0];
        mouse = { x: t.clientX, y: t.clientY };
        if (!smoothMouse) {
          smoothMouse = { x: t.clientX, y: t.clientY };
        }
        mouseActive = true;
      }
    };

    const handleMouseLeave = () => {
      mouse = null;
      mouseActive = false;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleMouseLeave);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Helper: spawn data packet along synaptic connection
    const spawnPacket = (fromIdx: number, toIdx: number, isLight: boolean) => {
      if (packets.length >= maxPackets) return;
      const primary = isLight ? "#0284C7" : "#00F0FF";
      const secondary = isLight ? "#9333EA" : "#A855F7";
      const tertiary = isLight ? "#0F172A" : "#FFFFFF";

      packets.push({
        fromIndex: fromIdx,
        toIndex: toIdx,
        progress: 0,
        speed: 0.012 + Math.random() * 0.016,
        color: Math.random() > 0.4 ? primary : Math.random() > 0.5 ? secondary : tertiary,
      });
    };

    let lastPacketSpawn = 0;
    let lastSparkSpawn = 0;

    // Render loop
    const render = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      const isLight = document.documentElement.getAttribute("data-theme") === "light";
      const primaryHex = isLight ? "#0284C7" : "#00F0FF";
      const primaryRgb = isLight ? "2, 132, 199" : "0, 240, 255";
      const secondaryHex = isLight ? "#9333EA" : "#A855F7";
      const secondaryRgb = isLight ? "147, 51, 234" : "168, 85, 247";

      // Smooth cursor lerp interpolation
      if (mouse && smoothMouse) {
        smoothMouse.x += (mouse.x - smoothMouse.x) * 0.22;
        smoothMouse.y += (mouse.y - smoothMouse.y) * 0.22;
      }

      // ─── 1. Update node physics & soft elastic cursor pull ───
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        node.x += node.vx;
        node.y += node.vy;

        // Interactive elastic attraction towards cursor
        if (mouseActive && smoothMouse) {
          const dx = smoothMouse.x - node.x;
          const dy = smoothMouse.y - node.y;
          const dist = Math.hypot(dx, dy);

          if (dist > 0 && dist < cursorRadius) {
            const pullFactor = (1 - dist / cursorRadius) * 0.012;
            node.x += dx * pullFactor;
            node.y += dy * pullFactor;
          }
        }

        // Boundary wrapping for seamless density
        if (node.x < -20) node.x = width + 20;
        else if (node.x > width + 20) node.x = -20;

        if (node.y < -20) node.y = height + 20;
        else if (node.y > height + 20) node.y = -20;

        // Pulse radius animation
        node.pulsePhase += node.pulseSpeed;
        node.radius = node.baseRadius + Math.sin(node.pulsePhase) * 0.45;

        // Decay glow from delivered packets
        if (node.glow > 0) {
          node.glow = Math.max(0, node.glow - 0.025);
        }
      }

      // ─── 2. Inter-Node Synaptic Connections ───
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.hypot(dx, dy);

          if (dist < maxDistance) {
            const alphaBase = 1 - dist / maxDistance;
            const alpha = isLight ? alphaBase * 0.24 : alphaBase * 0.22;
            const strokeColor =
              nodes[i].isHub || nodes[j].isHub
                ? `rgba(${primaryRgb}, ${alpha * 1.3})`
                : `rgba(${primaryRgb}, ${alpha})`;

            ctx.strokeStyle = strokeColor;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // ─── 3. INTERACTIVE CURSOR CONNECTION (The User's Feature) ───
      // Finds nodes within cursorRadius and draws glowing synaptic beams directly to cursor
      if (mouseActive && smoothMouse) {
        const curX = smoothMouse.x;
        const curY = smoothMouse.y;

        // Collect all nodes in range and sort by proximity
        const connectedNodes: { index: number; dist: number }[] = [];
        for (let i = 0; i < nodes.length; i++) {
          const d = Math.hypot(nodes[i].x - curX, nodes[i].y - curY);
          if (d < cursorRadius) {
            connectedNodes.push({ index: i, dist: d });
          }
        }

        connectedNodes.sort((a, b) => a.dist - b.dist);
        const topConnections = connectedNodes.slice(0, maxCursorConnections);

        // Draw dynamic beams from nodes to cursor
        for (const conn of topConnections) {
          const node = nodes[conn.index];
          const ratio = 1 - conn.dist / cursorRadius;
          const beamAlpha = isLight ? 0.35 + ratio * 0.5 : 0.28 + ratio * 0.6;
          const beamWidth = 1.0 + ratio * 1.2;

          ctx.save();
          ctx.strokeStyle =
            conn.index % 2 === 0
              ? `rgba(${primaryRgb}, ${beamAlpha})`
              : `rgba(${secondaryRgb}, ${beamAlpha * 0.85})`;
          ctx.lineWidth = beamWidth;
          ctx.shadowColor = primaryHex;
          ctx.shadowBlur = ratio * 10;

          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(curX, curY);
          ctx.stroke();
          ctx.restore();

          // Spawn occasional data spark to cursor along beam
          if (time - lastSparkSpawn > 220 && Math.random() < 0.35 && cursorSparks.length < 8) {
            lastSparkSpawn = time;
            cursorSparks.push({
              nodeIndex: conn.index,
              progress: 0,
              speed: 0.035 + Math.random() * 0.03,
              color: Math.random() > 0.4 ? primaryHex : secondaryHex,
            });
          }
        }

        // Draw Interactive Cursor Focus Node & Ambient Ring
        ctx.save();
        const cursorPulse = Math.sin(time * 0.005) * 2;

        // Outer glowing ripple ring around cursor
        ctx.strokeStyle = `rgba(${primaryRgb}, ${isLight ? 0.35 : 0.45})`;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(curX, curY, 14 + cursorPulse, 0, Math.PI * 2);
        ctx.stroke();

        // Inner glowing core
        ctx.fillStyle = isLight ? primaryHex : "#FFFFFF";
        ctx.shadowColor = primaryHex;
        ctx.shadowBlur = 14;
        ctx.beginPath();
        ctx.arc(curX, curY, 3.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // ─── 4. Update and Draw Cursor Sparks (flowing towards cursor) ───
      if (mouseActive && smoothMouse) {
        for (let s = cursorSparks.length - 1; s >= 0; s--) {
          const spark = cursorSparks[s];
          const fromNode = nodes[spark.nodeIndex];
          if (!fromNode) {
            cursorSparks.splice(s, 1);
            continue;
          }

          spark.progress += spark.speed;
          if (spark.progress >= 1) {
            cursorSparks.splice(s, 1);
            continue;
          }

          const sx = fromNode.x + (smoothMouse.x - fromNode.x) * spark.progress;
          const sy = fromNode.y + (smoothMouse.y - fromNode.y) * spark.progress;

          ctx.save();
          ctx.fillStyle = spark.color;
          ctx.shadowColor = spark.color;
          ctx.shadowBlur = 8;
          ctx.beginPath();
          ctx.arc(sx, sy, 2.2, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      // ─── 5. Spawn & Update Inter-Node Traveling Data Packets ───
      if (time - lastPacketSpawn > 180 && nodes.length > 1) {
        lastPacketSpawn = time;
        const from = Math.floor(Math.random() * nodes.length);
        for (let to = 0; to < nodes.length; to++) {
          if (from !== to) {
            const dist = Math.hypot(nodes[from].x - nodes[to].x, nodes[from].y - nodes[to].y);
            if (dist < maxDistance) {
              spawnPacket(from, to, isLight);
              break;
            }
          }
        }
      }

      for (let p = packets.length - 1; p >= 0; p--) {
        const pkt = packets[p];
        const from = nodes[pkt.fromIndex];
        const to = nodes[pkt.toIndex];

        if (!from || !to) {
          packets.splice(p, 1);
          continue;
        }

        pkt.progress += pkt.speed;

        if (pkt.progress >= 1) {
          to.glow = 1.0;
          packets.splice(p, 1);
          continue;
        }

        const px = from.x + (to.x - from.x) * pkt.progress;
        const py = from.y + (to.y - from.y) * pkt.progress;

        ctx.save();
        ctx.fillStyle = pkt.color;
        ctx.shadowColor = pkt.color === secondaryHex ? secondaryHex : primaryHex;
        ctx.shadowBlur = 9;
        ctx.beginPath();
        ctx.arc(px, py, 2.2, 0, Math.PI * 2);
        ctx.fill();

        // Trail behind packet
        const trailProg = Math.max(0, pkt.progress - 0.09);
        const tx = from.x + (to.x - from.x) * trailProg;
        const ty = from.y + (to.y - from.y) * trailProg;
        ctx.strokeStyle = pkt.color === secondaryHex ? `rgba(${secondaryRgb}, 0.5)` : `rgba(${primaryRgb}, 0.5)`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(px, py);
        ctx.stroke();
        ctx.restore();
      }

      // ─── 6. Draw Nodes ───
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        ctx.save();

        if (node.isHub) {
          // Double concentric orbital ring for primary Hub nodes
          ctx.strokeStyle = `rgba(${primaryRgb}, ${0.28 + node.glow * 0.45})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius * 2.3, 0, Math.PI * 2);
          ctx.stroke();
        }

        ctx.fillStyle =
          node.glow > 0
            ? isLight
              ? "#0F172A"
              : "#FFFFFF"
            : node.isHub
            ? primaryHex
            : `rgba(${primaryRgb}, 0.85)`;
        ctx.shadowColor = primaryHex;
        ctx.shadowBlur = node.glow > 0 ? 14 : 7;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius + node.glow * 1.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      if (idleTimer) clearTimeout(idleTimer);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseLeave);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
    >
      {/* Theme-adaptive ambient radial gradients */}
      <div className="neural-bg-ambient absolute inset-0 pointer-events-none" />

      {/* Theme-adaptive subtle geometric micro-dot grid texture */}
      <div className="neural-dot-texture absolute inset-0 pointer-events-none" />

      <canvas ref={canvasRef} className="w-full h-full block relative z-10 opacity-90" />
    </div>
  );
}

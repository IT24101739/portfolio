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
  glow: number; // 0 to 1, increases when data packet arrives
  isHub?: boolean;
}

interface DataPacket {
  fromIndex: number;
  toIndex: number;
  progress: number; // 0 to 1
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
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates (null when not over window)
    let mouse: { x: number; y: number } | null = null;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initNodes();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse = { x: e.clientX, y: e.clientY };
    };

    const handleMouseLeave = () => {
      mouse = null;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Network setup
    let nodes: Node[] = [];
    let packets: DataPacket[] = [];
    const isMobile = width < 768;
    const nodeCount = isMobile ? 32 : 58;
    const maxDistance = isMobile ? 130 : 175;
    const maxPackets = isMobile ? 18 : 34;

    const initNodes = () => {
      nodes = [];
      packets = [];
      const count = isMobile ? 32 : 58;

      for (let i = 0; i < count; i++) {
        const isHub = i % 8 === 0;
        const baseRadius = isHub ? 3.5 : 1.8 + Math.random() * 1.2;
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * (isHub ? 0.35 : 0.55),
          vy: (Math.random() - 0.5) * (isHub ? 0.35 : 0.55),
          radius: baseRadius,
          baseRadius,
          pulseSpeed: 0.02 + Math.random() * 0.03,
          pulsePhase: Math.random() * Math.PI * 2,
          glow: 0,
          isHub,
        });
      }
    };

    initNodes();

    // Helper: spawn a data packet between two connected nodes
    const spawnPacket = (fromIdx: number, toIdx: number) => {
      if (packets.length >= maxPackets) return;
      packets.push({
        fromIndex: fromIdx,
        toIndex: toIdx,
        progress: 0,
        speed: 0.012 + Math.random() * 0.018,
        color: Math.random() > 0.3 ? "#39ff14" : "#ffffff",
      });
    };

    let lastPacketSpawn = 0;

    // Render loop
    const render = (time: number) => {
      // Clear canvas with transparent clear
      ctx.clearRect(0, 0, width, height);

      // 1. Update node positions
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        node.x += node.vx;
        node.y += node.vy;

        // Bounce gently off boundaries
        if (node.x < 0) {
          node.x = 0;
          node.vx *= -1;
        } else if (node.x > width) {
          node.x = width;
          node.vx *= -1;
        }

        if (node.y < 0) {
          node.y = 0;
          node.vy *= -1;
        } else if (node.y > height) {
          node.y = height;
          node.vy *= -1;
        }

        // Pulse animation
        node.pulsePhase += node.pulseSpeed;
        node.radius = node.baseRadius + Math.sin(node.pulsePhase) * 0.5;

        // Fade node glow from recent packet delivery
        if (node.glow > 0) {
          node.glow = Math.max(0, node.glow - 0.03);
        }
      }

      // 2. Spawn data packets periodically along valid connections
      if (time - lastPacketSpawn > 160 && nodes.length > 1) {
        lastPacketSpawn = time;
        const from = Math.floor(Math.random() * nodes.length);
        // Find a nearby node
        for (let to = 0; to < nodes.length; to++) {
          if (from !== to) {
            const dist = Math.hypot(nodes[from].x - nodes[to].x, nodes[from].y - nodes[to].y);
            if (dist < maxDistance) {
              spawnPacket(from, to);
              break;
            }
          }
        }
      }

      // 3. Draw Synaptic Connections
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.hypot(dx, dy);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * 0.22;
            ctx.strokeStyle = `rgba(57, 255, 20, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }

        // Mouse proximity connection
        if (mouse) {
          const dMouse = Math.hypot(nodes[i].x - mouse.x, nodes[i].y - mouse.y);
          if (dMouse < maxDistance * 1.15) {
            const alpha = (1 - dMouse / (maxDistance * 1.15)) * 0.35;
            ctx.strokeStyle = `rgba(57, 255, 20, ${alpha})`;
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }

      // 4. Update and draw Traveling Data Packets (Simulating Data Transfer)
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
          // Packet arrived at destination node: ignite node glow
          to.glow = 1.0;
          // 40% chance to relay data packet to another connected node
          if (Math.random() < 0.45 && packets.length < maxPackets) {
            for (let next = 0; next < nodes.length; next++) {
              if (next !== pkt.toIndex && next !== pkt.fromIndex) {
                const d = Math.hypot(to.x - nodes[next].x, to.y - nodes[next].y);
                if (d < maxDistance) {
                  spawnPacket(pkt.toIndex, next);
                  break;
                }
              }
            }
          }
          packets.splice(p, 1);
          continue;
        }

        // Compute current packet position
        const px = from.x + (to.x - from.x) * pkt.progress;
        const py = from.y + (to.y - from.y) * pkt.progress;

        // Draw packet head with glow
        ctx.save();
        ctx.fillStyle = pkt.color;
        ctx.shadowColor = "#39ff14";
        ctx.shadowBlur = 9;
        ctx.beginPath();
        ctx.arc(px, py, 2.2, 0, Math.PI * 2);
        ctx.fill();

        // Draw brief packet trail
        const trailProgress = Math.max(0, pkt.progress - 0.08);
        const tx = from.x + (to.x - from.x) * trailProgress;
        const ty = from.y + (to.y - from.y) * trailProgress;
        ctx.strokeStyle = "rgba(57, 255, 20, 0.4)";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(px, py);
        ctx.stroke();
        ctx.restore();
      }

      // 5. Draw Nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        ctx.save();

        if (node.isHub) {
          // Hub node has an outer orbit ring
          ctx.strokeStyle = `rgba(57, 255, 20, ${0.25 + node.glow * 0.5})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius * 2.2, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Main node circle
        ctx.fillStyle = node.glow > 0 ? "#ffffff" : "rgba(57, 255, 20, 0.85)";
        ctx.shadowColor = "#39ff14";
        ctx.shadowBlur = node.glow > 0 ? 14 : 6;
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
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
    >
      {/* Subtle deep charcoal & green ambient radial gradients for depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 18% 15%, rgba(30, 36, 46, 0.40) 0%, transparent 65%), radial-gradient(ellipse 70% 50% at 82% 80%, rgba(20, 26, 34, 0.40) 0%, transparent 60%), radial-gradient(circle at 50% 50%, rgba(57, 255, 20, 0.015) 0%, transparent 75%)",
        }}
      />

      {/* Subtle geometric micro-dot grid texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <canvas ref={canvasRef} className="w-full h-full block relative z-10 opacity-75" />
    </div>
  );
}

"use client";

import React, { useRef, useEffect, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  size: number;
  opacity: number;
}

interface Connection {
  a: number;
  b: number;
}

interface DataPacket {
  a: number;
  b: number;
  progress: number;
  speed: number;
}

export default function ThreeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animFrameRef = useRef<number>(0);

  const initParticles = useCallback((count: number, width: number, height: number): Particle[] => {
    const particles: Particle[] = [];
    const depth = 600;
    for (let i = 0; i < count; i++) {
      particles.push({
        x: (Math.random() - 0.5) * width * 1.5,
        y: (Math.random() - 0.5) * height * 1.5,
        z: (Math.random() - 0.5) * depth,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        vz: (Math.random() - 0.5) * 0.2,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }
    return particles;
  }, []);

  const buildConnections = useCallback((particles: Particle[], maxDist: number): Connection[] => {
    const connections: Connection[] = [];
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dz = particles[i].z - particles[j].z;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < maxDist && Math.random() < 0.15) {
          connections.push({ a: i, b: j });
        }
      }
    }
    return connections;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const isMobile = width < 768;
    const particleCount = isMobile ? 50 : 100;
    const maxConnectionDist = isMobile ? 120 : 180;
    const packetCount = isMobile ? 3 : 6;

    let particles = initParticles(particleCount, width, height);
    let connections = buildConnections(particles, maxConnectionDist);
    let packets: DataPacket[] = [];

    // Initialize data packets
    for (let i = 0; i < packetCount; i++) {
      if (connections.length > 0) {
        const conn = connections[Math.floor(Math.random() * connections.length)];
        packets.push({
          a: conn.a,
          b: conn.b,
          progress: Math.random(),
          speed: 0.005 + Math.random() * 0.01,
        });
      }
    }

    const isDark = () => document.documentElement.classList.contains("dark");

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas!.width = width;
      canvas!.height = height;
      const newIsMobile = width < 768;
      const newCount = newIsMobile ? 50 : 100;
      if (newCount !== particles.length) {
        particles = initParticles(newCount, width, height);
        connections = buildConnections(particles, newIsMobile ? 120 : 180);
      }
    };

    window.addEventListener("resize", resize, { passive: true });

    const mouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX - width / 2;
      mouseRef.current.y = e.clientY - height / 2;
    };

    window.addEventListener("mousemove", mouseMove, { passive: true });

    const animate = () => {
      const dark = isDark();
      const primaryColor = dark ? "99, 102, 241" : "99, 102, 241";
      const lineColor = dark ? "255, 255, 255" : "0, 0, 0";
      const bgColor = dark ? "3, 3, 10" : "255, 255, 255";

      ctx!.clearRect(0, 0, width, height);

      // Update particles
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const repelRadius = 80;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;

        // Boundary wrapping
        if (p.x > width * 1.2) p.x = -width * 1.2;
        if (p.x < -width * 1.2) p.x = width * 1.2;
        if (p.y > height * 1.2) p.y = -height * 1.2;
        if (p.y < -height * 1.2) p.y = height * 1.2;
        if (p.z > 300) p.z = -300;
        if (p.z < -300) p.z = 300;

        // Mouse repulsion
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < repelRadius && dist > 0) {
          const force = (repelRadius - dist) / repelRadius;
          p.vx += (dx / dist) * force * 0.08;
          p.vy += (dy / dist) * force * 0.08;
        }

        // Damping
        p.vx *= 0.99;
        p.vy *= 0.99;
        p.vz *= 0.99;
      }

      // Update connections every few frames
      if (Math.random() < 0.02) {
        connections = buildConnections(particles, maxConnectionDist);
      }

      // Draw connections
      const lineOpacity = dark ? 0.06 : 0.04;
      for (let i = 0; i < connections.length; i++) {
        const conn = connections[i];
        const a = particles[conn.a];
        const b = particles[conn.b];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dz = (a.z - b.z) * 0.3;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        const alpha = Math.max(0, 1 - dist / maxConnectionDist) * lineOpacity;

        ctx!.beginPath();
        ctx!.moveTo(a.x + width / 2, a.y + height / 2);
        ctx!.lineTo(b.x + width / 2, b.y + height / 2);
        ctx!.strokeStyle = `rgba(${lineColor}, ${alpha})`;
        ctx!.lineWidth = 0.5;
        ctx!.stroke();
      }

      // Update and draw data packets
      for (let i = packets.length - 1; i >= 0; i--) {
        const pkt = packets[i];
        pkt.progress += pkt.speed;

        if (pkt.progress >= 1) {
          // Find a new connection
          if (connections.length > 0) {
            const conn = connections[Math.floor(Math.random() * connections.length)];
            packets[i] = {
              a: conn.a,
              b: conn.b,
              progress: 0,
              speed: 0.005 + Math.random() * 0.01,
            };
          }
          continue;
        }

        const a = particles[pkt.a];
        const b = particles[pkt.b];
        if (!a || !b) continue;

        const x = a.x + (b.x - a.x) * pkt.progress + width / 2;
        const y = a.y + (b.y - a.y) * pkt.progress + height / 2;

        const packetGlow = ctx!.createRadialGradient(x, y, 0, x, y, 4);
        packetGlow.addColorStop(0, `rgba(${primaryColor}, 0.6)`);
        packetGlow.addColorStop(0.5, `rgba(${primaryColor}, 0.2)`);
        packetGlow.addColorStop(1, `rgba(${primaryColor}, 0)`);

        ctx!.beginPath();
        ctx!.arc(x, y, 4, 0, Math.PI * 2);
        ctx!.fillStyle = packetGlow;
        ctx!.fill();
      }

      // Draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const x = p.x + width / 2;
        const y = p.y + height / 2;
        const scale = 1 + p.z / 600;

        ctx!.beginPath();
        ctx!.arc(x, y, p.size * scale, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${primaryColor}, ${p.opacity * (dark ? 0.6 : 0.4)})`;
        ctx!.fill();
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", mouseMove);
    };
  }, [initParticles, buildConnections]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.8 }}
      aria-hidden="true"
    />
  );
}

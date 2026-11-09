"use client";

import { useEffect, useRef } from "react";

type Node3 = { ring: number; angle: number; speed: number; size: number };

const CHAMPAGNE = "161,140,112";
const SLATE = "38,61,74";

export function HeroCanvas({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let w = 0;
    let h = 0;
    let mx = 0;
    let my = 0;

    const rings = [0.32, 0.52, 0.74]; // radii as fraction of min dimension
    const nodes: Node3[] = [];
    const counts = [5, 8, 11];
    counts.forEach((count, ring) => {
      for (let i = 0; i < count; i++) {
        nodes.push({
          ring,
          angle: (i / count) * Math.PI * 2 + ring * 0.6,
          speed: (ring % 2 === 0 ? 1 : -1) * (0.00016 + ring * 0.00005),
          size: 2 + Math.random() * 1.5,
        });
      }
    });

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas!.clientWidth;
      h = canvas!.clientHeight;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function draw(t: number) {
      ctx!.clearRect(0, 0, w, h);
      const cx = w / 2 + mx * 14;
      const cy = h / 2 + my * 10;
      const base = Math.min(w, h);

      // rings
      rings.forEach((r, i) => {
        ctx!.beginPath();
        ctx!.ellipse(cx, cy, (base * r) / 2, (base * r) / 2.6, -0.22, 0, Math.PI * 2);
        ctx!.strokeStyle = `rgba(${CHAMPAGNE},${0.16 - i * 0.03})`;
        ctx!.lineWidth = 1;
        ctx!.stroke();
      });

      // arc segments
      rings.forEach((r, i) => {
        const start = t * 0.00008 * (i % 2 === 0 ? 1 : -1) + i * 2;
        ctx!.beginPath();
        ctx!.ellipse(cx, cy, (base * r) / 2, (base * r) / 2.6, -0.22, start, start + 1.1);
        ctx!.strokeStyle = `rgba(${CHAMPAGNE},0.45)`;
        ctx!.lineWidth = 1.4;
        ctx!.stroke();
      });

      // node positions on tilted ellipses
      const pts = nodes.map((n) => {
        n.angle += n.speed * (reduced ? 0 : 16);
        const r = (base * rings[n.ring]) / 2;
        const x = Math.cos(n.angle) * r;
        const y = Math.sin(n.angle) * (r / 1.3);
        const rot = -0.22;
        return {
          x: cx + x * Math.cos(rot) - y * Math.sin(rot),
          y: cy + x * Math.sin(rot) + y * Math.cos(rot),
          n,
        };
      });

      // connect nearby nodes
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const d = Math.hypot(dx, dy);
          const max = base * 0.16;
          if (d < max) {
            ctx!.beginPath();
            ctx!.moveTo(pts[i].x, pts[i].y);
            ctx!.lineTo(pts[j].x, pts[j].y);
            ctx!.strokeStyle = `rgba(${SLATE},${(1 - d / max) * 0.14})`;
            ctx!.lineWidth = 0.7;
            ctx!.stroke();
          }
        }
      }

      // nodes
      pts.forEach(({ x, y, n }) => {
        ctx!.beginPath();
        ctx!.arc(x, y, n.size, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${CHAMPAGNE},0.8)`;
        ctx!.fill();
        ctx!.beginPath();
        ctx!.arc(x, y, n.size + 4, 0, Math.PI * 2);
        ctx!.strokeStyle = `rgba(${CHAMPAGNE},0.25)`;
        ctx!.lineWidth = 0.6;
        ctx!.stroke();
      });

      // center core
      ctx!.beginPath();
      ctx!.arc(cx, cy, 3.5, 0, Math.PI * 2);
      ctx!.fillStyle = `rgba(${SLATE},0.85)`;
      ctx!.fill();

      if (!reduced) raf = requestAnimationFrame(draw);
    }

    function onMouse(e: MouseEvent) {
      mx = (e.clientX / window.innerWidth - 0.5) * 2;
      my = (e.clientY / window.innerHeight - 0.5) * 2;
    }

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouse);
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}

"use client";
import React, { useEffect, useRef } from "react";

export function HeaderAccent({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let raf = 0;
    let targetX = 0,
      targetY = 0,
      currentX = 0,
      currentY = 0;

    const step = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      el.style.setProperty("--hx", currentX.toFixed(3));
      el.style.setProperty("--hy", currentY.toFixed(3));
      if (Math.abs(targetX - currentX) > 0.003 || Math.abs(targetY - currentY) > 0.003) {
        raf = requestAnimationFrame(step);
      } else {
        raf = 0;
      }
    };

    const onPointer = (e: PointerEvent) => {
      const w = window.innerWidth || 1;
      const h = window.innerHeight || 1;
      targetX = (e.clientX / w - 0.5) * 1.4;
      targetY = (e.clientY / h - 0.5) * 1.0;
      if (!raf) raf = requestAnimationFrame(step);
    };

    const onScroll = () => {
      targetY = Math.max(-0.6, Math.min(0.6, window.scrollY / 1200));
      if (!raf) raf = requestAnimationFrame(step);
    };

    const opts = { passive: true } as const;
    window.addEventListener("pointermove", onPointer, opts);
    window.addEventListener("scroll", onScroll, opts);
    raf = requestAnimationFrame(step);
    return () => {
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={ref} aria-hidden className={`be-header-accent ${className ?? ""}`} />;
}


"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { withMotion } from "@/lib/motion";
import { HOURS } from "@/lib/data";
import { statusFor, type Status } from "@/lib/hours";

/* ---------- Live status (Europe/London) ----------
   Only Eros Wigan has hours of its own (Google); the other cafés get neutral wording. */
const CHECKING: Status = { open: false, label: "Checking today’s hours" };

export function useStatus(cafe: string): Status {
  const [s, setS] = useState<Status>(cafe === "wigan" ? CHECKING : { open: false, label: HOURS.neutral });
  useEffect(() => {
    const tick = () => setS(statusFor(cafe));
    tick();
    const t = window.setInterval(tick, 60_000);
    return () => window.clearInterval(t);
  }, [cafe]);
  return s;
}

export function OpenBadge({ cafe, className = "", tone = "gold" }: { cafe: string; className?: string; tone?: "gold" | "ink" }) {
  const s = useStatus(cafe);
  const c = tone === "gold" ? "bg-gold" : "bg-ink";
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span className="relative grid h-2.5 w-2.5 place-items-center" aria-hidden>
        {s.open && <span className={`ping absolute h-2 w-2 rotate-45 ${c} opacity-70`} />}
        <span className={`relative h-2 w-2 rotate-45 ${c}`} />
      </span>
      <span>{s.label}</span>
    </span>
  );
}

/* ---------- Magnetic wrapper for primary calls to action ---------- */
export function Magnetic({ children, strength = 0.28, className = "" }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!matchMedia("(pointer: fine)").matches || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    return withMotion(({ gsap }) => {
      const xTo = gsap.quickTo(el, "x", { duration: 0.7, ease: "power3.out" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.7, ease: "power3.out" });
      const move = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        xTo((e.clientX - (r.left + r.width / 2)) * strength);
        yTo((e.clientY - (r.top + r.height / 2)) * strength);
      };
      const leave = () => {
        xTo(0);
        yTo(0);
      };
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", leave);
      return () => {
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerleave", leave);
      };
    });
  }, [strength]);
  return (
    <span ref={ref} className={`inline-flex will-change-transform ${className}`}>
      {children}
    </span>
  );
}

/* ---------- Icons ---------- */
export function PhoneIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
      <path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 6 6L15 14l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" strokeLinejoin="round" />
    </svg>
  );
}
export function Chevron({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
export function Arrow({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M5 12h14m-6-6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
export function Stars({ className = "" }: { className?: string }) {
  return (
    <span className={`tracking-[0.12em] text-gold ${className}`} aria-hidden>
      ★★★★★
    </span>
  );
}

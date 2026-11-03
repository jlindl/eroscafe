"use client";

import { useEffect } from "react";
import type Lenis from "lenis";
import { loadMotion, reducedMotion } from "@/lib/motion";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

function navOffset() {
  const v = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--nav-h"), 10);
  return -(Number.isFinite(v) ? v : 64);
}

/** Scroll to a section, smoothly when Lenis is running. */
export function goTo(hash: string) {
  const el = hash === "#top" ? document.body : document.querySelector(hash);
  if (!el) return;
  if (window.__lenis) window.__lenis.scrollTo(el as HTMLElement, { offset: hash === "#top" ? 0 : navOffset(), duration: 1.4 });
  else (el as HTMLElement).scrollIntoView({ behavior: "smooth" });
}

export function SmoothScroll() {
  useEffect(() => {
    if (reducedMotion()) return;
    let cancelled = false;
    let teardown = () => {};
    Promise.all([import("lenis"), loadMotion()]).then(([{ default: LenisCtor }, { gsap, ScrollTrigger }]) => {
      if (cancelled) return;
      const lenis = new LenisCtor({ lerp: 0.1, wheelMultiplier: 1, syncTouch: false });
      window.__lenis = lenis;
      lenis.on("scroll", ScrollTrigger.update);
      const raf = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);

      const onClick = (e: MouseEvent) => {
        const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
        if (!a) return;
        const id = a.getAttribute("href")!;
        if (id.length < 2) return;
        const el = id === "#top" ? document.body : document.querySelector(id);
        if (!el) return;
        e.preventDefault();
        lenis.scrollTo(el as HTMLElement, { offset: id === "#top" ? 0 : navOffset(), duration: 1.4, easing: (t) => 1 - Math.pow(1 - t, 4) });
      };
      document.addEventListener("click", onClick);
      teardown = () => {
        document.removeEventListener("click", onClick);
        gsap.ticker.remove(raf);
        lenis.destroy();
        delete window.__lenis;
      };
    });
    return () => {
      cancelled = true;
      teardown();
    };
  }, []);
  return null;
}

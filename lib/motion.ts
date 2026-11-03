// GSAP and ScrollTrigger load after first paint, so the hero photo and headline never wait for them.
import type { gsap as GsapT } from "gsap";
import type { ScrollTrigger as STT } from "gsap/ScrollTrigger";

export type Motion = { gsap: typeof GsapT; ScrollTrigger: typeof STT };

let pending: Promise<Motion> | null = null;

// Wait until the first screen has painted and the browser is idle: ScrollTrigger measures every
// trigger when it starts, and that layout work should not hold up the hero.
function afterFirstPaint() {
  return new Promise<void>((resolve) => {
    const idle = () =>
      typeof window.requestIdleCallback === "function" ? window.requestIdleCallback(() => resolve(), { timeout: 2000 }) : window.setTimeout(resolve, 600);
    if (document.readyState === "complete") idle();
    else window.addEventListener("load", () => idle(), { once: true });
  });
}

export function loadMotion(): Promise<Motion> {
  if (!pending) {
    pending = afterFirstPaint()
      .then(() => Promise.all([import("gsap"), import("gsap/ScrollTrigger")]))
      .then(([g, s]) => {
        g.gsap.registerPlugin(s.ScrollTrigger);
        return { gsap: g.gsap, ScrollTrigger: s.ScrollTrigger };
      });
  }
  return pending;
}

export const reducedMotion = () => typeof window !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Run a GSAP setup once the library has loaded; returns a cleanup for useEffect. */
export function withMotion(setup: (m: Motion) => (() => void) | void) {
  let cancelled = false;
  let cleanup: (() => void) | void;
  loadMotion().then((m) => {
    if (!cancelled) cleanup = setup(m);
  });
  return () => {
    cancelled = true;
    if (cleanup) cleanup();
  };
}

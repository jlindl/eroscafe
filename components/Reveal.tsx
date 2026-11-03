"use client";

import { createElement, useEffect, useRef, type CSSProperties, type ReactNode } from "react";

type Kind = "fade" | "slide-right" | "slide-left" | "wipe-left" | "wipe-up" | "scale";

function useShowOnView<T extends HTMLElement>(amount: number) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.setAttribute("data-shown", "");
          io.disconnect();
        }
      },
      { threshold: amount, rootMargin: "0px 0px -4% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [amount]);
  return ref;
}

export function Reveal({
  as = "div",
  kind = "fade",
  delay = 0,
  amount = 0.18,
  className,
  style,
  children,
  ...rest
}: {
  as?: string;
  kind?: Kind;
  delay?: number;
  amount?: number;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  [k: string]: unknown;
}) {
  const ref = useShowOnView<HTMLElement>(amount);
  return createElement(
    as,
    { ref, "data-reveal": kind, className, style: { "--delay": `${delay}s`, ...style } as CSSProperties, ...rest },
    children
  );
}

/** A headline whose lines rise out of a mask when it scrolls into view. */
export function MaskLines({
  as = "h2",
  lines,
  className,
  base = 0,
  id,
}: {
  as?: string;
  lines: ReactNode[];
  className?: string;
  base?: number;
  id?: string;
}) {
  const ref = useShowOnView<HTMLElement>(0.35);
  return createElement(
    as,
    { ref, id, className, "data-masklines": "", style: { "--base": `${base}s` } as CSSProperties },
    lines.map((l, i) => (
      <span key={i} className="mask-line">
        <span style={{ "--i": i } as CSSProperties}>{l}</span>
      </span>
    ))
  );
}

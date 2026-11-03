"use client";

import Image from "next/image";
import { useEffect, useRef, type CSSProperties } from "react";
import { RATING } from "@/lib/data";
import { useVisit } from "./visit";
import { Magnetic, OpenBadge, PhoneIcon } from "./ui";
import { reducedMotion, withMotion } from "@/lib/motion";

// "Served with soul" is the heading of the Eros About page.
const LINES = [
  <>Hot cookie dough,</>,
  <>crêpes and gelato,</>,
  <span key="g" className="gold-sheen text-gold">
    served with soul.
  </span>,
];

function whenSettled(fn: () => void) {
  let idle = 0;
  let t = 0;
  const go = () => {
    if (typeof window.requestIdleCallback === "function") idle = window.requestIdleCallback(fn, { timeout: 2500 });
    else t = window.setTimeout(fn, 1200);
  };
  if (document.readyState === "complete") go();
  else window.addEventListener("load", go, { once: true });
  return () => {
    window.removeEventListener("load", go);
    if (idle) window.cancelIdleCallback(idle);
    if (t) window.clearTimeout(t);
  };
}

export function Hero() {
  const { open, cafe, branch } = useVisit();
  const root = useRef<HTMLElement>(null);
  const media = useRef<HTMLDivElement>(null);
  const copy = useRef<HTMLDivElement>(null);
  const steam = useRef<HTMLVideoElement>(null);

  // The steam is decoration: only load it once the page has settled, and never on data-saver.
  useEffect(() => {
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    if (conn?.saveData || /2g|3g/.test(conn?.effectiveType ?? "")) return;
    if (reducedMotion()) return;
    return whenSettled(() => {
      const v = steam.current;
      if (!v) return;
      v.src = "/video/steam.mp4";
      v.playbackRate = 0.8;
      v.play().catch(() => {});
    });
  }, []);

  useEffect(() => {
    if (reducedMotion()) return;
    return withMotion(({ gsap }) => {
      const ctx = gsap.context(() => {
        const st = { trigger: root.current, start: "top top", end: "bottom top", scrub: true };
        gsap.to(media.current, { yPercent: 22, scale: 1.12, ease: "none", scrollTrigger: st });
        gsap.to(copy.current, { yPercent: -28, ease: "none", scrollTrigger: st });
        gsap.to(copy.current, { opacity: 0, ease: "none", scrollTrigger: { ...st, end: "70% top" } });
      }, root);
      return () => ctx.revert();
    });
  }, []);

  return (
    <section ref={root} id="top" aria-labelledby="hero-heading" className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-ink">
      <div ref={media} className="absolute inset-x-0 top-0 h-[50svh] will-change-transform md:inset-0 md:h-auto">
        <div className="hero-zoom absolute inset-0 [container-type:size]">
          <div className="frame169 [--fx:0.74] md:[--fx:0.45]">
            <Image
              src="/img/hero-cup.webp"
              alt="A cappuccino with heart latte art in a white Eros cup with a gold rim and the Eros crest, on black and gold marble"
              fill
              priority
              fetchPriority="high"
              quality={72}
              sizes="(min-width: 768px) 112vw, 120vw"
              className="object-cover"
            />
            <video
              ref={steam}
              aria-hidden
              muted
              loop
              playsInline
              preload="none"
              onPlaying={(e) => e.currentTarget.classList.add("opacity-100")}
              className="steam opacity-0 transition-opacity duration-[1600ms]"
            />
          </div>
        </div>
        <div aria-hidden className="absolute inset-0 hidden bg-[linear-gradient(90deg,rgba(11,9,8,0.92)_0%,rgba(11,9,8,0.62)_34%,rgba(11,9,8,0)_60%)] md:block" />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-[45%] bg-[linear-gradient(to_top,var(--color-ink)_6%,rgba(11,9,8,0.6)_50%,transparent)] md:h-[55%]" />
        <div aria-hidden className="absolute inset-x-0 top-0 h-36 bg-[linear-gradient(to_bottom,rgba(11,9,8,0.7),transparent)]" />
      </div>

      {/* The cover holds the crest for a beat, then lifts */}
      <div aria-hidden className="hero-plane pointer-events-none absolute inset-0 z-40 grid place-items-center bg-cocoa">
        <Image src="/img/logo.png" alt="" width={277} height={70} loading="eager" className="hero-crest h-[42px] w-auto md:h-[52px]" />
      </div>

      <div
        ref={copy}
        className="relative z-20 mx-auto w-full max-w-[1600px] px-4 pb-[calc(var(--bar-h)+1.75rem)] pt-[40svh] sm:px-6 md:pb-24 md:pt-[calc(var(--nav-h)+2rem)] lg:px-10 lg:pb-28"
      >
        <p className="hero-fade eyebrow hidden text-cream/80 md:inline-flex" style={{ "--d": "0.4s" } as CSSProperties}>
          <span className="lozenge" aria-hidden />
          Dessert café and coffee house in Manchester, Wigan, Urmston and St Helens
        </p>
        <h1 id="hero-heading" className="font-display t-hero font-semibold text-cream md:mt-5">
          {LINES.map((l, i) => (
            <span key={i} className="mask-line">
              <span className="hero-line" style={{ "--i": i } as CSSProperties}>
                {l}
              </span>
            </span>
          ))}
        </h1>
        <p className="hero-fade mt-3 flex items-center gap-2 text-[0.9rem] font-semibold text-cream/85 md:hidden" style={{ "--d": "0.55s" } as CSSProperties}>
          <span className="lozenge !h-2 !w-2" aria-hidden />
          Manchester · Wigan · Urmston · St Helens
        </p>

        <div className="hero-fade mt-5 flex flex-col gap-6 md:mt-8 md:gap-7" style={{ "--d": "0.72s" } as CSSProperties}>
          <p className="t-lead max-w-[38ch] text-cream/85 text-pretty md:order-2 md:max-w-[52ch] md:!text-[1.12rem]">
            Desserts prepared fresh every day, and coffee in the gold-rimmed Eros cup. Book a table, or order ahead and collect.
          </p>
          <div className="flex flex-wrap items-center gap-3 md:order-1">
            <Magnetic>
              <button type="button" onClick={() => open("book")} className="btn btn-gold btn-lg min-w-44">
                Book a table
              </button>
            </Magnetic>
            <a href="#menu" className="btn btn-ghost btn-lg">
              See the menu
            </a>
          </div>
        </div>

        <div className="hero-fade mt-7 flex flex-wrap items-center gap-x-6 gap-y-2.5 text-[0.92rem] text-oat md:mt-5" style={{ "--d": "0.9s" } as CSSProperties}>
          <span className="font-semibold text-cream">Eros {cafe.town}</span>
          <OpenBadge cafe={branch} />
          <a href={`tel:${cafe.tel}`} className="link-draw inline-flex items-center gap-2 font-semibold text-cream/90 hover:text-cream">
            <PhoneIcon className="h-3.5 w-3.5" /> {cafe.phone}
          </a>
          <a href="#reviews" className="link-draw text-oat hover:text-cream">
            <span className="text-gold" aria-hidden>
              ★
            </span>{" "}
            {RATING.score} on Google · {RATING.short} ({RATING.count} reviews)
          </a>
        </div>
      </div>
    </section>
  );
}

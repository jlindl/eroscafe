"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { useVisit } from "./visit";
import { Magnetic, OpenBadge, PhoneIcon } from "./ui";
import { blur } from "@/lib/blur";
import { reducedMotion, withMotion } from "@/lib/motion";

export function FinalCta() {
  const { open, cafe, branch } = useVisit();
  const root = useRef<HTMLElement>(null);
  const img = useRef<HTMLDivElement>(null);
  const head = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (reducedMotion()) return;
    return withMotion(({ gsap }) => {
      const ctx = gsap.context(() => {
        const once = { trigger: head.current, start: "top 78%", once: true };
        gsap.fromTo(
          img.current,
          { yPercent: -12, scale: 1.05 },
          { yPercent: 12, scale: 1.16, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } },
        );
        // The headline opens out from the centre, then the actions rise in.
        gsap.fromTo(
          head.current,
          { clipPath: "inset(0% 50% 0% 50%)", opacity: 0 },
          { clipPath: "inset(0% 0% 0% 0%)", opacity: 1, duration: 1.2, ease: "expo.inOut", scrollTrigger: once },
        );
        gsap.fromTo(
          "[data-cta-fade]",
          { opacity: 0, y: 26 },
          { opacity: 1, y: 0, duration: 0.9, delay: 0.45, ease: "power3.out", stagger: 0.08, scrollTrigger: once },
        );
      }, root);
      return () => ctx.revert();
    });
  }, []);

  return (
    <section
      ref={root}
      id="book-now"
      aria-labelledby="cta-heading"
      className="relative flex min-h-[92svh] items-center justify-center overflow-hidden bg-ink"
    >
      <div ref={img} className="absolute inset-0">
        <Image src="/img/collection.webp" {...blur("/img/collection.webp")} alt="" fill sizes="100vw" quality={62} className="object-cover" />
      </div>
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(11,9,8,0.35),rgba(11,9,8,0.92)_72%)]" />
      <div className="relative px-4 py-24 text-center">
        <p data-cta-fade className="eyebrow justify-center text-cream/80">
          <span className="lozenge" aria-hidden /> Eros {cafe.town}
        </p>
        <h2
          ref={head}
          id="cta-heading"
          className="font-display mt-6 text-[clamp(3.4rem,1.6rem+9vw,11.5rem)] font-semibold leading-[0.88] tracking-[-0.025em] text-cream"
        >
          See you at Eros.
        </h2>
        <div data-cta-fade className="mt-10 flex flex-col items-center gap-5">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Magnetic strength={0.3}>
              <button type="button" onClick={() => open("book")} className="btn btn-gold btn-lg min-w-60 !text-[1.15rem]">
                Book at {cafe.town}
              </button>
            </Magnetic>
            <button type="button" onClick={() => open("order")} className="btn btn-ghost btn-lg">
              Order to collect
            </button>
          </div>
          <p className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[0.95rem] text-cream/85">
            <OpenBadge cafe={branch} />
            <a href={`tel:${cafe.tel}`} className="link-draw inline-flex items-center gap-2 font-semibold">
              <PhoneIcon /> {cafe.phone}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

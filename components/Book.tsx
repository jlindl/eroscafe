"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { blur } from "@/lib/blur";
import { CONTACT, HOURS, WIGAN_HOURS_ROWS } from "@/lib/data";
import { useVisit } from "./visit";
import { MaskLines, Reveal } from "./Reveal";
import { Magnetic, OpenBadge, PhoneIcon } from "./ui";
import { reducedMotion, withMotion } from "@/lib/motion";

const POINTS = [
  { n: "01", title: "Book in a few taps", body: "Pick your café, today or any day, a time and how many of you. Leave a mobile number and you’re done." },
  { n: "02", title: "Order ahead, collect", body: "Add dishes from the menu, choose when you’ll collect and send the order to your café." },
  { n: "03", title: "Groups and events", body: "Catering and events enquiries go to the team. Call your café, or email " },
];

export function Book() {
  const { open, cafe, branch } = useVisit();
  const root = useRef<HTMLElement>(null);
  const media = useRef<HTMLDivElement>(null);
  const vid = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (reducedMotion()) return;
    return withMotion(({ gsap }) => {
      const ctx = gsap.context(() => {
        gsap.fromTo(media.current, { yPercent: -8 }, { yPercent: 8, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } });
      }, root);
      return () => ctx.revert();
    });
  }, []);

  // Load the clip only when it is about to be seen.
  useEffect(() => {
    const v = vid.current;
    if (!v) return;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (conn?.saveData || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          if (!v.src) v.src = "/video/plating.mp4";
          v.play().catch(() => {});
        } else v.pause();
      },
      { rootMargin: "200px 0px" }
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={root} id="book" aria-labelledby="book-heading" className="relative overflow-clip bg-cocoa">
      <div className="grid lg:grid-cols-2">
        <div className="relative order-2 lg:order-1">
          <Reveal kind="wipe-left" amount={0.25} className="relative h-[72vw] max-h-[560px] overflow-hidden lg:sticky lg:top-(--nav-h) lg:h-[calc(100svh-var(--nav-h))] lg:max-h-none">
            <div ref={media} className="absolute -inset-y-[10%] inset-x-0">
              <Image
                src="/img/plating.webp"
                {...blur("/img/plating.webp")}
                alt="A chef finishing a chocolate dessert with a strawberry and spun sugar"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                quality={70}
                className="object-cover"
              />
              <video
                ref={vid}
                aria-hidden
                muted
                loop
                playsInline
                preload="none"
                onPlaying={(e) => e.currentTarget.classList.add("opacity-100")}
                className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-700"
              />
            </div>
            <div aria-hidden className="absolute inset-0 bg-[linear-gradient(to_right,transparent_60%,var(--color-cocoa))] max-lg:bg-[linear-gradient(to_top,var(--color-cocoa),transparent_40%)]" />
          </Reveal>
        </div>

        <div className="order-1 px-4 pb-14 pt-20 sm:px-6 lg:order-2 lg:px-12 lg:py-28 xl:px-20">
          <MaskLines id="book-heading" lines={["Book a table.", "Or order ahead."]} className="font-display t-h2 font-semibold text-cream" />
          <Reveal kind="fade" delay={0.2} className="t-lead mt-6 max-w-[44ch] text-cream/80 text-pretty">
            <p>Reserve at any of the four cafés, or build an order from the menu and collect it. Both take a few taps on your phone.</p>
          </Reveal>

          <ol className="mt-10 border-t border-cream/10">
            {POINTS.map((p, i) => (
              <Reveal as="li" key={p.n} kind="fade" delay={0.1 + i * 0.08} className="grid grid-cols-[1.5rem_1fr] gap-x-3 border-b border-cream/10 py-5 sm:grid-cols-[1.75rem_14rem_1fr] sm:items-baseline">
                <span aria-hidden className="lozenge translate-y-[-0.15rem]" />
                <h3 className="font-display text-[1.25rem] font-semibold leading-[1.05] text-cream">{p.title}</h3>
                <p className="col-start-2 mt-2 text-[0.95rem] leading-relaxed text-oat sm:col-start-3 sm:mt-0">
                  {p.body}
                  {i === 2 && (
                    <>
                      <a href={`mailto:${CONTACT.email}`} className="link-draw whitespace-nowrap text-cream">
                        {CONTACT.email}
                      </a>
                      .
                    </>
                  )}
                </p>
              </Reveal>
            ))}
          </ol>

          <Reveal kind="fade" delay={0.15} className="mt-10">
            <table className="w-full text-[0.95rem]">
              <caption className="pb-3 text-left text-[0.8rem] font-semibold uppercase tracking-[0.1em] text-ash">Your café today</caption>
              <tbody>
                {[
                  ["Café", `Eros ${cafe.town}`],
                  ["Address", [cafe.address, cafe.postcode].filter(Boolean).join(", ")],
                  ["Opening", branch === "wigan" ? "wigan-hours" : HOURS.neutral],
                  ["Phone", cafe.phone],
                ].map(([k, v]) => (
                  <tr key={k} className="border-b border-cream/10">
                    <th scope="row" className="py-3 pr-6 text-left font-normal text-oat">
                      {k}
                    </th>
                    <td className="py-3 text-right font-semibold text-cream">
                      {v === "wigan-hours" ? (
                        WIGAN_HOURS_ROWS.map((h) => (
                          <span key={h.days} className="block leading-relaxed">
                            <span className="font-normal text-oat">{h.days}</span> {h.time}
                          </span>
                        ))
                      ) : k === "Phone" ? (
                        <a href={`tel:${cafe.tel}`} className="link-draw">
                          {v}
                        </a>
                      ) : (
                        v
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-3 text-[0.85rem] text-ash">
              {branch === "wigan" ? `${HOURS.wiganSource} ` : ""}
              {HOURS.caveat}
            </p>
          </Reveal>

          <Reveal kind="fade" delay={0.2} className="mt-9 flex flex-wrap items-center gap-3">
            <Magnetic>
              <button type="button" onClick={() => open("book")} className="btn btn-gold btn-lg">
                Book at {cafe.town}
              </button>
            </Magnetic>
            <button type="button" onClick={() => open("order")} className="btn btn-ghost btn-lg">
              Order to collect
            </button>
            <a href={`tel:${cafe.tel}`} className="ml-1 inline-flex items-center gap-2 text-[0.95rem] font-semibold text-cream/85 hover:text-cream">
              <PhoneIcon /> {cafe.phone}
            </a>
          </Reveal>
          <p className="mt-5 text-[0.9rem] text-oat">
            <OpenBadge cafe={branch} />
          </p>
        </div>
      </div>
    </section>
  );
}

import { RATING, REVIEWS } from "@/lib/data";
import { MaskLines, Reveal } from "./Reveal";

export function Reviews() {
  const [lead, ...rest] = REVIEWS;
  return (
    <section id="reviews" aria-labelledby="reviews-heading" className="relative bg-cocoa py-20 lg:py-24">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <MaskLines id="reviews-heading" lines={["In our guests’", "own words."]} className="font-display t-h2 font-semibold text-cream" />
            <Reveal kind="fade" delay={0.25} className="t-lead mt-6 max-w-[48ch] text-oat text-pretty">
              <p>Google reviews of Eros on Wigan Lane. The welcome comes up in every one.</p>
            </Reveal>
          </div>
          <Reveal kind="slide-left" delay={0.2} className="border border-cream/10 bg-ink/50 p-6 sm:min-w-[300px]">
            <p className="flex items-baseline gap-3">
              <span className="font-display text-[4rem] font-semibold leading-none text-gold">{RATING.score}</span>
              <svg aria-hidden viewBox="0 0 24 24" className="h-7 w-7 translate-y-[-0.35rem] fill-gold">
                <path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6L2.5 9.4l6.6-.8z" />
              </svg>
              <span className="sr-only">out of 5 on Google</span>
            </p>
            <p className="mt-3 text-[0.95rem] text-cream">On Google, from {RATING.count} reviews</p>
            <p className="text-[0.9rem] text-oat">{RATING.where}</p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-2.5 lg:grid-cols-[1.1fr_1fr]">
          <Reveal as="figure" kind="fade" className="relative flex flex-col justify-between border border-gold/40 bg-ink/40 p-7 sm:p-10">
            <span aria-hidden className="font-display pointer-events-none absolute right-6 top-0 text-[9rem] leading-none text-gold/15">
              “
            </span>
            <blockquote className="font-display relative text-[clamp(1.35rem,0.95rem+1.3vw,2.15rem)] font-medium leading-[1.18] text-cream text-pretty">“{lead.text}”</blockquote>
            <figcaption className="mt-8 flex flex-wrap items-center justify-between gap-3 text-[0.92rem]">
              <span className="font-semibold text-cream">
                {lead.who} <span className="font-normal text-oat">· {lead.meta}</span>
              </span>
              <span className="text-oat">Google review</span>
            </figcaption>
          </Reveal>
          <div className="grid gap-2.5 sm:grid-cols-2">
            {rest.map((r, i) => (
              <Reveal as="figure" key={r.who} kind="fade" delay={0.06 * i} className="flex flex-col justify-between border border-cream/10 bg-ink/40 p-6">
                <blockquote className="text-[1rem] leading-relaxed text-cream/90">“{r.text}”</blockquote>
                <figcaption className="mt-5 flex items-center justify-between gap-3 text-[0.88rem]">
                  <span className="font-semibold text-cream">{r.who}</span>
                  <span className="text-oat">{r.meta}</span>
                </figcaption>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

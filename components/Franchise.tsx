import Image from "next/image";
import { CONTACT } from "@/lib/data";
import { MaskLines, Reveal } from "./Reveal";
import { PhoneIcon } from "./ui";
import { blur } from "@/lib/blur";

const PILLARS = [
  { n: "01", title: "A refined brand identity", body: "A distinctive visual and experiential language, built to command presence in any market." },
  { n: "02", title: "European-inspired quality", body: "Premium ingredients and craftsmanship informed by European café tradition and standards." },
  { n: "03", title: "From setup to operation", body: "Site selection and store design, through opening and training, to day-to-day operation." },
];

export function Franchise() {
  const subject = encodeURIComponent("Franchise information request");
  return (
    <section id="franchise" aria-labelledby="franchise-heading" className="relative overflow-hidden bg-marble">
      <div aria-hidden className="lattice-bg absolute inset-0 opacity-60" />
      <div className="relative mx-auto grid max-w-[1600px] gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16 lg:px-10 lg:py-28">
        <div>
          <Reveal kind="fade" className="eyebrow">
            <span className="lozenge" aria-hidden /> The Eros franchise
          </Reveal>
          <MaskLines id="franchise-heading" lines={["Become an", "Eros partner."]} className="font-display t-h2 mt-5 font-semibold text-cream" />
          <Reveal kind="fade" delay={0.2} className="t-lead mt-6 max-w-[46ch] text-cream/80 text-pretty">
            <p>A franchise opportunity built on distinction: a strong brand identity and a proven premium café concept, growing across the UK and beyond.</p>
          </Reveal>
          <ol className="mt-10 grid gap-6 sm:grid-cols-3 sm:gap-8">
            {PILLARS.map((p, i) => (
              <Reveal as="li" key={p.n} kind="fade" delay={0.08 * i} className="border-t border-gold/50 pt-5">
                <h3 className="font-display text-[1.15rem] font-semibold leading-[1.05] text-cream">{p.title}</h3>
                <p className="mt-3 text-[0.9rem] leading-relaxed text-oat">{p.body}</p>
              </Reveal>
            ))}
          </ol>
          <Reveal kind="fade" delay={0.1} className="mt-10 flex flex-wrap items-center gap-3">
            <a href={`mailto:${CONTACT.franchiseEmail}?subject=${subject}`} className="btn btn-gold btn-lg">
              Request franchise information
            </a>
            <a href={`tel:${CONTACT.franchiseTel}`} className="btn btn-ghost btn-lg">
              <PhoneIcon /> {CONTACT.franchisePhone}
            </a>
          </Reveal>
        </div>

        <Reveal kind="wipe-up" amount={0.25} className="relative">
          <figure className="relative">
            <div className="relative aspect-[4/5] overflow-hidden border border-cream/10">
              <Image src="/img/crepe-strawberry-dark.webp" {...blur("/img/crepe-strawberry-dark.webp")} alt="A crêpe with Nutella, strawberries and cream" fill sizes="(min-width: 1024px) 45vw, 100vw" quality={72} className="object-cover object-[50%_45%]" />
              <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(to_top,rgba(11,9,8,0.92),transparent)]" />
            </div>
            <blockquote className="absolute inset-x-5 bottom-5 sm:inset-x-8 sm:bottom-8">
              <p className="font-display text-[clamp(1.35rem,1rem+1.2vw,2rem)] font-medium leading-[1.15] text-cream text-balance">
                “Every Eros Cafe location is treated as an extension of the brand, not a copy of it.”
              </p>
              <footer className="mt-3 text-[0.85rem] text-oat">Eros Cafe, on its franchise page</footer>
            </blockquote>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}

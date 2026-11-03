import Image from "next/image";
import { BRANCHES, CONTACT, HOURS } from "@/lib/data";

const PAGE = [
  { href: "#menu", label: "Menu" },
  { href: "#reviews", label: "Reviews" },
  { href: "#signatures", label: "Signatures" },
  { href: "#book", label: "Book a table" },
  { href: "#cafes", label: "Cafés" },
  { href: "#story", label: "Our story" },
  { href: "#franchise", label: "Franchise" },
];

export function Footer() {
  return (
    <footer className="border-t border-cream/10 bg-ink pb-[calc(var(--bar-h)+env(safe-area-inset-bottom)+2rem)] pt-16 md:pb-12">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Image src="/img/logo.png" alt="Eros Cafe" width={277} height={70} className="h-9 w-auto" />
            <p className="font-display mt-6 max-w-[16ch] text-[1.9rem] font-semibold leading-[1] text-cream">Indulgence, crafted.</p>
            <p className="mt-4 max-w-[38ch] text-[0.95rem] text-oat">
              Hot cookie dough, crêpes, waffles, gelato, milkshakes, speciality coffee and fine teas. {HOURS.caveat}
            </p>
            <ul className="mt-6 flex gap-5 text-[0.92rem] font-semibold">
              <li>
                <a href={CONTACT.facebook} target="_blank" rel="noopener noreferrer" className="link-draw text-cream/85 hover:text-cream">
                  Facebook<span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
              <li>
                <a href={CONTACT.tiktok} target="_blank" rel="noopener noreferrer" className="link-draw text-cream/85 hover:text-cream">
                  TikTok<span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            </ul>
          </div>
          <nav aria-labelledby="f-page">
            <h2 id="f-page" className="font-display text-[1rem] font-semibold text-cream">
              On this page
            </h2>
            <ul className="mt-4 space-y-2.5 text-[0.95rem] text-oat">
              {PAGE.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="link-draw hover:text-cream">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <h2 className="font-display text-[1rem] font-semibold text-cream">Cafés</h2>
            <ul className="mt-4 space-y-3.5 text-[0.95rem]">
              {BRANCHES.map((b) => (
                <li key={b.key}>
                  <span className="block font-semibold text-cream">{b.town}</span>
                  <a href={`tel:${b.tel}`} className="link-draw text-oat hover:text-cream">
                    {b.phone}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-[1rem] font-semibold text-cream">Contact</h2>
            <ul className="mt-4 space-y-3.5 text-[0.95rem]">
              <li>
                <span className="block text-ash">General enquiries</span>
                <a href={`mailto:${CONTACT.email}`} className="link-draw whitespace-nowrap text-cream/90 hover:text-cream">
                  {CONTACT.email}
                </a>
              </li>
              <li>
                <span className="block text-ash">Franchise</span>
                <a href={`mailto:${CONTACT.franchiseEmail}`} className="link-draw whitespace-nowrap text-cream/90 hover:text-cream">
                  {CONTACT.franchiseEmail}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-14 flex flex-col gap-3 border-t border-cream/10 pt-6 text-[0.85rem] text-ash md:flex-row md:items-center md:justify-between">
          <p>© 2026 Eros Cafe Group. A design preview, not indexed by search engines.</p>
          <p>
            Website by{" "}
            <a href="https://integrate-tech.co.uk" target="_blank" rel="noopener noreferrer" className="link-draw text-oat hover:text-cream">
              Integrate<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

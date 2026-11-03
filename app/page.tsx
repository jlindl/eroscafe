import { VisitProvider } from "@/components/visit";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Nav, MobileBar } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { VisitBar } from "@/components/VisitBar";
import { Menu } from "@/components/Menu";
import { Signatures } from "@/components/Signatures";
import { Book } from "@/components/Book";
import { Locations } from "@/components/Locations";
import { Reviews } from "@/components/Reviews";
import { Story } from "@/components/Story";
import { Franchise } from "@/components/Franchise";
import { FinalCta } from "@/components/FinalCta";
import { Footer } from "@/components/Footer";
import { VisitSheet } from "@/components/VisitSheet";

export default function Page() {
  return (
    <VisitProvider>
      <SmoothScroll />
      <a
        href="#menu"
        className="sr-only z-[70] bg-gold px-4 py-3 font-semibold text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to the menu
      </a>
      <Nav />
      <main>
        <Hero />
        <VisitBar />
        <Menu />
        <Reviews />
        <Signatures />
        <Book />
        <Locations />
        <Story />
        <FinalCta />
        <Franchise />
      </main>
      <Footer />
      <MobileBar />
      <VisitSheet />
    </VisitProvider>
  );
}

import type { Metadata, Viewport } from "next";
import { Fraunces, Instrument_Sans } from "next/font/google";
import "./globals.css";

const display = Fraunces({
  subsets: ["latin"],
  style: ["normal"],
  axes: ["opsz"],
  variable: "--font-fraunces",
  display: "swap",
});

const sans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Eros Cafe | Hot cookie dough, crêpes, gelato and coffee in Manchester, Wigan, Urmston and St Helens",
  description:
    "Hot cookie dough, crêpes, waffles, gelato sundaes, milkshakes and speciality coffee, prepared fresh every day. Book a table or order to collect at Eros Cafe in Manchester, Wigan, Urmston and St Helens.",
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#0b0908",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${display.variable} ${sans.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.classList.add('js');setTimeout(function(){if(!window.__erosReady)document.documentElement.classList.remove('js')},5000)",
          }}
        />
        <noscript>
          <style>{`[data-reveal],[data-reveal]>*,[data-masklines] .mask-line>span{opacity:1!important;transform:none!important;clip-path:none!important}`}</style>
        </noscript>
      </head>
      <body>{children}</body>
    </html>
  );
}

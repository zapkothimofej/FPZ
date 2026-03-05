import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Il Grano Ristorante — Cucina italiana autentica, Bochum",
  description:
    "Authentische italienische Küche im Herzen Bochums. Frische Zutaten, traditionsreiche Rezepte, unvergessliche Abende.",
  openGraph: {
    type: "website",
    title: "Il Grano Ristorante — Cucina italiana autentica, Bochum",
    description:
      "Authentische italienische Küche im Herzen Bochums. Frische Zutaten, traditionsreiche Rezepte, unvergessliche Abende.",
    url: "https://fpz-media.de/portfolio/restaurant-kampagne",
  },
};

export default function RestaurantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      data-site="restaurant"
      className="min-h-screen bg-[var(--site-bg)] text-[var(--site-text)] font-serif"
    >
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-[var(--site-bg)]/95 backdrop-blur-md border-b border-[var(--site-border)]">
        <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/portfolio/restaurant-kampagne"
            className="no-underline"
          >
            <div>
              <div className="text-[var(--site-accent)] italic text-2xl font-bold leading-none tracking-wide">
                Il Grano
              </div>
              <div className="text-[var(--site-muted)] text-[0.6rem] tracking-[0.25em] uppercase mt-0.5">
                Ristorante
              </div>
            </div>
          </Link>

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {[
              { label: "Speisekarte", href: "/portfolio/restaurant-kampagne/speisekarte" },
              { label: "Über uns", href: "#story" },
              { label: "Reservierung", href: "/portfolio/restaurant-kampagne/reservierung" },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-[var(--site-muted)] no-underline text-[0.85rem] tracking-[0.08em] font-sans transition-colors hover:text-amber-300"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <Link
            href="/portfolio/restaurant-kampagne/reservierung"
            className="bg-[var(--site-accent)] text-[var(--site-bg)] px-5 py-2 text-[0.8rem] font-sans font-semibold tracking-[0.08em] no-underline rounded-sm"
          >
            Tisch reservieren
          </Link>
        </div>
      </header>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://fpz-media.de" },
              { "@type": "ListItem", "position": 2, "name": "Portfolio", "item": "https://fpz-media.de/portfolio" },
              { "@type": "ListItem", "position": 3, "name": "Il Grano Ristorante", "item": "https://fpz-media.de/portfolio/restaurant-kampagne" },
            ],
          }),
        }}
      />

      {/* Page content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="border-t border-[var(--site-border)] bg-[var(--site-surface)] py-12 px-6 font-sans">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="text-[var(--site-accent)] italic font-serif text-xl mb-2">
              Il Grano Ristorante
            </div>
            <div className="text-[var(--site-muted)] text-[0.85rem] leading-relaxed">
              Cucina italiana autentica<br />
              seit 2009 in Bochum
            </div>
          </div>

          <div>
            <div className="text-[var(--site-text)] text-xs tracking-[0.15em] uppercase mb-2.5">
              Adresse &amp; Öffnungszeiten
            </div>
            <div className="text-[var(--site-muted)] text-[0.85rem] leading-loose">
              Kortumstr. 18<br />
              44787 Bochum<br />
              <br />
              Di – So: 12:00 – 23:00 Uhr<br />
              Montag: Ruhetag
            </div>
          </div>

          <div>
            <div className="text-[var(--site-text)] text-xs tracking-[0.15em] uppercase mb-2.5">
              Kontakt
            </div>
            <div className="text-[var(--site-muted)] text-[0.85rem] leading-loose">
              <a href="tel:+4923412345678" className="text-[var(--site-muted)] no-underline">
                +49 234 123 45678
              </a>
              <br />
              <a href="mailto:info@ilgrano-bochum.de" className="text-[var(--site-muted)] no-underline">
                info@ilgrano-bochum.de
              </a>
              <br />
              <a href="https://instagram.com/ilgrano.bochum" className="text-[var(--site-muted)] no-underline">
                @ilgrano.bochum
              </a>
            </div>
          </div>
        </div>

        <div className="max-w-[1200px] mx-auto mt-10 pt-6 border-t border-[var(--site-border)] flex justify-between items-center flex-wrap gap-2">
          <div className="text-[var(--site-muted)] text-xs">
            &copy; 2024 Il Grano Ristorante. Alle Rechte vorbehalten.
          </div>
          <div className="text-[var(--site-muted)] text-xs">
            Diese Website wurde gebaut von{" "}
            <Link
              href="/"
              className="text-[var(--site-accent)] no-underline"
            >
              fpz media
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

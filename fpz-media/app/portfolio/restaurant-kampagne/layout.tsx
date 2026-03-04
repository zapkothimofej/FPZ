import Link from "next/link";

const C = {
  bg: "#0c0a08",
  text: "#faf6f0",
  accent: "#c9a84c",
  muted: "#8a7d6b",
  surface: "#161410",
  border: "#2a2519",
};

export const metadata = {
  title: "Il Grano Ristorante — Cucina italiana autentica, Bochum",
  description:
    "Authentische italienische Küche im Herzen Bochums. Frische Zutaten, traditionsreiche Rezepte, unvergessliche Abende.",
};

export default function RestaurantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ background: C.bg, color: C.text, minHeight: "100vh", fontFamily: "Georgia, 'Times New Roman', serif" }}>
      {/* Navbar */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: `${C.bg}f0`,
          backdropFilter: "blur(12px)",
          borderBottom: `1px solid ${C.border}`,
        }}
      >
        <div
          style={{ maxWidth: 1200, margin: "0 auto", padding: "0 1.5rem" }}
          className="flex items-center justify-between h-16"
        >
          {/* Logo */}
          <Link href="/portfolio/restaurant-kampagne" style={{ textDecoration: "none" }}>
            <div>
              <div
                style={{
                  color: C.accent,
                  fontStyle: "italic",
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  lineHeight: 1,
                  letterSpacing: "0.02em",
                }}
              >
                Il Grano
              </div>
              <div
                style={{
                  color: C.muted,
                  fontSize: "0.6rem",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  marginTop: 2,
                }}
              >
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
                style={{
                  color: C.muted,
                  textDecoration: "none",
                  fontSize: "0.85rem",
                  letterSpacing: "0.08em",
                  fontFamily: "system-ui, sans-serif",
                  transition: "color 0.2s",
                }}
                className="hover:text-amber-300"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <Link
            href="/portfolio/restaurant-kampagne/reservierung"
            style={{
              background: C.accent,
              color: C.bg,
              padding: "0.5rem 1.25rem",
              fontSize: "0.8rem",
              fontFamily: "system-ui, sans-serif",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textDecoration: "none",
              borderRadius: 2,
            }}
          >
            Tisch reservieren
          </Link>
        </div>
      </header>

      {/* Page content */}
      <main>{children}</main>

      {/* Footer */}
      <footer
        style={{
          borderTop: `1px solid ${C.border}`,
          background: C.surface,
          padding: "3rem 1.5rem",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{ maxWidth: 1200, margin: "0 auto" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-10"
        >
          <div>
            <div style={{ color: C.accent, fontStyle: "italic", fontFamily: "Georgia, serif", fontSize: "1.2rem", marginBottom: 8 }}>
              Il Grano Ristorante
            </div>
            <div style={{ color: C.muted, fontSize: "0.85rem", lineHeight: 1.8 }}>
              Cucina italiana autentica<br />
              seit 2009 in Bochum
            </div>
          </div>

          <div>
            <div style={{ color: C.text, fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 10 }}>
              Adresse & Öffnungszeiten
            </div>
            <div style={{ color: C.muted, fontSize: "0.85rem", lineHeight: 1.9 }}>
              Kortumstr. 18<br />
              44787 Bochum<br />
              <br />
              Di – So: 12:00 – 23:00 Uhr<br />
              Montag: Ruhetag
            </div>
          </div>

          <div>
            <div style={{ color: C.text, fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 10 }}>
              Kontakt
            </div>
            <div style={{ color: C.muted, fontSize: "0.85rem", lineHeight: 1.9 }}>
              <a href="tel:+4923412345678" style={{ color: C.muted, textDecoration: "none" }}>
                +49 234 123 45678
              </a>
              <br />
              <a href="mailto:info@ilgrano-bochum.de" style={{ color: C.muted, textDecoration: "none" }}>
                info@ilgrano-bochum.de
              </a>
              <br />
              <a href="https://instagram.com/ilgrano.bochum" style={{ color: C.muted, textDecoration: "none" }}>
                @ilgrano.bochum
              </a>
            </div>
          </div>
        </div>

        <div
          style={{
            maxWidth: 1200,
            margin: "2.5rem auto 0",
            paddingTop: "1.5rem",
            borderTop: `1px solid ${C.border}`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 8,
          }}
        >
          <div style={{ color: C.muted, fontSize: "0.75rem" }}>
            © 2024 Il Grano Ristorante. Alle Rechte vorbehalten.
          </div>
          <div style={{ color: C.muted, fontSize: "0.75rem" }}>
            Diese Website wurde gebaut von{" "}
            <a
              href="/"
              style={{ color: C.accent, textDecoration: "none" }}
            >
              fpz media
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

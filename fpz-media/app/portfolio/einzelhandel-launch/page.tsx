import Link from "next/link"

const BASE = "/portfolio/einzelhandel-launch"

export const metadata = {
  title: "Mila Mode — Zeitlose Mode für jeden Anlass",
  description:
    "Mila Mode in Bochum: Nachhaltige, zeitlose Damenmode für jeden Anlass. Entdecke unsere aktuelle Frühjahrskollektion.",
}

const categories = [
  { label: "Oberteile", bg: "#f0ebe8" },
  { label: "Hosen", bg: "#e8e3df" },
  { label: "Kleider", bg: "#e5ddd9" },
  { label: "Accessoires", bg: "#ddd6d1" },
]

const bestsellers = [
  {
    name: "Leinenbluse Ivory",
    desc: "100% Leinen, locker geschnitten, zeitlos.",
    price: "79",
    sizes: ["XS", "S", "M", "L", "XL"],
    gradient: "linear-gradient(135deg, #f0ebe8 0%, #d6c4bc 100%)",
  },
  {
    name: "Wide-Leg Hose Camel",
    desc: "Hochwertige Baumwollmischung, weiter Schnitt.",
    price: "129",
    sizes: ["34", "36", "38", "40", "42"],
    gradient: "linear-gradient(135deg, #e8ddd5 0%, #c4a98e 100%)",
  },
  {
    name: "Sommerkleid Rose",
    desc: "Fließender Viskose-Stoff, A-Linie.",
    price: "99",
    sizes: ["XS", "S", "M", "L"],
    gradient: "linear-gradient(135deg, #f0d9d3 0%, #d6a89a 100%)",
  },
]

export default function MilaHomePage() {
  return (
    <>
      {/* Announcement Bar */}
      <div
        style={{
          backgroundColor: "#1a1a1a",
          color: "white",
          textAlign: "center",
          padding: "10px 16px",
          fontSize: 12,
          letterSpacing: "0.08em",
        }}
      >
        Kostenloser Versand ab 80€ &nbsp;|&nbsp; Neu: Frühjahrskollektion 2025 →
      </div>

      {/* Hero */}
      <section style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: 600 }}>
        {/* Left */}
        <div
          style={{
            backgroundColor: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "4rem 3rem",
          }}
        >
          <div style={{ maxWidth: 420 }}>
            <p
              style={{
                fontSize: 11,
                letterSpacing: "0.25em",
                color: "#737373",
                marginBottom: 16,
                textTransform: "uppercase",
              }}
            >
              Frühjahr / Sommer 2025
            </p>
            <h1
              style={{
                fontSize: "clamp(32px, 4vw, 52px)",
                fontWeight: 800,
                lineHeight: 1.1,
                color: "#1a1a1a",
                marginBottom: 20,
                letterSpacing: "-0.02em",
              }}
            >
              Neue<br />Frühjahrs-<br />kollektion<br />2025
            </h1>
            <p
              style={{
                color: "#737373",
                fontSize: 15,
                lineHeight: 1.7,
                marginBottom: 32,
              }}
            >
              Zeitlose Stücke für jeden Anlass. Nachhaltig produziert, modern gestylt.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link
                href={`${BASE}/kollektion`}
                style={{
                  backgroundColor: "#1a1a1a",
                  color: "white",
                  textDecoration: "none",
                  fontSize: 12,
                  letterSpacing: "0.1em",
                  padding: "14px 28px",
                  display: "inline-block",
                }}
              >
                KOLLEKTION ENTDECKEN
              </Link>
              <Link
                href={`${BASE}/kollektion`}
                style={{
                  border: "1px solid #1a1a1a",
                  color: "#1a1a1a",
                  textDecoration: "none",
                  fontSize: 12,
                  letterSpacing: "0.1em",
                  padding: "14px 28px",
                  display: "inline-block",
                }}
              >
                NEUHEITEN
              </Link>
            </div>
          </div>
        </div>

        {/* Right – image placeholder */}
        <div style={{ position: "relative", minHeight: 600 }}>
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(160deg, #d6a89a 0%, #c4877a 50%, #b57060 100%)",
            }}
          />
          {/* Texture overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "repeating-linear-gradient(45deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 8px)",
            }}
          />
          {/* NEU badge */}
          <div
            style={{
              position: "absolute",
              top: 32,
              left: -16,
              backgroundColor: "white",
              color: "#1a1a1a",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.2em",
              padding: "8px 16px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
            }}
          >
            NEU
          </div>
          {/* Bottom label */}
          <div
            style={{
              position: "absolute",
              bottom: 32,
              left: 32,
              color: "white",
              fontSize: 13,
              letterSpacing: "0.08em",
              opacity: 0.8,
            }}
          >
            Frühjahr / Sommer 2025
          </div>
        </div>
      </section>

      {/* Categories */}
      <section style={{ padding: "5rem 2rem", backgroundColor: "#fafaf9" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p
            style={{
              fontSize: 11,
              letterSpacing: "0.25em",
              color: "#737373",
              marginBottom: 8,
              textTransform: "uppercase",
              textAlign: "center",
            }}
          >
            Sortiment
          </p>
          <h2
            style={{
              fontSize: "clamp(24px, 3vw, 36px)",
              fontWeight: 700,
              textAlign: "center",
              color: "#1a1a1a",
              marginBottom: 40,
              letterSpacing: "-0.02em",
            }}
          >
            Entdecke unsere Welt
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
            {categories.map((cat) => (
              <Link
                key={cat.label}
                href={`${BASE}/kollektion`}
                style={{ textDecoration: "none" }}
              >
                <div
                  style={{
                    backgroundColor: cat.bg,
                    height: 200,
                    display: "flex",
                    alignItems: "flex-end",
                    padding: "20px",
                    position: "relative",
                    overflow: "hidden",
                    transition: "transform 0.2s",
                  }}
                >
                  {/* Subtle grain */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      backgroundImage:
                        "repeating-linear-gradient(0deg, rgba(0,0,0,0.015) 0px, rgba(0,0,0,0.015) 1px, transparent 1px, transparent 4px)",
                    }}
                  />
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      letterSpacing: "0.1em",
                      color: "#1a1a1a",
                      textTransform: "uppercase",
                      position: "relative",
                    }}
                  >
                    {cat.label} →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bestsellers */}
      <section style={{ padding: "5rem 2rem", backgroundColor: "white" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p
            style={{
              fontSize: 11,
              letterSpacing: "0.25em",
              color: "#737373",
              marginBottom: 8,
              textTransform: "uppercase",
              textAlign: "center",
            }}
          >
            Bestseller
          </p>
          <h2
            style={{
              fontSize: "clamp(24px, 3vw, 36px)",
              fontWeight: 700,
              textAlign: "center",
              color: "#1a1a1a",
              marginBottom: 48,
              letterSpacing: "-0.02em",
            }}
          >
            Unsere Bestseller
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {bestsellers.map((product) => (
              <div
                key={product.name}
                style={{
                  backgroundColor: "white",
                  border: "1px solid #e7e5e4",
                }}
              >
                {/* Product image placeholder */}
                <div
                  style={{
                    height: 320,
                    background: product.gradient,
                    position: "relative",
                  }}
                >
                  {/* Subtle texture */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      backgroundImage:
                        "repeating-linear-gradient(135deg, rgba(255,255,255,0.06) 0px, rgba(255,255,255,0.06) 1px, transparent 1px, transparent 6px)",
                    }}
                  />
                </div>
                {/* Info */}
                <div style={{ padding: "20px" }}>
                  <h3
                    style={{
                      fontSize: 16,
                      fontWeight: 600,
                      color: "#1a1a1a",
                      marginBottom: 6,
                    }}
                  >
                    {product.name}
                  </h3>
                  <p style={{ fontSize: 13, color: "#737373", marginBottom: 12, lineHeight: 1.5 }}>
                    {product.desc}
                  </p>
                  <p style={{ fontSize: 18, fontWeight: 700, color: "#1a1a1a", marginBottom: 14 }}>
                    {product.price} €
                  </p>
                  {/* Sizes */}
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
                    {product.sizes.map((size) => (
                      <span
                        key={size}
                        style={{
                          fontSize: 10,
                          letterSpacing: "0.06em",
                          border: "1px solid #e7e5e4",
                          padding: "4px 8px",
                          color: "#737373",
                        }}
                      >
                        {size}
                      </span>
                    ))}
                  </div>
                  <button
                    style={{
                      width: "100%",
                      backgroundColor: "#1a1a1a",
                      color: "white",
                      border: "none",
                      padding: "12px",
                      fontSize: 11,
                      letterSpacing: "0.1em",
                      cursor: "pointer",
                      fontWeight: 600,
                    }}
                  >
                    IN DEN WARENKORB
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Über uns */}
      <section
        style={{
          padding: "6rem 2rem",
          backgroundColor: "#f5f5f4",
          borderTop: "1px solid #e7e5e4",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 64,
            alignItems: "center",
          }}
        >
          {/* Text */}
          <div>
            <p
              style={{
                fontSize: 11,
                letterSpacing: "0.25em",
                color: "#737373",
                marginBottom: 12,
                textTransform: "uppercase",
              }}
            >
              Über uns
            </p>
            <h2
              style={{
                fontSize: "clamp(28px, 3.5vw, 44px)",
                fontWeight: 700,
                color: "#1a1a1a",
                marginBottom: 24,
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
              }}
            >
              Mode aus Leidenschaft
            </h2>
            <p style={{ color: "#737373", fontSize: 15, lineHeight: 1.8, marginBottom: 20 }}>
              Lisa Meier gründete Mila Mode 2018 mit einer klaren Vision: Mode, die wirklich passt
              – für echte Frauen, nicht für Mannequins. Jedes Stück wird sorgfältig ausgewählt,
              nachhaltig produziert und fair gehandelt.
            </p>
            <p style={{ color: "#737373", fontSize: 15, lineHeight: 1.8, marginBottom: 32 }}>
              Unser kleines Team berät euch persönlich im Store an der Kortumstraße oder hilft euch
              gerne per E-Mail weiter. Mode ist für uns kein Massenprodukt – sondern ein
              Ausdruck eurer Persönlichkeit.
            </p>
            <Link
              href={`${BASE}/kontakt`}
              style={{
                fontSize: 12,
                letterSpacing: "0.1em",
                color: "#1a1a1a",
                textDecoration: "none",
                borderBottom: "1px solid #1a1a1a",
                paddingBottom: 2,
              }}
            >
              KONTAKT AUFNEHMEN →
            </Link>
          </div>

          {/* Portrait placeholder */}
          <div
            style={{
              height: 480,
              background: "linear-gradient(160deg, #e8d5cf 0%, #d6a89a 40%, #c4877a 100%)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage:
                  "repeating-linear-gradient(45deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 8px)",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 24,
                left: 24,
                backgroundColor: "rgba(255,255,255,0.9)",
                padding: "12px 18px",
              }}
            >
              <p style={{ fontSize: 13, fontWeight: 600, color: "#1a1a1a" }}>Lisa Meier</p>
              <p style={{ fontSize: 11, color: "#737373", letterSpacing: "0.06em" }}>Gründerin, Mila Mode</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section
        style={{
          backgroundColor: "#d6a89a",
          padding: "5rem 2rem",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontSize: 11,
            letterSpacing: "0.25em",
            color: "rgba(255,255,255,0.7)",
            marginBottom: 12,
            textTransform: "uppercase",
          }}
        >
          Newsletter
        </p>
        <h2
          style={{
            fontSize: "clamp(24px, 3vw, 40px)",
            fontWeight: 700,
            color: "white",
            marginBottom: 12,
            letterSpacing: "-0.01em",
          }}
        >
          10% auf deine erste Bestellung
        </h2>
        <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 15, marginBottom: 32, lineHeight: 1.6 }}>
          Melde dich für unseren Newsletter an und erhalte exklusive Angebote, Styling-Tipps
          und Neuheiten direkt in dein Postfach.
        </p>
        <form
          style={{
            display: "flex",
            gap: 0,
            maxWidth: 460,
            margin: "0 auto",
          }}
        >
          <input
            type="email"
            placeholder="deine@email.de"
            style={{
              flex: 1,
              padding: "14px 18px",
              fontSize: 13,
              border: "none",
              outline: "none",
              backgroundColor: "white",
              color: "#1a1a1a",
            }}
          />
          <button
            type="submit"
            style={{
              backgroundColor: "#1a1a1a",
              color: "white",
              border: "none",
              padding: "14px 24px",
              fontSize: 11,
              letterSpacing: "0.12em",
              fontWeight: 600,
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            JETZT SICHERN
          </button>
        </form>
      </section>

      {/* USPs */}
      <section
        style={{
          backgroundColor: "white",
          borderTop: "1px solid #e7e5e4",
          padding: "3.5rem 2rem",
        }}
      >
        <div
          style={{
            maxWidth: 1000,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 32,
            textAlign: "center",
          }}
        >
          {/* USP 1 */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="1" y="3" width="15" height="13" rx="1" />
              <path d="M16 8h4l3 5v3h-7V8z" />
              <circle cx="5.5" cy="18.5" r="2.5" />
              <circle cx="18.5" cy="18.5" r="2.5" />
            </svg>
            <div>
              <p style={{ fontSize: 14, fontWeight: 600, color: "#1a1a1a", marginBottom: 4 }}>
                Kostenloser Versand
              </p>
              <p style={{ fontSize: 13, color: "#737373" }}>ab 80€ Bestellwert</p>
            </div>
          </div>

          {/* USP 2 */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="1 4 1 10 7 10" />
              <path d="M3.51 15a9 9 0 1 0 .49-3.51" />
            </svg>
            <div>
              <p style={{ fontSize: 14, fontWeight: 600, color: "#1a1a1a", marginBottom: 4 }}>
                30 Tage Rückgabe
              </p>
              <p style={{ fontSize: 13, color: "#737373" }}>Kostenlos & unkompliziert</p>
            </div>
          </div>

          {/* USP 3 */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <polyline points="9 12 11 14 15 10" />
            </svg>
            <div>
              <p style={{ fontSize: 14, fontWeight: 600, color: "#1a1a1a", marginBottom: 4 }}>
                Nachhaltige Marken
              </p>
              <p style={{ fontSize: 13, color: "#737373" }}>Fair & umweltbewusst produziert</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

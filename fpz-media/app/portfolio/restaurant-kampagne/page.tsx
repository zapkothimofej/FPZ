import Link from "next/link"

const C = {
  bg: "#0c0a08",
  text: "#faf6f0",
  accent: "#c9a84c",
  muted: "#8a7d6b",
  surface: "#161410",
  border: "#2a2519",
}

const dishes = [
  {
    name: "Pasta al Tartufo Nero",
    desc: "Hausgemachte Tagliatelle mit schwarzem Trüffel, Parmigiano Reggiano und brauner Butter.",
    price: "22€",
  },
  {
    name: "Branzino al Forno",
    desc: "Im Ofen gegarter Wolfsbarsch mit Zitronen-Kapern-Butter, Ofengemüse und Kartoffeln.",
    price: "28€",
  },
  {
    name: "Vitello Tonnato",
    desc: "Klassisch geschnittenes Kalbsfleisch mit Thunfischcreme und Kapern nach Nonnas Art.",
    price: "18€",
  },
  {
    name: "Tiramisù della Casa",
    desc: "Original nach Familienrezept, mit Savoiardi, Mascarpone und Espresso. Serviert im Glas.",
    price: "9€",
  },
]

const reviews = [
  {
    text: "Das beste Tiramisu in ganz Bochum! Marco und sein Team machen einfach alles mit Liebe.",
    author: "Sandra K.",
  },
  {
    text: "Authentisch wie in Italien. Die Pasta wird frisch gemacht und man schmeckt jeden Unterschied.",
    author: "Thomas M.",
  },
  {
    text: "Unser Lieblingsrestaurant für besondere Anlässe. Atmosphäre, Essen, Service — alles perfetto.",
    author: "Familie Schulz",
  },
]

export default function RestaurantHomePage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section
        style={{
          position: "relative",
          minHeight: "92vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          padding: "6rem 1.5rem",
        }}
      >
        {/* Decorative warm glow */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 70% 60% at 50% 55%, #2a1f08 0%, #1a1208 40%, #0c0a08 100%)",
            pointerEvents: "none",
          }}
        />
        {/* Decorative circle */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            width: 520,
            height: 520,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, #3d2a06 0%, #1e1508 50%, transparent 80%)",
            opacity: 0.45,
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -52%)",
            pointerEvents: "none",
          }}
        />

        <div style={{ position: "relative", textAlign: "center", maxWidth: 680 }}>
          {/* Gold divider */}
          <div
            style={{
              width: 40,
              height: 1,
              background: C.accent,
              margin: "0 auto 1.5rem",
              opacity: 0.7,
            }}
          />

          <p
            style={{
              color: C.accent,
              fontStyle: "italic",
              fontSize: "1rem",
              letterSpacing: "0.12em",
              marginBottom: "1.25rem",
              opacity: 0.85,
            }}
          >
            Cucina italiana autentica — Bochum
          </p>

          <h1
            style={{
              color: C.text,
              fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: "-0.01em",
              marginBottom: "1.5rem",
            }}
          >
            Herz.{" "}
            <span style={{ color: C.accent, fontStyle: "italic" }}>Seele.</span>
            {" "}Pasta.
          </h1>

          <p
            style={{
              color: C.muted,
              fontSize: "1.05rem",
              lineHeight: 1.85,
              maxWidth: 520,
              margin: "0 auto 2.5rem",
              fontFamily: "system-ui, sans-serif",
            }}
          >
            Seit 2009 kochen wir mit Leidenschaft für Bochum. Frische Zutaten,
            authentische Rezepte — und eine Atmosphäre, die sich anfühlt wie
            famiglia.
          </p>

          <div style={{ display: "flex", gap: "1.25rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              href="/portfolio/restaurant-kampagne/reservierung"
              style={{
                border: `1px solid ${C.accent}`,
                color: C.accent,
                textDecoration: "none",
                padding: "0.75rem 2rem",
                fontSize: "0.85rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontFamily: "system-ui, sans-serif",
                fontWeight: 500,
              }}
            >
              Tisch reservieren
            </Link>
            <Link
              href="/portfolio/restaurant-kampagne/speisekarte"
              style={{
                color: C.muted,
                textDecoration: "none",
                padding: "0.75rem 1.5rem",
                fontSize: "0.9rem",
                fontFamily: "system-ui, sans-serif",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              Zur Speisekarte <span style={{ color: C.accent }}>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Unsere Geschichte ────────────────────────────────────────── */}
      <section
        id="story"
        style={{
          backgroundColor: C.surface,
          padding: "6rem 1.5rem",
          borderTop: `1px solid ${C.border}`,
          borderBottom: `1px solid ${C.border}`,
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "5rem",
            alignItems: "center",
          }}
          className="grid-cols-1 md:grid-cols-2"
        >
          <div>
            <p
              style={{
                color: C.accent,
                fontStyle: "italic",
                fontSize: "1.1rem",
                marginBottom: "0.5rem",
              }}
            >
              Benvenuti
            </p>
            <h2
              style={{
                color: C.text,
                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                fontWeight: 700,
                lineHeight: 1.2,
                marginBottom: "1.5rem",
              }}
            >
              Eine Geschichte über{" "}
              <span style={{ color: C.accent, fontStyle: "italic" }}>
                Leidenschaft
              </span>
            </h2>
            <div
              style={{
                color: C.muted,
                fontSize: "0.95rem",
                lineHeight: 1.9,
                fontFamily: "system-ui, sans-serif",
              }}
            >
              <p style={{ marginBottom: "1rem" }}>
                Marco Ferretti wuchs in Napoli auf — in einer Küche, die immer
                nach Sugo duftete. Seine Nonna lehrte ihn früh: gutes Essen
                braucht keine Kompromisse.
              </p>
              <p style={{ marginBottom: "1rem" }}>
                2009 zog er nach Bochum, im Gepäck ein paar Koffer und ein
                Notizbuch voller Familienrezepte. Seitdem steht er jeden Abend
                am Herd — mit derselben Überzeugung, derselben Sorgfalt.
              </p>
              <p>
                Das <em style={{ color: C.text }}>Il Grano</em> ist kein
                Restaurant wie jedes andere. Es ist ein Stück Neapel mitten in
                Bochum. Jeder Teller erzählt eine Geschichte.
              </p>
            </div>
          </div>

          {/* Image placeholder */}
          <div
            style={{
              height: 400,
              borderRadius: 4,
              background:
                "linear-gradient(135deg, #2d1f08 0%, #1a1208 40%, #261a0a 70%, #1e1408 100%)",
              border: `1px solid ${C.border}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: 12,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              aria-hidden
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "radial-gradient(ellipse 60% 60% at 40% 40%, #3d2a0880 0%, transparent 70%)",
              }}
            />
            <p
              style={{
                color: C.accent,
                fontStyle: "italic",
                fontSize: "1.8rem",
                fontWeight: 700,
                position: "relative",
              }}
            >
              Il Grano
            </p>
            <p
              style={{
                color: C.muted,
                fontSize: "0.8rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                position: "relative",
                fontFamily: "system-ui, sans-serif",
              }}
            >
              Ristorante · seit 2009
            </p>
          </div>
        </div>
      </section>

      {/* ── Spezialitäten ────────────────────────────────────────────── */}
      <section style={{ padding: "6rem 1.5rem", backgroundColor: C.bg }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <p
              style={{
                color: C.accent,
                fontStyle: "italic",
                fontSize: "0.9rem",
                letterSpacing: "0.15em",
                marginBottom: "0.5rem",
                fontFamily: "system-ui, sans-serif",
              }}
            >
              Unsere Empfehlungen
            </p>
            <h2
              style={{
                color: C.text,
                fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)",
                fontWeight: 700,
              }}
            >
              Spezialitäten del giorno
            </h2>
            <div
              style={{
                width: 36,
                height: 1,
                background: C.accent,
                margin: "1rem auto 0",
                opacity: 0.5,
              }}
            />
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "1.5rem",
            }}
            className="grid-cols-1 sm:grid-cols-2"
          >
            {dishes.map((dish) => (
              <div
                key={dish.name}
                style={{
                  backgroundColor: C.surface,
                  border: `1px solid ${C.border}`,
                  padding: "2rem",
                  borderTop: `2px solid ${C.accent}`,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "0.75rem",
                    gap: "1rem",
                  }}
                >
                  <h3
                    style={{
                      color: C.text,
                      fontSize: "1.05rem",
                      fontWeight: 600,
                      fontStyle: "italic",
                    }}
                  >
                    {dish.name}
                  </h3>
                  <span
                    style={{
                      color: C.accent,
                      fontFamily: "system-ui, sans-serif",
                      fontSize: "1rem",
                      fontWeight: 600,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {dish.price}
                  </span>
                </div>
                <p
                  style={{
                    color: C.muted,
                    fontSize: "0.875rem",
                    lineHeight: 1.7,
                    fontFamily: "system-ui, sans-serif",
                  }}
                >
                  {dish.desc}
                </p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
            <Link
              href="/portfolio/restaurant-kampagne/speisekarte"
              style={{
                color: C.muted,
                textDecoration: "none",
                fontSize: "0.875rem",
                fontFamily: "system-ui, sans-serif",
                letterSpacing: "0.05em",
                borderBottom: `1px solid ${C.border}`,
                paddingBottom: 2,
              }}
            >
              Vollständige Speisekarte ansehen →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Reservierung CTA ─────────────────────────────────────────── */}
      <section
        style={{
          backgroundColor: C.surface,
          borderTop: `1px solid ${C.border}`,
          borderBottom: `1px solid ${C.border}`,
          padding: "5rem 1.5rem",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <p
            style={{
              color: C.accent,
              fontStyle: "italic",
              fontSize: "0.9rem",
              letterSpacing: "0.12em",
              marginBottom: "0.75rem",
              fontFamily: "system-ui, sans-serif",
            }}
          >
            Ihr Abend beginnt hier
          </p>
          <h2
            style={{
              color: C.text,
              fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)",
              fontWeight: 700,
              marginBottom: "1rem",
              lineHeight: 1.25,
            }}
          >
            Tisch reservieren —{" "}
            <span style={{ color: C.accent, fontStyle: "italic" }}>
              einfach und bequem
            </span>
          </h2>
          <p
            style={{
              color: C.muted,
              fontSize: "0.95rem",
              lineHeight: 1.8,
              fontFamily: "system-ui, sans-serif",
              marginBottom: "2rem",
            }}
          >
            Sichern Sie sich Ihren Wunschtisch für einen unvergesslichen Abend.
            Wir freuen uns auf Sie.
          </p>
          <Link
            href="/portfolio/restaurant-kampagne/reservierung"
            style={{
              backgroundColor: C.accent,
              color: C.bg,
              textDecoration: "none",
              padding: "0.875rem 2.5rem",
              fontSize: "0.85rem",
              fontFamily: "system-ui, sans-serif",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              display: "inline-block",
              marginBottom: "1.25rem",
            }}
          >
            Jetzt reservieren
          </Link>
          <p style={{ color: C.muted, fontSize: "0.85rem", fontFamily: "system-ui, sans-serif" }}>
            oder rufen Sie uns an:{" "}
            <a
              href="tel:+4923498765"
              style={{ color: C.accent, textDecoration: "none", fontWeight: 600 }}
            >
              0234 987 654
            </a>
          </p>
        </div>
      </section>

      {/* ── Bewertungen ──────────────────────────────────────────────── */}
      <section style={{ padding: "6rem 1.5rem", backgroundColor: C.bg }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <p
              style={{
                color: C.accent,
                fontStyle: "italic",
                fontSize: "0.9rem",
                letterSpacing: "0.15em",
                marginBottom: "0.5rem",
                fontFamily: "system-ui, sans-serif",
              }}
            >
              Was unsere Gäste sagen
            </p>
            <h2
              style={{
                color: C.text,
                fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)",
                fontWeight: 700,
              }}
            >
              Stimmen aus der famiglia
            </h2>
            <div
              style={{
                width: 36,
                height: 1,
                background: C.accent,
                margin: "1rem auto 0",
                opacity: 0.5,
              }}
            />
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "1.5rem",
            }}
            className="grid-cols-1 md:grid-cols-3"
          >
            {reviews.map((r) => (
              <div
                key={r.author}
                style={{
                  backgroundColor: C.surface,
                  border: `1px solid ${C.border}`,
                  padding: "2rem",
                  borderRadius: 2,
                }}
              >
                <div
                  style={{
                    color: C.accent,
                    fontSize: "1.1rem",
                    marginBottom: "1rem",
                    letterSpacing: "0.05em",
                  }}
                >
                  ★★★★★
                </div>
                <p
                  style={{
                    color: C.text,
                    fontSize: "0.9rem",
                    lineHeight: 1.8,
                    fontFamily: "system-ui, sans-serif",
                    marginBottom: "1.25rem",
                    fontStyle: "italic",
                  }}
                >
                  &ldquo;{r.text}&rdquo;
                </p>
                <p
                  style={{
                    color: C.muted,
                    fontSize: "0.8rem",
                    fontFamily: "system-ui, sans-serif",
                    letterSpacing: "0.05em",
                  }}
                >
                  — {r.author}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

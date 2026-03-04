const C = {
  bg: "#0c0a08",
  text: "#faf6f0",
  accent: "#c9a84c",
  muted: "#8a7d6b",
  surface: "#161410",
  border: "#2a2519",
}

type MenuItem = { name: string; desc: string; price: string }

const antipasti: MenuItem[] = [
  {
    name: "Bruschetta al Pomodoro",
    desc: "Geröstetes Sauerteigbrot mit reifen Tomaten, frischem Basilikum und nativem Olivenöl extra.",
    price: "8€",
  },
  {
    name: "Burrata con Prosciutto",
    desc: "Cremige Burrata aus Apulien mit hauchdünnem Parmaschinken, Rucola und Balsamico-Reduktion.",
    price: "14€",
  },
  {
    name: "Carpaccio di Manzo",
    desc: "Dünn aufgeschnittenes Rinderfilet mit Parmigiano-Spänen, Kapern und Zitronenöl-Dressing.",
    price: "16€",
  },
  {
    name: "Zuppa del Giorno",
    desc: "Tagessuppe nach Marktangebot — fragen Sie Ihr Servicepersonal nach der heutigen Kreation.",
    price: "9€",
  },
]

const primiPiatti: MenuItem[] = [
  {
    name: "Spaghetti alla Carbonara",
    desc: "Original römische Art mit Guanciale, frischem Eigelb, Pecorino Romano und schwarzem Pfeffer.",
    price: "17€",
  },
  {
    name: "Tagliatelle al Ragù",
    desc: "Hausgemachte Tagliatelle mit einem langsam gekochten Bolognese-Ragù nach Nonnas Rezept.",
    price: "18€",
  },
  {
    name: "Pappardelle al Tartufo Nero",
    desc: "Breite Pappardelle mit schwarzem Sommertrüffel, brauner Butter und Parmigiano Reggiano.",
    price: "22€",
  },
  {
    name: "Risotto ai Funghi Porcini",
    desc: "Cremiges Carnaroli-Risotto mit frischen Steinpilzen, Weißwein und Mascarpone.",
    price: "19€",
  },
  {
    name: "Gnocchi alla Sorrentina",
    desc: "Hausgemachte Kartoffelgnocchi mit San-Marzano-Tomatensauce und Büffelmozzarella, überbacken.",
    price: "16€",
  },
]

const secondiPiatti: MenuItem[] = [
  {
    name: "Branzino al Forno",
    desc: "Im Ofen gegarter Wolfsbarsch mit Zitronen-Kapern-Butter, Ofengemüse und Rosmarinkartoffeln.",
    price: "28€",
  },
  {
    name: "Vitello Tonnato",
    desc: "Klassisch aufgeschnittenes Kalbsfleisch mit cremiger Thunfischsauce und Kapernbeeren nach Nonnas Art.",
    price: "18€",
  },
  {
    name: "Bistecca di Manzo",
    desc: "Gegrilltes Rumpsteak vom deutschen Weiderind mit Rosmarinjus, Rucola und Kirschtomaten.",
    price: "36€",
  },
  {
    name: "Pollo al Limone",
    desc: "Gebratene Hähnchenbrust mit Zitronen-Weißweinsauce, Kapern und geröstetem Gemüse.",
    price: "22€",
  },
  {
    name: "Saltimbocca alla Romana",
    desc: "Zarte Kalbsschnitzel mit Prosciutto und Salbei in Weißweinjus — ein römischer Klassiker.",
    price: "24€",
  },
]

const dolci: MenuItem[] = [
  {
    name: "Tiramisù della Casa",
    desc: "Original nach Familienrezept mit Savoiardi, Espresso, Marsala und Mascarpone. Serviert im Glas.",
    price: "9€",
  },
  {
    name: "Panna Cotta alla Vaniglia",
    desc: "Zarte Vanille-Panna-Cotta mit Beerenkoulis und frischen Beeren.",
    price: "8€",
  },
  {
    name: "Cannoli Siciliani",
    desc: "Knusprige Cannoli-Röhren gefüllt mit Ricotta-Creme, Pistazie und kandierten Orangenschalen.",
    price: "10€",
  },
]

function Divider() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        margin: "3rem 0",
      }}
    >
      <div style={{ flex: 1, height: 1, background: C.border }} />
      <div style={{ color: C.accent, fontSize: "1rem", opacity: 0.7 }}>✦</div>
      <div style={{ flex: 1, height: 1, background: C.border }} />
    </div>
  )
}

function MenuSection({
  title,
  subtitle,
  items,
  altBg,
}: {
  title: string
  subtitle: string
  items: MenuItem[]
  altBg?: boolean
}) {
  return (
    <section
      style={{
        backgroundColor: altBg ? C.surface : C.bg,
        padding: "4rem 1.5rem",
        borderTop: `1px solid ${C.border}`,
      }}
    >
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ marginBottom: "2.5rem" }}>
          <p
            style={{
              color: C.accent,
              fontStyle: "italic",
              fontSize: "0.85rem",
              letterSpacing: "0.15em",
              marginBottom: "0.25rem",
              fontFamily: "system-ui, sans-serif",
            }}
          >
            {subtitle}
          </p>
          <h2
            style={{
              color: C.text,
              fontSize: "clamp(1.4rem, 3vw, 2rem)",
              fontWeight: 700,
            }}
          >
            {title}
          </h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
          {items.map((item, i) => (
            <div key={item.name}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: "2rem",
                  padding: "1.25rem 0",
                }}
              >
                <div style={{ flex: 1 }}>
                  <p
                    style={{
                      color: C.text,
                      fontSize: "1rem",
                      fontStyle: "italic",
                      fontWeight: 600,
                      marginBottom: "0.3rem",
                    }}
                  >
                    {item.name}
                  </p>
                  <p
                    style={{
                      color: C.muted,
                      fontSize: "0.85rem",
                      lineHeight: 1.65,
                      fontFamily: "system-ui, sans-serif",
                    }}
                  >
                    {item.desc}
                  </p>
                </div>
                <span
                  style={{
                    color: C.accent,
                    fontSize: "0.95rem",
                    fontFamily: "system-ui, sans-serif",
                    fontWeight: 600,
                    whiteSpace: "nowrap",
                    paddingTop: 2,
                  }}
                >
                  {item.price}
                </span>
              </div>
              {i < items.length - 1 && (
                <div style={{ height: 1, background: C.border, opacity: 0.5 }} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function SpeisekartePage() {
  return (
    <>
      {/* Header */}
      <section
        style={{
          backgroundColor: C.bg,
          padding: "5rem 1.5rem 3rem",
          textAlign: "center",
          borderBottom: `1px solid ${C.border}`,
        }}
      >
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <p
            style={{
              color: C.accent,
              fontStyle: "italic",
              fontSize: "3rem",
              fontWeight: 700,
              lineHeight: 1,
              marginBottom: "0.5rem",
            }}
          >
            La Carta
          </p>
          <p
            style={{
              color: C.muted,
              fontSize: "0.85rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              fontFamily: "system-ui, sans-serif",
            }}
          >
            Unsere Speisekarte
          </p>
          <div
            style={{
              width: 36,
              height: 1,
              background: C.accent,
              margin: "1.5rem auto",
              opacity: 0.6,
            }}
          />
          <p
            style={{
              color: C.muted,
              fontSize: "0.9rem",
              lineHeight: 1.8,
              fontFamily: "system-ui, sans-serif",
            }}
          >
            Alle Speisen werden täglich frisch zubereitet. Allergiker und
            Unverträglichkeiten sprechen Sie bitte direkt mit unserem Service an.
          </p>
        </div>
      </section>

      <MenuSection
        title="Antipasti"
        subtitle="Zum Auftakt"
        items={antipasti}
      />
      <MenuSection
        title="Primi Piatti — Pasta & Risotto"
        subtitle="Herzstück der Küche"
        items={primiPiatti}
        altBg
      />
      <MenuSection
        title="Secondi — Fleisch & Fisch"
        subtitle="Hauptgerichte"
        items={secondiPiatti}
      />
      <MenuSection
        title="Dolci"
        subtitle="Zum Abschluss"
        items={dolci}
        altBg
      />

      {/* Bevande */}
      <section
        style={{
          backgroundColor: C.bg,
          padding: "3.5rem 1.5rem",
          borderTop: `1px solid ${C.border}`,
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <Divider />
          <p
            style={{
              color: C.accent,
              fontStyle: "italic",
              fontSize: "1.5rem",
              fontWeight: 700,
              marginBottom: "0.75rem",
            }}
          >
            Bevande
          </p>
          <p
            style={{
              color: C.muted,
              fontSize: "0.9rem",
              lineHeight: 1.8,
              fontFamily: "system-ui, sans-serif",
            }}
          >
            Wir pflegen eine umfangreiche Wein- und Getränkekarte mit
            ausgesuchten italienischen Weinen, regionalen Bierspezialitäten und
            hausgemachten Softdrinks. Unsere Weinkarte erhalten Sie auf Anfrage
            bei Ihrem Servicepersonal.
          </p>
          <Divider />
          <p
            style={{
              color: "#4a4035",
              fontSize: "0.78rem",
              fontFamily: "system-ui, sans-serif",
            }}
          >
            Alle Preise inkl. MwSt. · Änderungen vorbehalten. · Stand: März 2025
          </p>
        </div>
      </section>
    </>
  )
}

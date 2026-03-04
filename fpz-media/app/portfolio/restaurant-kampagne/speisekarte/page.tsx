type MenuItem = { name: string; desc: string; price: string };

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
];

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
];

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
];

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
];

function Divider() {
  return (
    <div className="flex items-center gap-4 my-12">
      <div className="flex-1 h-px bg-[var(--site-border)]" />
      <div className="text-[var(--site-accent)] text-base opacity-70">&#10022;</div>
      <div className="flex-1 h-px bg-[var(--site-border)]" />
    </div>
  );
}

type MenuSectionProps = {
  title: string;
  subtitle: string;
  items: MenuItem[];
  altBg?: boolean;
};

function MenuSection({ title, subtitle, items, altBg }: MenuSectionProps) {
  return (
    <section
      className={`${altBg ? "bg-[var(--site-surface)]" : "bg-[var(--site-bg)]"} px-6 py-16 border-t border-[var(--site-border)]`}
    >
      <div className="max-w-[800px] mx-auto">
        <div className="mb-10">
          <p className="text-[var(--site-accent)] italic text-[0.85rem] tracking-[0.15em] mb-1 font-sans">
            {subtitle}
          </p>
          <h2 className="text-[var(--site-text)] text-[clamp(1.4rem,3vw,2rem)] font-bold">
            {title}
          </h2>
        </div>

        <div className="flex flex-col gap-1">
          {items.map((item, i) => (
            <div key={item.name}>
              <div className="flex justify-between items-start gap-8 py-5">
                <div className="flex-1">
                  <p className="text-[var(--site-text)] text-base italic font-semibold mb-1">
                    {item.name}
                  </p>
                  <p className="text-[var(--site-muted)] text-[0.85rem] leading-relaxed font-sans">
                    {item.desc}
                  </p>
                </div>
                <span className="text-[var(--site-accent)] text-[0.95rem] font-sans font-semibold whitespace-nowrap pt-0.5">
                  {item.price}
                </span>
              </div>
              {i < items.length - 1 && (
                <div className="h-px bg-[var(--site-border)] opacity-50" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function SpeisekartePage() {
  return (
    <>
      {/* Header */}
      <section className="bg-[var(--site-bg)] px-6 pt-20 pb-12 text-center border-b border-[var(--site-border)]">
        <div className="max-w-[700px] mx-auto">
          <p className="text-[var(--site-accent)] italic text-5xl font-bold leading-none mb-2">
            La Carta
          </p>
          <p className="text-[var(--site-muted)] text-[0.85rem] tracking-[0.25em] uppercase font-sans">
            Unsere Speisekarte
          </p>
          <div className="w-9 h-px bg-[var(--site-accent)] mx-auto my-6 opacity-60" />
          <p className="text-[var(--site-muted)] text-[0.9rem] leading-relaxed font-sans">
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
      <section className="bg-[var(--site-bg)] px-6 py-14 border-t border-[var(--site-border)] text-center">
        <div className="max-w-[600px] mx-auto">
          <Divider />
          <p className="text-[var(--site-accent)] italic text-2xl font-bold mb-3">
            Bevande
          </p>
          <p className="text-[var(--site-muted)] text-[0.9rem] leading-relaxed font-sans">
            Wir pflegen eine umfangreiche Wein- und Getränkekarte mit
            ausgesuchten italienischen Weinen, regionalen Bierspezialitäten und
            hausgemachten Softdrinks. Unsere Weinkarte erhalten Sie auf Anfrage
            bei Ihrem Servicepersonal.
          </p>
          <Divider />
          <p className="text-[#4a4035] text-[0.78rem] font-sans">
            Alle Preise inkl. MwSt. &middot; Änderungen vorbehalten. &middot; Stand: März 2025
          </p>
        </div>
      </section>
    </>
  );
}

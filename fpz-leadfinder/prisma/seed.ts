import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";

const adapter = new PrismaLibSql({
  url: process.env.DATABASE_URL ?? "file:./dev.db",
});
const prisma = new PrismaClient({ adapter });

const CITIES = [
  "Bochum", "Bochum", "Bochum", "Bochum", "Bochum",
  "Bochum", "Bochum", "Bochum", "Bochum", "Bochum",
  "Dortmund", "Dortmund", "Dortmund", "Dortmund", "Dortmund",
  "Dortmund", "Dortmund", "Dortmund",
  "Essen", "Essen", "Essen", "Essen", "Essen",
  "Essen", "Essen",
  "Duisburg", "Duisburg", "Duisburg", "Duisburg",
  "Gelsenkirchen", "Gelsenkirchen", "Gelsenkirchen",
  "Oberhausen", "Oberhausen",
  "Herne", "Herne",
  "Hagen", "Hagen",
  "Witten",
  "Recklinghausen", "Recklinghausen",
  "Bottrop",
  "Hamm", "Hamm",
  "Muelheim an der Ruhr",
  "Castrop-Rauxel",
  "Gladbeck",
  "Marl",
  "Luenen",
  "Schwerte",
];

const LEADS_DATA = [
  { name: "Baeckerei Mueller", category: "Baeckerei", address: "Hauptstr. 12", website: "https://www.baeckerei-mueller-bochum.de" },
  { name: "Zahnarztpraxis Dr. Schmidt", category: "Zahnarzt", address: "Alleestr. 45", website: "https://www.dr-schmidt-zahnarzt.de" },
  { name: "Restaurant Da Luigi", category: "Restaurant", address: "Marktplatz 3", website: "https://www.daluigi-bochum.de" },
  { name: "Friseur Haargenau", category: "Friseur", address: "Koenigsallee 78", website: "https://www.haargenau-friseur.de" },
  { name: "Autowerkstatt Krause", category: "Autowerkstatt", address: "Industriestr. 22", website: "https://www.kfz-krause.de" },
  { name: "Optiker Klarblick", category: "Optiker", address: "Bahnhofstr. 5", website: "https://www.optik-klarblick.de" },
  { name: "Blumen Sonnenschein", category: "Blumenladen", address: "Gartenweg 8", website: null },
  { name: "Physiotherapie Vital", category: "Physiotherapie", address: "Gesundheitsplatz 1", website: "https://www.physio-vital-dortmund.de" },
  { name: "Steuerberater Hoffmann", category: "Steuerberater", address: "Finanzstr. 30", website: "https://www.stb-hoffmann.de" },
  { name: "Rechtsanwalt Dr. Weber", category: "Rechtsanwalt", address: "Justizstr. 15", website: "https://www.ra-weber.de" },
  { name: "Kosmetikstudio Glamour", category: "Kosmetikstudio", address: "Schoenheitsgasse 7", website: null },
  { name: "Metzgerei Fleischmann", category: "Metzgerei", address: "Marktstr. 19", website: null },
  { name: "Cafe Bohne", category: "Cafe", address: "Kaffeeplatz 2", website: "https://www.cafe-bohne-essen.de" },
  { name: "Fahrschule Sicher", category: "Fahrschule", address: "Lernweg 11", website: "https://www.fahrschule-sicher.de" },
  { name: "Fitnessstudio PowerHouse", category: "Fitnessstudio", address: "Sportstr. 44", website: "https://www.powerhouse-fitness.de" },
  { name: "Immobilien Goldlage", category: "Immobilienmakler", address: "Wohnstr. 33", website: "https://www.goldlage-immo.de" },
  { name: "Elektriker Blitz", category: "Elektriker", address: "Stromweg 6", website: null },
  { name: "Schlosserei Hartmann", category: "Handwerker", address: "Werkstr. 28", website: null },
  { name: "Apotheke am Markt", category: "Apotheke", address: "Marktplatz 1", website: "https://www.apotheke-am-markt-duisburg.de" },
  { name: "Reinigung Sauber", category: "Reinigung", address: "Putzstr. 9", website: null },
  { name: "Hotel Ruhrtal", category: "Hotel", address: "Uferstr. 50", website: "https://www.hotel-ruhrtal.de" },
  { name: "Fotograf Lichtblick", category: "Fotograf", address: "Bilderstr. 14", website: "https://www.foto-lichtblick.de" },
  { name: "Reisebuero Fernweh", category: "Reisebuero", address: "Urlaubsplatz 4", website: "https://www.fernweh-reisen.de" },
  { name: "Tierarzt Dr. Pfote", category: "Tierarzt", address: "Tierweg 20", website: null },
  { name: "Buchhandlung Lesewurm", category: "Buchhandlung", address: "Buerstr. 16", website: null },
  { name: "Juwelier Goldschmied", category: "Juwelier", address: "Schmuckstr. 25", website: "https://www.juwelier-goldschmied.de" },
  { name: "Malerbetrieb Farbenfroh", category: "Maler", address: "Farbweg 31", website: null },
  { name: "Dachdecker Sturmsicher", category: "Dachdecker", address: "Dachstr. 13", website: null },
  { name: "Klempner Rohrfrei", category: "Klempner", address: "Wasserweg 7", website: null },
  { name: "Restaurant Olympia", category: "Restaurant", address: "Olympiastr. 42", website: "https://www.olympia-restaurant.de" },
  { name: "Baeckerei Krustenbrot", category: "Baeckerei", address: "Brotgasse 8", website: null },
  { name: "Friseur Lockentraum", category: "Friseur", address: "Haarstr. 21", website: "https://www.lockentraum.de" },
  { name: "Zahnarztpraxis Dr. Klein", category: "Zahnarzt", address: "Zahnstr. 18", website: "https://www.dr-klein-zahn.de" },
  { name: "Versicherung SafeGuard", category: "Versicherung", address: "Sicherheitsplatz 10", website: "https://www.safeguard-versicherung.de" },
  { name: "Schlueesseldienst 24h", category: "Schluesseldienst", address: "Notstr. 24", website: null },
  { name: "Cafe Klatsch", category: "Cafe", address: "Plauderstr. 5", website: null },
  { name: "Arztpraxis Dr. Gesund", category: "Arzt", address: "Praxisstr. 37", website: "https://www.dr-gesund.de" },
  { name: "Autowerkstatt Turbo", category: "Autowerkstatt", address: "Rennstr. 55", website: "https://www.kfz-turbo.de" },
  { name: "Schuhgeschaeft Laufglueck", category: "Schuhgeschaeft", address: "Schuhstr. 12", website: null },
  { name: "Bekleidung ModeTrend", category: "Bekleidungsgeschaeft", address: "Modestr. 29", website: "https://www.modetrend-shop.de" },
  { name: "Moebelhaus Wohntraum", category: "Moebelhaus", address: "Einrichtungsstr. 66", website: "https://www.wohntraum-moebel.de" },
  { name: "Supermarkt Frischmarkt", category: "Restaurant", address: "Einkaufsstr. 40", website: null },
  { name: "Physiotherapie Bewegung", category: "Physiotherapie", address: "Therapiestr. 17", website: "https://www.physio-bewegung.de" },
  { name: "Kosmetik Schoenheit", category: "Kosmetikstudio", address: "Beautystr. 23", website: null },
  { name: "Tankstelle Schnelltank", category: "Restaurant", address: "Tankweg 99", website: null },
  { name: "Bank Geldhaus", category: "Restaurant", address: "Bankstr. 1", website: null },
  { name: "Fahrschule Lenkrad", category: "Fahrschule", address: "Fahrstr. 36", website: "https://www.fahrschule-lenkrad.de" },
  { name: "Pension Heimat", category: "Hotel", address: "Heimatstr. 48", website: null },
  { name: "Fitnessstudio IronGym", category: "Fitnessstudio", address: "Muskelstr. 60", website: "https://www.irongym-ruhr.de" },
  { name: "Optiker Durchblick", category: "Optiker", address: "Brillenstr. 34", website: "https://www.optik-durchblick.de" },
];

const STATUSES = [
  ...Array(25).fill("NEW") as string[],
  ...Array(10).fill("CONTACTED") as string[],
  ...Array(7).fill("OFFER_SENT") as string[],
  ...Array(5).fill("WON") as string[],
  ...Array(3).fill("REJECTED") as string[],
];

async function main() {
  console.warn("Seeding database...");

  // Clean
  await prisma.salesScript.deleteMany({});
  await prisma.briefing.deleteMany({});
  await prisma.websiteAnalysis.deleteMany({});
  await prisma.lead.deleteMany({});
  await prisma.scanLog.deleteMany({});
  await prisma.settings.deleteMany({});

  // Create 50 Leads
  const leads = [];
  for (let i = 0; i < 50; i++) {
    const data = LEADS_DATA[i]!;
    const city = CITIES[i]!;
    const status = STATUSES[i] ?? "NEW";

    const lead = await prisma.lead.create({
      data: {
        name: data.name,
        address: data.address,
        city,
        category: data.category,
        website: data.website,
        source: "OSM",
        status,
        phone: Math.random() > 0.3 ? `0234 ${Math.floor(1000000 + Math.random() * 9000000)}` : null,
        email: Math.random() > 0.5 ? `info@${data.name.toLowerCase().replace(/[^a-z]/g, "")}.de` : null,
      },
    });
    leads.push(lead);
  }

  // Create 10 WebsiteAnalysis
  const leadsWithWebsite = leads.filter((l) => l.website);
  for (let i = 0; i < Math.min(10, leadsWithWebsite.length); i++) {
    const lead = leadsWithWebsite[i]!;
    const scores = {
      performanceScore: 30 + Math.floor(Math.random() * 60),
      seoScore: 20 + Math.floor(Math.random() * 60),
      mobileScore: 30 + Math.floor(Math.random() * 50),
      securityScore: 10 + Math.floor(Math.random() * 70),
      designScore: 25 + Math.floor(Math.random() * 55),
      techScore: 20 + Math.floor(Math.random() * 60),
      ageScore: 30 + Math.floor(Math.random() * 50),
      accessibilityScore: 20 + Math.floor(Math.random() * 60),
      contentScore: 25 + Math.floor(Math.random() * 55),
    };
    const overall = Math.round(
      Object.values(scores).reduce((a, b) => a + b, 0) / 9
    );

    await prisma.websiteAnalysis.create({
      data: {
        leadId: lead.id,
        ...scores,
        overallScore: overall,
        details: JSON.stringify({
          performance: { fcp: 2000 + Math.random() * 3000, lcp: 3000 + Math.random() * 4000 },
          seo: { hasTitle: true, hasDescription: Math.random() > 0.3 },
        }),
      },
    });
    await prisma.lead.update({
      where: { id: lead.id },
      data: { overallScore: overall },
    });
  }

  // Create 5 Briefings
  for (let i = 0; i < Math.min(5, leadsWithWebsite.length); i++) {
    const lead = leadsWithWebsite[i]!;
    await prisma.briefing.create({
      data: {
        leadId: lead.id,
        summary: `${lead.name} in ${lead.city} hat eine veraltete Website mit deutlichem Verbesserungspotential in Design und Performance.`,
        weaknesses: JSON.stringify([
          { title: "Veraltetes Design", severity: "high", description: "Die Website wirkt optisch veraltet und nicht zeitgemaess." },
          { title: "Langsame Ladezeit", severity: "medium", description: "Die Seite laedt ueber 4 Sekunden, was Besucher abschreckt." },
          { title: "Nicht mobiloptimiert", severity: "critical", description: "Die Seite ist auf Smartphones kaum benutzbar." },
        ]),
        suggestions: JSON.stringify([
          { title: "Responsive Redesign", description: "Moderne, mobiloptimierte Website erstellen", service: "web" },
          { title: "Professionelle Fotos", description: "Imagefotos fuer die neue Website", service: "media" },
        ]),
        effort: ["SMALL", "MEDIUM", "LARGE"][Math.floor(Math.random() * 3)]!,
        opener: `Guten Tag, hier ist Stevan von FPC-Media. Ich habe mir Ihre Website angeschaut und einige Verbesserungsmoeglichkeiten gefunden, die Ihnen mehr Kunden bringen koennten.`,
        riskScore: 2 + Math.floor(Math.random() * 6),
        fullText: `BRIEFING: ${lead.name}\n\nZusammenfassung und Details...`,
      },
    });
  }

  // Create 3 SalesScripts
  for (let i = 0; i < Math.min(3, leadsWithWebsite.length); i++) {
    const lead = leadsWithWebsite[i]!;
    await prisma.salesScript.create({
      data: {
        leadId: lead.id,
        greeting: `Guten Tag, mein Name ist Stevan von FPC-Media aus Bochum. Spreche ich mit dem Inhaber von ${lead.name}?`,
        hook: `Ich habe mir Ihre Website angeschaut und mir sind ein paar Dinge aufgefallen, die Sie wahrscheinlich potentielle Kunden kosten.`,
        painPoints: JSON.stringify([
          "Ihre Website laedt sehr langsam — ueber 4 Sekunden",
          "Auf dem Smartphone ist die Seite kaum benutzbar",
          "Bei Google sind Sie auf Seite 3 oder weiter hinten",
        ]),
        solution: `Wir bei FPC-Media sind darauf spezialisiert, lokalen Unternehmen im Ruhrgebiet mit modernen, schnellen Websites zu helfen. Wir koennten Ihnen eine komplett neue Website bauen, die auf allen Geraeten perfekt funktioniert.`,
        callToAction: `Haetten Sie diese Woche vielleicht 15 Minuten Zeit fuer ein kurzes Gespraech? Ich zeige Ihnen gerne konkret, was wir fuer ${lead.name} machen koennten — natuerlich voellig unverbindlich.`,
        objections: JSON.stringify([
          { objection: "Wir haben kein Budget", response: "Ich verstehe. Wir bieten flexible Zahlungsmodelle an und unsere Loesungen amortisieren sich schnell durch mehr Kundenanfragen." },
          { objection: "Wir haben schon eine Website", response: "Ja, die habe ich gesehen. Genau deshalb rufe ich an — ich habe ein paar konkrete Verbesserungen gefunden, die Ihnen mehr Kunden bringen koennten." },
          { objection: "Wir haben schon jemanden", response: "Das ist gut! Wir koennten als Ergaenzung arbeiten oder Ihnen einfach eine zweite Meinung geben." },
          { objection: "Wir brauchen keine Website", response: "Heutzutage suchen 80% der Kunden online bevor sie lokal einkaufen. Eine gute Website ist wie ein 24/7-Schaufenster." },
        ]),
        fullScript: `VERKAUFSSKRIPT: ${lead.name}\n\n[BEGRUESSUNG]\n...\n[HOOK]\n...\n[LOESUNG]\n...`,
      },
    });
  }

  // Create 2 ScanLogs
  const now = new Date();
  await prisma.scanLog.create({
    data: {
      cities: JSON.stringify(["Bochum", "Dortmund", "Essen"]),
      newLeads: 35,
      updatedLeads: 12,
      errors: 2,
      duration: 180,
      status: "completed",
      startedAt: new Date(now.getTime() - 24 * 60 * 60 * 1000),
      completedAt: new Date(now.getTime() - 24 * 60 * 60 * 1000 + 180000),
    },
  });
  await prisma.scanLog.create({
    data: {
      cities: JSON.stringify(["Gelsenkirchen", "Oberhausen"]),
      newLeads: 18,
      updatedLeads: 5,
      errors: 0,
      duration: 95,
      status: "completed",
      startedAt: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
      completedAt: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000 + 95000),
    },
  });

  // Create Settings
  await prisma.settings.create({
    data: {
      id: "default",
      defaultCities: JSON.stringify(["Bochum", "Dortmund", "Essen", "Duisburg", "Gelsenkirchen"]),
    },
  });

  console.warn("Seed complete! 50 leads, 10 analyses, 5 briefings, 3 scripts, 2 scan logs.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

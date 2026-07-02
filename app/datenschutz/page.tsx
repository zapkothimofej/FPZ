import type { Metadata } from "next"
import { Nav } from "@/components/Nav"
import { Footer } from "@/components/Footer"

export const metadata: Metadata = {
  title: "Datenschutz",
  description: "Datenschutzhinweise von Fapez Medien / FPZ Web-Media Solutions.",
  alternates: { canonical: "/datenschutz" },
  robots: { index: false, follow: true },
}

export default function DatenschutzPage() {
  return (
    <>
      <Nav />
      <main className="bg-ink min-h-screen pt-28 pb-24 px-6 md:px-12 lg:px-16">
        <div className="max-w-3xl">
          <p className="text-[10px] tracking-[0.28em] uppercase text-gold font-medium mb-4">Rechtliches</p>
          <h1 className="font-display font-light italic text-[clamp(2.5rem,5vw,4.5rem)] leading-tight text-cream mb-16">
            Datenschutz.
          </h1>

          <div className="space-y-12 text-cream/70 text-sm leading-relaxed">
            <Section title="1. Verantwortlicher">
              <p>
                Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:
              </p>
              <p className="mt-3">
                Fapez Medien / FPZ Web-Media Solutions<br />
                Inhaber: Stevan Frei<br />
                Im Siepen 66<br />
                45731 Waltrop<br />
                Deutschland<br />
                E-Mail: kontakt@fapez-medien.de
              </p>
            </Section>

            <Section title="2. Allgemeines zur Datenverarbeitung">
              <p>
                Wir verarbeiten personenbezogene Daten nur, soweit dies zur Bereitstellung einer
                funktionsfähigen Website sowie zur Bearbeitung Ihrer Anfragen erforderlich ist.
                Eine Verarbeitung erfolgt nur auf Grundlage der gesetzlichen Vorgaben (Art. 6 DSGVO).
                Personenbezogene Daten werden gelöscht, sobald der Zweck der Speicherung entfällt und
                keine gesetzlichen Aufbewahrungspflichten entgegenstehen.
              </p>
            </Section>

            <Section title="3. Hosting und Server-Logfiles">
              <p>
                Diese Website wird bei der Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA,
                gehostet. Beim Aufruf der Website werden durch den Hosting-Anbieter automatisch
                technische Zugriffsdaten erhoben und in Server-Logfiles gespeichert: IP-Adresse des
                anfragenden Geräts, Datum und Uhrzeit des Zugriffs, aufgerufene Seite/Datei,
                übertragene Datenmenge, Referrer-URL sowie Browsertyp und Betriebssystem.
              </p>
              <p className="mt-3">
                Die Verarbeitung erfolgt zur Auslieferung der Website, zur Gewährleistung der
                technischen Sicherheit und Stabilität sowie zur Fehleranalyse. Rechtsgrundlage ist
                Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einem sicheren und
                zuverlässigen Betrieb). Mit dem Anbieter besteht ein Vertrag zur Auftragsverarbeitung
                nach Art. 28 DSGVO.
              </p>
            </Section>

            <Section title="4. Kontaktformular">
              <p>
                Wenn Sie uns über das Kontaktformular eine Anfrage senden, verarbeiten wir die von
                Ihnen angegebenen Daten: Name und E-Mail-Adresse (Pflichtangaben), optional
                Telefonnummer, Unternehmen und Art des Projekts sowie den Inhalt Ihrer Nachricht.
                Diese Daten verwenden wir ausschließlich zur Bearbeitung Ihrer Anfrage und der sich
                gegebenenfalls anschließenden Kommunikation.
              </p>
              <p className="mt-3">
                Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage auf den Abschluss
                oder die Durchführung eines Vertrags gerichtet ist, im Übrigen Art. 6 Abs. 1 lit. f
                DSGVO (berechtigtes Interesse an der Beantwortung von Anfragen). Die Übertragung
                erfolgt verschlüsselt (TLS).
              </p>
              <p className="mt-3">
                Für den Versand der Anfrage als E-Mail nutzen wir den Dienst Resend der Resend, Inc.
                (USA) als Auftragsverarbeiter. Ihre Anfrage wird so lange gespeichert, wie dies zur
                Bearbeitung erforderlich ist; anschließend werden die Daten gelöscht, soweit keine
                gesetzlichen Aufbewahrungspflichten bestehen.
              </p>
            </Section>

            <Section title="5. Schutz vor Spam (Rate-Limiting)">
              <p>
                Zum Schutz des Kontaktformulars vor automatisiertem Missbrauch begrenzen wir die
                Anzahl der Anfragen pro Absender. Hierzu wird Ihre IP-Adresse kurzzeitig verarbeitet
                und über den Dienst Upstash (Upstash, Inc., USA) als Auftragsverarbeiter für ein
                begrenztes Zeitfenster zwischengespeichert und danach automatisch gelöscht. Ein
                verstecktes Formularfeld (Honeypot) dient zusätzlich der Bot-Erkennung.
              </p>
              <p className="mt-3">
                Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Abwehr
                von Missbrauch und Spam).
              </p>
            </Section>

            <Section title="6. Datenübermittlung in Drittländer">
              <p>
                Die vorgenannten Dienste (Vercel, Resend, Upstash) können Daten in den USA
                verarbeiten. Soweit eine Übermittlung in die USA stattfindet, stützt sie sich auf
                einen Angemessenheitsbeschluss der EU-Kommission (EU-US Data Privacy Framework),
                sofern der jeweilige Anbieter zertifiziert ist, andernfalls auf
                Standardvertragsklauseln der EU-Kommission nach Art. 46 Abs. 2 lit. c DSGVO. Es kann
                nicht vollständig ausgeschlossen werden, dass US-Behörden auf übermittelte Daten
                zugreifen.
              </p>
            </Section>

            <Section title="7. Schriftarten">
              <p>
                Diese Website verwendet die Schriftarten „Cormorant Garamond“ und „DM Sans“. Die
                Schriften werden lokal von unserem Server ausgeliefert (Self-Hosting über next/font).
                Es wird dabei keine Verbindung zu Servern von Google aufgebaut und es werden keine
                Daten an Google übertragen.
              </p>
            </Section>

            <Section title="8. Bilder">
              <p>
                Eingebundene Bilder werden über die Bildoptimierung unseres Hosting-Anbieters
                serverseitig verarbeitet und von unserer Domain ausgeliefert. Ihr Browser baut dabei
                keine direkte Verbindung zu externen Bildquellen (z. B. Unsplash) auf.
              </p>
            </Section>

            <Section title="9. Cookies und Reichweitenmessung">
              <p>
                Diese Website setzt keine Tracking-, Marketing- oder Analyse-Cookies und verwendet
                keine Web-Analyse- oder Tracking-Dienste. Eine Einwilligung (Cookie-Banner) ist daher
                nicht erforderlich.
              </p>
            </Section>

            <Section title="10. Ihre Rechte">
              <p>
                Sie haben nach der DSGVO folgende Rechte: Auskunft (Art. 15), Berichtigung (Art. 16),
                Löschung (Art. 17), Einschränkung der Verarbeitung (Art. 18), Datenübertragbarkeit
                (Art. 20) sowie Widerspruch gegen die Verarbeitung (Art. 21). Eine erteilte
                Einwilligung können Sie jederzeit mit Wirkung für die Zukunft widerrufen. Zur
                Ausübung Ihrer Rechte genügt eine Nachricht an: kontakt@fapez-medien.de
              </p>
            </Section>

            <Section title="11. Beschwerderecht">
              <p>
                Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde über die
                Verarbeitung Ihrer personenbezogenen Daten zu beschweren. Zuständige Behörde ist:
              </p>
              <p className="mt-3">
                Landesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen<br />
                Kavalleriestraße 2–4, 40213 Düsseldorf<br />
                poststelle@ldi.nrw.de
              </p>
            </Section>

            <Section title="12. Stand und Änderungen">
              <p>
                Wir passen diese Datenschutzerklärung an, sobald Änderungen der Datenverarbeitung
                oder der Rechtslage dies erforderlich machen.<br />
                Stand: Juni 2026.
              </p>
            </Section>
          </div>
        </div>
      </main>
      <Footer variant="web-ki" />
    </>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center gap-4 mb-4">
        <span className="w-3 h-px bg-gold/50 flex-shrink-0" />
        <h2 className="text-xs tracking-[0.18em] uppercase text-cream/40">{title}</h2>
      </div>
      <div className="pl-7 text-cream/65">{children}</div>
    </div>
  )
}

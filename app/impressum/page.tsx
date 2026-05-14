import type { Metadata } from "next"
import { Nav } from "@/components/Nav"
import { Footer } from "@/components/Footer"

export const metadata: Metadata = {
  title: "Impressum",
  robots: { index: false, follow: false },
}

export default function ImpressumPage() {
  return (
    <>
      <Nav />
      <main className="bg-ink min-h-screen pt-28 pb-24 px-6 md:px-12 lg:px-16">
        <div className="max-w-3xl">
          <p className="text-[10px] tracking-[0.28em] uppercase text-gold font-medium mb-4">Rechtliches</p>
          <h1 className="font-display font-light italic text-[clamp(2.5rem,5vw,4.5rem)] leading-tight text-cream mb-16">
            Impressum.
          </h1>

          <div className="space-y-12 text-cream/70 text-sm leading-relaxed">
            <Section title="Angaben gemäß § 5 DDG">
              <p>
                Fapez Medien / FPZ Web-Media Solutions<br />
                Inhaber: Stevan Frei<br />
                Im Siepen 66<br />
                45731 Waltrop<br />
                Deutschland
              </p>
            </Section>

            <Section title="Kontakt">
              <p>E-Mail: stevanfrei@gmail.com</p>
            </Section>

            <Section title="Register und Steuern">
              <p>
                Nicht im Handelsregister eingetragen.<br />
                Umsatzsteuer-Identifikationsnummer: nicht vorhanden.<br />
                Wirtschafts-Identifikationsnummer: nicht vorhanden.
              </p>
            </Section>

            <Section title="Kleinunternehmerregelung">
              <p>
                Gemäß § 19 UStG wird keine Umsatzsteuer berechnet und ausgewiesen
                (Kleinunternehmerregelung).
              </p>
            </Section>

            <Section title="Verantwortlich für eigene Inhalte">
              <p>
                Stevan Frei<br />
                Im Siepen 66<br />
                45731 Waltrop<br />
                Deutschland
              </p>
            </Section>

            <Section title="Haftung für Inhalte">
              <p>
                Die Inhalte dieser Website wurden mit größtmöglicher Sorgfalt erstellt. Für die Richtigkeit,
                Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
                Als Diensteanbieter sind wir nach den allgemeinen Gesetzen für eigene Inhalte auf diesen Seiten
                verantwortlich.
              </p>
            </Section>

            <Section title="Urheberrecht">
              <p>
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen
                dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art
                der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen
                Zustimmung des jeweiligen Autors bzw. Erstellers.
              </p>
            </Section>

            <Section title="Bildnachweise">
              <p>
                Einzelne Bildmotive können von Unsplash stammen. Soweit nicht anders angegeben,
                liegen die Rechte an eigenen Texten, Designs und Medien bei Fapez Medien.
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

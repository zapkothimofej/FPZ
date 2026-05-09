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
            <Section title="Angaben gemäß § 5 TMG">
              <p>Stevan Fre<br />Im Siepen 66<br />45731 Waltrop</p>
            </Section>

            <Section title="Kontakt">
              <p>E-Mail: kontakt@fpz.de</p>
            </Section>

            <Section title="Umsatzsteuer">
              <p>
                Gemäß § 19 UStG wird keine Umsatzsteuer berechnet und ausgewiesen
                (Kleinunternehmerregelung).
              </p>
            </Section>

            <Section title="Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV">
              <p>Stevan Fre<br />Im Siepen 66<br />45731 Waltrop</p>
            </Section>

            <Section title="Haftungsausschluss">
              <p>
                Die Inhalte dieser Website wurden mit größtmöglicher Sorgfalt erstellt. Für die Richtigkeit,
                Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
                Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten
                nach den allgemeinen Gesetzen verantwortlich.
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
        <h2 className="text-xs tracking-[0.18em] uppercase text-cream/62">{title}</h2>
      </div>
      <div className="pl-7 text-cream/78">{children}</div>
    </div>
  )
}

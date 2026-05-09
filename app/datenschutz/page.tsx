import type { Metadata } from "next"
import { Nav } from "@/components/Nav"
import { Footer } from "@/components/Footer"

export const metadata: Metadata = {
  title: "Datenschutz",
  robots: { index: false, follow: false },
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
            <Section title="Verantwortlicher">
              <p>
                Stevan Fre<br />
                Im Siepen 66<br />
                45731 Waltrop<br />
                E-Mail: kontakt@fpz.de
              </p>
            </Section>

            <Section title="Erhebung und Verarbeitung personenbezogener Daten">
              <p>
                Wir erheben personenbezogene Daten, wenn Sie uns diese im Rahmen des
                Kontaktformulars freiwillig mitteilen. Dies umfasst je nach Formular
                Name, E-Mail-Adresse, Telefonnummer, Unternehmen und die Inhalte Ihrer
                Nachricht. Diese Daten verwenden wir zur Bearbeitung Ihrer Anfrage.
              </p>
            </Section>

            <Section title="Kontaktformular">
              <p>
                Die Übermittlung des Kontaktformulars erfolgt über den Dienst FormSubmit
                (formsubmit.co). Ihre Eingaben werden an FormSubmit übertragen und per
                E-Mail an uns weitergeleitet. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO.
              </p>
            </Section>

            <Section title="Hosting">
              <p>
                Diese Website wird bei Vercel Inc., 340 Pine Street, Suite 1200, San Francisco,
                CA 94104, USA gehostet. Beim Aufruf der Website werden technische Zugriffsdaten
                (IP-Adresse, Zeitpunkt, aufgerufene Seite) in Server-Logs gespeichert.
                Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO.
              </p>
            </Section>

            <Section title="Cookies">
              <p>
                Diese Website verwendet kein Web-Analytics und setzt selbst keine
                Marketing- oder Tracking-Cookies.
              </p>
            </Section>

            <Section title="Ihre Rechte">
              <p>
                Sie haben das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung
                der Verarbeitung Ihrer personenbezogenen Daten sowie das Recht auf
                Datenübertragbarkeit. Wenden Sie sich dazu an: kontakt@fpz.de
              </p>
            </Section>

            <Section title="Beschwerderecht">
              <p>
                Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde über die
                Verarbeitung Ihrer Daten zu beschweren. Die zuständige Aufsichtsbehörde
                für NRW ist die Landesbeauftragte für Datenschutz und Informationsfreiheit
                Nordrhein-Westfalen.
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

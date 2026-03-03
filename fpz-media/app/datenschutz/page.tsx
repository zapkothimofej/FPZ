import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description: "Datenschutzerklärung gemäß DSGVO für FPZ Media, Digitalagentur im Ruhrgebiet.",
  robots: { index: true, follow: false },
  alternates: { canonical: "https://fpz-media.de/datenschutz" },
}

export default function DatenschutzPage() {
  return (
    <div
      style={{ backgroundColor: "#111111", minHeight: "100vh" }}
      className="flex flex-col"
    >
      <div className="max-w-2xl mx-auto px-6 py-20 w-full">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white/40 hover:text-white/80 text-sm transition-colors mb-12"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Zurück zur Startseite
        </Link>

        <h1 className="text-white text-4xl font-bold mb-10">Datenschutzerklärung</h1>

        <div className="flex flex-col gap-8 text-white/70 text-sm leading-relaxed">

          <section>
            <h2 className="text-white text-base font-semibold mb-2">1. Verantwortlicher</h2>
            <p>
              FPZ Media<br />
              [Straße und Hausnummer]<br />
              [PLZ] [Stadt], Deutschland<br />
              E-Mail:{" "}
              <a
                href="mailto:hallo@fpz-media.de"
                className="text-white/90 hover:text-white underline underline-offset-2"
              >
                hallo@fpz-media.de
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-white text-base font-semibold mb-2">2. Erhebung und Verarbeitung personenbezogener Daten</h2>
            <p>
              Wir erheben personenbezogene Daten nur, soweit dies zur Bereitstellung unserer Leistungen
              erforderlich ist. Beim Absenden des Kontaktformulars werden Name, E-Mail-Adresse und der
              Inhalt deiner Nachricht verarbeitet, um deine Anfrage zu beantworten (Art. 6 Abs. 1 lit. b
              DSGVO).
            </p>
          </section>

          <section>
            <h2 className="text-white text-base font-semibold mb-2">3. Hosting</h2>
            <p>
              Diese Website wird bei Vercel Inc., 340 Pine Street, Suite 1300, San Francisco, CA 94104,
              USA gehostet. Vercel verarbeitet dabei technisch notwendige Server-Logfiles. Weitere
              Informationen:{" "}
              <a
                href="https://vercel.com/legal/privacy-policy"
                className="text-white/90 hover:text-white underline underline-offset-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                Vercel Privacy Policy
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-white text-base font-semibold mb-2">4. Analyse</h2>
            <p>
              Wir nutzen Vercel Analytics zur anonymen Auswertung des Website-Traffics. Es werden keine
              personenbezogenen Daten gespeichert und keine Cookies gesetzt. Rechtsgrundlage ist unser
              berechtigtes Interesse an der Analyse der Website-Nutzung (Art. 6 Abs. 1 lit. f DSGVO).
            </p>
          </section>

          <section>
            <h2 className="text-white text-base font-semibold mb-2">5. Deine Rechte</h2>
            <p>
              Du hast das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung,
              Datenübertragbarkeit und Widerspruch. Wende dich dafür an:{" "}
              <a
                href="mailto:hallo@fpz-media.de"
                className="text-white/90 hover:text-white underline underline-offset-2"
              >
                hallo@fpz-media.de
              </a>
              . Du hast außerdem das Recht, dich bei der zuständigen Datenschutzaufsichtsbehörde zu
              beschweren.
            </p>
          </section>

          <section>
            <h2 className="text-white text-base font-semibold mb-2">6. Aktualität dieser Erklärung</h2>
            <p>Stand: März 2025</p>
          </section>

          <p className="text-white/30 text-xs border-t border-white/10 pt-6">
            Hinweis: Diese Datenschutzerklärung ist ein Entwurf. Bitte lass sie vor dem Go-Live durch
            einen Rechtsanwalt prüfen und ergänze alle mit [Platzhalter] markierten Felder.
          </p>
        </div>
      </div>
    </div>
  )
}

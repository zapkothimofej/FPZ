import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum und Anbieterkennzeichnung gemäß § 5 TMG für FPZ Media, Digitalagentur im Ruhrgebiet.",
  robots: { index: true, follow: false },
  alternates: { canonical: "https://fpz-media.de/impressum" },
}

export default function ImpressumPage() {
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

        <h1 className="text-white text-4xl font-bold mb-10">Impressum</h1>

        <div className="flex flex-col gap-8 text-white/70 text-sm leading-relaxed">

          <section>
            <h2 className="text-white text-base font-semibold mb-2">Angaben gemäß § 5 TMG</h2>
            <p>
              FPZ Media<br />
              [Straße und Hausnummer]<br />
              [PLZ] [Stadt]<br />
              Deutschland
            </p>
          </section>

          <section>
            <h2 className="text-white text-base font-semibold mb-2">Kontakt</h2>
            <p>
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
            <h2 className="text-white text-base font-semibold mb-2">
              Verantwortlich für den Inhalt (§ 55 Abs. 2 RStV)
            </h2>
            <p>
              [Vollständiger Name]<br />
              [Anschrift wie oben]
            </p>
          </section>

          <section>
            <h2 className="text-white text-base font-semibold mb-2">Haftungsausschluss</h2>
            <p>
              Die Inhalte dieser Website wurden mit größtmöglicher Sorgfalt erstellt. Für die
              Richtigkeit, Vollständigkeit und Aktualität der Inhalte kann keine Gewähr übernommen
              werden. Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf
              diesen Seiten nach den allgemeinen Gesetzen verantwortlich.
            </p>
          </section>

          <section>
            <h2 className="text-white text-base font-semibold mb-2">Urheberrecht</h2>
            <p>
              Die durch den Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten
              unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung
              und jede Art der Verwertung außerhalb der Grenzen des Urheberrechts bedürfen der
              schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
            </p>
          </section>

          <p className="text-white/30 text-xs border-t border-white/10 pt-6">
            Hinweis: Bitte ergänze die mit [Platzhalter] markierten Felder mit deinen echten
            Angaben vor dem Go-Live (§ 5 TMG Pflicht).
          </p>
        </div>
      </div>
    </div>
  )
}

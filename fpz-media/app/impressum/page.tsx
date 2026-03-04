import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum und Anbieterkennzeichnung der FPZ Media Digitalagentur im Ruhrgebiet.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/impressum" },
}

export default function ImpressumPage() {
  return (
    <div
      style={{ backgroundColor: "#111111", minHeight: "100vh" }}
      className="flex flex-col"
    >
      <article className="max-w-2xl mx-auto px-6 py-20 w-full">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white/40 hover:text-white/80 text-sm transition-colors mb-12"
        >
          <svg
            aria-hidden="true"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Zurück zur Startseite
        </Link>

        <h1 className="text-white text-4xl font-bold mb-12">Impressum</h1>

        {/* §5 TMG */}
        <section className="mb-10">
          <h2 className="text-white text-xl font-semibold mb-4">Angaben gemäß § 5 TMG</h2>
          <p className="text-white/70 leading-relaxed">
            Stevan Frei<br />
            Im Siepen 66<br />
            45731 Waltrop
          </p>
        </section>

        {/* Kontakt */}
        <section className="mb-10">
          <h2 className="text-white text-xl font-semibold mb-4">Kontakt</h2>
          <p className="text-white/70 leading-relaxed">
            Telefon: <a href="tel:+4917655692511" className="text-white/80 hover:text-white transition-colors">+49 176 55692511</a><br />
            E-Mail: <a href="mailto:stevanfrei@gmail.com" className="text-white/80 hover:text-white transition-colors">stevanfrei@gmail.com</a>
          </p>
        </section>

        {/* Umsatzsteuer */}
        <section className="mb-10">
          <h2 className="text-white text-xl font-semibold mb-4">Umsatzsteuer-Hinweis</h2>
          <p className="text-white/70 leading-relaxed">
            Gemäß § 19 UStG wird keine Umsatzsteuer berechnet (Kleinunternehmerregelung).
            Eine Umsatzsteuer-Identifikationsnummer liegt daher nicht vor.
          </p>
        </section>

        {/* §18 Abs. 2 MStV */}
        <section className="mb-10">
          <h2 className="text-white text-xl font-semibold mb-4">
            Verantwortlich für journalistisch-redaktionelle Inhalte gemäß § 18 Abs. 2 MStV
          </h2>
          <p className="text-white/70 leading-relaxed">
            Stevan Frei<br />
            Im Siepen 66<br />
            45731 Waltrop
          </p>
        </section>

        {/* Haftung für Inhalte */}
        <section className="mb-10">
          <h2 className="text-white text-xl font-semibold mb-4">Haftung für Inhalte</h2>
          <p className="text-white/70 leading-relaxed">
            Als Diensteanbieter bin ich gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen
            Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG bin ich
            als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde
            Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige
            Tätigkeit hinweisen.
          </p>
          <p className="text-white/70 leading-relaxed mt-3">
            Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den
            allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch
            erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei
            Bekanntwerden von entsprechenden Rechtsverletzungen werde ich diese Inhalte umgehend
            entfernen.
          </p>
        </section>

        {/* Haftung für Links */}
        <section className="mb-10">
          <h2 className="text-white text-xl font-semibold mb-4">Haftung für Links</h2>
          <p className="text-white/70 leading-relaxed">
            Mein Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte ich keinen
            Einfluss habe. Deshalb kann ich für diese fremden Inhalte auch keine Gewähr übernehmen.
            Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber
            der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung
            auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der
            Verlinkung nicht erkennbar.
          </p>
          <p className="text-white/70 leading-relaxed mt-3">
            Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete
            Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von
            Rechtsverletzungen werde ich derartige Links umgehend entfernen.
          </p>
        </section>

        {/* Urheberrecht */}
        <section className="mb-10">
          <h2 className="text-white text-xl font-semibold mb-4">Urheberrecht</h2>
          <p className="text-white/70 leading-relaxed">
            Die durch den Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten
            unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung
            und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der
            schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien
            dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
          </p>
          <p className="text-white/70 leading-relaxed mt-3">
            Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die
            Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche
            gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam
            werden, bitte ich um einen entsprechenden Hinweis. Bei Bekanntwerden von
            Rechtsverletzungen werde ich derartige Inhalte umgehend entfernen.
          </p>
        </section>

        <p className="text-white/30 text-sm mt-16">
          Stand: März 2026
        </p>
      </article>
    </div>
  )
}

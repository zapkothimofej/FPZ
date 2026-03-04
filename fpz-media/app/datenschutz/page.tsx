import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description: "Datenschutzerklärung der FPZ Media Digitalagentur. Informationen zum Umgang mit personenbezogenen Daten.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/datenschutz" },
}

export default function DatenschutzPage() {
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

        <h1 className="text-white text-4xl font-bold mb-4">Datenschutzerklärung</h1>
        <p className="text-white/40 text-sm mb-12">Stand: März 2026</p>

        {/* 1. Verantwortlicher */}
        <section className="mb-10">
          <h2 className="text-white text-xl font-semibold mb-4">1. Verantwortlicher</h2>
          <p className="text-white/70 leading-relaxed">
            Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:
          </p>
          <p className="text-white/70 leading-relaxed mt-3">
            Stevan Frei<br />
            Im Siepen 66<br />
            45731 Waltrop<br />
            E-Mail: <a href="mailto:stevanfrei@gmail.com" className="text-white/80 hover:text-white transition-colors">stevanfrei@gmail.com</a><br />
            Telefon: <a href="tel:+4917655692511" className="text-white/80 hover:text-white transition-colors">+49 176 55692511</a>
          </p>
        </section>

        {/* 2. Allgemeines */}
        <section className="mb-10">
          <h2 className="text-white text-xl font-semibold mb-4">2. Allgemeine Hinweise</h2>
          <p className="text-white/70 leading-relaxed">
            Diese Website verwendet <strong className="text-white/90">keine Cookies</strong> und
            kein Google Analytics. Es werden so wenig personenbezogene Daten wie möglich erhoben.
            Sofern auf dieser Seite personenbezogene Daten (z. B. Name, Anschrift oder
            E-Mail-Adresse) erhoben werden, erfolgt dies, soweit möglich, stets auf freiwilliger
            Basis und nur zur Erfüllung des jeweiligen Zwecks (z. B. Bearbeitung Ihrer Anfrage).
          </p>
        </section>

        {/* 3. Hosting */}
        <section className="mb-10">
          <h2 className="text-white text-xl font-semibold mb-4">3. Hosting – Vercel</h2>
          <p className="text-white/70 leading-relaxed">
            Diese Website wird bei <strong className="text-white/90">Vercel Inc.</strong> (340 Pine
            Street, Suite 701, San Francisco, CA 94104, USA) gehostet. Beim Aufruf der Website
            werden automatisch technische Zugriffsdaten (IP-Adresse, Browsertyp, Uhrzeit,
            aufgerufene URL) auf Vercel-Servern verarbeitet.
          </p>
          <p className="text-white/70 leading-relaxed mt-3">
            Da Vercel ein US-amerikanisches Unternehmen ist, erfolgt die Datenübertragung in ein
            Drittland. Die Übermittlung ist durch die EU-Standardvertragsklauseln (SCCs) gemäß
            Art. 46 Abs. 2 lit. c DSGVO abgesichert. Vercel ist außerdem nach dem EU-US Data
            Privacy Framework (Angemessenheitsbeschluss der EU-Kommission vom 10. Juli 2023)
            zertifiziert.
          </p>
          <p className="text-white/70 leading-relaxed mt-3">
            Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse am sicheren und
            funktionsfähigen Betrieb der Website).
          </p>
        </section>

        {/* 4. Vercel Analytics */}
        <section className="mb-10">
          <h2 className="text-white text-xl font-semibold mb-4">4. Vercel Analytics</h2>
          <p className="text-white/70 leading-relaxed">
            Diese Website nutzt <strong className="text-white/90">Vercel Analytics</strong>, ein
            datenschutzfreundliches Web-Analyse-Tool. Vercel Analytics setzt{" "}
            <strong className="text-white/90">keine Cookies</strong> und erhebt{" "}
            <strong className="text-white/90">keine personenbezogenen Daten</strong> im
            datenschutzrechtlichen Sinne. Es werden ausschließlich aggregierte, anonymisierte
            Kennzahlen (Seitenaufrufe, Herkunftsland auf Länderebene, Gerätekategorie) erhoben.
            Eine Identifikation einzelner Personen ist nicht möglich.
          </p>
          <p className="text-white/70 leading-relaxed mt-3">
            Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der
            Verbesserung des Webangebots).
          </p>
        </section>

        {/* 5. Kontaktformular */}
        <section className="mb-10">
          <h2 className="text-white text-xl font-semibold mb-4">5. Kontaktformular</h2>
          <p className="text-white/70 leading-relaxed">
            Wenn Sie das Kontaktformular nutzen, werden die von Ihnen eingegebenen Daten
            (Name, E-Mail-Adresse, Nachricht sowie optionale Angaben zu Telefonnummer,
            Unternehmen und gewünschter Leistung) an mich übermittelt.
          </p>
          <p className="text-white/70 leading-relaxed mt-3">
            Die Daten werden über einen{" "}
            <strong className="text-white/90">n8n-Webhook</strong> (n8n Cloud, Betreiber: n8n GmbH,
            Bülowstraße 66, 10783 Berlin) verarbeitet, um Ihre Anfrage entgegenzunehmen und zu
            bearbeiten. Die Daten werden ausschließlich zur Bearbeitung Ihrer Anfrage verwendet
            und nicht an weitere Dritte weitergegeben.
          </p>
          <p className="text-white/70 leading-relaxed mt-3">
            Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (Vertragsanbahnung) bzw. Art. 6 Abs. 1
            lit. f DSGVO (berechtigtes Interesse an der Beantwortung von Anfragen). Die
            übermittelten Daten verbleiben bei mir, bis Sie mich zur Löschung auffordern oder
            der Zweck der Datenspeicherung entfällt (z. B. nach abgeschlossener Bearbeitung Ihrer
            Anfrage). Zwingende gesetzliche Bestimmungen – insbesondere Aufbewahrungsfristen –
            bleiben unberührt.
          </p>
        </section>

        {/* 6. Rechte */}
        <section className="mb-10">
          <h2 className="text-white text-xl font-semibold mb-4">
            6. Ihre Rechte als betroffene Person
          </h2>
          <p className="text-white/70 leading-relaxed mb-4">
            Sie haben gegenüber dem Verantwortlichen folgende Rechte hinsichtlich der Sie
            betreffenden personenbezogenen Daten:
          </p>
          <ul className="space-y-2 text-white/70 leading-relaxed">
            <li className="flex gap-2">
              <span className="text-white/40 shrink-0">—</span>
              <span>
                <strong className="text-white/90">Auskunftsrecht</strong> (Art. 15 DSGVO): Sie können
                Auskunft über Ihre von uns verarbeiteten personenbezogenen Daten verlangen.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-white/40 shrink-0">—</span>
              <span>
                <strong className="text-white/90">Recht auf Berichtigung</strong> (Art. 16 DSGVO):
                Sie können unverzügliche Berichtigung unrichtiger oder Vervollständigung
                unvollständiger Daten verlangen.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-white/40 shrink-0">—</span>
              <span>
                <strong className="text-white/90">Recht auf Löschung</strong> (Art. 17 DSGVO): Sie
                können die Löschung Ihrer personenbezogenen Daten verlangen, sofern keine
                gesetzliche Aufbewahrungspflicht entgegensteht.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-white/40 shrink-0">—</span>
              <span>
                <strong className="text-white/90">Recht auf Einschränkung der Verarbeitung</strong>{" "}
                (Art. 18 DSGVO): Sie können die Einschränkung der Verarbeitung Ihrer Daten verlangen.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-white/40 shrink-0">—</span>
              <span>
                <strong className="text-white/90">Recht auf Datenübertragbarkeit</strong> (Art. 20
                DSGVO): Sie können verlangen, dass die von Ihnen bereitgestellten Daten in einem
                strukturierten, maschinenlesbaren Format herausgegeben werden.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-white/40 shrink-0">—</span>
              <span>
                <strong className="text-white/90">Widerspruchsrecht</strong> (Art. 21 DSGVO): Sie
                können der Verarbeitung Ihrer personenbezogenen Daten widersprechen, soweit diese
                auf Basis von Art. 6 Abs. 1 lit. f DSGVO erfolgt.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-white/40 shrink-0">—</span>
              <span>
                <strong className="text-white/90">Beschwerderecht</strong> (Art. 77 DSGVO): Sie haben
                das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren. Zuständig ist
                die Landesbeauftragte für Datenschutz und Informationsfreiheit
                Nordrhein-Westfalen (LDI NRW).
              </span>
            </li>
          </ul>
          <p className="text-white/70 leading-relaxed mt-4">
            Um Ihre Rechte wahrzunehmen, wenden Sie sich bitte an:{" "}
            <a href="mailto:stevanfrei@gmail.com" className="text-white/80 hover:text-white transition-colors">
              stevanfrei@gmail.com
            </a>
          </p>
        </section>

        {/* 7. Aktualität */}
        <section className="mb-10">
          <h2 className="text-white text-xl font-semibold mb-4">7. Aktualität dieser Erklärung</h2>
          <p className="text-white/70 leading-relaxed">
            Diese Datenschutzerklärung ist aktuell gültig. Durch die Weiterentwicklung der Website
            oder aufgrund geänderter gesetzlicher bzw. behördlicher Vorgaben kann es notwendig
            werden, diese Datenschutzerklärung zu ändern.
          </p>
        </section>
      </article>
    </div>
  )
}

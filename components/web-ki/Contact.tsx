"use client"

import { useState } from "react"
import { FadeIn } from "@/components/FadeIn"
import { Field } from "@/components/Field"

export function WebKiContact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("sending")

    const form = e.currentTarget
    const data = new FormData(form)

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          kind: "web-ki",
          website: data.get("website"),
          name: data.get("name"),
          email: data.get("email"),
          company: data.get("company"),
          message: data.get("message"),
        }),
      })

      const json = await res.json()
      if (res.ok && (json.success === "true" || json.success === true)) {
        setStatus("sent")
        form.reset()
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  return (
    <section id="kontakt" className="bg-ink py-24 md:py-36 px-6 md:px-12 lg:px-16">
      <div className="max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

        {/* Left — info */}
        <FadeIn>
          <p className="text-[10px] tracking-[0.28em] uppercase text-gold font-medium mb-4">
            Kontakt
          </p>
          <h2 className="font-display font-light italic text-[clamp(2.5rem,5vw,4.5rem)] leading-tight text-cream mb-8">
            Projekt starten.
          </h2>
          <p className="text-cream/50 text-sm md:text-base leading-relaxed max-w-sm mb-12">
            Beschreiben Sie Ihr Vorhaben. Wir melden uns innerhalb von 24 Stunden mit einer konkreten Einschätzung.
          </p>

          <div className="space-y-6">
            {[
              { label: "E-Mail", value: "stevanfrei@gmail.com" },
              { label: "Standort", value: "Im Siepen 66, 45731 Waltrop / Bochum, NRW" },
              { label: "Reaktionszeit", value: "< 24 Stunden" },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-4">
                <span className="w-3 h-px bg-gold/50 mt-[0.65em] flex-shrink-0" />
                <div>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-cream/30 mb-0.5">{item.label}</p>
                  <p className="text-cream/70 text-sm">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Right — form */}
        <FadeIn delay={0.1}>
          {status === "sent" ? (
            <div className="h-full flex flex-col justify-center py-12">
              <div className="h-px bg-gold/30 w-12 mb-8" />
              <p className="font-display font-light italic text-[clamp(1.8rem,3vw,2.5rem)] text-cream mb-3">
                Nachricht erhalten.
              </p>
              <p className="text-cream/40 text-sm">Wir melden uns bald bei Ihnen.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="Name" name="name" type="text" required placeholder="Max Mustermann" />
                <Field label="Unternehmen" name="company" type="text" placeholder="Musterfirma GmbH" />
              </div>
              <Field label="E-Mail" name="email" type="email" required placeholder="max@musterfirma.de" />
              <div className="space-y-1.5">
                <label htmlFor="message" className="block text-[10px] tracking-[0.18em] uppercase text-cream/60">
                  Nachricht
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  aria-required={true}
                  rows={5}
                  placeholder="Erzählen Sie uns von Ihrem Projekt…"
                  className="w-full px-4 py-3 text-sm bg-white/[0.04] border border-white/10 text-cream placeholder:text-cream/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-1 focus-visible:ring-offset-ink focus:border-gold/50 transition-colors resize-none rounded-lg"
                />
              </div>

              {status === "error" && (
                <p role="alert" className="text-sm text-red-400">
                  Fehler beim Senden. Bitte schreiben Sie direkt an stevanfrei@gmail.com.
                </p>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full py-4 text-xs tracking-[0.15em] uppercase font-medium bg-cream text-ink hover:bg-white transition-colors disabled:opacity-50 rounded-full"
              >
                {status === "sending" ? "Wird gesendet…" : "Nachricht senden"}
              </button>
            </form>
          )}
        </FadeIn>
      </div>
    </section>
  )
}

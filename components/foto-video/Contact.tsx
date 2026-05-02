"use client"

import { useState } from "react"
import { FadeIn } from "@/components/FadeIn"

export function FotoVideoContact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("sending")

    const form = e.currentTarget
    const data = new FormData(form)

    try {
      const res = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      })

      if (res.ok) {
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
            Anfragen
          </p>
          <h2 className="font-display font-light italic text-[clamp(2.5rem,5vw,4.5rem)] leading-tight text-cream mb-8">
            Angebot anfragen.
          </h2>
          <p className="text-cream/50 text-sm md:text-base leading-relaxed max-w-sm mb-12">
            Erzählen Sie uns von Ihrem Projekt. Wir erstellen innerhalb von 24 Stunden ein unverbindliches Angebot.
          </p>

          <div className="space-y-6">
            {[
              { label: "E-Mail", value: "kontakt@fpz.de" },
              { label: "Standort", value: "Bochum, NRW" },
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
                Anfrage erhalten.
              </p>
              <p className="text-cream/40 text-sm">Wir melden uns bald bei Ihnen.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="Name" name="name" type="text" required placeholder="Max Mustermann" />
                <Field label="Telefon" name="phone" type="tel" placeholder="+49 123 456789" />
              </div>
              <Field label="E-Mail" name="email" type="email" required placeholder="max@example.de" />

              <div className="space-y-1.5">
                <label className="block text-[10px] tracking-[0.18em] uppercase text-cream/35">
                  Art des Projekts
                </label>
                <div className="relative">
                  <select
                    name="project_type"
                    className="w-full px-4 py-3 text-sm bg-white/[0.04] border border-white/10 text-cream focus:outline-none focus:border-gold/50 transition-colors appearance-none cursor-pointer rounded-lg"
                  >
                    <option value="" className="bg-ink">Bitte wählen…</option>
                    <option value="produktfotografie" className="bg-ink">Produktfotografie</option>
                    <option value="imagefilm" className="bg-ink">Imagefilm</option>
                    <option value="event" className="bg-ink">Event-Dokumentation</option>
                    <option value="social" className="bg-ink">Social Media Content</option>
                    <option value="sonstiges" className="bg-ink">Sonstiges</option>
                  </select>
                  <svg
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-cream/30 pointer-events-none"
                    width="12" height="12" viewBox="0 0 12 12" fill="none"
                  >
                    <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] tracking-[0.18em] uppercase text-cream/35">
                  Projektbeschreibung
                </label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  placeholder="Beschreiben Sie Ihr Projekt, Zeitplan und Budget…"
                  className="w-full px-4 py-3 text-sm bg-white/[0.04] border border-white/10 text-cream placeholder:text-cream/25 focus:outline-none focus:border-gold/50 transition-colors resize-none rounded-lg"
                />
              </div>

              {status === "error" && (
                <p className="text-sm text-red-400">
                  Fehler beim Senden. Bitte versuchen Sie es erneut.
                </p>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full py-4 text-xs tracking-[0.15em] uppercase font-medium bg-white text-ink hover:bg-cream transition-colors disabled:opacity-50 rounded-full"
              >
                {status === "sending" ? "Wird gesendet…" : "Angebot anfragen"}
              </button>
            </form>
          )}
        </FadeIn>
      </div>
    </section>
  )
}

function Field({
  label,
  name,
  type,
  required,
  placeholder,
}: {
  label: string
  name: string
  type: string
  required?: boolean
  placeholder?: string
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-[10px] tracking-[0.18em] uppercase text-cream/35">
        {label}
        {required && <span className="ml-1 text-gold/70">*</span>}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="w-full px-4 py-3 text-sm bg-white/[0.04] border border-white/10 text-cream placeholder:text-cream/25 focus:outline-none focus:border-gold/50 transition-colors rounded-lg"
      />
    </div>
  )
}

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
    <section id="kontakt" className="py-24 md:py-36 px-8 md:px-16 lg:px-24">
      <div className="max-w-2xl mx-auto">
        <FadeIn>
          <p className="text-xs tracking-[0.25em] uppercase text-muted mb-4">Kontakt</p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-ink dark:text-cream mb-4 leading-tight">
            Angebot anfragen.
          </h2>
          <p className="text-mid dark:text-muted mb-12 leading-relaxed">
            Erzählen Sie uns von Ihrem Projekt. Wir erstellen Ihnen
            innerhalb von 24 Stunden ein unverbindliches Angebot.
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          {status === "sent" ? (
            <div className="py-12 text-center">
              <p className="text-2xl font-semibold text-ink dark:text-cream mb-2">Anfrage erhalten.</p>
              <p className="text-mid dark:text-muted">Wir melden uns bald.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="Name" name="name" type="text" required placeholder="Max Mustermann" />
                <Field label="Telefon" name="phone" type="tel" placeholder="+49 123 456789" />
              </div>
              <Field label="E-Mail" name="email" type="email" required placeholder="max@example.de" />

              <div className="space-y-1.5">
                <label className="block text-xs tracking-[0.1em] uppercase text-muted">
                  Art des Projekts
                </label>
                <select
                  name="project_type"
                  className="w-full px-4 py-3 text-sm bg-off-white dark:bg-stone/10 border border-stone dark:border-stone/20 rounded-xl text-ink dark:text-cream focus:outline-none focus:border-ink dark:focus:border-cream transition-colors appearance-none cursor-pointer"
                >
                  <option value="">Bitte wählen…</option>
                  <option value="produktfotografie">Produktfotografie</option>
                  <option value="imagefilm">Imagefilm</option>
                  <option value="event">Event-Dokumentation</option>
                  <option value="social">Social Media Content</option>
                  <option value="sonstiges">Sonstiges</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs tracking-[0.1em] uppercase text-muted">
                  Projektbeschreibung
                </label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  placeholder="Beschreiben Sie Ihr Projekt, Ihren Zeitplan und Ihr Budget…"
                  className="w-full px-4 py-3 text-sm bg-off-white dark:bg-stone/10 border border-stone dark:border-stone/20 rounded-xl text-ink dark:text-cream placeholder:text-muted focus:outline-none focus:border-ink dark:focus:border-cream transition-colors resize-none"
                />
              </div>

              {status === "error" && (
                <p className="text-sm text-red-500">
                  Fehler beim Senden. Bitte versuchen Sie es erneut.
                </p>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full py-4 text-sm font-medium bg-ink text-cream dark:bg-cream dark:text-ink rounded-full hover:opacity-80 transition-opacity disabled:opacity-50"
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
      <label className="block text-xs tracking-[0.1em] uppercase text-muted">
        {label}
        {required && <span className="ml-1 text-ink dark:text-cream">*</span>}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="w-full px-4 py-3 text-sm bg-off-white dark:bg-stone/10 border border-stone dark:border-stone/20 rounded-xl text-ink dark:text-cream placeholder:text-muted focus:outline-none focus:border-ink dark:focus:border-cream transition-colors"
      />
    </div>
  )
}

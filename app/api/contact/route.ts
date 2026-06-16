import { NextResponse } from "next/server"
import { checkRateLimit } from "@/lib/rate-limit"

type ContactKind = "web-ki" | "foto-video"

const subjects: Record<ContactKind, string> = {
  "web-ki": "Neue Anfrage - FPZ Web & KI",
  "foto-video": "Neue Anfrage - FPZ Foto & Video",
}

const kindLabels: Record<ContactKind, string> = {
  "web-ki": "Web & KI",
  "foto-video": "Foto & Video",
}

const maxLength = {
  name: 120,
  email: 180,
  phone: 80,
  company: 160,
  project_type: 120,
  message: 3000,
  website: 200,
}

// Bevorzugter Versand: Resend (eigene Domain). Fallback: FormSubmit.
const resendApiKey = process.env.RESEND_API_KEY
const fromEmail = process.env.CONTACT_FROM_EMAIL ?? "FPZ Website <kontakt@fapez-medien.de>"
const toEmail = process.env.CONTACT_TO_EMAIL ?? "zapkothimofej@gmail.com"

const formSubmitEndpoint =
  process.env.CONTACT_FORM_ENDPOINT ??
  process.env.FORMSUBMIT_ENDPOINT ??
  "https://formsubmit.co/ajax/dc1680c158855bc1fa8160692cdd812d"

type ContactInput = {
  kind: ContactKind
  name: string
  email: string
  message: string
  company?: string
  phone?: string
  projectType?: string
}

export async function POST(request: Request) {
  let payload: Record<string, unknown>

  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ success: false, error: "invalid_json" }, { status: 400 })
  }

  const kind = readKind(payload.kind)
  const name = readString(payload.name, maxLength.name)
  const email = readString(payload.email, maxLength.email)
  const message = readString(payload.message, maxLength.message)
  const website = readString(payload.website, maxLength.website)

  // Honeypot: gefülltes (verstecktes) website-Feld -> stiller Erfolg für Bots.
  if (website) {
    return NextResponse.json({ success: true })
  }

  if (!kind || !name || !email || !message || !isValidEmail(email)) {
    return NextResponse.json({ success: false, error: "invalid_fields" }, { status: 400 })
  }

  // Rate-Limit pro IP (greift nur, wenn Upstash konfiguriert ist).
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"

  if (!(await checkRateLimit(ip))) {
    return NextResponse.json({ success: false, error: "rate_limited" }, { status: 429 })
  }

  const input: ContactInput = {
    kind,
    name,
    email,
    message,
    company: readString(payload.company, maxLength.company) || undefined,
    phone: readString(payload.phone, maxLength.phone) || undefined,
    projectType: readString(payload.project_type, maxLength.project_type) || undefined,
  }

  try {
    const delivered = resendApiKey
      ? await sendViaResend(input)
      : await sendViaFormSubmit(input, request)

    if (delivered) {
      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ success: false, error: "submit_failed" }, { status: 502 })
  } catch {
    return NextResponse.json({ success: false, error: "submit_unavailable" }, { status: 502 })
  }
}

async function sendViaResend(input: ContactInput): Promise<boolean> {
  const lines = [
    `Anfrage über: ${kindLabels[input.kind]}`,
    `Name: ${input.name}`,
    `E-Mail: ${input.email}`,
    input.company ? `Unternehmen: ${input.company}` : null,
    input.phone ? `Telefon: ${input.phone}` : null,
    input.projectType ? `Art des Projekts: ${input.projectType}` : null,
    "",
    "Nachricht:",
    input.message,
  ].filter(Boolean)

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      reply_to: input.email,
      subject: subjects[input.kind],
      text: lines.join("\n"),
    }),
  })

  return res.ok
}

async function sendViaFormSubmit(input: ContactInput, request: Request): Promise<boolean> {
  const sourceUrl =
    request.headers.get("referer") ??
    request.headers.get("origin") ??
    "https://www.fapez-medien.de"

  const body: Record<string, string> = {
    _subject: subjects[input.kind],
    _captcha: "false",
    _template: "table",
    _url: sourceUrl,
    name: input.name,
    email: input.email,
    message: input.message,
  }

  if (input.company) body.company = input.company
  if (input.phone) body.phone = input.phone
  if (input.projectType) body.project_type = input.projectType

  const res = await fetch(formSubmitEndpoint, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })

  const data = await readJson(res)
  return res.ok && (data?.success === true || data?.success === "true" || data?.ok === true)
}

function readKind(value: unknown): ContactKind | null {
  return value === "web-ki" || value === "foto-video" ? value : null
}

function readString(value: unknown, limit: number) {
  if (typeof value !== "string") return ""
  return value.trim().slice(0, limit)
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

async function readJson(response: Response) {
  try {
    return (await response.json()) as { ok?: boolean; success?: boolean | string } | null
  } catch {
    return null
  }
}

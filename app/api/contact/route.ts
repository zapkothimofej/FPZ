import { NextResponse } from "next/server"

type ContactKind = "web-ki" | "foto-video"

const contactFormEndpoint =
  process.env.CONTACT_FORM_ENDPOINT ??
  process.env.FORMSUBMIT_ENDPOINT ??
  "https://formsubmit.co/ajax/stevanfrei@gmail.com"

const subjects: Record<ContactKind, string> = {
  "web-ki": "Neue Anfrage - FPZ Web & KI",
  "foto-video": "Neue Anfrage - FPZ Foto & Video",
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

  if (website) {
    return NextResponse.json({ success: true })
  }

  if (!kind || !name || !email || !message || !isValidEmail(email)) {
    return NextResponse.json({ success: false, error: "invalid_fields" }, { status: 400 })
  }

  const origin = request.headers.get("origin")
  const referer = request.headers.get("referer")
  const sourceUrl = referer ?? origin ?? "https://www.fapez-medien.de"

  const body: Record<string, string> = {
    _subject: subjects[kind],
    _captcha: "false",
    _template: "table",
    _url: sourceUrl,
    name,
    email,
    message,
  }

  const company = readString(payload.company, maxLength.company)
  const phone = readString(payload.phone, maxLength.phone)
  const projectType = readString(payload.project_type, maxLength.project_type)

  if (company) body.company = company
  if (phone) body.phone = phone
  if (projectType) body.project_type = projectType

  try {
    const res = await fetch(contactFormEndpoint, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })

    const data = await readJson(res)

    if (res.ok && (data?.success === true || data?.success === "true" || data?.ok === true)) {
      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ success: false, error: "submit_failed" }, { status: 502 })
  } catch {
    return NextResponse.json({ success: false, error: "submit_unavailable" }, { status: 502 })
  }
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

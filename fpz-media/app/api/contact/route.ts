import { NextRequest, NextResponse } from "next/server"

const ALLOWED_ORIGINS = ["https://fpz-media.de", "http://localhost:3000"]
const EMAIL_RE = /^[^\s@\r\n]+@[^\s@\r\n]+\.[^\s@\r\n]+$/
const LIMITS = { name: 200, email: 254, phone: 30, company: 200, message: 5000, service: 100 }

export async function POST(req: NextRequest) {
  const origin = req.headers.get("origin")
  if (!origin || !ALLOWED_ORIGINS.includes(origin)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  const contentType = req.headers.get("content-type")
  if (!contentType?.includes("application/json")) {
    return NextResponse.json({ error: "Invalid content type" }, { status: 400 })
  }

  const body = await req.json()
  const { name, email, phone, company, message, service, website } = body

  // Honeypot: bots fill this field — silent drop
  if (typeof website === "string" && website.length > 0) {
    return NextResponse.json({ success: true })
  }

  if (
    typeof name !== "string" || !name ||
    typeof email !== "string" || !email ||
    typeof message !== "string" || !message
  ) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
  }

  if (!EMAIL_RE.test(email) || /[\r\n]/.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 })
  }

  if (
    name.length > LIMITS.name ||
    email.length > LIMITS.email ||
    message.length > LIMITS.message
  ) {
    return NextResponse.json({ error: "Input too long" }, { status: 400 })
  }

  if (
    (typeof phone !== "string" && phone !== undefined && phone !== null) ||
    (typeof company !== "string" && company !== undefined && company !== null) ||
    (typeof service !== "string" && service !== undefined && service !== null)
  ) {
    return NextResponse.json({ error: "Invalid field type" }, { status: 400 })
  }

  if (typeof phone === "string" && phone.length > LIMITS.phone) {
    return NextResponse.json({ error: "Input too long" }, { status: 400 })
  }
  if (typeof company === "string" && company.length > LIMITS.company) {
    return NextResponse.json({ error: "Input too long" }, { status: 400 })
  }
  if (typeof service === "string" && service.length > LIMITS.service) {
    return NextResponse.json({ error: "Input too long" }, { status: 400 })
  }

  const webhookUrl = process.env.N8N_WEBHOOK_URL
  if (!webhookUrl) {
    return NextResponse.json({ error: "Webhook not configured" }, { status: 500 })
  }

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 10_000)

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        phone: phone ?? null,
        company: company ?? null,
        message,
        service: service ?? null,
        timestamp: new Date().toISOString(),
        source: "fpz-media-website",
      }),
      signal: controller.signal,
    })
    if (!res.ok) {
      throw new Error(`Webhook returned ${res.status}`)
    }
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("[contact] Webhook failed:", err instanceof Error ? err.message : String(err))
    return NextResponse.json({ error: "Failed to send" }, { status: 500 })
  } finally {
    clearTimeout(timeoutId)
  }
}

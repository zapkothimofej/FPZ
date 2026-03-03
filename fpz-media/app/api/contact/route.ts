import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { name, email, phone, company, message, service } = body

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
  }

  const webhookUrl = process.env.N8N_WEBHOOK_URL
  if (!webhookUrl) {
    return NextResponse.json({ error: "Webhook not configured" }, { status: 500 })
  }

  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        phone,
        company,
        message,
        service,
        timestamp: new Date().toISOString(),
        source: "fpz-media-website",
      }),
    })
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("[contact] Webhook failed:", err)
    return NextResponse.json({ error: "Failed to send" }, { status: 500 })
  }
}

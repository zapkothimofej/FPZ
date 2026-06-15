// Einfaches IP-basiertes Rate-Limit (fixed window) über die Upstash-Redis-REST-API.
// Kein SDK nötig — nur fetch. Gratis-Tier reicht.
//
// Verhalten:
// - Ist Upstash nicht konfiguriert (keine Env-Vars), wird NICHT limitiert (allow).
// - Bei Infrastruktur-Fehlern wird "fail open" zurückgegeben, damit echte
//   Anfragen nie an einem Redis-Ausfall scheitern (der Honeypot schützt weiterhin).

const url = process.env.UPSTASH_REDIS_REST_URL
const token = process.env.UPSTASH_REDIS_REST_TOKEN

const LIMIT = 5 // erlaubte Anfragen pro Fenster und IP
const WINDOW_SECONDS = 600 // 10 Minuten

export async function checkRateLimit(ip: string): Promise<boolean> {
  if (!url || !token) return true // nicht konfiguriert -> nicht blocken

  const key = `ratelimit:contact:${ip}`

  try {
    const res = await fetch(`${url}/pipeline`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      // INCR zählt hoch, EXPIRE ... NX setzt die TTL nur beim ersten Treffer.
      body: JSON.stringify([
        ["INCR", key],
        ["EXPIRE", key, WINDOW_SECONDS, "NX"],
      ]),
      cache: "no-store",
    })

    if (!res.ok) return true // fail open

    const data = (await res.json()) as Array<{ result?: number }>
    const count = data?.[0]?.result ?? 0
    return count <= LIMIT
  } catch {
    return true // fail open
  }
}

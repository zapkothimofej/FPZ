import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'FPZ Media — Webentwicklung, Film & Automation im Ruhrgebiet'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0a0a0a',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
          padding: '80px',
          position: 'relative',
        }}
      >
        {/* Subtle grid lines */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '60px 60px', display: 'flex' }} />
        {/* Tag */}
        <div style={{ color: '#444', fontSize: 13, letterSpacing: '4px', textTransform: 'uppercase', marginBottom: 24, display: 'flex' }}>
          Ruhrgebiet · NRW · Deutschland
        </div>
        {/* Title */}
        <div style={{ color: '#ebebeb', fontSize: 72, fontWeight: 700, letterSpacing: '-2px', lineHeight: 1.1, marginBottom: 20, display: 'flex' }}>
          FPZ Media
        </div>
        {/* Subtitle */}
        <div style={{ color: '#707070', fontSize: 26, letterSpacing: '1px', display: 'flex' }}>
          Webentwicklung · Film · Automation
        </div>
        {/* Bottom bar */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, #c8c8c8 0%, transparent 60%)', display: 'flex' }} />
      </div>
    ),
    { ...size }
  )
}

import { Audio } from "@remotion/media"
import { AbsoluteFill, Sequence, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion"
import { Brand } from "./Brand"
import { CameraVisual, WebAutomationVisual } from "./Visuals"
import { clamp, ease, fade } from "./motion"
import { colors, scenes, services } from "./theme"

type FpzAdProps = {
  format: "landscape" | "story"
}

export function FpzAd({ format }: FpzAdProps) {
  const isStory = format === "story"

  return (
    <AbsoluteFill style={{ background: colors.ink, fontFamily: "Inter, Arial, sans-serif", overflow: "hidden" }}>
      <AudioBed />
      <Grain />
      <Ambient />
      <Sequence durationInFrames={210}>
        <HeroScene isStory={isStory} />
      </Sequence>
      <Sequence from={190} durationInFrames={230}>
        <ServiceScene isStory={isStory} variant="web" />
      </Sequence>
      <Sequence from={400} durationInFrames={230}>
        <ServiceScene isStory={isStory} variant="foto" />
      </Sequence>
      <Sequence from={610} durationInFrames={290}>
        <FinalScene isStory={isStory} />
      </Sequence>
    </AbsoluteFill>
  )
}

function AudioBed() {
  const { fps } = useVideoConfig()

  return (
    <>
      <Audio
        src={staticFile("remotion-audio/fpz-ad/music.mp3")}
        trimAfter={30 * fps}
        volume={(frame) =>
          interpolate(frame, [0, 2 * fps, 25 * fps, 30 * fps], [0, 0.16, 0.14, 0], clamp)
        }
      />
      <Sequence from={0}>
        <Audio src={staticFile("remotion-audio/fpz-ad/intro-rise.mp3")} volume={0.42} />
      </Sequence>
      <Sequence from={16}>
        <Audio
          src={staticFile("remotion-audio/fpz-ad/voiceover.mp3")}
          volume={(frame) =>
            interpolate(frame, [0, 0.35 * fps, 23.5 * fps, 24.6 * fps], [0, 0.98, 0.98, 0], clamp)
          }
        />
      </Sequence>
      <Sequence from={190}>
        <Audio src={staticFile("remotion-audio/fpz-ad/web-transition.mp3")} volume={0.34} />
      </Sequence>
      <Sequence from={400}>
        <Audio src={staticFile("remotion-audio/fpz-ad/camera-accent.mp3")} volume={0.42} />
      </Sequence>
      <Sequence from={610}>
        <Audio src={staticFile("remotion-audio/fpz-ad/final-hit.mp3")} volume={0.4} />
      </Sequence>
    </>
  )
}

function HeroScene({ isStory }: { isStory: boolean }) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const scene = scenes[0]
  const enter = fade(frame, 0.1 * fps, 0.9 * fps)
  const exit = interpolate(frame, [5.8 * fps, 6.9 * fps], [1, 0], { ...clamp, easing: ease })
  const opacity = enter * exit
  const titleSize = isStory ? 118 : 122

  return (
    <AbsoluteFill style={{ opacity, padding: isStory ? 86 : 96, justifyContent: "space-between" }}>
      <TopBar inverted />
      <div>
        <TextReveal text={scene.eyebrow} delay={10} small />
        <div style={{ marginTop: 36 }}>
          {scene.title.map((line, index) => (
            <TitleLine key={line} text={line} delay={22 + index * 10} size={titleSize} />
          ))}
        </div>
        <p style={{ color: `${colors.white}b8`, fontSize: isStory ? 38 : 34, lineHeight: 1.42, width: isStory ? 830 : 760, marginTop: 54 }}>
          {scene.copy}
        </p>
      </div>
      <ServiceTicker isStory={isStory} />
    </AbsoluteFill>
  )
}

function ServiceScene({ isStory, variant }: { isStory: boolean; variant: "web" | "foto" }) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const scene = variant === "web" ? scenes[1] : scenes[2]
  const enter = fade(frame, 0, 0.7 * fps)
  const exit = interpolate(frame, [6.2 * fps, 7.3 * fps], [1, 0], { ...clamp, easing: ease })
  const titleSize = isStory ? 98 : 94
  const visual = variant === "web" ? <WebAutomationVisual compact={isStory} /> : <CameraVisual compact={isStory} />

  return (
    <AbsoluteFill
      style={{
        opacity: enter * exit,
        padding: isStory ? 70 : 86,
        display: "grid",
        gridTemplateColumns: isStory ? "1fr" : "0.88fr 1fr",
        gap: isStory ? 58 : 84,
        alignItems: "center",
      }}
    >
      <div style={{ alignSelf: isStory ? "end" : "center" }}>
        <TextReveal text={scene.eyebrow} delay={8} small />
        <div style={{ marginTop: 28 }}>
          {scene.title.map((line, index) => (
            <TitleLine key={line} text={line} delay={18 + index * 9} size={titleSize} />
          ))}
        </div>
        <p style={{ color: `${colors.white}b8`, fontSize: isStory ? 34 : 30, lineHeight: 1.44, maxWidth: isStory ? 850 : 620, marginTop: 40 }}>
          {scene.copy}
        </p>
      </div>
      <div style={{ display: "flex", justifyContent: isStory ? "center" : "flex-end", alignSelf: isStory ? "start" : "center" }}>
        {visual}
      </div>
    </AbsoluteFill>
  )
}

function FinalScene({ isStory }: { isStory: boolean }) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const enter = fade(frame, 0, 0.8 * fps)
  const scale = interpolate(frame, [0, 8 * fps], [1.03, 1], { ...clamp, easing: ease })

  return (
    <AbsoluteFill style={{ opacity: enter, background: colors.cream, color: colors.ink, padding: isStory ? 82 : 96 }}>
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${colors.cream}, ${colors.parchment})`, transform: `scale(${scale})` }} />
      <div style={{ position: "relative", zIndex: 1, height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Brand inverted={false} scale={isStory ? 1.28 : 1.1} />
          {!isStory && <span style={{ fontSize: 22, color: colors.mid, letterSpacing: 5, textTransform: "uppercase" }}>Bochum · NRW</span>}
        </div>
        <div>
          <TextReveal text="FPZ" delay={8} small dark />
          <div style={{ marginTop: 34 }}>
            {scenes[3].title.map((line, index) => (
              <TitleLine key={line} text={line} delay={18 + index * 10} size={isStory ? 124 : 132} dark />
            ))}
          </div>
          <p style={{ color: colors.mid, fontSize: isStory ? 38 : 34, lineHeight: 1.35, width: isStory ? 780 : 760, marginTop: 44 }}>
            {scenes[3].copy}
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: isStory ? "1fr" : "1fr auto", gap: 34, alignItems: "end" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            {services.slice(0, isStory ? 6 : 5).map((service, index) => (
              <Tag key={service} text={service} delay={150 + index * 5} />
            ))}
          </div>
          <div style={{ background: colors.ink, color: colors.cream, padding: isStory ? "34px 42px" : "28px 38px", fontSize: isStory ? 34 : 26, fontWeight: 800, letterSpacing: 1.2 }}>
            fpz-website.vercel.app
          </div>
        </div>
      </div>
    </AbsoluteFill>
  )
}

function TopBar({ inverted }: { inverted: boolean }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <Brand inverted={inverted} />
      <span style={{ color: `${colors.white}88`, fontSize: 20, letterSpacing: 5, textTransform: "uppercase" }}>Werbevideo</span>
    </div>
  )
}

function TitleLine({ text, delay, size, dark = false }: { text: string; delay: number; size: number; dark?: boolean }) {
  const frame = useCurrentFrame()
  const progress = fade(frame, delay, delay + 28)
  const y = interpolate(progress, [0, 1], [size * 1.08, 0], { ...clamp, easing: ease })

  return (
    <div style={{ height: size * 1.05, overflow: "hidden" }}>
      <div
        style={{
          transform: `translateY(${y}px)`,
          fontFamily: "Georgia, 'Times New Roman', serif",
          fontSize: size,
          lineHeight: 1.02,
          fontStyle: "italic",
          fontWeight: 300,
          color: dark ? colors.ink : colors.white,
        }}
      >
        {text}
      </div>
    </div>
  )
}

function TextReveal({ text, delay, small = false, dark = false }: { text: string; delay: number; small?: boolean; dark?: boolean }) {
  const frame = useCurrentFrame()
  const progress = fade(frame, delay, delay + 22)
  const y = interpolate(progress, [0, 1], [26, 0], { ...clamp, easing: ease })

  return (
    <div style={{ overflow: "hidden" }}>
      <div
        style={{
          transform: `translateY(${y}px)`,
          opacity: progress,
          color: dark ? colors.gold : colors.gold,
          fontSize: small ? 24 : 30,
          fontWeight: 800,
          letterSpacing: 7,
          textTransform: "uppercase",
        }}
      >
        {text}
      </div>
    </div>
  )
}

function ServiceTicker({ isStory }: { isStory: boolean }) {
  const frame = useCurrentFrame()
  const x = interpolate(frame, [0, 210], [0, isStory ? -940 : -1180], clamp)
  const row = [...services, ...services, ...services]

  return (
    <div style={{ overflow: "hidden", borderTop: `1px solid ${colors.white}18`, borderBottom: `1px solid ${colors.white}18`, padding: "24px 0" }}>
      <div style={{ display: "flex", gap: 40, transform: `translateX(${x}px)`, whiteSpace: "nowrap" }}>
        {row.map((service, index) => (
          <span key={`${service}-${index}`} style={{ color: `${colors.white}88`, fontSize: isStory ? 26 : 22, letterSpacing: 5, textTransform: "uppercase" }}>
            {service}
          </span>
        ))}
      </div>
    </div>
  )
}

function Tag({ text, delay }: { text: string; delay: number }) {
  const frame = useCurrentFrame()
  const progress = fade(frame, delay, delay + 20)

  return (
    <span
      style={{
        opacity: progress,
        transform: `translateY(${interpolate(progress, [0, 1], [16, 0], clamp)}px)`,
        border: `1px solid ${colors.ink}33`,
        color: colors.mid,
        padding: "12px 16px",
        fontSize: 18,
        letterSpacing: 2.5,
        textTransform: "uppercase",
      }}
    >
      {text}
    </span>
  )
}

function Ambient() {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", left: -260, top: -220, width: 720, height: 720, borderRadius: 999, background: `${colors.gold}22`, filter: "blur(120px)", transform: `translate(${Math.sin(frame / fps) * 30}px, ${Math.cos(frame / fps) * 20}px)` }} />
      <div style={{ position: "absolute", right: -320, bottom: -260, width: 860, height: 860, borderRadius: 999, background: `${colors.white}0f`, filter: "blur(140px)" }} />
    </AbsoluteFill>
  )
}

function Grain() {
  return (
    <AbsoluteFill
      style={{
        opacity: 0.13,
        backgroundImage: "radial-gradient(circle at 20% 20%, rgba(255,255,255,.25) 0 1px, transparent 1px), radial-gradient(circle at 70% 80%, rgba(255,255,255,.18) 0 1px, transparent 1px)",
        backgroundSize: "34px 34px, 29px 29px",
        mixBlendMode: "screen",
      }}
    />
  )
}

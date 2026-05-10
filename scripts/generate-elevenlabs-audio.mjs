import { mkdir, readFile, writeFile } from "node:fs/promises"
import path from "node:path"

const sourceEnvPath =
  process.env.ELEVENLABS_ENV_PATH ||
  "/Users/thimofejzapko/Desktop/young-builders-social-media/.env.local"

const outputDir = "public/remotion-audio/fpz-ad"
const voiceId = process.env.ELEVENLABS_VOICE_ID || "z8I6YkY1XGj4qPGtLHtU"

const voiceoverText = [
  "FPZ aus Bochum bringt zusammen, was moderner Auftritt heute braucht.",
  "Eine klare Website, smarte Automationen und starke Bilder.",
  "Damit Kunden schneller verstehen, warum sie anfragen sollen.",
  "Mehr Anfragen. Weniger Handarbeit. Content, der verkauft.",
  "FPZ. Konzept, Website, Automation und Content aus einer Hand.",
].join(" ")

const musicPrompt = [
  "A premium modern advertising bed for a German creative technology studio.",
  "Warm analog synth pulse, subtle cinematic percussion, confident but not aggressive.",
  "Elegant, minimal, polished, no vocals, no lyrics, suitable under a German voiceover.",
  "Structure: soft intro, focused build, tasteful lift, clean final resolve.",
].join(" ")

const soundEffects = [
  {
    file: "intro-rise.mp3",
    duration_seconds: 3,
    text: "Elegant cinematic intro rise, warm digital shimmer, premium brand reveal, no voice",
  },
  {
    file: "web-transition.mp3",
    duration_seconds: 1.4,
    text: "Clean UI whoosh transition with subtle digital clicks, professional website animation",
  },
  {
    file: "camera-accent.mp3",
    duration_seconds: 1.2,
    text: "Premium camera shutter accent with soft lens movement and polished studio click",
  },
  {
    file: "final-hit.mp3",
    duration_seconds: 2,
    text: "Elegant final logo hit, warm bass pulse, refined cinematic sparkle, no voice",
  },
]

await mkdir(outputDir, { recursive: true })

const apiKey = await loadApiKey(sourceEnvPath)

await generateSpeech(apiKey, path.join(outputDir, "voiceover.mp3"))
await generateMusic(apiKey, path.join(outputDir, "music.mp3"))

for (const effect of soundEffects) {
  await generateSoundEffect(apiKey, effect, path.join(outputDir, effect.file))
}

console.log(`Generated ElevenLabs audio assets in ${outputDir}`)

async function loadApiKey(envPath) {
  const file = await readFile(envPath, "utf8")
  const parsed = Object.fromEntries(
    file
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith("#") && line.includes("="))
      .map((line) => {
        const index = line.indexOf("=")
        const key = line.slice(0, index).trim()
        const value = line.slice(index + 1).trim().replace(/^['"]|['"]$/g, "")
        return [key, value]
      }),
  )

  const apiKey =
    process.env.ELEVENLABS_API_KEY ||
    parsed.ELEVENLABS_API_KEY ||
    parsed.ELEVEN_API_KEY ||
    parsed.ELEVENLABS_KEY

  if (!apiKey) {
    throw new Error(`No ElevenLabs API key found in ${envPath}`)
  }

  return apiKey
}

async function generateSpeech(apiKey, outputPath) {
  const response = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?output_format=mp3_44100_128`,
    {
      method: "POST",
      headers: {
        "xi-api-key": apiKey,
        "Content-Type": "application/json",
        Accept: "audio/mpeg",
      },
      body: JSON.stringify({
        text: voiceoverText,
        model_id: "eleven_multilingual_v2",
        language_code: "de",
        voice_settings: {
          stability: 0.48,
          similarity_boost: 0.82,
          style: 0.42,
          use_speaker_boost: true,
          speed: 1.03,
        },
      }),
    },
  )

  await writeBinaryResponse(response, outputPath, "voiceover")
}

async function generateMusic(apiKey, outputPath) {
  const response = await fetch("https://api.elevenlabs.io/v1/music", {
    method: "POST",
    headers: {
      "xi-api-key": apiKey,
      "Content-Type": "application/json",
      Accept: "audio/mpeg",
    },
    body: JSON.stringify({
      prompt: musicPrompt,
      musicLengthMs: 30000,
      modelId: "music_v1",
    }),
  })

  await writeBinaryResponse(response, outputPath, "music")
}

async function generateSoundEffect(apiKey, effect, outputPath) {
  const response = await fetch("https://api.elevenlabs.io/v1/sound-generation?output_format=mp3_44100_128", {
    method: "POST",
    headers: {
      "xi-api-key": apiKey,
      "Content-Type": "application/json",
      Accept: "audio/mpeg",
    },
    body: JSON.stringify({
      text: effect.text,
      duration_seconds: effect.duration_seconds,
      prompt_influence: 0.55,
      model_id: "eleven_text_to_sound_v2",
    }),
  })

  await writeBinaryResponse(response, outputPath, effect.file)
}

async function writeBinaryResponse(response, outputPath, label) {
  if (!response.ok) {
    const body = await response.text()
    throw new Error(`${label} generation failed: ${response.status} ${body.slice(0, 500)}`)
  }

  const buffer = Buffer.from(await response.arrayBuffer())
  await writeFile(outputPath, buffer)
}

"use client"

import Image from "next/image"
import { FadeIn } from "@/components/FadeIn"

const photos = [
  {
    src: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
    alt: "Produktfotografie — Uhr auf dunkler Fläche",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80",
    alt: "Kamera Setup",
    span: "col-span-1 row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
    alt: "Event Dokumentation",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=80",
    alt: "Behind the Scenes",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80",
    alt: "Event — Crowd Perspektive",
    span: "col-span-2 row-span-1",
  },
]

export function FotoVideoGallery() {
  return (
    <section id="portfolio" className="py-24 md:py-36 px-6 md:px-12 lg:px-16 bg-parchment dark:bg-ink">
      <FadeIn>
        <p className="text-[10px] tracking-[0.28em] uppercase text-gold mb-3 font-medium">Portfolio</p>
        <h2 className="font-display font-light italic text-[clamp(2.5rem,5vw,5rem)] leading-tight text-ink dark:text-cream mb-16 md:mb-24">
          Ausgewählte Arbeiten.
        </h2>
      </FadeIn>

      <div className="grid grid-cols-2 md:grid-cols-3 auto-rows-[260px] gap-4">
        {photos.map((photo, i) => (
          <FadeIn key={i} delay={i * 0.06} className={photo.span}>
            <div className="relative w-full h-full rounded-xl overflow-hidden bg-stone dark:bg-stone/10 group">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}

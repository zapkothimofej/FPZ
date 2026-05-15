"use client"

import Image from "next/image"
import { FadeIn } from "@/components/FadeIn"

const photos = [
  {
    src: "/foto-video/portfolio-car-red-graded.jpg",
    alt: "Roter und weißer Sportwagen in einer Halle",
    span: "md:col-span-4",
    frame: "aspect-[16/9]",
    position: "object-[50%_58%]",
    sizes: "(max-width: 768px) 100vw, 66vw",
  },
  {
    src: "/foto-video/portfolio-car-bmw-graded.jpg",
    alt: "Schwarz-weißer Sportwagen am Fenster",
    span: "md:col-span-2",
    frame: "aspect-[3/4]",
    position: "object-[50%_56%]",
    sizes: "(max-width: 768px) 100vw, 33vw",
  },
  {
    src: "/foto-video/portfolio-media-team.jpg",
    alt: "Media Team bei einer Live-Produktion",
    span: "md:col-span-3",
    frame: "aspect-[3/2]",
    position: "object-[62%_50%]",
    sizes: "(max-width: 768px) 100vw, 50vw",
  },
  {
    src: "/foto-video/portfolio-drone-neighborhood.jpg",
    alt: "Drohnenaufnahme eines Wohngebiets",
    span: "md:col-span-3",
    frame: "aspect-[4/3]",
    position: "object-center",
    sizes: "(max-width: 768px) 100vw, 50vw",
  },
  {
    src: "/foto-video/portfolio-forest-puddle.jpg",
    alt: "Pfütze auf einem Waldweg mit Personen im Hintergrund",
    span: "md:col-span-2 md:col-start-3",
    frame: "aspect-[9/16]",
    position: "object-[50%_58%]",
    sizes: "(max-width: 768px) 100vw, 33vw",
  },
]

export function FotoVideoGallery() {
  return (
    <section id="portfolio" className="py-24 md:py-36 px-6 md:px-12 lg:px-16 bg-parchment">
      <FadeIn>
        <p className="text-[10px] tracking-[0.28em] uppercase text-gold mb-3 font-medium">Portfolio</p>
        <h2 className="font-display font-light italic text-[clamp(2.5rem,5vw,5rem)] leading-tight text-ink mb-16 md:mb-24">
          Ausgewählte Arbeiten.
        </h2>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-start">
        {photos.map((photo, i) => (
          <FadeIn key={photo.src} delay={i * 0.06} className={photo.span}>
            <div className={`relative w-full ${photo.frame} rounded-xl overflow-hidden bg-stone group`}>
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className={`object-cover ${photo.position} transition-transform duration-700 group-hover:scale-105`}
                sizes={photo.sizes}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}

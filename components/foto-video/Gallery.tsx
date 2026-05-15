"use client"

import Image from "next/image"
import { FadeIn } from "@/components/FadeIn"

const photos = [
  {
    src: "/foto-video/fpz-gallery-01.jpg",
    alt: "Portfolio Bild 1",
    span: "col-span-1 row-span-1",
    sizes: "(max-width: 768px) 50vw, 33vw",
  },
  {
    src: "/foto-video/fpz-gallery-02.jpg",
    alt: "Portfolio Bild 2",
    span: "col-span-1 row-span-2",
    sizes: "(max-width: 768px) 100vw, 33vw",
  },
  {
    src: "/foto-video/fpz-gallery-03.jpg",
    alt: "Portfolio Bild 3",
    span: "col-span-1 row-span-1",
    sizes: "(max-width: 768px) 50vw, 33vw",
  },
  {
    src: "/foto-video/fpz-gallery-04.jpg",
    alt: "Portfolio Bild 4",
    span: "col-span-1 row-span-1",
    sizes: "(max-width: 768px) 50vw, 33vw",
  },
  {
    src: "/foto-video/fpz-gallery-05.jpg",
    alt: "Portfolio Bild 5",
    span: "col-span-2 row-span-1",
    sizes: "100vw",
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

      <div className="grid grid-cols-2 md:grid-cols-3 auto-rows-[160px] md:auto-rows-[260px] gap-4">
        {photos.map((photo, i) => (
          <FadeIn key={photo.src} delay={i * 0.06} className={photo.span}>
            <div className="relative w-full h-full rounded-xl overflow-hidden bg-stone group">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
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

"use client"

import Image from "next/image"
import { FadeIn } from "@/components/FadeIn"

const photos = [
  {
    src: "https://images.pexels.com/photos/8111827/pexels-photo-8111827.jpeg?auto=compress&cs=tinysrgb&w=1000",
    alt: "Modernes Business-Portrait in einem hochwertigen Office",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://images.pexels.com/photos/14025964/pexels-photo-14025964.jpeg?auto=compress&cs=tinysrgb&w=1000",
    alt: "Businesswoman im schwarzen Anzug in urbaner Abendstimmung",
    span: "col-span-1 row-span-2",
  },
  {
    src: "https://images.pexels.com/photos/14156490/pexels-photo-14156490.jpeg?auto=compress&cs=tinysrgb&w=1000",
    alt: "Freundliches Business-Portrait im modernen Office",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://images.pexels.com/photos/29995889/pexels-photo-29995889.jpeg?auto=compress&cs=tinysrgb&w=1000",
    alt: "Klares Corporate Headshot mit schwarzem Blazer",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://images.pexels.com/photos/36753133/pexels-photo-36753133.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "Elegantes Business-Portrait mit dunklem Hintergrund",
    span: "col-span-2 row-span-1",
  },
]

export function FotoVideoGallery() {
  return (
    <section id="portfolio" className="py-24 md:py-36 px-6 md:px-12 lg:px-16 bg-parchment">
      <FadeIn>
        <p className="text-[10px] tracking-[0.28em] uppercase text-gold mb-3 font-medium">Portfolio</p>
        <h2 className="font-display font-light italic text-[clamp(2.5rem,5vw,5rem)] leading-tight text-ink mb-16 md:mb-24">
          Business-Portraits.
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

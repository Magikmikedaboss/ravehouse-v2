// src/components/ui/gallery/GalleryHero.tsx
import Surface from "@/components/ui/Surface";
import Chip from "@/components/ui/Chip";
import Link from "next/link";

export default function GalleryHero() {
  return (
    <section className="grid gap-6 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1.3fr)]">
      {/* Left: text intro */}
      <Surface className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-rave-pink/15 via-rave-orange/10 to-transparent" />
        <div className="relative flex h-full flex-col justify-between p-6 md:p-8">
          <div className="space-y-3">
            <p className="text-[11px] uppercase tracking-[0.3em] text-white/55">
              Afterhours archive
            </p>
            <h1 className="text-3xl font-semibold sm:text-4xl">
              Gallery &amp; aftermovies
            </h1>
            <p className="max-w-xl text-sm text-white/75">
              Relive the lasers, smoke and warehouse echoes from every Ravehouse Entertainment
              night in Las Vegas. Photo drops, aftermovies, clips and reels
              straight from the floor.
            </p>
          </div>

          <div className="mt-5 space-y-4">
            <div className="flex flex-wrap gap-3">
              <Link
                href="#latest-aftermovie"
                className="inline-flex items-center justify-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-black shadow-lg shadow-rave-pink/40 transition hover:brightness-105"
              >
                ▶ Play latest aftermovie
              </Link>
              <Link
                href="#recent"
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/85 hover:bg-white/10"
              >
                View photo drops
              </Link>
            </div>

            <div className="flex flex-wrap gap-2 text-[11px] text-white/65">
              <Chip className="bg-white/10 border-transparent">
                128+ nights captured
              </Chip>
              <Chip className="bg-white/10 border-transparent">
                Vegas · Downtown · Warehouse
              </Chip>
              <Chip className="bg-white/10 border-transparent">
                Tag @ravehouse for a feature
              </Chip>
            </div>
          </div>
        </div>
      </Surface>

      {/* Right: massive aftermovie feature */}
      <Surface
        id="latest-aftermovie"
        className="relative overflow-hidden bg-black/40 p-3 md:p-4"
      >
        <div className="relative rounded-[1.75rem] bg-black/60 shadow-card overflow-hidden">
          {/* Main frame */}
          <div className="relative h-[340px] w-full sm:h-[420px]">
            {/* Background image placeholder */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: "url('/images/gallery/hero-afterhours.jpg')",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

            {/* Top meta */}
            <div className="absolute left-4 right-4 top-4 flex items-center justify-between text-[11px] text-white/80">
              <Chip className="bg-black/70 border-white/20">
                Aftermovie · 04:27
              </Chip>
              <Chip className="bg-black/70 border-white/20">
                Ravehouse Entertainment · Las Vegas
              </Chip>
            </div>

            {/* Bottom labels */}
            <div className="absolute left-4 right-4 bottom-4 space-y-1">
              <p className="text-sm font-semibold">
                Warehouse Eclipse · Last Friday
              </p>
              <p className="text-[11px] text-white/75">
                Strobes, fog and 400 people losing their minds at 3:12AM.
              </p>
              <button className="mt-2 inline-flex items-center rounded-full bg-white/90 px-3 py-1.5 text-[11px] font-semibold text-black hover:bg-white">
                ▶ Watch recap
              </button>
            </div>
          </div>

          {/* Thumbnail strip */}
          <div className="flex gap-2 border-t border-white/10 bg-black/70 px-3 py-2 text-[11px]">
            {[
              "DJ booth POV",
              "Confetti hit",
              "Laser tunnel",
              "Crowd close-up",
            ].map((label, idx) => (
              <div
                key={label}
                className="relative h-16 flex-1 overflow-hidden rounded-xl bg-white/5"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url('/images/gallery/thumb-${idx + 1}.jpg')`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <p className="absolute bottom-1 left-2 text-[10px] text-white/80">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Surface>
    </section>
  );
}

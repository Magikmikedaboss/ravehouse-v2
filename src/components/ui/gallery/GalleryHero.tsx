// src/components/ui/gallery/GalleryHero.tsx
import Image from "next/image";
import Surface from "@/components/ui/Surface";
import Chip from "@/components/ui/Chip";

interface GalleryHeroProps {
  duration?: string;
  location?: string;
  aftermovieDate?: Date | string;
}

export default function GalleryHero({
  duration = "0:58",
  location = "Warehouse District",
  aftermovieDate = new Date("2026-02-01")
}: GalleryHeroProps) {  // Format date for display (e.g., "Feb 1")
  const formatDate = (date: Date | string): string => {
    let d: Date;
    
    if (typeof date === 'string') {
      // Check if it's a YYYY-MM-DD format string
      const dateMatch = date.match(/^(\d{4})-(\d{2})-(\d{2})$/);
      if (dateMatch) {
        // Parse as local date to avoid UTC timezone shifts
        const year = parseInt(dateMatch[1], 10);
        const month = parseInt(dateMatch[2], 10) - 1; // month is 0-indexed
        const day = parseInt(dateMatch[3], 10);
        d = new Date(year, month, day);
      } else {
        // For other string formats, use default Date parsing
        d = new Date(date);
      }
    } else {
      d = date;
    }
    
    if (isNaN(d.getTime())) {
      return 'TBD';
    }
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const formattedDate = formatDate(aftermovieDate);

  return (    <section className="grid gap-5 px-4 pt-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:px-6">
      {/* Left panel */}
      <Surface className="relative min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] overflow-hidden">
        <Image
          src="/images/gallery/medium-vecteezy_happy-people-partying-together-on-music-enjoying-night-out_42274992_medium.jpg"
          alt="People partying together enjoying night out"
          fill
          className="object-cover"
          priority={true}
          fetchPriority="high"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 40vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60 pointer-events-none" />
        <div className="relative space-y-4 p-6 md:p-8">
          <div className="space-y-3">
            <p className="text-xxs uppercase tracking-[0.3em] text-white/60">
              The Afterglow
            </p>
            <h1 className="text-3xl font-semibold sm:text-4xl text-white">
              Every night, captured.
            </h1>
            <p className="max-w-xl text-sm text-white/75">
              High-res exports, story-ready reels, and Polaroid-style prints
              from every Ravehouse night. Tag your crew, download your favorites,
              and relive the energy.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <a
              href="#gallery-feed"
              className="inline-flex items-center justify-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-black shadow-rh-medium shadow-rh-pink transition hover:brightness-105"
            >
              Browse full gallery
            </a>
            <button
              type="button"
              disabled
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/85 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Find me in photos (soon)
            </button>
          </div>

          <div className="flex flex-wrap gap-2 text-xxs text-white/70">
            <Chip variant="orange" size="sm">High-res downloads</Chip>
            <Chip variant="cyan" size="sm">Photo dumps & recaps</Chip>
            <Chip variant="purple" size="sm">Polaroid prints</Chip>
          </div>
        </div>
      </Surface>

      {/* Right panel - Aftermovie preview */}
      <Surface
        className="relative overflow-hidden bg-black/40 p-3 md:p-4"
      >
        <div className="relative rounded-[1.75rem] bg-black/60 shadow-rh-soft overflow-hidden">
          <div className="relative aspect-[9/16] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-rh-pink-light/30 via-rh-purple/20 to-black" />

            <div className="absolute left-4 right-4 top-4 flex items-center justify-between text-xxs text-white/80">
              <div className="flex gap-2">
                <Chip variant="orange" size="sm">
                  Aftermovie
                </Chip>
                <Chip variant="cyan" size="sm">
                  {formattedDate}
                </Chip>
              </div>
            </div>

            <div className="absolute left-4 right-4 bottom-16 space-y-2">
              <p className="text-xxs text-white/75">
                🔊 Sound On · {duration} · {location}
              </p>
              <button
                disabled
                className="mt-2 inline-flex items-center rounded-full bg-white/90 px-3 py-1.5 text-xxs font-semibold text-black hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Watch full aftermovie (soon)
              </button>
            </div>
          </div>

          <div className="flex gap-2 border-t border-white/10 bg-black/70 px-3 py-2 text-xxs">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="relative h-16 flex-1 overflow-hidden rounded-xl bg-white/5"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-rh-pink-light/40 via-rh-pink-dark/40 to-black" />
                <p className="absolute bottom-1 left-2 text-[10px] text-white/80">
                  {(() => {
                    const totalSeconds = i * 15;
                    const minutes = Math.floor(totalSeconds / 60);
                    const seconds = totalSeconds % 60;
                    return `${minutes}:${String(seconds).padStart(2, "0")}`;
                  })()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Surface>
    </section>
  );
}

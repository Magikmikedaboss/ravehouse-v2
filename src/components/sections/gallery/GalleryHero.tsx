// src/components/sections/gallery/GalleryHero.tsx
import Surface from "@/components/ui/Surface";

export default function GalleryHero() {
  return (
    <section className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.2fr)]">
      <Surface className="overflow-hidden">
        <div className="relative h-64 w-full sm:h-80">
          <div className="absolute inset-0 bg-gradient-to-br from-rave-pink/40 via-rave-purple/40 to-black" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 space-y-3">
            <p className="text-[11px] uppercase tracking-[0.3em] text-white/60">
              Photo gallery
            </p>
            <h1 className="text-3xl font-semibold sm:text-4xl">
              RAVEHOUSE MOMENTS
            </h1>
            <p className="max-w-xl text-sm text-white/75">
              Captured memories from our underground raves, warehouse takeovers, and neon nights across Las Vegas.
            </p>
          </div>
        </div>
      </Surface>

      <Surface className="p-5">
        <p className="text-xs text-white/60">Gallery stats</p>
        <h2 className="mt-1 text-lg font-semibold">
          500+ Photos · 50+ Events
        </h2>
        <p className="mt-2 text-xs text-white/60">
          From intimate afterhours to massive warehouse raves, every moment captured.
        </p>
      </Surface>
    </section>
  );
}
// src/components/sections/blog/BlogHero.tsx

import Surface from "@/components/ui/Surface";
import Chip from "@/components/ui/Chip";

export default function BlogHero() {
  return (
    <section className="px-4 pt-8 lg:px-6">
      <Surface className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[rgb(var(--rh-pink-light))]/20 via-[rgb(var(--rh-purple))]/10 to-transparent" />        
        <div className="relative flex flex-col gap-5 p-6 md:flex-row md:items-end md:justify-between md:p-8">
          <div className="space-y-3">
            <p className="text-xxs uppercase tracking-[0.3em] text-[rgb(var(--rh-text-secondary))]">
              The Circuit
            </p>
            <h1 className="text-3xl font-semibold sm:text-4xl text-[rgb(var(--rh-text-primary))]">
              Stories from the underground.
            </h1>
            <p className="max-w-xl text-sm text-[rgb(var(--rh-text-secondary))]">
              Recaps, guides, gear breakdowns and behind-the-scenes notes from
              Ravehouse nights across Las Vegas.
            </p>
            
            <div className="mt-2 flex flex-wrap gap-2 text-xxs">
              <Chip variant="pink" size="sm">
                Recaps &amp; photo dumps
              </Chip>
              <Chip variant="cyan" size="sm">
                Guides for new heads
              </Chip>
              <Chip variant="orange" size="sm">
                Rave gear &amp; essentials
              </Chip>
            </div>
          </div>

          <div className="space-y-1 text-xs text-[rgb(var(--rh-text-secondary))]">
            <p>Updated whenever the lights go down and the stories pile up.</p>
            <p className="text-[rgb(var(--rh-text-tertiary))]">
              Based in Las Vegas · Warehouse, rooftops, afterhours.
            </p>
          </div>
        </div>
      </Surface>
    </section>
  );
}
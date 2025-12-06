// src/components/sections/blog/BlogHero.tsx

import Surface from "@/components/ui/Surface";
import Chip from "@/components/ui/Chip";

export default function BlogHero() {
  return (
    <section className="px-4 pt-8 lg:px-6">
      <Surface className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-rh-pink-light/20 via-rh-purple/10 to-transparent" />        <div className="relative flex flex-col gap-5 p-6 md:flex-row md:items-end md:justify-between md:p-8">
          <div className="space-y-3">
            <p className="text-[11px] uppercase tracking-[0.3em] text-black/60">
              The Circuit
            </p>
            <h1 className="text-3xl font-semibold sm:text-4xl text-black">
              Stories from the underground.
            </h1>
            <p className="max-w-xl text-sm text-black/75">
              Recaps, guides, gear breakdowns and behind-the-scenes notes from
              Ravehouse nights across Las Vegas.
            </p>
            
            <div className="mt-2 flex flex-wrap gap-2 text-[11px]">
              <Chip className="bg-gray-100 border-gray-200 text-black">
                Recaps &amp; photo dumps
              </Chip>
              <Chip className="bg-gray-100 border-gray-200 text-black">
                Guides for new heads
              </Chip>
              <Chip className="bg-gray-100 border-gray-200 text-black">
                Rave gear &amp; essentials
              </Chip>
            </div>
          </div>

          <div className="space-y-1 text-xs text-black/70">
            <p>Updated whenever the lights go down and the stories pile up.</p>
            <p className="text-black/50">
              Based in Las Vegas · Warehouse, rooftops, afterhours.
            </p>
          </div>        </div>
      </Surface>
    </section>
  );
}
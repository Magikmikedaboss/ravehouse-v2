// src/components/ui/gallery/GallerySidebar.tsx

import Surface from "@/components/ui/Surface";
import Chip from "@/components/ui/Chip";

export default function GallerySidebar() {
  return (
    <div className="space-y-4">
      {/* Your night in pixels */}
      <Surface className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs text-white/60">Your night in pixels</p>
            <h3 className="mt-1 text-sm font-semibold text-white">
              We auto-cut every set so you might be in from last night.
            </h3>
          </div>
          <Chip className="bg-rave-pink/15 border-rave-pink/30 text-[11px]">
            Warehouse Eclipse
          </Chip>
        </div>

        <div className="grid grid-cols-3 gap-3 text-center text-xs">
          <div>
            <p className="text-2xl font-semibold text-white">47</p>
            <p className="text-white/60">Photos found</p>
          </div>
          <div>
            <p className="text-2xl font-semibold text-white">6</p>
            <p className="text-white/60">Clips with you</p>
          </div>
          <div>
            <p className="text-2xl font-semibold text-white">3</p>
            <p className="text-white/60">Polaroids scanned</p>
          </div>
        </div>

        <div className="space-y-1 text-[11px] text-white/65">
          <p>Face match is 80% complete.</p>
          <div className="h-2 rounded-full bg-white/10">
            <div className="h-2 w-4/5 rounded-full bg-gradient-to-r from-rave-pink to-rave-orange" />
          </div>
        </div>

        <button disabled className="w-full rounded-full bg-white/10 px-3 py-1.5 text-[11px] text-white/80 hover:bg-white/15 disabled:opacity-50 disabled:cursor-not-allowed">
          Improve matches with more selfies
        </button>
      </Surface>

      {/* Story-sized reels */}
      <Surface className="p-4 space-y-3">
        <p className="text-xs text-white/60">Story-sized reels</p>
        <h3 className="text-sm font-semibold text-white">
          Clips trimmed to 15s, ready to drop on socials.
        </h3>

        <div className="relative mt-2 h-32 w-full overflow-hidden rounded-2xl bg-black/60">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/images/gallery/story-reels.jpg')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
          <div className="absolute left-3 right-3 top-3 flex flex-wrap gap-2 text-[10px]">
            <Chip className="bg-rave-cyan/20 border-rave-cyan/40">Techno marathon</Chip>
            <Chip className="bg-rave-purple/20 border-rave-purple/40">
              House on the Strip
            </Chip>
          </div>
          <div className="absolute left-3 right-3 bottom-3 flex items-center justify-between text-[11px] text-white/80">
            <p>Export with Ravehouse Entertainment watermark or clean.</p>
            <button disabled className="rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-black disabled:opacity-50 disabled:cursor-not-allowed">
              Export all
            </button>
          </div>
        </div>
      </Surface>

      {/* Photographer wall */}
      <Surface className="p-4 space-y-3">
        <p className="text-xs text-white/60">Photographer wall</p>
        <h3 className="text-sm font-semibold text-white">
          Support the lenses that capture your best nights.
        </h3>

        <div className="space-y-2 text-xs text-white/80">
          <div className="flex items-center justify-between">
            <span>@nightnado</span>
            <span className="text-white/60">27 sets</span>
          </div>
          <div className="flex items-center justify-between">
            <span>@laserfiends</span>
            <span className="text-white/60">14 sets</span>
          </div>
          <div className="flex items-center justify-between">
            <span>@filmgrain</span>
            <span className="text-white/60">9 sets</span>
          </div>
        </div>

        <button disabled className="w-full rounded-full bg-white/10 px-3 py-1.5 text-[11px] text-white/80 hover:bg-white/15 disabled:opacity-50 disabled:cursor-not-allowed">
          Apply as house photographer
        </button>
      </Surface>
    </div>
  );
}

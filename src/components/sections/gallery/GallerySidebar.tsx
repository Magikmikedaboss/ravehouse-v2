// src/components/sections/gallery/GallerySidebar.tsx
import Surface from "@/components/ui/Surface";
import Chip from "@/components/ui/Chip";

export default function GallerySidebar() {
  return (
    <div className="space-y-4">
      <Surface className="p-5">
        <p className="text-xs text-white/60">Most viewed</p>
        <h2 className="mt-1 text-lg font-semibold">
          Warehouse Eclipse 2025
        </h2>
        <p className="mt-2 text-xs text-white/60">
          Our biggest rave of the year with 400+ attendees and international DJs.
        </p>
        <div className="mt-3 flex flex-wrap gap-2 text-[11px]">
          <Chip className="bg-rave-pink/20 border-transparent">Techno</Chip>
          <Chip className="bg-rave-cyan/20 border-transparent">Warehouse</Chip>
        </div>
      </Surface>

      <Surface className="p-5">
        <p className="text-xs text-white/60">Photo submission</p>
        <h2 className="mt-1 text-lg font-semibold">
          Share your moments
        </h2>
        <p className="mt-2 text-xs text-white/60">
          Tag @ravehouse_lv in your photos from our events to be featured.
        </p>
      </Surface>
    </div>
  );
}
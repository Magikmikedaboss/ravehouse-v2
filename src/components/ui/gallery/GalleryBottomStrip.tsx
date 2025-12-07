// src/components/ui/gallery/GalleryBottomStrip.tsx
import Surface from "@/components/ui/Surface";
import Chip from "@/components/ui/Chip";

export default function GalleryBottomStrip() {
  return (
    <Surface className="mt-4 overflow-hidden">
      <div className="relative h-64 w-full">
        {/* Checkerboard placeholder for multi-cam grid */}
        <div className="absolute inset-0 bg-[linear-gradient(45deg,#2b1a29_25%,transparent_25%,transparent_50%,#2b1a29_50%,#2b1a29_75%,transparent_75%,transparent)] bg-[length:24px_24px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute left-4 right-4 top-3 flex items-center gap-2 text-xxs">
          <Chip variant="orange">Aftermovie</Chip>
          <Chip variant="cyan">Downtown LV</Chip>        </div>
        <div className="absolute left-4 right-4 bottom-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1 text-xs text-white/90">
            <p className="font-semibold text-white">One minute in the pit</p>
            <p className="text-white/70">
              Clip · 00:59 · 4 camera angles · Crowd cam, booth cam, balcony cam
              and rig cam stitched.
            </p>
          </div>
          <button className="mt-2 inline-flex items-center justify-center rounded-full bg-white px-4 py-2 text-xs font-semibold text-black hover:brightness-110">
            Open multi-cam view
          </button>
        </div>
      </div>
    </Surface>
  );
}

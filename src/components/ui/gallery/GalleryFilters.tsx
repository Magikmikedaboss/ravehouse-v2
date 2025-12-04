// src/components/ui/gallery/GalleryFilters.tsx
import Chip from "@/components/ui/Chip";

const FILTERS = [
  "All moments",
  "Photos",
  "Aftermovies",
  "Clips & reels",
  "Polaroids",
];

export default function GalleryFilters() {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-wrap gap-2 text-[11px]">
        {FILTERS.map((filter, index) => (
          <button
            key={filter}
            type="button"
            className={`rounded-full border px-3 py-1 transition ${
              index === 0
                ? "border-white bg-white text-black"
                : "border-white/15 bg-white/5 text-white/75 hover:bg-white/10"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2 text-[11px]">
        <button className="rounded-full border border-white/15 bg-white/5 px-3 py-1 hover:bg-white/10">
          ⬇ Download your snaps
        </button>
        <Chip className="bg-rave-pink/15 border-rave-pink/30">Grid</Chip>
        <Chip className="bg-rave-cyan/15 border-rave-cyan/30">Stack</Chip>
      </div>
    </div>
  );
}

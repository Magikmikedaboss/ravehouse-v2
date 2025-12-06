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
                ? "border-black bg-black text-white"
                : "border-black/15 bg-black/5 text-black/75 hover:bg-black/10"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2 text-[11px]">
        <button className="rounded-full border border-black/15 bg-black/5 px-3 py-1 hover:bg-black/10 text-black/75">
          ⬇ Download your snaps
        </button>
        <Chip className="border bg-rh-pink-light/15 border-rh-pink-light/30">Grid</Chip>
        <Chip className="border bg-rh-cyan/15 border-rh-cyan/30">Stack</Chip>      </div>
    </div>
  );
}

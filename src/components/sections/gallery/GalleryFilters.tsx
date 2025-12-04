// src/components/sections/gallery/GalleryFilters.tsx
import Chip from "@/components/ui/Chip";

const filters = [
  "All",
  "Warehouse",
  "Rooftop",
  "Afterhours",
  "2025",
  "2024",
  "2023",
];

export default function GalleryFilters() {
  return (
    <div className="flex flex-wrap gap-2 text-[11px]">
      {filters.map((filter, i) => (
        <button
          key={filter}
          className={`inline-flex items-center rounded-full border px-3 py-1 text-xs ${
            i === 0
              ? "border-white bg-white text-black"
              : "border-white/10 bg-white/5 text-white/75 hover:bg-white/10"
          }`}
          type="button"
        >
          {filter}
        </button>
      ))}
    </div>
  );
}
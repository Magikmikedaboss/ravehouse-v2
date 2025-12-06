// src/components/ui/gallery/GalleryFilters.tsx
"use client";

const FILTERS = ["All nights", "This month", "Warehouse", "Rooftop", "Afterhours"];

interface GalleryFiltersProps {
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
}

export default function GalleryFilters({ selectedFilter, onFilterChange }: GalleryFiltersProps) {

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 px-4 lg:px-6">
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((filter) => (
          <button
            key={filter}
            onClick={() => onFilterChange(filter)}
            aria-pressed={selectedFilter === filter}
            aria-label={`Filter gallery by ${filter.toLowerCase()}`}
            className={`rounded-full border px-3 py-1 text-xs transition ${
              selectedFilter === filter
                ? "border-white/30 bg-white/10 text-white"
                : "border-white/10 bg-white/10 text-white/80 hover:bg-white/15"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>
      <button 
        disabled 
        className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-white/80 text-xs opacity-50 cursor-not-allowed"
      >
        {/* TODO: Phase 2 - Implement download selected photos */}
        Download selected
      </button>    </div>
  );
}

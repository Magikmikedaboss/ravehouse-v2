// src/app/gallery/page.tsx
"use client";

import { useState } from "react";
import GalleryHero from "@/components/ui/gallery/GalleryHero";
import GalleryFilters, { FILTERS } from "@/components/ui/gallery/GalleryFilters";
import GalleryFeed from "@/components/ui/gallery/GalleryFeed";
import GallerySidebar from "@/components/ui/gallery/GallerySidebar";
import GalleryBottomStrip from "@/components/ui/gallery/GalleryBottomStrip";

const DEFAULT_FILTER = FILTERS[0]; // "All nights"

export default function GalleryPage() {
  const [selectedFilter, setSelectedFilter] = useState(DEFAULT_FILTER);

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
    // Future: Filter gallery items based on selected filter
  };

  return (
    <div className="space-y-10 pb-10">
      <GalleryHero />

      <section className="space-y-5">
        <GalleryFilters selectedFilter={selectedFilter} onFilterChange={handleFilterChange} />

        <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.2fr)]">
          <GalleryFeed />
          <GallerySidebar />
        </div>

        <GalleryBottomStrip />
      </section>
    </div>
  );
}

// src/app/gallery/page.tsx
"use client";

import GalleryHero from "@/components/ui/gallery/GalleryHero";
import GalleryFilters from "@/components/ui/gallery/GalleryFilters";
import GalleryFeed from "@/components/ui/gallery/GalleryFeed";
import GallerySidebar from "@/components/ui/gallery/GallerySidebar";
import GalleryBottomStrip from "@/components/ui/gallery/GalleryBottomStrip";

export default function GalleryPage() {
  // TODO: Implement actual filtering logic when backend/gallery data is available
  const handleFilterChange = (filter: string) => {
    // Future: Filter gallery items based on selected filter
  };

  return (
    <div className="space-y-10 pb-10">
      <GalleryHero />

      <section className="space-y-5">
        <GalleryFilters selectedFilter="All nights" onFilterChange={handleFilterChange} />

        <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.2fr)]">
          <GalleryFeed />
          <GallerySidebar />
        </div>

        <GalleryBottomStrip />
      </section>
    </div>
  );
}

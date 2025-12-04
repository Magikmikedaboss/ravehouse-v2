// src/components/sections/gallery/GalleryFeed.tsx
import Surface from "@/components/ui/Surface";

export default function GalleryFeed() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 12 }).map((_, i) => (
        <Surface key={i} className="overflow-hidden">
          <div className="relative h-48 w-full">
            <div className="absolute inset-0 bg-gradient-to-br from-rave-pink/40 via-rave-purple/40 to-black" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute bottom-3 left-3 right-3">
              <p className="text-xs text-white/80">Warehouse Eclipse · {2025 - (i % 3)}</p>
            </div>
          </div>
        </Surface>
      ))}
    </div>
  );
}
// src/components/sections/gallery/GalleryBottomStrip.tsx
import Surface from "@/components/ui/Surface";

export default function GalleryBottomStrip() {
  return (
    <Surface className="p-6 text-center">
      <h2 className="text-xl font-semibold">Want to see more?</h2>
      <p className="mt-2 text-sm text-white/70">
        Follow us on Instagram for live updates and behind-the-scenes content.
      </p>
      <div className="mt-4">
        <span className="text-sm font-medium">@ravehouse_lv</span>
      </div>
    </Surface>
  );
}
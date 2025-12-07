
import Link from "next/link";
import Surface from "@/components/ui/Surface";
import SectionHeader from "@/components/ui/SectionHeader";

export default function AfterglowGallery() {
  return (
    <section className="space-y-4">
      <SectionHeader
        title="Afterglow gallery"
        description="Flashes from the floor. Photos and aftermovies from recent raves."
        endSlot={
          <Link href="/gallery" className="hover:text-white">
            Open full gallery →
          </Link>        }
      />

      <Surface className="overflow-hidden p-4">
        <div className="flex gap-3 overflow-x-auto">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="h-32 min-w-[180px] flex-1 rounded-2xl bg-gradient-to-br from-rh-pink-light/40 via-rh-pink-dark/40 to-black"            />
          ))}
        </div>
      </Surface>
    </section>
  );
}

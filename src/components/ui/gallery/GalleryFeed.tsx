// src/components/ui/gallery/GalleryFeed.tsx

import Surface from "@/components/ui/Surface";

const galleryItems = [
  {
    id: 1,
    event: "Warehouse Eclipse",
    date: "Dec 2025",
    type: "Main Stage",
    description: "Opening set with full crowd",
    image: "/images/gallery/warehouse-1.jpg"
  },
  {
    id: 2,
    event: "Neon Skyline",
    date: "Nov 2025",
    type: "Rooftop",
    description: "Sunset vibes over the Strip",
    image: "/images/gallery/rooftop-1.jpg"
  },
  {
    id: 3,
    event: "Basement 305",
    date: "Oct 2025",
    type: "Afterhours",
    description: "Intimate underground session",
    image: "/images/gallery/basement-1.jpg"
  },
  {
    id: 4,
    event: "Warehouse Eclipse",
    date: "Dec 2025",
    type: "Crowd Shot",
    description: "Peak moment at midnight",
    image: "/images/gallery/warehouse-2.jpg"
  },
  {
    id: 5,
    event: "Neon Alley",
    date: "Sep 2025",
    type: "Street Party",
    description: "Block party takeover",
    image: "/images/gallery/street-1.jpg"
  },
  {
    id: 6,
    event: "VIP Afterparty",
    date: "Aug 2025",
    type: "Private",
    description: "Exclusive VIP lounge",
    image: "/images/gallery/vip-1.jpg"
  },
  {
    id: 7,
    event: "Warehouse Eclipse",
    date: "Dec 2025",
    type: "DJ Booth",
    description: "Behind the decks action",
    image: "/images/gallery/dj-booth.jpg"
  },
  {
    id: 8,
    event: "Neon Skyline",
    date: "Nov 2025",
    type: "Dance Floor",
    description: "Full energy on the rooftop",
    image: "/images/gallery/dance-floor.jpg"
  },
  {
    id: 9,
    event: "Basement 305",
    date: "Oct 2025",
    type: "Atmosphere",
    description: "Haze and lights perfection",
    image: "/images/gallery/atmosphere.jpg"
  },
  {
    id: 10,
    event: "Warehouse Eclipse",
    date: "Dec 2025",
    type: "Group Photo",
    description: "Ravehouse Entertainment family moment",
    image: "/images/gallery/group.jpg"
  },
  {
    id: 11,
    event: "Neon Alley",
    date: "Sep 2025",
    type: "Visuals",
    description: "LED installations lighting up",
    image: "/images/gallery/visuals.jpg"
  },
  {
    id: 12,
    event: "VIP Afterparty",
    date: "Aug 2025",
    type: "Cocktail",
    description: "Premium bar service",
    image: "/images/gallery/bar.jpg"
  }
];

export default function GalleryFeed({ selectedFilter }: { selectedFilter: string }) {
  const filteredItems = galleryItems.filter((item) => {
    switch (selectedFilter) {
      case "All nights":
        return true;
      case "This month":
        return item.date.includes("Dec 2025");
      case "Warehouse":
        return item.event.toLowerCase().includes("warehouse");
      case "Rooftop":
        return item.type.toLowerCase().includes("rooftop");
      case "Afterhours":
        return item.type.toLowerCase().includes("afterhours");
      default:
        return true;
    }
  });

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {filteredItems.map((item) => (
        <Surface key={item.id} className="overflow-hidden group cursor-pointer">
          <div className="relative h-48 w-full">
            {/* Placeholder gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-rh-pink-light/40 via-rh-pink-shell/40 to-black" />
            {/* TODO: Replace with actual image: <Image src={item.image} alt={item.description} fill className="object-cover" /> */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="text-center text-white">
                <p className="text-sm font-semibold">{item.event}</p>
                <p className="text-xs opacity-80">{item.type}</p>
              </div>
            </div>

            {/* Bottom info */}
            <div className="absolute bottom-3 left-3 right-3">
              <p className="text-xs text-white/90 font-medium">{item.event} · {item.date}</p>
              <p className="text-xs text-white/70 mt-1">{item.description}</p>
            </div>          </div>
        </Surface>
      ))}
    </div>
  );
}

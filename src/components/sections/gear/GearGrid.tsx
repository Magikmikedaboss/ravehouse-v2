import Surface from "@/components/ui/Surface";
import Chip from "@/components/ui/Chip";
import Link from "next/link";

type GearItem = {
  name: string;
  category: "Hydration" | "Protection" | "Comfort" | "LED & Visuals" | "Bags";
  blurb: string;
  badge?: string;
  link?: string; // future affiliate link
};

const GEAR_ITEMS: GearItem[] = [
  {
    name: "Low-profile reusable earplugs",
    category: "Protection",
    blurb:
      "Keeps your hearing alive without killing the system—critical for weekly warehouse people.",
    badge: "Must-have",
  },
  {
    name: "Hydration pack (sleek, no slosh)",
    category: "Hydration",
    blurb:
      "Slim enough to dance hard, big enough to dodge the $10 water bottles all night.",
  },
  {
    name: "Blackout breathable tee",
    category: "Comfort",
    blurb:
      "Looks clean in photos and doesn’t turn into a soaked flag 45 minutes in.",
  },
  {
    name: "Minimalist crossbody + phone leash",
    category: "Bags",
    blurb:
      "Phone, keys, chapstick, earplugs—locked down but always reachable, even in the pit.",
  },
  {
    name: "Micro LED finger clips",
    category: "LED & Visuals",
    blurb:
      "Tiny, subtle, and bright enough to turn an alley or rooftop corner into your own tunnel.",
  },
  {
    name: "Compact neck fan / cooling strip",
    category: "Comfort",
    blurb:
      "For heatwave nights or deep crowd pockets—turns dying into dancing again.",
    badge: "Summer saver",
  },
];

export default function GearGrid() {
  return (
    <section className="space-y-4 px-4 pb-14 pt-6 lg:px-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-white/60">
            Curated picks
          </p>
          <h2 className="text-xl font-semibold text-white sm:text-2xl">
            Built for warehouses, rooftops and afterhours.
          </h2>
          <p className="mt-1 text-xs text-white/70 max-w-xl">
            Essential gear tested in real underground settings. Each item chosen for durability, function, and style.
          </p>
        </div>      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {GEAR_ITEMS.map((item) => (
          <Surface key={item.name} className="flex h-full flex-col p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <p className="text-xs uppercase tracking-[0.15em] text-white/60">
                  {item.category}
                </p>
                <h3 className="text-sm font-semibold text-white">
                  {item.name}
                </h3>
              </div>
              {item.badge && (
                <Chip className="bg-rh-pink-light text-black border-none text-[10px]">
                  {item.badge}
                </Chip>
              )}
            </div>

            <p className="mt-2 flex-1 text-xs text-white/75">
              {item.blurb}
            </p>

            <div className="mt-3 flex items-center justify-between text-[11px] text-white/60">
              {!item.link && <span>Brand &amp; link TBD</span>}
              {item.link ? (
                <Link
                  href={item.link}
                  className="text-white hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View →
                </Link>
              ) : (
                <span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px]">
                  Coming soon
                </span>
              )}
            </div>
          </Surface>
        ))}
      </div>
    </section>
  );
}
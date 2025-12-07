// src/components/sections/home/UpcomingEvents.tsx
import Link from "next/link";
import Surface from "@/components/ui/Surface";
import Chip from "@/components/ui/Chip";
import SectionHeader from "@/components/ui/SectionHeader";

const upcomingEvents = [
  {
    id: "warehouse-eclipse",
    title: "Warehouse Eclipse",
    date: "Sat · 28 Dec",
    time: "11:30PM – Late",
    tag: "Limited",
    venue: "Downtown LV · Secret warehouse · 21+",
    price: "From $45",
  },
  {
    id: "skyline-frequencies",
    title: "Skyline Frequencies NYE",
    date: "Tue · 31 Dec",
    time: "9:00PM – 4AM",
    tag: "Low tickets",
    venue: "Strip rooftop · Open air · 21+",
    price: "From $80",
  },
  {
    id: "subterranean-sessions",
    title: "Subterranean Sessions",
    date: "Fri · 05 Jan",
    time: "10:00PM – 3AM",
    tag: "Free RSVP",
    venue: "Arts District · Basement club · 21+",
    price: "Free before 1AM",
  },
];

const filters = ["All", "This weekend", "Techno", "House", "Warehouse", "Rooftop"];

export default function UpcomingEvents() {
  return (
    <section className="space-y-4">
      <SectionHeader
        title="Upcoming events"
        description="Curated underground parties across Las Vegas. No fluff, just sweat and strobes."
        endSlot={
          <Link href="/events" className="hover:text-black">
            View all events →
          </Link>
        }
      />

      <div className="flex flex-wrap gap-2 text-[11px]">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            className={`inline-flex items-center rounded-full border px-3 py-1 text-xs ${
              f === "All"
                ? "border-black bg-black text-white"
                : "border-black/10 bg-black/5 text-black/75 hover:bg-black/10"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {upcomingEvents.map((event) => (
          <Surface key={event.id} className="overflow-hidden">
            <div className="relative h-40 w-full">
              <Chip variant="lightOverlay" className="absolute left-3 top-3">
                {event.tag}
              </Chip>
              {/* Placeholder gradient – replace with real event image */}
              <div className="h-full w-full bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400" />
            </div>
            <div className="p-4">
              <p className="text-[11px] text-black/50">
                {event.date} · {event.time}
              </p>
              <h3 className="mt-1 text-sm font-semibold text-black">{event.title}</h3>
              <p className="mt-1 text-xs text-black/65">{event.venue}</p>
              <div className="mt-3 flex items-center justify-between text-xs">
                <span className="text-black/75">{event.price}</span>
                <Link
                  href={`/events/${event.id}`}
                  className="rounded-full bg-black px-3 py-1 text-[11px] font-semibold text-white"
                >
                  View Event
                </Link>
              </div>
            </div>
          </Surface>
        ))}
      </div>
    </section>
  );
}

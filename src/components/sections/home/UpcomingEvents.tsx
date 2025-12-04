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
          <Link href="/events" className="hover:text-white">
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
                ? "border-white bg-white text-black"
                : "border-white/10 bg-white/5 text-white/75 hover:bg-white/10"
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
              <Chip className="absolute left-3 top-3 bg-black/75 border-white/20">
                {event.tag}
              </Chip>
              {/* Placeholder gradient – replace with real event image */}
              <div className="h-full w-full bg-gradient-to-br from-rave-pink/40 via-rave-purple/40 to-black" />
            </div>
            <div className="p-4">
              <p className="text-[11px] text-white/50">
                {event.date} · {event.time}
              </p>
              <h3 className="mt-1 text-sm font-semibold">{event.title}</h3>
              <p className="mt-1 text-xs text-white/65">{event.venue}</p>
              <div className="mt-3 flex items-center justify-between text-xs">
                <span className="text-white/75">{event.price}</span>
                <Link
                  href={`/events/${event.id}`}
                  className="rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-black"
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

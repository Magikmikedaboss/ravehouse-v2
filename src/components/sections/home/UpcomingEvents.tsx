// src/components/sections/home/UpcomingEvents.tsx
import Link from "next/link";
import Surface from "@/components/ui/Surface";
import Chip from "@/components/ui/Chip";
import SectionHeader from "@/components/ui/SectionHeader";

const tagToVariant = (tag: string): "pink" | "orange" | "cyan" => {
  if (/free/i.test(tag)) return "cyan";
  if (/low|limited/i.test(tag)) return "orange";
  return "pink";
};

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
          <Link href="/events" className="hover:text-[rgb(var(--rh-text-primary))]">
            View all events →
          </Link>
        }
      />

      <div className="flex flex-wrap gap-2 text-xxs">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            className={`inline-flex items-center rounded-full border px-3 py-1 text-xs ${
              f === "All"
                ? "border-[rgb(var(--rh-text-primary))] bg-[rgb(var(--rh-text-primary))] text-[rgb(var(--rh-bg-page))]"
                : "border-[rgb(var(--rh-border))]/10 bg-[rgb(var(--rh-bg-surface))]/5 text-[rgb(var(--rh-text-secondary))] hover:bg-[rgb(var(--rh-bg-surface))]/10"
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
              <Chip variant={tagToVariant(event.tag)} className="absolute left-3 top-3" size="sm">
                {event.tag}
              </Chip>
              {/* Placeholder gradient – replace with real event image */}
              <div className="h-full w-full bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400" />
            </div>
            <div className="p-4">
              <p className="text-xxs text-[rgb(var(--rh-text-secondary))]">
                {event.date} · {event.time}
              </p>
              <h3 className="mt-1 text-sm font-semibold text-[rgb(var(--rh-text-primary))]">{event.title}</h3>
              <p className="mt-1 text-xs text-[rgb(var(--rh-text-secondary))]">{event.venue}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Chip variant="neutral" size="sm">Techno</Chip>
                <Chip variant="neutral" size="sm">Warehouse</Chip>
                <Chip variant="neutral" size="sm">Secret lineup</Chip>
              </div>
              <div className="mt-3 flex items-center justify-between text-xs">
                <span className="text-[rgb(var(--rh-text-secondary))]">{event.price}</span>
                <Link
                  href={`/events/${event.id}`}
                  className="rounded-full bg-[rgb(var(--rh-text-primary))] px-3 py-1 text-xxs font-semibold text-[rgb(var(--rh-bg-page))]"
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

// src/app/events/page.tsx

import Surface from "@/components/ui/Surface";
import Chip from "@/components/ui/Chip";
import SectionHeader from "@/components/ui/SectionHeader";
import { ButtonLink } from "@/components/ui/Button";

const filters = [
  "All",
  "This weekend",
  "Tonight",
  "Techno",
  "House",
  "Bass & breaks",
  "Strip",
  "Downtown",
  "Warehouse zone",
];

const upcomingEvents = [
  {
    id: "warehouse-eclipse",
    title: "Warehouse Eclipse · Techno Marathon",
    day: "Fri",
    time: "11:00PM – 5:00AM",
    status: "Free RSVP before 11PM",
    badge: "Free RSVP",
    price: "From $35",
    area: "Downtown LV · Exact location drops 24h before doors.",
    genres: ["Techno", "Lunar", "Raven"],
  },
  {
    id: "skyline-house-strip",
    title: "Neon Skyline · House on the Strip",
    day: "Sat",
    time: "9:30PM – 5:00AM",
    status: "VIP tables from $480",
    badge: "On sale",
    price: "From $45",
    area: "Strip rooftop · View of the full valley.",
    genres: ["House", "Tail & Bass", "Resident rotation"],
  },
  {
    id: "basement-305",
    title: "Basement 305 · Afterhours Communion",
    day: "Sun",
    time: "2:30AM – late",
    status: "Locals $15 all night",
    badge: "On sale",
    price: "$20 all night · Locals $15",
    area: "Arts District · Intimate lights, low sound, heavy haze.",
    genres: ["Analog Ritual", "Local Support"],
  },
  {
    id: "block-party",
    title: "Neon Alley · Block Party Edition",
    day: "Next Thu",
    time: "8:00PM – 1:00AM",
    status: "Waitlist open",
    badge: "Sold out",
    price: "Free RSVP · Waitlist open",
    area: "Downtown · Alleyway · Open-air, street food, visual rigs.",
    genres: ["Ravehouse Residents", "All night long"],
  },
];

const tonightColumn = [
  {
    title: "Warehouse Eclipse",
    slot: "11:00PM – Downtown LV · Techno",
    status: "Line moving",
  },
  {
    title: "Neon Skyline",
    slot: "10:00PM – Strip rooftop · House",
    status: "Doors soon",
  },
  {
    title: "Basement 305",
    slot: "2:30AM – Arts District · Afterhours",
    status: "Late night",
  },
];

export default function EventsPage() {
  return (
    <div className="space-y-10 pb-10">
      {/* TOP HERO ROW */}
      <section className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.2fr)]">
        {/* Left hero surface */}
        <Surface className="overflow-hidden">
          <div className="relative h-64 w-full sm:h-80">
            <div className="absolute inset-0 bg-gradient-to-br from-rave-pink/40 via-rave-purple/40 to-black" />            {/* TODO: replace with real hero image */}
            <div className="absolute inset-0 bg-[url('/images/backgrounds/warehouse.jpg')] bg-cover bg-center mix-blend-overlay opacity-70" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

            <div className="absolute left-4 right-4 top-4 flex justify-between text-[11px] text-white/80">
              <Chip className="bg-rave-cyan/30 border-rave-cyan/50">
                Upcoming raves · Las Vegas
              </Chip>
              <Chip className="bg-rave-cyan/30 border-rave-cyan/50">
                Warehouse · Rooftop · Afterhours
              </Chip>
            </div>

            <div className="absolute bottom-6 left-6 right-6 space-y-3">
              <p className="text-[11px] uppercase tracking-[0.3em] text-white/60">
                Curated underground nights, every week in the city that never powers down.
              </p>
              <h1 className="text-3xl font-semibold sm:text-4xl">
                FIND YOUR NEXT RAVEHOUSE
              </h1>
              <p className="max-w-xl text-sm text-white/75">
                Lock in your spot at upcoming warehouses, rooftop takeovers and secret
                afterhours across Las Vegas.
              </p>
              <div className="mt-3 flex flex-wrap gap-3">
                <ButtonLink href="/events" className="glow">
                  See this weekend&apos;s raves
                </ButtonLink>
                <ButtonLink href="/events" variant="secondary">
                  Browse full calendar
                </ButtonLink>
              </div>
              <div className="mt-2 flex flex-wrap gap-2 text-[11px] text-white/60">
                <Chip className="bg-rave-pink/20 border-transparent">
                  Location drops 24h before doors
                </Chip>
                <Chip className="bg-rave-orange/20 border-transparent">
                  No dress code · Just energy
                </Chip>
                <Chip className="bg-rave-purple/20 border-transparent">
                  All genres: Techno, House, Bass
                </Chip>
              </div>
            </div>
          </div>
        </Surface>

        {/* Right column highlights */}
        <div className="space-y-4">
          <Surface className="p-5">
            <p className="text-xs text-white/60">This weekend in Vegas</p>
            <h2 className="mt-1 text-sm font-semibold">
              Three nights, three different stories. Pick your vibe or run the full trilogy.
            </h2>
            <div className="mt-3 flex flex-wrap gap-2 text-[11px]">
              <Chip className="bg-rave-pink/25 border-none">
                Fri · Warehouse Eclipse
              </Chip>
              <Chip className="bg-rave-cyan/25 border-none">
                Sat · Neon Alley Rooftop
              </Chip>
              <Chip className="bg-rave-purple/25 border-none">
                Sun · Basement 305 afterhours
              </Chip>
            </div>
            <p className="mt-2 text-xs text-white/65">
              Most events sell out before doors. RSVP or grab tickets early.
            </p>
          </Surface>

          <Surface className="p-5">
            <p className="text-xs text-white/60">Vegas local?</p>
            <h2 className="mt-1 text-sm font-semibold">
              Unlock locals-only lines, discounts and VIP upgrades when you create a free profile.
            </h2>
            <ul className="mt-2 space-y-1 text-xs text-white/70">
              <li>• Save favorite events</li>
              <li>• Track past nights</li>
              <li>• Early RSVP windows</li>
            </ul>
            <ButtonLink
              href="/signup"
              className="mt-4 w-full justify-center"
            >
              Create free profile
            </ButtonLink>
          </Surface>
        </div>
      </section>

      {/* UPCOMING EVENTS GRID */}
      <section className="space-y-4">
        <SectionHeader
          eyebrow="Upcoming events"
          title="Dial in by date, genre or neighborhood. All times in PT."
          endSlot={<span className="text-xs text-white/60">Export calendar</span>}
        />

        {/* Filter chips */}
        <div className="flex flex-wrap gap-2 text-[11px]">
          {filters.map((filter, i) => (
            <button
              key={filter}
              className={`inline-flex items-center rounded-full border px-3 py-1 text-xs ${
                i === 1
                  ? "border-white bg-white text-black"
                  : "border-white/10 bg-white/5 text-white/75 hover:bg-white/10"
              }`}
              type="button"
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Events grid + right column */}
        <div className="grid gap-5 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.1fr)]">
          {/* Event cards */}
          <div className="grid gap-4 md:grid-cols-2">
            {upcomingEvents.map((event) => (
              <Surface key={event.id} className="overflow-hidden">
                <div className="relative h-32 w-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-rave-pink/40 via-rave-purple/40 to-black" />
                  <div className="absolute inset-0 bg-[url('/images/events/placeholder.jpg')] bg-cover bg-center mix-blend-overlay opacity-70" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute left-3 top-3 flex items-center gap-2 text-[11px]">
                    <Chip className="bg-rave-cyan/30 border-rave-cyan/50">
                      {event.day} · {event.time}
                    </Chip>
                    <Chip className="bg-rave-cyan/30 border-rave-cyan/50">
                      {event.badge}
                    </Chip>
                  </div>
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="text-sm font-semibold">{event.title}</h3>
                  <p className="text-xs text-white/65">{event.area}</p>
                  <div className="flex flex-wrap gap-1 text-[11px] text-white/65">
                    {event.genres.map((g) => (
                      <Chip
                        key={g}
                        className="bg-rave-purple/15 border-rave-purple/30 text-[11px]"
                      >
                        {g}
                      </Chip>
                    ))}
                  </div>
                  <div className="mt-2 flex items-center justify-between text-xs">
                    <span className="text-white/75">{event.price}</span>
                    <ButtonLink
                      href={`/events/${event.id}`}
                      variant="secondary"
                      className="px-3 py-1 text-[11px]"
                    >
                      {event.badge === "Sold out" ? "Join waitlist" : "View event"}
                    </ButtonLink>
                  </div>
                  <p className="text-[11px] text-white/55 mt-1">{event.status}</p>
                </div>
              </Surface>
            ))}
          </div>

          {/* Right info column */}
          <div className="space-y-4">
            <Surface className="p-4">
              <p className="text-xs text-white/60">Next up tonight</p>
              <h3 className="mt-1 text-sm font-semibold">
                Doors times, last entry and neighborhood at a glance.
              </h3>
              <div className="mt-3 space-y-2 text-xs">
                {tonightColumn.map((item) => (
                  <div
                    key={item.title}
                    className="flex items-center justify-between gap-3 rounded-2xl bg-white/5 px-3 py-2"
                  >
                    <div>
                      <p className="font-medium text-white">{item.title}</p>
                      <p className="text-[11px] text-white/65">{item.slot}</p>
                    </div>
                    <Chip className="bg-green-500/15 border-green-400/30 text-[11px] text-green-300">
                      {item.status}
                    </Chip>
                  </div>
                ))}
              </div>
            </Surface>

            <Surface className="p-4">
              <p className="text-xs text-white/60">Ravehouse calendar drops</p>
              <h3 className="mt-1 text-sm font-semibold">
                Be first in when new warehouses, rooftops or special guests are announced.
              </h3>
              <ul className="mt-2 space-y-1 text-xs text-white/70">
                <li>• Early RSVPs for secret sets</li>
                <li>• Last-minute codes before events sell out</li>
                <li>• No spam, just lineups.</li>
              </ul>
              <form className="mt-3 flex gap-2">
                <input
                  type="email"
                  className="flex-1 rounded-full border border-white/10 bg-black/40 px-3 py-2 text-xs outline-none placeholder:text-white/30"
                  placeholder="Enter email for event drops"
                />
                <button
                  type="submit"
                  className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-black"
                >
                  Notify me
                </button>
              </form>
            </Surface>

            <Surface className="p-4">
              <p className="text-xs text-white/60">Looking for VIP?</p>
              <h3 className="mt-1 text-sm font-semibold">
                Skip the line and lock in booths across our warehouses and partner venues with VIP access.
              </h3>
              <ButtonLink
                href="/vip"
                variant="secondary"
                className="mt-3 w-full justify-center"
              >
                Explore VIP & local access
              </ButtonLink>
            </Surface>
          </div>
        </div>
      </section>
    </div>
  );
}

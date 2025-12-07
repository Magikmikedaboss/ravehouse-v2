// src/app/events/page.tsx

import Image from "next/image";
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
    genres: ["Ravehouse Entertainment Residents", "All night long"],
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
      {/* Hero section */}
      <section className="space-y-6">
        <div className="relative overflow-hidden rounded-rh-lg border border-white/10 shadow-rh-soft bg-black w-full">
          {/* Responsive, capped height instead of fixed 600px */}
          <div className="relative h-[clamp(360px,38vw,520px)] w-full overflow-hidden">
            <Image
              src="/images/gallery/vecteezy_decorated-place-cloudy-weather-group-of-young-people-in_15294272.jpg"
              alt="People enjoying an outdoor decorated space"
              fill
              className="absolute inset-0 h-full w-full object-cover object-[center_35%]"
              priority
              fetchPriority="high"
              sizes="100vw"
            />

            {/* Main overlay: slightly simplified for smoother contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent pointer-events-none" />
            {/* Top scrim so badges are always readable */}
            <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-black/35 to-transparent pointer-events-none" />
            {/* Bottom scrim: tighten to bottom half only */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/55 to-transparent pointer-events-none" />

            {/* Top badges — allow full wrap on mobile, keep both visible */}
            <div className="absolute left-4 right-4 top-4 flex flex-wrap gap-2 text-xxs text-white/95">
              <Chip variant="cyan">Upcoming raves · Las Vegas</Chip>
              <Chip variant="cyan" className="flex">Warehouse · Rooftop · Afterhours</Chip>
            </div>

            {/* Bottom content */}
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6">
              <div className="max-w-[min(100%,720px)] space-y-2 sm:space-y-3">
                <p className="text-xs sm:text-xxs uppercase tracking-wider sm:tracking-[0.3em] text-white/75">
                  Curated underground nights, every week
                </p>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white drop-shadow-lg">
                  DISCOVER YOUR NEXT<br className="hidden sm:inline" /> UNDERGROUND NIGHT
                </h1>
                <p className="text-base sm:text-sm text-white/90 drop-shadow-md">
                  Lock in your spot at upcoming warehouses, rooftop takeovers and secret afterhours across Las Vegas.
                </p>
                <div className="mt-3 flex flex-wrap gap-2 sm:gap-3">
                  <ButtonLink href="/events?filter=weekend" className="text-sm sm:text-xs">See this weekend&apos;s raves</ButtonLink>
                  <ButtonLink href="/events" variant="secondary" className="text-sm sm:text-xs">Browse full calendar</ButtonLink>
                </div>

                {/* Chips: always wrap; readable sizes on mobile */}
                <div className="mt-2 flex flex-wrap gap-2 text-xs sm:text-xxs">
                  <Chip variant="pink">Location drops 24h before</Chip>
                  <Chip variant="orange">No dress code · Just energy</Chip>
                  <Chip variant="purple">Techno, House, Bass</Chip>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Right column highlights - MOVED BELOW HERO */}
      <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="space-y-4">
          <Surface className="p-5">
            <p className="text-xs text-white/60">This weekend in Vegas</p>
            <h2 className="mt-1 text-sm font-semibold">
              Three nights, three different stories. Pick your vibe or run the full trilogy.
            </h2>
            <div className="mt-3 flex flex-wrap gap-2 text-xxs">
              <Chip variant="pink">
                Fri · Warehouse Eclipse
              </Chip>
              <Chip variant="cyan">
                Sat · Neon Alley Rooftop
              </Chip>
              <Chip variant="purple">
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
        <div className="flex flex-wrap gap-2 text-xxs">
          {filters.map((filter, i) => (
            <button
              key={filter}
              className={`inline-flex items-center rounded-full border px-3 py-1 text-xs ${
                i === 1
                  ? "border-white bg-white text-black"
                  : "border-white/10 bg-white/10 text-white/90 hover:bg-white/25 hover:text-white"
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
                  <div className="absolute inset-0 bg-linear-to-br from-rave-pink/40 via-rave-purple/40 to-black" />
                  <div className="absolute inset-0 bg-[url('/images/events/placeholder.jpg')] bg-cover bg-center mix-blend-overlay opacity-70" />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute left-3 top-3 flex items-center gap-2 text-xxs">
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
                  <div className="flex flex-wrap gap-1 text-xxs text-white/65">
                    {event.genres.map((g) => (
                      <Chip
                        key={g}
                        variant="purple"
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
                      className="px-3 py-1 text-xxs"
                    >
                      {event.badge === "Sold out" ? "Join waitlist" : "View event"}
                    </ButtonLink>
                  </div>
                  <p className="text-xxs text-white/55 mt-1">{event.status}</p>
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
                      <p className="text-xxs text-white/65">{item.slot}</p>
                    </div>
                    <Chip variant="success">
                      {item.status}
                    </Chip>
                  </div>
                ))}
              </div>
            </Surface>

            <Surface className="p-4">
              <p className="text-xs text-white/60">Ravehouse Entertainment calendar drops</p>
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

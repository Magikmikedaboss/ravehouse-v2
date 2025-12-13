// src/app/events/page.tsx

"use client";

import Image from "next/image";
import { useState } from "react";
import Surface from "@/components/ui/Surface";
import Chip from "@/components/ui/Chip";import SectionHeader from "@/components/ui/SectionHeader";
import { ButtonLink } from "@/components/ui/Button";

// Calendar Export Component
function CalendarExportButton() {
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCalendarExport = async () => {
    setIsExporting(true);
    setError(null);
    
    try {
      // Generate ICS calendar data for upcoming events
      const icsContent = generateICSContent(upcomingEvents);
      
      // Create and download the .ics file
      const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
      const url = window.URL.createObjectURL(blob);
      try {
        const link = document.createElement('a');
        link.href = url;
        link.download = 'ravehouse-events.ics';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } finally {
        window.URL.revokeObjectURL(url);
      }
      
    } catch (err) {
      setError('Failed to export calendar. Please try again.');
      console.error('Calendar export error:', err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <button
      onClick={handleCalendarExport}
      disabled={isExporting}
      className="text-xs text-secondary hover:text-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2 rounded px-1 py-0.5"
      aria-label={isExporting ? "Exporting calendar..." : "Export events to calendar"}
    >
      {isExporting ? "Exporting..." : "Export calendar"}
      {error && (
        <span className="block text-red-400 text-xxs mt-1">{error}</span>
      )}
    </button>
  );
}

// Helper function to escape ICS special characters
function escapeICSText(text: string): string {
  return text
    .replace(/\\/g, '\\\\')  // Escape backslashes first
    .replace(/;/g, '\\;')    // Escape semicolons
    .replace(/,/g, '\\,')    // Escape commas
    .replace(/\n/g, '\\n');  // Escape newlines
}

// Helper function to generate ICS calendar content
function generateICSContent(events: typeof upcomingEvents): string {
  const now = new Date();
  const icsEvents = events.map(event => {
    // For demo purposes, create event dates based on the day property
    const eventDate = getEventDate(event.day, event.time);
    const endDate = getEventEndDate(eventDate, event.time);
    
    return [
      'BEGIN:VEVENT',
      `UID:${event.id}@ravehouse.com`,
      `DTSTART:${formatICSDate(eventDate)}`,
      `DTEND:${formatICSDate(endDate)}`,
      `SUMMARY:${escapeICSText(event.title)}`,
      `DESCRIPTION:${escapeICSText(event.status)}\\n${escapeICSText(event.price)}`,
      'LOCATION:Las Vegas, NV',
      `DTSTAMP:${formatICSDate(now)}`,
      'END:VEVENT'
    ].join('\r\n');
  }).join('\r\n');

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Ravehouse Entertainment//Events Calendar//EN',
    'CALSCALE:GREGORIAN',
    icsEvents,
    'END:VCALENDAR'
  ].join('\r\n');
}

function getEventDate(day: string, time: string): Date {
  const now = new Date();
  const dayMap: Record<string, number> = { 'Sun': 0, 'Mon': 1, 'Tue': 2, 'Wed': 3, 'Thu': 4, 'Fri': 5, 'Sat': 6 };
  // Extract day abbreviation from formats like "Next Thu"
  const dayMatch = day.match(/\b(Sun|Mon|Tue|Wed|Thu|Fri|Sat)\b/);
  const targetDay = dayMatch ? dayMap[dayMatch[1]] : undefined;
  if (targetDay === undefined) {
    // Fallback: return next week if day format is unrecognized
    const fallback = new Date(now);
    fallback.setDate(now.getDate() + 7);
    return fallback;
  }
  const currentDay = now.getDay();
  let daysToAdd = (targetDay - currentDay + 7) % 7;
  if (daysToAdd === 0) daysToAdd = 7; // Next week if same day
  
  const eventDate = new Date(now);
  eventDate.setDate(now.getDate() + daysToAdd);  
  // Parse time (assumes format like "11:00PM")
  const timeMatch = time.match(/(\d{1,2}):(\d{2})(AM|PM)/);
  if (timeMatch) {
    let hours = parseInt(timeMatch[1]);
    const minutes = parseInt(timeMatch[2]);
    const period = timeMatch[3];
    
    if (period === 'PM' && hours !== 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;
    
    eventDate.setHours(hours, minutes, 0, 0);
  }
  
  return eventDate;
}

function getEventEndDate(startDate: Date, time: string): Date {
  const endDate = new Date(startDate);
  // For events spanning midnight, add time based on duration hint
  if (time.includes('–') || time.includes('-')) {
    const timeParts = time.split(/[–-]/);
    if (timeParts.length > 1) {
      const endTimeStr = timeParts[1].trim();
      const endTimeMatch = endTimeStr.match(/(\d{1,2}):(\d{2})(AM|PM)/);
      if (endTimeMatch) {
        let hours = parseInt(endTimeMatch[1]);
        const minutes = parseInt(endTimeMatch[2]);
        const period = endTimeMatch[3];
        
        if (period === 'PM' && hours !== 12) hours += 12;
        if (period === 'AM' && hours === 12) hours = 0;
        
        // If end time is earlier than start time, it's next day
        if (hours < startDate.getHours() || (hours === startDate.getHours() && minutes < startDate.getMinutes())) {
          endDate.setDate(endDate.getDate() + 1);
        }
        
        endDate.setHours(hours, minutes, 0, 0);
      }
    }
  } else {
    // Default to 4 hours if no end time specified
    endDate.setHours(endDate.getHours() + 4);
  }
  
  return endDate;
}

function formatICSDate(date: Date): string {
  // Format using local time components to preserve the intended calendar day/time
  // ICS format: YYYYMMDDTHHMMSS (without timezone designation means local time)
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  
  return `${year}${month}${day}T${hours}${minutes}${seconds}`;
}

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
        <div className="relative w-full overflow-hidden rounded-[var(--rh-radius-lg)] border border-subtle bg-surface shadow-soft">
          {/* Background image + overlays */}
          <div className="pointer-events-none absolute inset-0">
            <Image
              src="/images/gallery/vecteezy_decorated-place-cloudy-weather-group-of-young-people-in_15294272.jpg"
              alt="People enjoying an outdoor decorated space"
              fill
              className="h-full w-full object-cover object-[center_35%]"
              priority
              fetchPriority="high"
              sizes="100vw"
            />

            {/* Main overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[rgb(var(--rh-bg-page))]/75 via-[rgb(var(--rh-bg-page))]/25 to-transparent" />
            {/* Top scrim */}
            <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-[rgb(var(--rh-bg-page))]/40 to-transparent" />
            {/* Bottom scrim */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[rgb(var(--rh-bg-page))]/60 to-transparent" />
          </div>

          {/* Content layer – natural flow, no absolute positioning */}
          <div className="relative z-10 flex min-h-[360px] w-full flex-col justify-between px-4 py-4 sm:min-h-[clamp(360px,38vw,520px)] sm:px-6 sm:py-6">
            {/* Top badges */}
            <div className="flex flex-wrap gap-2 text-xxs text-secondary">
              <Chip variant="cyan" size="sm">Upcoming raves · Las Vegas</Chip>
              <Chip variant="cyan" size="sm" className="flex">Warehouse · Rooftop · Afterhours</Chip>
            </div>
            {/* Heading and blurb */}
            <h1 className="text-3xl font-bold text-primary drop-shadow-strong sm:text-4xl md:text-5xl">
              Upcoming raves across Las Vegas
            </h1>
            <p className="text-sm text-secondary drop-shadow-medium">
              Secret afterhours, rooftops and warehouse nights all week.
            </p>

            {/* Buttons */}
            <div className="mt-3 flex flex-wrap gap-2 sm:gap-3">
              <ButtonLink href="/events?filter=weekend" className="text-xs sm:text-sm">
                See this weekend&apos;s raves
              </ButtonLink>
              <ButtonLink
                href="/events"
                variant="secondary"
                className="text-xs sm:text-sm"
              >
                Browse full calendar
              </ButtonLink>
            </div>

            {/* Info chips */}
            <div className="mt-3 flex flex-wrap gap-2 text-xxs sm:text-xxs">
              <Chip variant="pink" size="sm">Location drops 24h before</Chip>
              <Chip variant="orange" size="sm">No dress code · Just energy</Chip>
              <Chip variant="purple" size="sm">Techno, House, Bass</Chip>
            </div>
          </div>
        </div>
      </section>
      {/* Right column highlights - MOVED BELOW HERO */}
      <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="space-y-4">
          <Surface className="p-5">
            <p className="text-xs text-secondary">This weekend in Vegas</p>
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
            <p className="mt-2 text-xs text-secondary">
              Most events sell out before doors. RSVP or grab tickets early.
            </p>
          </Surface>

          <Surface className="p-5">
            <p className="text-xs text-secondary">Vegas local?</p>
            <h2 className="mt-1 text-sm font-semibold">
              Unlock locals-only lines, discounts and VIP upgrades when you create a free profile.
            </h2>
            <ul className="mt-2 space-y-1 text-xs text-secondary">
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
          endSlot={
            <CalendarExportButton />
          }
        />

        {/* Filter chips */}
        <div className="flex flex-wrap gap-2 text-xxs">
          {filters.map((filter, i) => (
            <button
              key={filter}
              className={`inline-flex items-center rounded-full border px-3 py-1 text-xs ${
                i === 1
                  ? "border-primary bg-primary text-page"
                  : "border-subtle bg-surface/10 text-secondary hover:bg-surface/25 hover:text-primary"
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
                  <div className="absolute inset-0 bg-gradient-to-br from-rh-pink-light/40 via-rh-purple/40 to-[rgb(var(--rh-bg-page))]" />
                  <div className="absolute inset-0 bg-[url('/images/events/placeholder.jpg')] bg-cover bg-center opacity-50 dark:mix-blend-overlay mix-blend-normal" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgb(var(--rh-bg-page))]/80 via-[rgb(var(--rh-bg-page))]/40 to-transparent" />
                  <div className="absolute left-3 top-3 flex items-center gap-2 text-xxs">
                    <Chip variant="cyan" size="sm">
                      {event.day} · {event.time}
                    </Chip>
                    <Chip variant="cyan" size="sm">
                      {event.badge}
                    </Chip>
                  </div>
                </div>                <div className="p-4 space-y-2">
                  <h3 className="text-sm font-semibold">{event.title}</h3>
                  <p className="text-xs text-secondary">{event.area}</p>
                  <div className="flex flex-wrap gap-1 text-xxs text-secondary">
                    {event.genres.map((g) => (
                      <Chip
                        key={g}
                        variant="purple"
                        size="sm"
                      >
                        {g}
                      </Chip>
                    ))}
                  </div>
                  <div className="mt-2 flex items-center justify-between text-xs">
                    <span className="text-secondary">{event.price}</span>
                    <ButtonLink
                      href={`/events/${event.id}`}
                      variant="secondary"
                      className="px-3 py-1 text-xxs"
                    >
                      {event.badge === "Sold out" ? "Join waitlist" : "View event"}
                    </ButtonLink>
                  </div>
                  <p className="text-xxs text-secondary mt-1">{event.status}</p>
                </div>
              </Surface>
            ))}
          </div>

          {/* Right info column */}
          <div className="space-y-4">
            <Surface className="p-4">
              <p className="text-xs text-secondary">Next up tonight</p>
              <h3 className="mt-1 text-sm font-semibold">
                Doors times, last entry and neighborhood at a glance.
              </h3>
              <div className="mt-3 space-y-2 text-xs">
                {tonightColumn.map((item) => (
                  <div
                    key={item.title}
                    className="flex items-center justify-between gap-3 rounded-2xl bg-surface/5 px-3 py-2"
                  >
                    <div>
                      <p className="font-medium text-primary">{item.title}</p>
                      <p className="text-xxs text-secondary">{item.slot}</p>
                    </div>
                    <Chip variant="success" size="sm">
                      {item.status}
                    </Chip>
                  </div>
                ))}
              </div>
            </Surface>

            <Surface className="p-4">
              <p className="text-xs text-secondary">Ravehouse Entertainment calendar drops</p>
              <h3 className="mt-1 text-sm font-semibold">
                Be first in when new warehouses, rooftops or special guests are announced.
              </h3>
              <ul className="mt-2 space-y-1 text-xs text-secondary">
                <li>• Early RSVPs for secret sets</li>
                <li>• Last-minute codes before events sell out</li>
                <li>• No spam, just lineups.</li>
              </ul>
              <form className="mt-3 flex gap-2">
                <input
                  type="email"
                  className="flex-1 rounded-full border border-primary/10 bg-surface/40 px-3 py-2 text-xs outline-none placeholder:text-secondary"
                  placeholder="Enter email for event drops"
                />
                <button
                  type="submit"
                  className="rounded-full bg-card border border-primary/20 px-4 py-2 text-xs font-semibold text-primary"
                >
                  Notify me
                </button>
              </form>
            </Surface>

            <Surface className="p-4">
              <p className="text-xs text-secondary">Looking for VIP?</p>
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

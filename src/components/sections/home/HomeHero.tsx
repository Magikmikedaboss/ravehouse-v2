// src/components/sections/home/HomeHero.tsx
import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import Chip from "@/components/ui/Chip";
import Surface from "@/components/ui/Surface";

export default function HomeHero() {
  return (
    <section className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.2fr)]">
      {/* Main hero card */}
      <Surface className="overflow-hidden">
        <div className="relative h-80 w-full sm:h-[420px]">
          {/* TODO: swap with your real hero image */}
          <Image
            src="/images/events/vecteezy_crowded-dance-floor-illuminated-by-disco-balls-and-colorful_71852730.jpeg"
            alt="Warehouse crowd at Ravehouse Entertainment"
            fill
            className="object-cover"
            priority={true}
            fetchPriority="high"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 40vw"
          />
          <div className="absolute inset-x-4 top-4 flex justify-between text-xs text-white/80">
            <Chip variant="pink" size="sm">Next up: Warehouse Eclipse</Chip>
            <Chip variant="cyan" size="sm">Las Vegas, NV · Secret warehouse</Chip>
          </div>
          {/* overlay behind content */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
          {/* content lifted above overlay */}
          <div className="relative z-10">
            <div className="p-6 sm:p-8">
              <p className="text-xxs uppercase tracking-wider-xl text-white/70">
                Underground parties for the nocturnal.
              </p>
              <h1 className="mt-2 text-3xl font-semibold sm:text-4xl text-white">
                RAVEHOUSE ENTERTAINMENT
              </h1>
              <p className="mt-4 max-w-xl text-sm text-white/80">
                Dive into neon-soaked warehouses, late-night rooftops and off-grid sound systems
                across Las Vegas. No fluff, just sweat and strobes.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <ButtonLink href="/events">See Upcoming Raves</ButtonLink>
                <ButtonLink href="/tickets" variant="secondary">
                  Join Guestlist
                </ButtonLink>
              </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Chip variant="orange" size="sm">This Friday · 2AM – Sunrise</Chip>
                  <Chip variant="purple" size="sm">Location drops day-of only</Chip>
                  <Chip variant="green" size="sm">21+ · Techno, house, bass</Chip>
                </div>
            </div>
          </div>
        </div>
      </Surface>

      {/* Right side event highlight cards */}
      <div className="space-y-4">
        <Surface className="flex flex-col justify-between p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs text-white/50">Warehouse Eclipse</p>
              <h2 className="text-lg font-semibold text-white">This Saturday</h2>
              <p className="mt-1 text-xs text-white/70">
                11:30PM – Late · Downtown LV · Secret lineup
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                <Chip variant="neutral" size="sm">Techno</Chip>
                <Chip variant="neutral" size="sm">Warehouse</Chip>
                <Chip variant="neutral" size="sm">Secret lineup</Chip>
              </div>
            </div>
            <div className="text-right text-sm">
              <div className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/70">
                Spots left: <span className="font-semibold text-blue-400">84 / 400</span>
              </div>
              <div className="mt-3 font-semibold text-white">$45 GA</div>
            </div>
          </div>
          <ButtonLink
            href="/events/warehouse-eclipse"
            className="mt-4 w-full justify-center"
            variant="secondary"
          >
            View Event
          </ButtonLink>
        </Surface>

        <Surface className="p-5">
          <p className="text-xs text-white/60">This week at Ravehouse Entertainment</p>
          <h2 className="mt-1 text-lg font-semibold text-white">
            2 events · Rooftop &amp; Warehouse · Vegas Strip
          </h2>
          <p className="mt-2 text-xs text-white/60">
            Tap into: <span className="font-medium text-white">House · Techno · Bass</span>
          </p>
          <ButtonLink
            href="/events"
            className="mt-4"
            variant="primary"
          >
            Free RSVP available
          </ButtonLink>
        </Surface>

        <Surface className="p-5">
          <p className="text-xs text-white/60">Since 2019</p>
          <h2 className="mt-1 text-lg font-semibold">
            150+ Events Thrown
          </h2>
          <div className="mt-3 grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-rave-cyan">25K+</div>
              <div className="text-xs text-white/60">Attendees</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-rh-pink-light">6</div>
              <div className="text-xs text-white/60">Years Running</div>
            </div>
          </div>
          <p className="mt-3 text-xs text-white/60">
            Underground raves that keep Vegas dancing all night long.
          </p>
        </Surface>
      </div>
    </section>
  );
}

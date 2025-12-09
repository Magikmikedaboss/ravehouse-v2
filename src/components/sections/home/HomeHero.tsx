// src/components/sections/home/HomeHero.tsx
import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import Chip from "@/components/ui/Chip";
import Surface from "@/components/ui/Surface";

export default function HomeHero() {
  return (
    <section className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.2fr)]">
      {/* Main hero card */}
      <div className="relative overflow-hidden rounded-rh-lg bg-[rgb(var(--rh-bg-card))] border border-[rgb(var(--rh-border-subtle))]/20 shadow-rh-soft backdrop-blur dark:bg-black/60 dark:border-white/10">
        {/* Background image - responsive height */}
        <div className="relative h-[400px] sm:h-[480px] w-full">
          <Image
            src="/images/events/vecteezy_crowded-dance-floor-illuminated-by-disco-balls-and-colorful_71852730.jpeg"
            alt="Warehouse crowd at Ravehouse Entertainment"
            fill
            className="object-cover object-[center_35%]"
            priority
            fetchPriority="high"
            sizes="100vw"
          />
          {/* Gradient overlay - responsive to theme */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent dark:from-black/70 dark:via-black/20 dark:to-transparent" />
        </div>

        {/* Mobile: stacked layout | Desktop: absolute positioning */}
        <div className="absolute inset-0 p-4 sm:p-6 lg:p-8">
          
          {/* Mobile: Normal flow | Desktop: Positioned layout */}
          <div className="flex flex-col h-full justify-between sm:block sm:h-auto">
            
            {/* Top chips */}
            <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
              <Chip variant="pink" size="sm">Next up: Warehouse Eclipse</Chip>
              <Chip variant="cyan" size="sm">Las Vegas, NV · Secret warehouse</Chip>
            </div>
            
            {/* Main content */}
            <div className="flex-1 flex flex-col justify-center sm:absolute sm:left-4 sm:right-4 sm:top-1/2 sm:-translate-y-1/2 lg:left-8 lg:right-8">
              <p className="text-xs uppercase tracking-widest text-[rgb(var(--rh-text-primary))]/70 font-medium mb-3 sm:mb-4">
                Underground parties for the nocturnal.
              </p>
              <h1 className="text-3xl font-bold sm:text-4xl lg:text-5xl text-[rgb(var(--rh-text-primary))] leading-tight mb-4 sm:mb-6">
                RAVEHOUSE<br />ENTERTAINMENT
              </h1>
              <p className="max-w-lg text-sm text-[rgb(var(--rh-text-primary))]/90 leading-relaxed mb-6 sm:mb-8">
                Dive into neon-soaked warehouses, late-night rooftops and off-grid sound systems
                across Las Vegas. No fluff, just sweat and strobes.
              </p>
              
              <div className="flex flex-wrap gap-3">
                <ButtonLink href="/events">See Upcoming Raves</ButtonLink>
                <ButtonLink href="/tickets" variant="secondary">Join Guestlist</ButtonLink>
              </div>
            </div>
            
            {/* Bottom chips */}
            <div className="sm:absolute sm:bottom-4 sm:left-4 sm:right-4 lg:bottom-8 lg:left-8 lg:right-8">
              <div className="flex flex-wrap gap-2">
                <Chip variant="orange" size="sm">This Friday · 2AM – Sunrise</Chip>
                <Chip variant="purple" size="sm">Location drops day-of only</Chip>
                <Chip variant="green" size="sm">21+ · Techno, house, bass</Chip>
              </div>
            </div>
            
          </div>
        </div>
      </div>

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
            2 events · Rooftop &amp; Warehouse · <span className="text-rh-pink-light">Vegas Strip</span>
          </h2>
          <p className="mt-2 text-xs text-white/60">
            Tap into: <span className="font-medium text-white"><span className="text-rh-cyan">House</span> · <span className="text-rh-purple">Techno</span> · <span className="text-rh-orange">Bass</span></span>
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
              <div className="text-2xl font-bold text-rh-cyan">25K+</div>
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

import HomeHero from "@/components/sections/home/HomeHero";
import UpcomingEvents from "@/components/sections/home/UpcomingEvents";
import ThisIsRavehouse from "@/components/sections/home/ThisIsRavehouse";
import AfterglowGallery from "@/components/sections/home/AfterglowGallery";
import Surface from "@/components/ui/Surface";
import Chip from "@/components/ui/Chip";
import { ButtonLink } from "@/components/ui/Button";

export default function HomePage() {
  return (
    <div className="space-y-10 pb-10">
      <HomeHero />
      {/* Chip style test block for visual verification */}
      <Surface className="p-5">
        <h2 className="text-lg font-semibold">Chip Style Test</h2>
        <p className="mt-1 text-xs text-white/70">Verify sizes and variants render correctly.</p>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-xxs text-[rgb(var(--rh-text-secondary))]">Sizes</p>
            <div className="mt-2 flex flex-wrap gap-2">
              <Chip variant="pink" size="xs">xs · Pink</Chip>
              <Chip variant="cyan" size="sm">sm · Cyan</Chip>
              <Chip variant="orange" size="md">md · Orange</Chip>
            </div>
          </div>
          <div>
            <p className="text-xxs text-[rgb(var(--rh-text-secondary))]">Variants</p>
            <div className="mt-2 flex flex-wrap gap-2">
              <Chip variant="purple" size="sm">Purple</Chip>
              <Chip variant="green" size="sm">Green</Chip>
              <Chip variant="neutral" size="sm">Neutral</Chip>
            </div>
          </div>
        </div>
        <div className="mt-3">
          <p className="text-xxs text-[rgb(var(--rh-text-secondary))]">No extra px/py (should respect size)</p>
          <div className="mt-2 flex flex-wrap gap-2">
            <Chip variant="pink" size="sm">Header Chip</Chip>
            <Chip variant="cyan" size="sm">Las Vegas · PT</Chip>
            <Chip variant="orange" size="sm">Door Instructions</Chip>
          </div>
        </div>

        {/* Action vs Pill parity + hover states */}
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-xxs text-[rgb(var(--rh-text-secondary))]">Pills (Chip) – sizes + hover</p>
            <div className="mt-2 flex flex-wrap gap-2">
              <Chip variant="neutral" size="xs" className="hover:opacity-80 transition">xs pill</Chip>
              <Chip variant="neutral" size="sm" className="hover:opacity-80 transition">sm pill</Chip>
              <Chip variant="neutral" size="md" className="hover:opacity-80 transition">md pill</Chip>
            </div>
          </div>
          <div>
            <p className="text-xxs text-[rgb(var(--rh-text-secondary))]">Buttons – primary/secondary/ghost + hover</p>
            <div className="mt-2 flex flex-wrap gap-2">
              <ButtonLink href="/events" className="transition hover:brightness-110">Primary</ButtonLink>
              <ButtonLink href="/tickets" variant="secondary" className="transition hover:opacity-90">Secondary</ButtonLink>
              <ButtonLink href="/contact" variant="ghost" className="transition">Ghost</ButtonLink>
            </div>
          </div>
        </div>

        {/* Forced token check to isolate theme issues */}
        <div className="mt-5">
          <p className="text-xxs text-[rgb(var(--rh-text-secondary))]">Forced brand tokens (bypass component mapping)</p>
          <div className="mt-2 flex flex-wrap gap-2">
            <span className="rounded-full px-3 py-1 text-xxs font-medium text-white bg-[rgb(var(--rh-pink-light))]">forced-pink-token</span>
            <span className="rounded-full px-3 py-1 text-xxs font-medium text-white bg-[rgb(var(--rh-cyan))]">forced-cyan-token</span>
          </div>
        </div>
      </Surface>
      <UpcomingEvents />
      <ThisIsRavehouse />
      <AfterglowGallery />
    </div>
  );
}

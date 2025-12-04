// src/components/layout/SiteFooter.tsx
import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/5 bg-black/60">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6 text-sm text-white/60 md:flex-row md:items-center md:justify-between md:px-6 lg:px-8">
        <div>
          <div className="font-semibold text-white">RAVEHOUSE</div>
          <p>Las Vegas underground party brand. No VIP ropes, just better nights.</p>
        </div>

        <div className="flex flex-wrap gap-8">
          <div>
            <div className="font-medium text-white/80">Explore</div>
            <div className="mt-1 flex flex-col gap-1">
              <Link href="/events">Events</Link>
              <Link href="/tickets">Tickets</Link>
              <Link href="/gallery">Gallery</Link>
              <Link href="/about">About &amp; Crew</Link>
              <Link href="/vip">VIP &amp; Hosts</Link>
            </div>
          </div>
          <div>
            <div className="font-medium text-white/80">Stay in the loop</div>
            <p className="mt-1 text-xs">
              Get first access to drops, secret locations and last-minute RSVP codes.
            </p>
            <form className="mt-2 flex max-w-xs gap-2">
              <input
                className="flex-1 rounded-full border border-white/10 bg-black/40 px-3 py-2 text-xs outline-none placeholder:text-white/30"
                placeholder="Enter your email for guestlist"
              />
              <button
                type="submit"
                className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-black"
              >
                Join
              </button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
}

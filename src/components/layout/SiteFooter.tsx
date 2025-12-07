// src/components/layout/SiteFooter.tsx
import Link from "next/link";
import NewsletterSignup from "../ui/NewsletterSignup";

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-black/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 text-sm md:flex-row md:items-start md:justify-between md:px-6 lg:px-8">
        <div className="space-y-2">
          <div 
            className="font-black text-lg tracking-wider"
            style={{
              background: 'linear-gradient(to right, #ff6b9d, #ffffff, #00d4ff)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              color: 'white' // Fallback color for browsers that don't support background-clip
            }}
          >
            RAVEHOUSE
          </div>        </div>

        <div className="flex flex-col gap-8 md:flex-row md:gap-12">
          <div className="space-y-3">
            <div className="font-semibold text-white">Explore</div>
            <div className="flex flex-col gap-2 text-white/70">
              <Link href="/events" className="hover:text-white transition">Events</Link>
              <Link href="/tickets" className="hover:text-white transition">Tickets</Link>
              <Link href="/gallery" className="hover:text-white transition">Gallery</Link>
              <Link href="/about" className="hover:text-white transition">About &amp; Crew</Link>
              <Link href="/vip" className="hover:text-white transition">VIP &amp; Hosts</Link>
            </div>
          </div>
          <div className="space-y-3 md:max-w-xs">
            <div className="font-semibold text-white">Stay in the loop</div>
            <p className="text-xs text-white/60">
              Get first access to drops, secret locations and last-minute RSVP codes.
            </p>
            <NewsletterSignup />
          </div>
        </div>
      </div>
    </footer>
  );
}

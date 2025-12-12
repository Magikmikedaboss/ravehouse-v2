// src/app/venues/page.tsx
"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import Chip from "@/components/ui/Chip";
import { VENUES, VENUE_FILTERS, intensityLabel } from "@/lib/venues";

export default function VenuesPage() {
  const [activeFilter, setActiveFilter] = useState<(typeof VENUE_FILTERS)[number]["value"]>("All");
  const [q, setQ] = useState("");

  const list = useMemo(() => {
    const query = q.trim().toLowerCase();

    return VENUES.filter((v) => {
      const matchesFilter =
        activeFilter === "All" ? true : v.category.includes(activeFilter);

      const matchesQuery =
        !query
          ? true
          : [
              v.name,
              v.area,
              v.short,
              Array.isArray(v.bestFor) ? v.bestFor.join(" ") : v.bestFor,
              v.vibeTags.join(" "),
              v.category.join(" "),
            ]
              .join(" ")
              .toLowerCase()
              .includes(query);

      return matchesFilter && matchesQuery;
    });
  }, [activeFilter, q]);

  return (
    <div className="space-y-10 pb-10">
      {/* Hero */}
      <section className="surface overflow-hidden shadow-rh-medium">
        <div className="h-56 w-full bg-gradient-to-br from-rave-cyan via-rave-purple to-rave-pink" />
        <div className="p-6 sm:p-8">
          <p className="text-xs uppercase tracking-[0.25em] text-white/60">
            The Ravehouse Atlas
          </p>
          <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">Venues & Hotspots</h1>
          <p className="mt-3 max-w-2xl text-sm text-white/70">
            A curated map of Las Vegas energy: rooftops, immersive rooms, cult dives,
            and the after-hours dens that keep the city awake.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/vip"
              className="rounded-full bg-gradient-to-r from-rave-pink to-rave-orange px-5 py-2.5 text-sm font-semibold shadow-rh-glow"
            >
              Get VIP access
            </Link>
            <Link
              href="/events"
              className="rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white/90 shadow-rh-soft"
            >
              See upcoming events
            </Link>
          </div>

          <div className="mt-4 flex flex-wrap gap-2 text-xxs text-white/50">
            <Chip variant="cyan">Filter by vibe</Chip>
            <Chip variant="purple">Tourist-friendly + local-coded</Chip>
            <Chip variant="pink">Stay nearby hooks</Chip>
          </div>
        </div>
      </section>

      {/* Controls */}
      <section className="grid gap-4 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        <div className="surface p-5 shadow-rh-soft">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold">Choose your night</h2>
            <span className="text-xxs text-white/50">{list.length} venues</span>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {VENUE_FILTERS.map((f) => {
              const on = activeFilter === f.value;
              return (
                <button
                  key={f.value}
                  type="button"
                  onClick={() => setActiveFilter(f.value)}
                  aria-pressed={on}
                  className={`transition-transform hover:scale-105 ${
                    on ? "ring-2 ring-white/30 ring-offset-2 ring-offset-black rounded-full" : ""
                  }`}
                >
                  <Chip
                    variant={on ? "neutral" : "cyan"}
                    size="sm"
                    className={on ? "bg-white/20 border-white/40" : ""}
                  >
                    {f.label}
                  </Chip>
                </button>
              );
            })}
          </div>

          <div className="mt-4">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-xs outline-none placeholder:text-white/30"
              placeholder="Search: rooftop, immersive, after-hours, downtown…"
            />
          </div>
        </div>

        <aside className="surface p-5 shadow-rh-soft">
          <p className="text-xs text-white/50">Travel mode</p>
          <h3 className="mt-1 text-lg font-semibold">Coming in from out of town?</h3>
          <p className="mt-2 text-xs text-white/60">
            Pick a venue, then lock your basecamp nearby. We&apos;ll wire this to hotel / transport
            affiliates when you&apos;re ready.
          </p>

          <div className="mt-4 grid gap-2">
            <Link
              href="/contact"
              className="w-full rounded-full bg-white px-4 py-2 text-xs font-semibold text-black shadow-rh-soft text-center"
            >
              Plan your trip
            </Link>
            <Link
              href="/vip#apply"
              className="w-full rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-semibold text-white/90 shadow-rh-soft text-center"
            >
              Get a host recommendation
            </Link>
          </div>

          <p className="mt-3 text-xxs text-white/45">
            Tip: venues change fast in Vegas. VIP members get same-day drops and updates.
          </p>
        </aside>
      </section>

      {/* Venue grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Hotspots</h2>
          <span className="text-xs text-white/50">Curated, not cluttered</span>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {list.map((v) => (
            <article key={v.slug} className="surface flex flex-col p-5 shadow-rh-soft">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-sm font-semibold">{v.name}</h3>
                  <p className="mt-1 text-xxs text-white/55">{v.area}</p>
                </div>
                <div className="text-xxs text-white/60">
                  {v.priceHint}
                </div>
              </div>

              <p className="mt-3 text-xs text-white/70">{v.short}</p>

              <div className="mt-3 flex flex-wrap gap-2 text-xxs text-white/50">
                {v.category.slice(0, 3).map((c) => (
                  <Chip key={c} variant="purple" size="sm">
                    {c}
                  </Chip>
                ))}
                <Chip variant="cyan" size="sm">
                  {intensityLabel(v.intensity)}
                </Chip>
              </div>

              <div className="mt-3 flex flex-wrap gap-2 text-xxs text-white/50">
                {v.vibeTags.map((t) => (
                  <span key={t} className="rounded-full border border-white/10 bg-white/5 px-2 py-1">
                    {t}
                  </span>
                ))}
              </div>

              <p className="mt-3 text-xxs text-white/55">
                <span className="text-white/70 font-semibold">Best for:</span>{" "}
                {Array.isArray(v.bestFor) ? v.bestFor.join(", ") : v.bestFor}
              </p>

              <div className="mt-4 grid gap-2">
                <Link
                  href={`/venues/${v.slug}`}
                  className="w-full rounded-full bg-gradient-to-r from-rave-cyan to-rave-purple px-4 py-2 text-xs font-semibold text-black shadow-rh-medium text-center"
                >
                  Open venue page
                </Link>

                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href={`/events?venue=${encodeURIComponent(v.name)}`}
                    className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xxs font-semibold text-white/90 shadow-rh-soft text-center"
                  >
                    Events here
                  </Link>

                  <button
                    type="button"
                    className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xxs font-semibold text-white/90 shadow-rh-soft"
                    onClick={() => {
                      // placeholder: wire to affiliates later
                      alert("Stay Nearby: affiliate links coming next.");
                    }}
                  >
                    Stay nearby
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Footer note */}
        <div className="surface p-5 text-xs text-white/70 shadow-rh-soft">
          <h3 className="text-sm font-semibold">Want this to feel even more &quot;Ravehouse&quot;?</h3>
          <p className="mt-2 text-xs text-white/60">
            Next upgrade: a &quot;Choose your night&quot; mode that recommends venues by your vibe chips
            (bass-heavy, rooftop, immersive, after-hours) and unlocks VIP notes for each location.
          </p>
        </div>
      </section>
    </div>
  );
}
// src/app/venues/page.tsx
"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import Chip from "@/components/ui/Chip";
import { VENUES, VENUE_FILTERS, intensityLabel, type Venue } from "@/lib/venues";

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function getCategories(v: Venue): string[] {
  const cats = v.categories ?? v.category ?? [];
  return Array.isArray(cats) ? cats : [cats].filter(Boolean);
}
export default function VenuesPage() {
  const [activeFilter, setActiveFilter] =
    useState<(typeof VENUE_FILTERS)[number]["value"]>("All");
  const [q, setQ] = useState("");

  // "Atlas preview" selection
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  const list = useMemo(() => {
    const query = q.trim().toLowerCase();

    return VENUES.filter((v: Venue) => {
      const categories = getCategories(v);

      const matchesFilter =
        activeFilter === "All" ? true : categories.includes(activeFilter);

      const matchesQuery =
        !query
          ? true
          : [
              v.name,
              v.area,
              v.short,
              Array.isArray(v.bestFor) ? v.bestFor.join(" ") : v.bestFor,
              v.vibeTags?.join(" ") ?? "",
              categories.join(" "),
            ]
              .join(" ")
              .toLowerCase()
              .includes(query);

      return matchesFilter && matchesQuery;
    });
  }, [activeFilter, q]);

  const activeVenue = useMemo(() => {
    const fallback = list[0] ?? null;
    if (!activeSlug) return fallback;
    return list.find((v: Venue) => v.slug === activeSlug) ?? fallback;
  }, [activeSlug, list]);

  // Ensure we always have something selected for the preview
  useEffect(() => {
    if (!activeVenue) return;
    if (!activeSlug) setActiveSlug(activeVenue.slug);
  }, [activeVenue, activeSlug]);

  return (
    <div className="space-y-10 pb-10">
      {/* Hero */}
      <section className="surface overflow-hidden shadow-rh-medium">
        <div className="relative h-56 w-full bg-gradient-to-br from-rave-cyan via-rave-purple to-rave-pink">
          {/* subtle moving sheen */}
          <div className="pointer-events-none absolute inset-0 opacity-50">
            <div className="absolute -top-10 left-0 h-20 w-full animate-[scan_7s_linear_infinite] bg-white/10 blur-xl" />
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.15),rgba(0,0,0,0.55))]" />
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <p className="text-xs uppercase tracking-[0.25em] text-secondary">
            The Ravehouse Atlas
          </p>
          <h1 className="mt-2 text-3xl font-semibold sm:text-4xl text-primary">
            Venues & Hotspots
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-secondary">
            A curated map of Las Vegas energy: rooftops, immersive rooms, cult dives,
            and the after-hours dens that keep the city awake.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/vip"
              className="rounded-full bg-gradient-to-r from-rave-pink to-rave-orange px-5 py-2.5 text-sm font-semibold text-primary shadow-rh-glow"
            >
              Get VIP access
            </Link>
            <Link
              href="/events"
              className="rounded-full border border-subtle bg-card/20 px-5 py-2.5 text-sm font-semibold text-primary shadow-rh-soft"
            >
              See upcoming events
            </Link>
          </div>

          <div className="mt-4 flex flex-wrap gap-2 text-xxs text-muted">
            <Chip variant="cyan">Hover to preview</Chip>
            <Chip variant="purple">Tourist-friendly + local-coded</Chip>
            <Chip variant="pink">Travel hooks ready</Chip>
          </div>
        </div>
      </section>

      {/* Controls + Preview */}
      <section className="grid gap-4 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        {/* Filters + search */}
        <div className="surface p-5 shadow-rh-soft">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold">Choose your night</h2>
            <span className="text-xxs text-muted">{list.length} venues</span>
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
                    on ? "ring-2 ring-accent/30 ring-offset-2 ring-offset-page rounded-full" : ""
                  }`}
                >
                  <Chip
                    variant={on ? "neutral" : "cyan"}
                    size="sm"
                    className={on ? "bg-card/40 border-subtle" : ""}
                  >
                    {f.label}
                  </Chip>
                </button>
              );
            })}
          </div>

          <div className="mt-4">
            <label htmlFor="venue-search" className="sr-only">
              Search venues
            </label>
            <input
              id="venue-search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="w-full rounded-[var(--rh-radius-lg)] border border-subtle bg-card/40 px-3 py-2 text-xs text-primary outline-none placeholder:text-muted"
              placeholder="Search: rooftop, immersive, after-hours, downtown…"
            />
          </div>

          <p className="mt-3 text-xxs text-muted">
            Pro tip: Hover a card to load its dossier in the preview panel.
          </p>
        </div>

        {/* Preview panel */}
        <aside className="surface p-5 shadow-rh-soft">
          <p className="text-xs text-muted">Atlas preview</p>

          {activeVenue ? (
            <>
              <div className="mt-2 flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold text-primary">{activeVenue.name}</h3>
                  <p className="mt-1 text-xxs text-muted">{activeVenue.area}</p>
                </div>
                <div className="text-xxs text-secondary">{activeVenue.priceHint}</div>
              </div>

              <p className="mt-3 text-xs text-secondary">{activeVenue.short}</p>

              <div className="mt-3 flex flex-wrap gap-2">
                {getCategories(activeVenue).slice(0, 3).map((c: string) => (
                  <Chip key={c} variant="purple" size="sm">
                    {c}
                  </Chip>
                ))}
                <Chip variant="cyan" size="sm">
                  {intensityLabel(activeVenue.intensity)}
                </Chip>
              </div>

              {/* Intensity meter */}
              <div className="mt-4">
                <div className="flex items-center justify-between text-xxs text-muted">
                  <span>Intensity</span>
                  <span>{clamp(Number(activeVenue.intensity ?? 3), 1, 5)}/5</span>
                </div>
                <div className="mt-2 h-2 w-full rounded-full bg-card/20">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-rave-cyan to-rave-pink"
                    style={{
                      width: `${(clamp(Number(activeVenue.intensity ?? 3), 1, 5) / 5) * 100}%`,
                    }}
                  />
                </div>
              </div>

              <div className="mt-4 grid gap-2">
                <Link
                  href={`/venues/${activeVenue.slug}`}
                  className="w-full rounded-full bg-gradient-to-r from-rave-cyan to-rave-purple px-4 py-2 text-xs font-semibold text-primary shadow-rh-medium text-center"
                >
                  Open venue page
                </Link>

                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href={`/events?venue=${encodeURIComponent(activeVenue.name)}`}
                    className="rounded-full border border-subtle bg-card/20 px-4 py-2 text-xxs font-semibold text-primary shadow-rh-soft text-center"
                  >
                    Events here
                  </Link>
                  <Link
                    href={`/contact?subject=Stay%20near%20${encodeURIComponent(activeVenue.name)}`}
                    className="rounded-full border border-subtle bg-card/20 px-4 py-2 text-xxs font-semibold text-primary shadow-rh-soft text-center"
                  >
                    Stay nearby
                  </Link>
                </div>
              </div>

              <p className="mt-3 text-xxs text-muted">
                Next: we can add venue hero photos here as a blurred background preview.
              </p>
            </>
          ) : (
            <p className="mt-3 text-xs text-secondary">No venues match your filters.</p>
          )}
        </aside>
      </section>

      {/* Venue grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-primary">Hotspots</h2>
          <span className="text-xs text-muted">Curated, not cluttered</span>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {list.map((v: Venue) => {
            const categories = getCategories(v);
            const isActive = activeVenue?.slug === v.slug;

            return (
              <article
                key={v.slug}
                className={`surface flex flex-col p-5 shadow-rh-soft transition-transform hover:-translate-y-0.5 ${
                  isActive ? "ring-2 ring-accent/30" : ""
                }`}
                onMouseEnter={() => setActiveSlug(v.slug)}
                onFocus={() => setActiveSlug(v.slug)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActiveSlug(v.slug);
                  }
                }}
                tabIndex={0}              >                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-semibold text-primary">{v.name}</h3>
                    <p className="mt-1 text-xxs text-muted">{v.area}</p>
                  </div>
                  <div className="text-xxs text-secondary">{v.priceHint}</div>
                </div>

                <p className="mt-3 text-xs text-secondary">{v.short}</p>

                <div className="mt-3 flex flex-wrap gap-2 text-xxs text-muted">
                  {categories.slice(0, 3).map((c: string) => (
                    <Chip key={c} variant="purple" size="sm">
                      {c}
                    </Chip>
                  ))}
                  <Chip variant="cyan" size="sm">
                    {intensityLabel(v.intensity)}
                  </Chip>
                </div>

                <div className="mt-3 flex flex-wrap gap-2 text-xxs text-muted">
                  {(v.vibeTags ?? []).slice(0, 6).map((t: string) => (
                    <span
                      key={t}
                      className="rounded-full border border-subtle bg-card/20 px-2 py-1"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <p className="mt-3 text-xxs text-muted">
                  <span className="text-secondary font-semibold">Best for:</span>{" "}
                  {Array.isArray(v.bestFor) ? v.bestFor.join(", ") : v.bestFor}
                </p>

                <div className="mt-4 grid gap-2">
                  <Link
                    href={`/venues/${v.slug}`}
                    className="w-full rounded-full bg-gradient-to-r from-rave-cyan to-rave-purple px-4 py-2 text-xs font-semibold text-primary shadow-rh-medium text-center"
                  >
                    Open venue page
                  </Link>

                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      href={`/events?venue=${encodeURIComponent(v.name)}`}
                      className="rounded-full border border-subtle bg-card/20 px-4 py-2 text-xxs font-semibold text-primary shadow-rh-soft text-center"
                    >
                      Events here
                    </Link>

                    <Link
                      href={`/contact?subject=Stay%20near%20${encodeURIComponent(v.name)}`}
                      className="rounded-full border border-subtle bg-card/20 px-4 py-2 text-xxs font-semibold text-primary shadow-rh-soft text-center"
                    >
                      Stay nearby
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Footer note */}
        <div className="surface p-5 text-xs text-secondary shadow-rh-soft">
          <h3 className="text-sm font-semibold text-primary">
            Want this to feel even more &quot;Ravehouse&quot;?
          </h3>
          <p className="mt-2 text-xs text-secondary">
            Next upgrade: add venue images as blurred card backdrops + a &quot;mode dial&quot; (Chill/Rave)
            that changes the atlas styling and recommendations.
          </p>
        </div>
      </section>

      <style jsx>{`
        @keyframes scan {
          0% { transform: translateY(0); opacity: 0.0; }
          10% { opacity: 0.28; }
          60% { opacity: 0.12; }
          100% { transform: translateY(280px); opacity: 0.0; }
        }
      `}</style>
    </div>
  );
}
// src/app/venues/[slug]/page.tsx
"use client";

import Link from "next/link";
import { use, useMemo, useState } from "react";
import Chip from "@/components/ui/Chip";
import { VENUES, intensityLabel, gradientClass } from "@/lib/venues";

type VibeMeta = { label: string; note: string };

// Optional: lightweight "meaning" for tags. You can expand this over time.
const VIBE_GLOSSARY: Record<string, string> = {
  Rooftop: "Open-air energy, views, wind, and louder crowd overlap.",
  Immersive: "Visual-first or experiential spaces. Expect sensory punch.",
  Underground: "Low-light, local-coded. Rules are vibe + respect.",
  "After-Hours": "Late-late sessions. Plan rides and recovery.",
  Bass: "Sound-forward nights. Earplugs = smart, not soft.",
  Playful: "Lighter mood, social crowd, higher photo density.",
  Punk: "Grit, loud laughs, dive bar charm, no polish required.",
  Historic: "Old Vegas vibes, storytelling, and pregame ritual energy.",
  Experimental: "Expect surprises. Not every moment is predictable.",
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default function VenueDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);

  const venue = useMemo(() => VENUES.find((v) => v.slug === slug), [slug]);
  const [activeTag, setActiveTag] = useState<string | null>(null);

  if (!venue) {
    return (
      <div className="space-y-6 pb-10">
        <div className="surface p-6 shadow-rh-soft">
          <p className="text-xs text-white/60">Venue not found</p>
          <h1 className="mt-2 text-2xl font-semibold">That location isn&apos;t in the Atlas yet.</h1>
          <p className="mt-2 text-sm text-white/70">
            Go back to the venues list and pick another hotspot.
          </p>
          <div className="mt-4">
            <Link
              href="/venues"
              className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black shadow-rh-soft inline-block"
            >
              Back to Venues
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const encoded = encodeURIComponent(venue.name);

  // Normalize categories to always be an array, handling various data shapes
  const categories = (() => {
    if (Array.isArray(venue.category)) {
      return venue.category.filter(Boolean);
    }
    return [];
  })();
  
  const bestForArray = Array.isArray(venue.bestFor)
    ? venue.bestFor
    : [venue.bestFor].filter(Boolean);

  const intensity = Math.round(clamp(Number(venue.intensity ?? 3), 1, 5)) as 1 | 2 | 3 | 4 | 5;
  const intensityPct = (intensity / 5) * 100;  const vibeMeta: VibeMeta | null =
    activeTag && VIBE_GLOSSARY[activeTag]
      ? { label: activeTag, note: VIBE_GLOSSARY[activeTag] }
      : null;

  return (
    <div className="space-y-10 pb-20">
      {/* Breadcrumbs */}
      <div className="text-xs text-white/60">
        <Link href="/venues" className="hover:text-white">
          Venues
        </Link>
        <span className="mx-2 text-white/30">/</span>
        <span className="text-white/85">{venue.name}</span>
      </div>

      {/* Hero (with animated scanner overlay) */}
      <section className="surface overflow-hidden shadow-rh-medium">
        <div className="relative">
          {/* Gradient base */}
          <div className={`h-64 w-full bg-gradient-to-br ${gradientClass(venue.heroGradient)}`} />

          {/* "Scanner" overlay */}
          <div className="pointer-events-none absolute inset-0 opacity-60">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.20),transparent_55%)]" />
            <div className="absolute -top-12 left-0 h-24 w-full animate-[scan_6s_linear_infinite] bg-white/10 blur-xl" />
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.2),rgba(0,0,0,0.55))]" />
          </div>

          {/* If you add venue images later, you'll replace the gradient block above with an Image
              and keep these overlays as readability layers. */}
        </div>

        <div className="p-6 sm:p-8">
          <p className="text-xs uppercase tracking-[0.25em] text-white/60">
            {venue.area}
          </p>

          <div className="mt-2 flex flex-wrap items-end justify-between gap-3">
            <h1 className="text-3xl font-semibold sm:text-4xl">{venue.name}</h1>
            <div className="text-xxs text-white/55">
              Atlas ID: <span className="text-white/80">RH-{venue.slug.toUpperCase()}</span>
            </div>
          </div>

          <p className="mt-3 max-w-2xl text-sm text-white/70">{venue.short}</p>

          <div className="mt-4 flex flex-wrap gap-2 text-xxs text-white/50">
            {categories.map((c: string) => (
              <Chip key={c} variant="purple" size="sm">
                {c}
              </Chip>
            ))}
            <Chip variant="cyan" size="sm">
              {intensityLabel(intensity)}
            </Chip>
            <Chip variant="neutral" size="sm">
              {venue.priceHint}
            </Chip>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href={`/events?venue=${encoded}`}
              className="rounded-full bg-gradient-to-r from-rave-cyan to-rave-purple px-5 py-2.5 text-sm font-semibold text-white shadow-rh-medium"
            >              See events here
            </Link>
            <Link
              href={`/contact?subject=Stay%20near%20${encoded}`}
              className="rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white/90 shadow-rh-soft"
            >
              Stay nearby
            </Link>
            <Link
              href="/vip#apply"
              className="rounded-full bg-gradient-to-r from-rave-pink to-rave-orange px-5 py-2.5 text-sm font-semibold text-white shadow-rh-glow"
            >
              Get a host recommendation
            </Link>          </div>

          <p className="mt-3 text-xxs text-white/45">
            Location note:{" "}
            {venue.addressHint ?? "Details vary by event. VIP gets day-of drops."}
          </p>
        </div>
      </section>

      {/* Quick "dossier" stats */}
      <section className="grid gap-4 md:grid-cols-3">
        <div className="surface p-5 shadow-rh-soft">
          <p className="text-xxs uppercase tracking-[0.25em] text-white/50">Intensity</p>
          <div className="mt-2 flex items-center justify-between">
            <p className="text-sm font-semibold">{intensityLabel(intensity)}</p>
            <p className="text-xs text-white/60">{intensity}/5</p>
          </div>
          <div className="mt-3 h-2 w-full rounded-full bg-white/10">
            <div
              className="h-2 rounded-full bg-gradient-to-r from-rave-cyan to-rave-pink"
              style={{ width: `${intensityPct}%` }}
            />
          </div>
          <p className="mt-2 text-xxs text-white/55">
            Higher intensity usually means louder rooms + denser crowd.
          </p>
        </div>

        <div className="surface p-5 shadow-rh-soft">
          <p className="text-xxs uppercase tracking-[0.25em] text-white/50">Best for</p>
          <ul className="mt-3 space-y-1 text-xs text-white/70">
            {bestForArray.slice(0, 3).map((x: string, i: number) => (
              <li key={`${x}-${i}`}>• {x}</li>
            ))}
          </ul>
          <p className="mt-2 text-xxs text-white/50">
            Want a perfect match?{" "}
            <Link href="/vip#apply" className="text-white/80 hover:text-white underline underline-offset-4">
              Ask a host
            </Link>
          </p>
        </div>

        <div className="surface p-5 shadow-rh-soft">
          <p className="text-xxs uppercase tracking-[0.25em] text-white/50">Price vibe</p>
          <p className="mt-2 text-sm font-semibold">{venue.priceHint}</p>
          <p className="mt-2 text-xs text-white/60">
            We&apos;ll add real-world ranges later (tickets, drinks, tables, rideshare).
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Chip variant="cyan" size="sm">Plan-ready</Chip>
            <Chip variant="purple" size="sm">Tourist-friendly</Chip>
          </div>
        </div>
      </section>

      {/* Vibe tags (clickable) */}
      <section className="surface p-5 shadow-rh-soft">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-sm font-semibold">Vibe tags</h2>
          <p className="text-xxs text-white/50">Tap a tag for details</p>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {(venue.vibeTags ?? []).map((t: string) => {
            const on = activeTag === t;
            return (
              <button
                key={t}
                type="button"
                onClick={() => setActiveTag(on ? null : t)}
                aria-pressed={on}
                className={`transition-transform hover:scale-105 ${
                  on ? "ring-2 ring-white/25 ring-offset-2 ring-offset-black rounded-full" : ""
                }`}
                title={VIBE_GLOSSARY[t] ?? "Tap to highlight"}
              >
                <Chip
                  variant={on ? "neutral" : "cyan"}
                  size="sm"
                  selected={on}
                >
                  {t}
                </Chip>
              </button>
            );
          })}
        </div>
        {vibeMeta ? (
          <div className="mt-4 rounded-xl border border-white/10 bg-black/30 p-4">
            <p className="text-xxs uppercase tracking-[0.25em] text-white/50">
              {vibeMeta.label} decoded
            </p>
            <p className="mt-1 text-xs text-white/70">{vibeMeta.note}</p>
          </div>
        ) : (
          <p className="mt-4 text-xs text-white/55">
            Pick a tag and the Atlas will translate it.
          </p>
        )}
      </section>

      {/* Pro tips + Safety */}
      <section className="grid gap-4 lg:grid-cols-2">
        <div className="surface p-5 shadow-rh-soft">
          <h2 className="text-sm font-semibold">Pro tips</h2>

          {venue.proTips && venue.proTips.length > 0 ? (
            <ul className="mt-3 space-y-2 text-xs text-white/70">
              {venue.proTips.map((x: string) => (
                <li key={x}>• {x}</li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-xs text-white/50">
              Pro tips coming soon. Join VIP for insider venue notes.
            </p>
          )}
        </div>

        <div className="surface p-5 shadow-rh-soft">
          <h2 className="text-sm font-semibold">Keep it clean</h2>
          {venue.safetyNote ? (
            <div className="mt-3 rounded-xl border border-white/10 bg-black/30 p-4">
              <p className="text-xs text-white/70">{venue.safetyNote}</p>
            </div>
          ) : (
            <p className="mt-3 text-xs text-white/60">
              Consent-forward, hydrate, and plan your ride. Respect the room.
            </p>
          )}

          <div className="mt-4 grid gap-2">
            <Link
              href="/vip#apply"
              className="rounded-full bg-gradient-to-r from-rave-pink to-rave-orange px-4 py-2 text-xs font-semibold text-white shadow-rh-glow text-center"
            >
              VIP for day-of drops
            </Link>
            <Link
              href={`/contact?subject=Venue%20question:%20${encoded}`}
              className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-semibold text-white/90 shadow-rh-soft text-center"
            >
              Ask a question
            </Link>
          </div>
        </div>
      </section>

      {/* Back */}
      <div>
        <Link
          href="/venues"
          className="inline-flex items-center rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-semibold text-white/90 shadow-rh-soft"
        >
          Back to venues
        </Link>
      </div>

      {/* Sticky mobile action bar */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-black/70 backdrop-blur supports-[backdrop-filter]:bg-black/50 md:hidden">
        <div className="mx-auto grid max-w-3xl grid-cols-3 gap-2 px-3 py-3">
          <Link
            href={`/events?venue=${encoded}`}
            className="rounded-full bg-white px-3 py-2 text-center text-xxs font-semibold text-black shadow-rh-soft"
          >
            Events
          </Link>
          <Link
            href={`/contact?subject=Stay%20near%20${encoded}`}
            className="rounded-full border border-white/20 bg-white/5 px-3 py-2 text-center text-xxs font-semibold text-white/90 shadow-rh-soft"
          >
            Stay
          </Link>
          <Link
            href="/vip#apply"
            className="rounded-full bg-gradient-to-r from-rave-pink to-rave-orange px-3 py-2 text-center text-xxs font-semibold text-white shadow-rh-glow"
          >
            VIP
          </Link>
        </div>
      </div>
    </div>
  );
}
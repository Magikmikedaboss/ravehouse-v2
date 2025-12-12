// src/app/venues/[slug]/page.tsx
import Link from "next/link";
import Chip from "@/components/ui/Chip";
import { VENUES, intensityLabel, gradientClass } from "@/lib/venues";

export default async function VenueDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const venue = VENUES.find((v) => v.slug === slug);

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
  const bestForArray = Array.isArray(venue.bestFor) ? venue.bestFor : [venue.bestFor];

  return (
    <div className="space-y-10 pb-10">
      {/* Breadcrumbs */}
      <div className="text-xs text-white/60">
        <Link href="/venues" className="hover:text-white">Venues</Link>
        <span className="mx-2 text-white/30">/</span>
        <span className="text-white/85">{venue.name}</span>
      </div>

      {/* Hero */}
      <section className="surface overflow-hidden shadow-rh-medium">
        <div className={`h-56 w-full bg-gradient-to-br ${gradientClass(venue.heroGradient)}`} />
        <div className="p-6 sm:p-8">
          <p className="text-xs uppercase tracking-[0.25em] text-white/60">
            {venue.area}
          </p>
          <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">{venue.name}</h1>
          <p className="mt-3 max-w-2xl text-sm text-white/70">{venue.short}</p>

          <div className="mt-4 flex flex-wrap gap-2 text-xxs text-white/50">
            {venue.category.map((c) => (
              <Chip key={c} variant="purple" size="sm">
                {c}
              </Chip>
            ))}
            <Chip variant="cyan" size="sm">
              {intensityLabel(venue.intensity)}
            </Chip>
            <Chip variant="neutral" size="sm">
              {venue.priceHint}
            </Chip>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href={`/events?venue=${encoded}`}
              className="rounded-full bg-gradient-to-r from-rave-cyan to-rave-purple px-5 py-2.5 text-sm font-semibold text-black shadow-rh-medium"
            >
              See events here
            </Link>
            <Link
              href={`/contact?subject=Stay%20near%20${encoded}`}
              className="rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white/90 shadow-rh-soft"
            >
              Stay nearby
            </Link>
            <Link
              href="/vip#apply"
              className="rounded-full bg-gradient-to-r from-rave-pink to-rave-orange px-5 py-2.5 text-sm font-semibold text-black shadow-rh-glow"
            >
              Get a host recommendation
            </Link>
          </div>

          <p className="mt-3 text-xxs text-white/45">
            Location note: {venue.addressHint ?? "Details vary by event. VIP gets day-of drops."}
          </p>
        </div>
      </section>

      {/* Vibe tags */}
      <section className="surface p-5 shadow-rh-soft">
        <h2 className="text-sm font-semibold">Vibe tags</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {venue.vibeTags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-xxs text-white/70"
            >
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* Best for + Tips */}
      <section className="grid gap-4 lg:grid-cols-2">
        <div className="surface p-5 shadow-rh-soft">
          <h2 className="text-sm font-semibold">Best for</h2>
          <ul className="mt-3 space-y-2 text-xs text-white/70">
            {bestForArray.map((x, i) => (
              <li key={`${x}-${i}`}>• {x}</li>
            ))}
          </ul>
        </div>

        <div className="surface p-5 shadow-rh-soft">
          <h2 className="text-sm font-semibold">Pro tips</h2>
          {venue.proTips && venue.proTips.length > 0 ? (
            <ul className="mt-3 space-y-2 text-xs text-white/70">
              {venue.proTips.map((x) => (
                <li key={x}>• {x}</li>
              ))}            </ul>
          ) : (
            <p className="mt-3 text-xs text-white/50">
              Pro tips coming soon. Join VIP for insider venue notes.
            </p>
          )}

          {venue.safetyNote ? (
            <div className="mt-4 rounded-xl border border-white/10 bg-black/30 p-3">
              <p className="text-xxs uppercase tracking-[0.25em] text-white/50">Keep it clean</p>
              <p className="mt-1 text-xs text-white/70">{venue.safetyNote}</p>
            </div>
          ) : null}
        </div>
      </section>

      {/* Next steps panel */}
      <section className="surface p-5 shadow-rh-medium">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-sm font-semibold">Want the &quot;perfect night&quot; version?</h2>
            <p className="mt-2 text-xs text-white/60">
              Tell us your crew size + budget, and we&apos;ll recommend the best venue lane for your vibe.
            </p>
          </div>
          <Link
            href="/vip#apply"
            className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-black shadow-rh-soft whitespace-nowrap"
          >
            Apply for VIP
          </Link>
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
    </div>
  );
}
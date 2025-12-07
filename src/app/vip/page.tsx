// src/app/vip/page.tsx
import Link from "next/link";
import Chip from "@/components/ui/Chip";

const vipPlans = [
  {
    name: "Local Pass",
    price: "$45 / month",
    tag: "Best for LV regulars",
    bullets: [
      "Priority entry at all Ravehouse Entertainment or partner venues",
      "Access to locals-only drink & table specials",
      "Early access to RSVP windows",
      "Avg. 2–4 nights per month",
    ],
    cta: "Start Local Pass",
  },
  {
    name: "Crew Table",
    price: "From $680 / night",
    tag: "Most popular",
    bullets: [
      "Premium table placement at Ravehouse Entertainment events",
      "Dedicated host & direct text line for arrivals and changes",
      "Custom bottle & birthday add-ons curated each night",
      "Up to 10 guests per table",
    ],
    cta: "Plan my night",
  },
  {
    name: "Blackout Host",
    price: "Invite-only",
    tag: "Artists & high-volume hosts",
    bullets: [
      "Guaranteed access & seating for you and rotating guests",
      "Custom room cards across Ravehouse Entertainment + select partner venues",
      "Direct line to Ravehouse Entertainment team for collabs & private events",
      "Limited to 25 members",
    ],
    cta: "Request invite",
  },
];

export default function VipPage() {
  return (
    <div className="space-y-10 pb-10">
      {/* Hero */}
      <section className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.2fr)]">
        <article className="surface overflow-hidden">
          <div className="h-64 w-full bg-linear-to-br from-rave-pink via-rave-purple to-rave-cyan" />
          <div className="p-6 sm:p-8">
            <p className="text-xs uppercase tracking-[0.25em] text-white/60">
              For the ones closing the floor, not watching from the bar.
            </p>
            <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">
              VIP &amp; Local Access
            </h1>
            <p className="mt-3 max-w-xl text-sm text-white/70">
              Skip the line, own the booth, and lock in the best spots at our underground
              warehouses and partner venues across Las Vegas.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="#apply"
                className="rounded-full bg-linear-to-r from-rave-pink to-rave-orange px-5 py-2.5 text-sm font-semibold shadow-glow"
              >
                Join VIP Waitlist
              </Link>
              <Link
                href="#perks"
                className="rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white/90"
              >
                View VIP Perks
              </Link>
            </div>
            <div className="mt-4 flex flex-wrap gap-2 text-xxs text-white/50">
              <Chip variant="pink">Priority entry at all events</Chip>
              <Chip variant="cyan">Dedicated host &amp; bottle service</Chip>
              <Chip variant="purple">Local venue deals all week</Chip>
            </div>
          </div>
        </article>

        <div className="space-y-4">
          <div className="surface p-5">
            <p className="text-xs text-white/50">Tonight: VIP at Warehouse Eclipse</p>
            <h3 className="mt-1 text-lg font-semibold">Front-row booth</h3>
            <p className="mt-1 text-xs text-white/60">
              Saturday · 11:00PM arrival · Downtown LV. Bottle packages, host escort,
              dedicated entry lane.
            </p>
            <div className="mt-3 flex items-center justify-between text-xs">
              <span>From $480 / table</span>
              <span className="text-white/60">VIP tables left: 3 / 12</span>
            </div>
            <button className="mt-4 w-full rounded-full bg-white px-4 py-2 text-xs font-semibold text-black">
              Reserve table
            </button>
          </div>

          <div className="surface p-5">
            <p className="text-xs text-white/50">Local venue partners</p>
            <h3 className="mt-1 text-lg font-semibold">Use your VIP status off-warehouse</h3>
            <p className="mt-2 text-xs text-white/60">
              Strip rooftops, downtown lounges and afterhours dens in one network.
            </p>
            <button className="mt-4 w-full rounded-full bg-linear-to-r from-rave-cyan to-rave-purple px-4 py-2 text-xs font-semibold text-black">
              See venue map
            </button>
          </div>
        </div>
      </section>

      {/* Why go VIP */}
      <section id="perks" className="space-y-4">
        <h2 className="text-lg font-semibold">Why go VIP?</h2>
        <p className="max-w-2xl text-sm text-white/70">
          Turn every Ravehouse Entertainment night into a story. From secret entrances to curated tables,
          we keep you inside the music, not stuck in line.
        </p>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="surface p-4 text-sm">
            <h3 className="text-sm font-semibold">Built for crews, hosts &amp; heavy dancers.</h3>
            <p className="mt-2 text-xs text-white/70">
              Host friends from out of town, celebrate a win, or just refuse to wait in line.
              Our team handles entries, upgrades and late-night moves while you stay on the floor.
            </p>
          </div>
          <div className="surface p-4 text-sm">
            <h3 className="text-sm font-semibold">Zero-wait entry</h3>
            <p className="mt-2 text-xs text-white/70">
              Private check-in lane &amp; direct host contact for every event.
            </p>
          </div>
          <div className="surface p-4 text-sm">
            <h3 className="text-sm font-semibold">Sound-first rooms</h3>
            <p className="mt-2 text-xs text-white/70">
              VIP spots tuned around the system, not away from it.
            </p>
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Choose your VIP lane</h2>
          <span className="text-xs text-white/50">Compare all benefits</span>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {vipPlans.map((plan) => (
            <article key={plan.name} className="surface flex flex-col p-5">
              <div className="flex items-baseline justify-between gap-2">
                <div>
                  <h3 className="text-sm font-semibold">{plan.name}</h3>
                  <p className="mt-1 text-xs text-rave-cyan/80">{plan.tag}</p>
                </div>
                <div className="text-xs text-white/70">{plan.price}</div>
              </div>
              <ul className="mt-3 space-y-1 text-xs text-white/70">
                {plan.bullets.map((b) => (
                  <li key={b}>• {b}</li>
                ))}
              </ul>
              <button className="mt-4 rounded-full bg-white px-4 py-2 text-xs font-semibold text-black">
                {plan.cta}
              </button>
            </article>
          ))}
        </div>
      </section>

      {/* How VIP nights work + form */}
      <section id="apply" className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1.4fr)]">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">How VIP nights work</h2>
          <ol className="space-y-3 text-sm text-white/70">
            <li>
              <span className="font-semibold text-white">1. Tell us how you rave.</span>{" "}
              Share your crew size, favorite sounds and if you&apos;re a Vegas local or
              visiting.
            </li>
            <li>
              <span className="font-semibold text-white">2. Match with events &amp; venues.</span>{" "}
              Your host builds a curated list of upcoming nights plus partner venues that
              fit your budget and style.
            </li>
            <li>
              <span className="font-semibold text-white">3. Walk straight into the floor.</span>{" "}
              Location drop, arrival window and host contact are sent day-of. You show up,
              your table and night are already set.
            </li>
          </ol>
        </div>

        <form className="surface space-y-4 p-5">
          <h3 className="text-sm font-semibold">Apply for VIP access</h3>
          <p className="text-xs text-white/70">
            Drop your details and our team will text you back within 24 hours with options.
          </p>

          <div className="space-y-3 text-xs">
            <input
              className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 outline-none placeholder:text-white/30"
              placeholder="Full name"
            />
            <input
              className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 outline-none placeholder:text-white/30"
              placeholder="Phone number for confirmations"
            />
            <input
              className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 outline-none placeholder:text-white/30"
              placeholder="Instagram / handle (optional)"
            />
            <textarea
              rows={3}
              className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 outline-none placeholder:text-white/30"
              placeholder="Tell us about your night – date, crew size, budget, favorite vibes."
            />
            <div className="flex flex-wrap gap-2">
              {["Vegas local", "Visiting for a weekend", "Birthday / celebration", "Corporate / brand group"].map(
                (chip, index) => (
                  <button
                    key={chip}
                    type="button"
                    className={`chip text-xxs ${
                      index === 0 ? "bg-rave-pink/15 border-rave-pink/30" :
                      index === 1 ? "bg-rave-cyan/15 border-rave-cyan/30" :
                      index === 2 ? "bg-rave-orange/15 border-rave-orange/30" :
                      "bg-rave-purple/15 border-rave-purple/30"
                    }`}
                  >
                    {chip}
                  </button>
                ),
              )}
            </div>
          </div>

          <button
            type="submit"
            className="mt-2 w-full rounded-full bg-linear-to-r from-rave-pink to-rave-orange px-4 py-2 text-xs font-semibold text-black shadow-glow"
          >
            Submit request
          </button>

          <p className="text-xxs text-white/45">
            By applying you agree to respectful, consent-forward behavior at all events.
          </p>
        </form>
      </section>
    </div>
  );
}

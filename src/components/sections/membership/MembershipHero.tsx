import Surface from "@/components/ui/Surface";
import Chip from "@/components/ui/Chip";
import Link from "next/link";

export default function MembershipHero() {
  return (
    <section className="px-4 pt-8 lg:px-6">
      <Surface className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-rh-pink-light/25 via-rh-pink-shell/15 to-transparent" />
        <div className="relative grid gap-6 p-6 md:grid-cols-[minmax(0,1.7fr)_minmax(0,1.1fr)] md:p-8">          {/* Left: copy */}
          <div className="space-y-4">
            <p className="text-xxs uppercase tracking-[0.3em] text-white/60">
              Membership · Ravehouse
            </p>
            <h1 className="text-3xl font-semibold sm:text-4xl">
              Join the inner circle.
            </h1>
            <p className="max-w-xl text-sm text-white/75">
              Ravehouse Membership is built for the heads who don&apos;t leave
              before the lights come on. Early drops, cheaper nights, line
              skip, and moments you don&apos;t get from the regular queue.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="#tiers"
                className="inline-flex items-center justify-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-black shadow-rh-pink transition hover:brightness-105"
              >
                View membership tiers
              </Link>
              <Link
                href="/vip"
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white/90 hover:bg-white/15"
              >
                Explore VIP nights
              </Link>
            </div>
            <div className="flex flex-wrap gap-2 text-xxs mt-2">
              <Chip variant="neutral">
                Vegas · Warehouse · Rooftop
              </Chip>
              <Chip variant="neutral">
                Member presales &amp; line skip
              </Chip>
              <Chip variant="neutral">
                Photo drops &amp; aftermovies
              </Chip>
            </div>
          </div>

          {/* Right: quick stats */}
          <div className="space-y-4 text-xs text-white/75">
            <div className="grid grid-cols-3 gap-3 text-center">
              <div>
                <p className="text-lg font-semibold text-white sm:text-xl md:text-2xl">3</p>
                <p className="text-white/60">Tiers</p>
              </div>
              <div>
                <p className="text-lg font-semibold text-white sm:text-xl md:text-2xl">10+</p>
                <p className="text-white/60">Nights / year</p>
              </div>
              <div>
                <p className="text-lg font-semibold text-white sm:text-xl md:text-2xl">LV</p>
                <p className="text-white/60">Home base</p>
              </div>
            </div>

            <p className="text-white/60">
              Founding members will lock in early pricing and get first access
              to new formats, secret locations, and test events.
            </p>

            <div className="space-y-1 text-xxs">
              <p className="text-white/55">Coming soon:</p>
              <ul className="list-disc pl-4 space-y-1 text-white/65">
                <li>Digital membership card &amp; wristband sync</li>
                <li>Auto-claim for member ticket allocations</li>
                <li>Members-only photo archives &amp; mixes</li>
              </ul>
            </div>
          </div>
        </div>
      </Surface>
    </section>
  );
}
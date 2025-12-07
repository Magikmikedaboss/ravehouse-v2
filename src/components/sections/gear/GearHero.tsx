import Surface from "@/components/ui/Surface";
import Chip from "@/components/ui/Chip";

export default function GearHero() {
  return (
    <section className="px-4 pt-8 lg:px-6">
      <Surface className="relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br(from-rh-pink-light/20,via-rh-pink-dark/15,to-transparent)" />
        <div className="relative grid gap-6 p-6 md:grid-cols-[minmax(0,1.8fr)_minmax(0,1.1fr)] md:p-8">
          <div className="space-y-4">
            <p className="text-xxs uppercase tracking-[0.3em] text-white/60">
              The Circuit · Gear
            </p>
            <h1 className="text-3xl font-semibold sm:text-4xl">
              Rave gear that survives the night.
            </h1>
            <p className="max-w-xl text-sm text-white/75">
              No random dropshipping junk—just the hydration, protection,
              comfort and glow that actually holds up in warehouses, rooftops
              and 3AM alley reloads.
            </p>
            <div className="flex flex-wrap gap-2 text-xxs">
              <Chip variant="neutral">
                Hydration &amp; safety
              </Chip>
              <Chip variant="neutral">
                Outfit &amp; comfort
              </Chip>
              <Chip variant="neutral">
                LED &amp; visuals
              </Chip>
            </div>          </div>

          <div className="space-y-3 text-xs text-white/70">
            <p>
              Most items below will eventually link out with affiliate
              partnerships or direct stock. Right now this layout is about
              curating what matters so the store feels like a recommendation
              engine, not a random mall.
            </p>
            <p className="text-white/50">
              We&apos;ll clearly label sponsored picks and always test anything
              we stamp Ravehouse on.
            </p>
          </div>
        </div>
      </Surface>
    </section>
  );
}
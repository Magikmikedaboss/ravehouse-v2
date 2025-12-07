import Surface from "@/components/ui/Surface";
import Chip from "@/components/ui/Chip";

const TIERS = [
  {
    name: "Glow",
    price: "$9",
    cadence: "per month",
    vibe: "For the regulars who hit a few nights a season.",
    highlighted: false,
    perks: [
      "Early access to event announcements",
      "Member-only newsletter & photo drops",
      "Priority access to limited-capacity events",
    ],
  },
  {
    name: "Pulse",
    price: "$19",
    cadence: "per month",
    vibe: "For the ones who live on the rail and know the booth.",
    highlighted: true,
    perks: [
      "Everything in Glow",
      "Members-only presale windows",
      "Occasional line skip on select nights",
      "Exclusive member laminate / digital pass",
    ],
  },
  {
    name: "Inferno",
    price: "$49",
    cadence: "per month",
    vibe: "For the diehards and crews that shut it down every time.",
    highlighted: false,
    perks: [
      "Everything in Pulse",
      "Guest list credit for select events",
      "Priority for secret / test shows",
      "Periodic merch & photo pack drops",
    ],
  },
];

export default function MembershipTiers() {
  return (
    <section id="tiers" className="space-y-4">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xxs uppercase tracking-[0.2em] text-white/60">
            Membership tiers
          </p>
          <h2 className="text-xl font-semibold text-white sm:text-2xl">
            Choose how deep you want to go.
          </h2>
          <p className="mt-1 text-xs text-white/70 max-w-xl">
            Pricing is placeholder for now—when we flip the switch, founding
            members will lock in early rates and perks.
          </p>
        </div>
        <p className="text-xxs text-white/55">
          All tiers are planned as monthly with options to upgrade, downgrade,
          or pause.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {TIERS.map((tier) => (
          <Surface
            key={tier.name}
            className={`flex h-full flex-col justify-between border ${
              tier.highlighted
                ? "border-rh-pink-light/70 shadow-[0_0_35px_rgba(246,104,121,0.45)]"
                : "border-white/10"
            }`}
          >
            <div className="space-y-3 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">
                  {tier.name}
                </h3>
                {tier.highlighted && (
                  <Chip className="bg-rh-pink-light text-black border-none text-xxs">
                    Most popular
                  </Chip>
                )}
              </div>
              <p className="text-xs text-white/65">{tier.vibe}</p>

              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-2xl font-semibold text-white">
                  {tier.price}
                </span>
                <span className="text-xs text-white/60">
                  {tier.cadence} · launch date TBD
                </span>
              </div>

              <ul className="mt-3 space-y-2 text-xs text-white/80">
                {tier.perks.map((perk) => (
                  <li key={perk} className="flex gap-2">
                    <span className="mt-[3px] h-1.5 w-1.5 rounded-full bg-rh-pink-light" />
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-white/10 p-4">
              <button
                disabled={true}
                aria-label={`Join ${tier.name} coming soon - not yet available`}
                className={`w-full rounded-full px-3 py-2 text-xs font-semibold transition ${
                  tier.highlighted
                    ? "bg-white text-black opacity-50"
                    : "bg-white/5 text-white opacity-50"
                }`}
              >
                Join {tier.name} (coming soon)
              </button>
            </div>
          </Surface>
        ))}
      </div>
    </section>
  );
}
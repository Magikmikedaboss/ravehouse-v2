import Surface from "@/components/ui/Surface";
import SectionHeader from "@/components/ui/SectionHeader";
import { ButtonLink } from "@/components/ui/Button";

const stats = [
  {
    label: "Events thrown",
    value: "120+",
    blurb: "From desert sunsets to warehouse closers.",
  },
  {
    label: "Attendees",
    value: "25k",
    blurb: "Heads who found us off the grid.",
  },
  {
    label: "Years running",
    value: "5",
    blurb: "Still pushing the underground forward.",
  },
];

export default function ThisIsRavehouse() {
  return (
    <section className="space-y-5">
      <SectionHeader
        title="This is Ravehouse Entertainment"
        description="An underground collective bringing warehouse energy to Las Vegas since 2019. A rotating crew of DJs, visual artists and producers obsessed with sound systems, strobes and safe spaces."
      />

      <div className="grid gap-4 md:grid-cols-4">
        {stats.map((s) => (
          <Surface key={s.label} className="p-4">
            <p className="text-xs text-white/70">{s.label}</p>
            <div className="mt-2 text-2xl font-semibold text-white">{s.value}</div>
            <p className="mt-1 text-xs text-white/80">{s.blurb}</p>          </Surface>
        ))}

        <Surface className="flex flex-col justify-between p-4">
          <div>
            <p className="text-xs text-white/70">Booking &amp; collabs</p>            <p className="mt-2 text-sm text-white/90">
              Bring Ravehouse Entertainment to your warehouse, festival afterparty or brand experience.
            </p>
          </div>
          <ButtonLink
            href="/contact"
            variant="secondary"
            className="mt-4 w-full justify-center"
          >
            Request booking deck
          </ButtonLink>
        </Surface>
      </div>
    </section>
  );
}

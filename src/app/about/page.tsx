// src/app/about/page.tsx

import Surface from "@/components/ui/Surface";
import Chip from "@/components/ui/Chip";
import SectionHeader from "@/components/ui/SectionHeader";
import { ButtonLink } from "@/components/ui/Button";

type CrewMember = {
  name: string;
  role: string;
  tag: string;
  blurb: string;
  focus: string[];
};

const coreCrew: CrewMember[] = [
  {
    name: "Nova",
    role: "Founder · Curator",
    tag: "Warehouse architect",
    blurb:
      "Pulls together the lineups, venues and floor plans so every night feels like a one-off.",
    focus: ["Curation", "Locations", "Collabs"],
  },
  {
    name: "LUNA",
    role: "Resident DJ · Programming",
    tag: "Techno & breaks",
    blurb:
      "Anchors the Ravehouse Entertainment sound with late-night blends and long-form journeys.",
    focus: ["Techno", "Breaks", "Closing sets"],
  },
  {
    name: "RAVEN",
    role: "Resident DJ · Label",
    tag: "Bass cartel",
    blurb:
      "Pushes low-end experiments and guests from the broader underground circuit.",
    focus: ["Bass", "Guests", "Releases"],
  },
  {
    name: "GHOSTLINE",
    role: "Visuals · Lighting",
    tag: "Lasers & haze",
    blurb:
      "Designs the lasers, projections and room lighting so every warehouse feels cinematic.",
    focus: ["Visuals", "Lighting", "Installations"],
  },
  {
    name: "KAI",
    role: "Operations · Guest Experience",
    tag: "Front-of-house",
    blurb:
      "Keeps doors moving, staff synced, and consent-forward vibes locked in all night.",
    focus: ["Door flow", "Staff", "Safety"],
  },
  {
    name: "SEVEN",
    role: "Production · Audio",
    tag: "Sound-first",
    blurb:
      "Tunes systems for every venue and makes sure the rigs hit without wrecking your ears.",
    focus: ["Sound", "Rigs", "Advances"],
  },
];

const values = [
  {
    title: "Sound-first rooms",
    body: "We tune every warehouse, rooftop and afterhours space so the sound system is the hero—no blown highs, no muddy kick, just weight where it belongs.",
  },
  {
    title: "Consent-forward nights",
    body: "Security and staff are briefed on consent-forward, no-harassment policies. You can lose your mind to the music and still feel held by the room.",
  },
  {
    title: "Locals in the spotlight",
    body: "We pair touring acts with local DJs, producers and visual artists to keep the Vegas underground at the center of every lineup.",
  },
  {
    title: "Secret but not sketchy",
    body: "Locations are revealed day-of, but production, safety and access are planned weeks in advance so nights feel wild, not messy.",
  },
];

export default function AboutPage() {
  return (
    <div className="space-y-10 pb-10">
      {/* HERO */}
      <section className="grid gap-6 lg:grid-cols-[minmax(0,1.8fr)_minmax(0,1.2fr)]">
        <Surface className="overflow-hidden">
          <div className="relative h-64 w-full sm:h-80">
            <div className="absolute inset-0 bg-[url('/images/backgrounds/crew-warehouse.jpg')] bg-cover bg-center opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/40 to-black/80" />
            <div className="absolute left-6 right-6 top-6 flex flex-wrap items-center justify-between gap-2 text-[11px] text-white/80">
              <Chip className="bg-rave-pink/20 border-rave-pink/40">
                Built by ravers, for ravers.
              </Chip>
              <Chip className="bg-rave-cyan/20 border-rave-cyan/40">
                DJs · Producers · Visuals · Hosts
              </Chip>
            </div>
            <div className="absolute bottom-7 left-6 right-6 space-y-3">
              <p className="text-xs uppercase tracking-[0.3em] text-white/50">
                About Ravehouse Entertainment
              </p>
              <h1 className="text-3xl font-semibold sm:text-4xl">
                The crew behind the warehouse.
              </h1>
              <p className="max-w-xl text-sm text-white/75">
                Ravehouse Entertainment is a rotating collective of DJs, producers, visual artists
                and night runners building sound-first, consent-forward parties off
                the strip and under the radar.
              </p>
              <div className="mt-3 flex flex-wrap gap-3">
                <ButtonLink href="/events" className="glow">
                  See upcoming lineups
                </ButtonLink>
                <ButtonLink href="/contact" variant="secondary">
                  Book a Ravehouse Entertainment night
                </ButtonLink>
              </div>
              <div className="mt-2 flex flex-wrap gap-2 text-[11px] text-white/60">
                <Chip className="bg-rave-orange/15 border-rave-orange/30">
                  Las Vegas · Warehouses, rooftops, afterhours
                </Chip>
                <Chip className="bg-rave-purple/15 border-rave-purple/30">
                  Since 2019 · 120+ events
                </Chip>
              </div>
            </div>
          </div>
        </Surface>

        {/* RIGHT SIDE SNAPSHOT */}
        <Surface className="p-6 space-y-4">
          <p className="text-xs text-white/60">Ravehouse Entertainment in one view</p>
          <ul className="space-y-3 text-sm text-white/80">
            <li>
              <span className="font-semibold">120+</span> nights thrown from desert
              sunrise closers to basement afterhours.
            </li>
            <li>
              <span className="font-semibold">25k+</span> dancers who found us off
              the grid, by text thread or friend-of-a-friend.
            </li>
            <li>
              <span className="font-semibold">6+</span> residents plus rotating
              guests from the broader underground.
            </li>
          </ul>
          <div className="grid grid-cols-2 gap-3 text-xs text-white/65">
            <div className="rounded-2xl bg-white/5 p-3">
              <p className="text-[11px] uppercase tracking-[0.2em] text-white/40">
                BASE
              </p>
              <p className="mt-1 text-sm font-medium text-white">
                Las Vegas underground
              </p>
              <p className="mt-1">
                Arts District, Downtown, Strip-adjacent warehouses and rooftops.
              </p>
            </div>
            <div className="rounded-2xl bg-white/5 p-3">
              <p className="text-[11px] uppercase tracking-[0.2em] text-white/40">
                VIBE
              </p>
              <p className="mt-1 text-sm font-medium text-white">
                No ropes, no ego.
              </p>
              <p className="mt-1">
                Floor-first energy, extended sets and rooms built for dancing, not
                bottle pics.
              </p>
            </div>
          </div>
        </Surface>
      </section>

      {/* CORE CREW GRID */}
      <section className="space-y-5">
        <SectionHeader
          eyebrow="Crew"
          title="The residents and night runners keeping Ravehouse Entertainment moving."
          description="A tight core of DJs, producers, visual artists and managers, plus a wider orbit of friends who jump in for special nights, takeovers and collabs."
        />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {coreCrew.map((person) => (
            <Surface key={person.name} className="p-4 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <p className="text-sm font-semibold">{person.name}</p>
                    <p className="text-[11px] text-white/60">{person.role}</p>
                  </div>
                  <Chip className="bg-rave-pink/20 border-none text-[11px]">                    {person.tag}
                  </Chip>
                </div>
                <p className="text-xs text-white/70">{person.blurb}</p>
              </div>
              <div className="mt-3 flex flex-wrap gap-1 text-[11px] text-white/70">
                {person.focus.map((f) => (
                  <Chip
                    key={f}
                    className="bg-white/5 border-white/10 text-[11px]"
                  >
                    {f}
                  </Chip>
                ))}
              </div>
            </Surface>
          ))}
        </div>
      </section>

      {/* VALUES / ETHOS */}
      <section className="space-y-5">
        <SectionHeader
          eyebrow="Ethos"
          title="What we protect every night."
          description="The music is the excuse to gather. The real work is building rooms where people feel safe enough to let go."
        />

        <div className="grid gap-4 md:grid-cols-2">
          {values.map((value) => (
            <Surface key={value.title} className="p-4">
              <p className="text-xs text-white/50">Principle</p>
              <h3 className="mt-1 text-sm font-semibold text-white">
                {value.title}
              </h3>
              <p className="mt-2 text-xs text-white/70">{value.body}</p>
            </Surface>
          ))}
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section>
        <Surface className="flex flex-col items-start justify-between gap-4 p-5 md:flex-row md:items-center">
          <div>
            <p className="text-xs text-white/60">Collabs · Takeovers · Bookings</p>
            <h2 className="mt-1 text-lg font-semibold">
              Want the Ravehouse Entertainment crew on your system?
            </h2>
            <p className="mt-1 text-sm text-white/70">
              From full-venue takeovers to curated stages, we can bring residents,
              guests and visuals to warehouses, clubs, rooftops or festivals.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/contact" className="glow">
              Request booking deck
            </ButtonLink>
            <ButtonLink href="/events" variant="secondary">
              Check open dates
            </ButtonLink>
          </div>
        </Surface>
      </section>
    </div>
  );
}

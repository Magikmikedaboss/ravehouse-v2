// src/app/tickets/page.tsx

import Surface from "@/components/ui/Surface";
import Chip from "@/components/ui/Chip";
import SectionHeader from "@/components/ui/SectionHeader";
import { ButtonLink } from "@/components/ui/Button";

const tonightTickets = [
  {
    id: "RH-ECLP-7F3A",
    when: "Fri · Tonight · 11:00PM",
    title: "Warehouse Eclipse · Techno Marathon",
    entryWindow: "11:00PM – 1:30AM",
    nameLine: "Jordan Vega",
    ticketType: "Early arrival · GA",
    status: "Checked in early",
    venueNote: "Venue drop: 10:00PM · Downtown LV · Warehouse zone",
    orderTotal: "$35.00",
    tags: ["Techno", "Downtown LV", "Strobe heavy"],
    actions: ["Transfer", "Add to Wallet"],
  },
  {
    id: "RH-NSKY-93B2",
    when: "Sat · Tomorrow · 9:30PM",
    title: "Neon Skyline · House on the Strip",
    entryWindow: "9:30PM – 12:00AM",
    nameLine: "Jordan +1",
    ticketType: "VIP table · Strip view",
    status: "Upcoming · Not scanned",
    venueNote: "Venue: Skyline Tower · Strip rooftop · House & disco",
    orderTotal: "$480+",
    tags: ["House", "Strip rooftop", "Dress sharp, sneakers ok"],
    actions: ["Share with crew", "VIP Info"],
  },
];

export default function TicketsPage() {
  return (
    <div className="space-y-10 pb-10">
      {/* PAGE HEADER */}
      <section className="space-y-4">
        <p className="text-[11px] uppercase tracking-[0.3em] text-black/50">
          My access
        </p>
        <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <div>
            <h1 className="text-3xl font-semibold sm:text-4xl">
              Tickets &amp; passes
            </h1>
            <p className="mt-2 max-w-xl text-sm text-black/70">
              Your digital wristbands for every warehouse, rooftop and afterhours
              you&apos;ve unlocked with Ravehouse Entertainment. Show this screen at the door, keep
              brightness high for scan.
            </p>
            <div className="mt-3 flex flex-wrap gap-2 text-xxs">
              <Chip variant="cyan">Las Vegas · PT</Chip>
              <Chip variant="orange">
                Show this screen at the door
              </Chip>
              <Chip variant="purple">
                Keep brightness high for scan
              </Chip>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <Chip variant="pink">
              2 active tickets tonight
            </Chip>            <ButtonLink href="/tickets" variant="secondary" className="px-4 py-2">
              Export as PDF wallet
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* MAIN BODY */}
      <section className="space-y-4">
        <div className="flex items-center justify-between text-xs text-black/70">
          <div className="flex gap-2">
            <button className="rounded-full bg-black text-white px-3 py-1 font-medium">
              Upcoming
            </button>
            <button className="rounded-full border border-black/15 bg-black/10 px-3 py-1">
              Past nights
            </button>
            <button className="rounded-full border border-black/15 bg-black/10 px-3 py-1">
              Transfers
            </button>
          </div>
          <button className="text-black/60 hover:text-black">
            Show all as stack
          </button>
        </div>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.25fr)]">
          {/* LEFT: TONIGHT'S TICKETS */}
          <div className="space-y-4">
            <SectionHeader
              eyebrow="Tonight's tickets"
              title="Scan at the door, tap for full details."
            />

            <div className="space-y-4">
              {tonightTickets.map((ticket, index) => (
                <Surface
                  key={ticket.id}
                  className="grid gap-4 p-4 md:grid-cols-[minmax(0,1.7fr)_minmax(0,1.1fr)]"
                >
                  {/* Ticket info */}
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-black/60">
                      <Chip className="bg-rave-pink/20 border-rave-pink/40 text-black">
                        {ticket.when}
                      </Chip>
                      <Chip
                        className={
                          index === 0
                            ? "bg-green-500/15 border-green-400/30 text-green-700"
                            : "bg-rave-cyan/20 border-none text-rave-cyan/80"
                        }
                      >
                        {index === 0 ? "Checked in early" : "Upcoming · Not scanned"}
                      </Chip>
                    </div>

                    <h2 className="text-sm font-semibold text-black">
                      {ticket.title}
                    </h2>

                    <div className="grid gap-2 text-xxs text-black/70 sm:grid-cols-3">
                      <div>
                        <p className="text-black/50">Entry window</p>
                        <p className="mt-0.5">{ticket.entryWindow}</p>
                      </div>
                      <div>
                        <p className="text-black/50">Name on ticket</p>
                        <p className="mt-0.5">{ticket.nameLine}</p>
                      </div>
                      <div>
                        <p className="text-black/50">Ticket type</p>
                        <p className="mt-0.5">{ticket.ticketType}</p>
                      </div>
                    </div>

                    <p className="mt-1 text-xxs text-black/60">
                      {index === 0
                        ? "Admit 1 · No re-entry · 21+ · Bring valid ID. Location drops 3h before doors."
                        : "Host will text with booth arrival details. Bottle minimum applies."}
                    </p>

                    <div className="mt-2 flex flex-wrap gap-2 text-xxs text-black/70">
                      {ticket.tags.map((t) => (
                        <Chip
                          key={t}
                          className="bg-black/10 border-black/15 text-[11px] text-black"
                        >
                          {t}
                        </Chip>
                      ))}
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2 text-xs">
                      {ticket.actions.map((action, i) => (
                        <ButtonLink
                          key={action}
                          href="#"
                          variant={i === 0 ? "secondary" : "primary"}
                          className="px-3 py-1 text-[11px]"
                        >
                          {action}
                        </ButtonLink>
                      ))}
                    </div>
                  </div>

                  {/* Right mini card: barcode + meta */}
                  <div className="flex flex-col justify-between rounded-2xl bg-black/40 p-3 text-xs">
                    <div>
                      <p className="text-xxs text-black/50">
                        Venue drop: {index === 0 ? "10:00PM" : "Skyline Tower · Strip"}
                      </p>
                      <div className="mt-2 h-20 rounded-xl bg-gradient-to-br from-rave-pink/30 via-rave-purple/30 to-black/80 flex items-center justify-center">
                        {Array.from({ length: 18 }).map((_, idx) => (
                          <div
                            key={idx}
                            className="w-[3px] rounded-full bg-black/80"
                            style={{
                              height: `${40 + ((idx * 13) % 25)}%`,
                            }}
                          />
                        ))}
                      </div>
                      <p className="mt-2 text-xxs text-black/60">
                        Door staff will scan either code. Keep this open in line.
                      </p>
                    </div>

                    <div className="mt-3 flex items-center justify-between text-xxs text-black/60">
                      <div>
                        <p className="text-black/40">Ticket ID</p>
                        <p className="font-mono text-xs text-black">{ticket.id}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-black/40">Order total</p>
                        <p className="font-semibold text-black">
                          {ticket.orderTotal}
                        </p>
                      </div>
                    </div>
                  </div>
                </Surface>
              ))}
            </div>

            <div className="text-xs text-black/60">
              Recent nights · <span className="underline">View full history</span>
            </div>
          </div>

          {/* RIGHT COLUMN: STREAK + PERKS + SYNC */}
          <div className="space-y-4">
            {/* Ravehouse streak */}
            <Surface className="p-4 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs text-black/60">Ravehouse Entertainment streak</p>
                  <h3 className="mt-1 text-sm font-semibold text-black">
                    How deep you&apos;ve gone into the underground this year.
                  </h3>
                </div>
                <Chip variant="orange">
                  Member since 2023
                </Chip>
              </div>

              <div className="grid grid-cols-3 gap-3 text-center text-xs">
                <div>
                  <p className="text-2xl font-semibold text-black">14</p>
                  <p className="text-black/60">Nights attended</p>
                </div>
                <div>
                  <p className="text-2xl font-semibold text-black">6</p>
                  <p className="text-black/60">Warehouses</p>
                </div>
                <div>
                  <p className="text-2xl font-semibold text-black">3</p>
                  <p className="text-black/60">Genres unlocked</p>
                </div>
              </div>

              <p className="text-xxs text-black/60">
                3 more nights and you hit your next status.
              </p>

              <div className="flex gap-2 text-xxs">
                <button className="flex-1 rounded-full bg-black/5 px-3 py-1 text-center text-black/75">
                  Local
                </button>
                <button className="flex-1 rounded-full bg-gradient-to-r from-rave-pink to-rave-orange px-3 py-1 text-center text-black font-semibold">
                  Glow
                </button>
                <button className="flex-1 rounded-full bg-black/5 px-3 py-1 text-center text-black/75">
                  Afterhours
                </button>
              </div>
            </Surface>

            {/* Ticket perks */}
            <Surface className="p-4 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs text-black/60">Ticket perks</p>
                  <h3 className="mt-2 text-sm font-semibold text-black">
                    Your tickets are more than barcodes. Unlock extras as you go.
                  </h3>
                </div>
                <button className="text-xxs text-black/60 hover:text-black">
                  Manage
                </button>
              </div>

              <div className="grid gap-3 text-xs md:grid-cols-3">
                <div>
                  <p className="text-black/50">Skip-line tokens</p>
                  <p className="mt-2 text-lg font-semibold text-black">2</p>
                  <p className="text-xxs text-black/60">Available</p>
                </div>
                <div>
                  <p className="text-black/50">Guestlist credits</p>
                  <p className="mt-2 text-lg font-semibold text-black">1</p>
                  <p className="text-xxs text-black/60">For this month</p>
                </div>
                <div>
                  <p className="text-black/50">Free drink chips</p>
                  <p className="mt-2 text-lg font-semibold text-black">
                    0 <span className="text-xs text-black/60">→ earn 2 more nights</span>
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 text-[11px]">
                <button className="rounded-full bg-black/10 px-3 py-1 text-black/80">
                  Apply skip-line to Eclipse
                </button>
                <button className="rounded-full bg-black/10 px-3 py-1 text-black/80">
                  Save perks for afterhours
                </button>
              </div>
            </Surface>

            {/* Keep tickets handy */}
            <Surface className="p-4 space-y-3">
              <p className="text-xs text-black/60">Keep tickets handy</p>
              <h3 className="mt-1 text-sm font-semibold text-black">
                Sync your passes to your favorite wallet apps.
              </h3>
              <p className="text-xs text-black/70">
                Add all upcoming tickets to your phone&apos;s wallet with one tap.
              </p>
              <div className="mt-2 flex flex-wrap gap-2 text-xs">
                <ButtonLink href="#" className="px-4 py-2">
                  Add all
                </ButtonLink>
              </div>
              <div className="mt-3 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-black/5 px-3 py-2 text-[11px] text-black/70">
                <div>
                  <p className="font-medium text-black">
                    Turn on &quot;Door alert&quot; notifications?
                  </p>
                  <p className="text-black/60">
                    We&apos;ll nudge you 20 minutes before your entry window.
                  </p>
                </div>
                <button className="rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-black">
                  Enable
                </button>
              </div>
            </Surface>
          </div>
        </div>
      </section>
    </div>
  );
}

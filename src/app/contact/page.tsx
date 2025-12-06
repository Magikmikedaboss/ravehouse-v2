// src/app/contact/page.tsx

import Surface from "@/components/ui/Surface";
import Chip from "@/components/ui/Chip";
import SectionHeader from "@/components/ui/SectionHeader";
import { ButtonLink } from "@/components/ui/Button";

const contactMethods = [
  {
    type: "Email",
    value: "hello@ravehouse.com",
    description: "General inquiries, partnerships, press",
    action: "mailto:hello@ravehouse.com",
    icon: "✉️",
  },
  {
    type: "Bookings",
    value: "bookings@ravehouse.com",
    description: "DJ bookings, event inquiries, collabs",
    action: "mailto:bookings@ravehouse.com",
    icon: "🎧",
  },
  {
    type: "Instagram",
    value: "@ravehouse",
    description: "Follow for updates, behind-the-scenes, announcements",
    action: "https://instagram.com/ravehouse",
    icon: "📸",
  },
  {
    type: "Discord",
    value: "Ravehouse Community",
    description: "Join our community server for real-time updates",
    action: "#",
    icon: "💬",
  },
];

const locations = [
  {
    city: "Las Vegas, NV",
    focus: "Primary operations, main events",
    notes: "Downtown warehouse district, Strip rooftops",
  },
  {
    city: "Los Angeles, CA",
    focus: "West Coast expansion",
    notes: "Upcoming events, guest appearances",
  },
];

export default function ContactPage() {
  return (
    <div className="space-y-10 pb-10">
      {/* PAGE HEADER */}
      <section className="space-y-4">
        <p className="text-[11px] uppercase tracking-[0.3em] text-white/60">
          Get in touch
        </p>
        <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <div>
            <h1 className="text-3xl font-semibold sm:text-4xl text-white">
              Contact Ravehouse Entertainment
            </h1>
            <p className="mt-2 max-w-xl text-sm text-white/75">
              Reach out for bookings, partnerships, press inquiries, or just to say hello.
              We&apos;re always looking to connect with the underground scene.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Chip className="bg-rh-pink-light/20 border-rh-pink-light/40">
              24-48hr response
            </Chip>
            <Chip className="bg-rh-cyan/20 border-rh-cyan/40">
              Vegas-based
            </Chip>
          </div>
        </div>
      </section>

      {/* CONTACT METHODS */}
      <section className="space-y-6">
        <SectionHeader
          title="Ways to connect"
          description="Multiple channels for different needs"
        />

        <div className="grid gap-4 md:grid-cols-2">
          {contactMethods.map((method) => (
            <Surface key={method.type} className="p-6">
              <div className="flex items-start gap-4">
                <div className="text-xl sm:text-2xl">{method.icon}</div>
                <div className="flex-1 space-y-2">
                  <div>
                    <h3 className="font-semibold text-white">{method.type}</h3>
                    <p className="text-sm text-white/75">{method.description}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-rh-pink-light">
                      {method.value}
                    </span>
                    {method.action.startsWith("mailto:") || method.action.startsWith("https://") ? (
                      <ButtonLink href={method.action} className="text-xs">
                        Contact
                      </ButtonLink>
                    ) : (
                      <ButtonLink href="#" className="text-xs opacity-50 cursor-not-allowed">
                        Coming soon
                      </ButtonLink>
                    )}
                  </div>
                </div>
              </div>
            </Surface>
          ))}
        </div>
      </section>

      {/* LOCATIONS */}
      <section className="space-y-6">
        <SectionHeader
          title="Where we operate"
          description="Currently active in these cities"
        />

        <div className="grid gap-4 md:grid-cols-2">
          {locations.map((location) => (
            <Surface key={location.city} className="p-6">
              <div className="space-y-3">
                <div>
                  <h3 className="text-lg font-semibold text-white">{location.city}</h3>
                  <p className="text-sm text-white/75">{location.focus}</p>
                </div>
                <p className="text-sm text-white/60">{location.notes}</p>
                <div className="flex flex-wrap gap-2">
                  <Chip className="bg-rh-purple/20 border-rh-purple/40 text-xs">
                    {location.city === "Las Vegas, NV" ? "Active" : "Expanding"}
                  </Chip>
                </div>
              </div>
            </Surface>
          ))}
        </div>
      </section>

      {/* BUSINESS HOURS */}
      <section className="space-y-6">
        <SectionHeader
          title="Response times"
          description="When to expect replies"
        />

        <Surface className="p-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <h3 className="font-semibold text-white">Email responses</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/75">Business hours (PST)</span>
                  <span className="text-white">24-48 hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/75">Weekends</span>
                  <span className="text-white">48-72 hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/75">Event periods</span>
                  <span className="text-white">72+ hours</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-white">Emergency contact</h3>
              <p className="text-sm text-white/75">
                For urgent venue or safety issues during events, call our emergency line.
              </p>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-rh-pink-light">702-RH-HELP</span>
                <Chip className="bg-red-500/20 border-red-500/40 text-xs">
                  Emergency only
                </Chip>
              </div>
            </div>
          </div>
        </Surface>
      </section>
    </div>
  );
}
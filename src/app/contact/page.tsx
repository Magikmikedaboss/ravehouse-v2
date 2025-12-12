// src/app/contact/page.tsx

import Surface from "@/components/ui/Surface";
import Chip from "@/components/ui/Chip";
import SectionHeader from "@/components/ui/SectionHeader";
import { Button, ButtonLink } from "@/components/ui/Button";

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
    action: "", // Empty string to be handled in rendering logic
    icon: "💬",
  },];

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
        <p className="text-xxs uppercase tracking-[0.3em] text-[rgb(var(--rh-text-secondary))]">
          Get in touch
        </p>
        <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <div>
            <h1 className="text-3xl font-semibold sm:text-4xl text-[rgb(var(--rh-text-primary))]">
              Contact Ravehouse Entertainment
            </h1>
            <p className="mt-2 max-w-xl text-sm text-[rgb(var(--rh-text-secondary))]">
              Reach out for bookings, partnerships, press inquiries, or just to say hello.
              We&apos;re always looking to connect with the underground scene.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Chip variant="pink" size="sm">
              24-48hr response
            </Chip>
            <Chip variant="cyan" size="sm">
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
            <Surface key={method.type} className="p-4 md:p-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-4">
                <div className="text-xl sm:text-2xl shrink-0">{method.icon}</div>
                <div className="flex-1 space-y-2 min-w-0">
                  <div>
                    <h3 className="font-semibold text-[rgb(var(--rh-text-primary))]">{method.type}</h3>
                    <p className="text-sm text-[rgb(var(--rh-text-secondary))]">{method.description}</p>
                  </div>
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <span className="text-sm font-medium text-rh-pink-light break-all sm:break-normal">
                      {method.value}
                    </span>
                    {method.action && (method.action.startsWith("mailto:") || method.action.startsWith("http")) ? (
                      <ButtonLink href={method.action} className="text-xs self-start sm:self-auto">
                        Contact
                      </ButtonLink>
                    ) : (
                      <Button disabled variant="secondary" className="text-xs self-start sm:self-auto">
                        Coming soon
                      </Button>
                    )}                  </div>                </div>
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
            <Surface key={location.city} className="p-4 md:p-6">
              <div className="space-y-3">
                <div>
                  <h3 className="text-lg font-semibold text-[rgb(var(--rh-text-primary))]">{location.city}</h3>
                  <p className="text-sm text-[rgb(var(--rh-text-secondary))]">{location.focus}</p>
                </div>
                <p className="text-sm text-[rgb(var(--rh-text-secondary))]">{location.notes}</p>
                <div className="flex flex-wrap gap-2">
                  <Chip variant="purple" size="sm">
                    {location.city === "Las Vegas, NV" ? "Active" : "Expanding"}
                  </Chip>                </div>
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

        <Surface className="p-4 md:p-6">
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
            <div className="space-y-4">
              <h3 className="font-semibold text-[rgb(var(--rh-text-primary))]">Email responses</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[rgb(var(--rh-text-secondary))]">Business hours (PST)</span>
                  <span className="text-[rgb(var(--rh-text-primary))]">24-48 hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[rgb(var(--rh-text-secondary))]">Weekends</span>
                  <span className="text-[rgb(var(--rh-text-primary))]">48-72 hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[rgb(var(--rh-text-secondary))]">Event periods</span>
                  <span className="text-[rgb(var(--rh-text-primary))]">72+ hours</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-[rgb(var(--rh-text-primary))]">Emergency contact</h3>
              <p className="text-sm text-[rgb(var(--rh-text-secondary))]">
                For urgent venue or safety issues during events, call our emergency line.
              </p>
              <div className="flex items-center gap-2">
                <a href="tel:+17024754357" className="text-sm font-medium text-rh-pink-light hover:underline">
                  702-RH-HELP (702-475-4357)
                </a>                <Chip variant="danger" size="sm">
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
// src/components/layout/SiteHeader.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Chip from "../ui/Chip";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Events" },
  { href: "/tickets", label: "Tickets" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/vip", label: "VIP" },
];

export default function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-black/40 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-6 px-4 py-4 md:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-rave-pink to-rave-orange shadow-glow text-xs font-bold">
            RH
          </div>
          <span className="text-sm font-semibold tracking-wide">
            RAVEHOUSE
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden flex-1 items-center justify-between gap-6 md:flex">
          <div className="flex gap-1 rounded-full bg-white/5 p-1">
            {navLinks.map((link) => {
              const active =
                (link.href === "/" && pathname === "/") ||
                (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                    active
                      ? "bg-white text-black shadow"
                      : "text-white/70 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <Chip className="bg-green-500/15 text-[11px] text-green-300 border-green-400/30">
              Live this weekend
            </Chip>
            <Link
              href="/tickets"
              className="inline-flex items-center rounded-full bg-gradient-to-r from-rave-pink to-rave-orange px-4 py-2 text-xs font-semibold shadow-glow"
            >
              Get Tickets
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}

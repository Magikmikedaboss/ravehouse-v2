// src/components/layout/SiteHeader.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Chip from "../ui/Chip";
import { NAV_ITEMS } from "../../lib/navigation";

export default function SiteHeader() {
  const pathname = usePathname();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedMobileItem, setExpandedMobileItem] = useState<string | null>(null);

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
          <div className="flex gap-1 rounded-full bg-white/5 p-1 relative">
            {NAV_ITEMS.map((item) => {
              const active = item.href && (
                (item.href === "/" && pathname === "/") ||
                (item.href !== "/" && pathname.startsWith(item.href))
              );

              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setHoveredItem(item.label)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  {item.href ? (
                    <Link
                      href={item.href}
                      className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                        active
                          ? "bg-white text-black shadow"
                          : "text-white/70 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <button
                      className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                        hoveredItem === item.label
                          ? "bg-white/10 text-white"
                          : "text-white/70 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      {item.label}
                    </button>
                  )}

                  {/* Desktop submenu dropdown */}
                  {item.children && hoveredItem === item.label && (
                    <div className="absolute top-full left-0 mt-2 w-48 rounded-lg border border-white/10 bg-black/90 backdrop-blur shadow-xl">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2 text-xs text-white/70 hover:bg-white/10 hover:text-white transition"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
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

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden rounded-lg p-2 text-white/70 hover:bg-white/10 hover:text-white transition"
          aria-label="Toggle mobile menu"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile nav */}
      {mobileMenuOpen && (
        <div className="border-t border-white/5 bg-black/90 backdrop-blur md:hidden">
          <div className="mx-auto max-w-6xl px-4 py-4">
            <nav className="flex flex-col gap-2">
              {NAV_ITEMS.map((item) => {
                const active = item.href && (
                  (item.href === "/" && pathname === "/") ||
                  (item.href !== "/" && pathname.startsWith(item.href))
                );

                return (
                  <div key={item.label}>
                    {item.href ? (
                      <Link
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`block rounded-lg px-3 py-2 text-sm font-medium transition ${
                          active
                            ? "bg-white text-black"
                            : "text-white/70 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <button
                        onClick={() => setExpandedMobileItem(
                          expandedMobileItem === item.label ? null : item.label
                        )}
                        className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white transition"
                      >
                        {item.label}
                        <svg
                          className={`h-4 w-4 transition-transform ${
                            expandedMobileItem === item.label ? "rotate-180" : ""
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    )}

                    {/* Mobile submenu */}
                    {item.children && expandedMobileItem === item.label && (
                      <div className="ml-4 mt-1 space-y-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="block rounded-lg px-3 py-2 text-sm text-white/60 hover:bg-white/5 hover:text-white transition"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

              <div className="mt-4 flex flex-col gap-3 border-t border-white/10 pt-4">
                <Chip className="self-start bg-green-500/15 text-[11px] text-green-300 border-green-400/30">
                  Live this weekend
                </Chip>
                <Link
                  href="/tickets"
                  onClick={() => setMobileMenuOpen(false)}
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-rave-pink to-rave-orange px-4 py-2 text-sm font-semibold shadow-glow"
                >
                  Get Tickets
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}

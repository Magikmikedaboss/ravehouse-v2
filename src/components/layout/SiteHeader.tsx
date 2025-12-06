// src/components/layout/SiteHeader.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect, useLayoutEffect, useMemo } from "react";
import Chip from "../ui/Chip";
import { NAV_ITEMS } from "../../lib/navigation";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";

export default function SiteHeader() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedMobileItem, setExpandedMobileItem] = useState<string | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);

  // Helper function to determine if a nav item is active
  const isItemActive = useMemo(() => {
    const normalizedPathname = pathname.replace(/\/$/, "");
    return (item: typeof NAV_ITEMS[0]) => {
      if (item.href) {
        const normalizedHref = item.href.replace(/\/$/, "");
        return normalizedPathname === normalizedHref ||
          (normalizedHref !== "/" && normalizedPathname.startsWith(normalizedHref + "/"));
      }
      return item.children?.some((child) => {
        const childHref = child.href.replace(/\/$/, "");
        return normalizedPathname === childHref ||
          normalizedPathname.startsWith(childHref + "/");
      }) || false;
    };
  }, [pathname]);

  // Close mobile menu on outside click
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const isInsideMenu = mobileMenuRef.current && mobileMenuRef.current.contains(target);
      const isInsideButton = toggleButtonRef.current && toggleButtonRef.current.contains(target);
      
      if (!isInsideMenu && !isInsideButton) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mobileMenuOpen]);

  // Close mobile menu on Escape key
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [mobileMenuOpen]);

  // Close mobile menu on route change
  /* eslint-disable react-hooks/set-state-in-effect */
  useLayoutEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);
  /* eslint-enable react-hooks/set-state-in-effect */
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-black/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-6 px-4 py-4 md:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <div className="flex flex-col leading-tight">
            <span className="text-lg font-black tracking-wider text-white bg-gradient-to-r from-rh-pink-light via-white to-rh-cyan bg-clip-text text-transparent">
              RAVEHOUSE
            </span>
            <span className="text-[10px] font-bold tracking-[0.2em] text-rh-pink-light/80 uppercase">
              ENTERTAINMENT
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <NavigationMenu.Root className="hidden md:flex">
          <NavigationMenu.List className="flex gap-1 rounded-full bg-black/5 p-1">
            {NAV_ITEMS.map((item) => {
              const active = isItemActive(item);
              return (
                <NavigationMenu.Item key={item.label}>
                  {item.children ? (
                    <>
                      <NavigationMenu.Trigger className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                        active
                          ? "bg-white text-black shadow"
                          : "text-white/70 hover:bg-white/10 hover:text-white data-[state=open]:bg-white/10 data-[state=open]:text-white"
                      }`}>
                        {item.label}
                      </NavigationMenu.Trigger>
                      <NavigationMenu.Content className="absolute top-full left-0 mt-2 w-48 rounded-lg border border-white/10 bg-black/90 backdrop-blur shadow-rh-medium animate-in fade-in-0 zoom-in-95">
                        <ul className="p-2">
                          {item.children.map((child) => (
                            <li key={child.href}>
                              <NavigationMenu.Link asChild>
                                <Link
                                  href={child.href}
                                  className="block px-3 py-2 text-xs text-white/70 hover:bg-white/10 hover:text-white transition rounded-md focus:bg-white/10 focus:text-white focus:outline-none"
                                >
                                  {child.label}
                                </Link>
                              </NavigationMenu.Link>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenu.Content>
                    </>
                  ) : item.href ? (
                    <NavigationMenu.Link asChild>
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
                    </NavigationMenu.Link>
                  ) : null}
                </NavigationMenu.Item>
              );
            })}
          </NavigationMenu.List>
        </NavigationMenu.Root>

          <div className="ml-auto hidden md:flex items-center gap-3">
            <Chip className="bg-rh-green/15 text-[12px] text-rh-green border-rh-green/30">
              Live this weekend
            </Chip>
            <Link
              href="/tickets"
              className="inline-flex items-center rounded-full bg-gradient-to-r from-rh-pink-light to-rh-pink-dark px-4 py-2 text-xs font-semibold shadow-rh-soft"
            >
              Get Tickets
            </Link>
          </div>
        {/* Mobile menu button */}
        <button
          ref={toggleButtonRef}
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden rounded-lg p-2 text-white/70 hover:bg-white/10 hover:text-white transition"
          aria-label="Toggle mobile menu"
          aria-expanded={mobileMenuOpen}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>        </button>      </div>
      {/* Mobile nav */}
      {mobileMenuOpen && (
        <div ref={mobileMenuRef} className="border-t border-white/10 bg-black/95 backdrop-blur md:hidden">
          <div className="mx-auto max-w-6xl px-4 py-4">
            <nav className="flex flex-col gap-2">
            {NAV_ITEMS.map((item) => {
              const active = isItemActive(item);
              return (                  <div key={item.label}>
                    {item.href ? (
                      <Link
                        href={item.href}
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
                        type="button"
                        onClick={() => setExpandedMobileItem(
                          expandedMobileItem === item.label ? null : item.label
                        )}
                        className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white transition"
                        aria-expanded={expandedMobileItem === item.label}
                        aria-haspopup="true"
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
                      </button>                    )}

                    {/* Mobile submenu */}
                    {item.children && expandedMobileItem === item.label && (
                      <div className="ml-4 mt-1 space-y-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
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
                <Chip className="self-start bg-rh-green/15 text-[12px] text-rh-green border-rh-green/30">
                  Live this weekend
                </Chip>
                <Link
                  href="/tickets"
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-rh-pink-light to-rh-pink-dark px-4 py-2 text-sm font-semibold text-white shadow-rh-soft"
                >
                  Get Tickets
                </Link>              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}

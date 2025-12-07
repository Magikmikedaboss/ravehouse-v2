// src/components/layout/SiteHeader.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect, useMemo } from "react";
import Chip from "../ui/Chip";
import { NAV_ITEMS } from "../../lib/navigation";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import ThemeToggle from "../ui/ThemeToggle";

export default function SiteHeader() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedMobileItem, setExpandedMobileItem] = useState<string | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);
  const desktopThemeToggleRef = useRef<HTMLDivElement>(null);
  const mobileThemeToggleRef = useRef<HTMLDivElement>(null);

  const isItemActive = useMemo(() => {
    // Centralize pathname normalization: default to "/" when falsy, strip query and trailing slash
    const normalizePath = (path: string | null) => {
      const cleanPath = (path || "/").split('?')[0];
      return cleanPath === "/" ? "/" : cleanPath.replace(/\/$/, "");
    };

    const normalizedPathname = normalizePath(pathname);

    return (item: typeof NAV_ITEMS[0]) => {
      if (item.href) {
        const normalizedHref = normalizePath(item.href);
        return normalizedPathname === normalizedHref ||
          (normalizedHref !== "/" && normalizedPathname.startsWith(normalizedHref + "/"));
      }
      return item.children?.some((child) => {
        const childHref = normalizePath(child.href);
        return normalizedPathname === childHref ||
          normalizedPathname.startsWith(childHref + "/");
      }) || false;
    };
  }, [pathname]);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const isInsideMenu = mobileMenuRef.current?.contains(target);
      const isInsideButton = toggleButtonRef.current?.contains(target);
      const isInsideDesktopThemeToggle = desktopThemeToggleRef.current?.contains(target);
      const isInsideMobileThemeToggle = mobileThemeToggleRef.current?.contains(target);
      
      if (!isInsideMenu && !isInsideButton && !isInsideDesktopThemeToggle && !isInsideMobileThemeToggle) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mobileMenuOpen]);

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

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 dark:border-white/10 bg-white/90 dark:bg-black/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-4 md:gap-6 md:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <div className="flex flex-col leading-tight">
            <span className="text-lg font-black tracking-wider text-white bg-gradient-to-r from-rh-pink-light via-white to-rh-cyan bg-clip-text text-transparent">
              RAVEHOUSE
            </span>
            <span className="text-[10px] font-bold tracking-[0.2em] text-rh-pink-light/80 uppercase">
              ENTERTAINMENT
            </span>
          </div>
        </Link>

        {/* Desktop nav - EXPLICITLY HIDDEN ON MOBILE */}
        <div className="hidden md:block">
          <NavigationMenu.Root>
            <NavigationMenu.List className="flex gap-1 rounded-full bg-black/5 dark:bg-white/5 p-1">
              {NAV_ITEMS.map((item) => {
                const active = isItemActive(item);
                return (
                  <NavigationMenu.Item key={item.label}>
                    {item.children ? (
                      <>
                        <NavigationMenu.Trigger className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                          active
                            ? "bg-black dark:bg-white text-white dark:text-black shadow"
                            : "text-black/70 dark:text-white/70 hover:bg-black/10 dark:hover:bg-white/10 hover:text-black dark:hover:text-white data-[state=open]:bg-black/10 dark:data-[state=open]:bg-white/10 data-[state=open]:text-black dark:data-[state=open]:text-white"
                        }`}>
                          {item.label}
                        </NavigationMenu.Trigger>
                        <NavigationMenu.Content className="absolute top-full left-0 mt-2 w-48 rounded-lg border border-black/10 dark:border-white/10 bg-white/90 dark:bg-black/90 backdrop-blur shadow-rh-medium animate-fade-in animate-zoom-in z-50">
                          <ul className="p-2">
                            {item.children.map((child) => (
                              <li key={child.href}>
                                <NavigationMenu.Link asChild>
                                  <Link
                                    href={child.href}
                                    className="block px-3 py-2 text-xs text-black/70 dark:text-white/70 hover:bg-black/10 dark:hover:bg-white/10 hover:text-black dark:hover:text-white transition rounded-md focus:bg-black/10 dark:focus:bg-white/10 focus:text-black dark:focus:text-white focus:outline-none"
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
                              ? "bg-black dark:bg-white text-white dark:text-black shadow"
                              : "text-black/70 dark:text-white/70 hover:bg-black/10 dark:hover:bg-white/10 hover:text-black dark:hover:text-white"
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
        </div>

        {/* Desktop actions - WRAPPED IN SEPARATE DIV WITH EXPLICIT HIDING */}
        <div className="hidden md:flex ml-auto items-center gap-3">
          <div className="relative z-10" ref={desktopThemeToggleRef}>
            <ThemeToggle />
          </div>
          <Chip className="hidden sm:flex text-xs" variant="success">
            Live this weekend
          </Chip>
          <Link
            href="/tickets"
            className="inline-flex items-center rounded-full bg-gradient-to-r from-rh-pink-light to-rh-pink-dark px-4 py-2 text-xs font-semibold text-white shadow-rh-soft"
          >
            Get Tickets
          </Link>        </div>

        {/* Mobile menu button - POSITIONED ABSOLUTELY TO AVOID LAYOUT CONFLICTS */}
        <button
          ref={toggleButtonRef}
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="ml-auto md:hidden relative z-50 rounded-lg p-2 text-black/70 dark:text-white/70 hover:bg-black/10 dark:hover:bg-white/10 hover:text-black dark:hover:text-white transition"
          aria-label="Toggle mobile menu"
          aria-expanded={mobileMenuOpen}
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

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div ref={mobileMenuRef} className="border-t border-black/10 dark:border-white/10 bg-white/95 dark:bg-black/95 backdrop-blur md:hidden">
          <div className="mx-auto max-w-6xl px-4 py-4">
            <nav className="flex flex-col gap-2">
              {NAV_ITEMS.map((item) => {
                const active = isItemActive(item);
                return (
                  <div key={item.label}>
                    {item.href ? (
                      <Link
                        href={item.href}
                        onClick={() => {
                          setMobileMenuOpen(false);
                          setExpandedMobileItem(null);
                        }}
                        className={`block rounded-lg px-3 py-2 text-sm font-medium transition ${
                          active
                            ? "bg-black dark:bg-white text-white dark:text-black"
                            : "text-black/70 dark:text-white/70 hover:bg-black/10 dark:hover:bg-white/10 hover:text-black dark:hover:text-white"
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
                        className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-black/70 dark:text-white/70 hover:bg-black/10 dark:hover:bg-white/10 hover:text-black dark:hover:text-white transition"
                        aria-expanded={expandedMobileItem === item.label}
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
                    {item.children && expandedMobileItem === item.label && (
                      <div className="ml-4 mt-1 space-y-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => {
                              setMobileMenuOpen(false);
                              setExpandedMobileItem(null);
                            }}
                            className="block rounded-lg px-3 py-2 text-sm text-black/60 dark:text-white/60 hover:bg-black/5 dark:hover:bg-white/5 hover:text-black dark:hover:text-white transition"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

              <div className="mt-4 flex flex-col gap-3 border-t border-black/10 dark:border-white/10 pt-4">
                {/* Theme toggle - ISOLATED IN MOBILE MENU */}
                <div className="flex items-center justify-between py-1">
                  <span className="text-sm font-medium text-black/70 dark:text-white/70">Theme</span>
                  <div ref={mobileThemeToggleRef} className="relative z-10">
                    <ThemeToggle />
                  </div>
                </div>

                <Chip className="self-start text-[12px]" variant="success">
                  Live this weekend
                </Chip>
                <Link
                  href="/tickets"
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-rh-pink-light to-rh-pink-dark px-4 py-2 text-sm font-semibold text-white shadow-rh-soft"
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

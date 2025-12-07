// src/app/blog/page.tsx

"use client";

import { useState } from "react";
import BlogHero from "@/components/sections/blog/BlogHero";
import BlogFilters from "@/components/sections/blog/BlogFilters";
import BlogList from "@/components/sections/blog/BlogList";
import NewsletterSignup from "@/components/ui/NewsletterSignup";
import Surface from "@/components/ui/Surface";

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [view, setView] = useState<"grid" | "stack">("grid");

  return (
    <div className="space-y-8 pb-12">
      <BlogHero />

      <section className="space-y-5 px-4 lg:px-6">
        <BlogFilters
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          view={view}
          onViewChange={setView}
        />

        <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.1fr)]">
          {/* Left: main list */}
          <BlogList selectedCategory={selectedCategory} view={view} />

          {/* Right: sidebar */}
          <div className="space-y-4">
            <Surface className="p-4">
              <h3 className="text-sm font-semibold text-white">
                Stay ahead of the drop
              </h3>
              <p className="mt-1 text-xs text-white/70">
                Get first word on warehouse nights, ticket drops, and new
                photo galleries.
              </p>
              <div className="mt-3">
                <NewsletterSignup />
              </div>
            </Surface>

            <Surface className="p-4">
              <p className="text-xs text-white/60">Tags coming soon</p>
              <p className="mt-1 text-xs text-white/70">
                We&apos;ll surface posts by genre, venue type, and vibe
                (warehouse, rooftop, afterhours, etc.).
              </p>
            </Surface>

            {/* Color Test Block - Development Only */}
            {process.env.NODE_ENV === 'development' && (
              <Surface className="p-4">
                <h3 className="text-sm font-semibold text-white mb-3">
                  🎨 Color Test
                </h3>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <div className="w-4 h-4 rounded-full bg-rh-pink-light"></div>
                    <div className="w-4 h-4 rounded-full bg-rh-pink-dark"></div>
                    <div className="w-4 h-4 rounded-full bg-rh-purple"></div>
                    <div className="w-4 h-4 rounded-full bg-rh-cyan"></div>
                    <div className="w-4 h-4 rounded-full bg-rh-orange"></div>
                    <div className="w-4 h-4 rounded-full bg-rh-green"></div>
                  </div>
                  <div className="text-xs text-white/70">
                    Pink, Purple, Cyan, Orange, Green swatches
                  </div>
                  <div className="grid grid-cols-2 gap-1 text-[10px]">
                    <div className="bg-rh-pink-light/20 border border-rh-pink-light/40 rounded px-2 py-1 text-center text-white">
                      Pink Chip
                    </div>
                    <div className="bg-rh-cyan/20 border border-rh-cyan/40 rounded px-2 py-1 text-center text-white">
                      Cyan Chip
                    </div>
                    <div className="bg-rh-orange/20 border border-rh-orange/40 rounded px-2 py-1 text-center text-white">
                      Orange Chip
                    </div>
                    <div className="bg-rh-purple/20 border border-rh-purple/40 rounded px-2 py-1 text-center text-white">
                      Purple Chip
                    </div>
                  </div>
                </div>
              </Surface>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
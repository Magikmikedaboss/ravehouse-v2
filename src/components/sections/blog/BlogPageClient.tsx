// src/components/sections/blog/BlogPageClient.tsx

"use client";

import { useState } from "react";
import BlogFilters from "@/components/sections/blog/BlogFilters";
import BlogList from "@/components/sections/blog/BlogList";
import NewsletterSignup from "@/components/ui/NewsletterSignup";
import Surface from "@/components/ui/Surface";

interface BlogPageClientProps {
  initialCategory?: string;
}

export default function BlogPageClient({ initialCategory = "All" }: BlogPageClientProps) {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [view, setView] = useState<"grid" | "stack">("grid");

  return (
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
        </div>
      </div>
    </section>
  );
}
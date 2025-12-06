// src/components/sections/blog/BlogFilters.tsx

"use client";

import { useState } from "react";
import { BLOG_CATEGORIES } from "@/lib/blog";

interface BlogFiltersProps {
  selectedCategory?: string;
  onCategoryChange?: (category: string) => void;
  view?: "grid" | "stack";
  onViewChange?: (view: "grid" | "stack") => void;
}

export default function BlogFilters({ selectedCategory: externalSelected, onCategoryChange, view: externalView, onViewChange }: BlogFiltersProps) {
  const [internalActive, setInternalActive] = useState("All");
  const active = externalSelected ?? internalActive;
  const handleCategoryChange = (category: string) => {
    if (onCategoryChange) {
      onCategoryChange(category);
    } else {
      setInternalActive(category);
    }
  };

  const [internalView, setInternalView] = useState<"grid" | "stack">("grid");
  const currentView = externalView ?? internalView;
  const handleViewChange = (view: "grid" | "stack") => {
    if (onViewChange) {
      onViewChange(view);
    } else {
      setInternalView(view);
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      {/* Using 11px for secondary text/labels - may affect readability for some users but appropriate for compact filter buttons */}
      <div className="flex flex-wrap gap-2 text-[11px]">
        {BLOG_CATEGORIES.map((category) => (
          <button
            key={category}
            type="button"
            aria-pressed={active === category}
            aria-label={`Filter by ${category}`}
            onClick={() => handleCategoryChange(category)}
            className={`rounded-full border px-3 py-1 transition ${
              active === category
                ? "border-white bg-white text-black"
                : "border-white/15 bg-white/5 text-white/75 hover:bg-white/10"
            }`}
          >
            {category}
          </button>
        ))}      </div>

      {/* Secondary controls use smaller text for compact layout */}
      <div className="flex items-center gap-2 text-[11px] text-white/60">
        <button
          type="button"
          aria-pressed={currentView === "grid"}
          aria-label="Switch to grid view"
          onClick={() => handleViewChange("grid")}
          className={`rounded-full border px-3 py-1 transition ${
            currentView === "grid"
              ? "border-white bg-white text-black"
              : "border-white/15 bg-white/5 text-white/75 hover:bg-white/10"
          }`}
        >
          Grid
        </button>
        <button
          type="button"
          aria-pressed={currentView === "stack"}
          aria-label="Switch to stack view"
          onClick={() => handleViewChange("stack")}
          className={`rounded-full border px-3 py-1 transition ${
            currentView === "stack"
              ? "border-white bg-white text-black"
              : "border-white/15 bg-white/5 text-white/75 hover:bg-white/10"
          }`}
        >
          Stack
        </button>
      </div>
    </div>
  );
}
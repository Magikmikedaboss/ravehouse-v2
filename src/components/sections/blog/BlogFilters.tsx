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
      {/* Increase label size for readability/accessibility */}
      <div className="flex flex-wrap gap-2 text-sm">
        {BLOG_CATEGORIES.map((category) => (
          <button
            key={category}
            type="button"
            aria-pressed={active === category}
            aria-label={`Filter by ${category}`}
            onClick={() => handleCategoryChange(category)}
            className={`rounded-full border px-3 py-1.5 transition ${
              active === category
                ? "border-primary bg-surface text-primary"
                : "border-subtle bg-surface/10 text-secondary"
            }`}
          >
            {category}
          </button>
        ))}      </div>

      {/* Secondary controls: bump to text-xs minimum */}
      <div className="flex items-center gap-2 text-xs text-secondary/60">
        <button
          type="button"
          aria-pressed={currentView === "grid"}
          aria-label="Switch to grid view"
          onClick={() => handleViewChange("grid")}
          className={`rounded-full border px-3 py-1.5 transition ${
            currentView === "grid"
              ? "border-primary bg-surface text-primary"
              : "border-subtle bg-surface/10 text-secondary"
          }`}
        >
          Grid
        </button>
        <button
          type="button"
          aria-pressed={currentView === "stack"}
          aria-label="Switch to stack view"
          onClick={() => handleViewChange("stack")}
          className={`rounded-full border px-3 py-1.5 transition ${
            currentView === "stack"
              ? "border-primary bg-surface text-primary"
              : "border-subtle bg-surface/10 text-secondary"
          }`}
        >
          Stack
        </button>
      </div>
    </div>
  );
}
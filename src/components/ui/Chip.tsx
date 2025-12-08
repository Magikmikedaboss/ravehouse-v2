"use client";
import { ReactNode } from "react";
import clsx from "clsx";

type ChipVariant =
  | "default"
  | "pink"
  | "cyan"
  | "orange"
  | "purple"
  | "neutral"
  | "ghost"
  | "success"
  | "brand"
  | "dark"
  | "lightOverlay"
  | "badge"
  | "danger";

type ChipProps = {
  children: ReactNode;
  variant?: ChipVariant;
  className?: string;
};

const base =
  "inline-flex items-center rounded-full px-3 py-1 text-xxs font-medium border transition";

const variantArbitrary: Record<ChipVariant, string> = {
  // Uses arbitrary values with your CSS vars – no dependency on named color utilities
  pink: "bg-[rgb(var(--rh-pink-light)/0.20)] border-[rgb(var(--rh-pink-light)/0.40)] text-white",
  cyan: "bg-[rgb(var(--rh-cyan)/0.20)] border-[rgb(var(--rh-cyan)/0.40)] text-white",
  orange: "bg-[rgb(var(--rh-orange)/0.20)] border-[rgb(var(--rh-orange)/0.40)] text-white",
  purple: "bg-[rgb(var(--rh-purple)/0.20)] border-[rgb(var(--rh-purple)/0.40)] text-white",
  success: "bg-[rgb(var(--rh-green)/0.20)] border-[rgb(var(--rh-green)/0.40)] text-white",
  brand:
    "bg-[rgb(var(--rh-pink-dark)/0.20)] border-[rgb(var(--rh-pink-dark)/0.40)] text-white",
  neutral: "bg-white/10 border-white/20 text-white/90",
  ghost: "bg-white/5 border-white/10 text-white/80 hover:bg-white/10",
  dark: "bg-black/40 border-white/10 text-white",
  lightOverlay: "bg-white/15 border-white/25 text-white",
  badge: "bg-white/90 border-transparent text-black",
  danger: "bg-red-500/15 border-red-500/35 text-red-200",
  default: "bg-white/10 border-white/20 text-white",
};

export default function Chip({
  children,
  variant = "default",
  className = "",
}: ChipProps) {
  return (
    <span className={clsx(base, variantArbitrary[variant], className)}>
      {children}
    </span>
  );
}

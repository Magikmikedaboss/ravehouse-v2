"use client";
import { ReactNode } from "react";
import clsx from "clsx";

type ChipSize = "sm" | "md";
type ChipVariant =
  | "default"
  | "neutral"
  | "pink"
  | "cyan"
  | "orange"
  | "purple"
  | "green"
  | "lightOverlay"
  | "badge"
  | "success"
  | "brand"
  | "dark"
  | "danger";

type ChipProps = {
  children: ReactNode;
  variant?: ChipVariant;
  size?: ChipSize;          // ← new
  className?: string;
};

const sizeClasses: Record<ChipSize, string> = {
  sm: "px-2.5 py-1 text-xxs",
  md: "px-3.5 py-1.5 text-xs",
};

const base = "inline-flex items-center rounded-full border font-medium transition";

const variantArbitrary: Record<ChipVariant, string> = {
  default:      "bg-white/10 border-white/20 text-white",
  neutral:      "bg-white/10 border-white/20 text-white/85",
  pink:         "bg-[rgb(var(--rh-pink-light)/0.20)]   border-[rgb(var(--rh-pink-light)/0.40)]   text-white",
  cyan:         "bg-[rgb(var(--rh-cyan)/0.20)]         border-[rgb(var(--rh-cyan)/0.40)]         text-white",
  orange:       "bg-[rgb(var(--rh-orange)/0.20)]       border-[rgb(var(--rh-orange)/0.40)]       text-white",
  purple:       "bg-[rgb(var(--rh-purple)/0.20)]       border-[rgb(var(--rh-purple)/0.40)]       text-white",
  green:        "bg-[rgb(var(--rh-green)/0.20)]        border-[rgb(var(--rh-green)/0.40)]        text-white",
  lightOverlay: "bg-white/15 border-white/25 text-white",
  badge:        "bg-white/90 border-transparent text-black",
  success:      "bg-[rgb(var(--rh-green)/0.20)] border-[rgb(var(--rh-green)/0.40)] text-white",
  brand:        "bg-[rgb(var(--rh-pink-dark)/0.20)] border-[rgb(var(--rh-pink-dark)/0.40)] text-white",
  dark:         "bg-black/40 border-white/10 text-white",
  danger:       "bg-red-500/15 border-red-500/35 text-red-200",
};

export default function Chip({
  children,
  variant = "default",
  size = "sm",              // ← default size
  className = "",
}: ChipProps) {
  return (
    <span className={clsx(base, sizeClasses[size], variantArbitrary[variant], className)}>
      {children}
    </span>
  );
}

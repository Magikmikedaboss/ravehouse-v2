"use client";
import { ReactNode } from "react";
import clsx from "clsx";

type ChipSize = "xs" | "sm" | "md";
type ChipVariant =
  | "default" | "neutral" | "pink" | "cyan" | "orange" | "purple" | "green"
  | "lightOverlay" | "badge" | "brand" | "success" | "dark" | "danger";

type ChipProps = {
  children: ReactNode;
  variant?: ChipVariant;
  size?: ChipSize;
  className?: string;
};

const sizeClasses: Record<ChipSize, string> = {
  xs: "px-2   py-0.5 text-xxs", // 11px
  sm: "px-3   py-1   text-xs",  // 12px
  md: "px-3.5 py-1.5 text-sm",  // 14px
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

// (Optional) prevent local size utilities from overriding chip sizing
function stripSizeTokens(extra?: string) {
  if (!extra) return "";
  return extra.replace(/\b(?:p(?:x|y)?|text|leading)-[^\s]+/g, "").trim();
}

export default function Chip({
  children,
  variant = "default",
  size = "sm",
  className = "",
}: ChipProps) {
  const safeExtras = stripSizeTokens(className);
  return (
    <span className={clsx(base, variantArbitrary[variant], safeExtras, sizeClasses[size])}>
      {children}
    </span>
  );
}

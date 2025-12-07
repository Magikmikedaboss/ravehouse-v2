import { ReactNode } from "react";

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
  | "badge";

type ChipProps = {
  children: ReactNode;
  variant?: ChipVariant;
  className?: string;
};

const variantClasses: Record<ChipVariant, string> = {
  default: "bg-white/10 border-white/10 text-white/90",
  pink: "bg-rh-pink-light/20 border-rh-pink-light/40 text-white",
  cyan: "bg-rh-cyan/20 border-rh-cyan/40 text-white",
  orange: "bg-rh-orange/20 border-rh-orange/40 text-white",
  purple: "bg-rh-purple/20 border-rh-purple/40 text-white",
  neutral: "bg-white/10 border-transparent text-white/80",
  ghost: "bg-black/60 border-white/20 text-white",
  success: "bg-rh-green/15 border-rh-green/30 text-rh-green",
  brand: "bg-gradient-to-r from-rh-pink-light/20 to-rh-cyan/20 border-rh-pink-light/30 text-white",
  dark: "bg-black/40 border-white/20 text-white",
  lightOverlay: "bg-white/80 border-black/20 text-black",
  badge: "bg-rh-pink-light text-black border-none text-[10px]",
};

export default function Chip({
  children,
  variant = "default",
  className = ""
}: ChipProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
}

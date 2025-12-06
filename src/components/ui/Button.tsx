// src/components/ui/Button.tsx
"use client";
import { ButtonHTMLAttributes, ReactNode, useState } from "react";
import Link from "next/link";

type Variant = "primary" | "secondary" | "ghost";

type ButtonBaseProps = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
};

type ButtonProps = ButtonBaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    asChild?: false;
  };

const baseClasses =
  "inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rh-cyan/70";

function variantClasses(variant: Variant = "primary") {
  if (variant === "secondary") {
    return "border border-black/20 bg-black/5 text-black/90 hover:bg-black/10";
  }
  if (variant === "ghost") {
    return "bg-transparent text-black/80 hover:bg-black/10";
  }
  return "";
}

export function Button({ children, variant = "primary", className = "", ...props }: ButtonProps) {
  const isPrimary = variant === "primary";
  const [isHovered, setIsHovered] = useState(false);

  const primaryStyles = isPrimary ? {
    background: "linear-gradient(135deg, rgb(var(--rh-pink-light)), rgb(var(--rh-pink-dark)))",
    color: "#fff",
    boxShadow: isHovered 
      ? "0 0 22px rgba(246, 104, 121, 0.7), 0 14px 36px rgba(0, 0, 0, 0.85)"
      : "0 0 18px rgba(246, 104, 121, 0.45), 0 12px 30px rgba(0, 0, 0, 0.7)",
    transform: isHovered ? "translateY(-1px)" : "none",
  } : {};

  return (
    <button
      {...props}
      className={`${baseClasses} ${variantClasses(variant)} ${className}`}
      style={{
        ...primaryStyles,
        ...props.style,
      }}
      onMouseEnter={(e) => {
        if (isPrimary) setIsHovered(true);
        props.onMouseEnter?.(e);
      }}
      onMouseLeave={(e) => {
        if (isPrimary) setIsHovered(false);
        props.onMouseLeave?.(e);
      }}
    >
      {children}
    </button>
  );
}

// Simple link-shaped-as-button helper
type ButtonLinkProps = ButtonBaseProps & {
  href: string;
};

export function ButtonLink({
  children,
  variant = "primary",
  className = "",
  href,
}: ButtonLinkProps) {
  const isPrimary = variant === "primary";
  const primaryStyles = isPrimary ? {
    background: "linear-gradient(135deg, rgb(var(--rh-pink-light)), rgb(var(--rh-pink-dark)))",
    color: "#fff",
    boxShadow: "0 0 18px rgba(246, 104, 121, 0.45), 0 12px 30px rgba(0, 0, 0, 0.7)",
  } : {};

  return (
    <Link
      href={href}
      className={`${baseClasses} ${variantClasses(variant)} ${className}`}
      style={primaryStyles}
    >
      {children}
    </Link>
  );
}

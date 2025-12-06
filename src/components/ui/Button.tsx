// src/components/ui/Button.tsx
"use client";
import { ButtonHTMLAttributes, ReactNode } from "react";
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
    return "btn-ghost";
  }
  if (variant === "primary") {
    return "btn-primary";
  }
  return "";
}

export function Button({ children, variant = "primary", className = "", ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={`btn ${baseClasses} ${variantClasses(variant)} ${className}`}
      style={props.style}
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
  return (
    <Link
      href={href}
      className={`btn ${baseClasses} ${variantClasses(variant)} ${className}`}
    >
      {children}
    </Link>
  );
}

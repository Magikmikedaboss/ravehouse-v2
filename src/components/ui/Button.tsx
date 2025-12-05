// src/components/ui/Button.tsx
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
    return "border border-white/20 bg-white/5 text-white/90 hover:bg-white/10";
  }
  if (variant === "ghost") {
    return "bg-transparent text-white/80 hover:bg-white/10";
  }
  return "bg-gradient-to-r from-rh-pink-light to-rh-pink-dark text-white shadow-rh-soft hover:brightness-110";
}

export function Button({ children, variant = "primary", className = "", ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={`${baseClasses} ${variantClasses(variant)} ${className}`}
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
      className={`${baseClasses} ${variantClasses(variant)} ${className}`}
    >
      {children}
    </Link>
  );
}

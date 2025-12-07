// src/components/ui/Button.tsx
"use client";
import { ButtonHTMLAttributes, ReactNode, useState } from "react";
import Link from "next/link";

type Variant = "primary" | "secondary" | "ghost";

type ButtonBaseProps = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  loading?: boolean;
};

type ButtonProps = ButtonBaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    asChild?: false;
  };

const baseClasses =
  "inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rh-cyan/70";

function variantClasses(variant: Variant = "primary") {
  if (variant === "secondary") {
    return "border border-white/20 bg-white/10 text-white hover:bg-white/15";
  }
  if (variant === "ghost") {
    return "btn-ghost";
  }
  if (variant === "primary") {
    return ""; // Primary styles now handled with inline styles
  }
  return "";
}

// Simple spinner component
function Spinner({ className = "", ariaLabel = "Loading" }: { className?: string; ariaLabel?: string }) {
  return (
    <svg
      className={`animate-spin ${className}`}
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      role="status"
      aria-label={ariaLabel}
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

export function Button({ 
  children, 
  variant = "primary", 
  className = "", 
  loading = false,
  disabled,
  ...props 
}: ButtonProps) {
  const isDisabled = disabled || loading;
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
      disabled={isDisabled}
      className={`${baseClasses} ${variantClasses(variant)} ${
        loading ? 'opacity-70 cursor-wait' : ''
      } ${isDisabled && !loading ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
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
      {loading && <Spinner className="mr-2 h-4 w-4" />}
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
  loading = false,
  href,
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={`btn ${baseClasses} ${variantClasses(variant)} ${
        loading ? 'opacity-70 cursor-wait' : ''
      } ${className}`}
    >
      {loading && <Spinner className="mr-2 h-4 w-4" />}
      {children}
    </Link>
  );
}

// src/components/ui/Button.tsx
"use client";
import { ButtonHTMLAttributes, ReactNode } from "react";
import type { MouseEvent, KeyboardEvent } from "react";
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
    return "border border-subtle bg-surface/10 text-primary hover:bg-surface/15";
  }
  if (variant === "ghost") {
    return "btn-ghost";
  }
  if (variant === "primary") {
    return "bg-gradient-to-br from-[rgb(var(--rh-pink-light))] to-[rgb(var(--rh-pink-dark))] text-primary shadow-rh-glow hover:shadow-[0_0_22px_rgba(246,104,121,0.7),0_14px_36px_rgba(0,0,0,0.85)] hover:-translate-y-1";
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
  type = "button",
  ...props 
}: ButtonProps) {
  const isDisabled = disabled || loading;
  return (
    <button
      {...props}
      type={type}
      disabled={isDisabled}
      className={`${baseClasses} ${variantClasses(variant)} ${
        loading ? 'opacity-70 cursor-wait' : ''
      } ${isDisabled && !loading ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
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
  const handleClick = (e: MouseEvent) => {
    if (loading) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (loading && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      e.stopPropagation();
    }
  };
  return (
    <Link
      href={href}
      aria-disabled={loading}
      tabIndex={loading ? -1 : 0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={`btn ${baseClasses} ${variantClasses(variant)} ${
        loading ? 'opacity-70 cursor-wait pointer-events-none' : ''
      } ${className}`}
    >
      {loading && <Spinner className="mr-2 h-4 w-4" />}
      {children}
    </Link>
   );}
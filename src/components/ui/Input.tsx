// src/components/ui/Input.tsx
import { InputHTMLAttributes, useId } from "react";

type InputProps = {
  label?: string;
  error?: string;
  id?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export function Input({ label, error, className = "", id, ...props }: InputProps) {
  const generatedId = useId();
  const inputId = id || generatedId;

  return (
    <div className="space-y-1">
      {label && (
        <label htmlFor={inputId} className="block text-xs font-medium text-[rgb(var(--rh-text-primary))]/80">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`w-full rounded-lg border px-3 py-2 text-sm outline-none transition
          ${error
            ? 'border-red-500 bg-red-500/10 text-[rgb(var(--rh-text-primary))] focus:border-red-400 focus:ring-2 focus:ring-red-400/20'
            : 'border-[rgb(var(--rh-border))]/10 bg-[rgb(var(--rh-bg-surface))]/5 text-[rgb(var(--rh-text-primary))] placeholder:text-[rgb(var(--rh-text-secondary))] focus:border-rh-cyan/50 focus:ring-2 focus:ring-rh-cyan/20'
          }
          disabled:opacity-50 disabled:cursor-not-allowed
          ${className}`}
        {...props}
      />
      {error && (
        <p className="text-xs text-red-400">{error}</p>
      )}
    </div>
  );
}
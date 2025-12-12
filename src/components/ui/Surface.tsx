import { ReactNode, HTMLAttributes } from "react";

type SurfaceProps = {
  children: ReactNode;
  className?: string;
} & HTMLAttributes<HTMLDivElement>;

export default function Surface({ children, className = "", ...props }: SurfaceProps) {
  return (
    <div
      className={`rounded-[var(--rh-radius-lg)] bg-[rgb(var(--rh-bg-card))] border border-[rgb(var(--rh-border-subtle))]/20 shadow-rh-soft backdrop-blur ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

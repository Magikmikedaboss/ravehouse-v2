import { ReactNode, HTMLAttributes } from "react";

type SurfaceProps = {
  children: ReactNode;
  className?: string;
} & HTMLAttributes<HTMLDivElement>;

export default function Surface({ children, className = "", ...props }: SurfaceProps) {
  return (
    <div
      className={`rounded-3xl bg-bg-soft/80 border border-white/5 shadow-card backdrop-blur ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

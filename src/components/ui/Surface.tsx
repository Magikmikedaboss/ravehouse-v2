import { ReactNode } from "react";

type SurfaceProps = {
  children: ReactNode;
  className?: string;
};

export default function Surface({ children, className = "" }: SurfaceProps) {
  return (
    <div
      className={`rounded-3xl bg-background/80 border border-white/5 shadow-card backdrop-blur ${className}`}
    >
      {children}
    </div>
  );
}

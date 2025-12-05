import { ReactNode, HTMLAttributes } from "react";

type SurfaceProps = {
  children: ReactNode;
  className?: string;
} & HTMLAttributes<HTMLDivElement>;

export default function Surface({ children, className = "", ...props }: SurfaceProps) {
  return (
    <div
      className={`rounded-rh-lg bg-bg-card/90 border border-white/5 shadow-rh-soft backdrop-blur ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

import { ReactNode, HTMLAttributes } from "react";

type SurfaceProps = {
  children: ReactNode;
  className?: string;
} & HTMLAttributes<HTMLDivElement>;

export default function Surface({ children, className = "", ...props }: SurfaceProps) {
  return (
    <div
      className={`rounded-rh-lg bg-white/90 border border-black/10 shadow-rh-soft backdrop-blur ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

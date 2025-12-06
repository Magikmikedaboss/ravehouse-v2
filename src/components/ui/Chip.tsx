import { ReactNode } from "react";

type ChipProps = {
  children: ReactNode;
  className?: string;
};

export default function Chip({ children, className = "" }: ChipProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${className}`}
    >
      {children}
    </span>
  );
}

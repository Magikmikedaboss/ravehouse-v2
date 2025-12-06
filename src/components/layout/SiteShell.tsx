// src/components/layout/SiteShell.tsx
import { ReactNode } from "react";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";

type Props = {
  children: ReactNode;
};

export default function SiteShell({ children }: Props) {
  return (
    <div className="min-h-screen bg-white text-black">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 pb-16 pt-6 md:px-6 lg:px-8">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}

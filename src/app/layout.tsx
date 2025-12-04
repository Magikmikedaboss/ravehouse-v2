// src/app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";
import SiteShell from "@/components/layout/SiteShell";

export const metadata: Metadata = {
  title: "Ravehouse Entertainment",
  description: "Underground warehouse raves and bass nights in Las Vegas.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}

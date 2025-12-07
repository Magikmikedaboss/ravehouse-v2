// src/app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";
import SiteShell from "@/components/layout/SiteShell";
import { ThemeProvider } from "@/contexts/ThemeContext";

export const metadata: Metadata = {
  title: "Ravehouse Entertainment",
  description: "Underground warehouse raves and bass nights in Las Vegas.",
  metadataBase: new URL("https://ravehouse.com"),
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider>
          <SiteShell>{children}</SiteShell>
        </ThemeProvider>
      </body>
    </html>
  );
}

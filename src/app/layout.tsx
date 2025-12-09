// src/app/layout.tsx
import "./globals.css";
import type { Metadata, Viewport } from "next";
import { ReactNode } from "react";
import SiteShell from "@/components/layout/SiteShell";
import { ThemeProvider } from "@/contexts/ThemeContext";

export const metadata: Metadata = {
  title: {
    default: "Ravehouse Entertainment",
    template: "%s | Ravehouse Entertainment"
  },
  description: "Underground warehouse raves and bass nights in Las Vegas.",
  metadataBase: new URL("https://ravehouse.com"),
  keywords: ["rave", "warehouse party", "Las Vegas", "electronic music", "bass night", "underground rave"],
  authors: [{ name: "Ravehouse Entertainment" }],
  creator: "Ravehouse Entertainment",
  publisher: "Ravehouse Entertainment",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ravehouse.com",
    title: "Ravehouse Entertainment",
    description: "Underground warehouse raves and bass nights in Las Vegas.",
    siteName: "Ravehouse Entertainment",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ravehouse Entertainment",
    description: "Underground warehouse raves and bass nights in Las Vegas.",
    creator: "@ravehouse",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
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

// src/app/blog/page.tsx

import { Metadata } from "next";
import BlogHero from "@/components/sections/blog/BlogHero";
import BlogPageClient from "@/components/sections/blog/BlogPageClient";

export const metadata: Metadata = {
  title: "Blog | Ravehouse Entertainment",
  description: "Underground rave culture, warehouse guides, gear reviews, and the latest from Las Vegas's nocturnal scene. Stay ahead of the drop with exclusive insights.",
  keywords: [
    "underground raves",
    "warehouse parties",
    "rave culture",
    "las vegas nightlife",
    "techno",
    "house music",
    "rave gear",
    "warehouse guides"
  ],
  openGraph: {
    title: "Blog | Ravehouse Entertainment",
    description: "Underground rave culture, warehouse guides, and the latest from Las Vegas's nocturnal scene.",
    type: "website",
  },
};

interface BlogPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  // In Next.js 15, searchParams is a Promise
  const params = await searchParams;
  
  // Safely normalize query parameters (handle string[] case)
  const normalizeParam = (value: string | string[] | undefined): string | undefined => {
    if (Array.isArray(value)) {
      return value[0]; // Take first value if array
    }
    return value;
  };
  
  // Prefer category over tag, then fallback to "All"
  const category = normalizeParam(params.category);
  const tag = normalizeParam(params.tag);
  const initialCategory = category || tag || "All";
  
  return (
    <div className="space-y-8 pb-12">
      <BlogHero />
      <BlogPageClient initialCategory={initialCategory} />
    </div>
  );
}
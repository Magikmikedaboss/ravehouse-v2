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
  
  // Handle both ?category and ?tag for flexibility
  const initialCategory = params.category || params.tag || "All";
  
  return (
    <div className="space-y-8 pb-12">
      <BlogHero />
      <BlogPageClient initialCategory={initialCategory as string} />
    </div>
  );
}
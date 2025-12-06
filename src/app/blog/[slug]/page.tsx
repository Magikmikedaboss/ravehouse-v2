// src/app/blog/[slug]/page.tsx

import { getPostBySlug, getRecentPosts } from "@/lib/blog";
import BlogPostBody from "@/components/sections/blog/BlogPostBody";
import Surface from "@/components/ui/Surface";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  // Import BLOG_POSTS to get all available slugs for static generation
  const { BLOG_POSTS } = await import("@/lib/blog");
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolved = await params;
  const post = getPostBySlug(resolved.slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [
        {
          url: post.heroImage || "/images/placeholder.jpg",
          alt: post.title,
        },
      ],    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const resolved = await params;
  const post = getPostBySlug(resolved.slug);

  if (!post) {
    notFound();
  }

  const recent = getRecentPosts(5).filter((p) => p.slug !== post.slug).slice(0, 4);
  return (
    <div className="pb-16">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 pt-8 lg:grid-cols-[minmax(0,2.1fr)_minmax(0,0.9fr)] lg:px-6">
        <BlogPostBody post={post} />

        <aside className="space-y-4">
          <Surface className="p-4">
            <p className="text-xs text-white/60">More from The Circuit</p>
            <ul className="mt-2 space-y-2 text-sm text-white/80">
              {recent.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/blog/${r.slug}`}
                    className="hover:underline text-white/85"
                  >
                    {r.title}
                  </Link>
                  <p className="text-[11px] text-white/50">
                    {r.category} · {r.readTime}
                  </p>
                </li>
              ))}
            </ul>
          </Surface>

          <Surface className="p-4">
            <p className="text-xs text-white/60">Back to all posts</p>
            <Link
              href="/blog"
              className="mt-2 inline-flex text-sm text-white underline"
            >
              View The Circuit
            </Link>
          </Surface>
        </aside>
      </div>
    </div>
  );
}
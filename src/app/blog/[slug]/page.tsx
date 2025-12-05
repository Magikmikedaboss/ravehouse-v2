// src/app/blog/[slug]/page.tsx

import { getPostBySlug, getRecentPosts } from "@/lib/blog";
import BlogPostBody from "@/components/sections/blog/BlogPostBody";
import Surface from "@/components/ui/Surface";
import Link from "next/link";

type Props = {
  params: { slug: string };
};

export default function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return (
      <div className="px-4 py-10 text-white">
        <h1 className="text-3xl font-semibold">Post not found</h1>
        <p className="mt-2 text-white/70">
          The article you&apos;re looking for doesn&apos;t exist or moved.
        </p>
        <Link href="/blog" className="mt-4 inline-block text-sm underline">
          Back to The Circuit
        </Link>
      </div>
    );
  }

  const recent = getRecentPosts(4).filter((p) => p.slug !== post.slug);

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
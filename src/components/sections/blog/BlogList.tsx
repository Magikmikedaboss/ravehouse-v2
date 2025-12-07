// src/components/sections/blog/BlogList.tsx

import Link from "next/link";
import { BLOG_POSTS } from "@/lib/blog";
import Surface from "@/components/ui/Surface";
import Chip from "@/components/ui/Chip";
import Image from "next/image";

interface BlogListProps {
  selectedCategory?: string;
  view?: "grid" | "stack";
}

export default function BlogList({ selectedCategory = "All", view = "grid" }: BlogListProps) {
  const filteredPosts = selectedCategory === "All"
    ? BLOG_POSTS
    : BLOG_POSTS.filter(post => post.category === selectedCategory);

  return (
    <div className="space-y-4">
      <div className={view === "grid" ? "grid gap-4 md:grid-cols-2" : "space-y-4"}>
        {filteredPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group"
          >
            <Surface className="flex h-full flex-col overflow-hidden">
              {/* Image */}
              <div className="relative h-40 w-full overflow-hidden">
                <Image
                  src={post.heroImage || "/images/placeholder.svg"}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute left-3 right-3 top-3 flex items-center justify-between text-xxs">
                  <Chip variant="pink">
                    {post.category}
                  </Chip>
                  <span className="text-white/70">{post.readTime}</span>
                </div>                <div className="absolute left-3 right-3 bottom-3 space-y-1">
                  <h2 className="text-sm font-semibold text-white">
                    {post.title}
                  </h2>
                  <p className="line-clamp-1 text-xxs text-white/70">
                    {post.excerpt}
                  </p>
                </div>
              </div>
              {/* Meta */}
              <div className="flex flex-1 flex-col justify-between p-4">
                <div className="space-y-2">
                  <p className="text-xxs text-white/50">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                  <p className="text-xs text-white/70 line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
                <div className="mt-3 flex items-center justify-between text-xxs text-white/60">
                  <div className="flex flex-wrap gap-1">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-white/10 px-2 py-0.5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="text-white/70 group-hover:text-white">
                    Read story →
                  </span>
                </div>
              </div>
            </Surface>
          </Link>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center text-white/50 py-10">
          <p>No posts found in this category yet.</p>
        </div>
      )}
    </div>  );
}
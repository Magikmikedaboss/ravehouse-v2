import type { BlogPost } from "@/lib/blog";
import Surface from "@/components/ui/Surface";
import Chip from "@/components/ui/Chip";
import Image from "next/image";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSanitize from 'rehype-sanitize';

type Props = {
  post: BlogPost;
};

export default function BlogPostBody({ post }: Props) {
  return (
    <article className="space-y-4">
      <Surface className="overflow-hidden">
        <div className="relative h-56 w-full sm:h-72">
          <Image
            src={post.heroImage || "/images/placeholder.jpg"}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
          <div className="absolute left-4 right-4 bottom-4 space-y-2">
            <div className="flex flex-wrap items-center gap-2 text-[11px] text-white/75">
              <Chip className="bg-black/70 border-white/20">
                {post.category}
              </Chip>
              <span className="text-white/70">
                {new Date(post.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
              <span>· {post.readTime}</span>
            </div>
            <h1 className="text-2xl font-semibold sm:text-3xl">
              {post.title}
            </h1>
          </div>
        </div>
      </Surface>

      <Surface className="p-5 space-y-4">
        <div className="flex flex-wrap gap-2 text-[11px] text-white/70">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-white/5 px-2 py-0.5"
            >
              #{tag}
            </span>
          ))}
        </div>

        <div className="space-y-4 text-sm leading-relaxed text-white/80 prose prose-invert max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeSanitize]}
          >
            {post.content}
          </ReactMarkdown>
        </div>
      </Surface>
    </article>
  );
}
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute left-4 right-4 bottom-4 space-y-2">
            <div className="flex flex-wrap items-center gap-2 text-[11px] text-white/75">
              <Chip className="bg-black/60 border-white/20 text-white">
                {post.category}
              </Chip>
              <div className="rounded bg-white/20 px-2 py-1">
                <span className="text-black">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                <span className="text-black"> · {post.readTime}</span>
              </div>
            </div>
            <h1 className="text-2xl font-semibold sm:text-3xl text-white">
              {post.title}
            </h1>
          </div>
        </div>
      </Surface>

      <Surface className="p-5 space-y-4">
        <div className="flex flex-wrap gap-2 text-[11px]">
          {post.tags.map((tag, index) => {
            // Use dark theme colors for dark backgrounds
            const tagClass = "bg-black/40 border-white/20 text-white";

            return (
              <Chip key={tag} className={tagClass}>
                #{tag}
              </Chip>
            );
          })}
        </div>

        <div className="space-y-4 text-sm leading-relaxed text-white/80 prose prose-invert max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeSanitize]}
            components={{
              h1: ({ children }) => (
                <h1 className="text-xl font-semibold text-rh-pink-light mb-4 mt-6 first:mt-0">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-lg font-semibold text-rh-cyan-light mb-3 mt-5">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-base font-semibold text-rh-orange-light mb-2 mt-4">
                  {children}
                </h3>
              ),
              p: ({ children }) => (
                <p className="text-white/80 leading-relaxed mb-4">
                  {children}
                </p>
              ),
              a: ({ href, children }) => (
                <a
                  href={href}
                  className="text-rh-pink-light hover:text-rh-pink-dark underline decoration-rh-pink-light/50 hover:decoration-rh-pink-dark/50 transition"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {children}
                </a>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-rh-cyan-light pl-4 italic text-white/70 my-4">
                  {children}
                </blockquote>
              ),
              code: ({ children }) => (
                <code className="bg-black/30 px-1.5 py-0.5 rounded text-rh-orange-light font-mono text-sm">
                  {children}
                </code>
              ),
              pre: ({ children }) => (
                <pre className="bg-black/50 p-4 rounded-lg overflow-x-auto my-4 text-rh-orange-light font-mono text-sm">
                  {children}
                </pre>
              ),
              ul: ({ children }) => (
                <ul className="list-disc list-inside space-y-1 mb-4 text-white/80">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal list-inside space-y-1 mb-4 text-white/80">
                  {children}
                </ol>
              ),
              li: ({ children }) => (
                <li className="text-white/80">
                  {children}
                </li>
              ),
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>
      </Surface>
    </article>
  );
}
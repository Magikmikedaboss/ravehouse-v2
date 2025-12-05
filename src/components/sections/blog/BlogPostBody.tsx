// src/components/sections/blog/BlogPostBody.tsx
// Phase 1: Single blog post layout

interface BlogPostBodyProps {
  content: string;
  title: string;
}

export default function BlogPostBody({ content, title }: BlogPostBodyProps) {
  return (
    <article className="max-w-4xl mx-auto prose prose-invert">
      <h1>{title}</h1>

      {/* TODO: Render markdown content */}
      <div className="text-center text-white/50 py-10">
        <p>🚧 Blog post content rendering coming in Phase 1 implementation</p>
      </div>
    </article>
  );
}
// src/app/blog/[slug]/not-found.tsx

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="px-4 py-10 text-[rgb(var(--rh-text-primary))]">
      <h1 className="text-3xl font-semibold">Post not found</h1>
      <p className="mt-2 text-[rgb(var(--rh-text-secondary))]">
        The article you&apos;re looking for doesn&apos;t exist or has moved.
      </p>
      <Link href="/blog" className="mt-4 inline-block text-sm underline hover:opacity-90">
        Back to The Circuit
      </Link>
    </div>  );
}
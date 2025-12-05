// src/lib/blog.ts

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO string
  category: string;
  readTime: string; // e.g. "6 min read"
  heroImage: string;
  tags: string[];
  content: string; // simple markdown-ish / paragraphs separated by \n\n
};

export const BLOG_CATEGORIES = [
  "All",
  "Recaps",
  "Guides",
  "Gear",
  "Industry",
  "Behind the Scenes",
];

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "warehouse-eclipse-recap",
    title: "Warehouse Eclipse: 3AM Lasers & Concrete Echoes",
    excerpt:
      "Four hundred heads, one warehouse, and a closing set that felt like sunrise in slow motion.",
    date: "2025-01-22",
    category: "Recaps",
    readTime: "7 min read",
    heroImage: "/images/blog/warehouse-eclipse.jpg",
    tags: ["Warehouse", "Techno", "Las Vegas"],
    content: [
      "Last Friday's Warehouse Eclipse was everything we love about underground shows: no VIP ropes, no bottle parades, just a wall of sound and people losing it in every direction.",
      "Doors opened just after 11PM, but the room didn't truly catch fire until well after 1AM. By the time the headliner took over, the fog had thinned just enough to see silhouettes cutting through laser tunnels.",
      "We're still going through the full photo and video dump, but this recap hits the highlights: the system, the crowd, the booth, and the little details that made the night feel like a movie.",
    ].join("\n\n"),
  },
  {
    slug: "top-rave-gear-2025",
    title: "Top Rave Gear Essentials for 2025 (Vegas Underground Edition)",
    excerpt:
      "From hydration packs to subtle earplugs and LED add-ons, here's what survives a proper warehouse.",
    date: "2025-01-20",
    category: "Gear",
    readTime: "5 min read",
    heroImage: "/images/blog/rave-gear-2025.jpg",
    tags: ["Gear", "Tips", "New ravers"],
    content: [
      "Vegas underground shows aren't just about looking good—you also want to survive the night and remember it.",
      "We pulled together a simple loadout: hydration, protection, comfort, and a little bit of glow. Nothing you don't need, everything you actually use.",
      "Over time we'll keep this list updated with links to brands and pieces we've seen hold up under real-world punishment.",
    ].join("\n\n"),
  },
  {
    slug: "how-to-find-underground-raves-in-vegas",
    title: "How to Find Underground Raves in Las Vegas (Without Being Weird)",
    excerpt:
      "If your feed is all big-room clubs, but your heart wants concrete floors and unknown names, this one's for you.",
    date: "2025-01-15",
    category: "Guides",
    readTime: "8 min read",
    heroImage: "/images/blog/find-underground-vegas.jpg",
    tags: ["Guides", "Vegas", "Community"],
    content: [
      "Finding the real stuff in Vegas means looking beyond the Strip and leaning on people, not billboards.",
      "We're talking group chats, smaller collectives, niche record shops, and those friends who always seem to disappear at 11PM and resurface at 7AM with glitter in their hair.",
      "This guide lays out how to tap into the network respectfully and safely, without being that person.",
    ].join("\n\n"),
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getRecentPosts(limit = 4): BlogPost[] {
  return [...BLOG_POSTS]
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, limit);
}
// src/lib/blog.ts
// Phase 1: Blog post metadata & seed content

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  author: string;
  tags: string[];
  image?: string;
}

// Seed blog posts for Phase 1
export const blogPosts: BlogPost[] = [
  {
    slug: 'circuit-01',
    title: 'Welcome to The Circuit',
    excerpt: 'Introducing Ravehouse\'s editorial hub for underground stories and scene insights.',
    content: '# Welcome to The Circuit\n\nThis is the first post in our editorial series...',
    publishedAt: '2025-01-01',
    author: 'Ravehouse Team',
    tags: ['announcement', 'editorial'],
    image: '/images/blog/circuit-01.jpg'
  },
  {
    slug: 'warehouse-guide',
    title: 'The Ultimate Warehouse Guide',
    excerpt: 'Everything you need to know about finding and enjoying underground warehouse raves.',
    content: '# The Ultimate Warehouse Guide\n\nFinding the best warehouse experiences...',
    publishedAt: '2025-01-15',
    author: 'Nova',
    tags: ['guide', 'warehouse', 'tips'],
    image: '/images/blog/warehouse-guide.jpg'
  },
  {
    slug: 'gear-roundup',
    title: 'Essential Rave Gear 2025',
    excerpt: 'Curated recommendations for earplugs, lights, and everything you need for the scene.',
    content: '# Essential Rave Gear 2025\n\nThe must-have items for any serious raver...',
    publishedAt: '2025-02-01',
    author: 'Ravehouse Team',
    tags: ['gear', 'recommendations', 'affiliate'],
    image: '/images/blog/gear-roundup.jpg'
  }
];

export function getAllPosts(): BlogPost[] {
  return blogPosts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}
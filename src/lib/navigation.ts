// src/lib/navigation.ts
// Phase 1: Navigation config with submenu support

export type NavChild = {
  label: string;
  href: string;
};

export type NavItem = {
  label: string;
  href?: string;
  children?: NavChild[];
};

export const NAV_ITEMS: NavItem[] = [
  { label: "Events", href: "/events" },
  { label: "Gallery", href: "/gallery" },
  { label: "Tickets", href: "/tickets" },
  { label: "VIP", href: "/vip" },

  {
    label: "The Circuit",
    children: [
      { label: "Blog", href: "/blog" },
      { label: "Guides", href: "/blog?tag=guides" },
      { label: "Rave Gear", href: "/gear" },
      { label: "Membership", href: "/membership" },
    ],
  },

  { label: "Contact", href: "/contact" },
];

export const footerNavigation = {
  explore: [
    { label: 'Events', href: '/events' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Blog', href: '/blog' },
    { label: 'VIP', href: '/vip' }
  ],
  company: [
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Membership', href: '/membership' },
    { label: 'Gear', href: '/gear' }
  ],
  legal: [
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
    { label: 'Code of Conduct', href: '/conduct' }
  ]
};
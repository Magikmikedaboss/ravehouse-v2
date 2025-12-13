# Ravehouse Entertainment v2

A modern Next.js web application for Ravehouse Entertainment, featuring underground warehouse raves, bass nights, blog content, membership tiers, and gear recommendations in Las Vegas. Built with the latest web technologies for a sleek, responsive experience.

## 🚀 Technologies Used

- **Framework**: Next.js 15 (App Router)
- **Runtime**: React ^19.2.3
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4.1.17 with custom rave color palette
- **UI Components**: Radix UI (accessible navigation)
- **Content**: React Markdown with GitHub Flavored Markdown support
- **Build Tool**: Turbopack (via Next.js)
- **Deployment**: Ready for Vercel/Netlify
- **Theme System**: Custom light/dark mode with localStorage persistence

## ✨ Features

- **🏠 Homepage**: Hero section, "This is Ravehouse" section, upcoming events preview
- **📝 Blog**: Markdown-powered blog with static generation, categories, and SEO
- **📅 Events Page**: Full event listings with filtering, genre chips, venue information
- **🎨 Gallery**: Photo gallery with filters, sidebar, and interactive components
- **🎫 Tickets**: Digital ticket management with QR codes and venue information
- **👑 VIP**: Membership tiers, perks, and booking interface
- **💎 Membership**: Comprehensive membership page with tiers and FAQ
- **🎸 Gear**: Rave gear recommendations with affiliate links and reviews
- **ℹ️ About**: Team profiles, venue information, booking contacts
- **🎨 Custom UI**: Chips with rave-themed colors, surface containers, glow effects
- **📱 Responsive**: Mobile-first design optimized for all devices
- **🌓 Theme System**: Light/dark mode toggle with localStorage persistence
- **🔒 Security**: Proper sanitization, secure external links, TypeScript safety

## 📁 Project Structure

```bash
ravehouse-v2/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── globals.css         # Global styles & Tailwind v4.1.17 theme
│   │   ├── layout.tsx          # Root layout with metadata & navigation
│   │   ├── page.tsx            # Homepage composition
│   │   ├── about/              # About page (fully implemented)
│   │   │   └── page.tsx        # Team, venues, booking info
│   │   ├── blog/               # Blog system (fully implemented)
│   │   │   ├── page.tsx        # Blog listing with recent posts
│   │   │   └── [slug]/         # Dynamic blog post pages
│   │   │       └── page.tsx    # Individual blog posts with SEO
│   │   ├── contact/            # Contact page (fully implemented)
│   │   │   └── page.tsx        # Contact methods, locations, response times
│   │   ├── events/             # Events page (fully implemented)
│   │   │   └── page.tsx        # Event listings with filters
│   │   ├── gallery/            # Gallery page (fully implemented)
│   │   │   └── page.tsx        # Photo gallery with components
│   │   ├── gear/               # Gear recommendations (fully implemented)
│   │   │   └── page.tsx        # Rave gear reviews & affiliate links
│   │   ├── membership/         # Membership page (fully implemented)
│   │   │   └── page.tsx        # Membership tiers & FAQ
│   │   ├── tickets/            # Tickets page (fully implemented)
│   │   │   └── page.tsx        # Digital ticket management
│   │   └── vip/                # VIP page (fully implemented)
│   │       └── page.tsx        # Membership tiers & booking
│   ├── components/             # Reusable UI components
│   │   ├── layout/             # Layout components
│   │   │   ├── SiteFooter.tsx  # Site footer
│   │   │   ├── SiteHeader.tsx  # Navigation header with Radix UI
│   │   │   └── SiteShell.tsx   # Main layout wrapper
│   │   ├── sections/           # Page sections
│   │   │   ├── blog/           # Blog components
│   │   │   │   ├── BlogPostBody.tsx    # Markdown rendering
│   │   │   │   └── BlogPostHero.tsx    # Blog post header
│   │   │   ├── gear/           # Gear components
│   │   │   │   ├── GearGrid.tsx        # Gear recommendations grid
│   │   │   │   └── GearHero.tsx        # Gear page header
│   │   │   ├── home/           # Homepage sections
│   │   │   │   ├── HomeHero.tsx        # Hero with event chips
│   │   │   │   ├── ThisIsRavehouse.tsx # Brand section
│   │   │   │   ├── UpcomingEvents.tsx  # Event preview
│   │   │   │   └── AfterglowGallery.tsx # Gallery preview
│   │   │   ├── membership/     # Membership components
│   │   │   │   ├── MembershipHero.tsx      # Membership header
│   │   │   │   ├── MembershipTiers.tsx     # Tier cards
│   │   │   │   └── MembershipFAQ.tsx       # FAQ section
│   │   │   └── vip/            # VIP sections (empty)
│   │   └── ui/                 # Core UI components
│   │       ├── Button.tsx      # ButtonLink component
│   │       ├── Chip.tsx        # Colorful chip component
│   │       ├── Input.tsx       # Form input component
│   │       ├── NewsletterSignup.tsx # Newsletter form
│   │       ├── SectionHeader.tsx # Section headers
│   │       ├── Surface.tsx     # Container with blur effects
│   │       ├── ThemeToggle.tsx # Light/dark mode toggle
│   │       └── gallery/        # Gallery-specific components
│   │           ├── GalleryHero.tsx     # Gallery header
│   │           ├── GalleryFilters.tsx  # Filter controls
│   │           ├── GalleryFeed.tsx     # Photo grid
│   │           ├── GallerySidebar.tsx  # Sidebar with info
│   │           ├── GalleryBottomStrip.tsx # Bottom gallery strip
│   │           └── GalleryNeon.tsx     # Neon gallery title
│   ├── contexts/               # React contexts
│   │   └── ThemeContext.tsx    # Theme state management
│   └── lib/                    # Utilities & data
│       ├── blog.ts             # Blog posts data & utilities
│       └── navigation.ts       # Site navigation configuration
├── public/
│   ├── images/                 # Static images
│   │   ├── backgrounds/        # Background images
│   │   ├── branding/           # Logo/branding assets
│   │   ├── events/             # Event photos
│   │   ├── gallery/            # Gallery photos
│   │   └── vip/                # VIP section images
│   └── *.svg                  # Icons and assets
├── package.json               # Dependencies & scripts
├── tsconfig.json              # TypeScript config
├── next.config.ts             # Next.js config
├── postcss.config.mjs         # PostCSS config
├── eslint.config.mjs          # ESLint config
└── README.md                  # This file
```
## 🎨 Styling & Design

- **Theme**: Light/dark mode with custom gradient backgrounds and color schemes
- **Colors**: Custom Tailwind v4.1.17 colors (rave-pink, rave-orange, rave-cyan, rave-purple)
- **Typography**: Sans-serif fonts with tight tracking
- **Components**: Surface containers with blur effects, glows, and shadows
- **Chips**: Colorful rave-themed chips replacing neutral backgrounds
- **Theme Toggle**: Accessible light/dark mode switcher with localStorage persistence
- **Responsive**: Mobile-first design with Tailwind breakpoints

## 🛠️ Development

### Prerequisites
- Node.js v22
- npm/yarn/pnpm

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

### Build for Production
```bash
npm run build
npm start
```

### Linting
```bash
npm run lint
```

## 📝 Key Files & Components

### Pages (All Fully Implemented)
- `src/app/page.tsx`: Homepage composing all home sections
- `src/app/layout.tsx`: Root layout with Ravehouse Entertainment metadata & navigation
- `src/app/blog/page.tsx`: Blog listing with recent posts and categories
- `src/app/blog/[slug]/page.tsx`: Dynamic blog post pages with SEO metadata
- `src/app/about/page.tsx`: Team profiles, venue info, booking contacts
- `src/app/contact/page.tsx`: Contact methods, locations, and response times
- `src/app/events/page.tsx`: Event listings with genre filters and venue details
- `src/app/gallery/page.tsx`: Photo gallery with filters, feed, and sidebar
- `src/app/gear/page.tsx`: Rave gear recommendations with affiliate links
- `src/app/membership/page.tsx`: Comprehensive membership page with tiers and FAQ
- `src/app/tickets/page.tsx`: Digital ticket management with QR codes
- `src/app/vip/page.tsx`: VIP membership tiers and booking interface

### Core Components
- `SiteShell`: Main layout wrapper with gradient background
- `SiteHeader`: Navigation with Radix UI accessible dropdowns
- `Surface`: Reusable container with blur/shadow effects
- `Chip`: Colorful chip component with rave-themed backgrounds
- `NewsletterSignup`: Email signup form with proper TypeScript typing
- `ButtonLink`: Custom button component with variants
- `Input`: Form input component with validation states
- `ThemeToggle`: Accessible light/dark mode toggle with localStorage

### Blog Components
- `BlogPostBody`: Markdown rendering with sanitization
- `BlogPostHero`: Blog post header with metadata

### Gear Components
- `GearHero`: Gear page header with description
- `GearGrid`: Gear recommendations grid with secure external links

### Membership Components
- `MembershipHero`: Membership page header
- `MembershipTiers`: Tier comparison cards
- `MembershipFAQ`: Frequently asked questions

### Gallery Components
- `GalleryHero`: Gallery header with stats and social tags
- `GalleryFilters`: Filter controls for grid/stack view
- `GalleryFeed`: Photo grid with seed data
- `GallerySidebar`: Sidebar with event info and disabled buttons
- `GalleryBottomStrip`: Bottom gallery strip with overlay chips

### Home Sections
- `HomeHero`: Hero section with event chips and call-to-actions
- `ThisIsRavehouse`: Brand section with stats and booking info
- `UpcomingEvents`: Event preview cards
- `AfterglowGallery`: Gallery preview section

### Utilities
- `src/contexts/ThemeContext.tsx`: Theme state management with localStorage persistence
- `src/lib/blog.ts`: Blog posts data, categories, and utility functions
- `src/lib/navigation.ts`: Site navigation configuration with submenu support

## 🚀 Deployment

Ready for deployment on Vercel, Netlify, or any Node.js host. The app uses static generation where possible and includes:

- **Build Status**: ✅ All pages build successfully
- **Routes**: 13+ fully functional pages (/ /blog /blog/[slug] /about /contact /events /gallery /gear /membership /tickets /vip /venues /venues/[slug])
- **Blog System**: Static generation with SEO metadata for all posts
- **Static Assets**: Image placeholders ready for real assets
- **Performance**: Optimized with Next.js 15, Turbopack, and modern React 19
- **Security**: Proper sanitization, secure external links, TypeScript safety
- **Accessibility**: Radix UI components, proper ARIA attributes
- **Theme System**: Light/dark mode with localStorage persistence

## 🤝 Contributing

This is a personal project for Ravehouse Entertainment. For AI-assisted development, refer to this README for context.

### Recent Updates
- ✅ **Contact Page**: Fully implemented with contact methods, locations, and response times
- ✅ **Theme System**: Light/dark mode toggle with localStorage persistence
- ✅ **Mobile Optimization**: Responsive contact cards and improved mobile layouts
- ✅ **Blog System**: Full markdown blog with static generation and SEO
- ✅ **Membership Page**: Comprehensive membership tiers and FAQ
- ✅ **Gear Recommendations**: Rave gear reviews with secure affiliate links
- ✅ **Navigation**: Radix UI accessible dropdowns with keyboard support
- ✅ **Security**: Fixed rehype plugin ordering, secure external links
- ✅ **TypeScript**: Proper imports and type safety throughout
- ✅ **CodeRabbit Integration**: Automated PR reviews and quality checks
- ✅ **Build Verification**: All routes build successfully with clean linting

## 🔧 Build Status

```bash
✓ Next.js 15 with React 19.2.3
✓ TypeScript compilation successful
✓ All 11 routes build without errors
✓ Static generation working for blog posts
✓ Responsive design verified
✓ Linting passes with zero issues
✓ Security checks: sanitization, secure links, proper imports
✓ Accessibility: Radix UI components, ARIA attributes
✓ Theme system: Light/dark mode fully functional
```

## 📄 License

Private project - All rights reserved.

This project uses:
- [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel
- [Radix UI](https://www.radix-ui.com/) for accessible component primitives
- [React Markdown](https://github.com/remarkjs/react-markdown) for content rendering
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling

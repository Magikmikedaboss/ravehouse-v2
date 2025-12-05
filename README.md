# Ravehouse Entertainment v2

A modern Next.js web application for Ravehouse Entertainment, featuring underground warehouse raves and bass nights in Las Vegas. Built with the latest web technologies for a sleek, responsive experience.

## 🚀 Technologies Used

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 with custom rave color palette
- **Build Tool**: Turbopack (via Next.js)
- **Deployment**: Ready for Vercel/Netlify

## ✨ Features

- **🏠 Homepage**: Hero section, "This is Ravehouse" section, upcoming events preview
- **📅 Events Page**: Full event listings with filtering, genre chips, venue information
- **🎨 Gallery**: Photo gallery with filters, sidebar, and interactive components
- **🎫 Tickets**: Digital ticket management with QR codes and venue information
- **👑 VIP**: Membership tiers, perks, and booking interface
- **ℹ️ About**: Team profiles, venue information, booking contacts
- **🎨 Custom UI**: Chips with rave-themed colors, surface containers, glow effects
- **📱 Responsive**: Mobile-first design optimized for all devices

## 📁 Project Structure

```bash
ravehouse-v2/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── globals.css         # Global styles & Tailwind v4 theme
│   │   ├── layout.tsx          # Root layout with metadata
│   │   ├── page.tsx            # Homepage composition
│   │   ├── about/              # About page (fully implemented)
│   │   │   └── page.tsx        # Team, venues, booking info
│   │   ├── contact/            # Contact page (placeholder)
│   │   ├── events/             # Events page (fully implemented)
│   │   │   └── page.tsx        # Event listings with filters
│   │   ├── gallery/            # Gallery page (fully implemented)
│   │   │   └── page.tsx        # Photo gallery with components
│   │   ├── tickets/            # Tickets page (fully implemented)
│   │   │   └── page.tsx        # Digital ticket management
│   │   └── vip/                # VIP page (fully implemented)
│   │       └── page.tsx        # Membership tiers & booking
│   ├── components/             # Reusable UI components
│   │   ├── layout/             # Layout components
│   │   │   ├── SiteFooter.tsx  # Site footer
│   │   │   ├── SiteHeader.tsx  # Navigation header
│   │   │   └── SiteShell.tsx   # Main layout wrapper
│   │   ├── sections/           # Page sections
│   │   │   ├── home/           # Homepage sections
│   │   │   │   ├── HomeHero.tsx      # Hero with event chips
│   │   │   │   ├── ThisIsRavehouse.tsx # Brand section
│   │   │   │   ├── UpcomingEvents.tsx  # Event preview
│   │   │   │   └── AfterglowGallery.tsx # Gallery preview
│   │   │   └── vip/            # VIP sections (empty)
│   │   └── ui/                 # Core UI components
│   │       ├── Button.tsx      # ButtonLink component
│   │       ├── Chip.tsx        # Colorful chip component
│   │       ├── SectionHeader.tsx # Section headers
│   │       ├── Surface.tsx     # Container with blur effects
│   │       └── gallery/        # Gallery-specific components
│   │           ├── GalleryHero.tsx     # Gallery header
│   │           ├── GalleryFilters.tsx  # Filter controls
│   │           ├── GalleryFeed.tsx     # Photo grid
│   │           ├── GallerySidebar.tsx  # Sidebar with info
│   │           ├── GalleryBottomStrip.tsx # Bottom gallery strip
│   │           └── GalleryNeon.tsx     # Neon gallery title
│   └── lib/                    # Utilities (empty)
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

- **Theme**: Dark mode with custom gradient backgrounds (#1b0612 to #050309)
- **Colors**: Custom Tailwind v4 colors (rave-pink, rave-orange, rave-cyan, rave-purple)
- **Typography**: Sans-serif fonts with tight tracking
- **Components**: Surface containers with blur effects, glows, and shadows
- **Chips**: Colorful rave-themed chips replacing neutral backgrounds
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
- `src/app/layout.tsx`: Root layout with Ravehouse Entertainment metadata
- `src/app/about/page.tsx`: Team profiles, venue info, booking contacts
- `src/app/events/page.tsx`: Event listings with genre filters and venue details
- `src/app/gallery/page.tsx`: Photo gallery with filters, feed, and sidebar
- `src/app/tickets/page.tsx`: Digital ticket management with QR codes
- `src/app/vip/page.tsx`: VIP membership tiers and booking interface

### Core Components
- `SiteShell`: Main layout wrapper with gradient background
- `Surface`: Reusable container with blur/shadow effects
- `Chip`: Colorful chip component with rave-themed backgrounds
- `ButtonLink`: Custom button component with variants

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

### Styles
- `src/app/globals.css`: Tailwind v4 imports, custom theme colors, utilities
- Custom utilities: `.glow`, `.hide-scrollbar`, `.surface`
- Rave color palette: pink (#ff4b8b), orange (#ff9f4b), cyan (#4be2ff), purple (#7c3aed)

## 🚀 Deployment

Ready for deployment on Vercel, Netlify, or any Node.js host. The app uses static generation where possible and includes:

- **Build Status**: ✅ All pages build successfully
- **Routes**: 7 fully functional pages (/ /about /events /gallery /tickets /vip /contact)
- **Static Assets**: Image placeholders ready for real assets
- **Performance**: Optimized with Next.js 15 and Turbopack

## 🤝 Contributing

This is a personal project for Ravehouse Entertainment. For AI-assisted development, refer to this README for context.

### Recent Updates
- ✅ All pages fully implemented with seed data
- ✅ Chips updated with colorful rave palette
- ✅ Brand name consistency ("Ravehouse Entertainment")
- ✅ CodeRabbit integration for PR reviews
- ✅ Build verification passing

## 🔧 Build Status

```bash
✓ TypeScript compilation successful
✓ All routes build without errors
✓ Static generation working
✓ Responsive design verified
```

## 📄 License

Private project - All rights reserved.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

# Ravehouse Entertainment v2

A modern Next.js web application for Ravehouse Entertainment, featuring underground warehouse raves and bass nights in Las Vegas. Built with the latest web technologies for a sleek, responsive experience.

## 🚀 Technologies Used

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Build Tool**: Turbopack (via Next.js)
- **Deployment**: Ready for Vercel/Netlify

## 📁 Project Structure

```
ravehouse-v2/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── globals.css         # Global styles & Tailwind config
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Homepage
│   │   ├── about/              # About page (empty)
│   │   ├── contact/            # Contact page (empty)
│   │   ├── events/             # Events page (empty)
│   │   ├── gallery/            # Gallery page (empty)
│   │   ├── tickets/            # Tickets page (empty)
│   │   └── vip/                # VIP page (basic)
│   │       └── page.tsx
│   ├── components/             # Reusable UI components
│   │   ├── layout/             # Layout components
│   │   │   ├── SiteFooter.tsx
│   │   │   ├── SiteHeader.tsx
│   │   │   └── SiteShell.tsx
│   │   ├── sections/           # Page sections
│   │   │   ├── home/           # Homepage sections
│   │   │   │   ├── AfterglowGallery.tsx
│   │   │   │   ├── HomeHero.tsx
│   │   │   │   ├── ThisIsRavehouse.tsx
│   │   │   │   └── UpcomingEvents.tsx
│   │   │   └── vip/            # VIP sections (empty)
│   │   └── ui/                 # Basic UI components
│   │       ├── Button.tsx
│   │       ├── Chip.tsx
│   │       ├── SectionHeader.tsx
│   │       └── Surface.tsx
│   └── lib/                    # Utilities (empty)
├── public/
│   ├── images/                 # Static images
│   │   ├── backgrounds/
│   │   ├── branding/
│   │   ├── events/
│   │   ├── gallery/
│   │   └── vip/
│   └── *.svg                  # Icons
├── package.json               # Dependencies & scripts
├── tsconfig.json              # TypeScript config
├── tailwind.config.js         # Tailwind config (if needed)
├── next.config.ts             # Next.js config
├── postcss.config.mjs         # PostCSS config
├── eslint.config.mjs          # ESLint config
└── README.md                  # This file
```

## 🎨 Styling & Design

- **Theme**: Dark mode with custom gradient backgrounds (#1b0612 to #050309)
- **Colors**: Custom Tailwind colors (rave-cyan, bg-soft, etc.)
- **Typography**: Sans-serif fonts with tight tracking
- **Components**: Surface containers with blur effects, glows, and shadows
- **Responsive**: Mobile-first design with Tailwind breakpoints

## 🛠️ Development

### Prerequisites
- Node.js 18+
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

### Pages
- `src/app/page.tsx`: Homepage composing home sections
- `src/app/layout.tsx`: Root layout with global styles
- `src/app/vip/page.tsx`: VIP page

### Components
- `SiteShell`: Main layout wrapper with gradient BG
- `Surface`: Reusable container with blur/shadow
- `HomeHero`, `UpcomingEvents`, etc.: Homepage sections

### Styles
- `src/app/globals.css`: Tailwind imports, custom theme, utilities
- Custom utilities: `.glow`, `.hide-scrollbar`, `.surface`

## 🚀 Deployment

Ready for deployment on Vercel, Netlify, or any Node.js host. The app uses static generation where possible.

## 🤝 Contributing

This is a personal project for Ravehouse Entertainment. For AI-assisted development, refer to this README for context.

## 📄 License

Private project - All rights reserved.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

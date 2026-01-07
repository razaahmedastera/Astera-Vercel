# Folder Structure Documentation

This document explains the folder structure of the Astera Contentful website project, following Next.js 15 best practices.

## 📁 Root Directory

```
Astera-Contentful/
├── docs/                    # Documentation files
├── node_modules/           # Dependencies (gitignored)
├── out/                    # Static export output (gitignored)
├── public/                 # Static assets (images, fonts, etc.)
├── src/                    # Source code
├── .gitignore             # Git ignore rules
├── next.config.js         # Next.js configuration
├── package.json           # Dependencies and scripts
├── postcss.config.js      # PostCSS configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── README.md              # Project overview
```

## 📁 Source Code (`src/`)

### `src/app/` - Next.js App Router
Next.js 15 uses the App Router for routing. Each folder represents a route.

```
src/app/
├── layout.tsx              # Root layout (header, footer, global styles)
├── page.tsx               # Home page (/)
├── home2/
│   └── page.tsx           # Legacy home page (/home2)
└── product/
    └── page.tsx           # Product page (/product)
```

**Key Points:**
- `layout.tsx` wraps all pages with Header and Footer
- Each `page.tsx` is a route component
- Folders create URL paths automatically

### `src/components/` - React Components

```
src/components/
├── screens/               # Page-level components
│   ├── HomeScreen/
│   │   ├── HomeScreen.tsx              # Legacy home screen (CSS modules)
│   │   ├── HomeScreen.module.css       # Legacy styles
│   │   ├── HomeScreenClient.tsx        # Client wrapper for legacy
│   │   ├── HomeScreenNew.tsx           # New home screen (Tailwind)
│   │   ├── HomeScreenNewClient.tsx    # Client wrapper for new
│   │   └── index.ts                    # Exports
│   └── ProductScreen/
│       ├── ProductScreen.tsx           # Product screen (CSS modules)
│       ├── ProductScreen.module.css   # Product styles
│       ├── ProductScreenClient.tsx    # Client wrapper
│       └── index.ts                    # Exports
└── ui/                    # Reusable UI components
    ├── Footer/
    │   ├── Footer.tsx                  # Global footer (Tailwind)
    │   └── index.ts                    # Exports
    └── Navigation/
        ├── Navigation.tsx               # Global header (Tailwind)
        └── index.ts                    # Exports
```

**Component Organization:**
- `screens/` - Full page components
- `ui/` - Reusable components (Header, Footer, buttons, etc.)
- Each component folder has an `index.ts` for clean imports

### `src/lib/` - Utility Libraries

```
src/lib/
└── contentful/
    ├── client.ts              # Server-side Contentful client
    ├── client-browser.ts      # Client-side Contentful client
    ├── api.ts                 # Server-side API functions
    ├── api-browser.ts         # Client-side API functions
    └── index.ts               # Exports
```

**Purpose:**
- Separates Contentful API logic
- Provides both server and client-side implementations
- Centralized API configuration

### `src/types/` - TypeScript Types

```
src/types/
└── contentful.ts             # Contentful content type definitions
```

**Purpose:**
- Type safety for Contentful data
- Shared across components and API functions

### `src/config/` - Configuration

```
src/config/
└── contentful.ts             # Contentful configuration constants
```

### `src/styles/` - Global Styles

```
src/styles/
└── globals.css               # Global CSS with Tailwind directives
```

**Purpose:**
- Tailwind CSS base styles
- Custom CSS utilities (`.section-container`, `.section-heading`, etc.)
- Global font and color definitions

## 📁 Public Assets (`public/`)

```
public/
├── images/
│   ├── astera-logo.svg      # Logo
│   ├── awards/              # Award images
│   ├── resources/           # Resource images
│   ├── tabs/                # Tab section images
│   └── ...                  # Other images
└── lottie/
    └── headerv2.json        # Lottie animation file
```

**Best Practices:**
- All static assets go in `public/`
- Access via `/images/...` in code
- Images are optimized and lazy-loaded

## 🔒 Security Considerations

### Environment Variables
- `.env.local` - Local development (gitignored)
- `.env` - Should not contain secrets (gitignored)
- Use `NEXT_PUBLIC_*` prefix for client-side variables
- Never commit `.env` files with secrets

### Git Ignore
The `.gitignore` file excludes:
- `node_modules/` - Dependencies
- `.next/` - Build cache
- `out/` - Static export output
- `.env*.local` - Environment files
- IDE files (`.vscode/`, `.idea/`)
- OS files (`.DS_Store`, `Thumbs.db`)

## 🎨 Styling Approach

### Tailwind CSS (Primary)
- Used in: `HomeScreenNew`, `Navigation`, `Footer`
- Utility-first CSS framework
- Responsive design with breakpoints
- Custom utilities in `globals.css`

### CSS Modules (Legacy)
- Used in: `HomeScreen`, `ProductScreen`
- Scoped styles per component
- Being phased out in favor of Tailwind

## 📦 Key Dependencies

- **Next.js 15** - React framework with App Router
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Contentful** - Headless CMS
- **Lottie React** - Animations

## 🚀 Development Workflow

1. **Development**: `npm run dev` - Starts dev server
2. **Build**: `npm run build` - Creates production build
3. **Export**: `npm run export` - Generates static files in `out/`

## 📝 Naming Conventions

- **Components**: PascalCase (`HomeScreen.tsx`)
- **Files**: kebab-case or PascalCase
- **Folders**: kebab-case
- **Types**: PascalCase with `Type` or `Interface` suffix
- **Constants**: UPPER_SNAKE_CASE

## ✅ Best Practices Followed

1. ✅ Next.js App Router structure
2. ✅ Component-based architecture
3. ✅ Separation of concerns (lib, types, config)
4. ✅ TypeScript for type safety
5. ✅ Environment variable security
6. ✅ Clean imports with index files
7. ✅ Responsive design patterns
8. ✅ Code splitting and lazy loading
9. ✅ Image optimization
10. ✅ Git ignore for sensitive files

## 🔄 Migration Notes

- Old home page preserved at `/home2` for reference
- CSS Modules being phased out in favor of Tailwind
- Client components marked with `'use client'` directive
- Server components are default (no directive needed)


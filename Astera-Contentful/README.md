# Astera Web

An enterprise-grade Next.js application with scalable architecture.

## Getting Started

First, install the dependencies:

```bash
npm install
```

Set up your environment variables by copying the example file:

```bash
copy .env.example .env.local
```

Then update `.env.local` with your Contentful credentials:
- `CONTENTFUL_SPACE_ID`
- `CONTENTFUL_ACCESS_TOKEN`
- `CONTENTFUL_ENVIRONMENT`
- `CONTENTFUL_HOME_ENTRY_ID`

Finally, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── screens/          # Screen-level components
│   └── ui/               # Reusable UI components
├── lib/                   # Utility functions and helpers
├── types/                 # TypeScript type definitions
├── config/                # Configuration files
└── styles/                # Global styles
```

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **CMS:** Contentful
- **Styling:** CSS Modules
- **Linting:** ESLint

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Folder Structure Philosophy

This project follows an enterprise-level folder structure:

- **`app/`**: Next.js App Router - handles routing and page layouts
- **`components/screens/`**: Full-page components (one per route)
- **`components/ui/`**: Reusable UI components (buttons, cards, etc.)
- **`lib/`**: Business logic, utilities, and helpers
  - **`lib/contentful/`**: Contentful CMS client and API methods
- **`types/`**: Shared TypeScript interfaces and types
- **`config/`**: Application configuration and constants
- **`styles/`**: Global styles and CSS variables

This structure allows for:
- Clear separation of concerns
- Easy navigation and maintainability
- Scalability as the project grows
- Consistent patterns for the team
- Centralized CMS integration

## Content Management

Content is managed through **Contentful CMS**:
- All page content is fetched from Contentful at build/request time
- Content types are fully typed with TypeScript
- Environment variables keep credentials secure
- API methods are centralized in `src/lib/contentful/`


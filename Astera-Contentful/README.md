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
- `CONTENTFUL_SPACE_ID` - Your Contentful space ID
- `CONTENTFUL_ACCESS_TOKEN` - Your Contentful access token
- `CONTENTFUL_ENVIRONMENT` - Contentful environment (default: 'master')
- `REVALIDATION_SECRET` - Secret token for webhook revalidation (optional but recommended for production)

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

### Server-Side Rendering (SSR) with Webhook-Based Revalidation

This application uses **webhook-based revalidation** for instant content updates:

- ✅ **Fast page loads**: Pages are cached and served instantly
- ✅ **Instant updates**: Webhooks trigger immediate revalidation when content is published
- ✅ **SEO-friendly**: Server-rendered HTML for better search engine indexing
- ✅ **Cost-effective**: Minimal API calls to Contentful (cached pages)
- ✅ **Reliable**: 1-hour fallback revalidation if webhook fails

**How it works:**
1. First request: Fetches from Contentful and caches the page
2. Subsequent requests: Serves cached page (fast!)
3. **When you publish in Contentful**: Webhook instantly revalidates → next request shows new content
4. **Safety net**: If webhook fails, content updates after 1 hour automatically

**Pages using ISR:**
- Home page (`/`)
- Product pages (`/product`)
- Blog listing (`/blog`)
- Individual blog posts (`/blog/[slug]`)

### Content Revalidation (Webhooks)

For production deployments, you can set up **on-demand revalidation** using Contentful webhooks. This clears the cached HTML as soon as you publish in Contentful, so the **very next page request** will fetch fresh data and render the updated content (no TTL delay).

**Setup Instructions:**

1. **Add revalidation secret to environment variables:**
   ```bash
   REVALIDATION_SECRET=your-super-secret-token-here
   ```

2. **Configure Contentful Webhook:**
   - Go to Contentful → Settings → Webhooks
   - Create a new webhook
   - **URL**: `https://your-domain.com/api/revalidate?secret=your-super-secret-token-here`
   - **Trigger**: Select "Publish" and "Unpublish" events
   - **HTTP method**: POST
   - Save the webhook

3. **Test the webhook:**
   - Publish/unpublish content in Contentful
   - The webhook will automatically revalidate affected pages
   - Or manually test: `GET https://your-domain.com/api/revalidate?secret=your-super-secret-token-here`

**Benefits:**
- ✅ **Instant updates**: Content changes appear immediately when published (via webhook)
- ✅ **Better performance**: Pages are cached until revalidation (faster loads)
- ✅ **Fewer API calls**: Minimal Contentful API usage (only on publish or fallback)
- ✅ **Reliable**: 1-hour fallback ensures content updates even if webhook fails
- ✅ **Professional production setup**: Industry-standard approach

**Primary mechanism:** Webhooks provide instant updates when content is published  
**Safety net:** If webhook fails, content updates automatically after 1 hour


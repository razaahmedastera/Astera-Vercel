# 📡 API & Data Fetching Flow - Complete Explanation

## 🎯 Overview

Your application uses **Client-Side Rendering (CSR)** to fetch content from Contentful in real-time. This means:
- ✅ Content updates appear **immediately** without rebuilding
- ✅ Data is fetched **in the browser** after the page loads
- ✅ Uses `NEXT_PUBLIC_*` environment variables (visible to browser)

---

## 🔄 Complete Data Flow

```
┌─────────────────────────────────────────────────────────────┐
│  1. USER VISITS PAGE                                        │
│     https://yoursite.com/product                            │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│  2. NEXT.JS SERVES STATIC HTML                              │
│     - Loads product.html (or index.html)                    │
│     - HTML includes React bundle                            │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│  3. BROWSER LOADS REACT APP                                 │
│     - React hydrates the page                               │
│     - App.tsx → Layout → Navigation                         │
│     - Routes to: src/app/product/page.tsx                   │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│  4. PRODUCT PAGE RENDERS                                    │
│     src/app/product/page.tsx                                │
│     └─> <ProductScreenClient />                             │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│  5. CLIENT COMPONENT MOUNTS                                  │
│     ProductScreenClient.tsx                                 │
│     - Shows "Loading..."                                    │
│     - useEffect() triggers on mount                          │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│  6. FETCH CONTENT FUNCTION CALLS                            │
│     getProductPageContentBrowser()                          │
│     from: src/lib/contentful/api-browser.ts                │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│  7. GET CONTENTFUL CLIENT                                   
│     getContentfulClientBrowser()                            │
│     from: src/lib/contentful/client-browser.ts              │
│     - Checks env vars: NEXT_PUBLIC_CONTENTFUL_*             │
│     - Creates Contentful SDK client                         │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│  8. API CALL TO CONTENTFUL                                  │
│     client.getEntries({                                     │
│       content_type: 'productPage',                          │
│       'fields.slug': 'product'                              │
│     })                                                      │
│     └─> HTTP Request to Contentful CDN                     │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│  9. CONTENTFUL RETURNS DATA                                 │
│     - JSON response with entry data                         │
│     - Includes all fields (hero, products, features, etc.)  │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│  10. DATA TRANSFORMED & RETURNED                            │
│      - Maps Contentful fields to TypeScript types           │
│      - Returns: ProductPageContent                          │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│  11. STATE UPDATED IN REACT                                 │
│      setContent(data)                                       │
│      setLoading(false)                                      │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│  12. UI RENDERS WITH CONTENT                                │
│      <ProductScreen content={content} />                    │
│      - Displays hero section                                │
│      - Shows product cards                                  │
│      - Renders all dynamic content                          │
└─────────────────────────────────────────────────────────────┘
```

---

## 📁 File-by-File Breakdown

### 1. **Page Route** (`src/app/product/page.tsx`)
```tsx
import { ProductScreenClient } from '@/components/screens/ProductScreen/ProductScreenClient';

export default function ProductPage() {
  return <ProductScreenClient />;
}
```
**Purpose:** Entry point for `/product` route. Simply renders the client wrapper.

---

### 2. **Client Wrapper** (`ProductScreenClient.tsx`)
```tsx
'use client';  // ← This makes it a client component

export function ProductScreenClient() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // This runs AFTER component mounts in browser
    async function fetchContent() {
      const data = await getProductPageContentBrowser();
      setContent(data);
      setLoading(false);
    }
    fetchContent();
  }, []);
  
  if (loading) return <div>Loading...</div>;
  return <ProductScreen content={content} />;
}
```

**Key Points:**
- `'use client'` = Runs in browser, not server
- `useEffect` = Runs after component mounts
- `useState` = Manages loading/content/error states
- Shows loading spinner while fetching

---

### 3. **Browser API Function** (`api-browser.ts`)
```tsx
export async function getProductPageContentBrowser() {
  // 1. Get Contentful client
  const client = getContentfulClientBrowser();
  
  // 2. Query Contentful API
  const response = await client.getEntries({
    content_type: 'productPage',  // Content type in Contentful
    'fields.slug': 'product',      // Filter by slug
    limit: 1,                       // Get only 1 entry
  });
  
  // 3. Extract entry data
  const entry = response.items[0];
  const fields = entry.fields;
  
  // 4. Transform to TypeScript type
  return {
    id: entry.sys.id,
    heroSectionHeading: fields.heroSectionHeading,
    products: fields.products || [],
    // ... all other fields
  };
}
```

**What it does:**
- Calls Contentful API using SDK
- Filters by content type and slug
- Transforms raw Contentful data to your TypeScript types
- Returns clean, typed data

---

### 4. **Contentful Client** (`client-browser.ts`)
```tsx
let contentfulClientInstance = null;

export const getContentfulClientBrowser = () => {
  // Reuse existing client if already created
  if (contentfulClientInstance) {
    return contentfulClientInstance;
  }
  
  // Get env vars (available in browser because of NEXT_PUBLIC_ prefix)
  const spaceId = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
  const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;
  
  if (!spaceId || !accessToken) {
    throw new Error('Contentful credentials not found');
  }
  
  // Create Contentful SDK client
  contentfulClientInstance = createClient({
    space: spaceId,
    accessToken: accessToken,
    environment: 'master',
  });
  
  return contentfulClientInstance;
};
```

**Key Points:**
- **Lazy initialization:** Client created only when needed
- **Singleton pattern:** Reuses same client instance
- **Runtime env vars:** Checks `NEXT_PUBLIC_*` at runtime (not build time)
- **SDK client:** Uses official Contentful JavaScript SDK

---

## 🔑 Key Concepts

### **Client-Side vs Server-Side**

| Aspect | Client-Side (Current) | Server-Side (Alternative) |
|--------|----------------------|---------------------------|
| **When** | After page loads in browser | During build or request |
| **Env Vars** | `NEXT_PUBLIC_*` (visible to browser) | `CONTENTFUL_*` (server-only) |
| **Updates** | Real-time (no rebuild needed) | Requires rebuild |
| **Files** | `api-browser.ts`, `client-browser.ts` | `api.ts`, `client.ts` |
| **Components** | `*Client.tsx` (with `'use client'`) | Server components |

### **Why Client-Side?**
✅ **Real-time updates:** Change content in Contentful → see changes immediately  
✅ **No rebuilds:** Don't need to run `npm run build` for content changes  
✅ **Static hosting:** Works on any static host (no server needed)

### **Environment Variables**

**`.env.local`** (local development):
```bash
NEXT_PUBLIC_CONTENTFUL_SPACE_ID=your_space_id
NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN=your_cda_token
NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT=master
```

**Why `NEXT_PUBLIC_` prefix?**
- Next.js only exposes env vars with this prefix to the browser
- Without it, variables are server-only and won't work in client components

**On Production:**
- These same variables must be set in your hosting platform
- They get embedded into the JavaScript bundle at build time
- Users' browsers can see these values (they're public)

---

## 🔍 Step-by-Step Example: Visiting `/product`

1. **User types:** `https://yoursite.com/product`

2. **Server serves:** `product.html` (or `index.html` with routing)

3. **Browser loads:**
   - HTML structure
   - JavaScript bundle (React app)
   - CSS files

4. **React hydrates:**
   - `app/product/page.tsx` renders
   - Calls `<ProductScreenClient />`

5. **Component mounts:**
   - `ProductScreenClient` shows "Loading..."
   - `useEffect` hook runs

6. **API call starts:**
   ```tsx
   getProductPageContentBrowser()
     → getContentfulClientBrowser()
       → Checks env vars
       → Creates Contentful client
     → client.getEntries({ content_type: 'productPage' })
       → HTTP request to: https://cdn.contentful.com/spaces/{spaceId}/...
   ```

7. **Contentful responds:**
   ```json
   {
     "items": [{
       "sys": { "id": "abc123" },
       "fields": {
         "heroSectionHeading": "AI-Powered Data Platform",
         "products": [...],
         ...
       }
     }]
   }
   ```

8. **Data transformed:**
   - Raw Contentful data → `ProductPageContent` type
   - `setContent(data)` updates state

9. **UI updates:**
   - `loading = false`
   - Renders `<ProductScreen content={content} />`
   - Shows all product content

---

## 🆚 Comparison: Browser vs Server API

### **Browser API** (Current - `api-browser.ts`)
```tsx
// ✅ Runs in browser
// ✅ Uses NEXT_PUBLIC_* env vars
// ✅ Real-time updates
export async function getProductPageContentBrowser() {
  const client = getContentfulClientBrowser();
  return await client.getEntries({...});
}
```

### **Server API** (Alternative - `api.ts`)
```tsx
// ❌ Runs on server (build time)
// ❌ Uses CONTENTFUL_* env vars (no NEXT_PUBLIC_)
// ❌ Requires rebuild for updates
export async function getProductPageContent() {
  const client = contentfulClient;  // Server-side client
  return await client.getEntries({...});
}
```

---

## 🐛 Common Issues & Solutions

### **Issue: "Contentful environment variables are not set"**
**Cause:** `NEXT_PUBLIC_*` vars not set or not accessible  
**Fix:** 
1. Check `.env.local` has `NEXT_PUBLIC_CONTENTFUL_SPACE_ID`
2. Restart dev server after adding env vars
3. Rebuild for production: `npm run build`

### **Issue: Content not updating**
**Cause:** Browser cache or stale data  
**Fix:**
- Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
- Check Contentful webhook/publishing
- Verify env vars are correct

### **Issue: Slow loading**
**Cause:** Large content or network issues  
**Fix:**
- Check Contentful CDN status
- Optimize images in Contentful
- Add loading states (already implemented)

---

## 📊 Data Types Flow

```
Contentful Entry (Raw)
    ↓
getEntries() response
    ↓
Transform in api-browser.ts
    ↓
ProductPageContent (TypeScript type)
    ↓
Passed to ProductScreen component
    ↓
Rendered in UI
```

---

## 🎓 Summary

**Your app uses Client-Side Rendering (CSR) for real-time content:**

1. **Page loads** → Static HTML + React bundle
2. **React mounts** → Client component renders
3. **useEffect triggers** → Fetches from Contentful API
4. **Data received** → Updates React state
5. **UI renders** → Shows dynamic content

**Key files:**
- `*Client.tsx` → Client wrapper components
- `api-browser.ts` → Browser API functions
- `client-browser.ts` → Contentful client setup
- `.env.local` → Environment variables

**Benefits:**
- ✅ Real-time content updates
- ✅ No rebuilds needed
- ✅ Works on static hosting
- ✅ Fast initial page load

---

## 🔗 Related Files

- `src/app/product/page.tsx` - Route entry point
- `src/components/screens/ProductScreen/ProductScreenClient.tsx` - Client wrapper
- `src/lib/contentful/api-browser.ts` - Browser API functions
- `src/lib/contentful/client-browser.ts` - Contentful client
- `.env.local` - Environment variables

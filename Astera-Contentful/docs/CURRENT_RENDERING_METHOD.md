# 🔍 Current Rendering Method - Analysis

## 🎯 Your Question

> "Right now what rendering in this project? CSR or SSR?"

**Answer:** **Hybrid: SSG (Static Site Generation) + CSR (Client-Side Rendering)**

**NOT pure SSR** because you have `output: 'export'` in `next.config.js`.

---

## 📊 Current Setup

### **Configuration:**
```js
// next.config.js
output: 'export',  // ← This means static export
```

**What this means:**
- ❌ **NOT SSR** (Server-Side Rendering at request time)
- ✅ **SSG** (Static Site Generation at build time)
- ✅ **CSR** (Client-Side Rendering at runtime)

---

## 🔄 How It Works

### **Build Time (SSG - Static Site Generation):**
```
npm run build
  ↓
Next.js runs async functions
  ↓
Fetches content from Contentful
  ↓
Pre-renders HTML with content
  ↓
Generates static files (out/)
```

**File:** `src/app/product/page.tsx`
```tsx
export default async function ProductPage() {
  // This runs at BUILD TIME (not request time)
  const content = await getProductPageContent();
  return <ProductScreenClient initialContent={content} />;
}
```

**What happens:**
- Runs during `npm run build`
- Fetches from Contentful
- Pre-renders HTML
- Saves to `out/product.html`

**This is SSG (Static Site Generation), NOT SSR** ✅

---

### **Runtime (CSR - Client-Side Rendering):**
```
User visits page
  ↓
Browser loads HTML (with old content)
  ↓
JavaScript loads
  ↓
useEffect runs
  ↓
Fetches fresh content from Contentful
  ↓
Updates page
```

**File:** `src/components/screens/ProductScreen/ProductScreenClient.tsx`
```tsx
'use client';  // ← Client component

useEffect(() => {
  // This runs in BROWSER (client-side)
  const fresh = await getProductPageContentBrowser();
  setContent(fresh);
}, []);
```

**What happens:**
- Runs in browser (after page loads)
- Fetches fresh content
- Updates page

**This is CSR (Client-Side Rendering)** ✅

---

## 📊 Rendering Methods Comparison

### **Pure SSR (Server-Side Rendering):**
```
User requests page
  ↓
Server runs code (Node.js)
  ↓
Server fetches from Contentful
  ↓
Server renders HTML
  ↓
Sends HTML to browser
```

**Requirements:**
- ❌ Remove `output: 'export'`
- ❌ Need Node.js server
- ❌ Can't use static hosting

**Your setup:** ❌ **NOT this** (you have `output: 'export'`)

---

### **SSG (Static Site Generation) - What You Have:**
```
Build time:
  ↓
Server runs code (your computer)
  ↓
Fetches from Contentful
  ↓
Pre-renders HTML
  ↓
Saves static files
```

**Runtime:**
```
User requests page
  ↓
Server sends static HTML
  ↓
No server-side code execution
```

**Your setup:** ✅ **This is what you have** (build time)

---

### **CSR (Client-Side Rendering) - What You Have:**
```
User visits page
  ↓
Browser loads HTML
  ↓
JavaScript runs in browser
  ↓
Fetches from Contentful
  ↓
Updates page
```

**Your setup:** ✅ **This is what you have** (runtime)

---

## 🎯 Your Current Rendering: Hybrid SSG + CSR

### **Build Time: SSG**
- ✅ Fetches content at build time
- ✅ Pre-renders HTML
- ✅ Google sees content in HTML

### **Runtime: CSR**
- ✅ Fetches fresh content in browser
- ✅ Updates page if content changed
- ✅ Real-time updates

### **NOT SSR**
- ❌ No server-side rendering at request time
- ❌ `output: 'export'` prevents SSR
- ❌ Static files only

---

## 📋 Summary Table

| Rendering Type | When | Where | Your Setup |
|----------------|------|-------|------------|
| **SSG** | Build time | Your computer | ✅ Yes |
| **CSR** | Runtime | Browser | ✅ Yes |
| **SSR** | Request time | Server | ❌ No |

---

## 🔍 Code Evidence

### **SSG Evidence:**
```tsx
// src/app/product/page.tsx
export default async function ProductPage() {
  // async function = runs at build time (with static export)
  const content = await getProductPageContent();
  return <ProductScreenClient initialContent={content} />;
}
```

**With `output: 'export'`:**
- Runs at **build time** (SSG)
- NOT at request time (SSR)

---

### **CSR Evidence:**
```tsx
// src/components/screens/ProductScreen/ProductScreenClient.tsx
'use client';  // ← Client component

useEffect(() => {
  // Runs in browser (client-side)
  const fresh = await getProductPageContentBrowser();
  setContent(fresh);
}, []);
```

**This is CSR:**
- Runs in **browser**
- After page loads
- Client-side rendering

---

## 🎓 Final Answer

**Your current rendering method:**

1. **SSG (Static Site Generation)** ✅
   - At build time
   - Pre-renders HTML with content
   - Google sees content

2. **CSR (Client-Side Rendering)** ✅
   - At runtime
   - Fetches fresh content in browser
   - Updates page

3. **NOT SSR (Server-Side Rendering)** ❌
   - `output: 'export'` prevents SSR
   - No server-side rendering at request time
   - Only static files

---

**Summary:**
- **Build time:** SSG (Static Site Generation)
- **Runtime:** CSR (Client-Side Rendering)
- **NOT:** SSR (Server-Side Rendering)

**This is a hybrid approach: SSG + CSR** ✅


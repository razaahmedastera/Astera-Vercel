# Environment Variables Setup Guide

## ⚠️ Error Fix Required

You're seeing this error because the environment variables are not set:
```
Contentful environment variables are not set. Please set NEXT_PUBLIC_CONTENTFUL_SPACE_ID and NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN
```

## ✅ Quick Fix

### Step 1: Create/Update `.env.local` file

Create a file named `.env.local` in the root of your project (same folder as `package.json`) with:

```env
NEXT_PUBLIC_CONTENTFUL_SPACE_ID=your_space_id_here
NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN=your_cda_access_token_here
NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT=master
```

### Step 2: Get Your Contentful Credentials

1. **Go to Contentful**: https://app.contentful.com
2. **Navigate to**: Settings → API keys
3. **Find your Space ID**: It's shown at the top of the API keys page
4. **Get Content Delivery API (CDA) Token**: 
   - Click on "Content Delivery API - access token"
   - Copy the token (this is safe to expose in browser - it's read-only)

### Step 3: Update `.env.local`

Replace the placeholders with your actual values:

```env
NEXT_PUBLIC_CONTENTFUL_SPACE_ID=7ruq1ev0ep8e
NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN=your_actual_cda_token_here
NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT=master
```

### Step 4: Restart Your Dev Server

After adding the environment variables:

```bash
# Stop your dev server (Ctrl+C)
# Then restart it
npm run dev
```

## 📝 Important Notes

- **File Name**: Must be `.env.local` (not `.env`)
- **NEXT_PUBLIC_ Prefix**: Required for browser-side access
- **CDA Token**: Use Content Delivery API token (read-only, safe for browser)
- **Don't Commit**: `.env.local` should be in `.gitignore` (already is)

## 🔍 Verify It's Working

After setting up, the error should disappear and your site should load content from Contentful.

## 🚀 For Production/Staging

When deploying, make sure to add these same environment variables to your hosting platform:
- Vercel: Project Settings → Environment Variables
- Netlify: Site Settings → Environment Variables
- Other hosts: Check their documentation for adding env vars


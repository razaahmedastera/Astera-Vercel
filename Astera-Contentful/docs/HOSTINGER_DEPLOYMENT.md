# Hostinger Deployment Guide

This guide explains how to deploy the Astera website to Hostinger static hosting.

## Prerequisites

1. ✅ Node.js installed locally
2. ✅ Contentful environment variables set in `.env.local`
3. ✅ Hostinger hosting account with FTP/cPanel access

## Step-by-Step Deployment

### 1. Set Environment Variable for Static Export

Before building, you need to set the `STATIC_EXPORT` environment variable:

**Windows PowerShell:**
```powershell
$env:STATIC_EXPORT="true"
$env:NODE_ENV="production"
```

**Windows CMD:**
```cmd
set STATIC_EXPORT=true
set NODE_ENV=production
```

**Linux/Mac:**
```bash
export STATIC_EXPORT=true
export NODE_ENV=production
```

### 2. Build the Project

Run the build command:

```bash
npm run build
```

This will:
- ✅ Build the Next.js application
- ✅ Generate static HTML files in the `out/` folder
- ✅ Optimize all assets
- ✅ Include all necessary files for static hosting

### 3. Verify Build Output

After building, check that the `out/` folder contains:
- `index.html` (home page)
- `product.html` (product page)
- `home2.html` (legacy home page)
- `_next/` folder (JavaScript, CSS, and other assets)
- `images/` folder (all images)
- `lottie/` folder (animation files)

### 4. Prepare Files for Upload

**Option A: Upload entire `out/` folder contents**
- Upload everything inside `out/` to your Hostinger `public_html` or `www` folder

**Option B: Create a ZIP file (recommended)**
- Zip the contents of the `out/` folder
- Upload the ZIP file via cPanel File Manager
- Extract it in `public_html`

### 5. Upload to Hostinger

#### Via FTP (FileZilla, WinSCP, etc.):
1. Connect to your Hostinger FTP server
2. Navigate to `public_html` (or `www` folder)
3. Upload all files from the `out/` folder
4. **Important:** Upload `.htaccess` file from `public/.htaccess` to the root

#### Via cPanel File Manager:
1. Log into Hostinger cPanel
2. Open File Manager
3. Navigate to `public_html`
4. Upload the ZIP file
5. Extract it
6. Upload `.htaccess` file separately

### 6. Upload `.htaccess` File

**Critical Step:** Copy the `.htaccess` file from `public/.htaccess` to your Hostinger root directory (`public_html`).

This file ensures:
- ✅ Direct URL access works (`/product` route)
- ✅ Client-side routing functions correctly
- ✅ Proper caching and compression

### 7. Verify Deployment

1. Visit your domain: `https://yourdomain.com`
2. Test all routes:
   - Home: `https://yourdomain.com/`
   - Product: `https://yourdomain.com/product`
   - Legacy Home: `https://yourdomain.com/home2`
3. Check that images load correctly
4. Verify Contentful content is displaying

## Environment Variables on Hostinger

**Note:** Since you're using static export, environment variables are baked into the build at build time. You don't need to set them on Hostinger.

However, make sure your `.env.local` file has:
```
NEXT_PUBLIC_CONTENTFUL_SPACE_ID=your_space_id
NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN=your_access_token
NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT=master
```

These values are embedded in the JavaScript bundle during build.

## Quick Build Script

Create a `build-for-hostinger.ps1` file (Windows):

```powershell
# Set environment variables
$env:STATIC_EXPORT="true"
$env:NODE_ENV="production"

# Build the project
npm run build

Write-Host "✅ Build complete! Files are in the 'out' folder."
Write-Host "📦 Upload the contents of 'out' folder to Hostinger public_html"
Write-Host "📄 Don't forget to upload public/.htaccess to the root"
```

## Troubleshooting

### Issue: 404 errors on direct URL access
**Solution:** Make sure `.htaccess` file is uploaded to the root directory

### Issue: Images not loading
**Solution:** Check that `images/` folder is uploaded correctly with all subfolders

### Issue: Routes not working
**Solution:** Verify `.htaccess` file is present and contains rewrite rules

### Issue: Contentful content not showing
**Solution:** 
- Verify environment variables in `.env.local` before building
- Rebuild the project with correct credentials
- Check browser console for API errors

## Updating Content

Since you're using client-side fetching from Contentful:
1. Content updates automatically without rebuilding
2. No need to rebuild and redeploy for content changes
3. Only rebuild when you change code/structure

## File Structure on Hostinger

After deployment, your Hostinger `public_html` should look like:

```
public_html/
├── index.html
├── product.html
├── home2.html
├── 404.html
├── .htaccess          ← Important!
├── _next/
│   └── [hash]/
│       ├── static/
│       └── ...
├── images/
│   ├── astera-logo.svg
│   ├── awards/
│   ├── resources/
│   └── ...
└── lottie/
    └── headerv2.json
```

## Security Checklist

- ✅ `.env.local` is gitignored (never uploaded)
- ✅ `.htaccess` is uploaded for proper routing
- ✅ All files in `out/` are public (no sensitive data)
- ✅ Contentful access token is read-only (CDA token)

## Next Steps After Deployment

1. ✅ Test all pages and routes
2. ✅ Verify mobile responsiveness
3. ✅ Check page load speed
4. ✅ Test Contentful content updates
5. ✅ Set up monitoring (optional)

---

**Need Help?** Check the main `README.md` or `docs/FOLDER_STRUCTURE.md` for more information.


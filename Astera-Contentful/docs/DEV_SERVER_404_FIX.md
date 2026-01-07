# Fix: 404 Errors for Next.js Static Assets

## Problem
Getting 404 errors for Next.js static assets like:
- `/_next/static/css/app/layout.css`
- `/_next/static/chunks/main-app.js`
- `/_next/static/chunks/app-pages-internals.js`

## Root Cause
This happens when:
1. The `.next` folder is corrupted or missing
2. Dev server was started with `output: 'export'` enabled
3. Dev server needs to be restarted after config changes
4. Build cache is stale

## Solution

### Step 1: Stop the Dev Server
Press `Ctrl+C` in the terminal where `npm run dev` is running.

### Step 2: Clean Build Cache
```powershell
# Remove .next folder
Remove-Item -Path ".next" -Recurse -Force -ErrorAction SilentlyContinue
```

### Step 3: Restart Dev Server
```powershell
npm run dev
```

## Prevention

### ✅ Correct Configuration
The `next.config.js` should NOT have `output: 'export'` for dev mode:
```javascript
// Only enable static export for production builds
if (process.env.NODE_ENV === 'production' && process.env.STATIC_EXPORT === 'true') {
  nextConfig.output = 'export';
}
```

### ✅ Development vs Production
- **Development**: `npm run dev` - No static export, uses dev server
- **Production**: `npm run build` with `STATIC_EXPORT=true` - Creates static files

## Quick Fix Script

Create a `restart-dev.ps1` file:
```powershell
# Stop any running Node processes
Get-Process -Name node -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue

# Clean cache
Remove-Item -Path ".next" -Recurse -Force -ErrorAction SilentlyContinue

# Start dev server
npm run dev
```

## Common Issues

### Issue: Dev server shows 404 for all assets
**Fix**: Clean `.next` folder and restart

### Issue: "Cannot find module" errors
**Fix**: 
```powershell
Remove-Item -Path ".next" -Recurse -Force
Remove-Item -Path "node_modules" -Recurse -Force
npm install
npm run dev
```

### Issue: Port 3000 already in use
**Fix**: 
```powershell
# Kill process on port 3000
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or use different port
$env:PORT=3001
npm run dev
```

## Verification

After restarting, check:
1. ✅ Dev server starts without errors
2. ✅ `http://localhost:3000` loads correctly
3. ✅ No 404 errors in browser console
4. ✅ `.next` folder is created with proper structure


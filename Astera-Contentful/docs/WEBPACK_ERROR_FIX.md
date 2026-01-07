# Webpack Error Fix: `__webpack_modules__[moduleId] is not a function`

## Problem
This error occurs when webpack cannot properly resolve or load a module, often due to:
- Corrupted build cache
- Dynamic import issues
- Module resolution problems
- Stale build artifacts

## Solution Applied

### 1. Fixed Dynamic Import
Updated the Lottie dynamic import in `HomeScreenNew.tsx` to handle module exports correctly.

### 2. Added Webpack Configuration
Added webpack config in `next.config.js` to fix module resolution:
```javascript
webpack: (config, { isServer }) => {
  if (!isServer) {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };
  }
  return config;
}
```

### 3. Clean Build Process
Always clean caches before rebuilding:
```powershell
# Remove build caches
Remove-Item -Path ".next" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path "out" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path "node_modules\.cache" -Recurse -Force -ErrorAction SilentlyContinue

# Then rebuild
npm run dev
# or
npm run build
```

## Prevention

1. **Always clean cache** before important builds
2. **Use the build script**: `.\build-for-hostinger.ps1` (automatically cleans)
3. **Check for syntax errors** in dynamic imports
4. **Verify module exports** match import statements

## If Error Persists

1. Delete `node_modules` and reinstall:
   ```powershell
   Remove-Item -Path "node_modules" -Recurse -Force
   npm install
   ```

2. Clear npm cache:
   ```powershell
   npm cache clean --force
   ```

3. Rebuild from scratch:
   ```powershell
   Remove-Item -Path ".next" -Recurse -Force
   Remove-Item -Path "out" -Recurse -Force
   npm run build
   ```

## Related Files
- `src/components/screens/HomeScreen/HomeScreenNew.tsx` - Dynamic import fix
- `next.config.js` - Webpack configuration
- `build-for-hostinger.ps1` - Build script with cache cleaning


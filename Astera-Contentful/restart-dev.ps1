# Restart Dev Server Script
# Fixes 404 errors by cleaning cache and restarting

Write-Host "🔄 Restarting Next.js Dev Server..." -ForegroundColor Cyan
Write-Host ""

# Stop any running Node processes (dev server)
Write-Host "Step 1: Stopping dev server..." -ForegroundColor Yellow
Get-Process -Name node -ErrorAction SilentlyContinue | 
  Where-Object { $_.Path -like "*node.exe*" } | 
  Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 1
Write-Host "✅ Stopped" -ForegroundColor Green
Write-Host ""

# Clean .next folder
Write-Host "Step 2: Cleaning build cache..." -ForegroundColor Yellow
if (Test-Path ".next") {
    Remove-Item -Path ".next" -Recurse -Force
    Write-Host "✅ Removed .next folder" -ForegroundColor Green
} else {
    Write-Host "ℹ️  .next folder not found (already clean)" -ForegroundColor Gray
}
Write-Host ""

# Start dev server
Write-Host "Step 3: Starting dev server..." -ForegroundColor Yellow
Write-Host ""
npm run dev


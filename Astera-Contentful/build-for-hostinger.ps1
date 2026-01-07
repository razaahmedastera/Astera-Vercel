# Build Script for Hostinger Deployment
# This script sets the required environment variables and builds the project

Write-Host "🚀 Building for Hostinger static hosting..." -ForegroundColor Cyan

# Set environment variables for static export
$env:STATIC_EXPORT = "true"
$env:NODE_ENV = "production"

Write-Host "✅ Environment variables set:" -ForegroundColor Green
Write-Host "   STATIC_EXPORT = $env:STATIC_EXPORT"
Write-Host "   NODE_ENV = $env:NODE_ENV"
Write-Host ""

# Build the project
Write-Host "📦 Building Next.js application..." -ForegroundColor Yellow
npm run build

# Copy .htaccess file to out folder
Write-Host ""
Write-Host "📄 Copying .htaccess file..." -ForegroundColor Yellow
if (Test-Path "public\.htaccess") {
    Copy-Item -Path "public\.htaccess" -Destination "out\.htaccess" -Force
    Write-Host "✅ .htaccess copied to out folder" -ForegroundColor Green
} else {
    Write-Host "⚠️  Warning: public/.htaccess not found" -ForegroundColor Yellow
}

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ Build complete!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📋 Next Steps:" -ForegroundColor Cyan
    Write-Host "   1. Check the 'out' folder - it contains all files to upload"
    Write-Host "   2. Upload ALL contents of 'out' folder to Hostinger public_html"
    Write-Host "   3. Upload 'public/.htaccess' file to Hostinger root directory"
    Write-Host "   4. Verify your site is working at your domain"
    Write-Host ""
    Write-Host "📄 See docs/HOSTINGER_DEPLOYMENT.md for detailed instructions" -ForegroundColor Yellow
} else {
    Write-Host ""
    Write-Host "❌ Build failed! Check the errors above." -ForegroundColor Red
    exit 1
}


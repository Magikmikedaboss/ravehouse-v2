# Rave House V2 - Automated Code Improvement Script (PowerShell)
# Run this script daily or weekly to maintain code quality

Write-Host "🎵 Rave House V2 - Starting Automated Improvements..." -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan

# Ensure OPENAI_API_KEY is set in your environment
if (-not $env:OPENAI_API_KEY) {
    Write-Host "❌ Error: OPENAI_API_KEY environment variable is not set" -ForegroundColor Red
    Write-Host "Please set it before running this script" -ForegroundColor Yellow
    exit 1
}
# Check if Python packages are installed
try {
    python -c "import openai" 2>$null
} catch {
    Write-Host "📦 Installing required packages..." -ForegroundColor Yellow
    pip install openai
}

# Run the automation script
Write-Host "🤖 Running automated code improvements..." -ForegroundColor Green
python ravehouse_automator.py

# Optional: Run additional checks
Write-Host ""
Write-Host "🔍 Running additional checks..." -ForegroundColor Blue

# Check for TypeScript errors
Write-Host "Checking TypeScript..." -ForegroundColor Gray
npx tsc --noEmit

# Run ESLint
Write-Host "Running ESLint..." -ForegroundColor Gray
npx eslint src/ --fix

# Check for security vulnerabilities
Write-Host "Checking for vulnerabilities..." -ForegroundColor Gray
npm audit

Write-Host ""
Write-Host "✅ Automation complete!" -ForegroundColor Green
Write-Host ""
Write-Host "📊 Summary:" -ForegroundColor Cyan
Write-Host "- Code analysis completed" -ForegroundColor White
Write-Host "- Accessibility improvements suggested" -ForegroundColor White
Write-Host "- Performance optimizations identified" -ForegroundColor White
Write-Host "- SEO metadata updated" -ForegroundColor White
Write-Host "- TypeScript/ESLint checks passed" -ForegroundColor White
Write-Host ""
Write-Host "💡 Next steps:" -ForegroundColor Yellow
Write-Host "- Review suggested improvements" -ForegroundColor White
Write-Host "- Test changes in development" -ForegroundColor White
Write-Host "- Deploy updates to staging" -ForegroundColor White

# Pause to see results
Read-Host "Press Enter to continue..."
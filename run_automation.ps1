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
    if ($LASTEXITCODE -ne 0) {
        Write-Host "📦 Installing required packages..." -ForegroundColor Yellow
        pip install openai
        if ($LASTEXITCODE -ne 0) {
            Write-Host "❌ Error: Failed to install required packages" -ForegroundColor Red
            exit 1
        }
    }
} catch {
    Write-Host "📦 Installing required packages..." -ForegroundColor Yellow
    pip install openai
}
# Run the automation script
Write-Host "🤖 Running automated code improvements..." -ForegroundColor Green

# Check if the Python automation script exists
if (-not (Test-Path "ravehouse_automator.py")) {
    Write-Host "❌ Error: ravehouse_automator.py not found in current directory" -ForegroundColor Red
    Write-Host "Please ensure the automation script exists before running" -ForegroundColor Yellow
    exit 1
}

# Execute the Python automation script
Write-Host "🤖 Running Python automation script..." -ForegroundColor Green
& python "ravehouse_automator.py"
$pythonExitCode = $LASTEXITCODE

if ($pythonExitCode -ne 0) {
    Write-Host "❌ Error: Python automation script failed with exit code $pythonExitCode" -ForegroundColor Red
    exit $pythonExitCode
} else {
    Write-Host "✅ Python automation script completed successfully" -ForegroundColor Green
}
# Check for TypeScript errors
Write-Host "Checking TypeScript..." -ForegroundColor Gray
npx tsc --noEmit
$tscFailed = $LASTEXITCODE -ne 0

# Run ESLint
Write-Host "Running ESLint..." -ForegroundColor Gray

# Check git status before ESLint to compare after
$gitStatusBefore = ""
try {
    $gitStatusBefore = & git status --porcelain 2>$null
} catch {
    # Git not available or not a git repo, skip change detection
}

npx eslint src/ --fix
$eslintFailed = $LASTEXITCODE -ne 0

# Check if ESLint made any modifications
$eslintModified = $false
if (-not [string]::IsNullOrEmpty($gitStatusBefore)) {
    try {
        $gitStatusAfter = & git status --porcelain 2>$null
        if ($LASTEXITCODE -eq 0 -and $gitStatusBefore -ne $gitStatusAfter) {
            $eslintModified = $true
        }
    } catch {
        # If git fails, assume no changes detected
    }
}

# Check for security vulnerabilities
Write-Host "Checking for vulnerabilities..." -ForegroundColor Gray
npm audit
$auditFailed = $LASTEXITCODE -ne 0

Write-Host ""
if ($tscFailed -or $eslintFailed -or $auditFailed -or $eslintModified) {
    if ($eslintModified -and -not $eslintFailed) {
        Write-Host "⚠️ Automation complete with file modifications!" -ForegroundColor Yellow
    } else {
        Write-Host "⚠️ Automation complete with warnings!" -ForegroundColor Yellow
    }
    Write-Host ""
    Write-Host "📊 Summary:" -ForegroundColor Cyan
    Write-Host "- Code analysis completed" -ForegroundColor White
    if ($tscFailed) { Write-Host "- TypeScript errors found" -ForegroundColor Red }
    if ($eslintFailed) { Write-Host "- ESLint issues found" -ForegroundColor Red }
    if ($eslintModified -and -not $eslintFailed) { 
        Write-Host "- ESLint automatically fixed code issues" -ForegroundColor Yellow 
        Write-Host "  Files have been modified and need review/commit" -ForegroundColor Yellow
    }
    if ($auditFailed) { Write-Host "- Security vulnerabilities found" -ForegroundColor Red }
    Write-Host ""
    if ($eslintModified -and -not $eslintFailed -and -not $tscFailed -and -not $auditFailed) {
        Write-Host "💡 ESLint made automatic fixes - please review changes and commit" -ForegroundColor Yellow
        Write-Host "Run 'git diff' to see what was modified" -ForegroundColor Cyan
    } else {
        Write-Host "💡 Please fix the issues above before proceeding" -ForegroundColor Yellow
    }
    exit 1
} else {
    Write-Host "✅ Automation complete!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📊 Summary:" -ForegroundColor Cyan
    Write-Host "- Code analysis completed" -ForegroundColor White
    Write-Host "- TypeScript/ESLint checks passed" -ForegroundColor White
    Write-Host "- No security vulnerabilities found" -ForegroundColor White
    Write-Host ""
    Write-Host "💡 Next steps:" -ForegroundColor Yellow
    Write-Host "- Review suggested improvements" -ForegroundColor White
    Write-Host "- Test changes in development" -ForegroundColor White
    Write-Host "- Deploy updates to staging" -ForegroundColor White
}
# Pause to see results
Read-Host "Press Enter to continue..."
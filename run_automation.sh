#!/bin/bash
# Rave House V2 - Automated Code Improvement Script
# Run this script daily or weekly to maintain code quality
#
# USAGE: 
#   export OPENAI_API_KEY="your-api-key-here"
#   ./run_automation.sh
#
# Or provide the API key at runtime:
#   OPENAI_API_KEY="your-api-key" ./run_automation.sh

echo "🎵 Rave House V2 - Starting Automated Improvements..."
echo "=================================================="

# Check if OpenAI API key is set
if [[ -z "${OPENAI_API_KEY}" ]]; then
    echo "❌ ERROR: OPENAI_API_KEY environment variable is not set." >&2
    echo "   Please export your OpenAI API key before running this script:" >&2
    echo "   export OPENAI_API_KEY=\"your-api-key-here\"" >&2
    echo "   ./run_automation.sh" >&2
    exit 1
fi

# Install required Python packages if needed
if ! python -c "import openai" 2>/dev/null; then
    echo "📦 Installing required packages..."
    # Note: OpenAI v2.x has breaking changes from v1.x, ensure automation script is compatible
    pip install openai==2.11.0 || {
        echo "❌ ERROR: Failed to install required packages." >&2
        exit 1
    }
fi

# Run the automation script
echo "🤖 Running automated code improvements..."

# Check if the automation script exists before trying to run it
if [[ ! -f "ravehouse_automator.py" ]]; then
    echo "❌ ERROR: ravehouse_automator.py not found" >&2
    echo "   Please ensure the automation script exists in the current directory" >&2
    exit 1
fi

python ravehouse_automator.py || {
    echo "❌ Automation script failed" >&2
    exit 1
}

# Optional: Run additional checks
echo ""
echo "🔍 Running additional checks..."

# Check for TypeScript errors
echo "Checking TypeScript..."
npx tsc --noEmit || {
    echo "❌ TypeScript errors found" >&2
    exit 1
}

# Run ESLint
echo "Running ESLint..."
npx eslint src/ --fix || {
    echo "⚠️  ESLint issues found" >&2
}

# Check for security vulnerabilities
echo "Checking for vulnerabilities..."
npm audit || {
    echo "⚠️  Security vulnerabilities found" >&2
}

echo ""
echo "✅ Automation complete!"
echo ""
echo "📊 Summary:"
echo "- Code analysis completed"
echo "- Check output above for details"
echo ""
echo "💡 Next steps:"
echo "- Review suggested improvements"
echo "- Test changes in development"
echo "- Deploy updates to staging"
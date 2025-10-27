#!/bin/bash

# Recursively finds and sorts all package.json files in the project

set -e # Exit on any error

echo "🔍 Finding all package.json files..."

# Find all package.json files recursively, excluding node_modules
package_files=$(find . -name "package.json" -not -path "*/node_modules/*" -type f)

if [ -z "$package_files" ]; then
    echo "❌ No package.json files found"
    exit 1
fi

echo "📦 Found package.json files:"
echo "$package_files" | sed 's/^/  /'

echo ""
echo "🔧 Sorting package.json files..."

# Sort each package.json file
for file in $package_files; do
    echo "  Sorting: $file"
    bunx sort-package-json "$file"
done

echo ""
echo "✅ All package.json files have been sorted!"

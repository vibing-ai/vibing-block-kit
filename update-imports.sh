#!/bin/bash

# Find and replace in all code files
find ./docs ./examples ./src -type f -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" | xargs sed -i '' "s/@vibing\/block-kit/@vibing-ai\/block-kit/g"

echo "Imports updated from '@vibing/block-kit' to '@vibing-ai/block-kit'" 
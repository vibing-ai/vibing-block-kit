#!/bin/bash

# Files to update
FILES=(
  "src/blocks/data-block/ChartBlock.tsx"
  "src/blocks/data-block/TableBlock.tsx"
  "src/blocks/media-block/ImageBlock.tsx"
  "src/blocks/media-block/AudioBlock.tsx"
  "src/blocks/text-block/TextBlock.tsx"
  "src/blocks/media-block/VideoBlock.tsx"
)

for file in "${FILES[@]}"
do
  echo "Updating $file..."
  
  # Read the file
  content=$(cat "$file")
  
  # Check if the file imports Text from @heroui/react
  if [[ $content == *"Text"*"from '@heroui/react'"* ]]; then
    # Extract the import line
    import_line=$(grep -E "import.*Text.*from '@heroui/react'" "$file")
    
    # Remove Text from the import
    new_import_line=$(echo "$import_line" | sed -E "s/(import \{[^}]*) Text(, [^}]*\}|\})/\1\2/g" | sed -E "s/import \{ *(.*), *\}/import \{ \1 \}/g" | sed -E "s/import \{ *\}/import \{/g")
    
    # Add new import for Text
    text_import="import { Text } from '../../components/Text';"
    
    # Replace the old import line with the new ones
    sed -i '' "s#$import_line#$new_import_line\n$text_import#g" "$file"
    
    echo "Updated: $file"
  else
    echo "No Text import found in $file"
  fi
done

echo "All files updated!" 
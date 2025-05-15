import { 
  BlockKitProvider,
  TextBlock,
  BlockContainer,
  Surface
} from '@vibing-ai/block-kit';
import { EnhancedCodeBlock } from '../../src/blocks/code-block/EnhancedCodeBlock';

export default function GrokCodeBlockExample() {
  const htmlCode = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sales Lead Form</title>
  <script src="https://cdn.jsdelivr.net/npm/react@18.2.0/umd/react.production.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/react-dom@18.2.0/umd/react-dom.production.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/babel-standalone@7.22.9/babel.min.js"></script>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
  <div id="root"></div>
</body>
</html>`;

  return (
    <BlockKitProvider>
      <Surface className="min-h-screen p-8">
        <BlockContainer id="grok-code-block-example" spacing="lg">
          <TextBlock
            id="welcome"
            heading="Grok-Style Code Block"
            content="This is an example of a code block styled similar to Grok's UI."
          />
          
          <EnhancedCodeBlock
            id="html-code-example"
            language="html"
            code={htmlCode}
          />
          
          <TextBlock
            id="explanation"
            content="The code block above features a language selector, and buttons for preview, collapse, copy, and edit functionality. It's styled with a dark theme similar to Grok's UI."
          />
        </BlockContainer>
      </Surface>
    </BlockKitProvider>
  );
} 
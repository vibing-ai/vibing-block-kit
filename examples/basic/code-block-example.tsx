import { 
  BlockKitProvider,
  TextBlock,
  BlockContainer,
  Surface
} from '@vibing-ai/block-kit';
import { EnhancedCodeBlock } from '../../src/blocks/code-block/EnhancedCodeBlock';

export default function CodeBlockExample() {
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
        <BlockContainer id="code-block-example" spacing="lg">
          <TextBlock
            id="welcome"
            heading="Enhanced Code Block Example"
            content="This is an example of our enhanced code block component, styled similar to Grok's code editor."
          />
          
          <EnhancedCodeBlock
            id="html-code-example"
            language="html"
            code={htmlCode}
          />
          
          <TextBlock
            id="explanation"
            content="The enhanced code block above includes a language selector and interactive buttons for preview, collapse, copy, and edit functionality. It's designed to mimic the code editor interface seen in modern AI tools like Grok."
          />
        </BlockContainer>
      </Surface>
    </BlockKitProvider>
  );
} 
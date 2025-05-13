import { 
  BlockKitProvider,
  TextBlock,
  BlockContainer,
  Surface
} from '@vibing-ai/block-kit';
import { EnhancedCodeBlock } from '../../src/blocks/code-block/EnhancedCodeBlock';

export default function EnhancedCodeBlockExample() {
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

  const jsCode = `function generateGreeting(name) {
  return \`Hello, \${name}! Welcome to our application.\`;
}

// Display a greeting message
document.addEventListener('DOMContentLoaded', function() {
  const userName = "Developer";
  const greetingElement = document.getElementById('greeting');
  
  if (greetingElement) {
    greetingElement.textContent = generateGreeting(userName);
  }
  
  console.log('App initialized successfully!');
});`;

  const pythonCode = `import numpy as np
import matplotlib.pyplot as plt

def generate_data(n=100):
    """Generate sample data for demonstration."""
    x = np.linspace(0, 10, n)
    y = np.sin(x) + 0.1 * np.random.randn(n)
    return x, y

def plot_data(x, y):
    """Plot the data using matplotlib."""
    plt.figure(figsize=(10, 6))
    plt.scatter(x, y, alpha=0.7, label='Data points')
    plt.plot(x, np.sin(x), 'r-', label='True function')
    plt.legend()
    plt.title('Sample Data Visualization')
    plt.xlabel('X axis')
    plt.ylabel('Y axis')
    plt.grid(True, alpha=0.3)
    plt.show()

# Generate and plot sample data
if __name__ == "__main__":
    x_data, y_data = generate_data(200)
    plot_data(x_data, y_data)
    print("Data visualization complete!")`;

  return (
    <BlockKitProvider>
      <Surface className="min-h-screen p-8 bg-background">
        <BlockContainer id="enhanced-code-block-example" spacing="lg">
          <TextBlock
            id="welcome"
            content="Enhanced Code Block Examples"
            variant="heading"
          />
          
          <TextBlock
            id="description"
            content="Below are examples of the enhanced code block component with different languages and options."
          />
          
          <div className="grid grid-cols-1 gap-8">
            <div>
              <TextBlock
                id="html-title"
                content="HTML Example"
                variant="subheading"
              />
              <EnhancedCodeBlock
                id="html-code-example"
                language="html"
                code={htmlCode}
              />
            </div>
            
            <div>
              <TextBlock
                id="js-title"
                content="JavaScript Example"
                variant="subheading"
              />
              <EnhancedCodeBlock
                id="js-code-example"
                language="javascript"
                code={jsCode}
              />
            </div>
            
            <div>
              <TextBlock
                id="python-title"
                content="Python Example (Without Line Numbers)"
                variant="subheading"
              />
              <EnhancedCodeBlock
                id="python-code-example"
                language="python"
                code={pythonCode}
                showLineNumbers={false}
              />
            </div>
          </div>
        </BlockContainer>
      </Surface>
    </BlockKitProvider>
  );
} 
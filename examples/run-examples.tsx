import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BlockKitProvider, Button, TextBlock, BlockContainer } from '@vibing-ai/block-kit';

// Import examples
import BasicUsage from './basic/basic-usage';
import DarkMode from './basic/dark-mode';
import FormExample from './basic/form';
import ResponsiveExample from './basic/responsive';
import App from './basic/app';
import ThemeExample from './advanced/theme-example';

// Define example components with metadata
const examples = [
  { id: 'basic-usage', name: 'Basic Usage', component: BasicUsage },
  { id: 'dark-mode', name: 'Dark Mode', component: DarkMode },
  { id: 'form', name: 'Form Example', component: FormExample },
  { id: 'responsive', name: 'Responsive Example', component: ResponsiveExample },
  { id: 'app', name: 'App with Theme Toggle', component: App },
  { id: 'theme-example', name: 'Advanced Theme Example', component: ThemeExample },
];

function ExampleRunner() {
  const [activeExample, setActiveExample] = useState('basic-usage');

  // Get the active component
  const ActiveComponent = examples.find(ex => ex.id === activeExample)?.component || examples[0].component;

  return (
    <BlockKitProvider>
      <div className="min-h-screen bg-background">
        <header className="p-4 border-b bg-card">
          <TextBlock
            id="title"
            heading="Block Kit Examples"
            content="Select an example to view"
          />
          
          <div className="flex gap-2 overflow-x-auto py-2 flex-wrap">
            {examples.map(example => (
              <Button
                key={example.id}
                variant={activeExample === example.id ? 'default' : 'outline'}
                onClick={() => setActiveExample(example.id)}
                size="sm"
              >
                {example.name}
              </Button>
            ))}
          </div>
        </header>
        
        <main className="p-4">
          <BlockContainer id="example-container" className="mb-8">
            <div className="bg-muted rounded p-2 mb-4">
              <code className="text-sm">Viewing: {examples.find(ex => ex.id === activeExample)?.name}</code>
            </div>
            
            <div className="border rounded-lg overflow-hidden">
              <ActiveComponent />
            </div>
          </BlockContainer>
        </main>
      </div>
    </BlockKitProvider>
  );
}

// Mount the app when the DOM is ready
const mountApp = () => {
  const container = document.getElementById('root');
  if (container) {
    const root = createRoot(container);
    root.render(<ExampleRunner />);
  }
};

// Make sure the DOM is ready before mounting
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountApp);
} else {
  mountApp();
} 
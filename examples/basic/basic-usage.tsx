import React from 'react';
import { 
  BlockKitProvider,
  Button,
  TextBlock,
  BlockContainer,
  Surface,
  VisualBlock
} from '@vibing-ai/block-kit';

export default function BasicUsage() {
  return (
    <BlockKitProvider>
      <Surface className="min-h-screen p-8">
        <BlockContainer id="basic-example" spacing="lg">
          <TextBlock
            id="welcome"
            heading="Welcome to Block Kit"
            content="This is a basic example of Block Kit components integrated with HeroUI."
          />
          
          <VisualBlock
            id="hero-image"
            src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80"
            alt="Library with books"
            width={1200}
            height={600}
            className="rounded-lg shadow-md"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <BlockContainer id="feature-1" spacing="md" className="p-4 bg-card rounded-lg border shadow-sm">
              <TextBlock
                id="feature-1-text"
                heading="Responsive Design"
                content="All components are designed to be responsive and work well on all screen sizes."
              />
              <Button>Learn More</Button>
            </BlockContainer>
            
            <BlockContainer id="feature-2" spacing="md" className="p-4 bg-card rounded-lg border shadow-sm">
              <TextBlock
                id="feature-2-text"
                heading="HeroUI Integration"
                content="Block Kit seamlessly integrates with HeroUI's design system and themes."
              />
              <div className="flex gap-2">
                <Button variant="outline">Documentation</Button>
                <Button variant="secondary">Examples</Button>
              </div>
            </BlockContainer>
          </div>
          
          <BlockContainer id="more-info" spacing="md" className="p-4 bg-card rounded-lg border shadow-sm">
            <TextBlock
              id="more-info-text"
              heading="Get Started"
              content="To get started with Block Kit, check out our documentation and examples."
            />
            
            <div className="flex flex-wrap gap-3">
              <Button variant="default">Get Started</Button>
              <Button variant="outline">Documentation</Button>
              <Button variant="ghost">GitHub</Button>
              <Button variant="destructive">Report Issue</Button>
              <Button variant="secondary">Examples</Button>
              <Button variant="link">Community</Button>
            </div>
          </BlockContainer>
        </BlockContainer>
      </Surface>
    </BlockKitProvider>
  );
} 
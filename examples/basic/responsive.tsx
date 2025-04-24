import React from 'react';
import { 
  BlockKitProvider,
  TextBlock,
  BlockContainer,
  Surface,
  VisualBlock,
  Button,
  ActionBlock
} from '@vibing/block-kit';

export default function ResponsiveExample() {
  return (
    <BlockKitProvider>
      <Surface className="min-h-screen">
        {/* Header Section */}
        <BlockContainer id="header" className="w-full p-4 md:p-8 bg-primary text-primary-foreground">
          <TextBlock
            id="header-text"
            heading="Responsive Design with Block Kit"
            content="This example demonstrates how to create responsive layouts using Block Kit components."
            headingClassName="text-xl md:text-3xl font-bold"
            contentClassName="text-sm md:text-base max-w-2xl"
          />
        </BlockContainer>

        {/* Main Content */}
        <BlockContainer id="main-content" className="p-4 md:p-8" spacing="xl">
          {/* Responsive Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {/* Card 1 */}
            <BlockContainer 
              id="card-1" 
              className="p-4 bg-card rounded-lg border shadow-sm"
              spacing="md"
            >
              <TextBlock
                id="card-1-heading"
                heading="Mobile First"
                content="Designed to work on all screen sizes, starting with mobile."
              />
              <Button className="w-full sm:w-auto">Learn More</Button>
            </BlockContainer>

            {/* Card 2 */}
            <BlockContainer 
              id="card-2" 
              className="p-4 bg-card rounded-lg border shadow-sm"
              spacing="md"
            >
              <TextBlock
                id="card-2-heading"
                heading="Flexible Layouts"
                content="Create adaptable layouts using grid and flex containers."
              />
              <Button variant="secondary" className="w-full sm:w-auto">View Examples</Button>
            </BlockContainer>

            {/* Card 3 */}
            <BlockContainer 
              id="card-3" 
              className="p-4 bg-card rounded-lg border shadow-sm md:col-span-2 lg:col-span-1"
              spacing="md"
            >
              <TextBlock
                id="card-3-heading"
                heading="Responsive Components"
                content="Each component adapts to its container and screen size."
              />
              <Button variant="outline" className="w-full sm:w-auto">Component Guide</Button>
            </BlockContainer>
          </div>

          {/* Responsive Visual Block */}
          <div className="flex flex-col md:flex-row gap-6">
            <VisualBlock
              id="responsive-image"
              src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80"
              alt="Responsive design showcase"
              width={1200}
              height={800}
              className="rounded-lg shadow-md w-full md:w-1/2"
            />
            
            <BlockContainer id="side-content" spacing="md" className="w-full md:w-1/2">
              <TextBlock
                id="side-text"
                heading="Adaptive Content"
                content="Content layout changes based on screen size to provide the best experience on each device."
              />
              
              <div className="flex flex-col sm:flex-row gap-2">
                <Button variant="default" className="w-full sm:w-auto">Desktop View</Button>
                <Button variant="outline" className="w-full sm:w-auto">Tablet View</Button>
                <Button variant="secondary" className="w-full sm:w-auto">Mobile View</Button>
              </div>
            </BlockContainer>
          </div>
          
          {/* Responsive Call to Action */}
          <ActionBlock
            id="cta"
            className="w-full p-6 bg-muted rounded-lg text-center"
            heading="Ready to build responsive interfaces?"
            content="Get started with Block Kit and create beautiful, responsive UIs for your applications."
            actions={
              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <Button size="lg" className="w-full sm:w-auto">Get Started</Button>
                <Button variant="outline" size="lg" className="w-full sm:w-auto">View Documentation</Button>
              </div>
            }
            headingClassName="text-xl md:text-2xl font-bold"
            contentClassName="max-w-2xl mx-auto"
          />
        </BlockContainer>
      </Surface>
    </BlockKitProvider>
  );
} 
import { 
  BlockKitProvider,
  TextBlock,
  BlockContainer,
  Surface,
  VisualBlock,
  Button,
  ActionBlock
} from '@vibing-ai/block-kit';

const HeaderSection = () => (
  <BlockContainer id="header" className="w-full p-4 md:p-8 bg-primary text-primary-foreground">
    <TextBlock
      id="header-text"
      heading="Responsive Design with Block Kit"
      content="This example demonstrates how to create responsive layouts using Block Kit components."
      headingClassName="text-xl md:text-3xl font-bold"
      contentClassName="text-sm md:text-base max-w-2xl"
    />
  </BlockContainer>
);

interface FeatureCardProps {
  id: string;
  heading: string;
  content: string;
  buttonText: string;
  buttonVariant?: "default" | "link" | "destructive" | "outline" | "secondary" | "ghost" | "primary";
}

const FeatureCard = ({ id, heading, content, buttonText, buttonVariant = "default" }: FeatureCardProps) => (
  <BlockContainer 
    id={id} 
    className="p-4 bg-card rounded-lg border shadow-sm"
    spacing="md"
  >
    <TextBlock
      id={`${id}-heading`}
      heading={heading}
      content={content}
    />
    <Button variant={buttonVariant} className="w-full sm:w-auto">{buttonText}</Button>
  </BlockContainer>
);

const ResponsiveVisualSection = () => (
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
);

const CallToAction = () => (
  <BlockContainer
    id="cta"
    className="w-full p-6 bg-muted rounded-lg text-center"
    spacing="md"
  >
    <TextBlock
      id="cta-text"
      heading="Ready to build responsive interfaces?"
      content="Get started with Block Kit and create beautiful, responsive UIs for your applications."
      headingClassName="text-xl md:text-2xl font-bold"
      contentClassName="max-w-2xl mx-auto"
    />
    
    <ActionBlock id="cta-actions">
      <div className="flex flex-col sm:flex-row justify-center gap-3">
        <Button size="lg" className="w-full sm:w-auto">Get Started</Button>
        <Button variant="outline" size="lg" className="w-full sm:w-auto">View Documentation</Button>
      </div>
    </ActionBlock>
  </BlockContainer>
);

export default function ResponsiveExample() {
  return (
    <BlockKitProvider>
      <Surface className="min-h-screen">
        <HeaderSection />

        {/* Main Content */}
        <BlockContainer id="main-content" className="p-4 md:p-8" spacing="xl">
          {/* Responsive Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <FeatureCard 
              id="card-1"
              heading="Mobile First"
              content="Designed to work on all screen sizes, starting with mobile."
              buttonText="Learn More"
            />
            
            <FeatureCard 
              id="card-2"
              heading="Flexible Layouts"
              content="Create adaptable layouts using grid and flex containers."
              buttonText="View Examples"
              buttonVariant="secondary"
            />
            
            <FeatureCard 
              id="card-3"
              heading="Responsive Components"
              content="Each component adapts to its container and screen size."
              buttonText="Component Guide"
              buttonVariant="outline"
            />
          </div>

          <ResponsiveVisualSection />
          <CallToAction />
        </BlockContainer>
      </Surface>
    </BlockKitProvider>
  );
} 
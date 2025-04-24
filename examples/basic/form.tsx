import React, { useState } from 'react';
import { 
  BlockKitProvider,
  TextBlock,
  BlockContainer,
  Surface,
  Button,
  ActionBlock,
  InputBlock
} from '@vibing/block-kit';

export default function FormExample() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    subscription: false
  });
  
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    error: false
  });
  
  const handleChange = (field: string, value: string | boolean) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setTimeout(() => {
      setFormStatus({
        submitted: true,
        error: false
      });
    }, 1000);
  };
  
  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
      subscription: false
    });
    setFormStatus({
      submitted: false,
      error: false
    });
  };

  return (
    <BlockKitProvider>
      <Surface className="min-h-screen p-4">
        <BlockContainer className="max-w-2xl mx-auto py-8" spacing="xl">
          <TextBlock
            id="form-title"
            heading="Contact Form Example"
            content="This demonstrates how to build interactive forms using Block Kit components."
            headingClassName="text-3xl font-bold text-center"
            contentClassName="text-center text-muted-foreground"
          />
          
          {formStatus.submitted ? (
            <BlockContainer 
              id="success-message" 
              className="p-6 border rounded-lg bg-green-50 text-green-700"
              spacing="md"
            >
              <TextBlock
                id="thank-you"
                heading="Thank You for Your Submission!"
                content="We have received your message and will get back to you soon."
                headingClassName="text-xl font-semibold"
              />
              <ActionBlock id="form-actions" className="flex justify-center">
                <Button onClick={resetForm} variant="outline">
                  Submit Another Response
                </Button>
              </ActionBlock>
            </BlockContainer>
          ) : (
            <BlockContainer 
              id="contact-form" 
              className="p-6 border rounded-lg shadow-sm"
              spacing="lg" 
              as="form" 
              onSubmit={handleSubmit}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputBlock
                  id="name-input"
                  label="Name"
                  type="text"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(value) => handleChange('name', value)}
                  required
                  className="w-full"
                />
                
                <InputBlock
                  id="email-input"
                  label="Email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(value) => handleChange('email', value)}
                  required
                  className="w-full"
                />
              </div>
              
              <InputBlock
                id="subject-input"
                label="Subject"
                type="text"
                placeholder="What is this regarding?"
                value={formData.subject}
                onChange={(value) => handleChange('subject', value)}
                required
                className="w-full"
              />
              
              <InputBlock
                id="message-input"
                label="Message"
                type="textarea"
                placeholder="Please provide details about your inquiry..."
                value={formData.message}
                onChange={(value) => handleChange('message', value)}
                required
                className="w-full"
              />
              
              <InputBlock
                id="subscription-input"
                label="Subscribe to newsletter"
                description="Receive updates and news about our products"
                type="checkbox"
                checked={formData.subscription}
                onChange={(value) => handleChange('subscription', value)}
              />
              
              <ActionBlock id="form-actions" className="flex gap-4 justify-end">
                <Button type="button" variant="outline" onClick={resetForm}>
                  Reset
                </Button>
                <Button type="submit" variant="default">
                  Submit
                </Button>
              </ActionBlock>
            </BlockContainer>
          )}
          
          <TextBlock
            id="form-info"
            content="This form example demonstrates how to combine Block Kit components to create interactive forms with validation, state management, and responsive layouts."
            contentClassName="text-sm text-muted-foreground"
          />
        </BlockContainer>
      </Surface>
    </BlockKitProvider>
  );
}
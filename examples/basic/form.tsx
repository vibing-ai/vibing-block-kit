import React, { useState, FormEvent } from 'react';
import { 
  BlockKitProvider,
  TextBlock,
  BlockContainer,
  Surface,
  Button,
  ActionBlock,
  InputBlock
} from '@vibing-ai/block-kit';

// Define types for our form
interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  subscription: boolean;
}

interface FormStatus {
  submitted: boolean;
  error: boolean;
}

// Split the form example into smaller components to improve readability
export default function FormExample() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
    subscription: false
  });
  
  const [formStatus, setFormStatus] = useState<FormStatus>({
    submitted: false,
    error: false
  });
  
  const handleChange = (field: string, value: string | boolean) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };
  
  const handleSubmit = (e: FormEvent) => {
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
        <BlockContainer id="form-container" className="max-w-2xl mx-auto py-8" spacing="xl">
          <FormHeader />
          
          {formStatus.submitted ? (
            <SuccessMessage onReset={resetForm} />
          ) : (
            <FormContent 
              formData={formData}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              resetForm={resetForm}
            />
          )}
          
          <FormFooter />
        </BlockContainer>
      </Surface>
    </BlockKitProvider>
  );
}

// Header component with title and description
function FormHeader() {
  return (
    <TextBlock
      id="form-title"
      heading="Contact Form Example"
      content="This demonstrates how to build interactive forms using Block Kit components."
      headingClassName="text-3xl font-bold text-center"
      contentClassName="text-center text-muted-foreground"
    />
  );
}

// Success message shown after form submission
function SuccessMessage({ onReset }: { onReset: () => void }) {
  return (
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
        <Button onClick={onReset} variant="outline">
          Submit Another Response
        </Button>
      </ActionBlock>
    </BlockContainer>
  );
}

interface FormContentProps {
  formData: FormData;
  handleChange: (field: string, value: string | boolean) => void;
  handleSubmit: (e: FormEvent) => void;
  resetForm: () => void;
}

// Main form content
function FormContent({ formData, handleChange, handleSubmit, resetForm }: FormContentProps) {
  // Use type assertion to work around the type mismatch
  const nameHandler = ((...args: any[]) => {
    if (args.length === 2) {
      const [_id, data] = args;
      handleChange('name', data.value);
    }
  }) as any;
  
  const emailHandler = ((...args: any[]) => {
    if (args.length === 2) {
      const [_id, data] = args;
      handleChange('email', data.value);
    }
  }) as any;
  
  const subjectHandler = ((...args: any[]) => {
    if (args.length === 2) {
      const [_id, data] = args;
      handleChange('subject', data.value);
    }
  }) as any;
  
  const messageHandler = ((...args: any[]) => {
    if (args.length === 2) {
      const [_id, data] = args;
      handleChange('message', data.value);
    }
  }) as any;
  
  const subscriptionHandler = ((...args: any[]) => {
    if (args.length === 2) {
      const [_id, data] = args;
      handleChange('subscription', data.value);
    }
  }) as any;

  return (
    <BlockContainer 
      id="contact-form" 
      className="p-6 border rounded-lg shadow-sm"
      spacing="lg" 
      as="form" 
      onSubmit={handleSubmit}
    >
      {/* Name and Email fields in a grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputBlock
          id="name-input"
          type="text"
          label="Name"
          placeholder="Your name"
          value={formData.name}
          onChange={nameHandler}
          required
          className="w-full"
        />
        
        <InputBlock
          id="email-input"
          type="email"
          label="Email"
          placeholder="your.email@example.com"
          value={formData.email}
          onChange={emailHandler}
          required
          className="w-full"
        />
      </div>
      
      {/* Subject field */}
      <InputBlock
        id="subject-input"
        type="text"
        label="Subject"
        placeholder="What is this regarding?"
        value={formData.subject}
        onChange={subjectHandler}
        required
        className="w-full"
      />
      
      {/* Message field (textarea) */}
      <InputBlock
        id="message-input"
        type="textarea"
        label="Message"
        placeholder="Please provide details about your inquiry..."
        value={formData.message}
        onChange={messageHandler}
        required
        className="w-full"
      />
      
      {/* Checkbox for newsletter subscription */}
      <InputBlock
        id="subscription-input"
        type="checkbox"
        label="Subscribe to newsletter"
        checked={formData.subscription}
        onChange={subscriptionHandler}
        className="w-full"
      />
      
      {/* Form action buttons */}
      <ActionBlock id="form-actions" className="flex gap-4 justify-end">
        <Button type="button" variant="outline" onClick={resetForm}>
          Reset
        </Button>
        <Button type="submit" variant="default">
          Submit
        </Button>
      </ActionBlock>
    </BlockContainer>
  );
}

// Form footer with additional information
function FormFooter() {
  return (
    <TextBlock
      id="form-info"
      content="This form example demonstrates how to combine Block Kit components to create interactive forms with validation, state management, and responsive layouts."
      contentClassName="text-sm text-muted-foreground"
    />
  );
}
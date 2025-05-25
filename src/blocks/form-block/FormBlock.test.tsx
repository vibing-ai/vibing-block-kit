/// <reference types="vitest" />
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { test, expect, vi } from 'vitest';
import FormBlock, { FormField } from './FormBlock';

const fields: FormField[] = [
  { id: 'firstName', type: 'text', label: 'First Name', required: true },
  { id: 'email', type: 'email', label: 'Email', required: true },
  { id: 'selectInput', type: 'select', label: 'Select Input', options: [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
  ]},
  { id: 'radioInput', type: 'radio', label: 'Radio Input', options: [
    { label: 'Yes', value: 'yes' },
    { label: 'No', value: 'no' },
  ]},
];

test('renders form fields', () => {
  render(<FormBlock fields={fields} onSubmit={vi.fn()} />);
  
  // Check required fields
  expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
  
  // Check select and radio options
  expect(screen.getByLabelText(/Select Input/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Yes/i)).toBeInTheDocument();
});

test('validates required fields', async () => {
  render(<FormBlock fields={fields} onSubmit={vi.fn()} />);
  fireEvent.click(screen.getByRole('button', { name: /submit/i }));
  
  await waitFor(() => {
    const errorMessages = screen.getAllByText('This field is required');
    expect(errorMessages).toHaveLength(2); // First Name and Email are required
  });
});

test('validates email format', async () => {
  render(<FormBlock fields={fields} onSubmit={vi.fn()} />);
  
  fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'invalid-email' } });
  fireEvent.click(screen.getByRole('button', { name: /submit/i }));
  
  await waitFor(() => {
    expect(screen.getByText('Constraints not satisfied')).toBeInTheDocument();
  });
});

test('submits form with valid data', async () => {
  const handleSubmit = vi.fn();
  render(<FormBlock fields={fields} onSubmit={handleSubmit} />);
  
  // Fill in required fields
  fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'John' } });
  fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john@example.com' } });
  
  // Submit form
  fireEvent.click(screen.getByRole('button', { name: /submit/i }));
  
  await waitFor(() => {
    expect(handleSubmit).toHaveBeenCalledWith({
      firstName: 'John',
      email: 'john@example.com',
    });
  });
});

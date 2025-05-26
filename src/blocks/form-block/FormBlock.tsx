import React, { useState } from 'react';
import { Button, Input, DatePicker } from '@heroui/react';
import { DateValue } from '@react-types/datepicker';

export type FormFieldType = 'text' | 'email' | 'date' | 'select' | 'checkbox' | 'radio' | 'textarea';

export interface FormField {
  id: string;
  type: FormFieldType;
  label: string;
  required?: boolean;
  placeholder?: string;
  options?: { label: string; value: string; disabled?: boolean }[];
}

export interface FormBlockProps {
  id?: string;
  fields: FormField[];
  onSubmit: (data: Record<string, string | boolean | DateValue | null>) => Promise<void> | void;
  submitText?: string;
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function renderField(
  field: FormField,
  formData: Record<string, string | boolean | DateValue | null>,
  handleChange: (fieldId: string, value: string | boolean | DateValue | null) => void
) {
  switch (field.type) {
    case 'text':
    case 'email':
      return <Input
        id={field.id}
        type={field.type}
        value={formData[field.id] as string || ''}
        onChange={e => handleChange(field.id, e.target.value)}
        placeholder={field.placeholder}
        fullWidth
      />;
    case 'select':
      return <select
        id={field.id}
        value={formData[field.id] as string || ''}
        onChange={(e) => handleChange(field.id, e.target.value)}
      >
        {field.placeholder && (
          <option value="" disabled>
            {field.placeholder}
          </option>
        )}
        {field.options?.map((option: { label: string; value: string; disabled?: boolean }) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>;
    case 'checkbox':
      return <label className="flex items-center">
        <input
          type="checkbox"
          checked={!!formData[field.id]}
          onChange={e => handleChange(field.id, e.target.checked)}
          placeholder={field.placeholder}
        />
        <span className="ml-2">{field.options?.[0]?.label}</span>
      </label>;
    case 'radio':
      return <div>
        {field.options?.map((option: { label: string; value: string; disabled?: boolean }) => (
          <label key={option.value} className="flex items-center">
            <input
              type="radio"
              value={option.value}
              checked={formData[field.id] === option.value}
              onChange={(e) => handleChange(field.id, e.target.value)}
              placeholder={field.placeholder}
            />
            <span className="ml-2">{option.label}</span>
          </label>
        ))}
      </div>;
    case 'date':
      return <DatePicker
        id={field.id}
        value={formData[field.id] as DateValue | null}
        onChange={(val) => handleChange(field.id, val)}
        fullWidth
      />;
    default:
      return <Input
        id={field.id}
        type={field.type}
        value={formData[field.id] as string || ''}
        onChange={e => handleChange(field.id, e.target.value)}
        placeholder={field.placeholder}
        fullWidth
      />;
  }
}

function validateRequired(field: FormField, value: string | boolean | DateValue | null) {
  if (field.required && (!value || (typeof value === 'string' && value.trim() === ''))) {
    return 'This field is required';
  }
  return undefined;
}

function validateEmail(field: FormField, value: string | boolean | DateValue | null) {
  if (field.type === 'email' && value && typeof value === 'string' && !emailPattern.test(value)) {
    return 'Please enter a valid email address';
  }
  return undefined;
}

function getFieldError(field: FormField, value: string | boolean | DateValue | null) {
  return (
    validateRequired(field, value) ||
    validateEmail(field, value)
    // || ...other validators
  );
}

export const FormBlock: React.FC<FormBlockProps> = ({
  id,
  fields,
  onSubmit,
  submitText = 'Submit',
}) => {
  const [formData, setFormData] = useState<Record<string, string | boolean | DateValue | null>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (fieldId: string, value: string | boolean | DateValue | null) => {
    setFormData((prev) => ({ ...prev, [fieldId]: value }));
    setErrors((prev) => ({ ...prev, [fieldId]: '' }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    fields.forEach((field) => {
      const value = formData[field.id];
      const error = getFieldError(field, value);
      if (error) newErrors[field.id] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      id={id}
      onSubmit={handleSubmit}
      className="form-block max-w-lg mx-auto p-6 bg-white rounded shadow"
    >
      <h2 className="text-2xl font-bold mb-4">Registration Form</h2>
      <p className="mb-6 text-gray-600">
        Welcome! Please complete the form below.
      </p>
      {fields.map(field => (
        <div key={field.id}>
          <div className="mb-5">
            <label htmlFor={field.id} className="block font-medium mb-1">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            {renderField(field, formData, handleChange)}
            {errors[field.id] && (
              <p className="text-red-500 text-sm mt-1">{errors[field.id]}</p>
            )}
          </div>
        </div>
      ))}
      <Button
        type="submit"
        variant="solid"
        isLoading={isSubmitting}
        fullWidth
      >
        {submitText}
      </Button>
    </form>
  );
};

export default FormBlock;

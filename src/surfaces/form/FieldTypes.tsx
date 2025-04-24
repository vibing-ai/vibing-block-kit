import React from 'react';

export enum FieldType {
  Text = 'text',
  TextArea = 'textarea',
  Number = 'number',
  Email = 'email',
  Password = 'password',
  Select = 'select',
  MultiSelect = 'multiselect',
  Checkbox = 'checkbox',
  Radio = 'radio',
  Date = 'date',
  Time = 'time',
  DateTime = 'datetime',
  File = 'file',
  Color = 'color',
  Range = 'range',
  Hidden = 'hidden',
}

export interface FieldOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

export interface FieldValidation {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  pattern?: string;
  customValidator?: (value: any) => string | null;
}

export interface FieldConfig {
  id: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  helpText?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  defaultValue?: any;
  options?: FieldOption[]; // For select, multiselect, radio, checkbox
  validation?: FieldValidation;
  dependencies?: string[]; // Fields that this field depends on
  conditionalDisplay?: (formData: Record<string, any>) => boolean;
}

interface FieldProps {
  field: FieldConfig;
  value: any;
  onChange: (value: any) => void;
  error?: string;
}

/**
 * Text input field component
 */
export const TextField: React.FC<FieldProps> = ({
  field,
  value,
  onChange,
  error,
}) => {
  return (
    <input
      type="text"
      id={field.id}
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      placeholder={field.placeholder}
      disabled={field.disabled}
      readOnly={field.readOnly}
      className={`
        w-full px-3 py-2 border rounded-md shadow-sm
        ${error ? 'border-red-500' : 'border-gray-300'}
        ${field.disabled ? 'bg-gray-100' : ''}
        focus:outline-none focus:ring-blue-500 focus:border-blue-500
      `}
    />
  );
};

/**
 * Textarea field component
 */
export const TextAreaField: React.FC<FieldProps> = ({
  field,
  value,
  onChange,
  error,
}) => {
  return (
    <textarea
      id={field.id}
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      placeholder={field.placeholder}
      disabled={field.disabled}
      readOnly={field.readOnly}
      className={`
        w-full px-3 py-2 border rounded-md shadow-sm
        ${error ? 'border-red-500' : 'border-gray-300'}
        ${field.disabled ? 'bg-gray-100' : ''}
        focus:outline-none focus:ring-blue-500 focus:border-blue-500
      `}
      rows={4}
    />
  );
};

/**
 * Select field component
 */
export const SelectField: React.FC<FieldProps> = ({
  field,
  value,
  onChange,
  error,
}) => {
  return (
    <select
      id={field.id}
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      disabled={field.disabled}
      className={`
        w-full px-3 py-2 border rounded-md shadow-sm
        ${error ? 'border-red-500' : 'border-gray-300'}
        ${field.disabled ? 'bg-gray-100' : ''}
        focus:outline-none focus:ring-blue-500 focus:border-blue-500
      `}
    >
      <option value="">Select an option</option>
      {field.options?.map((option) => (
        <option
          key={option.value.toString()}
          value={option.value.toString()}
          disabled={option.disabled}
        >
          {option.label}
        </option>
      ))}
    </select>
  );
}; 
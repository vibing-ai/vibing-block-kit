import React from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BlockProps } from '../../types';

export interface FormField {
  id: string;
  type: 'text' | 'textarea' | 'select' | 'checkbox' | 'radio';
  label: string;
  value: string | boolean;
  options?: { label: string; value: string }[];
  required?: boolean;
  placeholder?: string;
  description?: string;
  disabled?: boolean;
  validation?: Record<string, unknown>;
}

export interface FormBlockProps extends BlockProps {
  fields: FormField[];
  submitLabel?: string;
  cancelLabel?: string;
  onSubmit?: (data: Record<string, unknown>) => void;
  onCancel?: () => void;
}

export const FormBlock: React.FC<FormBlockProps> = ({
  id,
  fields,
  submitLabel = 'Submit',
  cancelLabel = 'Cancel',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  
  
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  onSubmit,
  onCancel,
  className,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onChange,
  ...props
}) => {
  // Placeholder implementation
  return (
    <div 
      className={`block-kit-form-block ${className || ''}`}
      data-block-id={id}
      {...props}
    >
      <form className="space-y-4">
        {fields.map((field) => (
          <div key={field.id} className="form-field">
            <label className="block text-sm font-medium text-gray-700">{field.label}</label>
            <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
          </div>
        ))}
        
        <div className="flex justify-end space-x-2 pt-4">
          {cancelLabel && (
            <button 
              type="button" 
              className="inline-flex justify-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium shadow-sm hover:bg-gray-50"
              onClick={onCancel}
            >
              {cancelLabel}
            </button>
          )}
          <button 
            type="submit" 
            className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
          >
            {submitLabel}
          </button>
        </div>
      </form>
    </div>
  );
}; 
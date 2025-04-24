import React, { useState } from 'react';
import { FieldType, FieldConfig } from './FieldTypes';

interface FormBuilderProps {
  fields: FieldConfig[];
  onSubmit?: (data: Record<string, any>) => void;
  onChange?: (data: Record<string, any>) => void;
  initialValues?: Record<string, any>;
  submitLabel?: string;
  cancelLabel?: string;
  onCancel?: () => void;
  className?: string;
}

/**
 * Form builder component for creating dynamic forms
 */
export const FormBuilder: React.FC<FormBuilderProps> = ({
  fields,
  onSubmit,
  onChange,
  initialValues = {},
  submitLabel = 'Submit',
  cancelLabel = 'Cancel',
  onCancel,
  className = '',
}) => {
  const [formData, setFormData] = useState<Record<string, any>>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const handleFieldChange = (fieldId: string, value: any) => {
    const newFormData = {
      ...formData,
      [fieldId]: value,
    };
    
    setFormData(newFormData);
    
    if (onChange) {
      onChange(newFormData);
    }
    
    // Clear error for this field if any
    if (errors[fieldId]) {
      setErrors({
        ...errors,
        [fieldId]: '',
      });
    }
  };
  
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    let isValid = true;
    
    fields.forEach(field => {
      if (field.required && (formData[field.id] === undefined || formData[field.id] === '')) {
        newErrors[field.id] = 'This field is required';
        isValid = false;
      }
      
      // Add more validation as needed
    });
    
    setErrors(newErrors);
    return isValid;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm() && onSubmit) {
      onSubmit(formData);
    }
  };
  
  return (
    <form 
      className={`space-y-4 ${className}`} 
      onSubmit={handleSubmit}
    >
      {fields.map(field => (
        <div key={field.id} className="space-y-1">
          <label 
            htmlFor={field.id} 
            className="block text-sm font-medium text-gray-700"
          >
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </label>
          
          {/* Placeholder for different field types */}
          <input
            type="text"
            id={field.id}
            name={field.id}
            value={formData[field.id] || ''}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            className={`
              block w-full px-3 py-2 border rounded-md shadow-sm 
              ${errors[field.id] ? 'border-red-500' : 'border-gray-300'}
              focus:outline-none focus:ring-blue-500 focus:border-blue-500
            `}
            placeholder={field.placeholder}
            required={field.required}
          />
          
          {errors[field.id] && (
            <p className="text-red-500 text-xs mt-1">{errors[field.id]}</p>
          )}
          
          {field.helpText && (
            <p className="text-gray-500 text-xs mt-1">{field.helpText}</p>
          )}
        </div>
      ))}
      
      <div className="flex justify-end space-x-3 pt-4">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            {cancelLabel}
          </button>
        )}
        
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
}; 
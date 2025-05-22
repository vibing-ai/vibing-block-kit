import React, { useState, useEffect } from 'react';
import { 
  Input, 
  Textarea, 
  Select, 
  Checkbox, 
  Radio,
  Form,
  DatePicker
} from '@heroui/react';
import { BlockProps, BlockData } from '../../types';

export interface FormField {
  id: string;
  type: 'text' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'date' | 'number' | 'email' | 'password' | 'tel' | 'url' | 'color' | 'file' | 'hidden' | 'range';
  label: string;
  name?: string;
  value?: string | boolean | string[] | null;
  options?: { label: string; value: string }[];
  required?: boolean;
  placeholder?: string;
  helpText?: string;
  disabled?: boolean;
  readOnly?: boolean;
  pattern?: string;
  patternMessage?: string;
  min?: number | string;
  max?: string | number;
  step?: string | number;
  multiple?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  width?: number | 'full';
  aria?: Record<string, string>;
  validate?: (value: unknown, formValues: Record<string, unknown>) => string | undefined | null;
}

export interface FormBlockProps extends BlockProps {
  /**
   * Configuration for the form fields
   */
  fields: FormField[];
  
  /**
   * Initial values for the form
   */
  initialValues?: Record<string, unknown>;
  
  /**
   * Submit button label
   */
  submitLabel?: string;
  
  /**
   * Cancel button label (if provided, a cancel button will be shown)
   */
  cancelLabel?: string;
  
  /**
   * Form validation mode
   */
  validationMode?: 'onBlur' | 'onChange' | 'onSubmit';
  
  /**
   * Custom form submission handler
   */
  onSubmit?: (data: Record<string, unknown>) => void | Promise<void>;
  
  /**
   * Cancel button click handler
   */
  onCancel?: () => void;
  
  /**
   * Form loading state
   */
  isLoading?: boolean;
  
  /**
   * Form-level error message
   */
  error?: string;
  
  /**
   * Success message to display after successful submission
   */
  successMessage?: string;
  
  /**
   * Layout direction for the form
   */
  layout?: 'vertical' | 'horizontal' | 'grid';
  
  /**
   * Number of columns for grid layout
   */
  gridColumns?: number;
  
  /**
   * Spacing between form elements
   */
  spacing?: 'sm' | 'md' | 'lg';
}

export const FormBlock: React.FC<FormBlockProps> = ({
  id,
  fields,
  initialValues = {},
  submitLabel = 'Submit',
  cancelLabel,
  validationMode = 'onSubmit',
  onSubmit,
  onCancel,
  isLoading = false,
  error,
  successMessage,
  layout = 'vertical',
  gridColumns = 2,
  spacing = 'md',
  className,
  onChange,
  ...props
}) => {
  // Form state
  const [formData, setFormData] = useState<Record<string, unknown>>(initialValues);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const [isSubmitted, setIsSubmitted] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  
  // Reset form state when initial values change
  useEffect(() => {
    setFormData(initialValues);
  }, [initialValues]);
  
  // Handle field change
  const handleFieldChange = (fieldId: string, value: unknown) => {
    const newFormData = {
      ...formData,
      [fieldId]: value
    };
    
    setFormData(newFormData);
    
    // Clear field error if validation mode is onChange
    if (validationMode === 'onChange') {
      const field = fields.find(f => f.id === fieldId);
      if (field) {
        const errorMessage = validateField(field, value, formData);
        
        // Update form errors
        setFormErrors(prev => {
          const newErrors = { ...prev };
          if (errorMessage) {
            newErrors[fieldId] = errorMessage;
          } else {
            delete newErrors[fieldId];
          }
          return newErrors;
        });
      }
    }
    
    // Notify parent component of changes
    if (onChange) {
      onChange(id, newFormData as BlockData);
    }
  };
  
  // Validate required field
  const validateRequired = (value: unknown): boolean => {
    return !(value === undefined || value === null || value === '');
  };

  // Validate pattern for string fields
  const validatePattern = (pattern: string, value: unknown): boolean => {
    return typeof value === 'string' && new RegExp(pattern).test(value);
  };

  // Validate all fields
  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors: Record<string, string> = {};
    
    fields.forEach(field => {
      const value = formData[field.id];
      
      // Required validation
      if (field.required && !validateRequired(value)) {
        newErrors[field.id] = 'This field is required';
        isValid = false;
      }
      
      // Pattern validation
      else if (field.pattern && !validatePattern(field.pattern, value)) {
        newErrors[field.id] = field.patternMessage || 'Invalid format';
        isValid = false;
      }
      
      // Custom validation
      else if (field.validate) {
        const errorMessage = field.validate(value, formData);
        if (errorMessage) {
          newErrors[field.id] = errorMessage;
          isValid = false;
        }
      }
    });
    
    setFormErrors(newErrors);
    return isValid;
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    
    // Validate all fields
    const isValid = validateForm();
    
    if (isValid) {
      try {
        if (onSubmit) {
          await onSubmit(formData);
        }
        setFormSuccess(true);
      } catch (error) {
        setFormSuccess(false);
      }
    }
    
    setIsSubmitting(false);
  };
  
  // Get spacing class based on spacing prop
  const getSpacingClass = () => {
    switch (spacing) {
      case 'sm': return 'space-y-2';
      case 'lg': return 'space-y-6';
      case 'md':
      default: return 'space-y-4';
    }
  };
  
  // Get layout class based on layout prop
  const getLayoutClass = () => {
    switch (layout) {
      case 'horizontal':
        return 'flex flex-wrap items-start -mx-2';
      case 'grid':
        return `grid grid-cols-1 md:grid-cols-${gridColumns} gap-4`;
      case 'vertical':
      default:
        return getSpacingClass();
    }
  };
  
  // Render input field based on type
  const renderField = (field: FormField) => {
    const fieldId = `field-${field.id}`;
    const fieldValue = formData[field.id];
    const errorMessage = formErrors[field.id];
    
    // Wrapper class based on layout
    const getFieldWrapperClass = () => {
      if (layout === 'horizontal') {
        return 'px-2 mb-4 ' + (field.width === 'full' ? 'w-full' : `w-1/2`);
      } else if (layout === 'grid') {
        return '';
      } else {
        return 'mb-4';
      }
    };
    
    // Text field (text, email, password, etc.)
    if (['text', 'email', 'password', 'tel', 'number', 'url', 'color', 'range'].includes(field.type)) {
      return (
        <div key={field.id} className={getFieldWrapperClass()}>
          {field.label && (
            <label 
              htmlFor={fieldId}
              className={`block text-sm font-medium text-gray-700 mb-1 ${field.required ? 'required-field' : ''}`}
            >
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
          )}
          
          <Input
            id={fieldId}
            name={field.name || field.id}
            type={field.type}
            placeholder={field.placeholder}
            value={fieldValue as string || ''}
            min={field.min as string}
            max={field.max as string}
            step={field.step as string}
            disabled={field.disabled}
            readOnly={field.readOnly}
            required={field.required}
            size={field.size}
            className={`w-full ${field.className || ''}`}
            aria-invalid={!!errorMessage}
            {...field.aria}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
          />
          
          {field.helpText && !errorMessage && (
            <p className="mt-1 text-sm text-gray-500">{field.helpText}</p>
          )}
          
          {errorMessage && (
            <p className="mt-1 text-sm text-red-500" role="alert">{errorMessage}</p>
          )}
        </div>
      );
    }
    
    // Textarea
    if (field.type === 'textarea') {
      return (
        <div key={field.id} className={getFieldWrapperClass()}>
          {field.label && (
            <label 
              htmlFor={fieldId}
              className={`block text-sm font-medium text-gray-700 mb-1 ${field.required ? 'required-field' : ''}`}
            >
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
          )}
          
          <Textarea
            id={fieldId}
            name={field.name || field.id}
            placeholder={field.placeholder}
            value={fieldValue as string || ''}
            disabled={field.disabled}
            readOnly={field.readOnly}
            required={field.required}
            size={field.size}
            className={`w-full ${field.className || ''}`}
            aria-invalid={!!errorMessage}
            {...field.aria}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
          />
          
          {field.helpText && !errorMessage && (
            <p className="mt-1 text-sm text-gray-500">{field.helpText}</p>
          )}
          
          {errorMessage && (
            <p className="mt-1 text-sm text-red-500" role="alert">{errorMessage}</p>
          )}
        </div>
      );
    }
    
    // Select dropdown
    if (field.type === 'select' && field.options) {
      return (
        <div key={field.id} className={getFieldWrapperClass()}>
          {field.label && (
            <label 
              htmlFor={fieldId}
              className={`block text-sm font-medium text-gray-700 mb-1 ${field.required ? 'required-field' : ''}`}
            >
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
          )}
          
          <Select
            id={fieldId}
            name={field.name || field.id}
            value={fieldValue as string || ''}
            disabled={field.disabled}
            required={field.required}
            size={field.size}
            multiple={field.multiple}
            className={`w-full ${field.className || ''}`}
            aria-invalid={!!errorMessage}
            aria-label={field.label || `Select ${field.name || field.id}`}
            {...field.aria}
            onChange={(e) => {
              if (field.multiple && e.target.multiple) {
                const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
                handleFieldChange(field.id, selectedOptions);
              } else {
                handleFieldChange(field.id, e.target.value);
              }
            }}
          >
            <option value="" disabled>
              {field.placeholder || 'Select an option'}
            </option>
            
            {field.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
          
          {field.helpText && !errorMessage && (
            <p className="mt-1 text-sm text-gray-500">{field.helpText}</p>
          )}
          
          {errorMessage && (
            <p className="mt-1 text-sm text-red-500" role="alert">{errorMessage}</p>
          )}
        </div>
      );
    }
    
    // Checkboxes
    if (field.type === 'checkbox' && field.options) {
      return (
        <div key={field.id} className={getFieldWrapperClass()}>
          {field.label && (
            <div className={`block text-sm font-medium text-gray-700 mb-1 ${field.required ? 'required-field' : ''}`}>
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </div>
          )}
          
          <div className="flex flex-col space-y-2">
            {field.options.map((option) => (
              <Checkbox
                key={option.value}
                id={`${fieldId}-${option.value}`}
                name={field.name || `${field.id}[]`}
                value={option.value}
                checked={
                  Array.isArray(fieldValue) 
                    ? fieldValue.includes(option.value)
                    : fieldValue === option.value
                }
                disabled={field.disabled}
                className={field.className}
                {...field.aria}
                onChange={(e) => {
                  if (field.multiple) {
                    // For multiple checkboxes
                    const newValue = Array.isArray(fieldValue) ? [...fieldValue] : [];
                    if (e.target.checked) {
                      newValue.push(option.value);
                    } else {
                      const index = newValue.indexOf(option.value);
                      if (index !== -1) newValue.splice(index, 1);
                    }
                    handleFieldChange(field.id, newValue);
                  } else {
                    // For single checkbox
                    handleFieldChange(field.id, e.target.checked ? option.value : '');
                  }
                }}
              >
                {option.label}
              </Checkbox>
            ))}
          </div>
          
          {field.helpText && !errorMessage && (
            <p className="mt-1 text-sm text-gray-500">{field.helpText}</p>
          )}
          
          {errorMessage && (
            <p className="mt-1 text-sm text-red-500" role="alert">{errorMessage}</p>
          )}
        </div>
      );
    }
    
    // Radio buttons
    if (field.type === 'radio' && field.options) {
      return (
        <div key={field.id} className={getFieldWrapperClass()}>
          {field.label && (
            <div className={`block text-sm font-medium text-gray-700 mb-1 ${field.required ? 'required-field' : ''}`}>
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </div>
          )}
          
          <div className="flex flex-col space-y-2" role="radiogroup">
            {field.options.map((option) => (
              <Radio
                key={option.value}
                id={`${fieldId}-${option.value}`}
                name={field.name || field.id}
                value={option.value}
                checked={fieldValue === option.value}
                disabled={field.disabled}
                className={field.className}
                {...field.aria}
                onChange={() => handleFieldChange(field.id, option.value)}
              >
                {option.label}
              </Radio>
            ))}
          </div>
          
          {field.helpText && !errorMessage && (
            <p className="mt-1 text-sm text-gray-500">{field.helpText}</p>
          )}
          
          {errorMessage && (
            <p className="mt-1 text-sm text-red-500" role="alert">{errorMessage}</p>
          )}
        </div>
      );
    }
    
    // Date picker
    if (field.type === 'date') {
      return (
        <div key={field.id} className={getFieldWrapperClass()}>
          {field.label && (
            <label 
              htmlFor={fieldId}
              className={`block text-sm font-medium text-gray-700 mb-1 ${field.required ? 'required-field' : ''}`}
            >
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
          )}
          
          <DatePicker
            id={fieldId}
            name={field.name || field.id}
            placeholder={field.placeholder}
            value={fieldValue as string || ''}
            min={field.min as string}
            max={field.max as string}
            disabled={field.disabled}
            readOnly={field.readOnly}
            required={field.required}
            className={`w-full ${field.className || ''}`}
            aria-invalid={!!errorMessage}
            {...field.aria}
            onChange={(date) => handleFieldChange(field.id, date)}
          />
          
          {field.helpText && !errorMessage && (
            <p className="mt-1 text-sm text-gray-500">{field.helpText}</p>
          )}
          
          {errorMessage && (
            <p className="mt-1 text-sm text-red-500" role="alert">{errorMessage}</p>
          )}
        </div>
      );
    }
    
    // Fallback for unsupported field types
    return (
      <div key={field.id} className={getFieldWrapperClass()}>
        <p>Unsupported field type: {field.type}</p>
      </div>
    );
  };
  
  return (
    <div 
      className={`block-kit-form-block ${className || ''}`}
      data-block-id={id}
      {...props}
    >
      <Form
        id={`form-${id}`}
        className="w-full"
        validationBehavior="aria"
        validationErrors={formErrors}
        onSubmit={handleSubmit}
      >
        {/* Form fields */}
        <div className={getLayoutClass()}>
          {fields.map(field => renderField(field))}
        </div>
        
        {/* Form-level error message */}
        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md" role="alert">
            {error}
          </div>
        )}
        
        {/* Success message */}
        {formSuccess && successMessage && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 text-green-600 rounded-md" role="alert">
            {successMessage}
          </div>
        )}
        
        {/* Form actions */}
        <div className="mt-6 flex justify-end space-x-2">
          {cancelLabel && (
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={onCancel}
              disabled={isSubmitting || isLoading}
            >
              {cancelLabel}
            </button>
          )}
          
          <button
            type="submit"
            className={`
              px-4 py-2 text-sm font-medium text-white rounded-md shadow-sm 
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
              ${isSubmitting || isLoading 
                ? 'bg-blue-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700'
              }
            `}
            disabled={isSubmitting || isLoading}
          >
            {isSubmitting || isLoading ? 'Submitting...' : submitLabel}
          </button>
        </div>
      </Form>
    </div>
  );
}; 
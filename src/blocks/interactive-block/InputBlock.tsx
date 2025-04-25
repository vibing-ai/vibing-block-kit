import React from 'react';
import { 
  Input, 
  Textarea, 
  Select, 
  Checkbox, 
  Radio,
  Form
} from '@heroui/react';
import { BlockProps } from '../../types';

export type InputType = 'text' | 'number' | 'email' | 'password' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'date';

export interface InputBlockProps extends BlockProps {
  name: string;
  type: InputType;
  label?: string;
  placeholder?: string;
  value?: string | number | boolean;
  options?: Array<{ label: string; value: string }>;
  required?: boolean;
  disabled?: boolean;
  helperText?: string;
  error?: string;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  variant?: 'bordered' | 'flat' | 'faded' | 'underlined';
}

export const InputBlock: React.FC<InputBlockProps> = ({
  id,
  name,
  type,
  label,
  placeholder,
  value,
  options = [],
  required = false,
  disabled = false,
  helperText,
  error,
  size = 'md',
  fullWidth = false,
  variant = 'bordered',
  className,
  onChange,
  ...props
}) => {
  const handleChange = (newValue: any) => {
    onChange?.(id, { value: newValue });
  };

  const renderInput = () => {
    switch (type) {
      case 'textarea':
        return (
          <Textarea
            id={`input-${id}`}
            name={name}
            placeholder={placeholder}
            value={value as string}
            required={required}
            disabled={disabled}
            size={size}
            variant={variant}
            className={fullWidth ? 'w-full' : ''}
            onChange={(e) => handleChange(e.target.value)}
          />
        );
      
      case 'select':
        return (
          <Select
            id={`input-${id}`}
            name={name}
            value={value as string}
            required={required}
            disabled={disabled}
            size={size}
            variant={variant}
            className={fullWidth ? 'w-full' : ''}
            onChange={(e) => handleChange(e.target.value)}
          >
            {options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        );
      
      case 'checkbox':
        return (
          <div className="flex flex-col gap-2">
            {options.map((option, index) => (
              <Checkbox
                key={index}
                id={`${name}-${option.value}`}
                name={name}
                value={option.value}
                checked={value === option.value}
                disabled={disabled}
                onChange={(e) => handleChange(e.target.checked ? option.value : '')}
              >
                {option.label}
              </Checkbox>
            ))}
          </div>
        );
      
      case 'radio':
        return (
          <div className="flex flex-col gap-2" role="radiogroup">
            {options.map((option, index) => (
              <Radio
                key={index}
                id={`${name}-${option.value}`}
                name={name}
                value={option.value}
                checked={value === option.value}
                disabled={disabled}
                onChange={() => handleChange(option.value)}
              >
                {option.label}
              </Radio>
            ))}
          </div>
        );
      
      default:
        return (
          <Input
            id={`input-${id}`}
            type={type}
            name={name}
            placeholder={placeholder}
            value={value as string}
            required={required}
            disabled={disabled}
            size={size}
            variant={variant}
            className={fullWidth ? 'w-full' : ''}
            onChange={(e) => handleChange(e.target.value)}
          />
        );
    }
  };

  return (
    <div 
      className={`${className || ''} ${fullWidth ? 'w-full' : ''}`}
      data-block-id={id}
      {...props}
    >
      <Form
        id={`form-${id}`}
        validationBehavior="aria"
        validationErrors={error ? {[name]: error} : undefined}
      >
        {label && (
          <label htmlFor={`input-${id}`} className={`block mb-2 ${required ? 'after:content-["*"] after:ml-0.5 after:text-red-500' : ''}`}>
            {label}
          </label>
        )}
        
        {renderInput()}
        
        {helperText && !error && (
          <p className="text-sm text-gray-500 mt-1">{helperText}</p>
        )}
        
        {error && (
          <p className="text-sm text-red-500 mt-1">{error}</p>
        )}
      </Form>
    </div>
  );
}; 
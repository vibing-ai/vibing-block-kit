import React from 'react';
import { 
  Input, 
  Textarea, 
  Select, 
  Checkbox, 
  Radio, 
  FormControl, 
  FormLabel, 
  FormHelperText,
  RadioGroup,
  Box,
  Flex
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
            defaultValue={value as string}
            required={required}
            isDisabled={disabled}
            size={size}
            variant={variant}
            fullWidth={fullWidth}
            onChange={(e) => handleChange(e.target.value)}
          />
        );
      
      case 'select':
        return (
          <Select
            id={`input-${id}`}
            name={name}
            defaultValue={value as string}
            required={required}
            isDisabled={disabled}
            size={size}
            variant={variant}
            fullWidth={fullWidth}
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
          <Flex direction="column" gap="2">
            {options.map((option, index) => (
              <Checkbox
                key={index}
                id={`${name}-${option.value}`}
                name={name}
                value={option.value}
                isChecked={value === option.value}
                isDisabled={disabled}
                onChange={(e) => handleChange(e.target.checked ? option.value : '')}
              >
                {option.label}
              </Checkbox>
            ))}
          </Flex>
        );
      
      case 'radio':
        return (
          <RadioGroup
            value={value as string}
            onChange={handleChange}
            name={name}
          >
            <Flex direction="column" gap="2">
              {options.map((option, index) => (
                <Radio
                  key={index}
                  id={`${name}-${option.value}`}
                  value={option.value}
                  isDisabled={disabled}
                >
                  {option.label}
                </Radio>
              ))}
            </Flex>
          </RadioGroup>
        );
      
      default:
        return (
          <Input
            id={`input-${id}`}
            type={type}
            name={name}
            placeholder={placeholder}
            defaultValue={value as string}
            required={required}
            isDisabled={disabled}
            size={size}
            variant={variant}
            fullWidth={fullWidth}
            onChange={(e) => handleChange(e.target.value)}
          />
        );
    }
  };

  return (
    <Box 
      className={className}
      data-block-id={id}
      width={fullWidth ? '100%' : undefined}
      {...props}
    >
      <FormControl
        id={`form-${id}`}
        isRequired={required}
        isDisabled={disabled}
        isInvalid={!!error}
      >
        {label && (
          <FormLabel htmlFor={`input-${id}`}>{label}</FormLabel>
        )}
        
        {renderInput()}
        
        {helperText && (
          <FormHelperText>{helperText}</FormHelperText>
        )}
        
        {error && (
          <FormHelperText color="danger">{error}</FormHelperText>
        )}
      </FormControl>
    </Box>
  );
}; 
import React from "react";

// Mock implementation of HeroUI Button
type ButtonProps = {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
};

// This would normally import from @heroui/react
const Button = ({
  variant = "primary",
  size = "md",
  className = "",
  children,
  onClick,
  disabled = false,
  type = "button",
  ...props
}: ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`heroui-button ${variant} ${size} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

// Export Button from @block-kit/blocks
export { Button, buttonVariants, type ButtonProps } from '@block-kit/core'; 
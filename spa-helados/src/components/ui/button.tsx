import { ButtonHTMLAttributes, forwardRef } from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger" | "whats" | "whatsFull";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-primary text-foreground hover:bg-primary-glow",
  secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300",
  outline: "border border-gray-300 text-gray-700 hover:bg-gray-50",
  ghost: "text-gray-700 hover:bg-gray-100",
  danger: "bg-red-600 text-white hover:bg-red-700",
  whats: "border border-gray-300 text-black hover:bg-[oklch(0.761_0.2015_149.74)] hover:border-none hover:text-white",
  whatsFull: "bg-(--accent) text-white hover:bg-[#98dbd2]"
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", isLoading, disabled, className = "", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`cursor-pointer rounded-md font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${className} ${variantStyles[variant]} ${sizeStyles[size]} `}
        {...props}
      >
        {isLoading ? "Cargando..." : children}
      </button>
    );
  }
);

Button.displayName = "Button";
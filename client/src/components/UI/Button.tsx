import React from "react";

type ButtonVariant = "primary" | "secondary";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps
{
    variant?: ButtonVariant;
    size?: ButtonSize;
    children: React.ReactNode;
    className?:String
}

const variantStyles: Record<ButtonVariant, string> = {
    primary:
        "bg-green-600 text-white hover:bg-green-700 active:bg-green-800",

    secondary:
        "border border-green-600 bg-white text-green-600 hover:bg-green-50",
};

const sizeStyles: Record<ButtonSize, string> = {
    sm: "px-4 py-2 text-sm rounded-lg",
    md: "px-5 py-3 text-base rounded-xl",
    lg: "px-6 py-4 text-lg rounded-xl",
};

const Button = ({
    variant = "primary",
    size = "md",
    children,
    className = "",
    ...props
}: ButtonProps) => {
    return (
        <button
            className={`
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        font-semibold
        transition-all
        duration-300
        cursor-pointer
        ${className}
      `}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;



import React from "react";

export function Button({ children, className, variant, ...props }) {
  const baseStyles = "px-6 py-3 font-medium rounded-md transition-all duration-300";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white",
    secondary: "bg-gray-600 text-white hover:bg-gray-700",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant] || variants.primary} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

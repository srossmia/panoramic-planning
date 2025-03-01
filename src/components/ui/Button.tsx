// src/components/ui/Button.tsx

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

export default function Button({ variant = 'primary', children, ...props }: ButtonProps) {
  const baseClasses = 'inline-block px-4 py-2 rounded text-sm font-medium focus:outline-none focus:ring-2';
  const variantClasses =
    variant === 'primary'
      ? 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-600'
      : 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500';

  return (
    <button type="button" className={`${baseClasses} ${variantClasses}`} {...props}>
      {children}
    </button>
  );
}

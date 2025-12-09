import { forwardRef, InputHTMLAttributes } from 'react';
import { cn } from './utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    return (
      <div>
        {label && (
          <label
            htmlFor={id}
            className="block text-sm font-medium text-gray-300 mb-2 uppercase tracking-wider"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={cn(
            'w-full p-3 rounded-lg bg-slate-900 text-white',
            'border',
            error ? 'border-red-500' : 'border-slate-700',
            'focus:border-electric-lime focus:ring-1 focus:ring-electric-lime',
            'transition duration-150',
            'placeholder:text-gray-500',
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

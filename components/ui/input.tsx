import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string
  label?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', error, label, id, ...props }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`

    return (
      <div className="space-y-2">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-gray-700"
          >
            {label}
          </label>
        )}
        <input
          type={type}
          id={inputId}
          className={cn(
            'flex h-10 w-full rounded-subtle border border-neutral-300',
            'bg-background px-3 py-2 text-sm placeholder:text-neutral-400',
            'focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'transition-colors duration-200',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export { Input }
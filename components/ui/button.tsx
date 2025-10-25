import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gold'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  loading?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, children, disabled, ...props }, ref) => {
    const baseClasses = [
      'inline-flex items-center justify-center rounded-subtle font-semibold',
      'transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      'active:scale-95'
    ]

    const variants = {
      primary: [
        'bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700',
        'focus:ring-primary-500'
      ],
      secondary: [
        'bg-white text-primary-600 hover:bg-primary-50 active:bg-primary-100',
        'border border-primary-200 focus:ring-primary-500'
      ],
      outline: [
        'border border-current text-primary-600 hover:bg-primary-50',
        'focus:ring-primary-500'
      ],
      ghost: [
        'text-primary-600 hover:bg-primary-50 active:bg-primary-100',
        'focus:ring-primary-500'
      ],
      gold: [
        'bg-accent-500 text-white hover:bg-accent-600 active:bg-accent-700',
        'focus:ring-accent-500 shadow-glow-gold'
      ]
    }

    const sizes = {
      sm: 'h-9 px-3 text-sm',
      md: 'h-11 px-4 text-base',
      lg: 'h-14 px-6 text-lg',
      xl: 'h-16 px-8 text-xl'
    }

    return (
      <button
        className={cn(
          baseClasses,
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        )}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button }
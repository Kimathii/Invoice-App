import { type ButtonHTMLAttributes } from 'react'

type Variant = 'primary' | 'secondary' | 'danger' | 'dark' | 'ghost'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  children: React.ReactNode
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-primary text-white hover:bg-primary-light',
  secondary:
    'bg-background-light text-text-secondary hover:bg-border dark:bg-dark dark:text-text-muted dark:hover:bg-[#252945]',
  danger:
    'bg-danger text-white hover:bg-danger-light',
  dark:
    'bg-[#373B53] text-[#DFE3FA] hover:bg-text-primary dark:hover:bg-dark',
  ghost:
    'bg-transparent text-text-muted hover:text-text-primary dark:hover:text-white',
}

export default function Button({
  variant = 'primary',
  children,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        inline-flex items-center justify-center gap-2
        h-12 px-6 rounded-lg
        text-body font-bold
        transition-colors duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variantClasses[variant]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  )
}

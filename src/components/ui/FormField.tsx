import { type InputHTMLAttributes, forwardRef } from 'react'

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  id: string
}

const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, error, id, className = '', ...props }, ref) => {
    return (
      <div className="flex flex-col gap-[10px]">
        <div className="flex items-center justify-between">
          <label
            htmlFor={id}
            className={`text-body text-text-muted dark:text-text-secondary ${
              error ? 'text-danger' : ''
            }`}
          >
            {label}
          </label>
          {error && (
            <span className="text-body text-danger" role="alert">
              {error}
            </span>
          )}
        </div>
        <input
          ref={ref}
          id={id}
          className={`
            h-12 w-full rounded-sm border px-4
            text-h3-variant text-text-primary dark:text-white
            bg-white dark:bg-dark
            outline-none transition-colors duration-200
            ${
              error
                ? 'border-danger focus:border-danger'
                : 'border-border dark:border-[#252945] focus:border-primary dark:focus:border-primary'
            }
            disabled:bg-background-light dark:disabled:bg-darker disabled:cursor-not-allowed
            ${className}
          `}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          {...props}
        />
      </div>
    )
  }
)

FormField.displayName = 'FormField'

export default FormField

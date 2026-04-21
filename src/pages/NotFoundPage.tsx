import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-h1 text-text-primary dark:text-white">404</h1>
      <p className="text-body text-text-muted">Page not found.</p>
      <Link to="/" className="text-primary hover:text-primary-light transition-colors">
        Back to invoices
      </Link>
    </div>
  )
}

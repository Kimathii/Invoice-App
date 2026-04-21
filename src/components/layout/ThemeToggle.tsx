// TODO: Build full ThemeToggle with SVG icons
import { useTheme } from '@/hooks/useTheme'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      className="text-text-muted hover:text-white transition-colors"
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  )
}

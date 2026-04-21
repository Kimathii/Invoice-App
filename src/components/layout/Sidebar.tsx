import { useTheme } from '@/hooks/useTheme'
import Logo from './Logo'
import { MoonIcon, SunIcon } from '@/components/icons'

// const AVATAR_URL = 'https://i.ibb.co/MyqTyM89/image'

export default function Sidebar() {
  const { theme, toggleTheme } = useTheme()

  return (
    <>
      {/* ── Desktop sidebar (vertical, left, fixed) ── */}
      <aside className="hidden lg:flex fixed top-0 left-0 z-50 h-screen w-[103px] flex-col items-center justify-between bg-[#1E2139] rounded-r-[20px]">
        {/* Logo */}
        <Logo size={103} />

        {/* Bottom controls */}
        <div className="flex w-full flex-col items-center">
          <button
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            className="flex h-[103px] w-full items-center justify-center text-[#858BB2] hover:text-white transition-colors duration-200"
          >
            {theme === 'light' ? <MoonIcon /> : <SunIcon />}
          </button>
          <div className="h-px w-full bg-[#494E6E]" />
          <div className="flex h-[103px] w-full items-center justify-center">
            <div className="h-10 w-10 overflow-hidden rounded-full ring-2 ring-transparent hover:ring-primary transition-all duration-200 cursor-pointer">
  <img 
    src="/images/avatar.png" 
    alt="User avatar" 
    className="h-full w-full object-cover" 
    onError={(e) => { 
      (e.target as HTMLImageElement).src = 'https://i.pravatar.cc/40?img=11' 
    }} 
  />
</div>
          </div>
        </div>
      </aside>

      {/* ── Mobile / Tablet top nav bar ── */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 flex h-[72px] items-center justify-between bg-[#1E2139]" style={{ borderRadius: '0 0 20px 0' }}>
        {/* Logo — left, rounded bottom-right only */}
        <Logo size={72} />

        {/* Right controls */}
        <div className="flex items-center">
          <button
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            className="flex h-[72px] w-[72px] items-center justify-center text-[#858BB2] hover:text-white transition-colors duration-200"
          >
            {theme === 'light' ? <MoonIcon /> : <SunIcon />}
          </button>
          <div className="w-px h-full bg-[#494E6E] self-stretch" />
          <div className="flex h-[72px] w-[72px] items-center justify-center">
           <div className="h-10 w-10 overflow-hidden rounded-full ring-2 ring-transparent hover:ring-primary transition-all duration-200 cursor-pointer">
  <img 
    src="/images/avatar.png" 
    alt="User avatar" 
    className="h-full w-full object-cover" 
    onError={(e) => { 
      (e.target as HTMLImageElement).src = 'https://i.pravatar.cc/40?img=11' 
    }} 
  />
</div>
          </div>
        </div>
      </header>
    </>
  )
}

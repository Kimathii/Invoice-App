import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import InvoiceDrawer from '@/components/invoice/InvoiceDrawer'

export default function Layout() {
  return (
    <div className="min-h-screen bg-background-light dark:bg-darker transition-colors duration-300">
      <Sidebar />
      <InvoiceDrawer />
      {/* Desktop: offset for sidebar. Mobile: offset for top nav */}
      <main className="pt-[72px] lg:pt-0 lg:pl-[103px]">
        <Outlet />
      </main>
    </div>
  )
}

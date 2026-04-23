import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useTheme } from '@/hooks/useTheme'
import Layout from '@/components/layout/Layout'
import InvoiceListPage from '@/pages/InvoiceListPage'
import InvoiceDetailPage from '@/pages/InvoiceDetailPage'
import NotFoundPage from '@/pages/NotFoundPage'

function App() {
  useTheme()

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<InvoiceListPage />} />
          <Route path="invoices/:id" element={<InvoiceDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
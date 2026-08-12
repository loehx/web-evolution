import { PreviewGallery, PreviewIndex } from '@/previews/PreviewGallery'
import { stagedComponents } from '@/previews/registry.tsx'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import App from '@/App'

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/preview" element={<PreviewIndex components={stagedComponents} />} />
        <Route
          path="/preview/:slug"
          element={<PreviewGallery components={stagedComponents} />}
        />
        <Route path="/preview/:slug/:variantId" element={<Navigate to=".." replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

import { PreviewGallery, PreviewIndex } from '@/previews/PreviewGallery'
import { stagedComponents } from '@/previews/registry.tsx'
import { BrowserRouter, Navigate, Route, Routes, useParams } from 'react-router-dom'

function LegacyPreviewRedirect() {
  const { slug } = useParams()
  return <Navigate to={slug ? `/${slug}` : '/'} replace />
}

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PreviewIndex components={stagedComponents} />} />
        <Route path="/:slug" element={<PreviewGallery components={stagedComponents} />} />
        <Route path="/preview" element={<Navigate to="/" replace />} />
        <Route path="/preview/:slug" element={<LegacyPreviewRedirect />} />
        <Route path="/preview/:slug/:variantId" element={<LegacyPreviewRedirect />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

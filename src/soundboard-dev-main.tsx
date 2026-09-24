import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Soundboard } from '../staging/Soundboard/Soundboard'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Soundboard />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)

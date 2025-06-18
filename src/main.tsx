import { BrowserRouter, Routes, Route } from 'react-router'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import App from './pages/App.tsx'
import Start from './pages/Start.tsx'
import Api from './pages/Api.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/app" element={<App />} />
        <Route path="/api" element={<Api />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './pages/App.tsx'
import { BrowserRouter, Routes, Route } from 'react-router'
import Layout from './components/Layout.tsx'
import Start from './pages/Start.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Start />} />
          <Route path="/app" element={<App />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
)

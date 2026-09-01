import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { initializeMetaPixel } from './lib/metaPixel'

// This runs in Vite's browser entry point before React and its effects mount.
initializeMetaPixel()

// HashRouter is used (instead of BrowserRouter) so the built site can be hosted
// as static files anywhere — including single-file previews — without needing
// server-side rewrite rules for deep links like /matchas or /our-story.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
)

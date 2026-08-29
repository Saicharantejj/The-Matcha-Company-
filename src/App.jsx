import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Header from './components/Header'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import GrainOverlay from './components/GrainOverlay'
import MagneticCursor from './components/MagneticCursor'
import { CartProvider } from './context/CartContext'
import { ToastProvider } from './components/Toast'
import Home from './pages/Home'
import Matchas from './pages/Matchas'
import DiyKits from './pages/DiyKits'
import MatchaKits from './pages/MatchaKits'
import OurStory from './pages/OurStory'

// Route changes should land at the top of the new page, not wherever the
// previous page happened to be scrolled to.
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname])
  return null
}

export default function App() {
  const location = useLocation()

  return (
    <CartProvider>
      <ToastProvider>
        <div className="flex min-h-screen flex-col">
          <ScrollToTop />
          <Header />

          <AnimatePresence mode="wait" initial={false}>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/matchas" element={<Matchas />} />
              <Route path="/diy-kits" element={<DiyKits />} />
              <Route path="/matcha-kits" element={<MatchaKits />} />
              <Route path="/our-story" element={<OurStory />} />
            </Routes>
          </AnimatePresence>

          <Footer />
          <CartDrawer />
          <GrainOverlay />
          <MagneticCursor />
        </div>
      </ToastProvider>
    </CartProvider>
  )
}

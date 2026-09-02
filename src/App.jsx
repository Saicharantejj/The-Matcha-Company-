import { useEffect, useRef } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Header from './components/Header'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import GrainOverlay from './components/GrainOverlay'
import { initSmoothScroll, scrollToTopImmediately } from './lib/smoothScroll'
import { CartProvider } from './context/CartContext'
import { ShopifyProvider } from './context/ShopifyContext'
import { ToastProvider } from './components/Toast'
import Home from './pages/Home'
import Matchas from './pages/Matchas'
import MatchaKits from './pages/MatchaKits'
import GiftHampers from './pages/GiftHampers'
import OurStory from './pages/OurStory'
import NotFound from './pages/NotFound'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    scrollToTopImmediately()
  }, [pathname])
  return null
}

function useSmoothScroll() {
  useEffect(() => initSmoothScroll(), [])
}

function useMetaPixelPageViews() {
  const location = useLocation()
  const lastTrackedPath = useRef(location.pathname)

  useEffect(() => {
    if (lastTrackedPath.current === location.pathname) return

    if (typeof window.fbq === 'function') {
      window.fbq('track', 'PageView')
    }
    lastTrackedPath.current = location.pathname
  }, [location.pathname])
}

export default function App() {
  const location = useLocation()
  useSmoothScroll()
  useMetaPixelPageViews()

  return (
    <ShopifyProvider>
      <CartProvider>
        <ToastProvider>
          <div className="flex min-h-screen flex-col">
            <ScrollToTop />
            <Header />

            <AnimatePresence mode="wait" initial={false}>
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/matchas" element={<Matchas />} />
                <Route path="/matcha-kits" element={<MatchaKits />} />
                <Route path="/gift-hampers" element={<GiftHampers />} />
                <Route path="/diy-kits" element={<GiftHampers />} />
                <Route path="/our-story" element={<OurStory />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AnimatePresence>

            <Footer />
            <CartDrawer />
            <GrainOverlay />
          </div>
        </ToastProvider>
      </CartProvider>
    </ShopifyProvider>
  )
}

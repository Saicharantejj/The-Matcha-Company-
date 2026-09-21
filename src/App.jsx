import { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Header from './components/Header'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import GrainOverlay from './components/GrainOverlay'
import SearchModal from './components/SearchModal'
import { initSmoothScroll, scrollToTopImmediately } from './lib/smoothScroll'
import { CartProvider } from './context/CartContext'
import { ThemeProvider } from './context/ThemeContext'
import { ToastProvider } from './components/Toast'
import { initMetaPixel, trackPageView } from './lib/metaPixel'

// Core Pages
import Home from './pages/Home'
import Shop from './pages/Shop'
import BuildYourBoxPage from './pages/BuildYourBoxPage'
import ProductDetail from './pages/ProductDetail'
import OurStory from './pages/OurStory'
import B2bPage from './pages/B2bPage'

// Secondary Pages
import FaqPage from './pages/FaqPage'
import ContactPage from './pages/ContactPage'
import ShippingPage from './pages/ShippingPage'
import ReturnsPage from './pages/ReturnsPage'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'
import TermsPage from './pages/TermsPage'
import NotFound from './pages/NotFound'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    scrollToTopImmediately()
  }, [pathname])
  return null
}

function MetaPixelTracker() {
  const { pathname } = useLocation()

  useEffect(() => {
    initMetaPixel()
  }, [])

  useEffect(() => {
    trackPageView(pathname)
  }, [pathname])

  return null
}

function useSmoothScroll() {
  useEffect(() => initSmoothScroll(), [])
}

export default function App() {
  const location = useLocation()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  useSmoothScroll()

  // Global keyboard shortcut for search (⌘K or Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setIsSearchOpen((prev) => !prev)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <ThemeProvider>
      <CartProvider>
        <ToastProvider>
          <div className="flex min-h-screen flex-col bg-[#0C122C] text-[#FAF8F5] selection:bg-[#FF5400] selection:text-white">
            <ScrollToTop />
            <MetaPixelTracker />
            <Header onOpenSearch={() => setIsSearchOpen(true)} />

            <AnimatePresence mode="wait" initial={false}>
              <Routes location={location} key={location.pathname}>
                {/* Primary Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/collections" element={<Shop />} />
                <Route path="/collections/:handle" element={<Shop />} />
                <Route path="/product/:handle" element={<ProductDetail />} />
                <Route path="/products/:handle" element={<ProductDetail />} />
                <Route path="/build-your-box" element={<BuildYourBoxPage />} />
                <Route path="/build-box" element={<BuildYourBoxPage />} />
                <Route path="/about" element={<OurStory />} />
                <Route path="/our-story" element={<OurStory />} />

                {/* B2B / Corporate Gifting */}
                <Route path="/b2b" element={<B2bPage />} />

                {/* Secondary Routes */}
                <Route path="/faq" element={<FaqPage />} />
                <Route path="/contact" element={<ContactPage />} />

                {/* Policies & Aliases */}
                <Route path="/shipping" element={<ShippingPage />} />
                <Route path="/policies/shipping" element={<ShippingPage />} />
                <Route path="/returns" element={<ReturnsPage />} />
                <Route path="/policies/returns" element={<ReturnsPage />} />
                <Route path="/privacy" element={<PrivacyPolicyPage />} />
                <Route path="/policies/privacy" element={<PrivacyPolicyPage />} />
                <Route path="/terms" element={<TermsPage />} />
                <Route path="/policies/terms" element={<TermsPage />} />

                {/* Additional Aliases */}
                <Route path="/gift-hampers" element={<Shop />} />
                <Route path="/diy-kits" element={<Shop />} />

                {/* 404 Route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AnimatePresence>

            <Footer />
            <CartDrawer />
            <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
            <GrainOverlay />
          </div>
        </ToastProvider>
      </CartProvider>
    </ThemeProvider>
  )
}

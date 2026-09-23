import { useEffect, useState, lazy, Suspense } from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
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

// Core Pages (Home is statically bundled for zero-latency initial paint)
import Home from './pages/Home'

// Lazy-loaded pages for ultra-fast bundle size and instant loading
const Shop = lazy(() => import('./pages/Shop'))
const BuildYourBoxPage = lazy(() => import('./pages/BuildYourBoxPage'))
const ProductDetail = lazy(() => import('./pages/ProductDetail'))
const OurStory = lazy(() => import('./pages/OurStory'))
const B2bPage = lazy(() => import('./pages/B2bPage'))

// Secondary Pages (Code-split on demand)
const FaqPage = lazy(() => import('./pages/FaqPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const ShippingPage = lazy(() => import('./pages/ShippingPage'))
const ReturnsPage = lazy(() => import('./pages/ReturnsPage'))
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'))
const TermsPage = lazy(() => import('./pages/TermsPage'))
const NotFound = lazy(() => import('./pages/NotFound'))

function PageFallback() {
  return (
    <div className="min-h-[70vh] bg-[#0C122C] flex items-center justify-center">
      <div className="h-10 w-10 rounded-2xl bg-[#131D4A] border border-[#243373] flex items-center justify-center animate-pulse shadow-md">
        <span className="text-[#FF5400] text-base">🍿</span>
      </div>
    </div>
  )
}


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
              <Suspense fallback={<PageFallback />}>
                <Routes location={location} key={location.pathname}>
                  {/* Primary Routes */}
                  <Route path="/" element={<Home />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/collections" element={<Navigate to="/shop" replace />} />
                  <Route path="/collections/:handle" element={<Navigate to="/shop" replace />} />
                  <Route path="/product/:handle" element={<ProductDetail />} />
                  <Route path="/products/:handle" element={<ProductDetail />} />
                  <Route path="/custom-gift-pack" element={<BuildYourBoxPage />} />
                  <Route path="/customise-gift-pack" element={<BuildYourBoxPage />} />
                  <Route path="/gift-pack" element={<BuildYourBoxPage />} />
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
              </Suspense>
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

import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Header from './components/Header'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import GrainOverlay from './components/GrainOverlay'
import { initSmoothScroll, scrollToTopImmediately } from './lib/smoothScroll'
import { CartProvider } from './context/CartContext'
import { ToastProvider } from './components/Toast'

// Core Pages
import Home from './pages/Home'
import Shop from './pages/Shop'
import BuildYourBoxPage from './pages/BuildYourBoxPage'
import ProductDetail from './pages/ProductDetail'
import OurStory from './pages/OurStory'

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

function useSmoothScroll() {
  useEffect(() => initSmoothScroll(), [])
}

export default function App() {
  const location = useLocation()
  useSmoothScroll()

  return (
    <CartProvider>
      <ToastProvider>
        <div className="flex min-h-screen flex-col bg-[#F8EECB] text-[#6E433D]">
          <ScrollToTop />
          <Header />

          <AnimatePresence mode="wait" initial={false}>
            <Routes location={location} key={location.pathname}>
              {/* Primary Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:handle" element={<ProductDetail />} />
              <Route path="/products/:handle" element={<ProductDetail />} />
              <Route path="/build-your-box" element={<BuildYourBoxPage />} />
              <Route path="/build-box" element={<BuildYourBoxPage />} />
              <Route path="/about" element={<OurStory />} />
              <Route path="/our-story" element={<OurStory />} />

              {/* Secondary Routes */}
              <Route path="/faq" element={<FaqPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/shipping" element={<ShippingPage />} />
              <Route path="/returns" element={<ReturnsPage />} />
              <Route path="/privacy" element={<PrivacyPolicyPage />} />
              <Route path="/terms" element={<TermsPage />} />

              {/* Additional Aliases */}
              <Route path="/gift-hampers" element={<Shop />} />
              <Route path="/diy-kits" element={<Shop />} />

              {/* 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>

          <Footer />
          <CartDrawer />
          <GrainOverlay />
        </div>
      </ToastProvider>
    </CartProvider>
  )
}

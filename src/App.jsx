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
import Home from './pages/Home'
import Shop from './pages/Shop'
import BuildYourBoxPage from './pages/BuildYourBoxPage'
import GiftHampers from './pages/GiftHampers'
import ProductDetail from './pages/ProductDetail'
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
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/matchas" element={<Shop />} />
              <Route path="/build-box" element={<BuildYourBoxPage />} />
              <Route path="/matcha-kits" element={<BuildYourBoxPage />} />
              <Route path="/gift-hampers" element={<GiftHampers />} />
              <Route path="/diy-kits" element={<GiftHampers />} />
              <Route path="/product/:handle" element={<ProductDetail />} />
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
  )
}

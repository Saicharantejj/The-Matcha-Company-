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
import DiyKits from './pages/DiyKits'
import MatchaKits from './pages/MatchaKits'
import OurStory from './pages/OurStory'
import NotFound from './pages/NotFound'

// Route changes should land at the top of the new page, not wherever the
// previous page happened to be scrolled to. Routed through the smooth-scroll
// instance when one exists: a plain window.scrollTo would be intercepted and
// animated, so arriving on a new page would look like being thrown up the old
// one.
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    scrollToTopImmediately()
  }, [pathname])
  return null
}

// Smooth scrolling for pointer devices. Everything scroll-linked on the site
// reads better against an eased scroll position than against a stepped one, so
// this is set up once, above the router, and torn down with the app.
function useSmoothScroll() {
  useEffect(() => initSmoothScroll(), [])
}

function useMetaPixelPageViews() {
  const location = useLocation()
  // index.html already tracks the first PageView. Keeping the last path in a
  // ref also prevents React Strict Mode's effect replay from creating one.
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
                <Route path="/diy-kits" element={<DiyKits />} />
                <Route path="/matcha-kits" element={<MatchaKits />} />
                <Route path="/our-story" element={<OurStory />} />
                {/* Anything else. Without this the router matched nothing and
                    rendered a header and footer around an empty middle. */}
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

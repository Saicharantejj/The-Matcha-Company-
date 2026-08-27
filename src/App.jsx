import { useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Matchas from './pages/Matchas'
import DiyKits from './pages/DiyKits'
import MatchaKits from './pages/MatchaKits'
import OurStory from './pages/OurStory'

export default function App() {
  const location = useLocation()
  const [cart, setCart] = useState([])

  const handleAddToCart = (item) => {
    setCart((prev) => [...prev, item])
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header cartCount={cart.length} />

      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home onAddToCart={handleAddToCart} />} />
          <Route path="/matchas" element={<Matchas onAddToCart={handleAddToCart} />} />
          <Route path="/diy-kits" element={<DiyKits onAddToCart={handleAddToCart} />} />
          <Route path="/matcha-kits" element={<MatchaKits onAddToCart={handleAddToCart} />} />
          <Route path="/our-story" element={<OurStory />} />
        </Routes>
      </AnimatePresence>

      <Footer />
    </div>
  )
}

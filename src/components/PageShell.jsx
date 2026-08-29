import { motion, useReducedMotion } from 'framer-motion'

// Wraps every page so route changes fade and slide via AnimatePresence in
// App.jsx. Deliberately transform + opacity only: animating a filter (blur)
// re-rasterises the entire page every frame, which is the single most
// expensive thing a page transition can do.
export default function PageShell({ children }) {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    return (
      <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        {children}
      </motion.main>
    )
  }

  return (
    <motion.main
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.main>
  )
}

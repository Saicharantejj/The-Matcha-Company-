import { motion, useReducedMotion } from 'framer-motion'

// Wraps every page so route changes slide and blur in/out via AnimatePresence
// in App.jsx. Blur is expensive to animate, so it's kept short and small, and
// dropped entirely for reduced-motion visitors.
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
      initial={{ opacity: 0, y: 28, filter: 'blur(8px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
      transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.main>
  )
}

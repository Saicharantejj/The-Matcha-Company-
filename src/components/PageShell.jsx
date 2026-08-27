import { motion } from 'framer-motion'

// Wraps every page's content so route changes animate in/out via AnimatePresence in App.jsx.
export default function PageShell({ children }) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.main>
  )
}

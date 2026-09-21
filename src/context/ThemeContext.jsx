import { createContext, useContext, useEffect } from 'react'

const ThemeContext = createContext({
  theme: 'dark',
  isDark: true,
  toggleTheme: () => {},
  setTheme: () => {},
})

const THEME_STORAGE_KEY = 'chaska_theme'

export function ThemeProvider({ children }) {
  useEffect(() => {
    const root = document.documentElement
    root.classList.add('dark')
    try {
      localStorage.setItem(THEME_STORAGE_KEY, 'dark')
    } catch {}
  }, [])

  const value = {
    theme: 'dark',
    isDark: true,
    toggleTheme: () => {},
    setTheme: () => {},
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  return context || {
    theme: 'dark',
    isDark: true,
    toggleTheme: () => {},
    setTheme: () => {},
  }
}


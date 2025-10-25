'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

interface ThemeContextType {
  theme: 'light' | 'dark'
  setTheme: (theme: 'light' | 'dark' | 'auto') => void
  toggleTheme: () => void
  isDark: boolean
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

interface ThemeProviderProps {
  children: ReactNode
  defaultTheme?: 'light' | 'dark' | 'auto'
}

export function ThemeProvider({ 
  children, 
  defaultTheme = 'auto' 
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<'light' | 'dark'>('light')

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('crown-dice-theme') as 'light' | 'dark' | null
    const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    
    if (savedTheme) {
      setThemeState(savedTheme)
    } else if (defaultTheme === 'auto') {
      setThemeState(systemPreference)
    } else {
      setThemeState(defaultTheme)
    }
  }, [defaultTheme])

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(theme)
    
    // Update CSS custom properties
    if (theme === 'dark') {
      root.style.setProperty('--color-background', 'var(--color-background-dark)')
      root.style.setProperty('--color-surface', 'var(--color-surface-dark)')
      root.style.setProperty('--color-text-primary', 'var(--color-text-light)')
    } else {
      root.style.setProperty('--color-background', '#FAFAFA')
      root.style.setProperty('--color-surface', '#FFFFFF')
      root.style.setProperty('--color-text-primary', '#111827')
    }
    
    // Save to localStorage
    localStorage.setItem('crown-dice-theme', theme)
  }, [theme])

  const setTheme = (newTheme: 'light' | 'dark' | 'auto') => {
    if (newTheme === 'auto') {
      const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      setThemeState(systemPreference)
    } else {
      setThemeState(newTheme)
    }
  }

  const toggleTheme = () => {
    setThemeState(prev => prev === 'light' ? 'dark' : 'light')
  }

  const isDark = theme === 'dark'

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
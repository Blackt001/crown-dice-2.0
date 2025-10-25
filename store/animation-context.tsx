'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

interface AnimationContextType {
  animationsEnabled: boolean
  setAnimationsEnabled: (enabled: boolean) => void
  reducedMotion: boolean
  isAnimating: boolean
  setIsAnimating: (animating: boolean) => void
}

const AnimationContext = createContext<AnimationContextType | undefined>(undefined)

interface AnimationProviderProps {
  children: ReactNode
}

export function AnimationProvider({ children }: AnimationProviderProps) {
  const [animationsEnabled, setAnimationsEnabledState] = useState(true)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  // Initialize animation settings
  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mediaQuery.matches)

    // Listen for changes
    const handleChange = () => setReducedMotion(mediaQuery.matches)
    mediaQuery.addEventListener('change', handleChange)

    // Load saved preference
    const saved = localStorage.getItem('crown-dice-animations')
    if (saved !== null) {
      setAnimationsEnabledState(saved === 'true')
    } else if (mediaQuery.matches) {
      // Respect system preference
      setAnimationsEnabledState(false)
    }

    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // Save preference
  const setAnimationsEnabled = (enabled: boolean) => {
    setAnimationsEnabledState(enabled)
    localStorage.setItem('crown-dice-animations', enabled.toString())
    
    // Update body class for CSS-based animations
    if (enabled) {
      document.body.classList.remove('reduce-motion')
    } else {
      document.body.classList.add('reduce-motion')
    }
  }

  // Apply body class on mount
  useEffect(() => {
    if (!animationsEnabled) {
      document.body.classList.add('reduce-motion')
    }
  }, [])

  return (
    <AnimationContext.Provider
      value={{
        animationsEnabled,
        setAnimationsEnabled,
        reducedMotion,
        isAnimating,
        setIsAnimating,
      }}
    >
      {children}
    </AnimationContext.Provider>
  )
}

export function useAnimation() {
  const context = useContext(AnimationContext)
  if (context === undefined) {
    throw new Error('useAnimation must be used within an AnimationProvider')
  }
  return context
}
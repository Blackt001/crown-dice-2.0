'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAnimation } from '@/store/animation-context'

interface DiceProps {
  size?: number
  value?: number
  element?: 'fire' | 'water' | 'earth' | 'air' | 'neutral'
  rolling?: boolean
}

function Dice({ size = 120, value = 1, element = 'neutral', rolling = false }: DiceProps) {
  const [currentValue, setCurrentValue] = useState(value)
  const { animationsEnabled } = useAnimation()

  // Animate dice rolling
  useEffect(() => {
    if (rolling && animationsEnabled) {
      const interval = setInterval(() => {
        setCurrentValue(Math.floor(Math.random() * 6) + 1)
      }, 100)

      const timeout = setTimeout(() => {
        clearInterval(interval)
        setCurrentValue(value)
      }, 2000)

      return () => {
        clearInterval(interval)
        clearTimeout(timeout)
      }
    } else {
      setCurrentValue(value)
    }
  }, [rolling, value, animationsEnabled])

  const getElementGradient = () => {
    const gradients = {
      fire: 'from-red-500 to-orange-500',
      water: 'from-blue-500 to-cyan-500',
      earth: 'from-green-500 to-emerald-500',
      air: 'from-purple-500 to-violet-500',
      neutral: 'from-gray-400 to-gray-500'
    }
    return gradients[element]
  }

  const getFaceDots = () => {
    const dots = []
    const positions = {
      1: [5], // center
      2: [1, 9], // corners
      3: [1, 5, 9], // diagonal
      4: [1, 3, 7, 9], // corners
      5: [1, 3, 5, 7, 9], // corners + center
      6: [1, 2, 3, 7, 8, 9] // all sides
    }

    const facePositions = positions[currentValue as keyof typeof positions] || [5]

    for (let i = 0; i < 9; i++) {
      dots.push(
        <div
          key={i}
          className={`absolute w-4 h-4 bg-white rounded-full ${
            facePositions.includes(i + 1) ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            top: `${25 + (Math.floor(i / 3) * 25)}%`,
            left: `${25 + ((i % 3) * 25)}%`,
            transform: 'translate(-50%, -50%)'
          }}
        />
      )
    }

    return dots
  }

  return (
    <motion.div
      className={`relative rounded-2xl shadow-2xl bg-gradient-to-br ${getElementGradient()}`}
      style={{ width: size, height: size }}
      animate={{
        rotateX: rolling ? [0, 180, 360, 540, 720] : 0,
        rotateY: rolling ? [0, 180, 360, 540, 720] : 0,
        rotateZ: rolling ? [0, 90, 180, 270, 360] : 0,
      }}
      transition={{
        duration: rolling ? 2 : 0,
        ease: rolling ? 'easeOut' : 'linear',
      }}
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.2 }
      }}
    >
      {/* Dice face */}
      <div className="relative w-full h-full rounded-2xl border-4 border-white/20 p-4">
        {getFaceDots()}
      </div>

      {/* Glow effect */}
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${getElementGradient()} opacity-20 blur-xl`} />
    </motion.div>
  )
}

export function DiceAnimation() {
  const [dices, setDices] = useState([
    { value: 1, element: 'fire' as const },
    { value: 2, element: 'water' as const },
    { value: 3, element: 'earth' as const },
    { value: 4, element: 'air' as const },
    { value: 5, element: 'neutral' as const },
    { value: 6, element: 'fire' as const },
  ])
  const [isRolling, setIsRolling] = useState(false)
  const { animationsEnabled } = useAnimation()

  const startRolling = () => {
    if (!animationsEnabled) return

    setIsRolling(true)
    
    // Randomize values during roll
    const rollInterval = setInterval(() => {
      setDices(prev => prev.map(dice => ({
        ...dice,
        value: Math.floor(Math.random() * 6) + 1
      })))
    }, 100)

    // Stop rolling after 3 seconds and set random final values
    setTimeout(() => {
      clearInterval(rollInterval)
      setDices(prev => prev.map(dice => ({
        ...dice,
        value: Math.floor(Math.random() * 6) + 1
      })))
      setIsRolling(false)
    }, 3000)
  }

  useEffect(() => {
    // Auto-roll every 5 seconds
    const interval = setInterval(() => {
      if (!isRolling) {
        startRolling()
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [isRolling, animationsEnabled])

  if (!animationsEnabled) {
    return null
  }

  return (
    <div className="relative">
      <div className="flex flex-wrap gap-4 justify-center">
        {dices.map((dice, index) => (
          <motion.div
            key={index}
            initial={{ y: 0, opacity: 1 }}
            animate={{ 
              y: isRolling ? [0, -20, 0] : 0,
              opacity: 1
            }}
            transition={{
              duration: 0.6,
              delay: index * 0.1,
              repeat: isRolling ? Infinity : 0,
              repeatType: 'reverse'
            }}
            whileHover={{ scale: 1.1 }}
            className="cursor-pointer"
            onClick={startRolling}
          >
            <Dice 
              size={80}
              value={dice.value}
              element={dice.element}
              rolling={isRolling}
            />
          </motion.div>
        ))}
      </div>

      {/* Particle effects */}
      {isRolling && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-accent-400 rounded-full"
              initial={{
                x: Math.random() * 300,
                y: Math.random() * 200,
                opacity: 1,
                scale: 0
              }}
              animate={{
                y: Math.random() * 100 - 50,
                opacity: 0,
                scale: [0, 1, 0]
              }}
              transition={{
                duration: 1.5,
                delay: Math.random() * 0.5,
                repeat: Infinity
              }}
            />
          ))}
        </div>
      )}

      {/* Interaction hint */}
      {!isRolling && (
        <motion.div
          className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 0.6, y: 0 }}
          transition={{ delay: 1 }}
        >
          <p className="text-white/80 text-sm">Zarları döndürmek için tıklayın</p>
        </motion.div>
      )}
    </div>
  )
}
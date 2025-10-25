'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  PlayIcon, 
  TrophyIcon, 
  UserGroupIcon,
  SparklesIcon 
} from '@heroicons/react/24/solid'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { QuickStartModal } from '@/components/quick-start-modal'
import { DiceAnimation } from '@/components/dice-animation'

export function HeroSection() {
  const [showQuickStart, setShowQuickStart] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const handleQuickStart = () => {
    setShowQuickStart(true)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Handle search logic
      console.log('Searching for:', searchQuery)
    }
  }

  return (
    <div className="relative min-h-[600px] bg-gradient-game overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 via-purple-500/20 to-accent-500/20" />
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      <div className="relative container mx-auto px-4 h-full flex items-center">
        <div className="max-w-4xl mx-auto text-center text-white">
          
          {/* Main Title */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <h1 className="text-hero font-bold mb-4 drop-shadow-2xl">
              Crown & Dice
              <span className="block text-h2 font-normal text-accent-300">
                2.0
              </span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <p className="text-h4 text-white/90 mb-2">
              Modern Çok Oyunculu Zar Deneyimi
            </p>
            <p className="text-body text-white/80 max-w-2xl mx-auto">
              Arkadaşlarınla birlikte zar at! Yeni sistemler keşfet, 
              turnuvalara katıl ve zaferlerini paylaş.
            </p>
          </motion.div>

          {/* Quick Start Search */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-8"
          >
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Oda kodu ara veya kullanıcı adı..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-14 bg-white/10 backdrop-blur-md border-white/20 text-white placeholder-white/60 focus:bg-white/20 focus:border-accent-300"
                />
              </div>
              <Button 
                type="submit" 
                variant="secondary"
                size="lg"
                className="h-14 px-6 bg-white/10 hover:bg-white/20 border-white/20 text-white"
              >
                Ara
              </Button>
            </form>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <Button
              onClick={handleQuickStart}
              size="lg"
              className="h-14 px-8 bg-accent-500 hover:bg-accent-600 text-white font-semibold rounded-premium shadow-glow-gold transition-all duration-300 hover:scale-105"
            >
              <PlayIcon className="w-6 h-6 mr-2" />
              Hemen Başla
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="h-14 px-8 bg-white/10 hover:bg-white/20 border-white/30 text-white font-semibold rounded-premium backdrop-blur-md transition-all duration-300 hover:scale-105"
            >
              <TrophyIcon className="w-6 h-6 mr-2" />
              Turnuvalar
            </Button>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto"
          >
            <div className="bg-white/10 backdrop-blur-md rounded-premium p-6 border border-white/20">
              <div className="flex items-center justify-center mb-3">
                <UserGroupIcon className="w-8 h-8 text-accent-400" />
              </div>
              <div className="text-2xl font-bold mb-1">12,847</div>
              <div className="text-white/80 text-sm">Aktif Oyuncu</div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-premium p-6 border border-white/20">
              <div className="flex items-center justify-center mb-3">
                <SparklesIcon className="w-8 h-8 text-primary-400" />
              </div>
              <div className="text-2xl font-bold mb-1">3,421</div>
              <div className="text-white/80 text-sm">Devam Eden Oyun</div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-premium p-6 border border-white/20">
              <div className="flex items-center justify-center mb-3">
                <TrophyIcon className="w-8 h-8 text-green-400" />
              </div>
              <div className="text-2xl font-bold mb-1">24/7</div>
              <div className="text-white/80 text-sm">Turnuvalar</div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* 3D Dice Animation */}
      <div className="absolute top-20 right-20 hidden lg:block">
        <DiceAnimation />
      </div>

      {/* Quick Start Modal */}
      <QuickStartModal 
        isOpen={showQuickStart}
        onClose={() => setShowQuickStart(false)}
      />
    </div>
  )
}
'use client'

import { useState } from 'react'
import { Dialog } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { GameMode, Difficulty } from '@/types'
import { motion } from 'framer-motion'
import { 
  PlayIcon, 
  UserGroupIcon, 
  TrophyIcon,
  CogIcon 
} from '@heroicons/react/24/solid'

interface QuickStartModalProps {
  isOpen: boolean
  onClose: () => void
}

export function QuickStartModal({ isOpen, onClose }: QuickStartModalProps) {
  const [step, setStep] = useState<'mode' | 'difficulty' | 'room'>('mode')
  const [selectedMode, setSelectedMode] = useState<GameMode>('Kader Arenası')
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('Normal')
  const [roomCode, setRoomCode] = useState('')
  const [isCreatingRoom, setIsCreatingRoom] = useState(false)

  const gameModes = [
    {
      id: 'Kader Arenası' as GameMode,
      name: 'Kader Arenası',
      description: 'Klasik zar atma deneyimi',
      icon: PlayIcon,
      color: 'from-primary-500 to-purple-500'
    },
    {
      id: 'Yadigârlar' as GameMode,
      name: 'Yadigârlar',
      description: 'Özel güçlerle oyun',
      icon: CogIcon,
      color: 'from-yellow-500 to-orange-500'
    },
    {
      id: 'Turnuva' as GameMode,
      name: 'Turnuva',
      description: 'Rekabetçi maçlar',
      icon: TrophyIcon,
      color: 'from-red-500 to-pink-500'
    },
    {
      id: 'Hikaye' as GameMode,
      name: 'Hikaye',
      description: 'Tek oyunculu macera',
      icon: UserGroupIcon,
      color: 'from-green-500 to-teal-500'
    }
  ]

  const difficulties = [
    {
      id: 'Acemi' as Difficulty,
      name: 'Acemi',
      description: 'Yeni başlayanlar için',
      multiplier: '1x',
      color: 'text-green-500'
    },
    {
      id: 'Normal' as Difficulty,
      name: 'Normal',
      description: 'Standart oyun',
      multiplier: '2x',
      color: 'text-blue-500'
    },
    {
      id: 'Usta' as Difficulty,
      name: 'Usta',
      description: 'Deneyimli oyuncular',
      multiplier: '3x',
      color: 'text-purple-500'
    }
  ]

  const handleCreateRoom = async () => {
    setIsCreatingRoom(true)
    try {
      // TODO: Implement room creation logic
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
      onClose()
    } catch (error) {
      console.error('Failed to create room:', error)
    } finally {
      setIsCreatingRoom(false)
    }
  }

  const handleJoinRoom = async () => {
    if (!roomCode.trim()) return
    
    try {
      // TODO: Implement room joining logic
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
      onClose()
    } catch (error) {
      console.error('Failed to join room:', error)
    }
  }

  const renderModeSelection = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <h3 className="text-2xl font-bold text-center mb-6">Oyun Modunu Seç</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {gameModes.map((mode) => {
          const Icon = mode.icon
          return (
            <motion.div
              key={mode.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setSelectedMode(mode.id)
                setStep('difficulty')
              }}
              className={`p-6 rounded-premium cursor-pointer transition-all duration-300 ${
                selectedMode === mode.id
                  ? `bg-gradient-to-br ${mode.color} text-white shadow-lg`
                  : 'bg-white hover:bg-gray-50 border-2 border-gray-200'
              }`}
            >
              <div className="flex items-center mb-3">
                <Icon className="w-8 h-8 mr-3" />
                <h4 className="text-xl font-semibold">{mode.name}</h4>
              </div>
              <p className="text-sm opacity-80">{mode.description}</p>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )

  const renderDifficultySelection = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold">Zorluk Seviyesi</h3>
        <Button
          variant="ghost"
          onClick={() => setStep('mode')}
        >
          Geri
        </Button>
      </div>
      
      <div className="space-y-4">
        {difficulties.map((difficulty) => (
          <motion.div
            key={difficulty.id}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => setSelectedDifficulty(difficulty.id)}
            className={`p-6 rounded-premium cursor-pointer transition-all duration-300 ${
              selectedDifficulty === difficulty.id
                ? 'bg-primary-500 text-white shadow-lg'
                : 'bg-white hover:bg-gray-50 border-2 border-gray-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xl font-semibold">{difficulty.name}</h4>
                <p className="text-sm opacity-80">{difficulty.description}</p>
              </div>
              <div className={`text-2xl font-bold ${difficulty.color}`}>
                {difficulty.multiplier}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex gap-4 pt-4">
        <Button
          variant="outline"
          onClick={() => setStep('room')}
          className="flex-1"
        >
          Oda Kodu ile Katıl
        </Button>
        <Button
          onClick={handleCreateRoom}
          disabled={isCreatingRoom}
          loading={isCreatingRoom}
          className="flex-1"
        >
          Oda Oluştur
        </Button>
      </div>
    </motion.div>
  )

  const renderRoomJoin = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold">Odaya Katıl</h3>
        <Button
          variant="ghost"
          onClick={() => setStep('difficulty')}
        >
          Geri
        </Button>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Oda Kodu
          </label>
          <Input
            type="text"
            placeholder="ABC123"
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
            maxLength={6}
            className="text-center text-2xl font-mono tracking-wider"
          />
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-semibold mb-2">Seçilen Ayarlar</h4>
          <div className="space-y-1 text-sm">
            <p>Mod: {selectedMode}</p>
            <p>Zorluk: {selectedDifficulty}</p>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <Button
          variant="outline"
          onClick={() => setStep('difficulty')}
          className="flex-1"
        >
          Geri
        </Button>
        <Button
          onClick={handleJoinRoom}
          disabled={!roomCode.trim()}
          className="flex-1"
        >
          Oyuna Katıl
        </Button>
      </div>
    </motion.div>
  )

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative bg-white rounded-premium p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        >
          {step === 'mode' && renderModeSelection()}
          {step === 'difficulty' && renderDifficultySelection()}
          {step === 'room' && renderRoomJoin()}
        </motion.div>
      </div>
    </Dialog>
  )
}
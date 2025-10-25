'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Game, Player, GameMode, Difficulty } from '@/types'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { 
  PlayIcon,
  UsersIcon,
  TrophyIcon,
  ClockIcon,
  LockClosedIcon
} from '@heroicons/react/24/solid'

// Mock data for demonstration
const mockGames: Game[] = [
  {
    id: '1',
    players: [
      {
        id: 'player1',
        username: 'AhmetYıldız',
        level: 15,
        gold: 2500,
        power: 45,
        powerProgress: 15,
        totalGames: 120,
        wins: 75,
        losses: 45,
        winRate: 62.5,
        rank: 234,
        status: 'online',
        achievements: [],
        friends: [],
        createdAt: new Date(),
        updatedAt: new Date()
      } as Player,
      {
        id: 'player2',
        username: 'Zeynep_K',
        level: 22,
        gold: 4200,
        power: 78,
        powerProgress: 18,
        totalGames: 200,
        wins: 140,
        losses: 60,
        winRate: 70,
        rank: 156,
        status: 'online',
        achievements: [],
        friends: [],
        createdAt: new Date(),
        updatedAt: new Date()
      } as Player
    ],
    currentPlayerIndex: 0,
    gamePhase: 'playing',
    bettingPhase: 'rolling',
    gameMode: 'Kader Arenası',
    difficulty: 'Normal',
    maxPlayers: 4,
    minBet: 100,
    maxBet: 500,
    currentBet: 200,
    totalRounds: 3,
    roundNumber: 2,
    stakes: 800,
    chatEnabled: true,
    isPrivate: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    players: [
      {
        id: 'player3',
        username: 'MuratKaya',
        level: 8,
        gold: 1200,
        power: 12,
        powerProgress: 2,
        totalGames: 45,
        wins: 28,
        losses: 17,
        winRate: 62.2,
        rank: 567,
        status: 'online',
        achievements: [],
        friends: [],
        createdAt: new Date(),
        updatedAt: new Date()
      } as Player
    ],
    currentPlayerIndex: 0,
    gamePhase: 'betting',
    bettingPhase: 'betting',
    gameMode: 'Yadigârlar',
    difficulty: 'Acemi',
    maxPlayers: 2,
    minBet: 50,
    maxBet: 200,
    currentBet: 100,
    totalRounds: 2,
    roundNumber: 1,
    stakes: 100,
    chatEnabled: true,
    isPrivate: false,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

export function GameGrid() {
  const [games, setGames] = useState<Game[]>(mockGames)
  const [filterMode, setFilterMode] = useState<GameMode | 'all'>('all')
  const [filterDifficulty, setFilterDifficulty] = useState<Difficulty | 'all'>('all')

  const getGameModeIcon = (mode: GameMode) => {
    const icons = {
      'Kader Arenası': PlayIcon,
      'Yadigârlar': TrophyIcon,
      'Tüccar': UsersIcon,
      'Turnuva': TrophyIcon,
      'Hikaye': PlayIcon
    }
    return icons[mode] || PlayIcon
  }

  const getGameModeColor = (mode: GameMode) => {
    const colors = {
      'Kader Arenası': 'from-blue-500 to-purple-500',
      'Yadigârlar': 'from-yellow-500 to-orange-500',
      'Tüccar': 'from-green-500 to-teal-500',
      'Turnuva': 'from-red-500 to-pink-500',
      'Hikaye': 'from-purple-500 to-indigo-500'
    }
    return colors[mode] || 'from-gray-500 to-gray-600'
  }

  const getDifficultyColor = (difficulty: Difficulty) => {
    const colors = {
      'Acemi': 'text-green-600 bg-green-100',
      'Normal': 'text-blue-600 bg-blue-100',
      'Usta': 'text-purple-600 bg-purple-100'
    }
    return colors[difficulty]
  }

  const getGamePhaseText = (phase: string) => {
    const phases = {
      'waiting': 'Bekliyor',
      'betting': 'Bahis Alıyor',
      'playing': 'Oynanıyor',
      'finished': 'Tamamlandı'
    }
    return phases[phase as keyof typeof phases] || phase
  }

  const filteredGames = games.filter(game => {
    if (filterMode !== 'all' && game.gameMode !== filterMode) return false
    if (filterDifficulty !== 'all' && game.difficulty !== filterDifficulty) return false
    return true
  })

  const handleJoinGame = (gameId: string) => {
    // TODO: Implement game joining logic
    console.log('Joining game:', gameId)
  }

  const handleWatchGame = (gameId: string) => {
    // TODO: Implement game watching logic
    console.log('Watching game:', gameId)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <h2 className="text-2xl font-bold">Mevcut Oyunlar</h2>
        
        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          <select
            value={filterMode}
            onChange={(e) => setFilterMode(e.target.value as GameMode | 'all')}
            className="px-3 py-2 border rounded-subtle text-sm"
          >
            <option value="all">Tüm Modlar</option>
            <option value="Kader Arenası">Kader Arenası</option>
            <option value="Yadigârlar">Yadigârlar</option>
            <option value="Turnuva">Turnuva</option>
            <option value="Hikaye">Hikaye</option>
          </select>
          
          <select
            value={filterDifficulty}
            onChange={(e) => setFilterDifficulty(e.target.value as Difficulty | 'all')}
            className="px-3 py-2 border rounded-subtle text-sm"
          >
            <option value="all">Tüm Zorluklar</option>
            <option value="Acemi">Acemi</option>
            <option value="Normal">Normal</option>
            <option value="Usta">Usta</option>
          </select>
        </div>
      </div>

      {/* Games Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredGames.map((game, index) => {
          const ModeIcon = getGameModeIcon(game.gameMode)
          const gradientColor = getGameModeColor(game.gameMode)
          const difficultyStyle = getDifficultyColor(game.difficulty)
          
          return (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-premium shadow-game hover:shadow-game-lg transition-all duration-300 overflow-hidden group"
            >
              <div className={`h-32 bg-gradient-to-br ${gradientColor} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/10" />
                
                {/* Game Mode Badge */}
                <div className="absolute top-4 left-4 flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-3 py-1">
                  <ModeIcon className="w-4 h-4 text-white" />
                  <span className="text-white text-sm font-medium">{game.gameMode}</span>
                </div>

                {/* Difficulty Badge */}
                <div className={`absolute top-4 right-4 px-2 py-1 rounded-full text-xs font-medium ${difficultyStyle}`}>
                  {game.difficulty}
                </div>

                {/* Player Avatars */}
                <div className="absolute bottom-4 right-4 flex -space-x-2">
                  {game.players.slice(0, 3).map((player) => (
                    <div
                      key={player.id}
                      className="w-8 h-8 rounded-full bg-white/80 border-2 border-white flex items-center justify-center"
                      title={player.username}
                    >
                      <span className="text-xs font-semibold text-gray-700">
                        {player.username.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  ))}
                  {game.players.length > 3 && (
                    <div className="w-8 h-8 rounded-full bg-white/60 border-2 border-white flex items-center justify-center">
                      <span className="text-xs font-semibold text-gray-600">
                        +{game.players.length - 3}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {game.gameMode} Oyunu
                    </h3>
                    <p className="text-sm text-gray-500">
                      Oyuncu {game.players.length}/{game.maxPlayers} • Bahis: {game.currentBet} Altın
                    </p>
                  </div>
                  
                  {game.isPrivate && (
                    <LockClosedIcon className="w-5 h-5 text-gray-400" />
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div className="flex items-center gap-2">
                    <UsersIcon className="w-4 h-4 text-gray-400" />
                    <span>{game.players.length}/{game.maxPlayers} Oyuncu</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <TrophyIcon className="w-4 h-4 text-gray-400" />
                    <span>{game.stakes} Altın</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <ClockIcon className="w-4 h-4 text-gray-400" />
                    <span>Tur {game.roundNumber}/{game.totalRounds}</span>
                  </div>
                  
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    game.gamePhase === 'playing' ? 'bg-green-100 text-green-800' :
                    game.gamePhase === 'betting' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {getGamePhaseText(game.gamePhase)}
                  </div>
                </div>

                {/* Players List */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Oyuncular:</h4>
                  <div className="space-y-1">
                    {game.players.map((player) => (
                      <div key={player.id} className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="text-xs font-medium">
                            {player.username.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <span className="text-sm text-gray-700">{player.username}</span>
                        <span className="text-xs text-gray-500">
                          Seviye {player.level}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleJoinGame(game.id)}
                    disabled={game.players.length >= game.maxPlayers}
                    className="flex-1"
                    size="sm"
                  >
                    {game.players.length >= game.maxPlayers ? 'Dolu' : 'Katıl'}
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={() => handleWatchGame(game.id)}
                    size="sm"
                  >
                    İzle
                  </Button>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {filteredGames.length === 0 && (
        <div className="text-center py-12">
          <PlayIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Oyun Bulunamadı</h3>
          <p className="text-gray-500 mb-4">
            Filtrelere uygun oyun bulunamadı. Filtrelerinizi değiştirmeyi deneyin.
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setFilterMode('all')
              setFilterDifficulty('all')
            }}
          >
            Filtreleri Temizle
          </Button>
        </div>
      )}
    </div>
  )
}
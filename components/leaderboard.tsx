'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Player } from '@/types'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TrophyIcon, MedalIcon, StarIcon } from '@heroicons/react/24/solid'

// Mock leaderboard data
const mockLeaderboard: Player[] = [
  {
    id: 'player1',
    username: 'DiceMaster',
    level: 45,
    gold: 150000,
    power: 245,
    powerProgress: 5,
    totalGames: 1250,
    wins: 980,
    losses: 270,
    winRate: 78.4,
    rank: 1,
    status: 'online',
    achievements: [],
    friends: [],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'player2',
    username: 'CrownKing',
    level: 42,
    gold: 135000,
    power: 220,
    powerProgress: 0,
    totalGames: 1100,
    wins: 850,
    losses: 250,
    winRate: 77.3,
    rank: 2,
    status: 'online',
    achievements: [],
    friends: [],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'player3',
    username: 'ZarVatandası',
    level: 38,
    gold: 98000,
    power: 195,
    powerProgress: 15,
    totalGames: 890,
    wins: 690,
    losses: 200,
    winRate: 77.5,
    rank: 3,
    status: 'busy',
    achievements: [],
    friends: [],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'player4',
    username: 'AhmetYıldız',
    level: 35,
    gold: 87000,
    power: 180,
    powerProgress: 10,
    totalGames: 756,
    wins: 580,
    losses: 176,
    winRate: 76.7,
    rank: 4,
    status: 'online',
    achievements: [],
    friends: [],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'player5',
    username: 'Zeynep_K',
    level: 32,
    gold: 76000,
    power: 165,
    powerProgress: 5,
    totalGames: 640,
    wins: 490,
    losses: 150,
    winRate: 76.6,
    rank: 5,
    status: 'away',
    achievements: [],
    friends: [],
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

export function Leaderboard() {
  const [selectedTab, setSelectedTab] = useState<'global' | 'friends' | 'monthly'>('global')
  const [leaderboard] = useState<Player[]>(mockLeaderboard)

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <TrophyIcon className="w-6 h-6 text-yellow-500" />
      case 2:
        return <MedalIcon className="w-6 h-6 text-gray-400" />
      case 3:
        return <MedalIcon className="w-6 h-6 text-orange-500" />
      default:
        return <span className="w-6 h-6 flex items-center justify-center text-sm font-bold text-gray-500">#{rank}</span>
    }
  }

  const getRankBadgeColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-400 to-yellow-600'
      case 2:
        return 'bg-gradient-to-r from-gray-300 to-gray-500'
      case 3:
        return 'bg-gradient-to-r from-orange-400 to-orange-600'
      default:
        return 'bg-gray-200'
    }
  }

  const getStatusColor = (status: Player['status']) => {
    switch (status) {
      case 'online':
        return 'bg-green-400'
      case 'busy':
        return 'bg-yellow-400'
      case 'away':
        return 'bg-orange-400'
      case 'offline':
        return 'bg-gray-400'
      default:
        return 'bg-gray-400'
    }
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`
    }
    return num.toString()
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <TrophyIcon className="w-5 h-5" />
            Liderlik Tablosu
          </CardTitle>
        </div>
        
        {/* Tabs */}
        <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
          {[
            { id: 'global', label: 'Global' },
            { id: 'friends', label: 'Arkadaşlar' },
            { id: 'monthly', label: 'Aylık' }
          ].map((tab) => (
            <Button
              key={tab.id}
              variant={selectedTab === tab.id ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setSelectedTab(tab.id as any)}
              className="flex-1"
            >
              {tab.label}
            </Button>
          ))}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {/* Top 3 Podium */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {leaderboard.slice(0, 3).map((player, index) => (
            <motion.div
              key={player.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative p-4 rounded-premium text-center ${
                index === 0 ? 'bg-gradient-to-b from-yellow-50 to-yellow-100' :
                index === 1 ? 'bg-gradient-to-b from-gray-50 to-gray-100' :
                'bg-gradient-to-b from-orange-50 to-orange-100'
              }`}
            >
              {/* Rank */}
              <div className="mb-2">
                {getRankIcon(player.rank)}
              </div>
              
              {/* Avatar */}
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br from-primary-500 to-purple-500 flex items-center justify-center">
                <span className="text-white font-bold text-lg">
                  {player.username.charAt(0).toUpperCase()}
                </span>
              </div>
              
              {/* Username */}
              <div className="font-semibold text-sm truncate">{player.username}</div>
              
              {/* Level & Win Rate */}
              <div className="text-xs text-gray-600 mt-1">
                Seviye {player.level}
              </div>
              <div className="text-xs text-gray-500">
                {player.winRate}% kazanma
              </div>
              
              {/* Crown for #1 */}
              {player.rank === 1 && (
                <div className="absolute -top-2 -right-2">
                  <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                    <StarIcon className="w-4 h-4 text-white" />
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Full List */}
        <div className="space-y-2">
          {leaderboard.map((player, index) => (
            <motion.div
              key={player.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: (index + 3) * 0.05 }}
              className={`flex items-center gap-3 p-3 rounded-subtle hover:bg-gray-50 transition-colors ${
                player.rank <= 3 ? getRankBadgeColor(player.rank) : ''
              }`}
            >
              {/* Rank */}
              <div className="w-8 text-center">
                {getRankIcon(player.rank)}
              </div>
              
              {/* Player Info */}
              <div className="flex items-center gap-3 flex-1">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-sm font-medium">
                      {player.username.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border border-white ${getStatusColor(player.status)}`} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm truncate">{player.username}</div>
                  <div className="text-xs text-gray-500">
                    Seviye {player.level} • {formatNumber(player.totalGames)} oyun
                  </div>
                </div>
              </div>
              
              {/* Stats */}
              <div className="text-right">
                <div className="text-sm font-semibold">{player.winRate}%</div>
                <div className="text-xs text-gray-500">{formatNumber(player.gold)} Altın</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View More */}
        <div className="pt-4 border-t">
          <Button variant="outline" className="w-full">
            Daha Fazla Göster
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
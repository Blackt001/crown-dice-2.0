'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Player } from '@/types'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  TrophyIcon,
  CurrencyDollarIcon,
  SparklesIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  UserCircleIcon,
  PlusIcon
} from '@heroicons/react/24/solid'
import { 
  formatGold, 
  formatPower, 
  formatWinRate, 
  getRankName, 
  getRankColor,
  getNextLevelGold
} from '@/lib/utils'

// Mock player data for demonstration
const mockPlayer: Player = {
  id: 'player1',
  username: 'DemoOyuncu',
  avatar: '',
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
  friends: ['friend1', 'friend2', 'friend3'],
  createdAt: new Date(),
  updatedAt: new Date()
}

export function PlayerDashboard() {
  const [player] = useState<Player>(mockPlayer)
  
  const nextLevelGold = getNextLevelGold(player.level)
  const progressToNextLevel = ((player.gold - (player.level - 1) * 1000) / (nextLevelGold - (player.level - 1) * 1000)) * 100
  const powerProgressPercent = (player.powerProgress / 20) * 100

  return (
    <div className="space-y-6">
      {/* Player Profile Card */}
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-primary-500 to-purple-500 p-6 text-white">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
              <UserCircleIcon className="w-10 h-10" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold">{player.username}</h3>
              <div className="flex items-center gap-2">
                <span className="text-sm opacity-90">Seviye {player.level}</span>
                <span className={`text-sm font-semibold ${getRankColor(player.level)}`}>
                  {getRankName(player.level)}
                </span>
              </div>
              <div className="text-sm opacity-80">
                Sıralama: #{player.rank.toLocaleString('tr-TR')}
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20"
            >
              <Cog6ToothIcon className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <CardContent className="p-4">
          {/* Level Progress */}
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-2">
              <span>Seviye {player.level + 1}'e ilerleme</span>
              <span>{progressToNextLevel.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-primary-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(progressToNextLevel, 100)}%` }}
              />
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {formatGold(player.gold)} / {formatGold(nextLevelGold)}
            </div>
          </div>

          {/* Power Progress */}
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-2">
              <span>Kudret</span>
              <span>{formatPower(player.power)}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${powerProgressPercent}%` }}
              />
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {player.powerProgress}/20 Progress
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
              <TrophyIcon className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <div className="text-sm text-gray-500">Galibiyet</div>
              <div className="text-lg font-bold">{formatWinRate(player.wins, player.losses)}</div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <ChartBarIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <div className="text-sm text-gray-500">Toplam Oyun</div>
              <div className="text-lg font-bold">{player.totalGames}</div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
              <CurrencyDollarIcon className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <div className="text-sm text-gray-500">Altın</div>
              <div className="text-lg font-bold">{formatGold(player.gold)}</div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
              <SparklesIcon className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <div className="text-sm text-gray-500">Kudret</div>
              <div className="text-lg font-bold">{formatPower(player.power)}</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cog6ToothIcon className="w-5 h-5" />
            Hızlı İşlemler
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full justify-start">
            <TrophyIcon className="w-4 h-4 mr-2" />
            Turnuvalara Katıl
          </Button>
          
          <Button variant="outline" className="w-full justify-start">
            <PlusIcon className="w-4 h-4 mr-2" />
            Arkadaş Ekle
          </Button>
          
          <Button variant="outline" className="w-full justify-start">
            <SparklesIcon className="w-4 h-4 mr-2" />
            Yadigârlarım
          </Button>
          
          <Button variant="outline" className="w-full justify-start">
            <ChartBarIcon className="w-4 h-4 mr-2" />
            İstatistikler
          </Button>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Son Aktiviteler</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-3 text-sm">
            <div className="w-2 h-2 bg-green-400 rounded-full" />
            <span className="text-gray-600">Bir önceki oyunu kazandın</span>
            <span className="text-gray-400 ml-auto">5 dk önce</span>
          </div>
          
          <div className="flex items-center gap-3 text-sm">
            <div className="w-2 h-2 bg-blue-400 rounded-full" />
            <span className="text-gray-600">Yeni seviye: 15</span>
            <span className="text-gray-400 ml-auto">1 saat önce</span>
          </div>
          
          <div className="flex items-center gap-3 text-sm">
            <div className="w-2 h-2 bg-yellow-400 rounded-full" />
            <span className="text-gray-600">150 Kudret kazandın</span>
            <span className="text-gray-400 ml-auto">2 saat önce</span>
          </div>
        </CardContent>
      </Card>

      {/* Friends Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Arkadaşlar</span>
            <span className="text-sm font-normal text-gray-500">
              {player.friends.length} arkadaş
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {player.friends.slice(0, 3).map((friendId, index) => (
            <div key={friendId} className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-sm font-medium">
                  {String.fromCharCode(65 + index)}
                </span>
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium">Arkadaş {index + 1}</div>
                <div className="text-xs text-gray-500">Çevrimiçi</div>
              </div>
              <div className="w-2 h-2 bg-green-400 rounded-full" />
            </div>
          ))}
          
          <Button variant="ghost" size="sm" className="w-full">
            Tüm Arkadaşları Gör
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
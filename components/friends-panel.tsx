'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Player } from '@/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  UserPlusIcon,
  ChatBubbleLeftIcon,
  MagnifyingGlassIcon,
  CheckIcon,
  XMarkIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline'

// Mock friends data
const mockFriends: Player[] = [
  {
    id: 'friend1',
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
  },
  {
    id: 'friend2',
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
    status: 'busy',
    achievements: [],
    friends: [],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'friend3',
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
    status: 'offline',
    achievements: [],
    friends: [],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'friend4',
    username: 'Elif_Tr',
    level: 18,
    gold: 3200,
    power: 56,
    powerProgress: 16,
    totalGames: 156,
    wins: 98,
    losses: 58,
    winRate: 62.8,
    rank: 189,
    status: 'away',
    achievements: [],
    friends: [],
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

// Mock friend requests
const mockFriendRequests = [
  {
    id: 'request1',
    from: 'YeniOyuncu',
    username: 'YeniOyuncu',
    avatar: '',
    level: 5,
    createdAt: new Date()
  }
]

export function FriendsPanel() {
  const [friends] = useState<Player[]>(mockFriends)
  const [friendRequests] = useState(mockFriendRequests)
  const [searchQuery, setSearchQuery] = useState('')
  const [showAddFriend, setShowAddFriend] = useState(false)
  const [newFriendUsername, setNewFriendUsername] = useState('')

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

  const getStatusText = (status: Player['status']) => {
    switch (status) {
      case 'online':
        return 'Çevrimiçi'
      case 'busy':
        return 'Meşgul'
      case 'away':
        return 'Uzakta'
      case 'offline':
        return 'Çevrimdışı'
      default:
        return 'Bilinmeyen'
    }
  }

  const handleAddFriend = () => {
    if (!newFriendUsername.trim()) return
    // TODO: Implement add friend logic
    console.log('Adding friend:', newFriendUsername)
    setNewFriendUsername('')
    setShowAddFriend(false)
  }

  const handleAcceptFriend = (requestId: string) => {
    // TODO: Implement accept friend logic
    console.log('Accepting friend request:', requestId)
  }

  const handleDeclineFriend = (requestId: string) => {
    // TODO: Implement decline friend logic
    console.log('Declining friend request:', requestId)
  }

  const handleChatWithFriend = (friendId: string) => {
    // TODO: Implement chat logic
    console.log('Starting chat with friend:', friendId)
  }

  const filteredFriends = friends.filter(friend =>
    friend.username.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const onlineFriends = filteredFriends.filter(friend => friend.status === 'online')
  const offlineFriends = filteredFriends.filter(friend => friend.status !== 'online')

  return (
    <div className="space-y-6">
      {/* Friend Requests */}
      {friendRequests.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserPlusIcon className="w-5 h-5" />
              Arkadaş İstekleri
              <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {friendRequests.length}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {friendRequests.map((request) => (
              <motion.div
                key={request.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-subtle"
              >
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                  <span className="text-white font-semibold">
                    {request.username.charAt(0).toUpperCase()}
                  </span>
                </div>
                
                <div className="flex-1">
                  <div className="font-medium">{request.username}</div>
                  <div className="text-sm text-gray-500">Seviye {request.level}</div>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => handleAcceptFriend(request.id)}
                    className="p-2"
                  >
                    <CheckIcon className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeclineFriend(request.id)}
                    className="p-2"
                  >
                    <XMarkIcon className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Friends List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              Arkadaşlar
              <span className="text-sm font-normal text-gray-500">
                {friends.length} arkadaş
              </span>
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAddFriend(true)}
            >
              <UserPlusIcon className="w-4 h-4" />
            </Button>
          </div>
          
          {/* Search */}
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Arkadaş ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Online Friends */}
          {onlineFriends.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">
                Çevrimiçi ({onlineFriends.length})
              </h4>
              <div className="space-y-2">
                {onlineFriends.map((friend) => (
                  <motion.div
                    key={friend.id}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center gap-3 p-3 rounded-subtle hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleChatWithFriend(friend.id)}
                  >
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-sm font-medium">
                          {friend.username.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(friend.status)}`} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm truncate">
                        {friend.username}
                      </div>
                      <div className="text-xs text-gray-500">
                        Seviye {friend.level} • {getStatusText(friend.status)}
                      </div>
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-1"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleChatWithFriend(friend.id)
                      }}
                    >
                      <ChatBubbleLeftIcon className="w-4 h-4" />
                    </Button>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Offline Friends */}
          {offlineFriends.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">
                Çevrimdışı ({offlineFriends.length})
              </h4>
              <div className="space-y-2">
                {offlineFriends.map((friend) => (
                  <motion.div
                    key={friend.id}
                    whileHover={{ scale: 1.01 }}
                    className="flex items-center gap-3 p-3 rounded-subtle hover:bg-gray-50 cursor-pointer opacity-75"
                  >
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-500">
                          {friend.username.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(friend.status)}`} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm text-gray-600 truncate">
                        {friend.username}
                      </div>
                      <div className="text-xs text-gray-400">
                        Seviye {friend.level} • {getStatusText(friend.status)}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {filteredFriends.length === 0 && (
            <div className="text-center py-8">
              <UserPlusIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {searchQuery ? 'Arkadaş bulunamadı' : 'Henüz arkadaş yok'}
              </h3>
              <p className="text-gray-500 mb-4">
                {searchQuery 
                  ? 'Arama kriterlerinize uygun arkadaş bulunamadı.'
                  : 'Arkadaş ekleyerek birlikte oyun oynamaya başlayın!'
                }
              </p>
              {!searchQuery && (
                <Button
                  variant="outline"
                  onClick={() => setShowAddFriend(true)}
                >
                  <UserPlusIcon className="w-4 h-4 mr-2" />
                  Arkadaş Ekle
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Friend Modal */}
      {showAddFriend && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowAddFriend(false)} />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative bg-white rounded-premium p-6 max-w-md w-full"
          >
            <h3 className="text-lg font-bold mb-4">Arkadaş Ekle</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Kullanıcı Adı
                </label>
                <Input
                  placeholder="Kullanıcı adını girin..."
                  value={newFriendUsername}
                  onChange={(e) => setNewFriendUsername(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddFriend()}
                />
              </div>
              
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowAddFriend(false)}
                  className="flex-1"
                >
                  İptal
                </Button>
                <Button
                  onClick={handleAddFriend}
                  disabled={!newFriendUsername.trim()}
                  className="flex-1"
                >
                  <EnvelopeIcon className="w-4 h-4 mr-2" />
                  İstek Gönder
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
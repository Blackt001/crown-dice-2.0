'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { io, Socket } from 'socket.io-client'
import { useGame } from './game-context'
import { SocketEvents } from '@/types'
import toast from 'react-hot-toast'

interface SocketContextType {
  socket: Socket | null
  connected: boolean
  isConnecting: boolean
  emit: <K extends keyof SocketEvents>(event: K, data: Parameters<SocketEvents[K]>[0]) => void
  on: <K extends keyof SocketEvents>(event: K, callback: Parameters<SocketEvents[K]>[1]) => void
  off: <K extends keyof SocketEvents>(event: K, callback?: Parameters<SocketEvents[K]>[1]) => void
}

const SocketContext = createContext<SocketContextType | undefined>(undefined)

interface SocketProviderProps {
  children: ReactNode
}

export function SocketProvider({ children }: SocketProviderProps) {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [connected, setConnected] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const { state, actions } = useGame()

  useEffect(() => {
    if (!state.currentPlayer) return

    setIsConnecting(true)

    // Initialize socket connection
    const socketInstance = io(process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001', {
      auth: {
        playerId: state.currentPlayer.id,
        username: state.currentPlayer.username,
      },
      transports: ['websocket', 'polling'],
    })

    socketInstance.on('connect', () => {
      setConnected(true)
      setIsConnecting(false)
      console.log('Socket connected:', socketInstance.id)
      
      // Update user status to online
      socketInstance.emit('user:status', 'online')
    })

    socketInstance.on('disconnect', () => {
      setConnected(false)
      console.log('Socket disconnected')
    })

    socketInstance.on('connect_error', (error) => {
      setIsConnecting(false)
      console.error('Socket connection error:', error)
      toast.error('Sunucu bağlantısı kurulamadı')
    })

    // Game events
    socketInstance.on('game:joined', (game) => {
      actions.joinGame(game)
      toast.success('Oyuna katıldınız!')
    })

    socketInstance.on('game:left', () => {
      actions.leaveGame()
      toast.info('Oyunu terk ettiniz')
    })

    socketInstance.on('game:error', (error) => {
      toast.error(error.message || 'Oyun hatası')
    })

    // Chat events
    socketInstance.on('chat:message', (message) => {
      actions.sendMessage(message.content) // This will be handled by the reducer
    })

    // Friend events
    socketInstance.on('friend:request', (request) => {
      // Handle friend request
      toast.success(`Yeni arkadaş isteği: ${request.fromUsername}`)
    })

    socketInstance.on('friend:accepted', (data) => {
      toast.success(`${data.username} arkadaş isteğinizi kabul etti!`)
    })

    socketInstance.on('friend:declined', (data) => {
      toast.info(`${data.username} arkadaş isteğinizi reddetti`)
    })

    socketInstance.on('friend:added', (friend) => {
      actions.addFriend(friend.id)
      toast.success(`${friend.username} arkadaşlarınıza eklendi!`)
    })

    socketInstance.on('friend:removed', (friendId) => {
      actions.removeFriend(friendId)
      toast.info('Arkadaş kaldırıldı')
    })

    // User status updates
    socketInstance.on('user:status_changed', (data) => {
      // Update friend's status
      console.log(`${data.username} status: ${data.status}`)
    })

    setSocket(socketInstance)

    // Cleanup on unmount
    return () => {
      socketInstance.emit('user:status', 'offline')
      socketInstance.disconnect()
      setSocket(null)
      setConnected(false)
    }
  }, [state.currentPlayer?.id])

  const emit = <K extends keyof SocketEvents>(
    event: K,
    data: Parameters<SocketEvents[K]>[0]
  ) => {
    if (socket && connected) {
      socket.emit(event as string, data)
    } else {
      console.warn('Socket not connected')
      toast.error('Bağlantı kurulamadı')
    }
  }

  const on = <K extends keyof SocketEvents>(
    event: K,
    callback: Parameters<SocketEvents[K]>[1]
  ) => {
    if (socket) {
      socket.on(event as string, callback)
    }
  }

  const off = <K extends keyof SocketEvents>(
    event: K,
    callback?: Parameters<SocketEvents[K]>[1]
  ) => {
    if (socket) {
      socket.off(event as string, callback)
    }
  }

  // Handle user status on component unmount
  useEffect(() => {
    return () => {
      if (socket && state.currentPlayer) {
        socket.emit('user:status', 'offline')
      }
    }
  }, [socket, state.currentPlayer?.id])

  return (
    <SocketContext.Provider
      value={{
        socket,
        connected,
        isConnecting,
        emit,
        on,
        off,
      }}
    >
      {children}
    </SocketContext.Provider>
  )
}

export function useSocket() {
  const context = useContext(SocketContext)
  if (context === undefined) {
    throw new Error('useSocket must be used within a SocketProvider')
  }
  return context
}
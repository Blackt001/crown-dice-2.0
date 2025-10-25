'use client'

import { createContext, useContext, useReducer, ReactNode } from 'react'
import { GameState, Game, Player, ChatMessage, Achievement, Relic, Seal } from '@/types'

interface GameContextType {
  state: GameState
  dispatch: React.Dispatch<GameAction>
  actions: {
    login: (player: Player) => void
    logout: () => void
    joinGame: (game: Game) => void
    leaveGame: () => void
    sendMessage: (message: string) => void
    updatePlayer: (player: Partial<Player>) => void
    addFriend: (friendId: string) => void
    removeFriend: (friendId: string) => void
    respondToFriendRequest: (requestId: string, accepted: boolean) => void
  }
}

type GameAction =
  | { type: 'LOGIN'; payload: Player }
  | { type: 'LOGOUT' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_CURRENT_GAME'; payload: Game | null }
  | { type: 'SET_AVAILABLE_GAMES'; payload: Game[] }
  | { type: 'UPDATE_PLAYER'; payload: Partial<Player> }
  | { type: 'JOIN_GAME'; payload: Game }
  | { type: 'LEAVE_GAME' }
  | { type: 'ADD_FRIEND'; payload: string }
  | { type: 'REMOVE_FRIEND'; payload: string }
  | { type: 'ADD_FRIEND_REQUEST'; payload: any }
  | { type: 'RESPOND_TO_FRIEND_REQUEST'; payload: { requestId: string; accepted: boolean } }
  | { type: 'ADD_CHAT_MESSAGE'; payload: ChatMessage }
  | { type: 'SET_THEME'; payload: 'light' | 'dark' }
  | { type: 'SET_SOUND_ENABLED'; payload: boolean }
  | { type: 'SET_ANIMATIONS_ENABLED'; payload: boolean }

const initialState: GameState = {
  currentPlayer: null,
  currentGame: null,
  availableGames: [],
  friends: [],
  friendRequests: [],
  achievements: [],
  relics: [],
  seals: [],
  chat: [],
  isLoading: false,
  error: null,
  theme: 'light',
  soundEnabled: true,
  animationsEnabled: true,
}

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        currentPlayer: action.payload,
        isLoading: false,
        error: null,
      }
    
    case 'LOGOUT':
      return {
        ...initialState,
        theme: state.theme,
        soundEnabled: state.soundEnabled,
        animationsEnabled: state.animationsEnabled,
      }
    
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      }
    
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      }
    
    case 'SET_CURRENT_GAME':
      return {
        ...state,
        currentGame: action.payload,
      }
    
    case 'SET_AVAILABLE_GAMES':
      return {
        ...state,
        availableGames: action.payload,
      }
    
    case 'UPDATE_PLAYER':
      return {
        ...state,
        currentPlayer: state.currentPlayer 
          ? { ...state.currentPlayer, ...action.payload }
          : null,
      }
    
    case 'JOIN_GAME':
      return {
        ...state,
        currentGame: action.payload,
      }
    
    case 'LEAVE_GAME':
      return {
        ...state,
        currentGame: null,
      }
    
    case 'ADD_FRIEND':
      return {
        ...state,
        friends: [...state.friends, { id: action.payload } as Player],
      }
    
    case 'REMOVE_FRIEND':
      return {
        ...state,
        friends: state.friends.filter(friend => friend.id !== action.payload),
      }
    
    case 'ADD_FRIEND_REQUEST':
      return {
        ...state,
        friendRequests: [...state.friendRequests, action.payload],
      }
    
    case 'RESPOND_TO_FRIEND_REQUEST':
      const { requestId, accepted } = action.payload
      return {
        ...state,
        friendRequests: state.friendRequests.map(req =>
          req.id === requestId 
            ? { ...req, status: accepted ? 'accepted' : 'declined' }
            : req
        ),
      }
    
    case 'ADD_CHAT_MESSAGE':
      return {
        ...state,
        chat: [...state.chat, action.payload],
      }
    
    case 'SET_THEME':
      return {
        ...state,
        theme: action.payload,
      }
    
    case 'SET_SOUND_ENABLED':
      return {
        ...state,
        soundEnabled: action.payload,
      }
    
    case 'SET_ANIMATIONS_ENABLED':
      return {
        ...state,
        animationsEnabled: action.payload,
      }
    
    default:
      return state
  }
}

const GameContext = createContext<GameContextType | undefined>(undefined)

interface GameProviderProps {
  children: ReactNode
}

export function GameProvider({ children }: GameProviderProps) {
  const [state, dispatch] = useReducer(gameReducer, initialState)

  const actions = {
    login: (player: Player) => {
      dispatch({ type: 'LOGIN', payload: player })
    },

    logout: () => {
      dispatch({ type: 'LOGOUT' })
    },

    joinGame: (game: Game) => {
      dispatch({ type: 'JOIN_GAME', payload: game })
    },

    leaveGame: () => {
      dispatch({ type: 'LEAVE_GAME' })
    },

    sendMessage: (message: string) => {
      if (state.currentPlayer && state.currentGame) {
        const chatMessage: ChatMessage = {
          id: Math.random().toString(36).substr(2, 9),
          from: state.currentPlayer.id,
          content: message,
          timestamp: new Date(),
          type: 'game',
          gameId: state.currentGame.id,
        }
        dispatch({ type: 'ADD_CHAT_MESSAGE', payload: chatMessage })
      }
    },

    updatePlayer: (player: Partial<Player>) => {
      dispatch({ type: 'UPDATE_PLAYER', payload: player })
    },

    addFriend: (friendId: string) => {
      dispatch({ type: 'ADD_FRIEND', payload: friendId })
    },

    removeFriend: (friendId: string) => {
      dispatch({ type: 'REMOVE_FRIEND', payload: friendId })
    },

    respondToFriendRequest: (requestId: string, accepted: boolean) => {
      dispatch({ type: 'RESPOND_TO_FRIEND_REQUEST', payload: { requestId, accepted } })
    },
  }

  return (
    <GameContext.Provider value={{ state, dispatch, actions }}>
      {children}
    </GameContext.Provider>
  )
}

export function useGame() {
  const context = useContext(GameContext)
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider')
  }
  return context
}
// Core Game Types

export interface Player {
  id: string;
  username: string;
  avatar?: string;
  level: number;
  gold: number;
  power: number;
  powerProgress: number;
  totalGames: number;
  wins: number;
  losses: number;
  winRate: number;
  rank: number;
  status: 'online' | 'offline' | 'busy' | 'away';
  lastSeen?: Date;
  achievements: Achievement[];
  friends: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Dice {
  id: string;
  value: number;
  element?: ElementType;
  isModified?: boolean;
  modifier?: number;
}

export interface GameMove {
  playerId: string;
  dice: Dice[];
  combination: Combination;
  powerGained: number;
  goldGained: number;
  timestamp: Date;
}

export interface Game {
  id: string;
  players: (Player & { currentMove?: GameMove })[];
  currentPlayerIndex: number;
  gamePhase: 'waiting' | 'betting' | 'playing' | 'finished';
  bettingPhase: 'betting' | 'confirming' | 'rolling';
  gameMode: GameMode;
  difficulty: Difficulty;
  maxPlayers: number;
  minBet: number;
  maxBet: number;
  currentBet: number;
  winner?: string;
  totalRounds: number;
  roundNumber: number;
  stakes: number;
  chatEnabled: boolean;
  isPrivate: boolean;
  roomCode?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type ElementType = 'fire' | 'water' | 'earth' | 'air' | 'neutral';

export type Combination = 
  | 'Beşli Kent' // Five-card straight
  | 'Kare' // Four of a kind
  | 'Full House'
  | 'Kent' // Straight
  | 'Üçlü' // Three of a kind
  | 'Döper' // Two pair
  | 'Per' // Pair
  | 'Soylu Kan'; // Noble blood

export type GameMode = 
  | 'Kader Arenası' // Arena of Fate
  | 'Yadigârlar' // Relics
  | 'Tüccar' // Merchant
  | 'Turnuva' // Tournament
  | 'Hikaye'; // Story mode

export type Difficulty = 'Acemi' | 'Normal' | 'Usta';

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlockedAt?: Date;
  progress: number;
  maxProgress: number;
}

export interface Relic {
  id: string;
  name: string;
  description: string;
  icon: string;
  effect: RelicEffect;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  cost: number;
  unlocked: boolean;
  equipped?: boolean;
}

export interface RelicEffect {
  type: 'power_boost' | 'gold_multiplier' | 'dice_modifier' | 'special_combo';
  value: number;
  description: string;
}

export interface Seal {
  id: string;
  name: string;
  description: string;
  icon: string;
  effect: SealEffect;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  cost: number;
  charges: number;
  maxCharges: number;
  unlocked: boolean;
}

export interface SealEffect {
  type: 'reroll' | 'modify_dice' | 'extra_turn' | 'steal_gold' | 'block_power';
  value: number;
  description: string;
}

export interface Tournament {
  id: string;
  name: string;
  description: string;
  entryFee: number;
  prizePool: number;
  maxParticipants: number;
  currentParticipants: number;
  status: 'upcoming' | 'registration' | 'ongoing' | 'completed';
  startDate: Date;
  endDate?: Date;
  rounds: TournamentRound[];
  winner?: string;
  createdAt: Date;
}

export interface TournamentRound {
  id: string;
  roundNumber: number;
  matches: TournamentMatch[];
  status: 'pending' | 'active' | 'completed';
  startsAt: Date;
  endsAt?: Date;
}

export interface TournamentMatch {
  id: string;
  players: string[];
  winner?: string;
  gameId?: string;
  status: 'pending' | 'active' | 'completed';
  scheduledFor?: Date;
}

export interface ChatMessage {
  id: string;
  from: string;
  to?: string;
  content: string;
  timestamp: Date;
  type: 'global' | 'private' | 'game' | 'system';
  gameId?: string;
}

export interface FriendRequest {
  id: string;
  from: string;
  to: string;
  status: 'pending' | 'accepted' | 'declined';
  createdAt: Date;
  respondedAt?: Date;
}

// Store Types
export interface GameState {
  currentPlayer: Player | null;
  currentGame: Game | null;
  availableGames: Game[];
  friends: Player[];
  friendRequests: FriendRequest[];
  achievements: Achievement[];
  relics: Relic[];
  seals: Seal[];
  chat: ChatMessage[];
  isLoading: boolean;
  error: string | null;
  theme: 'light' | 'dark';
  soundEnabled: boolean;
  animationsEnabled: boolean;
}

export interface SocketEvents {
  'game:create': (config: CreateGameConfig) => void;
  'game:join': (gameId: string) => void;
  'game:leave': (gameId: string) => void;
  'game:bet': (gameId: string, bet: number) => void;
  'game:roll': (gameId: string, diceIndices: number[]) => void;
  'game:select-combo': (gameId: string, combination: Combination) => void;
  'game:use-seal': (gameId: string, sealId: string) => void;
  'game:use-relic': (gameId: string, relicId: string) => void;
  'game:chat': (gameId: string, message: string) => void;
  'friend:add': (username: string) => void;
  'friend:accept': (requestId: string) => void;
  'friend:decline': (requestId: string) => void;
  'friend:remove': (friendId: string) => void;
  'user:status': (status: Player['status']) => void;
}

export interface CreateGameConfig {
  gameMode: GameMode;
  difficulty: Difficulty;
  maxPlayers: number;
  minBet: number;
  isPrivate: boolean;
  password?: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// Element Configuration
export interface ElementConfig {
  type: ElementType;
  name: string;
  color: string;
  gradient: string;
  icon: string;
  description: string;
}

// Tournament Bracket
export interface TournamentBracket {
  rounds: TournamentRound[];
  currentRound: number;
  nextMatch?: string;
}

// Statistics
export interface PlayerStats {
  totalGames: number;
  wins: number;
  losses: number;
  winRate: number;
  totalGold: number;
  totalPower: number;
  bestStreak: number;
  currentStreak: number;
  favoriteMode: GameMode;
  averageBet: number;
  highestWin: number;
  lowestLoss: number;
}

export interface GlobalStats {
  totalPlayers: number;
  totalGames: number;
  activePlayers: number;
  gamesToday: number;
  topPlayers: Player[];
  recentGames: Game[];
}

// Theme Types
export interface Theme {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
  };
  isDark: boolean;
}

// Localization
export interface Localization {
  [key: string]: string | Localization;
}

// Settings
export interface UserSettings {
  theme: 'light' | 'dark' | 'auto';
  soundEnabled: boolean;
  musicEnabled: boolean;
  animationsEnabled: boolean;
  language: 'tr' | 'en';
  privacy: {
    showOnline: boolean;
    allowFriendRequests: boolean;
    showGameHistory: boolean;
  };
}
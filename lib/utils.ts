import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(d)
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('tr-TR').format(num)
}

export function formatGold(gold: number): string {
  if (gold >= 1000000) {
    return `${(gold / 1000000).toFixed(1)}M Altın`
  } else if (gold >= 1000) {
    return `${(gold / 1000).toFixed(1)}K Altın`
  }
  return `${formatNumber(gold)} Altın`
}

export function formatPower(power: number): string {
  return `${formatNumber(power)} Kudret`
}

export function formatWinRate(wins: number, losses: number): string {
  const total = wins + losses
  if (total === 0) return '0%'
  const rate = (wins / total) * 100
  return `${rate.toFixed(1)}%`
}

export function getRankName(level: number): string {
  if (level >= 50) return 'Efsane'
  if (level >= 40) return 'Usta'
  if (level >= 30) return 'Expert'
  if (level >= 20) return 'İleri'
  if (level >= 10) return 'Orta'
  if (level >= 5) return 'Başlangıç'
  return 'Yeni'
}

export function getRankColor(level: number): string {
  if (level >= 50) return 'text-yellow-400'
  if (level >= 40) return 'text-purple-400'
  if (level >= 30) return 'text-blue-400'
  if (level >= 20) return 'text-green-400'
  if (level >= 10) return 'text-orange-400'
  if (level >= 5) return 'text-gray-400'
  return 'text-white'
}

export function getElementColor(element: string): string {
  const colors = {
    fire: 'text-red-400',
    water: 'text-blue-400',
    earth: 'text-green-400',
    air: 'text-purple-400',
    neutral: 'text-gray-400'
  }
  return colors[element as keyof typeof colors] || colors.neutral
}

export function getElementGradient(element: string): string {
  const gradients = {
    fire: 'bg-gradient-element-fire',
    water: 'bg-gradient-element-water',
    earth: 'bg-gradient-element-earth',
    air: 'bg-gradient-element-air',
    neutral: 'bg-gray-400'
  }
  return gradients[element as keyof typeof gradients] || gradients.neutral
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

export function generateRoomCode(): string {
  return Math.random().toString(36).substring(2, 8).toUpperCase()
}

export function validateRoomCode(code: string): boolean {
  return /^[A-Z0-9]{6}$/.test(code)
}

export function calculateWinRate(wins: number, losses: number): number {
  const total = wins + losses
  if (total === 0) return 0
  return Math.round((wins / total) * 1000) / 10 // 1 decimal place
}

export function getNextLevelGold(level: number): number {
  return level * 1000 + 200 // Progressive requirement
}

export function getRandomElement(): 'fire' | 'water' | 'earth' | 'air' | 'neutral' {
  const elements = ['fire', 'water', 'earth', 'air'] as const
  const randomIndex = Math.floor(Math.random() * elements.length)
  return elements[randomIndex] === undefined ? 'neutral' : elements[randomIndex]
}

export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function isValidUsername(username: string): boolean {
  return /^[a-zA-Z0-9_]{3,20}$/.test(username)
}

export function sanitizeUsername(username: string): string {
  return username.toLowerCase().replace(/[^a-z0-9_]/g, '')
}
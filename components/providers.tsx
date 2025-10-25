'use client'

import { ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { GameProvider } from '@/store/game-context'
import { SocketProvider } from '@/store/socket-context'
import { ThemeProvider } from '@/store/theme-context'
import { AnimationProvider } from '@/store/animation-context'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
})

interface ProvidersProps {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AnimationProvider>
          <GameProvider>
            <SocketProvider>
              {children}
            </SocketProvider>
          </GameProvider>
        </AnimationProvider>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from '@/components/providers'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Crown & Dice 2.0',
  description: 'Modern Çok Oyunculu Zar Deneyimi - En iyi Türkçe zar oyunu',
  keywords: ['zar', 'oyun', 'multiplayer', 'çok oyunculu', 'türkçe', 'dice', 'game'],
  authors: [{ name: 'MiniMax Agent' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#6366F1',
  manifest: '/manifest.json',
  openGraph: {
    title: 'Crown & Dice 2.0',
    description: 'Modern Çok Oyunculu Zar Deneyimi',
    type: 'website',
    locale: 'tr_TR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Crown & Dice 2.0',
    description: 'Modern Çok Oyunculu Zar Deneyimi',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="application-name" content="Crown & Dice 2.0" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Crown & Dice 2.0" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#6366F1" />
        <meta name="msapplication-tap-highlight" content="no" />
      </head>
      <body className={`${inter.className} bg-background text-text-primary min-h-screen`}>
        <Providers>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: 'var(--color-surface)',
                color: 'var(--color-text-primary)',
                borderRadius: '16px',
                border: '1px solid rgba(99, 102, 241, 0.1)',
                boxShadow: '0 8px 32px rgba(99, 102, 241, 0.12)',
              },
              success: {
                iconTheme: {
                  primary: '#10B981',
                  secondary: '#FFFFFF',
                },
              },
              error: {
                iconTheme: {
                  primary: '#EF4444',
                  secondary: '#FFFFFF',
                },
              },
            }}
          />
        </Providers>
      </body>
    </html>
  )
}
import { HeroSection } from '@/components/hero-section'
import { GameGrid } from '@/components/game-grid'
import { PlayerDashboard } from '@/components/player-dashboard'
import { FriendsPanel } from '@/components/friends-panel'
import { NewsSection } from '@/components/news-section'
import { Leaderboard } from '@/components/leaderboard'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          
          {/* Left Column - Player Dashboard */}
          <div className="xl:col-span-1">
            <PlayerDashboard />
          </div>
          
          {/* Center Column - Games */}
          <div className="xl:col-span-2">
            <div className="space-y-8">
              <GameGrid />
              <Leaderboard />
            </div>
          </div>
          
          {/* Right Column - Friends & Social */}
          <div className="xl:col-span-1">
            <FriendsPanel />
          </div>
        </div>
        
        {/* News & Updates */}
        <div className="mt-16">
          <NewsSection />
        </div>
      </div>
    </div>
  )
}
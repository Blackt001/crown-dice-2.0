'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  NewspaperIcon,
  TrophyIcon,
  SparklesIcon,
  CalendarIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline'

// Mock news data
const newsItems = [
  {
    id: '1',
    title: 'Yeni Turnuva Sistemi Yayınlandı!',
    excerpt: 'Haftalık turnuvalar başlıyor. Büyük ödüller kazanma şansı!',
    type: 'feature',
    date: '2 saat önce',
    image: '/api/placeholder/300/200',
    featured: true
  },
  {
    id: '2',
    title: 'Yeni Yadigâr: Ateş Ejderi Mührü',
    excerpt: 'Güçlü yeni bir yadigâr oyununuzda! Özel güçlere sahip.',
    type: 'item',
    date: '6 saat önce',
    image: '/api/placeholder/300/200',
    featured: false
  },
  {
    id: '3',
    title: 'Haftalık İstatistikler',
    excerpt: 'Bu hafta 12,847 aktif oyuncu ve 3,421 oyun oynandı!',
    type: 'stats',
    date: '1 gün önce',
    image: '/api/placeholder/300/200',
    featured: false
  },
  {
    id: '4',
    title: 'Bakım Tamamlandı',
    excerpt: 'Sistem güncellemeleri ve performans iyileştirmeleri tamamlandı.',
    type: 'maintenance',
    date: '2 gün önce',
    image: '/api/placeholder/300/200',
    featured: false
  }
]

const upcomingEvents = [
  {
    id: '1',
    title: 'Haftalık Turnuva',
    date: '24 Ekim 2025',
    time: '20:00',
    type: 'tournament',
    prize: '10,000 Altın'
  },
  {
    id: '2',
    title: 'Altın Gecesi Etkinliği',
    date: '25 Ekim 2025',
    time: '19:00',
    type: 'event',
    prize: '2x Altın Kazanımı'
  }
]

export function NewsSection() {
  const getNewsIcon = (type: string) => {
    switch (type) {
      case 'feature':
        return <SparklesIcon className="w-5 h-5" />
      case 'item':
        return <TrophyIcon className="w-5 h-5" />
      case 'stats':
        return <CalendarIcon className="w-5 h-5" />
      case 'maintenance':
        return <NewspaperIcon className="w-5 h-5" />
      default:
        return <NewspaperIcon className="w-5 h-5" />
    }
  }

  const getNewsTypeColor = (type: string) => {
    switch (type) {
      case 'feature':
        return 'bg-blue-100 text-blue-800'
      case 'item':
        return 'bg-yellow-100 text-yellow-800'
      case 'stats':
        return 'bg-green-100 text-green-800'
      case 'maintenance':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'tournament':
        return 'bg-purple-100 text-purple-800'
      case 'event':
        return 'bg-orange-100 text-orange-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'tournament':
        return <TrophyIcon className="w-5 h-5" />
      case 'event':
        return <SparklesIcon className="w-5 h-5" />
      default:
        return <CalendarIcon className="w-5 h-5" />
    }
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Haberler & Güncellemeler</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          En son oyun haberleri, güncellemeler ve özel etkinlikler hakkında bilgi alın.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* News Feed */}
        <div className="lg:col-span-2 space-y-6">
          {/* Featured News */}
          {newsItems.filter(item => item.featured).map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative overflow-hidden rounded-premium bg-gradient-to-r from-primary-500 to-purple-500 text-white"
            >
              <div className="absolute inset-0 bg-black/20" />
              <div className="relative p-8">
                <div className="flex items-center gap-2 mb-4">
                  <div className="bg-white/20 rounded-full p-2">
                    {getNewsIcon(item.type)}
                  </div>
                  <span className="text-white/90 text-sm font-medium">{item.date}</span>
                </div>
                
                <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                <p className="text-white/90 mb-6 text-lg">{item.excerpt}</p>
                
                <Button
                  variant="secondary"
                  className="bg-white text-primary-600 hover:bg-gray-50"
                >
                  Devamını Oku
                  <ChevronRightIcon className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </motion.div>
          ))}

          {/* Regular News */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Son Haberler</h3>
            {newsItems.filter(item => !item.featured).map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getNewsTypeColor(item.type)}`}>
                            {getNewsIcon(item.type)}
                            {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                          </span>
                          <span className="text-gray-500 text-sm">{item.date}</span>
                        </div>
                        
                        <h4 className="font-semibold text-lg mb-2">{item.title}</h4>
                        <p className="text-gray-600 text-sm">{item.excerpt}</p>
                      </div>
                      
                      <Button variant="ghost" size="sm">
                        <ChevronRightIcon className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Events */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="w-5 h-5" />
                Yaklaşan Etkinlikler
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingEvents.map((event) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-4 rounded-subtle border border-gray-200 hover:border-primary-300 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="bg-primary-100 rounded-full p-2">
                      {getEventIcon(event.type)}
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">{event.title}</h4>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div className="flex items-center gap-1">
                          <CalendarIcon className="w-3 h-3" />
                          {event.date}
                        </div>
                        <div>{event.time}</div>
                        <div className="text-primary-600 font-medium">{event.prize}</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
              
              <Button variant="outline" className="w-full">
                Tüm Etkinlikleri Gör
              </Button>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Hızlı Bağlantılar</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <TrophyIcon className="w-4 h-4 mr-2" />
                Turnuvalar
              </Button>
              
              <Button variant="outline" className="w-full justify-start">
                <SparklesIcon className="w-4 h-4 mr-2" />
                Yenilikler
              </Button>
              
              <Button variant="outline" className="w-full justify-start">
                <NewspaperIcon className="w-4 h-4 mr-2" />
                Tam Sürüm Notları
              </Button>
              
              <Button variant="outline" className="w-full justify-start">
                <CalendarIcon className="w-4 h-4 mr-2" />
                Etkinlik Takvimi
              </Button>
            </CardContent>
          </Card>

          {/* Discord / Social */}
          <Card>
            <CardHeader>
              <CardTitle>Topluluk</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">
                En son haberler ve etkinlikler için Discord sunucumuza katılın!
              </p>
              
              <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                Discord'a Katıl
              </Button>
              
              <div className="text-xs text-gray-500 text-center">
                1,247 üye aktif olarak tartışıyor
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
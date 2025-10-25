# Crown & Dice 2.0

Modern Çok Oyunculu Zar Deneyimi - Next.js tabanlı Türkçe oyun platformu

## 🎮 Özellikler

### Oyun Mekanikleri
- **Gelişmiş Zar Sistemi**: 6 zar ile oyun ve element sistemi
- **Çoklu Oyun Modları**: Kader Arenası, Yadigârlar, Turnuvalar, Hikaye Modu
- **Zorluk Seviyeleri**: Acemi, Normal, Usta
- **Güç Sistemi**: Kudret kazanımı ve özel yetenekler
- **Seviye İlerleme**: Altın toplayarak seviye atlama

### Sosyal Özellikler
- **Gerçek Zamanlı Multiplayer**: Socket.io ile anlık oyun
- **Arkadaş Sistemi**: Arkadaş ekleme ve chat
- **Liderlik Tablosu**: Global ve arkadaş sıralaması
- **Turnuva Sistemi**: Rekabetçi maçlar ve ödüller

### Modern UI/UX
- **3D Animasyonlar**: Framer Motion ile akıcı animasyonlar
- **Responsive Tasarım**: Mobil ve masaüstü uyumlu
- **Dark/Light Mode**: Tema değiştirme desteği
- **Glasmorphism Efektleri**: Modern görsel tasarım

### Teknik Özellikler
- **Next.js 14**: App Router ve Server Components
- **TypeScript**: Tip güvenliği
- **Tailwind CSS**: Utility-first CSS framework
- **Zustand**: State management
- **React Query**: Server state yönetimi
- **Socket.io**: WebSocket iletişim

## 🚀 Kurulum

### Ön Gereksinimler
- Node.js 18+ 
- npm veya yarn

### Adımlar

1. **Depoyu klonlayın**
```bash
git clone <repository-url>
cd crown-dice-2.0
```

2. **Bağımlılıkları yükleyin**
```bash
npm install
# veya
yarn install
```

3. **Çevre değişkenlerini ayarlayın**
```bash
cp .env.example .env.local
```

`.env.local` dosyasını düzenleyin:
```env
NEXT_PUBLIC_SOCKET_URL=http://localhost:3001
MONGODB_URI=mongodb://localhost:27017/crown-dice
```

4. **Geliştirme sunucusunu başlatın**
```bash
npm run dev
# veya
yarn dev
```

5. **Tarayıcıda açın**
```
http://localhost:3000
```

## 🛠️ Geliştirme

### Proje Yapısı
```
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Ana sayfa
│   └── globals.css        # Global styles
├── components/            # React bileşenleri
│   ├── ui/               # Temel UI bileşenleri
│   ├── hero-section.tsx  # Hero bölümü
│   ├── game-grid.tsx     # Oyun listesi
│   └── ...
├── lib/                  # Utility fonksiyonları
├── store/                # State management
├── types/                # TypeScript tip tanımları
└── styles/               # CSS stilleri
```

### Kullanılan Teknolojiler
- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **State**: Zustand, React Query
- **Backend**: Socket.io, Express
- **Database**: MongoDB
- **Deployment**: Vercel

## 🎯 Roadmap

### Faz 1: Temel Altyapı ✅
- [x] Next.js kurulumu ve yapılandırma
- [x] TypeScript tip tanımları
- [x] Temel UI bileşenleri
- [x] State management
- [x] Ana sayfa ve bileşenler

### Faz 2: Oyun Mekaniği
- [ ] Zar atma animasyonları
- [ ] Kombinasyon hesaplama sistemi
- [ ] Güç sistemi implementasyonu
- [ ] Oyun odası yönetimi

### Faz 3: Çok Oyunculu Özellikler
- [ ] Socket.io sunucu implementasyonu
- [ ] Gerçek zamanlı oyun senkronizasyonu
- [ ] Chat sistemi
- [ ] Arkadaş yönetimi

### Faz 4: Sosyal Özellikler
- [ ] Kullanıcı hesap sistemi
- [ ] Liderlik tabloları
- [ ] Turnuva sistemi
- [ ] Başarım sistemi

### Faz 5: İleri Seviye
- [ ] PWA implementasyonu
- [ ] Çoklu dil desteği
- [ ] Analytics entegrasyonu
- [ ] Monetizasyon sistemi

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit edin (`git commit -m 'Add amazing feature'`)
4. Branch'e push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakın.

## 📞 İletişim

- **Geliştirici**: MiniMax Agent
- **Discord**: [Topluluk Sunucu](https://discord.gg/...)
- **Email**: support@crowndice.com

## 🙏 Teşekkürler

- Next.js ekibi için modern web framework'ü
- Tailwind CSS ekibi için utility-first CSS framework'ü
- Framer Motion ekibi için animasyon kütüphanesi
- Socket.io ekibi için real-time communication
- Tüm beta test eden oyuncular

---

**Not**: Bu proje henüz geliştirilmektedir. Özellikler ve API'ler değişebilir.
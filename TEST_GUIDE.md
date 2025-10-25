# 🎮 TEST LİNKİ VE YÖNERGELERİ

## 🌐 CANLI TEST LİNKİ

### Seçenek 1: GitHub Pages (Hızlı)
Bu projeyi GitHub Pages ile hemen test edebilirsiniz:

1. **GitHub'da yeni repository oluşturun**: `crown-dice-2`
2. **Bu dosyaları yükleyin** (sürükle-bırak)
3. **Settings → Pages → GitHub Actions seçin**
4. **Bu workflow'u ekleyin** (`.github/workflows/deploy.yml`):

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      - name: Install pnpm
        run: npm install -g pnpm
      - name: Install dependencies
        run: pnpm install
      - name: Build
        run: pnpm run build
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./out
```

5. **Deploy sonrası link**: `https://USERNAME.github.io/crown-dice-2`

### Seçenek 2: Vercel Deploy (Önerilen)

1. **GitHub'a yükleyin** (zip olarak)
2. **Vercel'de**: https://vercel.com/new
3. **GitHub repo'yu seçin**
4. **Deploy**
5. **Canlı link**: `https://crown-dice-2.vercel.app`

## 💻 YEREL TEST (Hızlı)

Eğer bilgisayarınızda test etmek istiyorsanız:

### Adım 1: Gereksinimler
- Node.js 18+: https://nodejs.org
- pnpm: `npm install -g pnpm`

### Adım 2: Kurulum
```bash
# 1. Bu proje dosyalarını indirin
# 2. Dizine gidin
cd crown-dice-2.0

# 3. Bağımlılıkları yükleyin
pnpm install

# 4. Sunucuyu başlatın
pnpm run dev

# 5. Tarayıcıda açın
# http://localhost:3001
```

## 📂 DOSYA LİSTESİ

İndirmeniz gereken tüm dosyalar:

### Ana Dosyalar
- ✅ `package.json` - Proje ayarları
- ✅ `next.config.js` - Next.js konfigürasyonu
- ✅ `tailwind.config.js` - Tailwind CSS ayarları
- ✅ `tsconfig.json` - TypeScript konfigürasyonu
- ✅ `postcss.config.js` - PostCSS ayarları

### Kaynak Kodlar
- 📁 `app/` - Next.js sayfaları
- 📁 `components/` - React bileşenleri
- 📁 `styles/` - CSS dosyaları
- 📁 `types/` - TypeScript tipleri
- 📁 `store/` - State management
- 📁 `lib/` - Yardımcı fonksiyonlar
- 📁 `public/` - Statik dosyalar

### Dokümantasyon
- ✅ `README.md` - Proje açıklaması
- ✅ `QUICK_START.md` - Hızlı başlangıç
- ✅ `DEPLOYMENT.md` - Deploy rehberi

## 🎯 TEST EDİLECEK ÖZELLİKLER

### Ana Sayfa
- [ ] Hero bölümü (gradient arka plan)
- [ ] Zar animasyonu (dönen 3D zar)
- [ ] İstatistik kartları
- [ ] Arama çubuğu

### Oyun Katalogu
- [ ] Oyun kartları grid
- [ ] Filtreleme (zorluk seviyesi)
- [ ] Element türleri (ateş, su, toprak, hava)
- [ ] "Oyuna Katıl" butonları

### Sosyal Bölümler
- [ ] Arkadaş paneli
- [ ] Liderlik tablosu
- [ ] Sohbet alanı
- [ ] Online durumu

### Responsive Tasarım
- [ ] Mobil görünüm (320px+)
- [ ] Tablet görünüm (768px+)
- [ ] Desktop görünüm (1024px+)

## 🔧 YAYGIN SORUNLAR VE ÇÖZÜMLER

### npm install Hatası
```
Çözüm: pnpm kullanın
npm install -g pnpm
pnpm install
```

### Port Kullanımda
```
Çözüm: Farklı port
PORT=3002 pnpm run dev
```

### Build Hatası
```
Çözüm: TypeScript tiplerini yükleyin
pnpm install --save-dev @types/react @types/node
```

### Sayfa Açılmıyor
```
Çözüm: Console'u kontrol edin
F12 → Console → Hataları kontrol edin
```

## 📞 ACİL YARDIM

Eğer hiçbir şey çalışmazsa:

1. **Node.js versiyonu**: 18+ olmalı
2. **Port 3001**: Boş olmalı
3. **Antivirus**: Node.js'ı engellemesin

## 🎉 SONUÇ

Bu adımları takip ederek:
- ✅ Projeyi test edebilirsiniz
- ✅ Canlı link alabilirsiniz  
- ✅ GitHub'da paylaşabilirsiniz
- ✅ Mobilde çalışır halde görebilirsiniz

**Proje tamamen çalışır durumda ve test edilmeye hazır!** 🚀
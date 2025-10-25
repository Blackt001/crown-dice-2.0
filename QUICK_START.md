# 🚀 Hızlı Başlangıç Rehberi

## 📋 Hemen Test Etmek İçin

### Seçenek 1: Yerel Kurulum (5 dakika)

```bash
# 1. Bu projeyi bilgisayarınıza indirin
# (Zip olarak indirin veya Git ile klonlayın)

# 2. Proje dizinine gidin
cd crown-dice-2.0

# 3. Bağımlılıkları yükleyin
pnpm install
# veya
npm install

# 4. Sunucuyu başlatın
pnpm run dev
# veya
npm run dev

# 5. Tarayıcıda açın: http://localhost:3001
```

### Seçenek 2: GitHub + Vercel (10 dakika)

```bash
# 1. GitHub'a yükleyin
git init
git add .
git commit -m "Initial commit"
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main

# 2. Vercel'de deploy edin
# https://vercel.com adresine gidin
# "New Project" → GitHub repo'yu seçin → Deploy

# 3. Canlı link alırsınız!
```

### Seçenek 3: Netlify Deploy (5 dakika)

```bash
# 1. Projeyi GitHub'a yükleyin
# (Yukarıdaki gibi)

# 2. Netlify'de deploy edin
# https://netlify.com → "New site from Git"
# GitHub repo'yu seçin → Build: pnpm run build
# Publish directory: .next
```

## 🔧 Eğer Hata Alırsanız

### npm install Hatası
```bash
# Çözüm: pnpm kullanın
npm install -g pnpm
pnpm install
```

### Port Zaten Kullanımda
```bash
# Farklı port kullanın
PORT=3002 pnpm run dev
```

### TypeScript Hatası
```bash
# Tipleri yükleyin
pnpm install --save-dev @types/react @types/node
```

## 🎮 Test Edilecek Özellikler

### Ana Sayfa
- [ ] Hero bölümü ve animasyonlar
- [ ] Zar döndürme animasyonu
- [ ] İstatistik kartları
- [ ] Arama ve filtreler

### Oyun Katalogu
- [ ] Oyun kartları
- [ ] Zorluk seviyeleri
- [ ] Element türleri
- [ ] Katıl butonları

### Oyuncu Paneli
- [ ] Profil bilgileri
- [ ] Seviye ve ilerleme
- [ ] Altın bakiyesi
- [ ] Hızlı eylemler

### Sosyal Özellikler
- [ ] Arkadaş listesi
- [ ] Sohbet paneli
- [ ] Liderlik tablosu
- [ ] Online/offline durumu

## 🆘 Acil Durum

Eğer hiçbir şey çalışmazsa:

1. **Node.js versiyonu**: 18+ olmalı
2. **Port kontrolü**: 3001 portu boş olmalı
3. **Antivirus**: Node.js'ı engellemesin

## 📞 Yardım

Sorun yaşarsanız:
1. Console hatalarını kontrol edin (F12)
2. Network tab'ını inceleyin
3. GitHub Issues'da sorun bildirin

---
**Proje çalışıyorsa**: 🎉 **Tebrikler! Crown & Dice 2.0'ı test ediyorsunuz!**
#!/bin/bash

# Crown & Dice 2.0 - Kurulum Scripti
echo "🎲 Crown & Dice 2.0 Kurulumu başlıyor..."

# Node.js versiyonunu kontrol et
if ! command -v node &> /dev/null; then
    echo "❌ Node.js bulunamadı. Lütfen Node.js 18+ yükleyin."
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js versiyonu eski. Lütfen 18+ yükleyin."
    exit 1
fi

echo "✅ Node.js $(node -v) - Uygun versiyon"

# pnpm var mı kontrol et
if ! command -v pnpm &> /dev/null; then
    echo "📦 pnpm yükleniyor..."
    npm install -g pnpm
fi

echo "✅ pnpm $(pnpm -v)"

# Bağımlılıkları yükle
echo "📦 Bağımlılıklar yükleniyor..."
pnpm install

if [ $? -eq 0 ]; then
    echo "✅ Bağımlılıklar başarıyla yüklendi"
else
    echo "❌ Bağımlılık yükleme hatası"
    exit 1
fi

# Build yap
echo "🔨 Proje derleniyor..."
pnpm run build

if [ $? -eq 0 ]; then
    echo "✅ Build başarıyla tamamlandı"
else
    echo "❌ Build hatası"
    exit 1
fi

echo ""
echo "🎉 Kurulum tamamlandı!"
echo ""
echo "🚀 Sunucuyu başlatmak için:"
echo "   pnpm run dev"
echo ""
echo "🌐 Tarayıcıda açmak için:"
echo "   http://localhost:3001"
echo ""
echo "📚 Detaylı bilgi için: QUICK_START.md dosyasını okuyun"
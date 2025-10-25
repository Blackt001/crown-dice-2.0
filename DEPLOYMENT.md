# GitHub + Vercel Deployment Rehberi

## 🎯 15 Dakikada Canlı Site!

### 1. GitHub Repository Oluştur

1. **GitHub'a gidin**: https://github.com
2. **Yeni repository**: Sağ üstteki "+" → "New repository"
3. **Repository ayarları**:
   - Repository name: `crown-dice-2`
   - Public seçin
   - "Add a README file" ✅
   - "Add .gitignore": Node seçin
   - "Choose a license": MIT seçin
   - "Create repository"

### 2. Proje Dosyalarını Yükle

#### Seçenek A: Dosyaları GitHub'da Düzenleme
1. Repository'nizde "uploading an existing file" linkine tıklayın
2. Tüm proje dosyalarını sürükleyip bırakın:
   - app/
   - components/
   - styles/
   - types/
   - store/
   - lib/
   - package.json
   - tailwind.config.js
   - tsconfig.json
   - README.md
   - QUICK_START.md

#### Seçenek B: Git ile Yükleme (Terminal)
```bash
# 1. Repository'yi klonlayın
git clone https://github.com/USERNAME/crown-dice-2.git
cd crown-dice-2

# 2. Proje dosyalarını kopyalayın
# (Tüm dosyaları bu dizine kopyalayın)

# 3. Git'e ekleyin
git add .
git commit -m "Crown & Dice 2.0 - Initial commit"
git push -u origin main
```

### 3. Vercel ile Deploy

1. **Vercel'e gidin**: https://vercel.com
2. **"Sign Up"**: GitHub ile giriş yapın
3. **"New Project"**:
   - GitHub repository'nizi seçin: `crown-dice-2`
   - "Import" tıklayın

4. **Deploy Ayarları**:
   - Framework Preset: **Next.js**
   - Root Directory: `.` (default)
   - Build Command: `pnpm run build` (default)
   - Output Directory: `.next` (default)
   - Install Command: `pnpm install` (default)

5. **Deploy**: "Deploy" butonuna tıklayın

### 4. Canlı Siteyi Alın!

Deploy tamamlandığında Vercel size şu şekilde bir link verir:
- `https://crown-dice-2.vercel.app`
- Veya özel domain: `https://crowndice.yourdomain.com`

🎉 **İşte bu! Artık dünya çapında erişilebilir bir sitede!**

### 5. Sürekli Güncelleme

Kodunuzu değiştirdiğinizde:
```bash
git add .
git commit -m "Yeni özellik eklendi"
git push
```
→ Vercel otomatik olarak yeni versiyonu deploy eder!

## 🔧 Alternatif Deploy Seçenekleri

### Netlify
1. https://netlify.com → "New site from Git"
2. GitHub repo'yu seçin
3. Build: `pnpm run build`
4. Publish directory: `.next`

### GitHub Pages (Static)
Sadece static site için:
1. GitHub repo → Settings → Pages
2. Source: GitHub Actions
3. Workflow oluşturun (`.github/workflows/deploy.yml`)

## 📱 Test ve Doğrulama

Deploy sonrası şunları test edin:
- [ ] Site açılıyor mu?
- [ ] Responsive tasarım çalışıyor mu?
- [ ] Tüm sayfalar yükleniyor mu?
- [ ] CSS stilleri doğru mu?
- [ ] JavaScript hataları var mı? (F12 Console)

## 🆘 Sorun Giderme

### Build Hatası
```bash
# Versiyon uyumsuzluğu kontrol edin
npm ls
pnpm update
```

### Vercel Build Failed
- `vercel.json` dosyası ekleyin
- Environment variables kontrol edin

### Static Export Gerekli
Next.js static export için:
```javascript
// next.config.js
module.exports = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
}
```

---
**🎯 Bu adımları takip ederek 15 dakikada canlı sitede olursunuz!**
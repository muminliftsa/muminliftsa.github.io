# Mümin Hasanoğlu — Portfolyo Sitesi Planı

## Bağlam
Mümin Hasanoğlu, UI/UX ve marka kimliği tasarımcısı olarak freelance müşteri bulmak ve kişisel marka oluşturmak için bir portfolyo sitesi istiyor. `D:\claude\d2` boş; sıfırdan, bağımlılıksız saf HTML/CSS/JS ile kurulacak. Gerçek içerik henüz yok → tüm metin/görseller kolayca değiştirilebilir yer tutucu olacak.

## Kararlar (kullanıcı cevapları)
- **Alan:** UI/UX (web & mobil) + Marka kimliği / logo
- **Amaç:** Freelance müşteri + kişisel marka
- **Dil:** Türkçe + İngilizce (TR/EN butonu, seçim localStorage'da saklanır)
- **Teknoloji:** Saf HTML/CSS/JS, framework/derleme yok
- **Stil:** Cesur & deneysel, **krem + turuncu/kırmızı** poster estetiği
- **Animasyon:** Maksimum deneysel
- **İçerik:** Yer tutucu; 4 proje (2 UI/UX + 2 marka)
- **Proje detayı:** Tek sayfa + açılır pencere (modal)
- **Bölümler:** Hizmetler + süreç, müşteri yorumları, fiyat paketleri, hakkımda (zaman çizelgesi + rakamlar)
- **Fiyat:** TR'de ₺, EN'de $
- **İletişim:** mailto + WhatsApp butonları (form yok)
- **Yayın:** Belirsiz → her statik hostinge yüklenebilir yapı + sonda yayın rehberi

## Dosya yapısı
```
D:\claude\d2\
├── index.html          # Tüm bölümler, data-i18n anahtarlarıyla
├── css\style.css       # Tasarım token'ları, layout, animasyonlar, responsive
├── js\i18n.js          # TR/EN sözlükleri (tüm metinler + fiyatlar burada)
├── js\data.js          # 4 projenin verisi (başlık, kategori, problem/süreç/sonuç, renkler)
├── js\main.js          # Animasyonlar, imleç, filtre, modal, dil değişimi
├── assets\             # favicon.svg, ileride gerçek görseller buraya
└── README.md           # İçerik nasıl değiştirilir + yayın seçenekleri (Netlify/Vercel/GitHub Pages)
```

## Görsel sistem
- **Renkler:** krem `#F3EBDD`, mürekkep siyahı `#141210`, turuncu `#FF5B1F`, canlı/parlak kırmızı `#FF3B30` (koyu ton yok), ikincil koyu krem.
- **Tipografi:** Google Fonts — başlıklar için kalın/sıkışık display font (ör. *Archivo Black* / *Syne*), gövde için *Inter*. Devasa başlıklar (clamp ile 12–18vw), büyük harf, sıkı satır aralığı.
- **Düzen:** Asimetrik grid, kalın kenarlıklar, kırık/üst üste binen bloklar, grain (gürültü) dokusu, poster gibi bölüm numaraları (01/02…).
- **Yer tutucu görseller:** Harici indirme yok; CSS gradient + inline SVG ile üretilmiş soyut "mockup" kartları (telefon/ekran çerçevesi, logo şekilleri).

## Bölümler (index.html)
1. **Preloader** — sayaç 0→100 + perde açılma animasyonu.
2. **Header** — logo "MH", menü, TR/EN butonu, mobilde tam ekran menü.
3. **Hero** — "MÜMİN HASANOĞLU" harf harf giren dev başlık, ünvan, fareyi takip eden/manyetik "Projeye başlayalım" butonu, dönen dairesel rozet yazısı.
4. **Kayan bant (marquee)** — "UI/UX • BRANDING • LOGO • …", scroll hızına göre hızlanan/yön değiştiren.
5. **Projeler** — filtre (Tümü / UI-UX / Marka), 4 kart; hover'da imleç "GÖR" etiketine dönüşür, kart eğilir (tilt). Tıklayınca **modal**: problem → süreç → çözüm → sonuç, araçlar, görseller.
6. **Hizmetler + Süreç** — 3 hizmet (UI/UX, Marka Kimliği, Logo) açılır akordeon; süreç 4 adım (Keşif → Strateji → Tasarım → Teslim) yatay/yapışkan scroll.
7. **Hakkımda** — kısa metin, sayan rakamlar (Proje, Yıl, Müşteri), deneyim zaman çizelgesi.
8. **Yorumlar** — sürüklenebilir/kaydırılabilir yorum kartları (3 adet).
9. **Fiyat paketleri** — 3 paket (Başlangıç / Profesyonel / Premium), dile göre ₺ / $; "Teklif al" → WhatsApp önceden yazılmış mesaj.
10. **İletişim / Footer** — dev "MERHABA DE" başlığı, mailto ve WhatsApp butonları, sosyal linkler (yer tutucu), yukarı dön. En altta **© 2026 Mümin Hasanoğlu. Tüm hakları saklıdır.** satırı ve **KVKK Aydınlatma Metni / Gizlilik Politikası / Çerez Politikası** linkleri — tıklanabilir görünür (hover efekti, imleç) ama `href="#"` + `preventDefault` ile hiçbir yere gitmez, sayfa da zıplamaz. Metinler TR/EN çevrilir.

## Animasyonlar (main.js, kütüphanesiz)
- Özel imleç (nokta + takip eden halka, `mix-blend-mode: difference`, duruma göre metin).
- `IntersectionObserver` ile scroll-reveal (maskeli satır kayması, clip-path açılışları).
- Manyetik butonlar, kart tilt'i, scroll'a bağlı paralaks ve marquee hızı.
- Sayaç animasyonları, preloader, bölümler arası arka plan renk geçişi.
- `prefers-reduced-motion` ve dokunmatik cihazlarda ağır efektler/imleç kapanır (erişilebilirlik + performans).

## Çok dillilik
- Tüm metinler `data-i18n="key"` ile işaretlenir; `i18n.js` içinde `tr` / `en` nesneleri.
- Dil değişince metinler + fiyatlar + `<html lang>` + meta başlık güncellenir; tercih localStorage'da kalır; ilk ziyarette tarayıcı dili algılanır.

## Kolay düzenlenebilirlik
- Kişisel bilgiler (e-posta, WhatsApp numarası, sosyal linkler) `js\data.js` en üstünde tek bir `CONFIG` nesnesinde.
- Projeler `data.js`'deki diziye eklenerek çoğaltılabilir; gerçek görsel yolu verildiğinde placeholder yerine kullanılır.

## SEO / Temel
- Anlamlı başlıklar, meta description, Open Graph etiketleri, SVG favicon, `alt` metinleri, klavye ile modal kapatma (Esc), odak yönetimi.

## Doğrulama
1. `.claude\launch.json` ile basit statik sunucu (ör. `npx serve` veya `python -m http.server`) tanımlayıp yerleşik tarayıcıda açmak.
2. Kontrol: preloader, imleç, scroll animasyonları, filtre, modal aç/kapat (Esc dahil), TR↔EN geçişi (fiyat ₺↔$), WhatsApp/mailto linkleri.
3. Mobil (375px) ve tablet görünümünde ekran görüntüsü ile responsive kontrol; konsolda hata olmaması.
4. README'de yayın adımları (Netlify sürükle-bırak, GitHub Pages).

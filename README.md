# Mümin Hasanoğlu — Portfolyo Sitesi

Saf HTML/CSS/JS; derleme veya framework yok.

## Yerelde çalıştırma
```
python -m http.server 5173
```
Sonra `http://localhost:5173` adresini aç. (`index.html`'e çift tıklamak da çalışır.)

## İçeriği değiştirme
| Ne | Nerede |
|---|---|
| E-posta, WhatsApp numarası, sosyal linkler | `js/data.js` → en üstteki `CONFIG` |
| Projeler (başlık, problem/süreç/çözüm/sonuç, araçlar, renkler) | `js/data.js` → `PROJECTS` dizisi |
| Gerçek proje görseli | Projede `image: "assets/p1.jpg"` yaz; yer tutucu SVG yerine geçer |
| Tüm metinler, fiyatlar (₺ / $), yorumlar, zaman çizelgesi | `js/i18n.js` (`tr` ve `en`) |
| Renkler ve yazı tipleri | `css/style.css` → `:root` |
| Yasal metinler (KVKK, Gizlilik, Çerez) | Şu an linkler `href="#"` ve tıklanınca hiçbir şey yapmaz. Sayfaları hazırlayınca `index.html` footer'ındaki `legal-link` öğelerine gerçek adres ver ve `main.js`'deki `preventDefault` satırını sil. |

Yeni proje eklemek için `PROJECTS` dizisine bir nesne kopyala; `cat` değeri `"ux"` veya `"brand"` olmalı.

## Yayınlama (statik hosting)
- **Netlify:** app.netlify.com/drop adresine klasörü sürükle-bırak.
- **GitHub Pages:** Dosyaları bir repoya yükle → Settings → Pages → Branch: `main` / root.
- **Vercel:** `vercel` komutu veya klasörü dashboard'a yükle (framework: Other).

Yayından önce: `CONFIG` bilgilerini, `<title>`/meta açıklamalarını ve OG etiketlerini (gerekirse `og:image`, `og:url`) güncelle.

## Erişilebilirlik
`prefers-reduced-motion` açıkken animasyonlar ve özel imleç kapanır; dokunmatik cihazlarda imleç/tilt devre dışıdır. Modal `Esc` ile kapanır, odak yönetilir.

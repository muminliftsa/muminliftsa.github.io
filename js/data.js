/* ============================================================
   KİŞİSEL AYARLAR — buradaki değerleri kendi bilgilerinle değiştir
   ============================================================ */
const CONFIG = {
  name: "Mümin Hasanoğlu",
  email: "merhaba@muminhasanoglu.com",      // mailto butonu
  whatsapp: "905550000000",                  // ülke koduyla, + ve boşluk olmadan
  socials: [
    { label: "Behance",   url: "#" },
    { label: "Dribbble",  url: "#" },
    { label: "Instagram", url: "#" },
    { label: "LinkedIn",  url: "#" }
  ]
};

/* ============================================================
   PROJELER — yeni proje eklemek için diziye bir nesne ekle.
   cat: "ux" | "brand"   type: "app" | "dash" | "logoA" | "logoB"
   image: gerçek görsel yolu verirsen (ör. "assets/p1.jpg") yer tutucunun yerine geçer.
   ============================================================ */
const PROJECTS = [
  {
    id: "p1", cat: "ux", type: "app", image: "",
    colors: ["#FF5B1F", "#141210", "#F3EBDD"],
    year: "2025",
    tools: ["Figma", "FigJam", "Principle"],
    title: { tr: "Pocket — Fintech Mobil Uygulaması", en: "Pocket — Fintech Mobile App" },
    tag:   { tr: "UI/UX · Mobil", en: "UI/UX · Mobile" },
    problem:  { tr: "Genç kullanıcılar mevcut bankacılık uygulamalarını karmaşık buluyor ve harcamalarını takip edemiyordu.",
                en: "Young users found existing banking apps confusing and couldn't keep track of their spending." },
    process:  { tr: "12 kullanıcı görüşmesi, rakip analizi, kullanıcı akışları, düşük sadakatli taslaklar ve 3 turluk kullanılabilirlik testi.",
                en: "12 user interviews, competitor analysis, user flows, low-fidelity wireframes and 3 rounds of usability testing." },
    solution: { tr: "Tek dokunuşla harcama kategorileri, görsel bütçe halkaları ve sade bir ana ekran içeren yeni bir arayüz sistemi.",
                en: "A new interface system with one-tap spending categories, visual budget rings and a calm home screen." },
    result:   { tr: "Görev tamamlama süresi %38 azaldı, ilk hafta bırakma oranı %22 düştü.",
                en: "Task completion time dropped 38% and first-week churn fell by 22%." }
  },
  {
    id: "p2", cat: "brand", type: "logoA", image: "",
    colors: ["#FF3B30", "#141210", "#F3EBDD"],
    year: "2025",
    tools: ["Illustrator", "Figma", "After Effects"],
    title: { tr: "Kahve Atölyesi — Marka Kimliği", en: "Roast Studio — Brand Identity" },
    tag:   { tr: "Marka · Logo", en: "Brand · Logo" },
    problem:  { tr: "Yeni açılan butik kahve atölyesi, kalabalık pazarda akılda kalıcı ve sıcak bir kimliğe ihtiyaç duyuyordu.",
                en: "A new specialty coffee roaster needed a warm, memorable identity in a crowded market." },
    process:  { tr: "Marka atölyesi, anahtar kelime haritası, 40+ logo eskizi, renk ve tipografi denemeleri, uygulama mockup'ları.",
                en: "Brand workshop, keyword map, 40+ logo sketches, colour and type explorations, application mockups." },
    solution: { tr: "Kavrulan çekirdeğin formundan türeyen geometrik bir işaret, canlı turuncu-kırmızı palet ve cesur bir başlık yazı tipi.",
                en: "A geometric mark derived from the roasted bean, a vivid orange-red palette and a bold display typeface." },
    result:   { tr: "Açılışın ilk ayında sosyal medya takipçisi 3 kat arttı; ambalaj ve tabela tek sette teslim edildi.",
                en: "Social following tripled in the opening month; packaging and signage delivered as one system." }
  },
  {
    id: "p3", cat: "ux", type: "dash", image: "",
    colors: ["#141210", "#FF5B1F", "#F3EBDD"],
    year: "2024",
    tools: ["Figma", "Maze", "Notion"],
    title: { tr: "Atlas — SaaS Analitik Paneli", en: "Atlas — SaaS Analytics Dashboard" },
    tag:   { tr: "UI/UX · Web", en: "UI/UX · Web" },
    problem:  { tr: "Yoğun veri içeren panel, ekiplerin önemli metrikleri bulmasını zorlaştırıyordu.",
                en: "A data-heavy dashboard made it hard for teams to find the metrics that mattered." },
    process:  { tr: "Bilgi mimarisi yeniden kurgusu, kart sınıflandırma çalışması, tasarım sistemi ve bileşen kütüphanesi.",
                en: "Information architecture rework, card sorting, a design system and component library." },
    solution: { tr: "Kişiselleştirilebilir widget'lar, koyu/açık tema ve hiyerarşiyi netleştiren tipografik ölçek.",
                en: "Customisable widgets, dark/light themes and a type scale that clarifies hierarchy." },
    result:   { tr: "Destek talepleri %30 azaldı; geliştirici teslim süresi yarıya indi.",
                en: "Support tickets dropped 30% and developer hand-off time was cut in half." }
  },
  {
    id: "p4", cat: "brand", type: "logoB", image: "",
    colors: ["#F3EBDD", "#FF3B30", "#141210"],
    year: "2024",
    tools: ["Illustrator", "Photoshop", "InDesign"],
    title: { tr: "Nova — Yaratıcı Ajans Logosu", en: "Nova — Creative Agency Logo" },
    tag:   { tr: "Marka · Logo", en: "Brand · Logo" },
    problem:  { tr: "Genç bir ajans, ciddiyeti ve oyunbazlığı aynı anda yansıtan bir logo istiyordu.",
                en: "A young agency wanted a logo that feels serious and playful at the same time." },
    process:  { tr: "Rekabet haritası, monogram denemeleri, hareketli logo prototipi ve kullanım kılavuzu.",
                en: "Competitive map, monogram studies, an animated logo prototype and usage guidelines." },
    solution: { tr: "Esnek bir 'N' monogramı: farklı renk ve açılarla ajansın projelerine göre şekil değiştiriyor.",
                en: "A flexible 'N' monogram that shifts colour and angle to match each of the agency's projects." },
    result:   { tr: "Ajans yeni müşteri sunumlarında kimliği ana farklılaştırıcı olarak kullanıyor.",
                en: "The agency now uses the identity as a key differentiator in new-business pitches." }
  }
];

import { ServiceOption, CaseStudy, ClientReview } from './types';

export const SERVICES_DATA: ServiceOption[] = [
  {
    id: 'smm-start',
    title: 'SMM Start',
    description: 'Rivojlanishni endi boshlayotgan loyihalar va shaxsiy brendlar uchun mukammal yechim.',
    price: '$290 / oy',
    iconName: 'Sparkles',
    color: 'indigo',
    features: [
      '12 ta professional dizaynli postlar',
      '15 ta interaktiv Reels / Stories',
      'Kontent-reja va vizual tahrir',
      'Target reklamasini sozlash (boshlang\'ich)',
      'Oylik oson hisobot'
    ]
  },
  {
    id: 'smm-business',
    title: 'SMM Biznes',
    description: 'Muntazam savdo va mijozlar oqimini oshirish istagidagi kichik va o\'rta korxonalar uchun ommabop tarif.',
    price: '$490 / oy',
    iconName: 'TrendingUp',
    color: 'violet',
    features: [
      '20 ta kreativ post va karusellar',
      '25 ta yuqori sifatli Reels / Stories',
      'Professional kopirayting (O\'zbek/Rus tillarida)',
      'Kuchli target reklamasi va A/B testlar',
      'Blogerlar (KOL) bilan hamkorlik integratsiyasi',
      'Tafsilotli oylik tahliliy hisobot'
    ]
  },
  {
    id: 'smm-premium',
    title: 'SMM Premium',
    description: 'Ijtimoiy tarmoqlarda mutlaq dominantlikka erishish va yuqori darajadagi brend imijini yaratish uchun.',
    price: '$890 / oy',
    iconName: 'Zap',
    color: 'emerald',
    features: [
      'Cheksiz sifatli post va materiallar',
      'Maxsus professional mobilograf xizmati (oyiga 2 marta borib tasvirga olish)',
      '30+ professional montaj qilingan Reels va Stories',
      'Murakkab savdo voronkalari (Mini-programlar va Botlar)',
      'Keng qamrovli target reklamasi va doimiy optimallashtirish',
      'Haftalik hisobotlar va shaxsiy loyiha menejeri'
    ]
  }
];

export const CASES_DATA: CaseStudy[] = [
  {
    id: 'case-oasis',
    companyName: 'Oasis Burger & Cafe',
    category: 'Restoran / Umumiy ovqatlanish',
    duration: '3 oy hamkorlik',
    description: 'Instagram va TikTok tarmoqlarida ishtaha ochuvchi tizerli Reels videolar trendga chiqdi, natijada yetkazib berish xizmatida rekord o\'sish qayd etildi.',
    beforeStats: 'Oyiga 1,200 buyurtma',
    afterStats: 'Oyiga 3,850 buyurtma',
    results: [
      { label: 'Buyurtmalar O\'sishi', value: '+220%', sub: '3 oy ichida' },
      { label: 'Obunachilar', value: '+18K', sub: 'Organik oqim' },
      { label: 'Video Ko\'rishlar', value: '1.2M+', sub: 'Tarmoqlarda jami' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'case-apex',
    companyName: 'Apex LC (Olimpiya Ta\'limi)',
    category: 'Ta\'lim va Kurslar',
    duration: '4 oy hamkorlik',
    description: 'Biz maqsadli auditoriya (ota-onalar va yoshlar) uchun alohida target strategiyasini ishlab chiqdik, buning evaziga kuzgi qabul yuz foiz to\'ldi.',
    beforeStats: 'O\'rtacha 40 ta faol o\'quvchi',
    afterStats: '220 tadan ortiq faol o\'quvchi',
    results: [
      { label: 'Lidlar Soni', value: '1,450+', sub: 'Targetdan ariza' },
      { label: 'Lid narxi pasayishi', value: '-35%', sub: 'Reklama optimallashdi' },
      { label: 'Konversiya', value: '18.2%', sub: 'Arizadan ro\'yxatga' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'case-zamin',
    companyName: 'Zamin Real Estate',
    category: 'Ko\'chmas Mulk / Qurilish',
    duration: '2 oy hamkorlik',
    description: 'Toshkent shahrida hashamatli xonadonlarni sotish uchun bevosita qiziqishi bor auditoriyaga mo\'ljallangan kreativ video-obzorlar va Lead-Ads sozlandi.',
    beforeStats: '1 ta uy sotilishi / oy',
    afterStats: '6 ta uy sotilishi / oy',
    results: [
      { label: 'Sotuvlar soni', value: '6 barobar', sub: 'Oydan oyga o\'sish' },
      { label: 'Sifatli Lidlar', value: '380+', sub: 'Qo\'ng\'iroqlar oqimi' },
      { label: 'Brend ishonchliligi', value: 'High', sub: '95% ijobiy fikrlar' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80'
  }
];

export const REVIEWS_DATA: ClientReview[] = [
  {
    id: 'rev-1',
    name: 'Jasur Fayziyev',
    position: 'Bosh Direktor',
    companyName: 'Oasis Food',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    text: 'SMM jamoasi ishimizni butunlay o\'zgartirib yubordi. Avvalari ijtimoiy tarmoqlarimiz zerikarli edi, hozir esa har bir Reels video ortidan mijozlar qo\'ng\'iroq qilmoqda. Ishlariga mas\'uliyat bilan yondashadilar.'
  },
  {
    id: 'rev-2',
    name: 'Dilnoza Olimova',
    position: 'Marketing Rahbari',
    companyName: 'Apex LC',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    text: 'Biz ko\'p agentliklar bilan ishlab ko\'rganmiz, ammo bu jamoaning tahlil va target sozlash darsi mutlaqo mukammal. Leads yig\'ish xarajatlarimiz sezilarli darajada kamaydi va haqiqiy talabgorlar oqimi keldi.'
  },
  {
    id: 'rev-3',
    name: 'Sardor Qodirov',
    position: 'Asoschi',
    companyName: 'Zamin Estate',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    text: 'Biznesimizda mijoz ishonchi juda muhim. Agentlik ijtimoiy sahifalarimizni muhtasham va ishonarli darajada bezatib, mijozlarimizda brendimiz haqida xonadon sotib olishdan oldin ijobiy taassurot orttirdi. Tavsiya qilaman!'
  }
];

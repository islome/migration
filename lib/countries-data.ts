// Davlatlar ma'lumotlari

export interface Country {
  id: string;
  name: string;
  nameEn: string;
  flag: string;
  shortDescription: string;
  salary: string;
  popularJobs: string[];
  visaDuration: string;
  visaSuccess: string;
  language: string;
  currency: string;
  
  // Detail page uchun
  backgroundImage: string;
  fullDescription: string;
  requirements: {
    age: string;
    education: string;
    language: string;
    experience: string;
  };
  benefits: string[];
  documents: string[];
  process: {
    step: number;
    title: string;
    description: string;
    duration: string;
  }[];
  lifeInfo: {
    housing: string;
    transport: string;
    food: string;
    healthcare: string;
  };
  salaryDetails: {
    min: number;
    max: number;
    average: number;
    taxRate: string;
  };
}

export const countries: Country[] = [
  {
    id: 'germany',
    name: 'Germaniya',
    nameEn: 'Germany',
    flag: '🇩🇪',
    shortDescription: 'Yuqori texnologiya va sifatli ta\'lim tizimiga ega Yevropa davlati. IT, muhandislik va tibbiyot sohasida keng imkoniyatlar.',
    salary: '$3,500 - $6,000',
    popularJobs: ['IT mutaxassislari', 'Muhandislar', 'Shifokorlar', 'Hamshiralar', 'Dasturchilar'],
    visaDuration: '3-6 oy',
    visaSuccess: '95%',
    language: 'Nemis tili (B1-B2)',
    currency: 'Euro (EUR)',
    backgroundImage: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=1920',
    fullDescription: 'Germaniya - Yevropa Ittifoqining eng kuchli iqtisodiyotiga ega davlat. Yuqori sifatli hayot darajasi, rivojlangan sog\'liqni saqlash tizimi va kuchli ijtimoiy kafolatlar bilan ajralib turadi. Texnologiya va innovatsiya markazlaridan biri.',
    
    requirements: {
      age: '18-50 yosh',
      education: 'O\'rta maxsus yoki oliy ma\'lumot',
      language: 'Nemis tili B1 darajasi (ba\'zi kasblar uchun ingliz tili ham etarli)',
      experience: 'Mutaxassislik bo\'yicha kamida 2 yillik tajriba'
    },
    
    benefits: [
      'Yuqori maosh darajasi (oyiga €3,000-6,000)',
      'To\'liq tibbiy sug\'urta',
      'Yoshlarga va oilaga yordam',
      'Bepul ta\'lim tizimi',
      'Kuchli pensiya tizimi',
      'Yillik 30 kun dam olish',
      '5 yildan keyin fuqarolik olish imkoniyati',
      'Oila a\'zolarini olib kelish huquqi'
    ],
    
    documents: [
      'Xalqaro pasport (kamida 2 yil amal qilish muddati)',
      'Diplom va transkript (nemis tiliga tarjima qilingan va notarial tasdiqli)',
      'CV (Europass formatida)',
      'Motivatsion xat',
      'Til sertifikati (Goethe-Institut, TestDaF)',
      'Tibbiy ma\'lumotnoma',
      'Jinoyat yo\'qligi haqida ma\'lumotnoma',
      'Ish taklifnomasi (Arbeitsvertrag)',
      'Moliyaviy kafolat (blokli hisob - €11,208)',
      '4 ta rangli fotosurat (3.5x4.5 sm)'
    ],
    
    process: [
      {
        step: 1,
        title: 'Tayyorgarlik',
        description: 'Til o\'rganish, hujjatlarni tayyorlash va ish qidirish',
        duration: '3-6 oy'
      },
      {
        step: 2,
        title: 'Ish topish',
        description: 'Germaniya kompaniyalaridan ish taklifini olish',
        duration: '1-3 oy'
      },
      {
        step: 3,
        title: 'Viza arizasi',
        description: 'Germaniya elchixonasida viza uchun hujjatlar topshirish',
        duration: '6-12 hafta'
      },
      {
        step: 4,
        title: 'Jo\'nash',
        description: 'Viza olgandan keyin Germaniyaga jo\'nash va ishni boshlash',
        duration: '1-2 hafta'
      }
    ],
    
    lifeInfo: {
      housing: 'Uy-joy: Oyiga €400-1,200. Yollanma kvartiralar ko\'p, sifatli va qulay.',
      transport: 'Transport: Oylik abonement €60-100. Jamoat transporti juda rivojlangan.',
      food: 'Ovqatlanish: Oyiga €200-400. Supermarketlar arzon va sifatli.',
      healthcare: 'Sog\'liqni saqlash: Majburiy tibbiy sug\'urta oyiga €100-200. Yuqori sifatli tibbiy xizmat.'
    },
    
    salaryDetails: {
      min: 3000,
      max: 6000,
      average: 4200,
      taxRate: '14-45% (daromadga qarab)'
    }
  },
  {
  id: "slovakia",
  name: "Slovakiya",
  nameEn: "Slovakia",
  flag: "🇸🇰",
  shortDescription: "Yevropaning markazida joylashgan rivojlangan sanoat mamlakati",
  salary: "€1,200-2,000",
  popularJobs: [
    "Duradgor",
    "Qolib ishlab chiqarish",
    "Armatura bog'lash",
    "Beton quyish",
    "Blok yotqizish",
    "Santexnika",
    "Deraza o'rnatish",
    "Fasad ishlari"
  ],
  visaDuration: "2-3 oy",
  visaSuccess: "85%",
  language: "Slovak/Rus",
  currency: "Euro (€)",
  
  // Detail page
  backgroundImage: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=1200&h=600&fit=crop",
  fullDescription: "Slovakiya - Yevropaning markazida joylashgan, qurilish va ishlab chiqarish sohasida yuqori talabga ega bo'lgan mamlakat. Bratislava va boshqa yirik shaharlarda ko'plab qurilish loyihalari amalga oshirilmoqda.",
  
  requirements: {
    age: "18-45 yosh",
    education: "O'rta maxsus ma'lumot",
    language: "Rus tili (B1 daraja)",
    experience: "Kamida 2 yil tajriba"
  },
  
  benefits: [
    "Tekin yotoqxona ta'minlanadi",
    "Rasmiy ro'yhatdan o'tkazish",
    "Tibbiy sug'urta",
    "Oylik maosh o'z vaqtida to'lanadi",
    "Shrek imkoniyati",
    "Yevropada sayohat qilish imkoniyati",
    "Oilaviy a'zolarni chaqirish mumkin",
    "Professional o'sish imkoniyatlari"
  ],
  
  documents: [
    "Xalqaro pasport (6 oy muddatli)",
    "Diplom nusxasi (notarial tasdiqlangan)",
    "Tibbiy ma'lumotnoma",
    "Jinoyat yo'qligi haqida ma'lumotnoma",
    "3x4 rangli fotosurat (6 dona)",
    "Ish tajribasi to'g'risida guvohnoma",
    "Viza anketasi",
    "Mehmonxona bron qilish tasdiqnomasi"
  ],
  
  process: [
    {
      step: 1,
      title: "Dastlabki konsultatsiya",
      description: "Mutaxassislarimiz bilan uchrashib, barcha sharoitlar va talablar bilan tanishish. Shaxsiy malakangizni baholash va mos ish topish.",
      duration: "1-2 kun"
    },
    {
      step: 2,
      title: "Hujjatlarni tayyorlash",
      description: "Barcha kerakli hujjatlarni to'plash, tarjima qilish va notarial tasdiqdan o'tkazish. Ish beruvchi bilan shartnoma tuzish.",
      duration: "1-2 hafta"
    },
    {
      step: 3,
      title: "Viza uchun ariza topshirish",
      description: "Slovakiya elchixonasiga viza uchun barcha hujjatlarni topshirish va intervyudan o'tish. Biometrik ma'lumotlarni topshirish.",
      duration: "3-4 hafta"
    },
    {
      step: 4,
      title: "Viza olish va jo'nab ketish",
      description: "Viza tayyor bo'lgach, chiptalrni bron qilish va Slovakiyaga jo'nab ketish. Aeroportda kutib olish va yotoqxonaga joylashtirish.",
      duration: "3-5 kun"
    },
    {
      step: 5,
      title: "Ishga kirish va ro'yxatdan o'tish",
      description: "Ish joyida ro'yxatdan o'tish, mahalliy ID olish va ishni boshlash. Dastlabki adaptatsiya davri.",
      duration: "1 hafta"
    }
  ],
  
  lifeInfo: {
    housing: "Yotoqxona tekin ta'minlanadi. Odatda 2-4 kishilik xonalar. Barcha kommunal xizmatlar to'langan. Wi-Fi, oshxona va yuvish mashinasi mavjud.",
    transport: "Jamoat transporti yaxshi rivojlangan. Oylik abonement €30-40. Ko'pchilik ish joylari yotoqxonaga yaqin joylashgan yoki kompaniya transporti mavjud.",
    food: "Ovqatlanish xarajatlari oyiga €200-300. Supermarketlar arzon. Kompaniya oshxonasida tushlik olish imkoniyati mavjud.",
    healthcare: "Majburiy tibbiy sug'urta kompaniya tomonidan to'lanadi. Davlat klinikalari va xususiy shifokorlar mavjud. Tez tibbiy yordam tekin."
  },
  
  salaryDetails: {
    min: 1200,
    max: 2000,
    average: 1600,
    taxRate: "19-25%"
  }
},
  {
    id: 'poland',
    name: 'Polsha',
    nameEn: 'Poland',
    flag: '🇵🇱',
    shortDescription: 'Tez rivojlanayotgan Yevropa davlati. O\'rta Osiyo fuqarolari uchun vizani olish oson va arzon narxlarda hayot kechirish imkoniyati.',
    salary: '$1,800 - $3,500',
    popularJobs: ['Qurilishchilar', 'Haydovchilar', 'Ishlab chiqarish ishchilari', 'Ombor ishchilari', 'Dasturchilar'],
    visaDuration: '2-4 oy',
    visaSuccess: '98%',
    language: 'Ingliz/Polsha tili',
    currency: 'Zloty (PLN)',
    backgroundImage: 'https://images.unsplash.com/photo-1589404738106-f2d8b7c66dc0?w=1920',
    fullDescription: 'Polsha - Sharqiy Yevropaning eng rivojlangan iqtisodiyotlaridan biri. O\'rta Osiyo fuqarolari uchun ish topish va vizani rasmiylashtirish eng oson davlatlardan biri. Arzon hayot xarajatlari va yaxshi ish imkoniyatlari.',
    
    requirements: {
      age: '18-55 yosh',
      education: 'O\'rta ma\'lumot (ba\'zi ishlar uchun maxsus talim talab qilinmaydi)',
      language: 'Ingliz tili asosiy bilimi (polsha tili qo\'shimcha afzallik)',
      experience: 'Tajriba talab qilinmasligi mumkin'
    },
    
    benefits: [
      'Vizani olish jarayoni oson',
      'Arzon yashash xarajatlari',
      'Katta o\'zbek jamoasi mavjud',
      'Shengenda erkin sayohat',
      'Oila a\'zolarini olib kelish imkoniyati',
      'Tez sur\'atda viza rasmiylashtiriladi',
      'Ko\'p sohada ish imkoniyatlari',
      'Tilni bilmasdan ham ishlay olish'
    ],
    
    documents: [
      'Pasport (kamida 1 yil amal qilish muddati)',
      'Ish taklifi yoki ishga taklif xati',
      'Tibbiy sug\'urta',
      'Uy-joy yollash shartnomasi (yoki mehmonxona bron)',
      'Moliyaviy ta\'minot (€100/kun)',
      'Tibbiy ma\'lumotnoma',
      '3 ta rangli fotosurat',
      'Viza ariza shakli',
      'Aviachiptalari broni',
      'Jinoyat yo\'qligi to\'g\'risida ma\'lumotnoma'
    ],
    
    process: [
      {
        step: 1,
        title: 'Ish topish',
        description: 'Polsha kompaniyasidan ish taklifini olish (online yoki agent orqali)',
        duration: '2-4 hafta'
      },
      {
        step: 2,
        title: 'Hujjatlar',
        description: 'Barcha kerakli hujjatlarni tayyorlash va tarjima qilish',
        duration: '1-2 hafta'
      },
      {
        step: 3,
        title: 'Viza',
        description: 'Polsha elchixonasida viza uchun ariza topshirish',
        duration: '4-8 hafta'
      },
      {
        step: 4,
        title: 'Safar',
        description: 'Viza olgandan keyin Polshaga jo\'nash',
        duration: '1 hafta'
      }
    ],
    
    lifeInfo: {
      housing: 'Uy-joy: Oyiga 1,200-2,500 PLN (€250-550). Arzon va topish oson.',
      transport: 'Transport: Oylik 100-200 PLN (€20-45). Jamoat transporti rivojlangan.',
      food: 'Ovqatlanish: Oyiga 800-1,500 PLN (€170-320). Supermarketlar arzon.',
      healthcare: 'Sog\'liqni saqlash: Majburiy sug\'urta ish beruvchi tomonidan to\'lanadi.'
    },
    
    salaryDetails: {
      min: 1800,
      max: 3500,
      average: 2400,
      taxRate: '12-32% (daromadga qarab)'
    }
  },
  {
  id: "israel",
  name: "Isroil",
  nameEn: "Israel",
  flag: "🇮🇱",
  shortDescription: "Yuqori maosh va professional rivojlanish imkoniyatlari bilan Yaqin Sharq mamlakati",
  salary: "$2,200+",
  popularJobs: [
    "Apalovkachi",
    "Beton quyish",
    "Armatura bog'lash",
    "Bruschatka ustasi",
    "Fasad tosh ustasi",
    "Qurilish ishchisi",
    "Plitka ustasi",
    "Sement ishchisi"
  ],
  visaDuration: "3-4 oy",
  visaSuccess: "75%",
  language: "Ingliz/Ivrit",
  currency: "AQSh dollari ($)",
  
  // Detail page
  backgroundImage: "https://images.unsplash.com/photo-1544966278-27c94aceaf8c?w=1200&h=600&fit=crop",
  fullDescription: "Isroil - zamonaviy qurilish loyihalari va yuqori sifatli ish sharoitlari bilan mashhur. Tel-Aviv, Iyerusalim va boshqa shaharlarda doimiy qurilish ishlari olib boriladi. Mutaxassislar uchun katta imkoniyatlar.",
  
  requirements: {
    age: "20-40 yosh",
    education: "Davlatga kirish taqiq bo'lmasligi",
    language: "Ingliz tili (asosiy muloqot uchun)",
    experience: "Qurilish sohasida ish tajribaga ega bo'lish talab etiladi. Sudlanmagan bo'lishi shart."
  },
  
  benefits: [
    "Yuqori oylik maosh ($2,200+)",
    "Rasmiy mehnat shartnomasi",
    "Tibbiy sug'urta to'liq qoplanadi",
    "Dam olish kunlari to'lanadi",
    "Qo'shimcha soatlar uchun ustama haq",
    "Yashash joyi ta'minlanadi",
    "Maoshning bir qismi avansda beriladi",
    "Professional o'sish imkoniyatlari",
    "Xavfsizlik kafolatlari"
  ],
  
  documents: [
    "Xalqaro pasport (kamida 6 oy muddatli)",
    "Jinoyat yo'qligi haqida ma'lumotnoma (apostil bilan)",
    "Tibbiy ko'rik natijalari (AIDS, gepatit testlari)",
    "Ish tajribasi to'g'risida tavsifnoma",
    "3x4 rangli fotosurat (8 dona)",
    "Nikoh guvohnomasi (oilali bo'lsa)",
    "Tug'ilganlik haqida guvohnoma",
    "Diplom yoki sertifikat (agar bo'lsa)",
    "Ish beruvchidan taklif xati",
    "Viza anketasi (to'ldirilgan)"
  ],
  
  process: [
    {
      step: 1,
      title: "Bepul konsultatsiya va baholash",
      description: "Mutaxassislarimiz bilan uchrashuv. Sizning malakangiz va tajribangizni baholash. Isroilga kirish huquqini tekshirish va mos ish topish.",
      duration: "1-3 kun"
    },
    {
      step: 2,
      title: "Hujjatlarni tayyorlash va tekshirish",
      description: "Barcha zarur hujjatlarni to'plash, tarjima qilish va apostil bilan tasdiqlatish. Jinoyat ma'lumotnomasi va tibbiy testlarni topshirish.",
      duration: "2-3 hafta"
    },
    {
      step: 3,
      title: "Ish beruvchi bilan shartnoma",
      description: "Isroildagi kompaniya bilan rasmiy mehnat shartnomasi imzolash. Ish sharoitlari va maosh to'g'risida kelishuv. Taklif xati olish.",
      duration: "1-2 hafta"
    },
    {
      step: 4,
      title: "Viza uchun ariza topshirish",
      description: "Isroil elchixonasiga viza uchun barcha hujjatlarni topshirish. Intervyudan o'tish va biometrik ma'lumotlarni berish. Viza kutish davri.",
      duration: "4-8 hafta"
    },
    {
      step: 5,
      title: "Viza olish va jo'nash",
      description: "Ishchi vizasi tayyor bo'lgach, aviachiptalarni sotib olish. Isroilga uchish va aeroportda ro'yxatdan o'tish. Kompaniya vakili kutib oladi.",
      duration: "3-5 kun"
    },
    {
      step: 6,
      title: "Yashash joyiga joylashtirish va ishga kirish",
      description: "Yashash joyiga olib borish va barcha kerakli narsalar bilan ta'minlash. Ish joyiga olib borish va ishni boshlash. Dastlabki yo'l-yo'riq olish.",
      duration: "3-7 kun"
    }
  ],
  
  lifeInfo: {
    housing: "Kompaniya tomonidan yashash joyi ta'minlanadi. Odatda 2-4 kishilik kvartiralar yoki konteyner turar joylar. Barcha kommunal to'lovlar kompaniya tomonidan qoplanadi. Konditsioner, muzlatgich va Wi-Fi mavjud.",
    transport: "Qurilish maydonchasiga kompaniya transporti bilan borish. Jamoat transporti yaxshi rivojlangan - avtobus va poyezdlar. Dam olish kunlarida shaharga erkin chiqish mumkin.",
    food: "Ovqatlanish oyiga $300-400. Supermarketlar va bozorlar yaqin atrofda. Ba'zi kompaniyalar tushlik taqdim etadi yoki ovqatlanish uchun qo'shimcha to'lov beradi. Halol go'sht va mahsulotlar oson topiladi.",
    healthcare: "Majburiy tibbiy sug'urta kompaniya tomonidan to'liq to'lanadi. Yuqori sifatli tibbiy xizmat. Tez tibbiy yordam 24/7 ishlaydi. Kasalxonalar va klinikalar zamonaviy jihozlarga ega."
  },
  
  salaryDetails: {
    min: 2200,
    max: 3500,
    average: 2800,
    taxRate: "10-15%"
  }
  },
  // {
  //   id: 'uae',
  //   name: 'Dubay (BAA)',
  //   nameEn: 'Dubai (UAE)',
  //   flag: '🇦🇪',
  //   shortDescription: 'Soliqsiz daromad, yuqori hayot sifati va issiq iqlim. Qurilish, turizm va moliya sohasida keng imkoniyatlar.',
  //   salary: '$2,500 - $8,000',
  //   popularJobs: ['Qurilish', 'Mehmonxona xizmati', 'Savdo', 'Moliya', 'IT'],
  //   visaDuration: '1-3 oy',
  //   visaSuccess: '96%',
  //   language: 'Ingliz tili',
  //   currency: 'Dirham (AED)',
  //   backgroundImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920',
  //   fullDescription: 'Birlashgan Arab Amirliklari - Yaqin Sharqning eng rivojlangan davlati. Daromaddan soliq yo\'q, yuqori maosh va zamonaviy infratuzilma. Dubay global biznes va turizm markazi.',
    
  //   requirements: {
  //     age: '21-55 yosh',
  //     education: 'O\'rta maxsus yoki oliy ma\'lumot',
  //     language: 'Ingliz tili o\'rta daraja',
  //     experience: 'Kasbga mos tajriba (lavozimga qarab)'
  //   },
    
  //   benefits: [
  //     'Daromad solig\'i yo\'q (0%)',
  //     'Yuqori maosh (oyiga 8,000-30,000 AED)',
  //     'Issiq ob-havo yil bo\'yi',
  //     'Zamonaviy infratuzilma',
  //     'Xavfsiz muhit',
  //     'Ko\'p millatli jamiyat',
  //     'Oila vizasi imkoniyati',
  //     'Repatriation ticket (ish beruvchi to\'laydi)'
  //   ],
    
  //   documents: [
  //     'Pasport (6 oy+ muddati)',
  //     'Ish taklifi (Job Offer Letter)',
  //     'Diplom va sertifikatlar (notarial tasdiqli)',
  //     'Tibbiy test (HIV, hepatit va boshqalar)',
  //     'Emirates ID uchun rasm',
  //     'Passport fotolar',
  //     'Eski ish joyidan tavsifnoma',
  //     'Police clearance certificate',
  //     'Viza ariza shakli',
  //     'Tibbiy sug\'urta (ish beruvchi beradi)'
  //   ],
    
  //   process: [
  //     {
  //       step: 1,
  //       title: 'Ish topish',
  //       description: 'Dubai kompaniyasidan ish taklifini olish',
  //       duration: '2-6 hafta'
  //     },
  //     {
  //       step: 2,
  //       title: 'Employment visa',
  //       description: 'Ish beruvchi tomonidan employment visa rasmiylashtiriladi',
  //       duration: '1-2 hafta'
  //     },
  //     {
  //       step: 3,
  //       title: 'Tibbiy test',
  //       description: 'Dubai ga kelgandan keyin tibbiy tekshiruvdan o\'tish',
  //       duration: '3-5 kun'
  //     },
  //     {
  //       step: 4,
  //       title: 'Emirates ID',
  //       description: 'Emirates ID va residence visa olish',
  //       duration: '1-2 hafta'
  //     }
  //   ],
    
  //   lifeInfo: {
  //     housing: 'Uy-joy: Oyiga 2,000-6,000 AED. Ish beruvchi ko\'pincha to\'laydi.',
  //     transport: 'Transport: Oylik 300-500 AED (Metro) yoki mashina (benzin arzon).',
  //     food: 'Ovqatlanish: Oyiga 1,000-2,000 AED. Turli xil restoranlar.',
  //     healthcare: 'Sog\'liqni saqlash: Majburiy tibbiy sug\'urta ish beruvchi to\'laydi.'
  //   },
    
  //   salaryDetails: {
  //     min: 2500,
  //     max: 8000,
  //     average: 4500,
  //     taxRate: '0% (daromad solig\'i yo\'q)'
  //   }
  // },
  
  {
    id: 'czech',
    name: 'Chexiya',
    nameEn: 'Czech Republic',
    flag: '🇨🇿',
    shortDescription: 'Markaziy Yevropaning eng barqaror iqtisodiyotlaridan biri. Arzon hayot va sifatli ta\'lim.',
    salary: '$2,000 - $4,000',
    popularJobs: ['Ishlab chiqarish', 'IT', 'Logistika', 'Qurilish', 'Xizmat ko\'rsatish'],
    visaDuration: '3-5 oy',
    visaSuccess: '94%',
    language: 'Ingliz/Chex tili',
    currency: 'Chex kronasi (CZK)',
    backgroundImage: 'https://images.unsplash.com/photo-1541849546-216549ae216d?w=1920',
    fullDescription: 'Chexiya - Markaziy Yevropada joylashgan, boy tarixga ega davlat. Praga - Yevropa ning eng go\'zal shaharlaridan biri. Arzon hayot xarajatlari va sifatli ta\'lim tizimi.',
    
    requirements: {
      age: '18-55 yosh',
      education: 'O\'rta yoki oliy ma\'lumot',
      language: 'Ingliz tili asosiy (chex tili afzallik)',
      experience: 'Ish joyiga qarab'
    },
    
    benefits: [
      'Arzon yashash xarajatlari',
      'Shengenda erkin harakat',
      'Sifatli tibbiy xizmat',
      'Praga - go\'zal shahar',
      'Yevropaga yaqinlik',
      'Barqaror iqtisodiyot',
      '5 yildan keyin PR',
      'Oila bilan ko\'chish imkoniyati'
    ],
    
    documents: [
      'Pasport (6 oy+ muddati)',
      'Ish shartnomasi',
      'Diplom va sertifikatlar (chex tiliga tarjima)',
      'Tibbiy sug\'urta',
      'Uy-joy tasdiqnomasi',
      'Moliyaviy kafolat',
      'Tibbiy ma\'lumotnoma',
      'Police clearance certificate',
      'Biometrik foto',
      'Viza ariza shakli'
    ],
    
    process: [
      {
        step: 1,
        title: 'Ish topish',
        description: 'Chexiya kompaniyasidan ish taklifini olish',
        duration: '1-2 oy'
      },
      {
        step: 2,
        title: 'Hujjatlar',
        description: 'Barcha hujjatlarni tayyorlash va tarjima qilish',
        duration: '2-3 hafta'
      },
      {
        step: 3,
        title: 'Employee card',
        description: 'Employee card (ish + yashash vizasi) uchun ariza',
        duration: '3-5 oy'
      },
      {
        step: 4,
        title: 'Safar',
        description: 'Employee card olgandan keyin Chexiyaga jo\'nash',
        duration: '1 hafta'
      }
    ],
    
    lifeInfo: {
      housing: 'Uy-joy: Oyiga 8,000-15,000 CZK (€320-600). Pragada qimmatroq.',
      transport: 'Transport: Oylik 550 CZK (€22). Jamoat transporti juda qulay.',
      food: 'Ovqatlanish: Oyiga 5,000-8,000 CZK (€200-320). Supermarketlar arzon.',
      healthcare: 'Sog\'liqni saqlash: Majburiy sug\'urta oyiga 1,500-2,500 CZK (€60-100).'
    },
    
    salaryDetails: {
      min: 2000,
      max: 4000,
      average: 2800,
      taxRate: '15-23% (daromadga qarab)'
    }
  },
  {
  id: "serbia",
  name: "Serbiya",
  nameEn: "Serbia",
  flag: "🇷🇸",
  shortDescription: "Balkan yarimo'rolidagi qurilish va yo'l qurish loyihalariga ixtisoslashgan mamlakat",
  salary: "€800-1,500",
  popularJobs: [
    "Yordamchi ishchi (10 ta o'rin)",
    "Ekskavator operatori (2 ta o'rin)",
    "Paver operatori (1 ta o'rin)",
    "Asfalt frezalash mashinasi operatori (1 ta o'rin)",
    "Yo'l qurish ishchisi",
    "Beton quyish ustasi",
    "Texnika mexaniki",
    "Brigada boshlig'i"
  ],
  visaDuration: "2-3 oy",
  visaSuccess: "90%",
  language: "Rus/Serb",
  currency: "Evro (€)",
  
  // Detail page
  backgroundImage: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=1200&h=600&fit=crop",
  fullDescription: "Serbiya - yo'l infratuzilmasi va qurilish loyihalari faol rivojlanayotgan mamlakat. Belgrad va boshqa shaharlarda yirik yo'l qurish ishlari olib borilmoqda. Rus tilida muloqot qilish mumkin bo'lgani uchun moslashish oson.",
  
  requirements: {
    age: "30-45 yosh",
    education: "Mas'uliyatli va tajribali nomzodlar qabul qilinadi",
    language: "Rus tili (yaxshi bilish)",
    experience: "Yo'l qurish yoki qurilish sohasida kamida 3-5 yil tajriba. Texnika operatorlari uchun maxsus hunar va sertifikat talab etiladi."
  },
  
  benefits: [
    "Rasmiy mehnat shartnomasi",
    "Yashash joyi kompaniya tomonidan ta'minlanadi",
    "Tibbiy sug'urta to'liq qoplanadi",
    "Kunlik ovqatlanish ta'minlanadi",
    "Maosh o'z vaqtida to'lanadi (oyiga 2 marta)",
    "Qo'shimcha soatlar uchun ustama haq",
    "Dam olish kunlari to'lanadi",
    "Shartnoma uzaytirilishi mumkin",
    "Rus tilida ishlash muhiti",
    "Professional o'sish imkoniyatlari"
  ],
  
  documents: [
    "Xalqaro pasport (kamida 6 oy muddatli)",
    "Jinoyat yo'qligi haqida ma'lumotnoma",
    "Tibbiy ma'lumotnoma (umumiy ko'rik)",
    "Diplom yoki hunar guvohnomasi",
    "Ish tajribasi to'g'risida tavsifnoma",
    "Texnika haydovchiligi guvohnomasi (operatorlar uchun)",
    "Sertifikatlar (agar mavjud bo'lsa)",
    "3x4 rangli fotosurat (6 dona)",
    "Viza anketasi",
    "Ish beruvchidan taklif xati"
  ],
  
  process: [
    {
      step: 1,
      title: "Dastlabki konsultatsiya va tanlash",
      description: "Mutaxassislarimiz bilan uchrashib, malakangizni baholash. Tajriba va hunarlaringizni tekshirish. Tegishli lavozim uchun nomzodni tanlash.",
      duration: "2-3 kun"
    },
    {
      step: 2,
      title: "Hujjatlarni to'plash va tayyorlash",
      description: "Barcha zarur hujjatlarni yig'ish, tarjima qilish va notarial tasdiqdan o'tkazish. Texnika operatorlari uchun sertifikatlarni tayyorlash.",
      duration: "1-2 hafta"
    },
    {
      step: 3,
      title: "Ish beruvchi bilan shartnoma imzolash",
      description: "Serbiyalik kompaniya bilan rasmiy mehnat shartnomasi tuzish. Ish sharoitlari, maosh va boshqa shartlar bo'yicha kelishuv.",
      duration: "5-7 kun"
    },
    {
      step: 4,
      title: "Viza olish jarayoni",
      description: "Serbiya elchixonasiga viza uchun ariza topshirish. Intervyu va biometrik ma'lumotlarni berish. Ishchi vizasi kutish davri.",
      duration: "3-6 hafta"
    },
    {
      step: 5,
      title: "Jo'nab ketish va yashash joyiga joylashtirish",
      description: "Viza tayyor bo'lgach, aviachiptalarni olish va Serbiyaga uchish. Aeroportda kutib olish va yashash joyiga olib borish.",
      duration: "2-3 kun"
    },
    {
      step: 6,
      title: "Ishga kirish va adaptatsiya",
      description: "Ish joyida ro'yxatdan o'tish va yo'l-yo'riq olish. Xavfsizlik texnikasi bo'yicha instruktaj. Ishni boshlash va jamoaga qo'shilish.",
      duration: "3-5 kun"
    }
  ],
  
  lifeInfo: {
    housing: "Kompaniya tomonidan umumiy turar joy yoki konteyner-uylar ta'minlanadi. Odatda qurilish maydonchasiga yaqin joyda. Barcha kommunal xizmatlar to'langan. Isitish, elektr, suv va Wi-Fi mavjud.",
    transport: "Ish joyiga kompaniya transporti bilan olib ketiladi. Jamoat transporti arzon va qulay. Dam olish kunlarida shahar markaziga borish uchun avtobus yoki taksi mavjud.",
    food: "Kunlik ovqatlanish kompaniya tomonidan ta'minlanadi (nonushta va tushlik). Kechki ovqat o'zingiz tayyorlashingiz yoki restoranda ovqatlanishingiz mumkin. Ovqatlanish xarajatlari oyiga €150-250.",
    healthcare: "Majburiy tibbiy sug'urta kompaniya tomonidan to'lanadi. Davlat shifoxonalari va klinikalar mavjud. Tez tibbiy yordam bepul. Ish joyida tibbiy xodim doim tayyor turadi."
  },
  
  salaryDetails: {
    min: 800,
    max: 1500,
    average: 1100,
    taxRate: "15-20%"
  }
  }
];

export const getCountryById = (id: string): Country | undefined => {
  return countries.find(country => country.id === id);
};
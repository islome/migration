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
    id: 'canada',
    name: 'Kanada',
    nameEn: 'Canada',
    flag: '🇨🇦',
    shortDescription: 'Immigratsiya uchun eng qulay davlatlardan biri. Yuqori hayot sifati, kuchli iqtisodiyot va ko\'p millatli jamiyat.',
    salary: '$4,000 - $7,500',
    popularJobs: ['IT mutaxassislari', 'Muhandislar', 'Moliya', 'Sog\'liqni saqlash', 'Qurilish'],
    visaDuration: '6-12 oy',
    visaSuccess: '92%',
    language: 'Ingliz/Fransuz tili',
    currency: 'Kanada dollari (CAD)',
    backgroundImage: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?w=1920',
    fullDescription: 'Kanada - dunyodagi eng yashash qulay davlatlardan biri. Kuchli iqtisodiyot, yuqori darajadagi ta\'lim va sog\'liqni saqlash tizimi. Doimiy yashash va fuqarolik olish uchun eng yaxshi imkoniyatlarni taqdim etadi.',
    
    requirements: {
      age: '18-45 yosh (qanchalik yosh bo\'lsa, ball ko\'proq)',
      education: 'Oliy ma\'lumot (magistr/doktor darajasi qo\'shimcha ball)',
      language: 'IELTS 6.5+ yoki TEF (fransuz tili)',
      experience: 'Mutaxassislik bo\'yicha kamida 3 yil tajriba'
    },
    
    benefits: [
      'Yuqori maosh (oyiga CAD 5,000-9,000)',
      'Bepul tibbiy xizmat',
      'Bolalar uchun nafaqa (oyiga CAD 400-600)',
      'Bepul davlat maktablari',
      'Kuchli pensiya tizimi',
      '3 yildan keyin doimiy yashash (PR)',
      '5 yildan keyin fuqarolik',
      'Barcha oila a\'zolari uchun imkoniyat'
    ],
    
    documents: [
      'Pasport',
      'IELTS/TEF sertifikati',
      'ECA (ta\'lim baholash)',
      'Ish tajribasi tasdiqnomalari',
      'Police clearance certificate',
      'Tibbiy ko\'rik',
      'Proof of funds (CAD 13,000+ bitta kishi uchun)',
      'CV va qoplovchi xat',
      'Diplom va transkriptlar',
      'Reference letters'
    ],
    
    process: [
      {
        step: 1,
        title: 'Baholash',
        description: 'Express Entry tizimida ball to\'plash (CRS score)',
        duration: '2-3 oy'
      },
      {
        step: 2,
        title: 'ITA olish',
        description: 'Invitation to Apply (ITA) kutish va olish',
        duration: '3-6 oy'
      },
      {
        step: 3,
        title: 'Ariza',
        description: 'To\'liq arizani tayyorlash va yuborish',
        duration: '2-3 oy'
      },
      {
        step: 4,
        title: 'PR olish',
        description: 'Permanent Residence vizasini olish',
        duration: '6-8 oy'
      }
    ],
    
    lifeInfo: {
      housing: 'Uy-joy: Oyiga CAD 1,200-2,500. Shahar markazlarida qimmatroq.',
      transport: 'Transport: Oylik CAD 100-150. Mashinaga ega bo\'lish yaxshiroq.',
      food: 'Ovqatlanish: Oyiga CAD 400-700. Supermarketlar sifatli.',
      healthcare: 'Sog\'liqni saqlash: Bepul davlat tizimi (Provincial Health Insurance).'
    },
    
    salaryDetails: {
      min: 4000,
      max: 7500,
      average: 5500,
      taxRate: '15-33% (federal + provincial)'
    }
  },
  
  {
    id: 'uk',
    name: 'Buyuk Britaniya',
    nameEn: 'United Kingdom',
    flag: '🇬🇧',
    shortDescription: 'Dunyoning moliya va ta\'lim markazi. Yuqori maosh va karyera rivojlantirish imkoniyatlari.',
    salary: '$3,800 - $6,500',
    popularJobs: ['Shifokorlar', 'IT', 'Moliya', 'O\'qituvchilar', 'Muhandislar'],
    visaDuration: '3-8 oy',
    visaSuccess: '90%',
    language: 'Ingliz tili',
    currency: 'Funt sterling (GBP)',
    backgroundImage: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1920',
    fullDescription: 'Buyuk Britaniya - dunyoning etakchi iqtisodiyotlaridan biri. London moliya markazi, yuqori sifatli ta\'lim va boy madaniy meros. Mutaxassislar uchun ko\'plab imkoniyatlar va yuqori darajadagi hayot.',
    
    requirements: {
      age: '18-50 yosh',
      education: 'Oliy ma\'lumot (bachelor yoki yuqori)',
      language: 'IELTS 6.0+ (har bir skill bo\'yicha)',
      experience: 'Kasbga mos tajriba (Skilled Worker uchun)'
    },
    
    benefits: [
      'Yuqori maosh (oyiga £3,000-6,000)',
      'NHS - bepul tibbiy xizmat',
      'Karyera rivojlantirish imkoniyatlari',
      'Dunyo darajasidagi ta\'lim',
      'Yevropaga sayohat',
      '5 yildan keyin ILR (Indefinite Leave to Remain)',
      '6 yildan keyin fuqarolik',
      'Oila uchun imtiyozlar'
    ],
    
    documents: [
      'Pasport (6 oy+ amal qilish muddati)',
      'Certificate of Sponsorship (CoS)',
      'IELTS Life Skills yoki IELTS Academic',
      'Diplom va transkript',
      'TB test natijasi',
      'Criminal record certificate',
      'Moliyaviy ko\'rsatkich (£1,270 bankda)',
      'Ish tajribasi hujjatlari',
      'CV',
      'Passport fotolar'
    ],
    
    process: [
      {
        step: 1,
        title: 'Ish topish',
        description: 'UK Sponsor License bo\'lgan kompaniyadan CoS olish',
        duration: '1-3 oy'
      },
      {
        step: 2,
        title: 'Hujjatlar',
        description: 'IELTS topshirish va barcha hujjatlarni tayyorlash',
        duration: '1-2 oy'
      },
      {
        step: 3,
        title: 'Viza arizasi',
        description: 'Online ariza va biometrik ma\'lumot berish',
        duration: '3-8 hafta'
      },
      {
        step: 4,
        title: 'Safar',
        description: 'Viza olgandan keyin UK ga jo\'nash',
        duration: '1-2 hafta'
      }
    ],
    
    lifeInfo: {
      housing: 'Uy-joy: Oyiga £800-2,000. London qimmatroq, boshqa shaharlar arzonroq.',
      transport: 'Transport: Oylik £100-200. Poyezdlar va avtobuslar qulay.',
      food: 'Ovqatlanish: Oyiga £250-500. Supermarketlar turli narx darajasida.',
      healthcare: 'Sog\'liqni saqlash: NHS bepul, lekin Immigration Health Surcharge to\'lanadi (£624/yil).'
    },
    
    salaryDetails: {
      min: 3800,
      max: 6500,
      average: 4800,
      taxRate: '20-45% (daromadga qarab)'
    }
  },
  
  {
    id: 'uae',
    name: 'Dubay (BAA)',
    nameEn: 'Dubai (UAE)',
    flag: '🇦🇪',
    shortDescription: 'Soliqsiz daromad, yuqori hayot sifati va issiq iqlim. Qurilish, turizm va moliya sohasida keng imkoniyatlar.',
    salary: '$2,500 - $8,000',
    popularJobs: ['Qurilish', 'Mehmonxona xizmati', 'Savdo', 'Moliya', 'IT'],
    visaDuration: '1-3 oy',
    visaSuccess: '96%',
    language: 'Ingliz tili',
    currency: 'Dirham (AED)',
    backgroundImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920',
    fullDescription: 'Birlashgan Arab Amirliklari - Yaqin Sharqning eng rivojlangan davlati. Daromaddan soliq yo\'q, yuqori maosh va zamonaviy infratuzilma. Dubay global biznes va turizm markazi.',
    
    requirements: {
      age: '21-55 yosh',
      education: 'O\'rta maxsus yoki oliy ma\'lumot',
      language: 'Ingliz tili o\'rta daraja',
      experience: 'Kasbga mos tajriba (lavozimga qarab)'
    },
    
    benefits: [
      'Daromad solig\'i yo\'q (0%)',
      'Yuqori maosh (oyiga 8,000-30,000 AED)',
      'Issiq ob-havo yil bo\'yi',
      'Zamonaviy infratuzilma',
      'Xavfsiz muhit',
      'Ko\'p millatli jamiyat',
      'Oila vizasi imkoniyati',
      'Repatriation ticket (ish beruvchi to\'laydi)'
    ],
    
    documents: [
      'Pasport (6 oy+ muddati)',
      'Ish taklifi (Job Offer Letter)',
      'Diplom va sertifikatlar (notarial tasdiqli)',
      'Tibbiy test (HIV, hepatit va boshqalar)',
      'Emirates ID uchun rasm',
      'Passport fotolar',
      'Eski ish joyidan tavsifnoma',
      'Police clearance certificate',
      'Viza ariza shakli',
      'Tibbiy sug\'urta (ish beruvchi beradi)'
    ],
    
    process: [
      {
        step: 1,
        title: 'Ish topish',
        description: 'Dubai kompaniyasidan ish taklifini olish',
        duration: '2-6 hafta'
      },
      {
        step: 2,
        title: 'Employment visa',
        description: 'Ish beruvchi tomonidan employment visa rasmiylashtiriladi',
        duration: '1-2 hafta'
      },
      {
        step: 3,
        title: 'Tibbiy test',
        description: 'Dubai ga kelgandan keyin tibbiy tekshiruvdan o\'tish',
        duration: '3-5 kun'
      },
      {
        step: 4,
        title: 'Emirates ID',
        description: 'Emirates ID va residence visa olish',
        duration: '1-2 hafta'
      }
    ],
    
    lifeInfo: {
      housing: 'Uy-joy: Oyiga 2,000-6,000 AED. Ish beruvchi ko\'pincha to\'laydi.',
      transport: 'Transport: Oylik 300-500 AED (Metro) yoki mashina (benzin arzon).',
      food: 'Ovqatlanish: Oyiga 1,000-2,000 AED. Turli xil restoranlar.',
      healthcare: 'Sog\'liqni saqlash: Majburiy tibbiy sug\'urta ish beruvchi to\'laydi.'
    },
    
    salaryDetails: {
      min: 2500,
      max: 8000,
      average: 4500,
      taxRate: '0% (daromad solig\'i yo\'q)'
    }
  },
  
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
  }
];

// Helper function
export const getCountryById = (id: string): Country | undefined => {
  return countries.find(country => country.id === id);
};
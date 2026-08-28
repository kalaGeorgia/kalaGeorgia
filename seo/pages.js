'use strict';

/**
 * Wave 1 — the first 10 commercial SEO pages (KALA_SEO_CLAUDE_CODE_SPEC.md §7).
 *
 * Positioning note: these landing pages deliberately address individual
 * travellers, couples, families and small groups (up to the Toyota Alphard's
 * 6 seats). The homepage and the corporate page keep the strict B2B/VIP tone.
 * See docs/SEO_URL_ARCHITECTURE.md — "two-track positioning".
 *
 * Prices are intentionally never stated as figures: the spec forbids inventing
 * business facts, so every page routes pricing to the WhatsApp conversation.
 */

// Localized directory segment for grouped pages.
const GROUP_SEGMENT = {
  transfers: { en: 'transfers', ru: 'transfery', ka: 'transferebi' },
  tours: { en: 'tours', ru: 'tury', ka: 'turebi' }
};

// The hub page each group's breadcrumb points at (these pages really exist,
// so no breadcrumb link ever resolves to a 404).
const GROUP_HUB = {
  transfers: 'private-transfers-georgia',
  tours: 'private-tours-georgia'
};

// Landing pages promoted into the footer of every page on the site.
const FOOTER_CLUSTER = [
  'private-transfers-georgia',
  'airport-transfer-tbilisi',
  'private-driver-georgia',
  'private-tours-georgia',
  'vip-transport-georgia',
  'corporate-transport-georgia'
];

const PAGES = [
  // ------------------------------------------------------------------ 1
  {
    key: 'airport-transfer-tbilisi',
    group: null,
    serviceType: 'Airport Transfer',
    areaServed: 'Tbilisi, Georgia',
    slug: {
      en: 'airport-transfer-tbilisi',
      ru: 'transfer-iz-aeroporta-tbilisi',
      ka: 'tbilisis-aeroportis-transferi'
    },
    related: ['kutaisi-airport-transfer', 'private-driver-georgia', 'private-transfers-georgia', 'tbilisi-kazbegi'],
    l: {
      en: {
        title: 'Tbilisi Airport Transfer | Private Driver | KALA Georgia',
        description: 'Private Tbilisi airport transfer in a Toyota Alphard: meet & greet with a name sign, flight tracking, free waiting for delays. Fixed price confirmed on WhatsApp.',
        h1: 'Private Tbilisi Airport Transfer',
        crumb: 'Tbilisi Airport Transfer',
        lead: 'We meet you in the arrivals hall of Tbilisi International Airport — a comfortable option for couples, families with children, and small groups of up to 6 people with luggage. Your driver tracks the flight and adjusts pickup timing to actual arrival, not the schedule, so night flights and delays are not a problem.',
        sections: [
          { h: 'What is included', ul: [
            'a name sign in arrivals and help with luggage;',
            'free waiting if your flight is delayed;',
            'water, phone chargers, and Wi-Fi on board;',
            'a child seat available on advance request.'
          ] },
          { h: 'Vehicle', p: 'Toyota Alphard 2018, light leather interior, reclining second-row seats, seating for up to 6 passengers with room for family or small-group luggage.' },
          { h: 'How it works', p: 'Send your route and flight number on WhatsApp, get a fixed price, and your driver meets you with a sign — no extra charges along the way.' },
          { h: 'Routes from the airport', p: 'Tbilisi city center (typically 20–30 minutes depending on traffic), any district of the city, and direct onward transfers to Kakheti, Kazbegi, Gudauri, or Batumi if that is your first stop.' },
          { h: 'Pricing', p: 'Confirmed on WhatsApp before the trip, with no surcharges for traffic, luggage, or waiting time.' }
        ],
        faq: [
          { q: 'What if my flight is delayed?', a: 'We track it by flight number, adjust pickup automatically, and waiting is free.' },
          { q: 'Do you cover night flights?', a: 'Yes, meet and greet is available at any hour.' },
          { q: 'Will a family of four with luggage fit?', a: 'The Alphard seats 6 with room for a family’s bags.' },
          { q: 'Do I need to pay in advance?', a: 'No — the price is agreed by chat, payment is on the day of the trip.' }
        ]
      },
      ru: {
        title: 'Трансфер из аэропорта Тбилиси | Встреча с табличкой | KALA Georgia',
        description: 'Трансфер из аэропорта Тбилиси на Toyota Alphard: встреча с табличкой, отслеживание рейса, бесплатное ожидание при задержке. Фиксированная цена — уточните в WhatsApp.',
        h1: 'Трансфер из аэропорта Тбилиси',
        crumb: 'Трансфер из аэропорта Тбилиси',
        lead: 'Встречаем в зале прилёта Тбилисского международного аэропорта — подходит для пар, семей с детьми и небольших групп до 6 человек с багажом. Водитель отслеживает ваш рейс и подстраивает время подачи под фактическое прибытие, а не расписание — ночные рейсы и задержки не проблема.',
        sections: [
          { h: 'Что входит в поездку', ul: [
            'табличка с именем в зале прилёта, помощь с чемоданами;',
            'бесплатное ожидание при задержке рейса;',
            'вода, зарядки для телефона, Wi-Fi в салоне;',
            'детское кресло — по предварительному запросу.'
          ] },
          { h: 'Автомобиль', p: 'Toyota Alphard 2018, светлый кожаный салон, раскладывающиеся кресла второго ряда, до 6 пассажиров и багаж на семью или небольшую компанию.' },
          { h: 'Как это работает', p: 'Пишете маршрут и номер рейса в WhatsApp, получаете фиксированную цену, водитель встречает с табличкой — и вы едете без доплат в пути.' },
          { h: 'Маршруты от аэропорта', p: 'Центр Тбилиси (обычно 20–30 минут в зависимости от трафика), любой район города, а также прямые трансферы в Кахетию, Казбеги, Гудаури и Батуми без заезда в город — если это ваша первая точка маршрута.' },
          { h: 'Цена', p: 'Фиксируется в WhatsApp до поездки, без доплат за пробки, багаж или время ожидания.' }
        ],
        faq: [
          { q: 'Что будет, если рейс задержится?', a: 'Отслеживаем рейс по номеру, подача подстраивается автоматически, ожидание — бесплатно.' },
          { q: 'Едете ночью?', a: 'Да, встречаем в любое время суток, включая ночные рейсы.' },
          { q: 'Поместимся вчетвером с чемоданами?', a: 'Alphard рассчитан на 6 пассажиров с багажом — для семьи это комфортно.' },
          { q: 'Нужно ли платить заранее?', a: 'Нет, цена фиксируется в переписке, оплата — по факту поездки.' }
        ]
      },
      ka: {
        title: 'თბილისის აეროპორტის ტრანსფერი | KALA Georgia',
        description: 'თბილისის აეროპორტის ინდივიდუალური ტრანსფერი Toyota Alphard-ით — დახვედრა ტაბლოთი, რეისის მონიტორინგი, უფასო ლოდინი დაგვიანების შემთხვევაში. ფასი — WhatsApp-ში.',
        h1: 'თბილისის აეროპორტის ინდივიდუალური ტრანსფერი',
        crumb: 'თბილისის აეროპორტის ტრანსფერი',
        lead: 'გხვდებით თბილისის საერთაშორისო აეროპორტის ჩამოსვლის დარბაზში — მოსახერხებელია წყვილებისთვის, ბავშვებიან ოჯახებისთვის და მცირერიცხოვანი, 6 კაცამდე ჯგუფებისთვის ბარგით. მძღოლი აკონტროლებს თქვენს რეისს და მიწოდების დროს არეგულირებს რეალურ ჩამოსვლაზე, არა განრიგზე — ღამის რეისები და დაგვიანებები პრობლემას არ წარმოადგენს.',
        sections: [
          { h: 'რა შედის მომსახურებაში', ul: [
            'სახელიანი ტაბლო ჩამოსვლის დარბაზში, დახმარება ბარგით;',
            'უფასო ლოდინი რეისის დაგვიანების შემთხვევაში;',
            'წყალი, დამტენები, Wi-Fi სალონში;',
            'საბავშვო სავარძელი — წინასწარი მოთხოვნით.'
          ] },
          { h: 'ავტომობილი', p: 'Toyota Alphard 2018, ღია ფერის ტყავის სალონი, მეორე რიგის გასაშლელი სავარძლები, 6 მგზავრამდე და ბარგი ოჯახის ან მცირე კომპანიისთვის.' },
          { h: 'როგორ მუშაობს', p: 'მოგვწერეთ მარშრუტი და რეისის ნომერი WhatsApp-ში, მიიღეთ ფიქსირებული ფასი, მძღოლი გხვდებათ ტაბლოთი — და მგზავრობთ დამატებითი გადასახადების გარეშე.' },
          { h: 'მარშრუტები აეროპორტიდან', p: 'თბილისის ცენტრი (ჩვეულებრივ 20–30 წუთი, ტრაფიკის მიხედვით), ქალაქის ნებისმიერი უბანი, ასევე პირდაპირი ტრანსფერები კახეთში, ყაზბეგში, გუდაურსა და ბათუმში, თუ ეს არის თქვენი პირველი გაჩერება.' },
          { h: 'ფასი', p: 'ფიქსირდება WhatsApp-ში მგზავრობამდე, დამატებითი გადასახადების გარეშე საცობებზე, ბარგზე ან ლოდინზე.' }
        ],
        faq: [
          { q: 'რა მოხდება, თუ რეისი დაგვიანდება?', a: 'ვაკონტროლებთ რეისის ნომრით, მიწოდება ავტომატურად რეგულირდება, ლოდინი — უფასო.' },
          { q: 'ღამის რეისებზეც მუშაობთ?', a: 'დიახ, ნებისმიერ დროს.' },
          { q: 'ოთხკაციანი ოჯახი ბარგით დაეტევა?', a: 'Alphard-ს 6 ადგილი აქვს ბარგის ადგილითურთ.' },
          { q: 'წინასწარ გადახდაა საჭირო?', a: 'არა, ფასი ფიქსირდება მიმოწერით, გადახდა — მგზავრობის დღეს.' }
        ]
      }
    }
  },

  // ------------------------------------------------------------------ 2
  {
    key: 'private-driver-georgia',
    group: null,
    serviceType: 'Chauffeur Service',
    areaServed: 'Georgia',
    slug: {
      en: 'private-driver-georgia',
      ru: 'individualnyy-voditel-gruziya',
      ka: 'piradi-mdzgholi-saqartveloshi'
    },
    related: ['airport-transfer-tbilisi', 'private-transfers-georgia', 'private-tours-georgia', 'vip-transport-georgia'],
    l: {
      en: {
        title: 'Private Driver in Georgia — Hourly, Daily, or for Your Whole Visit | KALA Georgia',
        description: 'A car with a driver in Georgia: by the hour, for a full day, or for several days. Flexible route, waiting between stops included, fixed rate.',
        h1: 'Private Driver in Georgia',
        crumb: 'Private Driver in Georgia',
        lead: 'A car with a driver that adapts to your plan, not the other way around — hourly hire, a full day, or support for your entire visit. Works well for a family with a flexible itinerary or a small group of friends who would rather decide where to stop and for how long as they go.',
        sections: [
          { h: 'Formats', ul: [
            'hourly — from a few hours, for the city and nearby areas;',
            'full day — up to 10 hours, with stops as you like;',
            'multi-day — the same driver and car for your whole visit.'
          ] },
          { h: 'What is included', p: 'Waiting time between stops is part of the rate, route changes during the trip need no re-approval, water and chargers on board, help with luggage at every stop.' },
          { h: 'Vehicle', p: 'Toyota Alphard 2018, up to 6 passengers, generous luggage space — useful for a day with several stops involving bags or shopping.' },
          { h: 'Common uses', p: 'Multi-city trips without the hassle of rental logistics and parking, days with several meetings or destinations (shopping, restaurants, sightseeing), flexible scheduling for a family with children who do not want to be tied to a fixed tour timetable.' },
          { h: 'Pricing', p: 'The hourly or daily rate is confirmed on WhatsApp before the trip starts; minimum booking is a few hours.' }
        ],
        faq: [
          { q: 'Can I change the route during the day?', a: 'Yes, within your booked time, no re-quoting needed.' },
          { q: 'Does the driver wait or leave between stops?', a: 'They wait — it is part of the hourly rate.' },
          { q: 'Can I book the same driver for several days?', a: 'Yes, the same driver and car throughout.' },
          { q: 'Is this suitable with kids?', a: 'Yes, a child seat is available on request.' }
        ]
      },
      ru: {
        title: 'Индивидуальный водитель в Грузии — почасово, на день, на весь визит | KALA Georgia',
        description: 'Автомобиль с водителем по Грузии: почасово, на день или на несколько дней. Гибкий маршрут, ожидание между остановками, фиксированная ставка.',
        h1: 'Индивидуальный водитель в Грузии',
        crumb: 'Индивидуальный водитель в Грузии',
        lead: 'Автомобиль с водителем, который подстраивается под ваш план, а не наоборот — почасовая аренда, полный день или сопровождение на весь визит. Подходит и для одной семьи с гибким маршрутом, и для небольшой компании друзей, которые хотят сами решать, где остановиться и на сколько.',
        sections: [
          { h: 'Форматы', ul: [
            'почасово — от нескольких часов, для города и окрестностей;',
            'полный день — до 10 часов, с остановками по желанию;',
            'на несколько дней — один и тот же водитель и машина на весь визит.'
          ] },
          { h: 'Что входит', p: 'Ожидание между остановками включено в ставку, изменение маршрута в течение поездки без предварительного согласования, вода и зарядки в салоне, помощь с багажом на каждой остановке.' },
          { h: 'Автомобиль', p: 'Toyota Alphard 2018, до 6 пассажиров, просторный багажник — удобно, если в течение дня вы заезжаете в разные места с чемоданами или покупками.' },
          { h: 'Для чего берут водителя на день или визит', p: 'Поездки по нескольким городам без логистики аренды и парковки, дни с несколькими встречами и точками (шопинг, рестораны, экскурсии), гибкий график для семьи с детьми, когда важно не привязываться к расписанию тура.' },
          { h: 'Цена', p: 'Почасовая или дневная ставка фиксируется в WhatsApp до начала поездки, минимальная продолжительность — несколько часов.' }
        ],
        faq: [
          { q: 'Можно менять маршрут по ходу дня?', a: 'Да, без пересогласования цены, в рамках оплаченного времени.' },
          { q: 'Водитель ждёт на месте или уезжает?', a: 'Ждёт — время ожидания включено в почасовую ставку.' },
          { q: 'Можно взять водителя на несколько дней подряд?', a: 'Да, один и тот же водитель и машина.' },
          { q: 'Подходит для поездки с детьми?', a: 'Да, детское кресло — по предварительному запросу.' }
        ]
      },
      ka: {
        title: 'პირადი მძღოლი საქართველოში — საათობრივად, დღით ან მთელი ვიზიტით | KALA Georgia',
        description: 'მანქანა მძღოლთან საქართველოში: საათობრივად, სრული დღით ან რამდენიმე დღით. მოქნილი მარშრუტი, ლოდინი გაჩერებებს შორის შედის ფასში.',
        h1: 'პირადი მძღოლი საქართველოში',
        crumb: 'პირადი მძღოლი საქართველოში',
        lead: 'მანქანა მძღოლთან, რომელიც თქვენს გეგმას ერგება — საათობრივი დაქირავება, სრული დღე ან თანხლება მთელი ვიზიტის განმავლობაში. მოსახერხებელია როგორც ოჯახისთვის მოქნილი მარშრუტით, ისე მეგობრების მცირე კომპანიისთვის, რომლებსაც სურთ თავად გადაწყვიტონ, სად და რამდენ ხანს გაჩერდნენ.',
        sections: [
          { h: 'ფორმატები', ul: [
            'საათობრივად — რამდენიმე საათიდან, ქალაქისა და მიმდებარე ტერიტორიისთვის;',
            'სრული დღე — 10 საათამდე, გაჩერებებით სურვილისამებრ;',
            'რამდენიმე დღე — ერთი და იგივე მძღოლი და მანქანა მთელი ვიზიტისთვის.'
          ] },
          { h: 'რა შედის', p: 'ლოდინი გაჩერებებს შორის შედის საათობრივ ფასში, მარშრუტის ცვლილება დღის განმავლობაში დამატებითი შეთანხმების გარეშე, წყალი და დამტენები სალონში, დახმარება ბარგით ყოველ გაჩერებაზე.' },
          { h: 'ავტომობილი', p: 'Toyota Alphard 2018, 6 მგზავრამდე, ვრცელი საბარგული — მოსახერხებელია დღის განმავლობაში რამდენიმე გაჩერებისას ბარგით ან შესყიდვებით.' },
          { h: 'როდის ირჩევენ მძღოლს დღით ან ვიზიტით', p: 'რამდენიმე ქალაქის მოგზაურობა გაქირავების ლოგისტიკის გარეშე, დღეები რამდენიმე შეხვედრით (შოფინგი, რესტორნები, ღირსშესანიშნაობები), მოქნილი გრაფიკი ბავშვებიან ოჯახისთვის, როცა მნიშვნელოვანია ტურის განრიგზე დამოკიდებული არ იყოთ.' },
          { h: 'ფასი', p: 'საათობრივი ან დღიური ტარიფი ფიქსირდება WhatsApp-ში მგზავრობის დაწყებამდე, მინიმალური ხანგრძლივობა — რამდენიმე საათი.' }
        ],
        faq: [
          { q: 'შესაძლებელია მარშრუტის შეცვლა დღის განმავლობაში?', a: 'დიახ, გადახდილი დროის ფარგლებში.' },
          { q: 'მძღოლი ელოდება გაჩერებებზე?', a: 'დიახ, ლოდინი შედის საათობრივ ტარიფში.' },
          { q: 'შესაძლებელია იგივე მძღოლის დაჯავშნა რამდენიმე დღით?', a: 'დიახ.' },
          { q: 'შესაფერისია ბავშვებთან ერთად მგზავრობისთვის?', a: 'დიახ, საბავშვო სავარძელი — მოთხოვნით.' }
        ]
      }
    }
  },

  // ------------------------------------------------------------------ 3
  {
    key: 'private-transfers-georgia',
    group: null,
    serviceType: 'Private Transfer',
    areaServed: 'Georgia',
    slug: {
      en: 'private-transfers-georgia',
      ru: 'individualnye-transfery-gruziya',
      ka: 'individualuri-transferebi-saqartveloshi'
    },
    related: ['airport-transfer-tbilisi', 'kutaisi-airport-transfer', 'tbilisi-kazbegi', 'tbilisi-gudauri', 'tbilisi-borjomi', 'tbilisi-batumi', 'tbilisi-kutaisi'],
    l: {
      en: {
        title: 'Private Transfers Across Georgia — Fixed Price | KALA Georgia',
        description: 'Private transfers between Georgian cities: Batumi, Kutaisi, Kazbegi, Gudauri, Kakheti, Borjomi. Toyota Alphard, fixed price, no shared stops with other passengers.',
        h1: 'Private Transfers Across Georgia',
        crumb: 'Private Transfers',
        lead: 'A direct transfer from A to B with no shared stops or transfers along the way — it is just you, your family, or your group, at your own pace, with your own luggage.',
        sections: [
          { h: 'Where we drive', p: 'Tbilisi–Batumi, Tbilisi–Kutaisi, Tbilisi–Kazbegi, Tbilisi–Gudauri, Tbilisi–Kakheti, Tbilisi–Borjomi, plus routes between these destinations and anywhere else in Georgia.' },
          { h: 'What is included', p: 'Pickup at your address or hotel at the agreed time, stops along the way at your request — photos, coffee, rest, water and chargers on board, help with luggage.' },
          { h: 'Vehicle', p: 'Toyota Alphard 2018, up to 6 passengers with luggage — comfortable for a family on a longer drive: a spacious second row, climate control, a quiet cabin.' },
          { h: 'How this differs from a shared shuttle', p: 'No transfers and no waiting for other passengers, departure time is yours, not a shuttle schedule, and the route can be adjusted along the way.' },
          { h: 'Pricing', p: 'Confirmed on WhatsApp for your specific route and date before the trip, with no surcharges for distance or delays at mountain passes.' }
        ],
        faq: [
          { q: 'Is this private or shared with other passengers?', a: 'Private — just you and your group.' },
          { q: 'Can we stop for photos along the way?', a: 'Yes, free stops are part of the service.' },
          { q: 'How far do you travel?', a: 'Anywhere in Georgia, including Batumi.' },
          { q: 'What if plans change last minute?', a: 'Message us on WhatsApp — we will agree on a new time or date.' }
        ]
      },
      ru: {
        title: 'Индивидуальные трансферы по Грузии — фиксированная цена | KALA Georgia',
        description: 'Трансферы между городами Грузии: Батуми, Кутаиси, Казбеги, Гудаури, Кахетия, Боржоми. Toyota Alphard, фиксированная цена, без промежуточных остановок с другими пассажирами.',
        h1: 'Индивидуальные трансферы по Грузии',
        crumb: 'Трансферы',
        lead: 'Прямой трансфер из точки А в точку Б без промежуточных остановок с другими пассажирами и без пересадок — едете только вы, ваша семья или ваша компания, со своим темпом и своим багажом.',
        sections: [
          { h: 'Куда возим', p: 'Тбилиси — Батуми, Тбилиси — Кутаиси, Тбилиси — Казбеги, Тбилиси — Гудаури, Тбилиси — Кахетия, Тбилиси — Боржоми, а также между этими направлениями и любыми точками по Грузии.' },
          { h: 'Что входит', p: 'Подача к вашему адресу или отелю в согласованное время, остановки в пути по желанию — фото, кофе, отдых, вода и зарядки в салоне, помощь с багажом.' },
          { h: 'Автомобиль', p: 'Toyota Alphard 2018, до 6 пассажиров с багажом — комфортно для семьи в дальней дороге: просторный второй ряд, климат-контроль, тихий салон.' },
          { h: 'Чем это отличается от группового трансфера', p: 'Никаких пересадок и ожидания попутчиков, время выезда — ваше, а не по расписанию сборного трансфера, маршрут можно скорректировать по дороге.' },
          { h: 'Цена', p: 'Фиксируется в WhatsApp по конкретному маршруту и дате до поездки, без доплат за расстояние в пути или задержки на перевалах.' }
        ],
        faq: [
          { q: 'Это индивидуальный трансфер или с попутчиками?', a: 'Только вы и ваши спутники — без подсадки.' },
          { q: 'Можно остановиться в дороге сфотографировать вид?', a: 'Да, свободные остановки — часть услуги.' },
          { q: 'Как далеко вы возите?', a: 'По всей Грузии — от соседнего региона до Батуми.' },
          { q: 'Что если планы поменяются в последний момент?', a: 'Напишите в WhatsApp — согласуем новое время или дату.' }
        ]
      },
      ka: {
        title: 'ინდივიდუალური ტრანსფერები საქართველოში — ფიქსირებული ფასი | KALA Georgia',
        description: 'ტრანსფერები საქართველოს ქალაქებს შორის: ბათუმი, ქუთაისი, ყაზბეგი, გუდაური, კახეთი, ბორჯომი. Toyota Alphard, ფიქსირებული ფასი, სხვა მგზავრებთან გაჩერების გარეშე.',
        h1: 'ინდივიდუალური ტრანსფერები საქართველოში',
        crumb: 'ტრანსფერები',
        lead: 'პირდაპირი ტრანსფერი A წერტილიდან B წერტილამდე სხვა მგზავრებთან გაჩერების ან გადანაცვლების გარეშე — მხოლოდ თქვენ, თქვენი ოჯახი ან თქვენი კომპანია, თქვენივე ტემპითა და ბარგით.',
        sections: [
          { h: 'სად ვმგზავრობთ', p: 'თბილისი–ბათუმი, თბილისი–ქუთაისი, თბილისი–ყაზბეგი, თბილისი–გუდაური, თბილისი–კახეთი, თბილისი–ბორჯომი, ასევე ამ მიმართულებებს შორის და საქართველოს ნებისმიერ წერტილში.' },
          { h: 'რა შედის', p: 'მიწოდება თქვენს მისამართზე ან სასტუმროზე შეთანხმებულ დროს, გაჩერებები გზაში სურვილისამებრ — ფოტო, ყავა, დასვენება, წყალი და დამტენები სალონში, დახმარება ბარგით.' },
          { h: 'ავტომობილი', p: 'Toyota Alphard 2018, 6 მგზავრამდე ბარგით — კომფორტულია ოჯახისთვის გრძელ გზაზე: ვრცელი მეორე რიგი, კლიმატ-კონტროლი, წყნარი სალონი.' },
          { h: 'რით განსხვავდება ჯგუფური შატლისგან', p: 'გადანაცვლების ან თანამგზავრების ლოდინის გარეშე, გასვლის დრო — თქვენია, არა შატლის განრიგი, მარშრუტი შეიძლება დაზუსტდეს გზაში.' },
          { h: 'ფასი', p: 'ფიქსირდება WhatsApp-ში კონკრეტულ მარშრუტსა და თარიღზე მგზავრობამდე.' }
        ],
        faq: [
          { q: 'ეს ინდივიდუალური ტრანსფერია თუ სხვებთან ერთად?', a: 'მხოლოდ თქვენ და თქვენი თანმხლებები.' },
          { q: 'შესაძლებელია გზაში გაჩერება ფოტოსთვის?', a: 'დიახ, თავისუფალი გაჩერებები მომსახურების ნაწილია.' },
          { q: 'რამდენ მანძილზე მგზავრობთ?', a: 'მთელ საქართველოში, ბათუმის ჩათვლით.' },
          { q: 'რა ხდება, თუ გეგმა ბოლო წუთს იცვლება?', a: 'მოგვწერეთ WhatsApp-ში — შევათანხმებთ ახალ დროს.' }
        ]
      }
    }
  },

  // ------------------------------------------------------------------ 4
  {
    key: 'tbilisi-kazbegi',
    group: 'transfers',
    serviceType: 'Intercity Private Transfer',
    areaServed: 'Tbilisi and Kazbegi, Georgia',
    slug: {
      en: 'tbilisi-kazbegi',
      ru: 'tbilisi-kazbegi',
      ka: 'tbilisi-yazbegi'
    },
    related: ['private-transfers-georgia', 'tour-kazbegi', 'tbilisi-gudauri'],
    l: {
      en: {
        title: 'Tbilisi to Kazbegi Transfer | Private Driver | KALA Georgia',
        description: 'Private transfer from Tbilisi to Kazbegi (Stepantsminda) along the Georgian Military Highway. Stops as you like, fixed price, up to 6 passengers.',
        h1: 'Private Transfer from Tbilisi to Kazbegi',
        crumb: 'Tbilisi to Kazbegi',
        lead: 'The drive follows the Georgian Military Highway past the Zhinvali Reservoir, Ananuri Fortress, and the Cross Pass — the road itself is part of the experience, so we do not fix the number of stops: whether you pause for 10 minutes or an hour is up to you.',
        sections: [
          { h: 'About the route', p: 'Roughly 150 km, typically a 2.5–3 hour drive without stops; actual time depends on weather and season (winter can bring seasonal restrictions on the pass).' },
          { h: 'What is included', p: 'Pickup at your Tbilisi hotel or address, stops along the way (Ananuri, viewpoints, cafés), help with luggage, water and chargers on board.' },
          { h: 'Vehicle', p: 'Toyota Alphard 2018, up to 6 passengers — comfortable for a family on a mountain drive, with spacious seats and climate control.' },
          { h: 'Trip formats', p: 'One-way transfer, a same-day round trip, or paired with an overnight stay in Kazbegi or Stepantsminda — by arrangement.' },
          { h: 'Pricing', p: 'Confirmed on WhatsApp for your date and trip format (one-way or round trip).' }
        ],
        faq: [
          { q: 'Can we stop at Ananuri Fortress?', a: 'Yes, it is a standard stop on this route — for as long as you like.' },
          { q: 'Are there winter road restrictions?', a: 'The Cross Pass can have seasonal restrictions — check closer to your travel date.' },
          { q: 'Is it safe to travel with children?', a: 'The road is paved the whole way; a child seat is available on request.' },
          { q: 'Can we return the same day?', a: 'Yes, just agree on a return time in advance.' }
        ]
      },
      ru: {
        title: 'Трансфер Тбилиси — Казбеги | Индивидуально | KALA Georgia',
        description: 'Индивидуальный трансфер из Тбилиси в Казбеги (Степанцминда) по Военно-Грузинской дороге. Остановки по желанию, фиксированная цена, до 6 пассажиров.',
        h1: 'Трансфер из Тбилиси в Казбеги',
        crumb: 'Тбилиси — Казбеги',
        lead: 'Дорога проходит по Военно-Грузинской дороге через Жинвальское водохранилище, крепость Ананури и Крестовый перевал — маршрут сам по себе часть впечатления, поэтому у нас нет фиксированного числа остановок: где задержаться на 10 минут, а где на час, решаете вы.',
        sections: [
          { h: 'О маршруте', p: 'Расстояние — около 150 км, время в пути обычно 2,5–3 часа без остановок, точное время зависит от погоды и сезона (зимой возможны ограничения проезда на перевале).' },
          { h: 'Что входит', p: 'Подача к отелю или адресу в Тбилиси, остановки по пути (Ананури, смотровые площадки, кафе), помощь с багажом, вода и зарядки в салоне.' },
          { h: 'Автомобиль', p: 'Toyota Alphard 2018, до 6 пассажиров — удобно для семьи с детьми на горной дороге: просторные кресла, климат-контроль.' },
          { h: 'Варианты поездки', p: 'Трансфер в одну сторону, трансфер туда-обратно в тот же день, либо в связке с ночёвкой в Казбеги или Степанцминде — по договорённости.' },
          { h: 'Цена', p: 'Фиксируется в WhatsApp по вашей дате и формату поездки (в одну сторону или туда-обратно).' }
        ],
        faq: [
          { q: 'Можно остановиться у крепости Ананури?', a: 'Да, это стандартная остановка на маршруте, время — по вашему желанию.' },
          { q: 'Проезд зимой ограничивают?', a: 'На Крестовом перевале возможны сезонные ограничения — уточните ближе к дате поездки.' },
          { q: 'Едем с детьми — это безопасно?', a: 'Дорога асфальтирована на всём протяжении, детское кресло — по запросу.' },
          { q: 'Можно уехать обратно в тот же день?', a: 'Да, договоритесь о времени возврата заранее.' }
        ]
      },
      ka: {
        title: 'ტრანსფერი თბილისი — ყაზბეგი | ინდივიდუალურად | KALA Georgia',
        description: 'ინდივიდუალური ტრანსფერი თბილისიდან ყაზბეგში (სტეფანწმინდა) საქართველოს სამხედრო გზით. გაჩერებები სურვილისამებრ, ფიქსირებული ფასი, 6 მგზავრამდე.',
        h1: 'ტრანსფერი თბილისიდან ყაზბეგში',
        crumb: 'თბილისი — ყაზბეგი',
        lead: 'გზა გადის საქართველოს სამხედრო გზაზე, ჟინვალის წყალსაცავის, ანანურის ციხის და ჯვრის უღელტეხილის გავლით — გზა თავად არის შთაბეჭდილების ნაწილი, ამიტომ გაჩერებების რაოდენობას ჩვენ არ ვაფიქსირებთ: სად შეჩერდეთ 10 წუთით და სად საათით, თქვენ წყვეტთ.',
        sections: [
          { h: 'მარშრუტის შესახებ', p: 'მანძილი — დაახლოებით 150 კმ, გზაში გატარებული დრო ჩვეულებრივ 2.5–3 საათია გაჩერების გარეშე; ზუსტი დრო დამოკიდებულია სეზონსა და ამინდზე (ზამთარში შესაძლებელია შეზღუდვები უღელტეხილზე).' },
          { h: 'რა შედის', p: 'მიწოდება თქვენს სასტუმროზე ან მისამართზე თბილისში, გაჩერებები გზაში (ანანური, სანახავი ადგილები, კაფე), დახმარება ბარგით, წყალი და დამტენები სალონში.' },
          { h: 'ავტომობილი', p: 'Toyota Alphard 2018, 6 მგზავრამდე — კომფორტულია ოჯახისთვის მთის გზაზე.' },
          { h: 'მგზავრობის ფორმატები', p: 'ცალმხრივი ტრანსფერი, იმავე დღეს დაბრუნებით, ან ღამისთევასთან ერთად ყაზბეგში ან სტეფანწმინდაში — შეთანხმებით.' },
          { h: 'ფასი', p: 'ფიქსირდება WhatsApp-ში თქვენი თარიღისა და ფორმატის მიხედვით.' }
        ],
        faq: [
          { q: 'შესაძლებელია ანანურის ციხესთან გაჩერება?', a: 'დიახ, ეს სტანდარტული გაჩერებაა.' },
          { q: 'ზამთარში შეზღუდვები ხომ არ არის?', a: 'ჯვრის უღელტეხილზე შესაძლებელია სეზონური შეზღუდვები — დააზუსტეთ თარიღთან ახლოს.' },
          { q: 'უსაფრთხოა ბავშვებთან მგზავრობა?', a: 'გზა მთლიანად ასფალტირებულია, საბავშვო სავარძელი — მოთხოვნით.' },
          { q: 'შესაძლებელია იმავე დღეს დაბრუნება?', a: 'დიახ, წინასწარი შეთანხმებით.' }
        ]
      }
    }
  },

  // ------------------------------------------------------------------ 5
  {
    key: 'tbilisi-gudauri',
    group: 'transfers',
    serviceType: 'Intercity Private Transfer',
    areaServed: 'Tbilisi and Gudauri, Georgia',
    slug: {
      en: 'tbilisi-gudauri',
      ru: 'tbilisi-gudauri',
      ka: 'tbilisi-gudauri'
    },
    related: ['tbilisi-kazbegi', 'private-transfers-georgia', 'private-driver-georgia'],
    l: {
      en: {
        title: 'Tbilisi to Gudauri Transfer | Private Driver | KALA Georgia',
        description: 'Private transfer from Tbilisi to Gudauri — convenient for ski season and day trips to the mountains. Up to 6 passengers, room for skis and snowboards.',
        h1: 'Private Transfer from Tbilisi to Gudauri',
        crumb: 'Tbilisi to Gudauri',
        lead: 'One of our most requested winter-season routes — the resort sits along the way to the Kazbegi pass, so the drive shares the same scenic road, just shorter.',
        sections: [
          { h: 'About the route', p: 'Roughly 120 km, typically a 2–2.5 hour drive depending on weather and snowfall on the pass.' },
          { h: 'What is included', p: 'Pickup at your Tbilisi hotel or address, luggage space for skis, snowboards, and gear, water and chargers on board, help with luggage.' },
          { h: 'Vehicle', p: 'Toyota Alphard 2018, up to 6 passengers, generous luggage space — useful in season when a whole group’s gear is coming along.' },
          { h: 'Trip formats', p: 'A one-way transfer before your stay begins, a same-day round trip for a ski day, or repeat trips over several days.' },
          { h: 'Pricing', p: 'Confirmed on WhatsApp for your date and format (one-way, round trip, or multi-day).' }
        ],
        faq: [
          { q: 'Will gear for the whole group fit?', a: 'Yes, the Alphard’s trunk handles bulky loads — let us know the gear count in advance.' },
          { q: 'Do you drive in snowfall?', a: 'Yes, though travel time may increase — we will check conditions before departure.' },
          { q: 'Can I book a same-day round trip?', a: 'Yes, that is a common format for day trips to the mountains.' },
          { q: 'Is prepayment required in high season?', a: 'No, the price is confirmed by chat, payment is on the day.' }
        ]
      },
      ru: {
        title: 'Трансфер Тбилиси — Гудаури | Индивидуально | KALA Georgia',
        description: 'Индивидуальный трансфер из Тбилиси в Гудаури: удобно для горнолыжного сезона и однодневных поездок в горы. До 6 пассажиров, место под лыжи и сноуборды.',
        h1: 'Трансфер из Тбилиси в Гудаури',
        crumb: 'Тбилиси — Гудаури',
        lead: 'Одно из самых частых направлений в зимний сезон — курорт находится по пути к Казбегскому перевалу, поэтому дорога та же живописная трасса, что и на Казбеги, только короче.',
        sections: [
          { h: 'О маршруте', p: 'Расстояние — около 120 км, обычное время в пути 2–2,5 часа в зависимости от погоды и снегопадов на перевале.' },
          { h: 'Что входит', p: 'Подача к отелю или адресу в Тбилиси, место в багажнике под лыжи, сноуборды и снаряжение, вода и зарядки в салоне, помощь с багажом.' },
          { h: 'Автомобиль', p: 'Toyota Alphard 2018, до 6 пассажиров, просторный багажник — актуально в сезон, когда с собой едет спортивное снаряжение на всю компанию.' },
          { h: 'Варианты поездки', p: 'Трансфер в одну сторону перед началом проживания, трансфер туда-обратно на один горнолыжный день, регулярные поездки на несколько дней подряд.' },
          { h: 'Цена', p: 'Фиксируется в WhatsApp по дате и формату (в одну сторону, туда-обратно или на несколько дней).' }
        ],
        faq: [
          { q: 'Поместится снаряжение на всю группу?', a: 'Да, багажник Alphard рассчитан на объёмный груз — уточните состав снаряжения заранее.' },
          { q: 'Ездите в снегопад?', a: 'Да, но время в пути может увеличиться — обсудим актуальную обстановку перед выездом.' },
          { q: 'Можно заказать поездку туда-обратно в один день?', a: 'Да, это частый формат для однодневных выездов в горы.' },
          { q: 'Работаете в высокий сезон без предоплаты?', a: 'Да, цена фиксируется в переписке, оплата — по факту.' }
        ]
      },
      ka: {
        title: 'ტრანსფერი თბილისი — გუდაური | ინდივიდუალურად | KALA Georgia',
        description: 'ინდივიდუალური ტრანსფერი თბილისიდან გუდაურში — მოსახერხებელია სათხილამურო სეზონისა და ერთდღიანი მთის მოგზაურობებისთვის. 6 მგზავრამდე, ადგილი თხილამურებისთვის.',
        h1: 'ტრანსფერი თბილისიდან გუდაურში',
        crumb: 'თბილისი — გუდაური',
        lead: 'ერთ-ერთი ყველაზე მოთხოვნადი მიმართულება ზამთრის სეზონში — კურორტი ყაზბეგის უღელტეხილისკენ მიმავალ გზაზეა, ამიტომ გზა იმავე ულამაზეს ტრასაზე გადის, უბრალოდ უფრო მოკლეა.',
        sections: [
          { h: 'მარშრუტის შესახებ', p: 'მანძილი — დაახლოებით 120 კმ, ჩვეულებრივი დრო 2–2.5 საათია, ამინდისა და თოვლის მიხედვით.' },
          { h: 'რა შედის', p: 'მიწოდება თბილისში, ადგილი საბარგულში თხილამურებისა და აღჭურვილობისთვის, წყალი და დამტენები სალონში, დახმარება ბარგით.' },
          { h: 'ავტომობილი', p: 'Toyota Alphard 2018, 6 მგზავრამდე, ვრცელი საბარგული.' },
          { h: 'მგზავრობის ფორმატები', p: 'ცალმხრივი ტრანსფერი სეზონის დაწყებამდე, იმავე დღეს დაბრუნებით ერთი სათხილამურო დღისთვის, ან განმეორებითი მგზავრობები რამდენიმე დღით.' },
          { h: 'ფასი', p: 'ფიქსირდება WhatsApp-ში თქვენი თარიღისა და ფორმატის მიხედვით.' }
        ],
        faq: [
          { q: 'მთელი ჯგუფის აღჭურვილობა დაეტევა?', a: 'დიახ, წინასწარ შეგვატყობინეთ რაოდენობა.' },
          { q: 'თოვლში დაძვრებით?', a: 'დიახ, გზაზე დრო შეიძლება გაიზარდოს.' },
          { q: 'შესაძლებელია იმავე დღეს დაბრუნება?', a: 'დიახ.' },
          { q: 'საჭიროა წინასწარი გადახდა მაღალ სეზონზე?', a: 'არა.' }
        ]
      }
    }
  },

  // ------------------------------------------------------------------ 6
  {
    key: 'tbilisi-borjomi',
    group: 'transfers',
    serviceType: 'Intercity Private Transfer',
    areaServed: 'Tbilisi and Borjomi, Georgia',
    slug: {
      en: 'tbilisi-borjomi',
      ru: 'tbilisi-borjomi',
      ka: 'tbilisi-borjomi'
    },
    related: ['private-transfers-georgia', 'tour-borjomi', 'tbilisi-batumi'],
    l: {
      en: {
        title: 'Tbilisi to Borjomi Transfer | Private Driver | KALA Georgia',
        description: 'Private transfer from Tbilisi to Borjomi: the park, mineral springs, and Akhaltsikhe castle along the way. Up to 6 passengers, fixed price.',
        h1: 'Private Transfer from Tbilisi to Borjomi',
        crumb: 'Tbilisi to Borjomi',
        lead: 'Works well both as a standalone day trip (the park, the springs, a walk) and as the first leg of a longer route — many continue on to Akhaltsikhe or Vardzia.',
        sections: [
          { h: 'About the route', p: 'Roughly 150 km, typically a 2–2.5 hour drive.' },
          { h: 'What is included', p: 'Pickup at your Tbilisi hotel or address, stops along the way as you like, water and chargers on board, help with luggage.' },
          { h: 'Vehicle', p: 'Toyota Alphard 2018, up to 6 passengers — comfortable for a family day trip with a child and a stroller.' },
          { h: 'Trip formats', p: 'A same-day round trip, a one-way transfer if you are staying overnight in Borjomi, or a combined route on to Akhaltsikhe or Vardzia by arrangement.' },
          { h: 'Pricing', p: 'Confirmed on WhatsApp for your date and trip format.' }
        ],
        faq: [
          { q: 'Can we bring a stroller?', a: 'Yes, the trunk fits a stroller and family gear.' },
          { q: 'Do you wait at the park while we walk around?', a: 'Yes, waiting time is agreed in advance and included in the price.' },
          { q: 'Can we continue to Akhaltsikhe the same day?', a: 'Yes, tell us your plan in advance and we will quote it.' },
          { q: 'Can we stop more than once?', a: 'Any number of stops is fine by arrangement.' }
        ]
      },
      ru: {
        title: 'Трансфер Тбилиси — Боржоми | Индивидуально | KALA Georgia',
        description: 'Индивидуальный трансфер из Тбилиси в Боржоми: парк, минеральные источники, замок Ахалцихе по пути. До 6 пассажиров, фиксированная цена.',
        h1: 'Трансфер из Тбилиси в Боржоми',
        crumb: 'Тбилиси — Боржоми',
        lead: 'Направление подходит и как самостоятельная поездка на день (парк, источники, прогулка), и как первый этап более длинного маршрута — многие продолжают в Ахалцихе или Вардзиа.',
        sections: [
          { h: 'О маршруте', p: 'Расстояние — около 150 км, время в пути обычно 2–2,5 часа.' },
          { h: 'Что входит', p: 'Подача к отелю или адресу в Тбилиси, остановки по пути по желанию, вода и зарядки в салоне, помощь с багажом.' },
          { h: 'Автомобиль', p: 'Toyota Alphard 2018, до 6 пассажиров — комфортно для семейного выезда на день с ребёнком и коляской.' },
          { h: 'Варианты поездки', p: 'Трансфер туда-обратно в тот же день, трансфер в одну сторону при переезде для ночёвки в Боржоми, комбинация с заездом в Ахалцихе или Вардзиа по договорённости.' },
          { h: 'Цена', p: 'Фиксируется в WhatsApp по дате и формату поездки.' }
        ],
        faq: [
          { q: 'Можно взять коляску?', a: 'Да, багажник рассчитан на детскую коляску и вещи семьи.' },
          { q: 'Стоите ли в парке, пока мы гуляем?', a: 'Да, ожидание оговаривается заранее и включается в стоимость.' },
          { q: 'Можно продолжить в Ахалцихе тем же днём?', a: 'Да, обсудите маршрут заранее — предложим формат и цену.' },
          { q: 'Это одна остановка или можно несколько?', a: 'Остановки в пути возможны в любом количестве по согласованию.' }
        ]
      },
      ka: {
        title: 'ტრანსფერი თბილისი — ბორჯომი | ინდივიდუალურად | KALA Georgia',
        description: 'ინდივიდუალური ტრანსფერი თბილისიდან ბორჯომში — პარკი, მინერალური წყლები, ახალციხის ციხე გზად. 6 მგზავრამდე, ფიქსირებული ფასი.',
        h1: 'ტრანსფერი თბილისიდან ბორჯომში',
        crumb: 'თბილისი — ბორჯომი',
        lead: 'მიმართულება ერთნაირად კარგია დამოუკიდებელი ერთდღიანი მოგზაურობისთვის (პარკი, წყლები, გასეირნება) და გრძელი მარშრუტის პირველი ეტაპისთვისაც — ბევრი აგრძელებს ახალციხემდე ან ვარძიამდე.',
        sections: [
          { h: 'მარშრუტის შესახებ', p: 'მანძილი — დაახლოებით 150 კმ, გზაში დრო ჩვეულებრივ 2–2.5 საათია.' },
          { h: 'რა შედის', p: 'მიწოდება თბილისში, გაჩერებები გზაში სურვილისამებრ, წყალი და დამტენები სალონში, დახმარება ბარგით.' },
          { h: 'ავტომობილი', p: 'Toyota Alphard 2018, 6 მგზავრამდე — კომფორტულია საოჯახო გასვლისთვის ბავშვთან ერთად.' },
          { h: 'მგზავრობის ფორმატები', p: 'იმავე დღეს დაბრუნებით, ცალმხრივად ღამისთევისთვის ბორჯომში, ან კომბინირებულად ახალციხემდე ან ვარძიამდე შეთანხმებით.' },
          { h: 'ფასი', p: 'ფიქსირდება WhatsApp-ში თარიღისა და ფორმატის მიხედვით.' }
        ],
        faq: [
          { q: 'შეგვიძლია ეტლი წავიღოთ?', a: 'დიახ.' },
          { q: 'ელოდებით პარკთან, სანამ ვსეირნობთ?', a: 'დიახ, ლოდინი წინასწარ ითანხმდება.' },
          { q: 'შესაძლებელია ახალციხემდე გაგრძელება იმავე დღეს?', a: 'დიახ, წინასწარ შეგვატყობინეთ გეგმა.' },
          { q: 'რამდენჯერ შეგვიძლია გაჩერება?', a: 'შეთანხმებით — ნებისმიერჯერ.' }
        ]
      }
    }
  },

  // ------------------------------------------------------------------ 7
  {
    key: 'tbilisi-batumi',
    group: 'transfers',
    serviceType: 'Intercity Private Transfer',
    areaServed: 'Tbilisi and Batumi, Georgia',
    slug: {
      en: 'tbilisi-batumi',
      ru: 'tbilisi-batumi',
      ka: 'tbilisi-batumi'
    },
    related: ['private-transfers-georgia', 'tbilisi-kutaisi', 'tbilisi-borjomi', 'private-driver-georgia'],
    l: {
      en: {
        title: 'Tbilisi to Batumi Transfer | Private Driver | KALA Georgia',
        description: 'Private transfer from Tbilisi to Batumi in a Toyota Alphard: stops along the way, comfort for the long drive, fixed price, up to 6 passengers.',
        h1: 'Private Transfer from Tbilisi to Batumi',
        crumb: 'Tbilisi to Batumi',
        lead: 'The longest of our regular routes — a comfortable cabin and the freedom to pause along the way matter here more than shaving minutes off the drive.',
        sections: [
          { h: 'About the route', p: 'Roughly 370 km, typically a 5–6 hour drive depending on the route (via Kutaisi or via Khashuri) and stops.' },
          { h: 'What is included', p: 'Pickup at your Tbilisi hotel or address, rest and meal stops along the way, water and chargers on board, help with luggage on pickup and drop-off.' },
          { h: 'Vehicle', p: 'Toyota Alphard 2018, up to 6 passengers with luggage — reclining second-row seats for the long drive, climate control throughout.' },
          { h: 'Trip formats', p: 'A one-way transfer when relocating to the coast, a round trip, or a route via Kutaisi with a stop (by arrangement).' },
          { h: 'Pricing', p: 'Confirmed on WhatsApp for your date and chosen route.' }
        ],
        faq: [
          { q: 'How long does it take?', a: 'Usually 5–6 hours depending on route and stops — we will confirm at booking.' },
          { q: 'Can we stop for lunch?', a: 'Yes, stops along the way are included, timing is up to you.' },
          { q: 'Is it OK to travel this far with a young child?', a: 'Yes, the cabin is built for long drives, and a child seat is available on request.' },
          { q: 'Can we route via Kutaisi with a stop?', a: 'Yes, tell us in advance and we will factor it into the quote.' }
        ]
      },
      ru: {
        title: 'Трансфер Тбилиси — Батуми | Индивидуально | KALA Georgia',
        description: 'Индивидуальный трансфер из Тбилиси в Батуми на Toyota Alphard: остановки в пути, комфорт на дальней дороге, фиксированная цена, до 6 пассажиров.',
        h1: 'Трансфер из Тбилиси в Батуми',
        crumb: 'Тбилиси — Батуми',
        lead: 'Самый протяжённый из регулярных маршрутов — здесь особенно важен комфортный салон и возможность сделать паузу в пути, а не только доехать быстрее всех.',
        sections: [
          { h: 'О маршруте', p: 'Расстояние — около 370 км, время в пути обычно 5–6 часов в зависимости от маршрута (через Кутаиси или через Хашури) и остановок.' },
          { h: 'Что входит', p: 'Подача к отелю или адресу в Тбилиси, остановки для отдыха и еды по пути, вода и зарядки в салоне, помощь с багажом на посадке и высадке.' },
          { h: 'Автомобиль', p: 'Toyota Alphard 2018, до 6 пассажиров с багажом — раскладывающиеся кресла второго ряда для долгой дороги, климат-контроль на весь путь.' },
          { h: 'Варианты поездки', p: 'Трансфер в одну сторону при переезде на побережье, трансфер туда-обратно, поездка с заездом в Кутаиси по пути (по договорённости).' },
          { h: 'Цена', p: 'Фиксируется в WhatsApp по дате и выбранному маршруту.' }
        ],
        faq: [
          { q: 'Сколько ехать по времени?', a: 'Обычно 5–6 часов в зависимости от маршрута и остановок — точнее скажем при бронировании.' },
          { q: 'Можно остановиться пообедать?', a: 'Да, остановки по пути включены, время — по вашему желанию.' },
          { q: 'Стоит ли ехать с маленьким ребёнком так далеко?', a: 'Да, салон рассчитан на долгую дорогу, детское кресло — по запросу.' },
          { q: 'Можно доехать через Кутаиси с остановкой?', a: 'Да, обсудите маршрут заранее — учтём в цене.' }
        ]
      },
      ka: {
        title: 'ტრანსფერი თბილისი — ბათუმი | ინდივიდუალურად | KALA Georgia',
        description: 'ინდივიდუალური ტრანსფერი თბილისიდან ბათუმში Toyota Alphard-ით — გაჩერებები გზაში, კომფორტი გრძელ გზაზე, ფიქსირებული ფასი, 6 მგზავრამდე.',
        h1: 'ტრანსფერი თბილისიდან ბათუმში',
        crumb: 'თბილისი — ბათუმი',
        lead: 'ჩვენი ყველაზე გრძელი რეგულარული მარშრუტი — აქ განსაკუთრებით მნიშვნელოვანია კომფორტული სალონი და გზაში შესვენების შესაძლებლობა.',
        sections: [
          { h: 'მარშრუტის შესახებ', p: 'მანძილი — დაახლოებით 370 კმ, გზაში დრო ჩვეულებრივ 5–6 საათია მარშრუტისა (ქუთაისზე ან ხაშურზე) და გაჩერებების მიხედვით.' },
          { h: 'რა შედის', p: 'მიწოდება თბილისში, დასვენება და კვების გაჩერებები გზაში, წყალი და დამტენები სალონში, დახმარება ბარგით.' },
          { h: 'ავტომობილი', p: 'Toyota Alphard 2018, 6 მგზავრამდე ბარგით — მეორე რიგის გასაშლელი სავარძლები გრძელი გზისთვის.' },
          { h: 'მგზავრობის ფორმატები', p: 'ცალმხრივი ტრანსფერი, იმავე დღეს დაბრუნებით, ან ქუთაისზე გავლით გაჩერებით (შეთანხმებით).' },
          { h: 'ფასი', p: 'ფიქსირდება WhatsApp-ში თარიღისა და მარშრუტის მიხედვით.' }
        ],
        faq: [
          { q: 'რამდენ ხანს გრძელდება გზა?', a: 'ჩვეულებრივ 5–6 საათი, მარშრუტისა და გაჩერებების მიხედვით.' },
          { q: 'შესაძლებელია გაჩერება ლანჩისთვის?', a: 'დიახ.' },
          { q: 'უსაფრთხოა პატარა ბავშვთან ასეთი მანძილი?', a: 'დიახ, საბავშვო სავარძელი — მოთხოვნით.' },
          { q: 'შესაძლებელია ქუთაისზე გავლით მგზავრობა?', a: 'დიახ, წინასწარ შეგვატყობინეთ.' }
        ]
      }
    }
  },

  // ------------------------------------------------------------------ 8
  {
    key: 'private-tours-georgia',
    group: null,
    serviceType: 'Private Tour',
    areaServed: 'Georgia',
    slug: {
      en: 'private-tours-georgia',
      ru: 'individualnye-tury-gruziya',
      ka: 'individualuri-turebi-saqartveloshi'
    },
    related: ['tour-kazbegi', 'tour-kakheti', 'tour-mtskheta', 'tour-borjomi'],
    l: {
      en: {
        title: 'Private Tours in Georgia — No Group, No Fixed Schedule | KALA Georgia',
        description: 'Private day tours across Georgia: Kazbegi, Kakheti, Mtskheta, Borjomi. Your own pace, photo stops, a car for up to 6 people.',
        h1: 'Private Tours in Georgia',
        crumb: 'Private Tours',
        lead: 'A tour with no group attached: the route, pace, and stops are built around your party, not a bus schedule. Works well for families with children, couples, and small groups who want to see the highlights without matching someone else’s timetable.',
        sections: [
          { h: 'Popular routes', ul: [
            'Kazbegi — the mountains, Ananuri Fortress, the Cross Pass;',
            'Kakheti — vineyards, tastings, monasteries;',
            'Mtskheta — the ancient capital, Jvari and Svetitskhoveli;',
            'Borjomi — the park and mineral springs.'
          ] },
          { h: 'What is included', p: 'Pickup at your Tbilisi hotel, a route built around your interests and pace, unlimited photo and meal stops, water and chargers on board.' },
          { h: 'Vehicle', p: 'Toyota Alphard 2018, up to 6 passengers — comfortable for a family with children or a group of friends for a full day out.' },
          { h: 'How the route comes together', p: 'Message us on WhatsApp with your destination and party (including children), we suggest a route and timing, you confirm the stops, and the day’s price is fixed.' },
          { h: 'Pricing', p: 'Confirmed on WhatsApp for the whole day for your chosen route, with no extra charge for additional stops within it.' }
        ],
        faq: [
          { q: 'Can we combine two destinations in one day?', a: 'Let us discuss — it depends on distance and pace; some combinations work well, for example Mtskheta plus part of Kakheti.' },
          { q: 'Is this suitable with children?', a: 'Yes, pace and stop length adjust to the family.' },
          { q: 'Can we change the plan mid-tour?', a: 'Yes, within reason — your driver stays reachable all day.' },
          { q: 'Does the driver guide us or just drive?', a: 'Ask about this at booking — basic site information is included; in-depth guiding is arranged separately.' }
        ]
      },
      ru: {
        title: 'Индивидуальные туры по Грузии — без группы и расписания | KALA Georgia',
        description: 'Однодневные индивидуальные туры по Грузии: Казбеги, Кахетия, Мцхета, Боржоми. Собственный темп, остановки для фото, авто до 6 человек.',
        h1: 'Индивидуальные туры по Грузии',
        crumb: 'Индивидуальные туры',
        lead: 'Тур без группы: маршрут, темп и остановки — под вашу компанию, а не под расписание автобуса. Подходит семьям с детьми, парам и небольшим компаниям, которые хотят увидеть главное, не подстраиваясь под чужой график.',
        sections: [
          { h: 'Популярные направления', ul: [
            'Казбеги — горы, крепость Ананури, Крестовый перевал;',
            'Кахетия — виноградники, дегустации, монастыри;',
            'Мцхета — древняя столица, храмы Джвари и Светицховели;',
            'Боржоми — парк и минеральные источники.'
          ] },
          { h: 'Что входит', p: 'Подача к отелю в Тбилиси, маршрут выстраивается под ваши интересы и темп, остановки для фото и еды без ограничения по времени, вода и зарядки в салоне.' },
          { h: 'Автомобиль', p: 'Toyota Alphard 2018, до 6 пассажиров — удобно для семьи с детьми или компании друзей на весь день.' },
          { h: 'Как формируется маршрут', p: 'Напишите в WhatsApp направление и состав компании (в том числе детей), мы предложим маршрут и хронометраж, вы согласуете остановки — и мы фиксируем цену на день.' },
          { h: 'Цена', p: 'Фиксируется в WhatsApp за весь день по выбранному направлению, без доплат за дополнительные остановки в рамках маршрута.' }
        ],
        faq: [
          { q: 'Можно объединить два направления в один день?', a: 'Обсудим — зависит от расстояния и вашего темпа, некоторые сочетания реальны, например Мцхета и часть Кахетии.' },
          { q: 'Едем с детьми — маршрут подходит?', a: 'Да, темп и длительность остановок подстраиваются под семью.' },
          { q: 'Можно менять план прямо в туре?', a: 'Да, в разумных пределах — водитель на связи весь день.' },
          { q: 'Гид рассказывает по дороге или только везёт?', a: 'Уточните формат при бронировании — базовая информация о местах входит, углублённое сопровождение обсуждается отдельно.' }
        ]
      },
      ka: {
        title: 'ინდივიდუალური ტურები საქართველოში — ჯგუფისა და განრიგის გარეშე | KALA Georgia',
        description: 'ერთდღიანი ინდივიდუალური ტურები საქართველოში: ყაზბეგი, კახეთი, მცხეთა, ბორჯომი. თქვენი ტემპი, გაჩერებები ფოტოსთვის, მანქანა 6 კაცამდე.',
        h1: 'ინდივიდუალური ტურები საქართველოში',
        crumb: 'ინდივიდუალური ტურები',
        lead: 'ტური ჯგუფის გარეშე: მარშრუტი, ტემპი და გაჩერებები — თქვენი კომპანიისთვის, არა ავტობუსის განრიგისთვის. შესაფერისია ბავშვებიანი ოჯახებისთვის, წყვილებისთვის და მეგობრების მცირე კომპანიისთვის.',
        sections: [
          { h: 'პოპულარული მიმართულებები', ul: [
            'ყაზბეგი — მთები, ანანურის ციხე, ჯვრის უღელტეხილი;',
            'კახეთი — ვენახები, დეგუსტაცია, მონასტრები;',
            'მცხეთა — ძველი დედაქალაქი, ჯვრისა და სვეტიცხოვლის ტაძრები;',
            'ბორჯომი — პარკი და მინერალური წყლები.'
          ] },
          { h: 'რა შედის', p: 'მიწოდება თბილისში სასტუმროზე, მარშრუტი აგებულია თქვენი ინტერესებისა და ტემპის მიხედვით, შეუზღუდავი გაჩერებები ფოტოსა და კვებისთვის, წყალი და დამტენები სალონში.' },
          { h: 'ავტომობილი', p: 'Toyota Alphard 2018, 6 მგზავრამდე.' },
          { h: 'როგორ ყალიბდება მარშრუტი', p: 'მოგვწერეთ WhatsApp-ში მიმართულება და კომპანიის შემადგენლობა (ბავშვების ჩათვლით), შემოგთავაზებთ მარშრუტსა და ხანგრძლივობას, დაადასტურებთ გაჩერებებს — და ფიქსირდება დღის ფასი.' },
          { h: 'ფასი', p: 'ფიქსირდება WhatsApp-ში მთელი დღისთვის, მარშრუტის ფარგლებში დამატებითი გაჩერებები ფასს არ ცვლის.' }
        ],
        faq: [
          { q: 'შესაძლებელია ორი მიმართულების გაერთიანება ერთ დღეში?', a: 'განვიხილავთ — დამოკიდებულია მანძილსა და ტემპზე.' },
          { q: 'შესაფერისია ბავშვებთან ერთად?', a: 'დიახ, ტემპი ოჯახზეა მორგებული.' },
          { q: 'შესაძლებელია გეგმის შეცვლა ტურის დროს?', a: 'დიახ, გონივრულ ფარგლებში.' },
          { q: 'მძღოლი გვიამბობს გზაში თუ მხოლოდ მიგვაქვს?', a: 'დააზუსტეთ დაჯავშნისას — ძირითადი ინფორმაცია ადგილების შესახებ შედის, სიღრმისეული თანხლება ცალკე ითანხმდება.' }
        ]
      }
    }
  },

  // ------------------------------------------------------------------ 9
  {
    key: 'tour-kazbegi',
    group: 'tours',
    serviceType: 'Private Day Tour',
    areaServed: 'Kazbegi, Georgia',
    slug: {
      en: 'kazbegi',
      ru: 'kazbegi',
      ka: 'yazbegi'
    },
    related: ['private-tours-georgia', 'tour-kakheti', 'tour-mtskheta', 'tbilisi-kazbegi'],
    l: {
      en: {
        title: 'Private Kazbegi Tour from Tbilisi | Full Day | KALA Georgia',
        description: 'A private day tour from Tbilisi to Kazbegi: Ananuri Fortress, the Cross Pass, Gergeti Trinity Church. Up to 6 people, your own pace.',
        h1: 'Private Kazbegi Tour from Tbilisi',
        crumb: 'Kazbegi Tour',
        lead: 'A classic day trip to the mountains: the road through Ananuri and the Cross Pass, the village of Stepantsminda, and viewpoints over Mount Kazbek — no group, no tour-bus schedule.',
        sections: [
          { h: 'Along the route', p: 'Ananuri Fortress on the Georgian Military Highway, the Cross Pass viewpoint, the village of Stepantsminda, and, if you would like, the drive up to Gergeti Trinity Church by local 4x4 (arranged on site, separate from the transfer).' },
          { h: 'What is included', p: 'Pickup at your Tbilisi hotel, stops along the way and in Kazbegi at your own pace, water and chargers on board, help at every stop.' },
          { h: 'Vehicle', p: 'Toyota Alphard 2018, up to 6 passengers — comfortable for a family or group for a full day in the mountains.' },
          { h: 'Duration', p: 'Typically a full day, roughly 8–10 hours round trip including stops — exact timing is confirmed at booking.' },
          { h: 'Pricing', p: 'Confirmed on WhatsApp for the day, including the round-trip drive and your driver’s time on the route.' }
        ],
        faq: [
          { q: 'Is the drive up to Gergeti Church included?', a: 'The 4x4 ride up is arranged on site by local drivers separately — we can help coordinate it.' },
          { q: 'Is this suitable for older relatives or young children?', a: 'The drive is comfortable but the day is long — tell us your group when booking so we can set the right pace.' },
          { q: 'Can we stay overnight in Kazbegi instead of returning?', a: 'Yes, let us know in advance and we will book it as a one-way transfer.' },
          { q: 'What if the weather turns in the mountains?', a: 'We will check in advance and adjust the plan — some viewpoints are accessible in most weather.' }
        ]
      },
      ru: {
        title: 'Тур в Казбеги из Тбилиси | Индивидуально, на весь день | KALA Georgia',
        description: 'Индивидуальный однодневный тур из Тбилиси в Казбеги: крепость Ананури, Крестовый перевал, храм Гергети. До 6 человек, темп — ваш.',
        h1: 'Тур в Казбеги из Тбилиси',
        crumb: 'Тур в Казбеги',
        lead: 'Классический однодневный маршрут в горы: дорога через Ананури и Крестовый перевал, сам посёлок Степанцминда и смотровые площадки на Казбек — без группы и без привязки к расписанию экскурсионного автобуса.',
        sections: [
          { h: 'Что по маршруту', p: 'Крепость Ананури на Военно-Грузинской дороге, панорама Крестового перевала, посёлок Степанцминда, при желании — подъём к храму Цминда Самеба (Гергети) на внедорожнике местных водителей (организуется на месте, отдельно от трансфера).' },
          { h: 'Что входит', p: 'Подача к отелю в Тбилиси, остановки по пути и в самом Казбеги по вашему темпу, вода и зарядки в салоне, помощь на всех остановках.' },
          { h: 'Автомобиль', p: 'Toyota Alphard 2018, до 6 пассажиров — комфортно для семьи или компании на весь день в горах.' },
          { h: 'Продолжительность', p: 'Обычно полный день, ориентировочно 8–10 часов туда-обратно с учётом остановок — точный тайминг обсуждается при бронировании.' },
          { h: 'Цена', p: 'Фиксируется в WhatsApp за день, включает трансфер туда-обратно и время водителя на маршруте.' }
        ],
        faq: [
          { q: 'Подъём к храму Гергети входит в тур?', a: 'Подъём на внедорожнике организуется на месте местными водителями отдельно — можем помочь с координацией.' },
          { q: 'Подходит для пожилых родственников или маленьких детей?', a: 'Дорога комфортная, но день длинный — обсудите состав группы при бронировании, подберём темп.' },
          { q: 'Можно остаться на ночь в Казбеги вместо возврата?', a: 'Да, обсудите заранее — оформим как трансфер в одну сторону.' },
          { q: 'Что если погода испортится в горах?', a: 'Свяжемся заранее и обсудим маршрут — часть смотровых точек доступна в любую погоду.' }
        ]
      },
      ka: {
        title: 'ტური ყაზბეგში თბილისიდან | სრული დღე | KALA Georgia',
        description: 'ინდივიდუალური ერთდღიანი ტური თბილისიდან ყაზბეგში: ანანურის ციხე, ჯვრის უღელტეხილი, გერგეთის სამება. 6 კაცამდე, თქვენი ტემპით.',
        h1: 'ტური ყაზბეგში თბილისიდან',
        crumb: 'ტური ყაზბეგში',
        lead: 'კლასიკური ერთდღიანი მოგზაურობა მთებში: გზა ანანურისა და ჯვრის უღელტეხილის გავლით, სოფელი სტეფანწმინდა და ყაზბეგის სანახავი წერტილები — ჯგუფისა და ავტობუსის განრიგის გარეშე.',
        sections: [
          { h: 'რა არის მარშრუტზე', p: 'ანანურის ციხე სამხედრო გზაზე, ჯვრის უღელტეხილის პანორამა, სოფელი სტეფანწმინდა, სურვილის შემთხვევაში — ასვლა წმინდა სამების ტაძართან (გერგეთი) ადგილობრივი მძღოლების ჯიპით (ეწყობა ადგილზე, ტრანსფერისგან დამოუკიდებლად).' },
          { h: 'რა შედის', p: 'მიწოდება თბილისში, გაჩერებები გზაში და ყაზბეგში თქვენი ტემპით, წყალი და დამტენები სალონში, დახმარება ყველა გაჩერებაზე.' },
          { h: 'ავტომობილი', p: 'Toyota Alphard 2018, 6 მგზავრამდე.' },
          { h: 'ხანგრძლივობა', p: 'ჩვეულებრივ სრული დღე, დაახლოებით 8–10 საათი გაჩერებების ჩათვლით — ზუსტი დრო ითანხმდება დაჯავშნისას.' },
          { h: 'ფასი', p: 'ფიქსირდება WhatsApp-ში დღისთვის, მოიცავს ორმხრივ გზას და მძღოლის დროს მარშრუტზე.' }
        ],
        faq: [
          { q: 'გერგეთის ტაძართან ასვლა შედის ტურში?', a: 'ჯიპით ასვლა ეწყობა ადგილზე ცალკე — დაგეხმარებით კოორდინაციაში.' },
          { q: 'შესაფერისია ხანდაზმულებისთვის ან პატარა ბავშვებისთვის?', a: 'დღე გრძელია — შეგვატყობინეთ ჯგუფის შემადგენლობა დაჯავშნისას.' },
          { q: 'შესაძლებელია ღამის გატარება ყაზბეგში დაბრუნების ნაცვლად?', a: 'დიახ, წინასწარი შეთანხმებით.' },
          { q: 'რა ხდება ცუდი ამინდის შემთხვევაში?', a: 'წინასწარ დაგიკავშირდებით და გეგმას შევათანხმებთ.' }
        ]
      }
    }
  },

  // ------------------------------------------------------------------ 10
  {
    key: 'corporate-transport-georgia',
    group: null,
    serviceType: 'Corporate Transportation',
    areaServed: 'Georgia',
    // The one page in this wave that keeps the strict B2B tone: the search
    // intent here is corporate, so the family/tourist framing does not fit.
    tone: 'b2b',
    slug: {
      en: 'corporate-transport-georgia',
      ru: 'korporativnyy-transport-gruziya',
      ka: 'korporatiuli-transporti-saqartveloshi'
    },
    related: ['vip-transport-georgia', 'private-driver-georgia', 'airport-transfer-tbilisi'],
    l: {
      en: {
        title: 'Corporate Transportation in Georgia | Delegations & Conferences | KALA Georgia',
        description: 'Transport support for delegations, conferences, and corporate events in Georgia: multiple vehicles, one coordinator, invoiced payment, full documentation.',
        h1: 'Corporate Transportation in Georgia',
        crumb: 'Corporate Transportation',
        lead: 'The transport side of business visits and events: meeting a delegation, conference logistics, coordinating several vehicles through a single point of contact — you deal with one coordinator, not each driver individually.',
        sections: [
          { h: 'What we handle', ul: [
            'meeting and transferring delegations and partners from Tbilisi and Kutaisi airports;',
            'transport for the full duration of a conference, exhibition, or roadshow;',
            'event logistics: pickup schedules, guest lists, a dedicated coordinator;',
            'hourly support for negotiations and business visits.'
          ] },
          { h: 'How it is organized', p: 'One coordinator for the whole project, unbranded vehicles, drivers in business attire, invoiced cashless payment, a contract, and full accounting documents.' },
          { h: 'Fleet', p: 'The Toyota Alphard 2018 as the primary vehicle for meetings and negotiations, with partner minivans and minibuses available for larger event groups when needed.' },
          { h: 'Getting started', p: 'Message us on WhatsApp with your dates, event format, and number of participants, receive a proposal with vehicle mix and pricing, and we confirm terms in a contract.' }
        ],
        faq: [
          { q: 'Do you work by contract and cashless payment?', a: 'Yes, that is our standard format with companies.' },
          { q: 'Can we book several vehicles on one schedule?', a: 'Yes, all vehicles are coordinated through a single point of contact.' },
          { q: 'Do you provide accounting documents?', a: 'Yes, a full document package.' },
          { q: 'Can we book transport for a single partner meeting?', a: 'Yes, from a one-off trip to support for a full visit.' }
        ]
      },
      ru: {
        title: 'Корпоративный транспорт в Грузии | Делегации, конференции | KALA Georgia',
        description: 'Транспортное обеспечение делегаций, конференций и мероприятий в Грузии: несколько машин, один координатор, оплата по счёту, закрывающие документы.',
        h1: 'Корпоративный транспорт в Грузии',
        crumb: 'Корпоративный транспорт',
        lead: 'Транспортная часть деловых визитов и мероприятий: встреча делегации, логистика конференции, координация нескольких машин с одним ответственным лицом со стороны исполнителя — вы работаете с одним контактом, а не с каждым водителем по отдельности.',
        sections: [
          { h: 'Что решаем', ul: [
            'встреча и трансфер делегаций и партнёров из аэропортов Тбилиси и Кутаиси;',
            'транспорт на весь период конференции, выставки или roadshow;',
            'логистика мероприятий: график подач, списки гостей, связь с координатором;',
            'почасовое сопровождение для переговоров и деловых визитов.'
          ] },
          { h: 'Как организована работа', p: 'Единый координатор на весь проект, автомобили без брендинга, водители в деловой одежде, оплата по безналичному расчёту, договор и закрывающие документы для бухгалтерии.' },
          { h: 'Автопарк', p: 'Toyota Alphard 2018 как основная машина для встреч и переговоров, при необходимости — партнёрские минивэны и микроавтобусы для группы гостей мероприятия.' },
          { h: 'Как начать работу', p: 'Напишите в WhatsApp даты, формат мероприятия и число участников, получите предложение с составом транспорта и стоимостью — условия фиксируем в договоре.' }
        ],
        faq: [
          { q: 'Работаете по договору и безналичному расчёту?', a: 'Да, это основной формат работы с компаниями.' },
          { q: 'Можно арендовать несколько машин на один график?', a: 'Да, координируем все машины через одного ответственного.' },
          { q: 'Даёте закрывающие документы?', a: 'Да, полный пакет для бухгалтерии.' },
          { q: 'Можно заказать транспорт на разовую встречу партнёра?', a: 'Да, формат — от одной поездки до сопровождения всего визита.' }
        ]
      },
      ka: {
        title: 'კორპორატიული ტრანსპორტი საქართველოში | დელეგაციები, კონფერენციები | KALA Georgia',
        description: 'დელეგაციების, კონფერენციებისა და კორპორატიული ღონისძიებების სატრანსპორტო უზრუნველყოფა საქართველოში — რამდენიმე მანქანა, ერთი კოორდინატორი, ინვოისით გადახდა.',
        h1: 'კორპორატიული ტრანსპორტი საქართველოში',
        crumb: 'კორპორატიული ტრანსპორტი',
        lead: 'საქმიანი ვიზიტებისა და ღონისძიებების სატრანსპორტო ნაწილი: დელეგაციის დახვედრა, კონფერენციის ლოგისტიკა, რამდენიმე მანქანის კოორდინაცია ერთი პასუხისმგებელი პირის მეშვეობით.',
        sections: [
          { h: 'რას ვაგვარებთ', ul: [
            'დელეგაციებისა და პარტნიორების დახვედრა და ტრანსფერი თბილისისა და ქუთაისის აეროპორტებიდან;',
            'ტრანსპორტი კონფერენციის, გამოფენის ან roadshow-ს მთელი ხანგრძლივობით;',
            'ღონისძიების ლოგისტიკა: მიწოდების გრაფიკი, სტუმართა სიები, კოორდინატორი;',
            'საათობრივი თანხლება მოლაპარაკებებისა და საქმიანი ვიზიტებისთვის.'
          ] },
          { h: 'როგორ არის ორგანიზებული', p: 'ერთი კოორდინატორი მთელი პროექტისთვის, ავტომობილები ბრენდირების გარეშე, მძღოლები საქმიან ჩაცმულობაში, უნაღდო ანგარიშსწორება, ხელშეკრულება და საბუღალტრო დოკუმენტები.' },
          { h: 'ავტოპარკი', p: 'Toyota Alphard 2018 — ძირითადი მანქანა შეხვედრებისა და მოლაპარაკებებისთვის, საჭიროებისამებრ — პარტნიორული მინივენები და მიკროავტობუსები ღონისძიების ჯგუფებისთვის.' },
          { h: 'როგორ დავიწყოთ', p: 'მოგვწერეთ WhatsApp-ში თარიღები, ღონისძიების ფორმატი და მონაწილეთა რაოდენობა, მიიღეთ შეთავაზება ტრანსპორტისა და ფასის მითითებით — პირობებს ვაფიქსირებთ ხელშეკრულებაში.' }
        ],
        faq: [
          { q: 'მუშაობთ ხელშეკრულებითა და უნაღდო ანგარიშსწორებით?', a: 'დიახ.' },
          { q: 'შესაძლებელია რამდენიმე მანქანის დაჯავშნა ერთ გრაფიკზე?', a: 'დიახ.' },
          { q: 'გასცემთ საბუღალტრო დოკუმენტებს?', a: 'დიახ, სრული პაკეტი.' },
          { q: 'შესაძლებელია ტრანსპორტის შეკვეთა ერთჯერადი შეხვედრისთვის?', a: 'დიახ.' }
        ]
      }
    }
  },

  // ============================ WAVE 2 ============================
  // The remaining pages from the URL architecture in spec §3.2, added
  // once the wave-1 foundation was live and verified (spec §28).

  // ----------------------------------------------------------------- 11
  {
    key: 'kutaisi-airport-transfer',
    group: null,
    serviceType: 'Airport Transfer',
    areaServed: 'Kutaisi, Georgia',
    slug: {
      en: 'kutaisi-airport-transfer',
      ru: 'transfer-iz-aeroporta-kutaisi',
      ka: 'qutaisis-aeroportis-transferi'
    },
    related: ['airport-transfer-tbilisi', 'tbilisi-kutaisi', 'private-transfers-georgia'],
    l: {
      en: {
        title: 'Kutaisi Airport Transfer | Private Driver | KALA Georgia',
        description: 'Private transfer from Kutaisi International Airport to Batumi, Tbilisi or Kutaisi city. Meet & greet, flight tracking, free waiting for delays, up to 6 passengers.',
        h1: 'Private Kutaisi Airport Transfer',
        crumb: 'Kutaisi Airport Transfer',
        lead: 'Kutaisi International is where most low-cost flights into Georgia land, and it sits well outside the cities passengers are actually heading for. A car waiting at arrivals saves the scramble for onward transport — which matters most on the late-night arrivals these routes are known for.',
        sections: [
          { h: 'What is included', ul: [
            'a name sign in arrivals and help with luggage;',
            'free waiting if your flight is delayed;',
            'water, phone chargers, and Wi-Fi on board;',
            'a child seat available on advance request.'
          ] },
          { h: 'Where we drive from Kutaisi', p: 'Kutaisi city and its hotels, Batumi and the coast, Tbilisi, and onward points elsewhere in Georgia by arrangement. Tell us the destination with your flight number and the price is fixed before you land.' },
          { h: 'Vehicle', p: 'Toyota Alphard 2018, up to 6 passengers with luggage — worth having on the longer runs to Batumi or Tbilisi rather than a compact car after a night flight.' },
          { h: 'How it works', p: 'Send your flight number and destination on WhatsApp, get a fixed price, and your driver meets you in the arrivals hall with a sign.' },
          { h: 'Pricing', p: 'Confirmed on WhatsApp before the trip. No night surcharge and no extra for waiting when a flight runs late.' }
        ],
        faq: [
          { q: 'Do you meet late-night flights at Kutaisi?', a: 'Yes. Most arrivals here are late, so night pickups are routine — book them in advance so a driver is assigned.' },
          { q: 'How long is the drive to Batumi or Tbilisi?', a: 'Batumi is usually around 2–2.5 hours, Tbilisi around 3–3.5 hours depending on traffic and stops. We confirm at booking.' },
          { q: 'What if my flight is delayed?', a: 'We track it by flight number and adjust the pickup. Waiting is free.' },
          { q: 'Can you take us straight to a hotel outside the city?', a: 'Yes — give us the address when booking and we drive to the door.' }
        ]
      },
      ru: {
        title: 'Трансфер из аэропорта Кутаиси | Индивидуально | KALA Georgia',
        description: 'Индивидуальный трансфер из аэропорта Кутаиси в Батуми, Тбилиси или город Кутаиси. Встреча с табличкой, отслеживание рейса, бесплатное ожидание, до 6 пассажиров.',
        h1: 'Трансфер из аэропорта Кутаиси',
        crumb: 'Трансфер из аэропорта Кутаиси',
        lead: 'В Кутаиси приземляется большинство лоукост-рейсов в Грузию, а сам аэропорт находится далеко от тех городов, куда пассажиры на самом деле едут. Машина, которая ждёт в зале прилёта, снимает главную проблему этих рейсов — искать транспорт поздно ночью.',
        sections: [
          { h: 'Что входит в поездку', ul: [
            'табличка с именем в зале прилёта, помощь с чемоданами;',
            'бесплатное ожидание при задержке рейса;',
            'вода, зарядки для телефона, Wi-Fi в салоне;',
            'детское кресло — по предварительному запросу.'
          ] },
          { h: 'Куда возим из Кутаиси', p: 'Город Кутаиси и его отели, Батуми и побережье, Тбилиси, а также другие точки Грузии по договорённости. Напишите направление вместе с номером рейса — цену зафиксируем до вашего прилёта.' },
          { h: 'Автомобиль', p: 'Toyota Alphard 2018, до 6 пассажиров с багажом — на длинных перегонах до Батуми или Тбилиси это заметно комфортнее компактной машины после ночного перелёта.' },
          { h: 'Как это работает', p: 'Отправляете номер рейса и точку назначения в WhatsApp, получаете фиксированную цену, водитель встречает в зале прилёта с табличкой.' },
          { h: 'Цена', p: 'Фиксируется в WhatsApp до поездки. Без ночной доплаты и без доплаты за ожидание, если рейс задерживается.' }
        ],
        faq: [
          { q: 'Встречаете ночные рейсы в Кутаиси?', a: 'Да. Здесь большинство прилётов ночные, так что это обычная практика — просто забронируйте заранее, чтобы за вами закрепили водителя.' },
          { q: 'Сколько ехать до Батуми или Тбилиси?', a: 'До Батуми обычно около 2–2,5 часов, до Тбилиси около 3–3,5 часов в зависимости от трафика и остановок. Уточним при бронировании.' },
          { q: 'Что если рейс задержится?', a: 'Отслеживаем по номеру рейса и сдвигаем подачу. Ожидание бесплатное.' },
          { q: 'Довезёте сразу до отеля за городом?', a: 'Да, дайте адрес при бронировании — везём до двери.' }
        ]
      },
      ka: {
        title: 'ქუთაისის აეროპორტის ტრანსფერი | KALA Georgia',
        description: 'ინდივიდუალური ტრანსფერი ქუთაისის საერთაშორისო აეროპორტიდან ბათუმში, თბილისში ან ქუთაისში. დახვედრა ტაბლოთი, რეისის მონიტორინგი, უფასო ლოდინი, 6 მგზავრამდე.',
        h1: 'ქუთაისის აეროპორტის ინდივიდუალური ტრანსფერი',
        crumb: 'ქუთაისის აეროპორტის ტრანსფერი',
        lead: 'ქუთაისის საერთაშორისო აეროპორტში ჩამოდის საქართველოში შემომავალი დაბალბიუჯეტიანი რეისების უმეტესობა, თავად აეროპორტი კი შორსაა იმ ქალაქებიდან, სადაც მგზავრები მიემართებიან. ჩამოსვლის დარბაზში მომლოდინე მანქანა ხსნის ამ რეისების მთავარ პრობლემას — ღამით ტრანსპორტის ძებნას.',
        sections: [
          { h: 'რა შედის მომსახურებაში', ul: [
            'სახელიანი ტაბლო ჩამოსვლის დარბაზში, დახმარება ბარგით;',
            'უფასო ლოდინი რეისის დაგვიანების შემთხვევაში;',
            'წყალი, დამტენები, Wi-Fi სალონში;',
            'საბავშვო სავარძელი — წინასწარი მოთხოვნით.'
          ] },
          { h: 'საით ვმგზავრობთ ქუთაისიდან', p: 'ქუთაისი და მისი სასტუმროები, ბათუმი და ზღვისპირეთი, თბილისი, ასევე საქართველოს სხვა წერტილები შეთანხმებით. მოგვწერეთ მიმართულება რეისის ნომერთან ერთად — ფასს დავაფიქსირებთ თქვენს ჩამოსვლამდე.' },
          { h: 'ავტომობილი', p: 'Toyota Alphard 2018, 6 მგზავრამდე ბარგით — ბათუმამდე ან თბილისამდე გრძელ გზაზე ღამის ფრენის შემდეგ ეს კომპაქტურ მანქანაზე შესამჩნევად კომფორტულია.' },
          { h: 'როგორ მუშაობს', p: 'გამოგზავნეთ რეისის ნომერი და დანიშნულების ადგილი WhatsApp-ში, მიიღეთ ფიქსირებული ფასი, მძღოლი დაგხვდებათ ჩამოსვლის დარბაზში ტაბლოთი.' },
          { h: 'ფასი', p: 'ფიქსირდება WhatsApp-ში მგზავრობამდე. ღამის დანამატის გარეშე და ლოდინის დამატებითი გადასახადის გარეშე.' }
        ],
        faq: [
          { q: 'ხვდებით ღამის რეისებს ქუთაისში?', a: 'დიახ. აქ ჩამოსვლების უმეტესობა ღამითაა, ასე რომ ეს ჩვეული პრაქტიკაა — უბრალოდ დაჯავშნეთ წინასწარ.' },
          { q: 'რამდენი ხანი სჭირდება ბათუმამდე ან თბილისამდე?', a: 'ბათუმამდე ჩვეულებრივ დაახლოებით 2–2.5 საათი, თბილისამდე დაახლოებით 3–3.5 საათი, ტრაფიკისა და გაჩერებების მიხედვით.' },
          { q: 'რა მოხდება, თუ რეისი დაგვიანდება?', a: 'ვაკონტროლებთ რეისის ნომრით და მიწოდებას ვარეგულირებთ. ლოდინი უფასოა.' },
          { q: 'მიგვიყვანთ პირდაპირ ქალაქგარეთ სასტუმრომდე?', a: 'დიახ, მიუთითეთ მისამართი დაჯავშნისას.' }
        ]
      }
    }
  },

  // ----------------------------------------------------------------- 12
  {
    key: 'vip-transport-georgia',
    group: null,
    serviceType: 'VIP Transportation',
    areaServed: 'Georgia',
    // Second page in this wave that keeps the strict B2B/VIP tone.
    tone: 'b2b',
    slug: {
      en: 'vip-transport-georgia',
      ru: 'vip-transport-gruziya',
      ka: 'vip-transporti-saqartveloshi'
    },
    related: ['corporate-transport-georgia', 'private-driver-georgia', 'airport-transfer-tbilisi'],
    l: {
      en: {
        title: 'VIP Transport in Georgia — Discreet and Unbranded | KALA Georgia',
        description: 'VIP transport in Georgia: unbranded vehicles, drivers in business attire, confidentiality as standard, personal escort and security available on request.',
        h1: 'VIP Transport in Georgia',
        crumb: 'VIP Transport',
        lead: 'For visits where discretion matters more than anything else: an unbranded car, one driver for the whole stay rather than a rotating pool, and nothing about the trip discussed outside it.',
        sections: [
          { h: 'What VIP means here', ul: [
            'unbranded vehicles — no livery, no advertising, nothing that identifies the trip;',
            'drivers in business attire, briefed on the schedule before the visit;',
            'confidentiality as standard rather than as an add-on;',
            'the same driver for the whole visit, so the routine is not re-explained daily.'
          ] },
          { h: 'Personal escort and security', p: 'Available on request and arranged around the specific visit rather than sold as a package. Raise the requirement while the dates are still being set — it shapes the planning, and it is not something to arrange the night before.' },
          { h: 'Vehicle', p: 'Toyota Alphard 2018 as the primary car: a business-class cabin with room to work or take a call between meetings. Partner vehicles are brought in when the party is larger than six.' },
          { h: 'How a visit is arranged', p: 'Send the dates and the format on WhatsApp, we propose a plan and assign a driver, and the terms are fixed in writing before arrival. Nothing about the schedule changes en route without your say-so.' },
          { h: 'Pricing', p: 'Agreed per day or per visit in writing before arrival. Contracts and invoicing are available for companies.' }
        ],
        faq: [
          { q: 'Are the cars marked in any way?', a: 'No. Vehicles carry no livery or advertising.' },
          { q: 'Can you provide personal security?', a: 'Personal escort and security are available on request and arranged in advance around the visit — tell us early, while dates are still flexible.' },
          { q: 'Will we have the same driver throughout?', a: 'Yes, that is the default here rather than an upgrade.' },
          { q: 'Do you work with companies on contract?', a: 'Yes — contracts, cashless invoicing and closing documents for accounting.' }
        ]
      },
      ru: {
        title: 'VIP-транспорт в Грузии — конфиденциально, без брендинга | KALA Georgia',
        description: 'VIP-транспорт в Грузии: автомобили без брендинга, водители в деловой одежде, конфиденциальность по умолчанию, личное сопровождение и охрана по запросу.',
        h1: 'VIP-транспорт в Грузии',
        crumb: 'VIP-транспорт',
        lead: 'Для визитов, где важнее всего сдержанность: автомобиль без опознавательных знаков, один водитель на весь визит вместо сменяющихся людей и ничего о поездке за её пределами.',
        sections: [
          { h: 'Что здесь означает VIP', ul: [
            'автомобили без брендинга — никакой оклейки, рекламы и ничего, что обозначает поездку;',
            'водители в деловой одежде, ознакомленные с графиком до начала визита;',
            'конфиденциальность по умолчанию, а не как отдельная опция;',
            'один и тот же водитель на весь визит — распорядок не приходится объяснять заново каждый день.'
          ] },
          { h: 'Личное сопровождение и охрана', p: 'Доступны по запросу и выстраиваются под конкретный визит, а не продаются пакетом. Поднимайте этот вопрос, пока даты ещё согласуются: он влияет на планирование, и это не та задача, которую решают накануне.' },
          { h: 'Автомобиль', p: 'Toyota Alphard 2018 как основная машина: салон бизнес-класса, в котором можно поработать или спокойно поговорить по телефону между встречами. Партнёрские автомобили подключаются, когда в группе больше шести человек.' },
          { h: 'Как организуется визит', p: 'Присылаете даты и формат в WhatsApp, мы предлагаем план и закрепляем водителя, условия фиксируем письменно до вашего приезда. В дороге в графике ничего не меняется без вашего согласия.' },
          { h: 'Цена', p: 'Согласуется письменно за день или за визит целиком до приезда. Для компаний доступны договор и безналичная оплата.' }
        ],
        faq: [
          { q: 'Автомобили как-то обозначены?', a: 'Нет. На машинах нет оклейки и рекламы.' },
          { q: 'Можете обеспечить личную охрану?', a: 'Личное сопровождение и охрана доступны по запросу и организуются заранее под конкретный визит — сообщите об этом рано, пока даты ещё подвижны.' },
          { q: 'Водитель будет один и тот же весь визит?', a: 'Да, здесь это норма, а не платное улучшение.' },
          { q: 'Работаете с компаниями по договору?', a: 'Да — договор, безналичный расчёт и закрывающие документы для бухгалтерии.' }
        ]
      },
      ka: {
        title: 'VIP ტრანსპორტი საქართველოში — დისკრეტულად, ბრენდირების გარეშე | KALA Georgia',
        description: 'VIP ტრანსპორტი საქართველოში: ავტომობილები ბრენდირების გარეშე, მძღოლები საქმიან ჩაცმულობაში, კონფიდენციალურობა სტანდარტულად, პირადი თანხლება და დაცვა მოთხოვნით.',
        h1: 'VIP ტრანსპორტი საქართველოში',
        crumb: 'VIP ტრანსპორტი',
        lead: 'ვიზიტებისთვის, სადაც ყველაფერზე მეტად დისკრეტულობაა მნიშვნელოვანი: ავტომობილი ამოსაცნობი ნიშნების გარეშე, ერთი მძღოლი მთელი ვიზიტისთვის და არაფერი მგზავრობის შესახებ მის ფარგლებს გარეთ.',
        sections: [
          { h: 'რას ნიშნავს აქ VIP', ul: [
            'ავტომობილები ბრენდირების გარეშე — არანაირი გაწებება ან რეკლამა;',
            'მძღოლები საქმიან ჩაცმულობაში, გრაფიკს გაცნობილი ვიზიტის დაწყებამდე;',
            'კონფიდენციალურობა სტანდარტულად, არა ცალკე ოფციად;',
            'ერთი და იგივე მძღოლი მთელი ვიზიტისთვის — რუტინის ყოველდღიური ახსნა საჭირო აღარაა.'
          ] },
          { h: 'პირადი თანხლება და დაცვა', p: 'ხელმისაწვდომია მოთხოვნით და ეწყობა კონკრეტული ვიზიტისთვის, არა პაკეტად. წამოაყენეთ ეს საკითხი, სანამ თარიღები ჯერ კიდევ თანხმდება — ის გავლენას ახდენს დაგეგმვაზე.' },
          { h: 'ავტომობილი', p: 'Toyota Alphard 2018 ძირითად მანქანად: ბიზნეს-კლასის სალონი, სადაც შეხვედრებს შორის შესაძლებელია მუშაობა ან სატელეფონო საუბარი. პარტნიორული ავტომობილები ერთვება, როცა ჯგუფი ექვს კაცზე მეტია.' },
          { h: 'როგორ ეწყობა ვიზიტი', p: 'გამოგზავნეთ თარიღები და ფორმატი WhatsApp-ში, ჩვენ შემოგთავაზებთ გეგმას და დაგინიშნავთ მძღოლს, პირობებს წერილობით ვაფიქსირებთ ჩამოსვლამდე.' },
          { h: 'ფასი', p: 'თანხმდება წერილობით დღეში ან მთელ ვიზიტზე ჩამოსვლამდე. კომპანიებისთვის ხელმისაწვდომია ხელშეკრულება და უნაღდო ანგარიშსწორება.' }
        ],
        faq: [
          { q: 'ავტომობილები რაიმენაირად არის აღნიშნული?', a: 'არა. მანქანებზე არ არის გაწებება ან რეკლამა.' },
          { q: 'შეგიძლიათ პირადი დაცვის უზრუნველყოფა?', a: 'პირადი თანხლება და დაცვა ხელმისაწვდომია მოთხოვნით და ეწყობა წინასწარ — შეგვატყობინეთ ადრე.' },
          { q: 'მძღოლი ერთი და იგივე იქნება მთელი ვიზიტის განმავლობაში?', a: 'დიახ, აქ ეს ნორმაა და არა ფასიანი გაუმჯობესება.' },
          { q: 'მუშაობთ კომპანიებთან ხელშეკრულებით?', a: 'დიახ — ხელშეკრულება, უნაღდო ანგარიშსწორება და საბუღალტრო დოკუმენტები.' }
        ]
      }
    }
  },

  // ----------------------------------------------------------------- 13
  {
    key: 'tbilisi-kutaisi',
    group: 'transfers',
    serviceType: 'Intercity Private Transfer',
    areaServed: 'Tbilisi and Kutaisi, Georgia',
    slug: {
      en: 'tbilisi-kutaisi',
      ru: 'tbilisi-kutaisi',
      ka: 'tbilisi-qutaisi'
    },
    related: ['private-transfers-georgia', 'kutaisi-airport-transfer', 'tbilisi-batumi'],
    l: {
      en: {
        title: 'Tbilisi to Kutaisi Transfer | Private Driver | KALA Georgia',
        description: 'Private transfer from Tbilisi to Kutaisi on the main highway: stops as you like, fixed price, up to 6 passengers with luggage.',
        h1: 'Private Transfer from Tbilisi to Kutaisi',
        crumb: 'Tbilisi to Kutaisi',
        lead: 'Kutaisi works both as a stop on the way west and as a base in its own right — the airport, the Gelati and Bagrati monuments, and the canyons and caves of Imereti are all close to the city.',
        sections: [
          { h: 'About the route', p: 'Roughly 230 km on the main highway, typically a 3–3.5 hour drive without stops. It is the easiest of the long routes: motorway most of the way, no mountain passes.' },
          { h: 'What is included', p: 'Pickup at your Tbilisi hotel or address, stops along the way at your request, water and chargers on board, help with luggage at both ends.' },
          { h: 'Vehicle', p: 'Toyota Alphard 2018, up to 6 passengers with luggage — a spacious second row and climate control for the three hours on the road.' },
          { h: 'Trip formats', p: 'One-way when you are moving west, a round trip, a drop at Kutaisi airport instead of the city, or continuing to Batumi the same day — Kutaisi sits roughly half-way.' },
          { h: 'Pricing', p: 'Confirmed on WhatsApp for your date and format before the trip.' }
        ],
        faq: [
          { q: 'Can we stop at Gelati or one of the canyons on the way?', a: 'Yes, by arrangement — tell us in advance so the day is planned around it rather than squeezed in.' },
          { q: 'Can you continue to Batumi the same day?', a: 'Yes. Kutaisi is roughly half-way to the coast, so this is a common combination.' },
          { q: 'How long does the drive take?', a: 'Usually 3–3.5 hours without stops, depending on traffic.' },
          { q: 'Can you drop us at Kutaisi airport instead of the city?', a: 'Yes — say so when booking and we plan the timing around your flight.' }
        ]
      },
      ru: {
        title: 'Трансфер Тбилиси — Кутаиси | Индивидуально | KALA Georgia',
        description: 'Индивидуальный трансфер из Тбилиси в Кутаиси по основной трассе: остановки по желанию, фиксированная цена, до 6 пассажиров с багажом.',
        h1: 'Трансфер из Тбилиси в Кутаиси',
        crumb: 'Тбилиси — Кутаиси',
        lead: 'Кутаиси работает и как остановка по дороге на запад, и как самостоятельная база: аэропорт, Гелати и Баграти, а также каньоны и пещеры Имеретии находятся рядом с городом.',
        sections: [
          { h: 'О маршруте', p: 'Расстояние — около 230 км по основной трассе, время в пути обычно 3–3,5 часа без остановок. Самый простой из длинных маршрутов: почти всю дорогу автомагистраль, без горных перевалов.' },
          { h: 'Что входит', p: 'Подача к отелю или адресу в Тбилиси, остановки в пути по желанию, вода и зарядки в салоне, помощь с багажом на посадке и высадке.' },
          { h: 'Автомобиль', p: 'Toyota Alphard 2018, до 6 пассажиров с багажом — просторный второй ряд и климат-контроль на три часа дороги.' },
          { h: 'Варианты поездки', p: 'В одну сторону при переезде на запад, туда-обратно, высадка в аэропорту Кутаиси вместо города или продолжение до Батуми тем же днём — Кутаиси находится примерно на полпути.' },
          { h: 'Цена', p: 'Фиксируется в WhatsApp по вашей дате и формату до поездки.' }
        ],
        faq: [
          { q: 'Можно заехать в Гелати или в один из каньонов по пути?', a: 'Да, по договорённости — предупредите заранее, чтобы день был спланирован под это, а не втиснут в остаток времени.' },
          { q: 'Можно продолжить до Батуми тем же днём?', a: 'Да. Кутаиси примерно на полпути к побережью, это частое сочетание.' },
          { q: 'Сколько занимает дорога?', a: 'Обычно 3–3,5 часа без остановок, в зависимости от трафика.' },
          { q: 'Можно высадиться в аэропорту Кутаиси вместо города?', a: 'Да — скажите при бронировании, подстроим время под ваш рейс.' }
        ]
      },
      ka: {
        title: 'ტრანსფერი თბილისი — ქუთაისი | ინდივიდუალურად | KALA Georgia',
        description: 'ინდივიდუალური ტრანსფერი თბილისიდან ქუთაისში მთავარი ტრასით: გაჩერებები სურვილისამებრ, ფიქსირებული ფასი, 6 მგზავრამდე ბარგით.',
        h1: 'ტრანსფერი თბილისიდან ქუთაისში',
        crumb: 'თბილისი — ქუთაისი',
        lead: 'ქუთაისი მუშაობს როგორც გაჩერება დასავლეთისკენ მიმავალ გზაზე, ისე დამოუკიდებელ ბაზად: აეროპორტი, გელათი და ბაგრატი, ასევე იმერეთის კანიონები და გამოქვაბულები ქალაქთან ახლოსაა.',
        sections: [
          { h: 'მარშრუტის შესახებ', p: 'მანძილი — დაახლოებით 230 კმ მთავარი ტრასით, გზაში დრო ჩვეულებრივ 3–3.5 საათია გაჩერების გარეშე. ყველაზე მარტივია გრძელ მარშრუტებს შორის: თითქმის მთელი გზა ავტომაგისტრალია, მთის უღელტეხილების გარეშე.' },
          { h: 'რა შედის', p: 'მიწოდება თქვენს სასტუმროზე ან მისამართზე თბილისში, გაჩერებები გზაში სურვილისამებრ, წყალი და დამტენები სალონში, დახმარება ბარგით.' },
          { h: 'ავტომობილი', p: 'Toyota Alphard 2018, 6 მგზავრამდე ბარგით — ვრცელი მეორე რიგი და კლიმატ-კონტროლი სამსაათიან გზაზე.' },
          { h: 'მგზავრობის ფორმატები', p: 'ცალმხრივად დასავლეთში გადასვლისას, იმავე დღეს დაბრუნებით, ჩამოსხმა ქუთაისის აეროპორტში ქალაქის ნაცვლად, ან ბათუმამდე გაგრძელება იმავე დღეს — ქუთაისი დაახლოებით ნახევარ გზაზეა.' },
          { h: 'ფასი', p: 'ფიქსირდება WhatsApp-ში თქვენი თარიღისა და ფორმატის მიხედვით.' }
        ],
        faq: [
          { q: 'შესაძლებელია გელათში ან რომელიმე კანიონში შესვლა გზად?', a: 'დიახ, შეთანხმებით — გვაცნობეთ წინასწარ, რომ დღე ამის გარშემო დაიგეგმოს.' },
          { q: 'შესაძლებელია ბათუმამდე გაგრძელება იმავე დღეს?', a: 'დიახ. ქუთაისი დაახლოებით ნახევარ გზაზეა ზღვისპირეთამდე.' },
          { q: 'რამდენ ხანს გრძელდება გზა?', a: 'ჩვეულებრივ 3–3.5 საათი გაჩერების გარეშე, ტრაფიკის მიხედვით.' },
          { q: 'შესაძლებელია ქუთაისის აეროპორტში ჩამოსხმა ქალაქის ნაცვლად?', a: 'დიახ — შეგვატყობინეთ დაჯავშნისას და დროს თქვენს რეისზე მოვარგებთ.' }
        ]
      }
    }
  },

  // ----------------------------------------------------------------- 14
  {
    key: 'tour-kakheti',
    group: 'tours',
    serviceType: 'Private Day Tour',
    areaServed: 'Kakheti, Georgia',
    slug: {
      en: 'kakheti',
      ru: 'kakhetiya',
      ka: 'kakheti'
    },
    related: ['private-tours-georgia', 'tour-mtskheta', 'private-driver-georgia'],
    l: {
      en: {
        title: 'Private Kakheti Tour from Tbilisi | Wine Region Day Trip | KALA Georgia',
        description: 'A private day tour from Tbilisi to Kakheti: Sighnaghi, Bodbe Monastery, Telavi and the wineries. Your own pace, up to 6 people, fixed price for the day.',
        h1: 'Private Kakheti Tour from Tbilisi',
        crumb: 'Kakheti Tour',
        lead: 'Georgia’s wine region at whatever pace suits the day. Kakheti rewards a long lunch and an unhurried tasting far more than a tight schedule — which is exactly what a group tour cannot give you.',
        sections: [
          { h: 'Along the route', p: 'Sighnaghi, the walled hill town above the Alazani valley, and Bodbe Monastery just below it; Telavi as the regional centre; and the wineries around Tsinandali and Kvareli. How many of these fit into one day depends entirely on how long you stop at each.' },
          { h: 'What is included', p: 'Pickup at your Tbilisi hotel, the driving between wineries and monasteries, waiting while you visit, stops for lunch and photos, water and chargers on board.' },
          { h: 'About the tastings', p: 'Tastings are booked at the wineries themselves — tell us in advance which ones you have in mind and we plan the driving around them. Because the car is private, nobody in your group has to choose between tasting and driving.' },
          { h: 'Vehicle', p: 'Toyota Alphard 2018, up to 6 passengers — comfortable for a group spending a full day moving between estates.' },
          { h: 'Duration', p: 'Typically a full day, roughly 8–10 hours door to door including stops. A shorter Sighnaghi-only day is also fine.' },
          { h: 'Pricing', p: 'Fixed for the day on WhatsApp by the route you choose. Winery entrance and tasting fees are paid at the wineries.' }
        ],
        faq: [
          { q: 'Do you book the wine tastings for us?', a: 'We plan the route around the wineries you want to visit; the tasting itself is booked at the winery. Tell us in advance for the better-known estates.' },
          { q: 'Is it a problem if everyone in our group is drinking?', a: 'No — that is rather the point of having a private driver for the day.' },
          { q: 'How many wineries fit into one day?', a: 'Two or three comfortably, alongside a monastery and a proper lunch. More is possible but starts to feel rushed.' },
          { q: 'Can we just go to Sighnaghi and come back early?', a: 'Yes. A shorter Kakheti day is a normal request — say so at booking and we price it accordingly.' }
        ]
      },
      ru: {
        title: 'Тур в Кахетию из Тбилиси | Винный регион на день | KALA Georgia',
        description: 'Индивидуальный однодневный тур из Тбилиси в Кахетию: Сигнахи, монастырь Бодбе, Телави и винодельни. Свой темп, до 6 человек, фиксированная цена за день.',
        h1: 'Тур в Кахетию из Тбилиси',
        crumb: 'Тур в Кахетию',
        lead: 'Винный регион Грузии в том темпе, который подходит именно вашему дню. Кахетия куда лучше отвечает на долгий обед и неспешную дегустацию, чем на плотный график, — а именно этого групповой тур дать не может.',
        sections: [
          { h: 'Что по маршруту', p: 'Сигнахи — городок за крепостной стеной на holme над Алазанской долиной — и монастырь Бодбе чуть ниже; Телави как центр региона; винодельни в окрестностях Цинандали и Кварели. Сколько из этого поместится в один день, зависит только от того, насколько долго вы задерживаетесь в каждой точке.' },
          { h: 'Что входит', p: 'Подача к отелю в Тбилиси, переезды между винодельнями и монастырями, ожидание, пока вы внутри, остановки на обед и фото, вода и зарядки в салоне.' },
          { h: 'О дегустациях', p: 'Дегустации бронируются на самих винодельнях — скажите заранее, какие вам интересны, и мы выстроим маршрут вокруг них. Машина индивидуальная, поэтому никому в группе не придётся выбирать между дегустацией и рулём.' },
          { h: 'Автомобиль', p: 'Toyota Alphard 2018, до 6 пассажиров — комфортно для компании, которая весь день перемещается между хозяйствами.' },
          { h: 'Продолжительность', p: 'Обычно полный день, ориентировочно 8–10 часов с учётом остановок. Короткий вариант только до Сигнахи тоже возможен.' },
          { h: 'Цена', p: 'Фиксируется в WhatsApp за день по выбранному маршруту. Входные билеты и дегустации оплачиваются на винодельнях.' }
        ],
        faq: [
          { q: 'Вы бронируете дегустации за нас?', a: 'Мы выстраиваем маршрут вокруг тех виноделен, которые вам нужны; сама дегустация бронируется на винодельне. По известным хозяйствам предупредите заранее.' },
          { q: 'Ничего, если пьёт вся группа?', a: 'Ничего — ради этого индивидуальный водитель на день и берётся.' },
          { q: 'Сколько виноделен реально успеть за день?', a: 'Две-три спокойно, вместе с монастырём и нормальным обедом. Больше возможно, но начинает ощущаться спешка.' },
          { q: 'Можно съездить только в Сигнахи и вернуться пораньше?', a: 'Да. Короткий кахетинский день — обычный запрос, скажите при бронировании, и цену посчитаем под него.' }
        ]
      },
      ka: {
        title: 'ტური კახეთში თბილისიდან | ღვინის რეგიონი ერთ დღეში | KALA Georgia',
        description: 'ინდივიდუალური ერთდღიანი ტური თბილისიდან კახეთში: სიღნაღი, ბოდბის მონასტერი, თელავი და მარნები. თქვენი ტემპით, 6 კაცამდე, ფიქსირებული დღიური ფასი.',
        h1: 'ტური კახეთში თბილისიდან',
        crumb: 'ტური კახეთში',
        lead: 'საქართველოს ღვინის რეგიონი იმ ტემპით, რომელიც თქვენს დღეს შეეფერება. კახეთი ბევრად უკეთ პასუხობს ხანგრძლივ სადილსა და აუჩქარებელ დეგუსტაციას, ვიდრე მჭიდრო განრიგს — და სწორედ ამის მოცემა არ შეუძლია ჯგუფურ ტურს.',
        sections: [
          { h: 'რა არის მარშრუტზე', p: 'სიღნაღი — გალავნიანი ქალაქი ალაზნის ველის თავზე — და ბოდბის მონასტერი ოდნავ ქვემოთ; თელავი რეგიონის ცენტრად; მარნები წინანდლისა და ყვარლის შემოგარენში. რამდენი მოთავსდება ერთ დღეში, მთლიანად იმაზეა დამოკიდებული, რამდენ ხანს ჩერდებით თითოეულში.' },
          { h: 'რა შედის', p: 'მიწოდება თბილისში სასტუმროზე, გადაადგილება მარნებსა და მონასტრებს შორის, ლოდინი სანამ შიგნით ხართ, გაჩერებები სადილისა და ფოტოსთვის, წყალი და დამტენები.' },
          { h: 'დეგუსტაციების შესახებ', p: 'დეგუსტაციები ჯავშნდება თავად მარნებში — გვითხარით წინასწარ, რომლები გაინტერესებთ, და მარშრუტს მათ გარშემო ავაგებთ. მანქანა ინდივიდუალურია, ამიტომ ჯგუფში არავის მოუწევს არჩევანი დეგუსტაციასა და საჭეს შორის.' },
          { h: 'ავტომობილი', p: 'Toyota Alphard 2018, 6 მგზავრამდე — კომფორტულია კომპანიისთვის, რომელიც მთელი დღე მარნებს შორის გადაადგილდება.' },
          { h: 'ხანგრძლივობა', p: 'ჩვეულებრივ სრული დღე, დაახლოებით 8–10 საათი გაჩერებების ჩათვლით. მოკლე ვარიანტი მხოლოდ სიღნაღამდე ასევე შესაძლებელია.' },
          { h: 'ფასი', p: 'ფიქსირდება WhatsApp-ში დღისთვის არჩეული მარშრუტის მიხედვით. შესვლისა და დეგუსტაციის საფასური მარნებში იხდება.' }
        ],
        faq: [
          { q: 'დეგუსტაციებს თქვენ ჯავშნით?', a: 'ჩვენ ვაგებთ მარშრუტს იმ მარნების გარშემო, რომლებიც გჭირდებათ; დეგუსტაცია თავად მარანში ჯავშნდება. ცნობილი მარნებისთვის გვაცნობეთ წინასწარ.' },
          { q: 'პრობლემაა, თუ მთელი ჯგუფი სვამს?', a: 'არა — სწორედ ამიტომ ქირავდება პირადი მძღოლი დღით.' },
          { q: 'რამდენი მარანი ეტევა ერთ დღეში?', a: 'ორი ან სამი მშვიდად, მონასტერთან და სრულფასოვან სადილთან ერთად.' },
          { q: 'შეიძლება მხოლოდ სიღნაღში წასვლა და ადრე დაბრუნება?', a: 'დიახ. მოკლე კახური დღე ჩვეული მოთხოვნაა — შეგვატყობინეთ დაჯავშნისას.' }
        ]
      }
    }
  },

  // ----------------------------------------------------------------- 15
  {
    key: 'tour-mtskheta',
    group: 'tours',
    serviceType: 'Private Day Tour',
    areaServed: 'Mtskheta, Georgia',
    slug: {
      en: 'mtskheta',
      ru: 'mtskheta',
      ka: 'mtskheta'
    },
    related: ['private-tours-georgia', 'tour-kakheti', 'tour-kazbegi'],
    l: {
      en: {
        title: 'Private Mtskheta Tour from Tbilisi | Half Day | KALA Georgia',
        description: 'A private half-day tour from Tbilisi to Mtskheta: Jvari Monastery and Svetitskhoveli Cathedral, both UNESCO sites. Up to 6 people, at your own pace.',
        h1: 'Private Mtskheta Tour from Tbilisi',
        crumb: 'Mtskheta Tour',
        lead: 'The shortest of our tours and the easiest to fit into a full trip — Georgia’s ancient capital sits about half an hour from central Tbilisi, and half a day covers it without rushing.',
        sections: [
          { h: 'Along the route', p: 'Jvari Monastery on the ridge above the confluence of the Mtkvari and Aragvi rivers, and Svetitskhoveli Cathedral in the old town below — both UNESCO World Heritage sites. Shio-Mgvime monastery in the gorge nearby can be added if you have the time.' },
          { h: 'What is included', p: 'Pickup at your Tbilisi hotel, driving between the sites, waiting while you walk around, water and chargers on board.' },
          { h: 'Vehicle', p: 'Toyota Alphard 2018, up to 6 passengers — a short drive, so this one works well with young children or older relatives.' },
          { h: 'Duration', p: 'Typically 4–5 hours door to door. Because the driving day is short, it is often paired with something else — Mtskheta sits on the road north, so Ananuri or Gudauri can follow the same afternoon.' },
          { h: 'Pricing', p: 'Fixed on WhatsApp. Half-day and full-day formats are both available — the full day is the one that adds a second destination.' }
        ],
        faq: [
          { q: 'Is half a day really enough?', a: 'For Jvari and Svetitskhoveli at a comfortable pace, yes. Adding Shio-Mgvime pushes it closer to a full day.' },
          { q: 'Can we combine Mtskheta with somewhere else the same day?', a: 'Yes, and it is a common request. Mtskheta is on the road north, so Ananuri or Gudauri follow naturally.' },
          { q: 'Is there a dress code at the churches?', a: 'Both are working churches — shoulders and knees covered, and women are usually asked to cover their heads. Scarves are normally available at the entrance.' },
          { q: 'Does it work with young children?', a: 'Yes. The drive is short and both main sites are walkable.' }
        ]
      },
      ru: {
        title: 'Тур в Мцхету из Тбилиси | Полдня | KALA Georgia',
        description: 'Индивидуальный тур на полдня из Тбилиси в Мцхету: монастырь Джвари и собор Светицховели, оба в списке ЮНЕСКО. До 6 человек, в своём темпе.',
        h1: 'Тур в Мцхету из Тбилиси',
        crumb: 'Тур в Мцхету',
        lead: 'Самый короткий из наших туров и проще всего встраивается в насыщенную поездку: древняя столица Грузии находится примерно в получасе от центра Тбилиси, и полдня хватает, чтобы осмотреть её без спешки.',
        sections: [
          { h: 'Что по маршруту', p: 'Монастырь Джвари на гребне над слиянием Мтквари и Арагви и собор Светицховели в старом городе внизу — оба объекта Всемирного наследия ЮНЕСКО. При наличии времени можно добавить монастырь Шио-Мгвиме в ущелье неподалёку.' },
          { h: 'Что входит', p: 'Подача к отелю в Тбилиси, переезды между объектами, ожидание, пока вы гуляете, вода и зарядки в салоне.' },
          { h: 'Автомобиль', p: 'Toyota Alphard 2018, до 6 пассажиров — дорога короткая, поэтому этот маршрут хорошо подходит и с маленькими детьми, и с пожилыми родственниками.' },
          { h: 'Продолжительность', p: 'Обычно 4–5 часов от двери до двери. Поскольку дорога короткая, маршрут часто совмещают: Мцхета стоит на дороге на север, так что Ананури или Гудаури логично добавляются во второй половине дня.' },
          { h: 'Цена', p: 'Фиксируется в WhatsApp. Доступны форматы на полдня и на полный день — полный день это тот, в который добавляется второе направление.' }
        ],
        faq: [
          { q: 'Полдня действительно хватает?', a: 'На Джвари и Светицховели в спокойном темпе — да. С Шио-Мгвиме это уже ближе к полному дню.' },
          { q: 'Можно совместить Мцхету с чем-то ещё в тот же день?', a: 'Да, и это частый запрос. Мцхета стоит на дороге на север, поэтому Ананури или Гудаури добавляются естественно.' },
          { q: 'Есть ли дресс-код в храмах?', a: 'Оба храма действующие: плечи и колени закрыты, женщин обычно просят покрыть голову. Платки, как правило, есть на входе.' },
          { q: 'Подходит с маленькими детьми?', a: 'Да. Дорога короткая, оба основных объекта проходятся пешком.' }
        ]
      },
      ka: {
        title: 'ტური მცხეთაში თბილისიდან | ნახევარი დღე | KALA Georgia',
        description: 'ინდივიდუალური ნახევარდღიანი ტური თბილისიდან მცხეთაში: ჯვრის მონასტერი და სვეტიცხოვლის ტაძარი, ორივე UNESCO-ს ძეგლი. 6 კაცამდე, თქვენი ტემპით.',
        h1: 'ტური მცხეთაში თბილისიდან',
        crumb: 'ტური მცხეთაში',
        lead: 'ყველაზე მოკლე ტური ჩვენს შორის და ყველაზე ადვილად ჩასასმელი დატვირთულ მოგზაურობაში — საქართველოს ძველი დედაქალაქი თბილისის ცენტრიდან დაახლოებით ნახევარ საათშია, და ნახევარი დღე საკმარისია მის დასათვალიერებლად აჩქარების გარეშე.',
        sections: [
          { h: 'რა არის მარშრუტზე', p: 'ჯვრის მონასტერი მთქვრისა და არაგვის შესართავის თავზე და სვეტიცხოვლის ტაძარი ძველ ქალაქში ქვემოთ — ორივე UNESCO-ს მსოფლიო მემკვიდრეობის ძეგლი. დროის არსებობის შემთხვევაში შესაძლებელია შიომღვიმის მონასტრის დამატება.' },
          { h: 'რა შედის', p: 'მიწოდება თბილისში სასტუმროზე, გადაადგილება ობიექტებს შორის, ლოდინი სანამ სეირნობთ, წყალი და დამტენები სალონში.' },
          { h: 'ავტომობილი', p: 'Toyota Alphard 2018, 6 მგზავრამდე — გზა მოკლეა, ამიტომ ეს მარშრუტი კარგად ერგება როგორც პატარა ბავშვებს, ისე ხანდაზმულებს.' },
          { h: 'ხანგრძლივობა', p: 'ჩვეულებრივ 4–5 საათი კარიდან კარამდე. რადგან სამგზავრო დღე მოკლეა, მარშრუტს ხშირად აერთიანებენ: მცხეთა ჩრდილოეთის გზაზეა, ასე რომ ანანური ან გუდაური ბუნებრივად ემატება.' },
          { h: 'ფასი', p: 'ფიქსირდება WhatsApp-ში. ხელმისაწვდომია ნახევარდღიანი და სრულდღიანი ფორმატები.' }
        ],
        faq: [
          { q: 'ნახევარი დღე ნამდვილად საკმარისია?', a: 'ჯვრისა და სვეტიცხოვლისთვის მშვიდი ტემპით — დიახ. შიომღვიმის დამატებით ეს უკვე სრულ დღესთან ახლოსაა.' },
          { q: 'შესაძლებელია მცხეთის სხვა რამესთან გაერთიანება იმავე დღეს?', a: 'დიახ, და ეს ხშირი მოთხოვნაა. მცხეთა ჩრდილოეთის გზაზეა.' },
          { q: 'არის თუ არა ჩაცმის წესი ტაძრებში?', a: 'ორივე მოქმედი ტაძარია — მხრები და მუხლები დაფარული, ქალებს ჩვეულებრივ თავსაბურავს სთხოვენ. თავსაფრები, როგორც წესი, შესასვლელთანაა.' },
          { q: 'გამოდგება პატარა ბავშვებთან ერთად?', a: 'დიახ. გზა მოკლეა და ორივე ძირითადი ობიექტი ფეხით ივლის.' }
        ]
      }
    }
  },

  // ----------------------------------------------------------------- 16
  {
    key: 'tour-borjomi',
    group: 'tours',
    serviceType: 'Private Day Tour',
    areaServed: 'Borjomi, Georgia',
    slug: {
      en: 'borjomi',
      ru: 'borjomi',
      ka: 'borjomi'
    },
    related: ['private-tours-georgia', 'tbilisi-borjomi', 'tour-kakheti'],
    l: {
      en: {
        title: 'Private Borjomi Tour from Tbilisi | Park, Springs and Vardzia | KALA Georgia',
        description: 'A private day tour from Tbilisi to Borjomi: the mineral park and springs, with Rabati Castle or Vardzia added for a fuller day. Up to 6 people.',
        h1: 'Private Borjomi Tour from Tbilisi',
        crumb: 'Borjomi Tour',
        lead: 'An easy day out of Tbilisi that can stay gentle or turn into a long one. The park and the springs alone make a relaxed trip; Rabati Castle and the Vardzia cave city are close enough to add if you want the drive to earn more.',
        sections: [
          { h: 'Along the route', p: 'Borjomi Central Park with the mineral water springs and the cable car above the valley, and the forest edge of Borjomi-Kharagauli National Park. Rabati Castle in Akhaltsikhe and the Vardzia cave monastery lie further west and turn this into an extended day.' },
          { h: 'What is included', p: 'Pickup at your Tbilisi hotel, waiting while you walk the park, stops for lunch and photos, water and chargers on board.' },
          { h: 'Vehicle', p: 'Toyota Alphard 2018, up to 6 passengers — comfortable for a family day out, with room for a stroller and everything a day in a park needs.' },
          { h: 'Duration', p: 'The park on its own is a comfortable day, roughly 7–8 hours door to door. Adding Akhaltsikhe or Vardzia makes it a long one, closer to 11–12 hours with considerably more driving.' },
          { h: 'Pricing', p: 'Fixed for the day on WhatsApp, by which version of the route you choose. Park entrance and the cable car are paid on site.' }
        ],
        faq: [
          { q: 'Can we do Borjomi and Vardzia in one day?', a: 'Yes, but it is a long day with a lot of driving. Worth deciding before you set off rather than halfway there.' },
          { q: 'Do you wait while we are in the park?', a: 'Yes, the waiting is part of the day, not an extra.' },
          { q: 'Is the park good with small children?', a: 'Yes — it is a walkable valley park, and there is room in the car for a stroller.' },
          { q: 'How is this different from your Tbilisi to Borjomi transfer?', a: 'The transfer takes you there and drops you off. The tour is a planned day: the driver waits, moves you between stops and brings you back.' }
        ]
      },
      ru: {
        title: 'Тур в Боржоми из Тбилиси | Парк, источники и Вардзиа | KALA Georgia',
        description: 'Индивидуальный однодневный тур из Тбилиси в Боржоми: парк и минеральные источники, с добавлением крепости Рабат или Вардзиа. До 6 человек.',
        h1: 'Тур в Боржоми из Тбилиси',
        crumb: 'Тур в Боржоми',
        lead: 'Необременительный выезд из Тбилиси, который может остаться спокойным, а может превратиться в长 длинный день. Парка и источников достаточно для расслабленной поездки; крепость Рабат и пещерный город Вардзиа находятся достаточно близко, чтобы добавить их, если хочется, чтобы дорога окупилась сильнее.',
        sections: [
          { h: 'Что по маршруту', p: 'Центральный парк Боржоми с минеральными источниками и канатной дорогой над долиной, а также кромка лесов национального парка Боржоми-Харагаули. Крепость Рабат в Ахалцихе и пещерный монастырь Вардзиа лежат западнее и превращают поездку в расширенный день.' },
          { h: 'Что входит', p: 'Подача к отелю в Тбилиси, ожидание, пока вы гуляете по парку, остановки на обед и фото, вода и зарядки в салоне.' },
          { h: 'Автомобиль', p: 'Toyota Alphard 2018, до 6 пассажиров — комфортно для семейного выезда, с местом под коляску и всё, что нужно на день в парке.' },
          { h: 'Продолжительность', p: 'Только парк — это спокойный день, ориентировочно 7–8 часов от двери до двери. С Ахалцихе или Вардзиа день становится длинным, ближе к 11–12 часам и с заметно большим временем за рулём.' },
          { h: 'Цена', p: 'Фиксируется в WhatsApp за день, в зависимости от выбранной версии маршрута. Вход в парк и канатная дорога оплачиваются на месте.' }
        ],
        faq: [
          { q: 'Можно успеть Боржоми и Вардзиа за один день?', a: 'Да, но это длинный день с большим количеством дороги. Решать об этом лучше до выезда, а не на полпути.' },
          { q: 'Вы ждёте, пока мы в парке?', a: 'Да, ожидание — часть дня, а не доплата.' },
          { q: 'Парк подходит с маленькими детьми?', a: 'Да — это проходимый пешком парк в долине, и в машине есть место для коляски.' },
          { q: 'Чем это отличается от вашего трансфера Тбилиси — Боржоми?', a: 'Трансфер довозит и высаживает. Тур — это спланированный день: водитель ждёт, перевозит между точками и возвращает обратно.' }
        ]
      },
      ka: {
        title: 'ტური ბორჯომში თბილისიდან | პარკი, წყლები და ვარძია | KALA Georgia',
        description: 'ინდივიდუალური ერთდღიანი ტური თბილისიდან ბორჯომში: პარკი და მინერალური წყლები, რაბათის ციხის ან ვარძიის დამატებით. 6 კაცამდე.',
        h1: 'ტური ბორჯომში თბილისიდან',
        crumb: 'ტური ბორჯომში',
        lead: 'მარტივი გასვლა თბილისიდან, რომელიც შეიძლება მშვიდი დარჩეს ან გრძელ დღედ იქცეს. პარკი და წყლები თავისთავად საკმარისია მოდუნებული მოგზაურობისთვის; რაბათის ციხე და ვარძიის გამოქვაბულების ქალაქი საკმარისად ახლოსაა დასამატებლად.',
        sections: [
          { h: 'რა არის მარშრუტზე', p: 'ბორჯომის ცენტრალური პარკი მინერალური წყლებითა და საბაგიროთი ხეობის თავზე, ასევე ბორჯომ-ხარაგაულის ეროვნული პარკის ტყის კიდე. რაბათის ციხე ახალციხეში და ვარძიის გამოქვაბულთა მონასტერი დასავლეთითაა და მოგზაურობას გაფართოებულ დღედ აქცევს.' },
          { h: 'რა შედის', p: 'მიწოდება თბილისში სასტუმროზე, ლოდინი სანამ პარკში სეირნობთ, გაჩერებები სადილისა და ფოტოსთვის, წყალი და დამტენები სალონში.' },
          { h: 'ავტომობილი', p: 'Toyota Alphard 2018, 6 მგზავრამდე — კომფორტულია საოჯახო გასვლისთვის, ეტლისთვის ადგილით.' },
          { h: 'ხანგრძლივობა', p: 'მხოლოდ პარკი — მშვიდი დღეა, დაახლოებით 7–8 საათი კარიდან კარამდე. ახალციხის ან ვარძიის დამატებით დღე გრძელდება, 11–12 საათამდე და მნიშვნელოვნად მეტი გზით.' },
          { h: 'ფასი', p: 'ფიქსირდება WhatsApp-ში დღისთვის, არჩეული ვერსიის მიხედვით. პარკში შესვლა და საბაგირო ადგილზე იხდება.' }
        ],
        faq: [
          { q: 'შესაძლებელია ბორჯომი და ვარძია ერთ დღეში?', a: 'დიახ, მაგრამ ეს გრძელი დღეა დიდი გზით. ჯობია გადაწყვეტილება გასვლამდე მიიღოთ.' },
          { q: 'ელოდებით, სანამ პარკში ვართ?', a: 'დიახ, ლოდინი დღის ნაწილია და არა დამატებითი გადასახადი.' },
          { q: 'პარკი გამოდგება პატარა ბავშვებთან?', a: 'დიახ — ეს ფეხით სავალი პარკია ხეობაში, მანქანაში კი ეტლისთვის ადგილია.' },
          { q: 'რით განსხვავდება ეს თქვენი თბილისი — ბორჯომის ტრანსფერისგან?', a: 'ტრანსფერი მიგიყვანთ და ჩამოგსვამთ. ტური დაგეგმილი დღეა: მძღოლი გელოდებათ, გადაგიყვანთ გაჩერებებს შორის და დაგაბრუნებთ.' }
        ]
      }
    }
  }
];

module.exports = { GROUP_SEGMENT, GROUP_HUB, FOOTER_CLUSTER, PAGES };

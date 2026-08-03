(function () {
  'use strict';

  var META = {
    en: {
      title: 'KALA Georgia — Private VIP Transport, Escort & Transfers in Georgia',
      description: 'Private transport in Georgia: meet & greet for partners and delegations, transfers anywhere in the country, VIP escort and personal security, guided tours on request. Business-class Toyota Alphard.'
    },
    ka: {
      title: 'KALA Georgia — პირადი VIP ტრანსპორტი, ესკორტი და ტრანსფერები საქართველოში',
      description: 'პირადი ტრანსპორტი საქართველოში: შეხვედრა პარტნიორებისა და დელეგაციებისთვის, ტრანსფერები ქვეყნის ნებისმიერ წერტილში, VIP ესკორტი და პირადი დაცვა, ტურები გიდთან მოთხოვნისას. ბიზნეს-კლასის Toyota Alphard.'
    },
    ru: {
      title: 'KALA Georgia — персональный VIP-транспорт, сопровождение и трансферы по Грузии',
      description: 'Персональный транспорт по Грузии: встреча партнёров и делегаций, трансферы в любую точку страны, VIP-сопровождение и личная охрана, экскурсии с гидом по запросу. Toyota Alphard бизнес-класса.'
    }
  };

  var I18N = {
    en: {
      hero_h1: "Private Transport in Georgia — Punctual, Discreet, Built Around You",
      hero_subtitle: "Airport transfers, executive transportation, VIP escort and private touring across Georgia. A business-class Toyota Alphard and vetted partner vehicles — matched to the task and the guest.",
      hero_bullet1: "On-time pickup — we track your flight and the road, waiting is free if it's delayed",
      hero_bullet2: "Every detail is confirmed in writing before the trip — nothing changes en route",
      hero_bullet3: "Meet & greet at arrivals with a name board, luggage handled",
      hero_bullet4: "Clean cabin, water, chargers and Wi-Fi on every ride",
      hero_bullet5: "Personal escort and security available on request",
      hero_bullet6: "Confidentiality guaranteed as standard",
      hero_cta: "Message us on WhatsApp",
      hero_micro: "We reply within 5–10 minutes. Just share your route or task and date.",
      hero_ghost: "Fleet & Services ↓",
      hero_trust: "Tbilisi and all of Georgia · Contracts and invoicing for companies",

      services_eyebrow: "What we do",
      services_title: "Five things we handle every day",
      svc1_title: "Meet & Greet for Partners and Delegations",
      svc1_text: "We meet your partners and delegations at the airport or venue and manage transportation for the full visit. One briefed driver, one point of contact for your team.",
      svc2_title: "Private Transfers Anywhere in Georgia",
      svc2_text: "Airport transfers in Tbilisi and Kutaisi, and point-to-point travel to any city or region — Batumi, Kazbegi, Gudauri, Kakheti and beyond. Flight tracked, route fixed before you land.",
      svc3_title: "VIP Escort and Personal Security",
      svc3_text: "For principals and delegations who need more than a driver — trained personal escort and security, arranged discreetly alongside your transport.",
      svc4_title: "Guided Tours on Request",
      svc4_text: "A private driver-guide for day trips at your pace — Kazbegi, Kakheti, Mtskheta, Borjomi. Arranged on request, not offered as a default package.",
      svc5_title: "Confidentiality as Standard",
      svc5_text: "Unbranded vehicle on request, no name on the arrival board unless you ask for one, and drivers briefed on discretion — the default, not an add-on.",
      svc_link: "Ask on WhatsApp →",

      pricing_eyebrow: "Fixed price — no surprises",
      pricing_title: "Trip Pricing",
      pricing_intro: "Indicative pricing for popular routes in our business-class Toyota Alphard. We'll confirm the exact cost via WhatsApp based on date, route and stops before booking.",
      pricing_route1: "Tbilisi Airport ↔ Tbilisi",
      pricing_price1: "from $40",
      pricing_route2: "Tbilisi ↔ Gudauri",
      pricing_price2: "from $95",
      pricing_route3: "Tbilisi ↔ Kazbegi (Stepantsminda)",
      pricing_price3: "from $120",
      pricing_route4: "Tbilisi ↔ Borjomi",
      pricing_price4: "from $120",
      pricing_route5: "Tbilisi ↔ Bakuriani",
      pricing_price5: "from $140",
      pricing_route6: "Tbilisi ↔ Kutaisi",
      pricing_price6: "from $175",
      pricing_route7: "Tbilisi ↔ Kakheti (Telavi)",
      pricing_price7: "from $105",
      pricing_route8: "Tbilisi ↔ Batumi",
      pricing_price8: "from $270",
      pricing_route9: "Kutaisi Airport ↔ Tbilisi",
      pricing_price9: "from $175",
      pricing_note: "Prices are shown in USD as a reference; payment is accepted in GEL at the exchange rate on the day of travel. For the business-class minivan, up to 6 passengers with luggage, including free waiting for delayed flights and standard vehicle preparation. Hourly escort and multi-day routes are quoted individually.",
      pricing_security: "Separately, on request, we discuss extended escort — including personal security matters. If that's relevant to your trip, message us directly on WhatsApp.",
      pricing_cta: "Get an exact quote",

      fleet_honesty: "Real car, real photos — no stock images.",
      fleet_title: "Our Fleet",
      fleet_text: "A Japanese business-class minivan, 2018. Up to 6 passengers with luggage. Light leather cabin, fold-away captain's chairs in the second row, multi-zone climate control, ambient lighting, JBL sound. A space where it's easy to take a call, prepare for a meeting — or simply rest. For larger groups we bring in vetted partner minivans and coaches held to the same standard.",
      fleet_chip1: "6 seats · 4–6 pieces of luggage",
      fleet_chip2: "Multi-zone climate control",
      fleet_chip3: "Wi-Fi and charging",
      slide1: "Cabin with ambient lighting",
      slide2: "Exterior",
      slide3: "Seating and cabin in one frame",
      slide4: "Cabin trim",
      slide5: "Trunk — room for everyone's luggage",
      slide6: "Rear view",

      standards_title: "Our standard of preparation for every trip",
      standards1: "Cabin washed and cleaned before every pickup",
      standards2: "Chilled water for every passenger",
      standards3: "Phone chargers and Wi-Fi",
      standards4: "Name board on arrival — neutral on request",
      standards5: "Child seat available on advance request",
      standards6: "Luggage help included as standard",

      process_title: "From message to trip — four steps",
      step1_title: "Message us on WhatsApp",
      step1_text: "Your route or task, date, and number of passengers — that's all we need. We reply within 5–10 minutes.",
      step2_title: "Get written confirmation",
      step2_text: "We confirm the details in writing: date, time and pickup address.",
      step3_title: "We arrive exactly on time",
      step3_text: "Flight tracked, meet & greet, help with luggage. Waiting during a flight delay is free.",
      step4_title: "Travel with confidence",
      step4_text: "Stops along the way if you'd like them. Documentation and paperwork available on request.",
      process_cta: "Start with step one →",

      b2b_eyebrow: "For business",
      b2b_title: "Corporate Clients & Event Agencies",
      b2b_text: "We take transportation off your list for business visits and events — from meeting a single partner to running logistics for a conference. One contract, one point of contact — you deal with one person, not a fleet of drivers.",
      b2b_cta: "Discuss a partnership",
      b2b_condtitle: "Terms",
      b2b_cond1: "Invoicing and contract-based billing",
      b2b_cond2: "Documentation for your accounting team",
      b2b_cond3: "A dedicated coordinator and a single channel of communication",
      b2b_cond4: "Priority booking and assigned vehicles for regular clients",
      b2b_cond5: "Unbranded vehicle on request for confidential travel",

      faq_title: "Questions we're asked before booking",
      faq_q1: "What happens if my flight is delayed?",
      faq_a1: "We track your flight by number and adjust pickup to the actual landing time. Waiting time during a delay is free — it's part of the service, not an extra.",
      faq_q2: "How do you handle confidentiality?",
      faq_a2: "Discretion is the default: no branding on the vehicle if you prefer, no name on the arrival board unless requested, and drivers briefed not to discuss passengers or routes.",
      faq_q3: "Do you provide invoices and documentation?",
      faq_a3: "Yes. Private clients receive a receipt; companies get a contract, an invoice, and full documentation for accounting.",
      faq_q4: "What guarantee do I have that the car will actually show up?",
      faq_a4: "Every booking is confirmed in writing with date, time, and address. The driver leaves with time to spare, and you receive the driver's contact an hour before pickup. We keep backup vehicles on standby for important events.",
      faq_q5: "How do I book transport for a group or delegation?",
      faq_a5: "Message us on WhatsApp with the number of people, date and format. We'll propose the right vehicles, a pickup schedule and coordination for your event.",

      final_title: "Send us your route, task, or date",
      final_text: "We reply within 5–10 minutes and confirm your booking. Sending a message doesn't commit you to anything.",
      final_cta: "Message on WhatsApp",
      final_call: "or call:",
      final_micro: "English / ქართული / Русский. Fast replies, even on the road.",

      footer_contacts: "Contacts",
      footer_hours_title: "Hours & Coverage",
      footer_hours1: "Daily 08:00–23:00",
      footer_hours2: "Night flight pickups by advance booking",
      footer_hours3: "Tbilisi, serving all of Georgia",
      footer_links_title: "Links",
      footer_google: "Google Profile",
      footer_bottom: "KALA Georgia · Tbilisi, Georgia · 2026",
      sticky_call: "Call",

      wa_generic: "Hello! I'd like to get a quote. Task: ___ Date: ___",
      wa_meet: "Hello! I need meet & greet / transportation for partners or a delegation. Dates and format: ___",
      wa_transfer: "Hello! I need a transfer. From/To: ___ Date and time: ___",
      wa_vip: "Hello! I'm interested in VIP escort / personal security. Details: ___",
      wa_tours: "Hello! I'm interested in a guided tour. Destination: ___ Date: ___",
      wa_confidential: "Hello! I'd like to discuss confidentiality arrangements for my trip.",
      wa_b2b: "Hello! I'm writing on behalf of company ___. Interested in corporate terms.",
      wa_hello: "Hello!"
    },

    ka: {
      hero_h1: "პირადი ტრანსპორტი საქართველოში — პუნქტუალურად, დისკრეტულად და თქვენზე მორგებული",
      hero_subtitle: "აეროპორტის ტრანსფერები, საქმიანი ტრანსპორტირება, VIP ესკორტი და კერძო ტურები საქართველოს მასშტაბით. ბიზნეს-კლასის Toyota Alphard და შემოწმებული პარტნიორი ავტომობილები — დავალებასა და სტუმარზე მორგებული.",
      hero_bullet1: "დროული მოსვლა — ვადევნებთ თვალს ფრენას და გზას, დაგვიანების შემთხვევაში ლოდინი უფასოა",
      hero_bullet2: "ყველა დეტალი დასტურდება წერილობით მოგზაურობამდე — გზაში არაფერი იცვლება",
      hero_bullet3: "შეხვედრა აეროპორტში სახელით დაფით, დახმარება ბარგთან",
      hero_bullet4: "სუფთა სალონი, წყალი, დამტენები და Wi-Fi ყოველ მგზავრობაში",
      hero_bullet5: "პირადი ესკორტი და დაცვა — მოთხოვნის შემთხვევაში",
      hero_bullet6: "კონფიდენციალურობა გარანტირებულია ნაგულისხმევად",
      hero_cta: "მოგვწერეთ WhatsApp-ზე",
      hero_micro: "პასუხს გავცემთ 5–10 წუთში. საკმარისია მარშრუტი ან დავალება და თარიღი.",
      hero_ghost: "პარკი და სერვისები ↓",
      hero_trust: "თბილისი და მთელი საქართველო · ხელშეკრულება და ინვოისები კომპანიებისთვის",

      services_eyebrow: "რას ვაკეთებთ",
      services_title: "ხუთი მიმართულება, რომელზეც ყოველდღე ვმუშაობთ",
      svc1_title: "შეხვედრა და ტრანსპორტირება პარტნიორებისთვის და დელეგაციებისთვის",
      svc1_text: "ვხვდებით თქვენს პარტნიორებსა და დელეგაციებს აეროპორტში თუ ღონისძიების ადგილას და ვმართავთ ტრანსპორტს მთელი ვიზიტის განმავლობაში. ერთი გაფრთხილებული მძღოლი, ერთი საკონტაქტო პირი თქვენი გუნდისთვის.",
      svc2_title: "კერძო ტრანსფერები საქართველოს ნებისმიერ წერტილში",
      svc2_text: "ტრანსფერები თბილისისა და ქუთაისის აეროპორტებიდან და მოგზაურობა ნებისმიერ ქალაქსა თუ რეგიონში — ბათუმი, ყაზბეგი, გუდაური, კახეთი და სხვა. ფრენას ვადევნებთ თვალს, მარშრუტი დგინდება წინასწარ.",
      svc3_title: "VIP ესკორტი და პირადი დაცვა",
      svc3_text: "მათთვის, ვისაც მძღოლზე მეტი სჭირდება — გამოცდილი პირადი ესკორტი და დაცვა, დისკრეტულად, ტრანსპორტთან ერთად.",
      svc4_title: "ტურები გიდთან — მოთხოვნის შემთხვევაში",
      svc4_text: "კერძო მძღოლ-გიდი ერთდღიანი მოგზაურობებისთვის თქვენს ტემპში — ყაზბეგი, კახეთი, მცხეთა, ბორჯომი. ეწყობა მოთხოვნისას, არა როგორც ნაგულისხმევი პაკეტი.",
      svc5_title: "კონფიდენციალურობა ნაგულისხმევად",
      svc5_text: "ავტომობილი ბრენდირების გარეშე მოთხოვნისას, დაფაზე სახელის გარეშე, თუ არ მოითხოვთ, და მძღოლები გაფრთხილებულნი დისკრეციაზე — ეს სტანდარტია, არა დამატება.",
      svc_link: "ჰკითხეთ WhatsApp-ზე →",

      pricing_eyebrow: "ფიქსირებული ფასი — უსიურპრიზოდ",
      pricing_title: "მოგზაურობის ღირებულება",
      pricing_intro: "ორიენტირებული ფასები პოპულარულ მიმართულებებზე ბიზნეს-კლასის Toyota Alphard-ისთვის. ზუსტ ღირებულებას დავადასტურებთ WhatsApp-ში, ჯავშნის დადასტურებამდე — თარიღის, მარშრუტისა და გაჩერებების გათვალისწინებით.",
      pricing_route1: "თბილისის აეროპორტი ↔ თბილისი",
      pricing_price1: "40$-დან",
      pricing_route2: "თბილისი ↔ გუდაური",
      pricing_price2: "95$-დან",
      pricing_route3: "თბილისი ↔ ყაზბეგი (სტეფანწმინდა)",
      pricing_price3: "120$-დან",
      pricing_route4: "თბილისი ↔ ბორჯომი",
      pricing_price4: "120$-დან",
      pricing_route5: "თბილისი ↔ ბაკურიანი",
      pricing_price5: "140$-დან",
      pricing_route6: "თბილისი ↔ ქუთაისი",
      pricing_price6: "175$-დან",
      pricing_route7: "თბილისი ↔ კახეთი (თელავი)",
      pricing_price7: "105$-დან",
      pricing_route8: "თბილისი ↔ ბათუმი",
      pricing_price8: "270$-დან",
      pricing_route9: "ქუთაისის აეროპორტი ↔ თბილისი",
      pricing_price9: "175$-დან",
      pricing_note: "ფასები მითითებულია დოლარებში ორიენტირისთვის, გადახდა მიიღება ლარში, მოგზაურობის დღის კურსით. ბიზნეს-კლასის მინივენისთვის, 6 მგზავრამდე ბარგით, მოიცავს ლოდინს ფრენის დაგვიანების შემთხვევაში და სტანდარტულ მომზადებას. საათობრივი თანხლება და მრავალდღიანი მარშრუტები ითვლება ინდივიდუალურად.",
      pricing_security: "ცალკე, მოთხოვნისას, განვიხილავთ გაფართოებულ თანხლებას — პირადი უსაფრთხოების საკითხების ჩათვლით. თუ ეს აქტუალურია თქვენი მოგზაურობისთვის, მოგვწერეთ პირდაპირ WhatsApp-ში.",
      pricing_cta: "ზუსტი ფასის მიღება",

      fleet_honesty: "რეალური ავტომობილი, რეალური ფოტოები — არა სტოკი.",
      fleet_title: "ჩვენი პარკი",
      fleet_text: "იაპონური ბიზნეს-კლასის მინივენი, 2018 წელი. 6 მგზავრამდე ბარგით. ღია ტყავის სალონი, დასაკეცი კაპიტნის სავარძლები მეორე რიგში, მრავალზონიანი კლიმატ-კონტროლი, ატმოსფერული განათება, JBL აკუსტიკა. სივრცე, სადაც მარტივია ზარის გაკეთება, შეხვედრისთვის მომზადება — ან უბრალოდ დასვენება. დიდი ჯგუფებისთვის ვიზიდავთ შემოწმებულ პარტნიორ მინივენებსა და მიკროავტობუსებს იმავე სტანდარტით.",
      fleet_chip1: "6 ადგილი · 4–6 ჩემოდანი",
      fleet_chip2: "მრავალზონიანი კლიმატ-კონტროლი",
      fleet_chip3: "Wi-Fi და დამტენები",
      slide1: "სალონი ატმოსფერული განათებით",
      slide2: "ექსტერიერი",
      slide3: "სავარძლები და სალონი ერთ კადრში",
      slide4: "სალონის მოპირკეთება",
      slide5: "საბარგული — ადგილი ყველას ბარგისთვის",
      slide6: "ხედი უკნიდან",

      standards_title: "მომზადების სტანდარტი ყოველი გამოძახებისთვის",
      standards1: "სალონის რეცხვა და დასუფთავება ყოველი გამოძახების წინ",
      standards2: "გაცივებული წყალი ყველა მგზავრისთვის",
      standards3: "დამტენები ტელეფონისთვის და Wi-Fi",
      standards4: "დაფა შეხვედრისას — სურვილისამებრ ნეიტრალური",
      standards5: "საბავშვო სავარძელი — წინასწარი მოთხოვნით",
      standards6: "ბარგის დახმარება — სტანდარტულად შედის სერვისში",

      process_title: "შეტყობინებიდან მოგზაურობამდე — ოთხი ნაბიჯი",
      step1_title: "მოგვწერეთ WhatsApp-ზე",
      step1_text: "მარშრუტი ან დავალება, თარიღი და მგზავრთა რაოდენობა — ესეც საკმარისია. ვპასუხობთ 5–10 წუთში.",
      step2_title: "მიიღეთ წერილობითი დადასტურება",
      step2_text: "ვადასტურებთ დეტალებს წერილობით: თარიღი, დრო და მისამართი.",
      step3_title: "ჩავალთ ზუსტად დათქმულ დროს",
      step3_text: "ვადევნებთ თვალს ფრენას, ვხვდებით დაფით, ვეხმარებით ბარგში. ფრენის დაგვიანების შემთხვევაში ლოდინი უფასოა.",
      step4_title: "იმოგზაურეთ სიმშვიდით",
      step4_text: "გაჩერებები გზაში — თქვენი სურვილით. დოკუმენტაცია — მოთხოვნისას.",
      process_cta: "დაიწყეთ პირველი ნაბიჯით →",

      b2b_eyebrow: "ბიზნესისთვის",
      b2b_title: "კორპორატიულ კლიენტებსა და ივენთ-სააგენტოებს",
      b2b_text: "ვიღებთ თქვენს საქმიან ვიზიტებთან და ღონისძიებებთან დაკავშირებულ ტრანსპორტს — ერთი პარტნიორის შეხვედრიდან კონფერენციის ლოგისტიკამდე. ვმუშაობთ ხელშეკრულებით, ერთი პასუხისმგებელი პირით მთელი კომუნიკაციისთვის — თქვენ წერთ ერთ ადამიანს, არა მძღოლების ჯგუფს.",
      b2b_cta: "განვიხილოთ თანამშრომლობა",
      b2b_condtitle: "პირობები",
      b2b_cond1: "უნაღდო ანგარიშსწორება და ხელშეკრულებით მუშაობა",
      b2b_cond2: "დოკუმენტაცია თქვენი ბუღალტერიისთვის",
      b2b_cond3: "პერსონალური კოორდინატორი და ერთი საკომუნიკაციო არხი",
      b2b_cond4: "პრიორიტეტული ჯავშანი და მიმაგრებული ავტომობილები მუდმივი კლიენტებისთვის",
      b2b_cond5: "ავტომობილი ბრენდირების გარეშე — კონფიდენციალური მოგზაურობისთვის, მოთხოვნისას",

      faq_title: "კითხვები, რომლებსაც გვისვამენ ჯავშნამდე",
      faq_q1: "რა მოხდება, თუ ჩემი ფრენა დაგვიანდება?",
      faq_a1: "ვადევნებთ თვალს ფრენას ნომრით და ვუსადაგებთ გამოძახებას ფაქტობრივ დროს. ლოდინი დაგვიანების შემთხვევაში უფასოა — ეს სერვისის ნაწილია, არა დამატება.",
      faq_q2: "როგორ უზრუნველყოფთ კონფიდენციალურობას?",
      faq_a2: "დისკრეცია სტანდარტია: ავტომობილი ბრენდირების გარეშე სურვილისამებრ, დაფაზე სახელის გარეშე, თუ არ მოითხოვთ, და მძღოლები გაფრთხილებულნი არიან მგზავრებზე ან მარშრუტზე არ საუბრონ.",
      faq_q3: "გასცემთ ინვოისებსა და დოკუმენტაციას?",
      faq_a3: "დიახ. კერძო კლიენტებისთვის — ქვითარი. კომპანიებისთვის — ხელშეკრულება, ინვოისი და სრული დოკუმენტაცია ბუღალტერიისთვის.",
      faq_q4: "რა გარანტიაა, რომ მანქანა ნამდვილად მოვა?",
      faq_a4: "ყოველი ჯავშანი დასტურდება წერილობით — თარიღით, დროითა და მისამართით. მძღოლი გამოდის დროის მარაგით, ხოლო აყვანამდე ერთი საათით ადრე გიგზავნით მძღოლის საკონტაქტო ინფორმაციას. მნიშვნელოვანი ღონისძიებებისთვის გვყავს სარეზერვო ავტომობილი.",
      faq_q5: "როგორ დავჯავშნო ტრანსპორტი ჯგუფისთვის ან დელეგაციისთვის?",
      faq_a5: "მოგვწერეთ WhatsApp-ზე ადამიანების რაოდენობა, თარიღი და ფორმატი. შემოგთავაზებთ შესაფერის ავტომობილებს, გრაფიკს და კოორდინაციას თქვენი ღონისძიებისთვის.",

      final_title: "დაგვიტოვეთ მარშრუტი, დავალება ან თარიღი",
      final_text: "პასუხს გავცემთ 5–10 წუთში და დავადასტურებთ ჯავშანს. შეტყობინება არაფერს გავალდებულებთ.",
      final_cta: "მოგვწერეთ WhatsApp-ზე",
      final_call: "ან დაგვირეკეთ:",
      final_micro: "English / ქართული / Русский. სწრაფი პასუხი გზაშიც კი.",

      footer_contacts: "კონტაქტი",
      footer_hours_title: "სამუშაო საათები და გეოგრაფია",
      footer_hours1: "ყოველდღე 08:00–23:00",
      footer_hours2: "ღამის ფრენების შეხვედრა — წინასწარი ჯავშნით",
      footer_hours3: "თბილისი, ვმუშაობთ მთელ საქართველოში",
      footer_links_title: "ბმულები",
      footer_google: "Google პროფილი",
      footer_bottom: "KALA Georgia · თბილისი, საქართველო · 2026",
      sticky_call: "დარეკვა",

      wa_generic: "გამარჯობა! მსურს ღირებულების გაგება. დავალება: ___ თარიღი: ___",
      wa_meet: "გამარჯობა! საჭიროა შეხვედრა/ტრანსპორტი პარტნიორებისთვის ან დელეგაციისთვის. თარიღები და ფორმატი: ___",
      wa_transfer: "გამარჯობა! საჭიროა ტრანსფერი. საიდან/სად: ___ თარიღი და დრო: ___",
      wa_vip: "გამარჯობა! მაინტერესებს VIP ესკორტი/პირადი დაცვა. დეტალები: ___",
      wa_tours: "გამარჯობა! მაინტერესებს ტური გიდთან. მიმართულება: ___ თარიღი: ___",
      wa_confidential: "გამარჯობა! მსურს განვიხილო კონფიდენციალურობის პირობები ჩემი მოგზაურობისთვის.",
      wa_b2b: "გამარჯობა! ვწერ კომპანია ___-დან. მაინტერესებს კორპორატიული პირობები.",
      wa_hello: "გამარჯობა!"
    },

    ru: {
      hero_h1: "Персональный транспорт по Грузии — пунктуально, конфиденциально, под вас",
      hero_subtitle: "Трансферы из аэропортов, деловая транспортировка, VIP-сопровождение и частные туры по всей Грузии. Минивэн бизнес-класса Toyota Alphard и проверенные автомобили партнёров — под задачу и гостя.",
      hero_bullet1: "Подача точно ко времени — отслеживаем рейс и дорогу, ожидание при задержке бесплатно",
      hero_bullet2: "Все детали подтверждаются в переписке до поездки — в пути ничего не меняется",
      hero_bullet3: "Встреча в зале прилёта с табличкой, помощь с багажом",
      hero_bullet4: "Чистый салон, вода, зарядки и Wi-Fi в каждой поездке",
      hero_bullet5: "Личное сопровождение и охрана — по запросу",
      hero_bullet6: "Конфиденциальность гарантирована по умолчанию",
      hero_cta: "Написать в WhatsApp",
      hero_micro: "Ответим за 5–10 минут. Достаточно указать маршрут или задачу и дату.",
      hero_ghost: "Автопарк и услуги ↓",
      hero_trust: "Тбилиси и вся Грузия · Договор и счета для компаний",

      services_eyebrow: "Чем мы занимаемся",
      services_title: "Пять направлений, с которыми мы работаем каждый день",
      svc1_title: "Встреча и транспортировка партнёров и делегаций",
      svc1_text: "Встречаем ваших партнёров и делегации в аэропорту или на месте мероприятия и ведём транспорт на протяжении всего визита. Один проинструктированный водитель, один контакт для вашей команды.",
      svc2_title: "Частные трансферы в любую точку Грузии",
      svc2_text: "Трансферы из аэропортов Тбилиси и Кутаиси, поездки в любой город или регион — Батуми, Казбеги, Гудаури, Кахетия и другие. Отслеживаем рейс, маршрут согласован заранее.",
      svc3_title: "VIP-сопровождение и личная охрана",
      svc3_text: "Для тех, кому нужно больше, чем водитель — опытное личное сопровождение и охрана, организованные деликатно вместе с транспортом.",
      svc4_title: "Экскурсии с гидом — по запросу",
      svc4_text: "Персональный водитель-гид для однодневных поездок в вашем темпе: Казбеги, Кахетия, Мцхета, Боржоми. Организуется по запросу, не как стандартный пакет.",
      svc5_title: "Конфиденциальность по умолчанию",
      svc5_text: "Автомобиль без брендинга по запросу, без имени на табличке, если не попросите иначе, водители проинструктированы о деликатности — это стандарт, а не опция.",
      svc_link: "Уточнить в WhatsApp →",

      pricing_eyebrow: "Фиксированная цена — без сюрпризов",
      pricing_title: "Стоимость поездок",
      pricing_intro: "Ориентировочные цены на популярные направления для минивэна бизнес-класса Toyota Alphard. Точную стоимость с учётом даты, маршрута и остановок назовём в WhatsApp до подтверждения брони.",
      pricing_route1: "Аэропорт Тбилиси ↔ Тбилиси",
      pricing_price1: "от $40",
      pricing_route2: "Тбилиси ↔ Гудаури",
      pricing_price2: "от $95",
      pricing_route3: "Тбилиси ↔ Казбеги (Степанцминда)",
      pricing_price3: "от $120",
      pricing_route4: "Тбилиси ↔ Боржоми",
      pricing_price4: "от $120",
      pricing_route5: "Тбилиси ↔ Бакуриани",
      pricing_price5: "от $140",
      pricing_route6: "Тбилиси ↔ Кутаиси",
      pricing_price6: "от $175",
      pricing_route7: "Тбилиси ↔ Кахетия (Телави)",
      pricing_price7: "от $105",
      pricing_route8: "Тбилиси ↔ Батуми",
      pricing_price8: "от $270",
      pricing_route9: "Аэропорт Кутаиси ↔ Тбилиси",
      pricing_price9: "от $175",
      pricing_note: "Цены указаны в долларах для ориентира, оплата принимается в лари по курсу на день поездки. Для минивэна бизнес-класса, до 6 пассажиров с багажом, включают ожидание при задержке рейса и стандартную подготовку автомобиля. Почасовое сопровождение и многодневные маршруты считаем индивидуально.",
      pricing_security: "Отдельно, по запросу, обсуждаем расширенное сопровождение — вплоть до вопросов личной безопасности. Если задача такого рода актуальна, напишите об этом в WhatsApp напрямую.",
      pricing_cta: "Уточнить точную цену",

      fleet_honesty: "Реальный автомобиль, реальные фото — без стоков.",
      fleet_title: "Наш автопарк",
      fleet_text: "Японский минивэн бизнес-класса, 2018 год. До 6 пассажиров с багажом. Светлый кожаный салон, раскладывающиеся капитанские кресла второго ряда, многозонный климат-контроль, атмосферная подсветка, акустика JBL. Пространство, где удобно провести звонок, подготовиться к встрече — или просто отдохнуть в дороге. Для больших групп привлекаем проверенные минивэны и микроавтобусы партнёров с теми же стандартами подготовки.",
      fleet_chip1: "6 мест · 4–6 чемоданов",
      fleet_chip2: "Многозонный климат-контроль",
      fleet_chip3: "Wi-Fi и зарядки",
      slide1: "Салон с атмосферной подсветкой",
      slide2: "Экстерьер",
      slide3: "Посадка и салон одним кадром",
      slide4: "Отделка салона",
      slide5: "Багажник — места хватит на всех",
      slide6: "Вид сзади",

      standards_title: "Стандарт подготовки к каждой поездке",
      standards1: "Мойка и уборка салона перед каждой подачей",
      standards2: "Охлаждённая вода для каждого пассажира",
      standards3: "Зарядки для телефонов и Wi-Fi",
      standards4: "Табличка при встрече — по желанию нейтральная",
      standards5: "Детское кресло — по предварительному запросу",
      standards6: "Помощь с багажом входит в сервис по умолчанию",

      process_title: "От сообщения до поездки — четыре шага",
      step1_title: "Напишите в WhatsApp",
      step1_text: "Маршрут или задача, дата, число пассажиров — этого достаточно. Отвечаем за 5–10 минут.",
      step2_title: "Получите письменное подтверждение",
      step2_text: "Подтверждаем детали в переписке: дату, время и адрес подачи.",
      step3_title: "Мы приезжаем точно в срок",
      step3_text: "Отслеживаем рейс, встречаем с табличкой, помогаем с багажом. При задержке рейса ожидание бесплатно.",
      step4_title: "Поездка без забот",
      step4_text: "Остановки по пути — по вашему желанию. Документы и закрывающие — по запросу.",
      process_cta: "Начать с первого шага →",

      b2b_eyebrow: "Для бизнеса",
      b2b_title: "Корпоративным клиентам и ивент-агентствам",
      b2b_text: "Берём на себя транспортную часть ваших деловых визитов и мероприятий: от встречи одного партнёра до логистики конференции. Работаем по договору, назначаем одного ответственного за всю коммуникацию — вы пишете одному человеку, а не координируете водителей.",
      b2b_cta: "Обсудить сотрудничество",
      b2b_condtitle: "Условия",
      b2b_cond1: "Безналичная оплата и работа по договору",
      b2b_cond2: "Закрывающие документы для бухгалтерии",
      b2b_cond3: "Персональный менеджер и единый канал связи",
      b2b_cond4: "Приоритетное бронирование и закреплённые машины для постоянных клиентов",
      b2b_cond5: "Конфиденциальность поездки: автомобиль без брендинга — по запросу",

      faq_title: "Вопросы, которые нам задают перед бронированием",
      faq_q1: "Что будет, если мой рейс задержится?",
      faq_a1: "Мы отслеживаем рейс по номеру и подстраиваем подачу под фактическое время прилёта. Ожидание при задержке рейса бесплатное — это часть услуги, а не опция.",
      faq_q2: "Как вы обеспечиваете конфиденциальность?",
      faq_a2: "Деликатность — это стандарт: автомобиль без брендинга по желанию, без имени на табличке, если не попросите иначе, водители проинструктированы не обсуждать пассажиров и маршрут.",
      faq_q3: "Вы даёте отчётные документы?",
      faq_a3: "Да. Для частных клиентов — чек. Для компаний — работа по договору, счёт и полная документация для бухгалтерии.",
      faq_q4: "Какие гарантии, что машина точно приедет?",
      faq_a4: "Бронь подтверждается сообщением с датой, временем и адресом — это письменная договорённость. Водитель выезжает с запасом по времени, за час до подачи вы получаете контакт водителя. На важные события держим резервный автомобиль партнёров.",
      faq_q5: "Как забронировать поездку на группу или делегацию?",
      faq_a5: "Напишите в WhatsApp число людей, дату и формат. Мы предложим состав транспорта, график подач и координацию для вашего мероприятия.",

      final_title: "Напишите маршрут, задачу или дату",
      final_text: "Ответим в течение 5–10 минут и подтвердим бронь. Сообщение ни к чему не обязывает.",
      final_cta: "Написать в WhatsApp",
      final_call: "или позвоните:",
      final_micro: "English / ქართული / Русский. Быстрые ответы даже в дороге.",

      footer_contacts: "Контакты",
      footer_hours_title: "График и география",
      footer_hours1: "Ежедневно 08:00–23:00",
      footer_hours2: "Встречи ночных рейсов — по предварительной брони",
      footer_hours3: "Тбилиси, работа по всей Грузии",
      footer_links_title: "Ссылки",
      footer_google: "Google-профиль",
      footer_bottom: "KALA Georgia · Тбилиси, Грузия · 2026",
      sticky_call: "Позвонить",

      wa_generic: "Здравствуйте! Хочу рассчитать стоимость. Задача: ___ Дата: ___",
      wa_meet: "Здравствуйте! Нужна встреча/транспорт для партнёров или делегации. Даты и формат: ___",
      wa_transfer: "Здравствуйте! Нужен трансфер. Откуда/куда: ___ Дата и время: ___",
      wa_vip: "Здравствуйте! Интересует VIP-сопровождение/личная охрана. Детали: ___",
      wa_tours: "Здравствуйте! Интересует экскурсия с гидом. Направление: ___ Дата: ___",
      wa_confidential: "Здравствуйте! Хочу обсудить условия конфиденциальности поездки.",
      wa_b2b: "Здравствуйте! Пишу от компании ___. Интересуют корпоративные условия.",
      wa_hello: "Здравствуйте!"
    }
  };

  var STORAGE_KEY = 'kala_lang';
  var DEFAULT_LANG = 'en';

  function getSavedLang() {
    try {
      var saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved && I18N[saved]) return saved;
    } catch (e) {}
    return DEFAULT_LANG;
  }

  function applyLanguage(lang) {
    if (!I18N[lang]) lang = DEFAULT_LANG;
    var dict = I18N[lang];

    document.documentElement.setAttribute('lang', lang);
    if (META[lang]) {
      document.title = META[lang].title;
      var metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', META[lang].description);
    }

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (dict[key] !== undefined) el.textContent = dict[key];
    });

    document.querySelectorAll('[data-i18n-wa]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-wa');
      if (dict[key] !== undefined) el.setAttribute('data-wa-text', dict[key]);
    });

    document.querySelectorAll('#langSwitch button').forEach(function (btn) {
      btn.classList.toggle('is-active', btn.getAttribute('data-lang') === lang);
    });

    try { window.localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}

    if (window.KALA && typeof window.KALA.refreshWaLinks === 'function') {
      window.KALA.refreshWaLinks();
    }
  }

  function initLangSwitch() {
    var wrap = document.getElementById('langSwitch');
    if (!wrap) return;
    wrap.querySelectorAll('button').forEach(function (btn) {
      btn.addEventListener('click', function () {
        applyLanguage(btn.getAttribute('data-lang'));
      });
    });
  }

  window.KALA = window.KALA || {};
  window.KALA.applyLanguage = applyLanguage;
  window.KALA.currentLang = getSavedLang();

  function init() {
    initLangSwitch();
    applyLanguage(getSavedLang());
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

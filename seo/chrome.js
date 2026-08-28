'use strict';

/**
 * Per-language UI chrome for the generated SEO landing pages.
 * Values are kept in sync with js/i18n.js so the new pages read
 * identically to the hand-written homepages.
 */

const SITE = 'https://kala-georgia.com';

const LANGS = ['en', 'ru', 'ka'];

const HTML_LANG = { en: 'en', ru: 'ru', ka: 'ka' };
const OG_LOCALE = { en: 'en_US', ru: 'ru_RU', ka: 'ka_GE' };

const CHROME = {
  en: {
    home: 'Home',
    breadcrumbLabel: 'Breadcrumb',
    nav: {
      services: 'Services',
      fleet: 'Fleet',
      process: 'How it works',
      b2b: 'For business',
      faq: 'FAQ',
      tours: 'Tours',
      gallery: 'Gallery',
      cta: 'WhatsApp'
    },
    footer: {
      navTitle: 'Navigate',
      contacts: 'Contacts',
      hoursTitle: 'Hours & Coverage',
      hours: [
        'Daily 08:00–23:00',
        'Night flight pickups by advance booking',
        'Tbilisi, serving all of Georgia'
      ],
      linksTitle: 'Links',
      facebook: 'Facebook',
      google: 'Google Profile',
      share: 'Share',
      bottom: 'KALA Georgia · Tbilisi, Georgia · 2026',
      servicesTitle: 'Transfers & Tours'
    },
    stickyCall: 'Call',
    waGeneric: "Hello! I'd like to get a quote. Task: ___ Date: ___",
    waHello: 'Hello!',
    faqTitle: 'Frequently asked questions',
    relatedTitle: 'Related services',
    ctaTitle: 'Get a fixed price on WhatsApp',
    ctaText: 'Send your route and date — we reply within 5–10 minutes and confirm the price before the trip.',
    ctaButton: 'Message us on WhatsApp',
    ctaCall: 'Or call +995 557 78 68 45',
    menuLabel: 'Menu',
    waAria: 'Message on WhatsApp'
  },

  ru: {
    home: 'Главная',
    breadcrumbLabel: 'Хлебные крошки',
    nav: {
      services: 'Услуги',
      fleet: 'Автопарк',
      process: 'Как мы работаем',
      b2b: 'Для бизнеса',
      faq: 'Вопросы',
      tours: 'Туры',
      gallery: 'Галерея',
      cta: 'WhatsApp'
    },
    footer: {
      navTitle: 'Навигация',
      contacts: 'Контакты',
      hoursTitle: 'График и география',
      hours: [
        'Ежедневно 08:00–23:00',
        'Встречи ночных рейсов — по предварительной брони',
        'Тбилиси, работа по всей Грузии'
      ],
      linksTitle: 'Ссылки',
      facebook: 'Facebook',
      google: 'Google-профиль',
      share: 'Поделиться',
      bottom: 'KALA Georgia · Тбилиси, Грузия · 2026',
      servicesTitle: 'Трансферы и туры'
    },
    stickyCall: 'Позвонить',
    waGeneric: 'Здравствуйте! Хочу рассчитать стоимость. Задача: ___ Дата: ___',
    waHello: 'Здравствуйте!',
    faqTitle: 'Частые вопросы',
    relatedTitle: 'Далее по теме',
    ctaTitle: 'Зафиксируйте цену в WhatsApp',
    ctaText: 'Напишите маршрут и дату — отвечаем за 5–10 минут и фиксируем цену до поездки.',
    ctaButton: 'Написать в WhatsApp',
    ctaCall: 'Или позвоните: +995 557 78 68 45',
    menuLabel: 'Меню',
    waAria: 'Написать в WhatsApp'
  },

  ka: {
    home: 'მთავარი',
    breadcrumbLabel: 'ნავიგაციის ბილიკი',
    nav: {
      services: 'სერვისები',
      fleet: 'პარკი',
      process: 'როგორ ვმუშაობთ',
      b2b: 'ბიზნესისთვის',
      faq: 'კითხვები',
      tours: 'ტურები',
      gallery: 'გალერეა',
      cta: 'WhatsApp'
    },
    footer: {
      navTitle: 'ნავიგაცია',
      contacts: 'კონტაქტი',
      hoursTitle: 'სამუშაო საათები და გეოგრაფია',
      hours: [
        'ყოველდღე 08:00–23:00',
        'ღამის ფრენების შეხვედრა — წინასწარი ჯავშნით',
        'თბილისი, ვმუშაობთ მთელ საქართველოში'
      ],
      linksTitle: 'ბმულები',
      facebook: 'Facebook',
      google: 'Google პროფილი',
      share: 'გაზიარება',
      bottom: 'KALA Georgia · თბილისი, საქართველო · 2026',
      servicesTitle: 'ტრანსფერები და ტურები'
    },
    stickyCall: 'დარეკვა',
    waGeneric: 'გამარჯობა! მსურს ღირებულების გაგება. დავალება: ___ თარიღი: ___',
    waHello: 'გამარჯობა!',
    faqTitle: 'ხშირად დასმული კითხვები',
    relatedTitle: 'მსგავსი გვერდები',
    ctaTitle: 'დააფიქსირეთ ფასი WhatsApp-ში',
    ctaText: 'მოგვწერეთ მარშრუტი და თარიღი — ვპასუხობთ 5–10 წუთში და ფასს ვაფიქსირებთ მგზავრობამდე.',
    ctaButton: 'მოგვწერეთ WhatsApp-ში',
    ctaCall: 'ან დაგვირეკეთ: +995 557 78 68 45',
    menuLabel: 'მენიუ',
    waAria: 'მოგვწერეთ WhatsApp-ში'
  }
};

module.exports = { SITE, LANGS, HTML_LANG, OG_LOCALE, CHROME };

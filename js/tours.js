(function () {
  'use strict';

  var tours = [];
  var loaded = false;

  var WA_TEMPLATES = {
    en: 'Hello! I\'m interested in the tour "{title}". Date: ___',
    ka: 'გამარჯობა! მაინტერესებს ტური „{title}“. თარიღი: ___',
    ru: 'Здравствуйте! Интересует тур «{title}». Дата: ___'
  };

  var CTA_LABEL = {
    en: 'Ask on WhatsApp →',
    ka: 'ჰკითხეთ WhatsApp-ზე →',
    ru: 'Уточнить в WhatsApp →'
  };

  function currentLang() {
    return (window.KALA && window.KALA.currentLang) || 'en';
  }

  function textFor(field, lang) {
    if (!field) return '';
    return field[lang] || field.en || '';
  }

  function waTextFor(tour, lang) {
    var title = textFor(tour.title, lang);
    var tpl = WA_TEMPLATES[lang] || WA_TEMPLATES.en;
    return tpl.replace('{title}', title);
  }

  function render() {
    var grid = document.getElementById('toursGrid');
    var empty = document.getElementById('toursEmpty');
    var loading = document.getElementById('toursLoading');
    if (!grid) return;
    if (loading) loading.hidden = true;

    if (!tours.length) {
      grid.hidden = true;
      if (empty) empty.hidden = false;
      return;
    }

    if (empty) empty.hidden = true;
    grid.hidden = false;
    grid.innerHTML = '';
    var lang = currentLang();

    tours.forEach(function (tour) {
      var card = document.createElement('article');
      card.className = 'tour-card';

      var img = document.createElement('img');
      img.className = 'tour-card__photo';
      img.src = tour.image || '';
      img.alt = textFor(tour.title, lang);
      img.loading = 'lazy';
      card.appendChild(img);

      var body = document.createElement('div');
      body.className = 'tour-card__body';

      var h3 = document.createElement('h3');
      h3.textContent = textFor(tour.title, lang);
      body.appendChild(h3);

      var p = document.createElement('p');
      p.textContent = textFor(tour.description, lang);
      body.appendChild(p);

      var link = document.createElement('a');
      link.className = 'service-card__link js-wa';
      link.href = '#';
      link.setAttribute('data-wa-text', waTextFor(tour, lang));
      var span = document.createElement('span');
      span.textContent = CTA_LABEL[lang] || CTA_LABEL.en;
      link.appendChild(span);
      body.appendChild(link);

      card.appendChild(body);
      grid.appendChild(card);
    });

    if (window.KALA && typeof window.KALA.refreshWaLinks === 'function') {
      window.KALA.refreshWaLinks();
    }
  }

  function load() {
    fetch('/api/tours', { cache: 'no-store' })
      .then(function (r) { return r.ok ? r.json() : []; })
      .then(function (data) {
        tours = Array.isArray(data) ? data : [];
        loaded = true;
        render();
      })
      .catch(function () {
        tours = [];
        loaded = true;
        render();
      });
  }

  window.addEventListener('kala:langchange', function () {
    if (loaded) render();
  });

  function init() {
    load();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

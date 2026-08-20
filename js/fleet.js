(function () {
  'use strict';

  var cars = [];
  var loaded = false;

  var WA_TEMPLATES = {
    en: 'Hello! I\'d like to book the {name}. Date: ___',
    ka: 'გამარჯობა! მსურს დავჯავშნო {name}. თარიღი: ___',
    ru: 'Здравствуйте! Хочу забронировать {name}. Дата: ___'
  };

  function currentLang() {
    return (window.KALA && window.KALA.currentLang) || 'en';
  }

  function t(key) {
    return (window.KALA && typeof window.KALA.t === 'function') ? window.KALA.t(key) : key;
  }

  function waTextFor(car) {
    var tpl = WA_TEMPLATES[currentLang()] || WA_TEMPLATES.en;
    return tpl.replace('{name}', car.name || '');
  }

  function metaSpan(text) {
    var span = document.createElement('span');
    span.textContent = text;
    return span;
  }

  function priceRow(labelKey, value, isFullday) {
    if (!value) return null;
    var li = document.createElement('li');
    if (isFullday) li.className = 'fleet-card__price-full';
    var span = document.createElement('span');
    span.textContent = t(labelKey);
    var b = document.createElement('b');
    b.textContent = value + ' GEL';
    li.appendChild(span);
    li.appendChild(b);
    return li;
  }

  function buildCard(car) {
    var article = document.createElement('article');
    article.className = 'fleet-card';

    var media = document.createElement('div');
    media.className = 'fleet-card__media';
    var img = document.createElement('img');
    img.src = car.image || '';
    img.alt = car.name || '';
    img.loading = 'lazy';
    media.appendChild(img);
    if (car.category) {
      var badge = document.createElement('span');
      badge.className = 'fleet-card__badge';
      badge.textContent = t('fleet_cat_' + car.category);
      media.appendChild(badge);
    }
    article.appendChild(media);

    var body = document.createElement('div');
    body.className = 'fleet-card__body';

    var h3 = document.createElement('h3');
    h3.className = 'fleet-card__name';
    h3.textContent = car.name || '';
    body.appendChild(h3);

    var meta = document.createElement('div');
    meta.className = 'fleet-card__meta';
    var parts = [];
    if (car.year) parts.push(metaSpan(car.year));
    if (car.color) parts.push(metaSpan(t('fleet_color_' + car.color)));
    if (car.max) {
      var maxSpan = document.createElement('span');
      var label = document.createElement('span');
      label.textContent = t('fleet_max_label');
      maxSpan.appendChild(label);
      maxSpan.appendChild(document.createTextNode(' ' + car.max));
      parts.push(maxSpan);
    }
    parts.push(metaSpan(t('fleet_city_tbilisi')));
    parts.forEach(function (part, i) {
      if (i > 0) {
        var dot = document.createElement('span');
        dot.className = 'dot';
        dot.textContent = '·';
        meta.appendChild(dot);
      }
      meta.appendChild(part);
    });
    body.appendChild(meta);

    var ul = document.createElement('ul');
    ul.className = 'fleet-card__prices';
    [
      ['fleet_route_airport', car.priceAirport, false],
      ['fleet_route_gudauri', car.priceGudauri, false],
      ['fleet_route_kutaisi', car.priceKutaisi, false],
      ['fleet_route_fullday', car.priceFullday, true]
    ].forEach(function (row) {
      var li = priceRow(row[0], row[1], row[2]);
      if (li) ul.appendChild(li);
    });
    body.appendChild(ul);

    var cta = document.createElement('a');
    cta.href = '#';
    cta.className = 'btn btn-whatsapp fleet-card__cta js-wa';
    cta.setAttribute('data-wa-text', waTextFor(car));
    var ctaSpan = document.createElement('span');
    ctaSpan.textContent = t('fleet_book');
    cta.appendChild(ctaSpan);
    body.appendChild(cta);

    article.appendChild(body);
    return article;
  }

  function render() {
    var grid = document.getElementById('fleetCards');
    var loading = document.getElementById('fleetLoading');
    if (!grid) return;
    if (loading) loading.hidden = true;

    grid.innerHTML = '';
    cars.forEach(function (car) {
      grid.appendChild(buildCard(car));
    });
    grid.hidden = false;

    if (window.KALA && typeof window.KALA.refreshWaLinks === 'function') {
      window.KALA.refreshWaLinks();
    }
  }

  function load() {
    fetch('/api/fleet', { cache: 'no-store' })
      .then(function (r) { return r.ok ? r.json() : []; })
      .then(function (data) {
        cars = Array.isArray(data) ? data : [];
        loaded = true;
        render();
      })
      .catch(function () {
        cars = [];
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

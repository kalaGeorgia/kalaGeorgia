(function () {
  'use strict';

  // Единая точка правки номера WhatsApp/телефона по всему сайту.
  var WHATSAPP_NUMBER = '995557786845';
  var PHONE_DISPLAY = '+995 557 78 68 45';
  var PHONE_TEL = '+995557786845';

  function buildWaLink(text) {
    var base = 'https://wa.me/' + WHATSAPP_NUMBER;
    return text ? base + '?text=' + encodeURIComponent(text) : base;
  }

  function initWaLinks() {
    var links = document.querySelectorAll('.js-wa');
    links.forEach(function (el) {
      el.setAttribute('href', buildWaLink(el.getAttribute('data-wa-text') || ''));
      el.setAttribute('target', '_blank');
      el.setAttribute('rel', 'noopener');
    });
  }

  window.KALA = window.KALA || {};
  window.KALA.refreshWaLinks = initWaLinks;

  // Image paths come from the API and from admin-saved data, where older
  // entries are stored relative ("images/car.jpg"). Pages now live in
  // /en/, /ru/, /ka/ and deeper, so a relative path would resolve against
  // the directory and 404. Anchor anything that is not already absolute.
  function assetUrl(path) {
    if (!path) return '';
    if (/^(https?:)?\/\//.test(path) || path.charAt(0) === '/' || path.indexOf('data:') === 0) return path;
    return '/' + path;
  }

  window.KALA.assetUrl = assetUrl;

  function initTelLinks() {
    var links = document.querySelectorAll('.js-tel');
    links.forEach(function (el) {
      el.setAttribute('href', 'tel:' + PHONE_TEL);
      if (el.textContent.trim().indexOf('995') !== -1 || el.textContent.trim().indexOf('XXX') !== -1) {
        el.textContent = PHONE_DISPLAY;
      }
    });
  }

  // ---- FAQ accordion ----
  function initFaq() {
    var items = document.querySelectorAll('.faq__item');
    items.forEach(function (item) {
      var btn = item.querySelector('.faq__question');
      btn.addEventListener('click', function () {
        var isOpen = item.getAttribute('data-open') === 'true';
        item.setAttribute('data-open', String(!isOpen));
        btn.setAttribute('aria-expanded', String(!isOpen));
      });
    });
  }

  // ---- Top nav: mobile toggle + solid background on scroll ----
  function initNav() {
    var nav = document.getElementById('siteNav');
    var toggle = document.getElementById('navToggle');
    var links = document.getElementById('navLinks');
    if (!nav || !toggle || !links) return;

    function closeMenu() {
      toggle.setAttribute('aria-expanded', 'false');
      links.classList.remove('is-open');
    }

    toggle.addEventListener('click', function () {
      var isOpen = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!isOpen));
      links.classList.toggle('is-open', !isOpen);
    });

    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeMenu);
    });

    function updateScrolled() {
      nav.classList.toggle('is-scrolled', window.scrollY > 12);
    }
    updateScrolled();
    window.addEventListener('scroll', updateScrolled, { passive: true });
  }

  // ---- Sticky mobile bar: show early so a WhatsApp CTA is reachable fast ----
  function initStickyBar() {
    var bar = document.getElementById('stickyBar');
    if (!bar) return;
    var threshold = window.innerHeight * 0.25;

    function update() {
      bar.style.transform = window.scrollY > threshold ? 'translateY(0)' : 'translateY(100%)';
    }
    bar.style.transition = 'transform 0.25s ease';
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', function () { threshold = window.innerHeight * 0.25; update(); });
  }

  // ---- Share button: native share sheet, falls back to copy-link ----
  var SHARE_COPIED = { en: 'Link copied', ka: 'ბმული დაკოპირდა', ru: 'Ссылка скопирована' };

  function initShareButtons() {
    var buttons = document.querySelectorAll('.js-share');
    buttons.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        var url = window.location.href;

        if (navigator.share) {
          navigator.share({ title: document.title, url: url }).catch(function () {});
          return;
        }

        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(url).then(function () {
            var lang = (window.KALA && window.KALA.currentLang) || 'en';
            var original = btn.textContent;
            btn.textContent = SHARE_COPIED[lang] || SHARE_COPIED.en;
            setTimeout(function () { btn.textContent = original; }, 1800);
          }).catch(function () {});
        }
      });
    });
  }

  function trackVisit() {
    try {
      fetch('/api/track', { method: 'POST' }).catch(function () {});
    } catch (e) { /* ignore — never affect the visitor experience */ }
  }

  function init() {
    initWaLinks();
    initTelLinks();
    initFaq();
    initNav();
    initStickyBar();
    initShareButtons();
    trackVisit();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

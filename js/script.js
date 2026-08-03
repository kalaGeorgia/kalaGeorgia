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

  // ---- Fleet slider ----
  function initSlider() {
    var track = document.getElementById('sliderTrack');
    var dotsWrap = document.getElementById('sliderDots');
    if (!track || !dotsWrap) return;

    var slides = Array.prototype.slice.call(track.children);
    var index = 0;

    slides.forEach(function (_, i) {
      var dot = document.createElement('button');
      dot.className = 'slider__dot' + (i === 0 ? ' is-active' : '');
      dot.setAttribute('aria-label', 'Фото ' + (i + 1));
      dot.addEventListener('click', function () { goTo(i); });
      dotsWrap.appendChild(dot);
    });
    var dots = Array.prototype.slice.call(dotsWrap.children);

    function goTo(i) {
      index = (i + slides.length) % slides.length;
      track.style.transform = 'translateX(-' + (index * 100) + '%)';
      dots.forEach(function (d, di) { d.classList.toggle('is-active', di === index); });
    }

    var prevBtn = document.querySelector('.slider__nav--prev');
    var nextBtn = document.querySelector('.slider__nav--next');
    if (prevBtn) prevBtn.addEventListener('click', function () { goTo(index - 1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { goTo(index + 1); });

    // swipe on touch devices
    var startX = null;
    track.addEventListener('touchstart', function (e) { startX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', function (e) {
      if (startX === null) return;
      var diff = e.changedTouches[0].clientX - startX;
      if (Math.abs(diff) > 40) goTo(diff > 0 ? index - 1 : index + 1);
      startX = null;
    });
  }

  // ---- Sticky mobile bar: show after first viewport of scroll ----
  function initStickyBar() {
    var bar = document.getElementById('stickyBar');
    if (!bar) return;
    var threshold = window.innerHeight * 0.9;

    function update() {
      bar.style.transform = window.scrollY > threshold ? 'translateY(0)' : 'translateY(100%)';
    }
    bar.style.transition = 'transform 0.25s ease';
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', function () { threshold = window.innerHeight * 0.9; update(); });
  }

  function init() {
    initWaLinks();
    initTelLinks();
    initFaq();
    initSlider();
    initStickyBar();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

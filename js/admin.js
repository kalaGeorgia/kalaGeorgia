(function () {
  'use strict';

  var content = null;
  var activeLang = 'en';
  var dirty = false;
  var tours = [];
  var toursDirty = false;

  var PHOTO_SLOTS = [
    { key: 'hero', label: 'Hero — фон главного экрана (независимо от слайдера)' },
    { key: 'slot1', label: 'Слот 1 — салон (ambient-подсветка)' },
    { key: 'slot2', label: 'Слот 2 — экстерьер спереди' },
    { key: 'slot3', label: 'Слот 3 — профиль с открытыми дверями' },
    { key: 'slot4', label: 'Слот 4 — панель / руль' },
    { key: 'slot5', label: 'Слот 5 — багажник' },
    { key: 'bonus', label: 'Бонус — экстерьер сзади' }
  ];

  function sectionFor(key) {
    if (key.indexOf('hero_') === 0) return 'Главный экран (Hero)';
    if (key.indexOf('services_') === 0 || key.indexOf('svc') === 0) return 'Услуги (карточки)';
    if (key.indexOf('standards') === 0) return 'Автопарк — стандарт подготовки';
    if (key.indexOf('fleet_') === 0 || key.indexOf('slide') === 0) return 'Автопарк';
    if (key.indexOf('pricing_') === 0) return 'Цены';
    if (key.indexOf('process_') === 0 || key.indexOf('step') === 0) return 'Как мы работаем';
    if (key.indexOf('b2b_') === 0) return 'Для бизнеса (B2B)';
    if (key.indexOf('faq_') === 0) return 'Вопросы (FAQ)';
    if (key.indexOf('tours_') === 0) return 'Страница туров (текст)';
    if (key.indexOf('final_') === 0) return 'Финальный блок';
    if (key.indexOf('footer_') === 0) return 'Футер';
    if (key.indexOf('sticky_') === 0) return 'Мобильная панель';
    if (key.indexOf('wa_') === 0) return 'Шаблоны сообщений WhatsApp';
    return 'Прочее';
  }

  function isLongField(key, value) {
    return (typeof value === 'string' && value.length > 60) || /text|subtitle|intro|note|security/.test(key);
  }

  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        if (k === 'class') node.className = attrs[k];
        else node.setAttribute(k, attrs[k]);
      });
    }
    (children || []).forEach(function (c) { node.appendChild(c); });
    return node;
  }

  function setStatus(msg, isError) {
    var status = document.getElementById('saveStatus');
    status.textContent = msg || '';
    status.style.color = isError ? '#ff8080' : '';
  }

  function markDirty() {
    dirty = true;
    setStatus('Есть несохранённые изменения');
  }

  // ---- Stats ----
  function renderStats(stats) {
    var grid = document.getElementById('statsGrid');
    grid.innerHTML = '';

    var days = stats.days || {};
    var dayKeys = Object.keys(days).sort();
    var todayKey = new Date().toISOString().slice(0, 10);
    var todayCount = days[todayKey] || 0;

    var last7 = dayKeys.slice(-7);
    var last7Total = last7.reduce(function (sum, k) { return sum + (days[k] || 0); }, 0);

    [
      { value: stats.total || 0, label: 'Всего просмотров' },
      { value: todayCount, label: 'Сегодня' },
      { value: last7Total, label: 'За последние 7 дней' }
    ].forEach(function (item) {
      grid.appendChild(el('div', { class: 'stat-card' }, [
        el('div', { class: 'stat-card__value' }, [document.createTextNode(String(item.value))]),
        el('div', { class: 'stat-card__label' }, [document.createTextNode(item.label)])
      ]));
    });

    if (last7.length) {
      var list = el('div', { class: 'stats-days' }, []);
      last7.slice().reverse().forEach(function (k) {
        var item = el('div', { class: 'stats-days__item' }, []);
        var b = el('b', {}, [document.createTextNode(String(days[k]))]);
        item.appendChild(b);
        item.appendChild(document.createTextNode(' — ' + k));
        list.appendChild(item);
      });
      grid.parentNode.appendChild(list);
    }

    document.getElementById('statsBlock').hidden = false;
  }

  // ---- Photos ----
  function renderPhotos() {
    var grid = document.getElementById('photoGrid');
    grid.innerHTML = '';
    PHOTO_SLOTS.forEach(function (slot) {
      var img = el('img', { class: 'photo-card__preview', src: content.images[slot.key] || '', alt: slot.label });
      var status = el('p', { class: 'photo-card__status' }, []);
      var fileInput = el('input', { type: 'file', accept: 'image/*', style: 'display:none' }, []);

      fileInput.addEventListener('change', function () {
        var file = fileInput.files && fileInput.files[0];
        if (!file) return;
        status.textContent = 'Обрабатываю…';
        resizeImageToDataUrl(file, 1600, 0.82)
          .then(function (dataUrl) {
            status.textContent = 'Загружаю…';
            return fetch('/api/upload', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ dataUrl: dataUrl, filename: slot.key + '.jpg' })
            });
          })
          .then(function (r) { return r.json().then(function (data) { return { ok: r.ok, data: data }; }); })
          .then(function (res) {
            if (!res.ok) throw new Error((res.data && res.data.error) || 'Ошибка загрузки');
            content.images[slot.key] = res.data.url;
            img.src = res.data.url;
            status.textContent = 'Загружено';
            markDirty();
          })
          .catch(function (err) {
            status.textContent = 'Ошибка: ' + err.message;
          });
      });

      var btn = el('button', { type: 'button', class: 'photo-card__btn' }, [document.createTextNode('Заменить фото')]);
      btn.addEventListener('click', function () { fileInput.click(); });

      var card = el('div', { class: 'photo-card' }, [
        img,
        el('div', { class: 'photo-card__body' }, [
          el('div', { class: 'photo-card__label' }, [document.createTextNode(slot.label)]),
          btn,
          fileInput,
          status
        ])
      ]);
      grid.appendChild(card);
    });
    document.getElementById('photosBlock').hidden = false;
  }

  function resizeImageToDataUrl(file, maxWidth, quality) {
    return new Promise(function (resolve, reject) {
      var reader = new FileReader();
      reader.onerror = function () { reject(new Error('Не удалось прочитать файл')); };
      reader.onload = function () {
        var image = new Image();
        image.onerror = function () { reject(new Error('Не удалось декодировать изображение')); };
        image.onload = function () {
          var scale = Math.min(1, maxWidth / image.width);
          var w = Math.round(image.width * scale);
          var h = Math.round(image.height * scale);
          var canvas = document.createElement('canvas');
          canvas.width = w;
          canvas.height = h;
          var ctx = canvas.getContext('2d');
          ctx.drawImage(image, 0, 0, w, h);
          resolve(canvas.toDataURL('image/jpeg', quality));
        };
        image.src = reader.result;
      };
      reader.readAsDataURL(file);
    });
  }

  // ---- Tours ----
  function newTourId() {
    return 't' + Date.now() + Math.random().toString(36).slice(2, 7);
  }

  function setToursStatus(msg, isError) {
    var status = document.getElementById('toursStatus');
    if (!status) return;
    status.textContent = msg || '';
    status.style.color = isError ? '#ff8080' : '';
  }

  function markToursDirty() {
    toursDirty = true;
    setToursStatus('Есть несохранённые изменения');
  }

  function renderTours() {
    var grid = document.getElementById('toursGrid');
    grid.innerHTML = '';

    tours.forEach(function (tour, index) {
      var img = el('img', { class: 'tour-editor__preview', src: tour.image || '', alt: 'Фото тура' });
      var photoStatus = el('p', { class: 'photo-card__status' }, []);
      var fileInput = el('input', { type: 'file', accept: 'image/*', style: 'display:none' }, []);

      fileInput.addEventListener('change', function () {
        var file = fileInput.files && fileInput.files[0];
        if (!file) return;
        photoStatus.textContent = 'Обрабатываю…';
        resizeImageToDataUrl(file, 1600, 0.82)
          .then(function (dataUrl) {
            photoStatus.textContent = 'Загружаю…';
            return fetch('/api/upload', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ dataUrl: dataUrl, filename: 'tour-' + tour.id + '.jpg' })
            });
          })
          .then(function (r) { return r.json().then(function (data) { return { ok: r.ok, data: data }; }); })
          .then(function (res) {
            if (!res.ok) throw new Error((res.data && res.data.error) || 'Ошибка загрузки');
            tour.image = res.data.url;
            img.src = res.data.url;
            photoStatus.textContent = 'Загружено';
            markToursDirty();
          })
          .catch(function (err) {
            photoStatus.textContent = 'Ошибка: ' + err.message;
          });
      });

      var photoBtn = el('button', { type: 'button', class: 'photo-card__btn' }, [document.createTextNode('Заменить фото')]);
      photoBtn.addEventListener('click', function () { fileInput.click(); });

      var fieldsWrap = el('div', { class: 'tour-editor__fields' }, []);
      ['en', 'ka', 'ru'].forEach(function (lang) {
        var titleInput = el('input', { type: 'text', placeholder: 'Название (' + lang.toUpperCase() + ')' }, []);
        titleInput.value = tour.title[lang] || '';
        titleInput.addEventListener('input', function () {
          tour.title[lang] = titleInput.value;
          markToursDirty();
        });
        var descInput = el('textarea', { placeholder: 'Описание (' + lang.toUpperCase() + ')' }, []);
        descInput.value = tour.description[lang] || '';
        descInput.addEventListener('input', function () {
          tour.description[lang] = descInput.value;
          markToursDirty();
        });
        fieldsWrap.appendChild(el('div', { class: 'field-row' }, [
          el('label', {}, [document.createTextNode('Название (' + lang.toUpperCase() + ')')]),
          titleInput
        ]));
        fieldsWrap.appendChild(el('div', { class: 'field-row' }, [
          el('label', {}, [document.createTextNode('Описание (' + lang.toUpperCase() + ')')]),
          descInput
        ]));
      });

      var removeBtn = el('button', { type: 'button', class: 'photo-card__btn tour-editor__remove' }, [document.createTextNode('Удалить тур')]);
      removeBtn.addEventListener('click', function () {
        if (!confirm('Удалить этот тур?')) return;
        tours.splice(index, 1);
        markToursDirty();
        renderTours();
      });

      var card = el('div', { class: 'tour-editor' }, [
        el('div', { class: 'tour-editor__photo' }, [img, photoBtn, fileInput, photoStatus]),
        fieldsWrap,
        removeBtn
      ]);
      grid.appendChild(card);
    });

    document.getElementById('toursBlock').hidden = false;
  }

  function initTours() {
    document.getElementById('addTourBtn').addEventListener('click', function () {
      tours.push({ id: newTourId(), image: '', title: { en: '', ka: '', ru: '' }, description: { en: '', ka: '', ru: '' } });
      markToursDirty();
      renderTours();
    });

    document.getElementById('saveToursBtn').addEventListener('click', function () {
      var btn = document.getElementById('saveToursBtn');
      btn.disabled = true;
      setToursStatus('Сохраняю…');
      fetch('/api/tours', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tours)
      })
        .then(function (r) { return r.json().then(function (data) { return { ok: r.ok, data: data }; }); })
        .then(function (res) {
          btn.disabled = false;
          if (!res.ok) throw new Error((res.data && res.data.error) || 'Ошибка сохранения');
          toursDirty = false;
          setToursStatus('Сохранено ✓');
        })
        .catch(function (err) {
          btn.disabled = false;
          setToursStatus('Ошибка: ' + err.message, true);
        });
    });
  }

  // ---- Text fields ----
  function renderFields() {
    var wrap = document.getElementById('fieldsWrap');
    wrap.innerHTML = '';

    ['en', 'ka', 'ru'].forEach(function (lang) {
      var langWrap = el('div', { class: 'lang-fields' + (lang === activeLang ? ' is-active' : ''), 'data-lang': lang }, []);
      var dict = content[lang];
      var sections = {};
      var order = [];

      Object.keys(dict).forEach(function (key) {
        var section = sectionFor(key);
        if (!sections[section]) { sections[section] = []; order.push(section); }
        sections[section].push(key);
      });

      order.forEach(function (section) {
        var fieldset = el('div', { class: 'field-section' }, [
          el('div', { class: 'field-section__title' }, [document.createTextNode(section)])
        ]);
        sections[section].forEach(function (key) {
          var value = dict[key];
          var inputEl;
          if (isLongField(key, value)) {
            inputEl = el('textarea', { id: 'f_' + lang + '_' + key }, []);
            inputEl.value = value;
          } else {
            inputEl = el('input', { type: 'text', id: 'f_' + lang + '_' + key }, []);
            inputEl.value = value;
          }
          inputEl.addEventListener('input', function () {
            content[lang][key] = inputEl.value;
            markDirty();
          });
          var row = el('div', { class: 'field-row' }, [
            el('label', { for: 'f_' + lang + '_' + key }, [document.createTextNode(key)]),
            inputEl
          ]);
          fieldset.appendChild(row);
        });
        langWrap.appendChild(fieldset);
      });

      wrap.appendChild(langWrap);
    });

    document.getElementById('textsBlock').hidden = false;
  }

  function initLangTabs() {
    var tabs = document.getElementById('langTabs');
    tabs.querySelectorAll('button').forEach(function (btn) {
      btn.addEventListener('click', function () {
        activeLang = btn.getAttribute('data-lang');
        tabs.querySelectorAll('button').forEach(function (b) {
          b.classList.toggle('is-active', b === btn);
        });
        document.querySelectorAll('.lang-fields').forEach(function (el2) {
          el2.classList.toggle('is-active', el2.getAttribute('data-lang') === activeLang);
        });
      });
    });
  }

  // ---- Save ----
  function initSave() {
    document.getElementById('saveBtn').addEventListener('click', function () {
      var btn = document.getElementById('saveBtn');
      btn.disabled = true;
      setStatus('Сохраняю…');
      fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content)
      })
        .then(function (r) { return r.json().then(function (data) { return { ok: r.ok, data: data }; }); })
        .then(function (res) {
          btn.disabled = false;
          if (!res.ok) throw new Error((res.data && res.data.error) || 'Ошибка сохранения');
          dirty = false;
          setStatus('Сохранено ✓');
        })
        .catch(function (err) {
          btn.disabled = false;
          setStatus('Ошибка: ' + err.message, true);
        });
    });

    window.addEventListener('beforeunload', function (e) {
      if (dirty || toursDirty) { e.preventDefault(); e.returnValue = ''; }
    });
  }

  // ---- Boot / auth ----
  function showLogin() {
    document.getElementById('loginScreen').hidden = false;
    document.getElementById('editorScreen').hidden = true;
  }

  function showEditor() {
    document.getElementById('loginScreen').hidden = true;
    document.getElementById('editorScreen').hidden = false;
    document.getElementById('editorLoading').hidden = false;

    fetch('/api/content', { cache: 'no-store' })
      .then(function (r) { return r.json(); })
      .then(function (data) {
        content = data;
        document.getElementById('editorLoading').hidden = true;
        renderPhotos();
        initLangTabs();
        renderFields();
        initSave();
        document.getElementById('saveBar').hidden = false;
      })
      .catch(function () {
        document.getElementById('editorLoading').textContent = 'Не удалось загрузить контент.';
      });

    fetch('/api/stats', { cache: 'no-store' })
      .then(function (r) { return r.json(); })
      .then(function (data) { renderStats(data || { total: 0, days: {} }); })
      .catch(function () {});

    fetch('/api/tours', { cache: 'no-store' })
      .then(function (r) { return r.json(); })
      .then(function (data) {
        tours = Array.isArray(data) ? data : [];
        initTours();
        renderTours();
      })
      .catch(function () {});
  }

  function initLogin() {
    var form = document.getElementById('loginForm');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = document.getElementById('loginBtn');
      var errorEl = document.getElementById('loginError');
      var password = document.getElementById('passwordInput').value;
      btn.disabled = true;
      errorEl.textContent = '';
      fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: password })
      })
        .then(function (r) { return r.json().then(function (data) { return { ok: r.ok, data: data }; }); })
        .then(function (res) {
          btn.disabled = false;
          if (!res.ok) {
            errorEl.textContent = (res.data && res.data.error) || 'Ошибка входа';
            return;
          }
          showEditor();
        })
        .catch(function () {
          btn.disabled = false;
          errorEl.textContent = 'Ошибка сети';
        });
    });
  }

  function initLogout() {
    document.getElementById('logoutBtn').addEventListener('click', function () {
      if (dirty && !confirm('Есть несохранённые изменения. Выйти без сохранения?')) return;
      fetch('/api/logout', { method: 'POST' }).then(function () {
        window.location.reload();
      });
    });
  }

  function init() {
    initLogin();
    initLogout();
    fetch('/api/session', { cache: 'no-store' })
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (data && data.authorized) showEditor();
        else showLogin();
      })
      .catch(function () { showLogin(); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

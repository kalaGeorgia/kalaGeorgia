(function () {
  'use strict';

  var gallery = { photos: [], videos: [] };
  var loaded = false;

  function currentLang() {
    return (window.KALA && window.KALA.currentLang) || 'en';
  }

  function textFor(field, lang) {
    if (!field) return '';
    return field[lang] || field.en || '';
  }

  function extractYouTubeId(url) {
    if (!url) return '';
    var m = String(url).match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    return m ? m[1] : '';
  }

  function openLightbox(node) {
    var overlay = document.getElementById('lightbox');
    var body = document.getElementById('lightboxBody');
    if (!overlay || !body) return;
    body.innerHTML = '';
    body.appendChild(node);
    overlay.hidden = false;
  }

  function closeLightbox() {
    var overlay = document.getElementById('lightbox');
    var body = document.getElementById('lightboxBody');
    if (!overlay || !body) return;
    overlay.hidden = true;
    body.innerHTML = '';
  }

  function initLightbox() {
    var overlay = document.getElementById('lightbox');
    var closeBtn = document.getElementById('lightboxClose');
    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (overlay) {
      overlay.addEventListener('click', function (e) {
        if (e.target === overlay) closeLightbox();
      });
    }
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeLightbox();
    });
  }

  function initTabs() {
    var tabs = document.getElementById('galleryTabs');
    if (!tabs) return;
    tabs.querySelectorAll('button').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var target = btn.getAttribute('data-tab');
        tabs.querySelectorAll('button').forEach(function (b) {
          b.classList.toggle('is-active', b === btn);
        });
        document.querySelectorAll('.gallery__panel').forEach(function (panel) {
          panel.classList.toggle('is-active', panel.getAttribute('data-panel') === target);
        });
      });
    });
  }

  function renderPhotos() {
    var grid = document.getElementById('galleryPhotoGrid');
    var empty = document.getElementById('galleryPhotosEmpty');
    var loading = document.getElementById('galleryPhotosLoading');
    if (!grid) return;
    if (loading) loading.hidden = true;

    if (!gallery.photos.length) {
      grid.hidden = true;
      if (empty) empty.hidden = false;
      return;
    }

    if (empty) empty.hidden = true;
    grid.hidden = false;
    grid.innerHTML = '';
    var lang = currentLang();

    gallery.photos.forEach(function (photo) {
      var caption = textFor(photo.caption, lang);
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'gallery__photo';

      var thumb = document.createElement('div');
      thumb.className = 'gallery__photo-thumb';
      var img = document.createElement('img');
      img.src = photo.url || '';
      img.alt = caption;
      img.loading = 'lazy';
      thumb.appendChild(img);
      btn.appendChild(thumb);

      if (caption) {
        var captionEl = document.createElement('div');
        captionEl.className = 'gallery__photo-caption';
        captionEl.textContent = caption;
        btn.appendChild(captionEl);
      }

      btn.addEventListener('click', function () {
        var wrap = document.createElement('div');
        var fullImg = document.createElement('img');
        fullImg.src = photo.url || '';
        fullImg.alt = caption;
        wrap.appendChild(fullImg);
        if (caption) {
          var lightboxCaption = document.createElement('p');
          lightboxCaption.className = 'lightbox__caption';
          lightboxCaption.textContent = caption;
          wrap.appendChild(lightboxCaption);
        }
        openLightbox(wrap);
      });

      grid.appendChild(btn);
    });
  }

  function renderVideos() {
    var grid = document.getElementById('galleryVideoGrid');
    var empty = document.getElementById('galleryVideosEmpty');
    var loading = document.getElementById('galleryVideosLoading');
    if (!grid) return;
    if (loading) loading.hidden = true;

    if (!gallery.videos.length) {
      grid.hidden = true;
      if (empty) empty.hidden = false;
      return;
    }

    if (empty) empty.hidden = true;
    grid.hidden = false;
    grid.innerHTML = '';
    var lang = currentLang();

    gallery.videos.forEach(function (video) {
      var title = textFor(video.title, lang);
      var videoId = extractYouTubeId(video.youtubeUrl);
      if (!videoId) return;

      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'gallery__video';

      var thumb = document.createElement('div');
      thumb.className = 'gallery__video-thumb';
      var img = document.createElement('img');
      img.src = 'https://img.youtube.com/vi/' + videoId + '/hqdefault.jpg';
      img.alt = title;
      img.loading = 'lazy';
      thumb.appendChild(img);
      var play = document.createElement('div');
      play.className = 'gallery__video-play';
      play.innerHTML = '<span><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></span>';
      thumb.appendChild(play);
      btn.appendChild(thumb);

      if (title) {
        var titleEl = document.createElement('div');
        titleEl.className = 'gallery__video-title';
        titleEl.textContent = title;
        btn.appendChild(titleEl);
      }

      btn.addEventListener('click', function () {
        var frame = document.createElement('div');
        frame.className = 'lightbox__video-frame';
        var iframe = document.createElement('iframe');
        iframe.src = 'https://www.youtube.com/embed/' + videoId + '?autoplay=1';
        iframe.title = title;
        iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
        iframe.allowFullscreen = true;
        frame.appendChild(iframe);
        openLightbox(frame);
      });

      grid.appendChild(btn);
    });
  }

  function render() {
    renderPhotos();
    renderVideos();
  }

  function load() {
    fetch('/api/gallery', { cache: 'no-store' })
      .then(function (r) { return r.ok ? r.json() : { photos: [], videos: [] }; })
      .then(function (data) {
        gallery = {
          photos: Array.isArray(data.photos) ? data.photos : [],
          videos: Array.isArray(data.videos) ? data.videos : []
        };
        loaded = true;
        render();
      })
      .catch(function () {
        gallery = { photos: [], videos: [] };
        loaded = true;
        render();
      });
  }

  window.addEventListener('kala:langchange', function () {
    if (loaded) render();
  });

  function init() {
    initTabs();
    initLightbox();
    load();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

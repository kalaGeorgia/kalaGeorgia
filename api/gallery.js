const { readGallery, writeGallery } = require('../lib/blob');
const { isAuthorized } = require('../lib/auth');

function sanitizePhoto(p) {
  p = p || {};
  const caption = p.caption || {};
  return {
    id: String(p.id || ('p' + Date.now() + Math.random().toString(36).slice(2))),
    url: typeof p.url === 'string' ? p.url : '',
    caption: { en: String(caption.en || ''), ka: String(caption.ka || ''), ru: String(caption.ru || '') }
  };
}

function sanitizeVideo(v) {
  v = v || {};
  const title = v.title || {};
  return {
    id: String(v.id || ('v' + Date.now() + Math.random().toString(36).slice(2))),
    youtubeUrl: typeof v.youtubeUrl === 'string' ? v.youtubeUrl : '',
    title: { en: String(title.en || ''), ka: String(title.ka || ''), ru: String(title.ru || '') }
  };
}

module.exports = async function handler(req, res) {
  if (req.method === 'GET') {
    const gallery = await readGallery();
    res.setHeader('Cache-Control', 'no-store');
    res.status(200).json(gallery);
    return;
  }

  if (req.method === 'POST') {
    if (!isAuthorized(req)) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }
    let body = req.body;
    if (!body || typeof body === 'string') {
      try { body = JSON.parse(body || '{}'); } catch (e) { body = {}; }
    }
    if (!body || typeof body !== 'object') {
      res.status(400).json({ error: 'Invalid gallery payload' });
      return;
    }
    const clean = {
      photos: Array.isArray(body.photos) ? body.photos.map(sanitizePhoto) : [],
      videos: Array.isArray(body.videos) ? body.videos.map(sanitizeVideo) : []
    };
    await writeGallery(clean);
    res.status(200).json({ ok: true });
    return;
  }

  res.status(405).json({ error: 'Method not allowed' });
};

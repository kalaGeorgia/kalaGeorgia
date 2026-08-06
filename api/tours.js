const { readTours, writeTours } = require('../lib/blob');
const { isAuthorized } = require('../lib/auth');

function sanitizeTour(t) {
  t = t || {};
  const title = t.title || {};
  const description = t.description || {};
  return {
    id: String(t.id || ('t' + Date.now() + Math.random().toString(36).slice(2))),
    image: typeof t.image === 'string' ? t.image : '',
    title: { en: String(title.en || ''), ka: String(title.ka || ''), ru: String(title.ru || '') },
    description: { en: String(description.en || ''), ka: String(description.ka || ''), ru: String(description.ru || '') }
  };
}

module.exports = async function handler(req, res) {
  if (req.method === 'GET') {
    const tours = await readTours();
    res.setHeader('Cache-Control', 'no-store');
    res.status(200).json(tours);
    return;
  }

  if (req.method === 'POST') {
    if (!isAuthorized(req)) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }
    let body = req.body;
    if (!body || typeof body === 'string') {
      try { body = JSON.parse(body || '[]'); } catch (e) { body = []; }
    }
    if (!Array.isArray(body)) {
      res.status(400).json({ error: 'Invalid tours payload' });
      return;
    }
    const clean = body.map(sanitizeTour);
    await writeTours(clean);
    res.status(200).json({ ok: true });
    return;
  }

  res.status(405).json({ error: 'Method not allowed' });
};

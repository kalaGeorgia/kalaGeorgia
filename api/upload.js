const { put } = require('@vercel/blob');
const { isAuthorized } = require('../lib/auth');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  if (!isAuthorized(req)) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  let body = req.body;
  if (!body || typeof body === 'string') {
    try { body = JSON.parse(body || '{}'); } catch (e) { body = {}; }
  }

  const dataUrl = body && body.dataUrl;
  const filename = (body && body.filename) || 'photo';

  if (!dataUrl || typeof dataUrl !== 'string' || dataUrl.indexOf('data:') !== 0) {
    res.status(400).json({ error: 'Missing image data' });
    return;
  }

  const match = /^data:(.+?);base64,(.*)$/.exec(dataUrl);
  if (!match) {
    res.status(400).json({ error: 'Invalid data URL' });
    return;
  }

  const contentType = match[1];
  const buffer = Buffer.from(match[2], 'base64');

  if (buffer.length > 8 * 1024 * 1024) {
    res.status(413).json({ error: 'Image too large (max 8MB)' });
    return;
  }

  const safeName = String(filename).replace(/[^a-zA-Z0-9._-]/g, '-');
  const pathname = 'images/' + Date.now() + '-' + safeName;

  const blob = await put(pathname, buffer, { access: 'public', contentType: contentType });
  res.status(200).json({ ok: true, url: blob.url });
};

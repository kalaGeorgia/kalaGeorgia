const defaultContent = require('../content.default.json');
const { readContent, writeContent } = require('../lib/blob');
const { isAuthorized } = require('../lib/auth');

module.exports = async function handler(req, res) {
  if (req.method === 'GET') {
    const content = await readContent(defaultContent);
    res.setHeader('Cache-Control', 'no-store');
    res.status(200).json(content);
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
    if (!body || typeof body !== 'object' || !body.en || !body.ka || !body.ru) {
      res.status(400).json({ error: 'Invalid content payload' });
      return;
    }
    await writeContent(body);
    res.status(200).json({ ok: true });
    return;
  }

  res.status(405).json({ error: 'Method not allowed' });
};

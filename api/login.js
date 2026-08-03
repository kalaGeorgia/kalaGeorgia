const { makeSessionToken } = require('../lib/auth');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  let body = req.body;
  if (!body || typeof body === 'string') {
    try { body = JSON.parse(body || '{}'); } catch (e) { body = {}; }
  }

  const password = body && body.password;
  const expected = process.env.ADMIN_PASSWORD;

  if (!expected) {
    res.status(500).json({ error: 'Admin password is not configured on the server' });
    return;
  }
  if (!password || password !== expected) {
    res.status(401).json({ error: 'Invalid password' });
    return;
  }

  const token = makeSessionToken();
  res.setHeader(
    'Set-Cookie',
    'kala_admin=' + encodeURIComponent(token) + '; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=604800'
  );
  res.status(200).json({ ok: true });
};

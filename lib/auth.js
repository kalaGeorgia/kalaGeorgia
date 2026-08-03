const crypto = require('crypto');

function getSecret() {
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || 'kala-dev-secret';
}

function sign(value) {
  const h = crypto.createHmac('sha256', getSecret()).update(value).digest('hex');
  return value + '.' + h;
}

function verify(token) {
  if (!token) return false;
  const idx = token.lastIndexOf('.');
  if (idx === -1) return false;
  const value = token.slice(0, idx);
  const sig = token.slice(idx + 1);
  const expected = crypto.createHmac('sha256', getSecret()).update(value).digest('hex');
  if (sig.length !== expected.length) return false;
  let ok = false;
  try {
    ok = crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
  } catch (e) {
    return false;
  }
  if (!ok) return false;
  const ts = parseInt(value, 10);
  if (!ts || Date.now() - ts > 1000 * 60 * 60 * 24 * 7) return false; // 7 days
  return true;
}

function makeSessionToken() {
  return sign(String(Date.now()));
}

function parseCookies(req) {
  const header = (req.headers && req.headers.cookie) || '';
  const out = {};
  header.split(';').forEach(function (pair) {
    const idx = pair.indexOf('=');
    if (idx === -1) return;
    const k = pair.slice(0, idx).trim();
    const v = pair.slice(idx + 1).trim();
    out[k] = decodeURIComponent(v);
  });
  return out;
}

function isAuthorized(req) {
  const cookies = parseCookies(req);
  return verify(cookies.kala_admin);
}

module.exports = { sign, verify, makeSessionToken, parseCookies, isAuthorized };

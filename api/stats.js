const { readStats } = require('../lib/blob');
const { isAuthorized } = require('../lib/auth');

module.exports = async function handler(req, res) {
  if (!isAuthorized(req)) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }
  const stats = await readStats();
  res.setHeader('Cache-Control', 'no-store');
  res.status(200).json(stats);
};

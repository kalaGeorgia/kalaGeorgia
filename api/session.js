const { isAuthorized } = require('../lib/auth');

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  res.status(200).json({ authorized: isAuthorized(req) });
};

const { readStats, writeStats } = require('../lib/blob');

function todayKey() {
  return new Date().toISOString().slice(0, 10); // YYYY-MM-DD (UTC)
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const stats = await readStats();
    const day = todayKey();
    stats.total = (stats.total || 0) + 1;
    stats.days = stats.days || {};
    stats.days[day] = (stats.days[day] || 0) + 1;

    // keep only the most recent 60 days to stop the file growing forever
    const keys = Object.keys(stats.days).sort();
    if (keys.length > 60) {
      keys.slice(0, keys.length - 60).forEach(function (k) { delete stats.days[k]; });
    }

    await writeStats(stats);
    res.status(200).json({ ok: true });
  } catch (e) {
    // Never let tracking failures affect the visitor's experience.
    res.status(200).json({ ok: false });
  }
};

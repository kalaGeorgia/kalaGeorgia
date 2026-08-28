const { readFleet, writeFleet } = require('../lib/blob');
const { isAuthorized } = require('../lib/auth');

const DEFAULT_FLEET = [
  { id: 'f1', image: '/images/Toyota%20Camry.jpg', name: 'Toyota Camry', year: '2020', color: 'black', category: 'sedan', max: '2', priceAirport: '100', priceGudauri: '350', priceKutaisi: '600', priceFullday: '400' },
  { id: 'f2', image: '/images/Mercedes-Benz%20S-Class%20VIP.jpg', name: 'Mercedes-Benz S-Class VIP', year: '2018', color: 'black', category: 'sedan', max: '3', priceAirport: '300', priceGudauri: '700', priceKutaisi: '1400', priceFullday: '750' },
  { id: 'f3', image: '/images/Toyota%20Alphard%202018%20Business.webp', name: 'Toyota Alphard Business', year: '2018', color: 'black', category: 'minivan', max: '5', priceAirport: '120', priceGudauri: '350', priceKutaisi: '600', priceFullday: '' },
  { id: 'f4', image: '/images/Mercedes-Benz%20VITO.webp', name: 'Mercedes-Benz VITO', year: '2013', color: '', category: 'minivan', max: '6', priceAirport: '150', priceGudauri: '450', priceKutaisi: '800', priceFullday: '' },
  { id: 'f5', image: '/images/Mercedes-Benz%20V-CLASS%20VIP.png', name: 'Mercedes-Benz V-Class VIP', year: '2018', color: 'black', category: 'minivan', max: '6', priceAirport: '250', priceGudauri: '600', priceKutaisi: '1000', priceFullday: '550' },
  { id: 'f6', image: '/images/Mercedes-Benz%20SPRINTER.jpg', name: 'Mercedes-Benz Sprinter', year: '2016', color: 'white', category: 'minibus', max: '12', priceAirport: '200', priceGudauri: '600', priceKutaisi: '1000', priceFullday: '500' },
  { id: 'f7', image: '/images/Mercedes-Benz%20SPRINTER%20LONG.jpg', name: 'Mercedes-Benz Sprinter Long', year: '2015', color: '', category: 'bus', max: '20', priceAirport: '250', priceGudauri: '700', priceKutaisi: '1200', priceFullday: '550' },
  { id: 'f8', image: '/images/Mercedes-Benz%20SPRINTER%20VIP.png', name: 'Mercedes-Benz Sprinter VIP', year: '2022', color: 'black', category: 'bus', max: '16', priceAirport: '350', priceGudauri: '1000', priceKutaisi: '1700', priceFullday: '750' }
];

const CATEGORIES = ['sedan', 'minivan', 'minibus', 'bus'];
const COLORS = ['', 'black', 'white'];

function sanitizeCar(c) {
  c = c || {};
  return {
    id: String(c.id || ('f' + Date.now() + Math.random().toString(36).slice(2))),
    image: typeof c.image === 'string' ? c.image : '',
    name: String(c.name || ''),
    year: String(c.year || ''),
    color: COLORS.indexOf(c.color) !== -1 ? c.color : '',
    category: CATEGORIES.indexOf(c.category) !== -1 ? c.category : 'sedan',
    max: String(c.max || ''),
    priceAirport: String(c.priceAirport || ''),
    priceGudauri: String(c.priceGudauri || ''),
    priceKutaisi: String(c.priceKutaisi || ''),
    priceFullday: String(c.priceFullday || '')
  };
}

module.exports = async function handler(req, res) {
  if (req.method === 'GET') {
    const stored = await readFleet();
    const fleet = stored === null ? DEFAULT_FLEET : stored;
    res.setHeader('Cache-Control', 'no-store');
    res.status(200).json(fleet);
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
      res.status(400).json({ error: 'Invalid fleet payload' });
      return;
    }
    const clean = body.map(sanitizeCar);
    await writeFleet(clean);
    res.status(200).json({ ok: true });
    return;
  }

  res.status(405).json({ error: 'Method not allowed' });
};

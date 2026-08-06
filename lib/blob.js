const { put, list } = require('@vercel/blob');

const CONTENT_PATH = 'data/content.json';

async function getContentBlobUrl() {
  const { blobs } = await list({ prefix: CONTENT_PATH });
  const match = blobs.find(function (b) { return b.pathname === CONTENT_PATH; });
  return match ? match.url : null;
}

async function readContent(defaultContent) {
  try {
    const url = await getContentBlobUrl();
    if (!url) return defaultContent;
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) return defaultContent;
    const data = await res.json();
    if (!data || typeof data !== 'object') return defaultContent;
    return data;
  } catch (e) {
    return defaultContent;
  }
}

async function writeContent(content) {
  await put(CONTENT_PATH, JSON.stringify(content), {
    access: 'public',
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: 'application/json'
  });
}

const STATS_PATH = 'data/stats.json';

async function getStatsBlobUrl() {
  const { blobs } = await list({ prefix: STATS_PATH });
  const match = blobs.find(function (b) { return b.pathname === STATS_PATH; });
  return match ? match.url : null;
}

async function readStats() {
  var empty = { total: 0, days: {} };
  try {
    const url = await getStatsBlobUrl();
    if (!url) return empty;
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) return empty;
    const data = await res.json();
    if (!data || typeof data !== 'object') return empty;
    return { total: data.total || 0, days: data.days || {} };
  } catch (e) {
    return empty;
  }
}

async function writeStats(stats) {
  await put(STATS_PATH, JSON.stringify(stats), {
    access: 'public',
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: 'application/json'
  });
}

const TOURS_PATH = 'data/tours.json';

async function getToursBlobUrl() {
  const { blobs } = await list({ prefix: TOURS_PATH });
  const match = blobs.find(function (b) { return b.pathname === TOURS_PATH; });
  return match ? match.url : null;
}

async function readTours() {
  try {
    const url = await getToursBlobUrl();
    if (!url) return [];
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (e) {
    return [];
  }
}

async function writeTours(tours) {
  await put(TOURS_PATH, JSON.stringify(tours), {
    access: 'public',
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: 'application/json'
  });
}

module.exports = { readContent, writeContent, getContentBlobUrl, CONTENT_PATH, readStats, writeStats, STATS_PATH, readTours, writeTours, TOURS_PATH };

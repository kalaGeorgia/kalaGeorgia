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

module.exports = { readContent, writeContent, getContentBlobUrl, CONTENT_PATH };

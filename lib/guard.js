/**
 * Wraps an API handler so it always answers with JSON.
 *
 * Without this, a throw inside a handler reaches Vercel's generic error page,
 * which is HTML. The admin panel does `response.json()` on every reply, so the
 * real failure surfaced as "Unexpected token 'A', \"A server e\"... is not
 * valid JSON" — an error message that says nothing about what went wrong.
 *
 * The most common cause is the Vercel Blob store not being connected to the
 * project, which makes every write throw, so that case is named explicitly.
 */
function withJsonErrors(handler) {
  return async function (req, res) {
    try {
      await handler(req, res);
    } catch (e) {
      const message = (e && e.message) || 'Unknown error';

      if (!process.env.BLOB_READ_WRITE_TOKEN) {
        res.status(500).json({
          error:
            'Storage is not configured: BLOB_READ_WRITE_TOKEN is missing on the server. ' +
            'Connect a Vercel Blob store to this project and redeploy. Nothing was saved.'
        });
        return;
      }

      res.status(500).json({
        error: 'Storage error: ' + message + '. Nothing was saved.'
      });
    }
  };
}

module.exports = { withJsonErrors };

/**
 * Central client-side fetch helper for calling API routes.
 * - handles JSON stringify/parse
 * - sets sensible headers
 * - throws a normalized error on non-2xx responses
 */
export default async function fetchDataFromApi(path, { method = 'GET', body = null, headers = {}, credentials = 'include', timeout = 0 } = {}) {
  const opts = {
    method,
    headers: { 'Content-Type': 'application/json', ...headers },
    credentials,
  };

  if (body !== null) opts.body = JSON.stringify(body);

  const controller = timeout ? new AbortController() : null;
  if (controller) {
    opts.signal = controller.signal;
    setTimeout(() => controller.abort(), timeout);
  }

  const res = await fetch(path, opts);
  const text = await res.text();
  let data = null;
  try { data = text ? JSON.parse(text) : null; } catch (e) { data = text; }

  if (!res.ok) {
    const err = new Error((data && data.message) || res.statusText || 'Request failed');
    err.status = res.status;
    err.body = data;
    throw err;
  }

  return data;
}

import { storage } from '../utils/storage';

/**
 * Determine API base URL with backward compatibility:
 * - Prefer REACT_APP_API_BASE_URL
 * - Fallback to REACT_APP_API_BASE
 * - Default to '/api'
 */
const RAW_BASE =
  process.env.REACT_APP_API_BASE_URL ||
  process.env.REACT_APP_API_BASE ||
  '/api';

// Emit a console warning if base URL envs are not set as expected
if (!process.env.REACT_APP_API_BASE_URL && !process.env.REACT_APP_API_BASE) {
  // eslint-disable-next-line no-console
  console.warn('[api] REACT_APP_API_BASE_URL not set; defaulting to relative "/api". Set REACT_APP_API_BASE_URL (e.g., https://backend:3001/api)');
}

/**
 * Normalize base URL:
 * - Trim whitespace
 * - Remove trailing slash
 * - Ensure that '/api' path segment is present. If not present, append it.
 *   Examples:
 *    'https://host:3001' -> 'https://host:3001/api'
 *    'https://host:3001/api/' -> 'https://host:3001/api'
 *    '/backend' -> '/backend/api'
 *    '/api' -> '/api'
 */
function normalizeBase(base) {
  if (!base) return '/api';
  let b = String(base).trim();
  if (b.length > 1 && b.endsWith('/')) b = b.slice(0, -1);
  // If base already ends with '/api' or contains '/api' as the last segment, keep as-is
  const hasApi = /(^|\/)api$/.test(b);
  if (!hasApi) {
    b = `${b}/api`;
  }
  // Ensure single leading slash for relative bases
  if (!/^https?:\/\//i.test(b)) {
    if (!b.startsWith('/')) b = `/${b}`;
    // collapse double slashes except after protocol
    b = b.replace(/\/{2,}/g, '/');
  }
  return b;
}

// If callers accidentally pass a path beginning with '/api/...', strip the extra '/api'
function normalizePath(path) {
  let p = String(path || '');
  // Disallow absolute URLs to avoid bypassing BASE_URL and causing CORS/method issues
  if (/^https?:\/\//i.test(p)) {
    throw new Error('Absolute URLs are not allowed in api client paths. Provide a relative API path like "/auth/register/".');
  }
  if (!p.startsWith('/')) p = `/${p}`;
  // prevent double /api when base already ends with /api
  if (p.startsWith('/api/')) p = p.replace(/^\/api/, '');

  // Force trailing slash for auth POST endpoints to avoid APPEND_SLASH redirect on POST
  const needsSlash = [
    '/auth/token',
    '/auth/login',
    '/auth/register',
    '/auth/token/refresh',
    '/auth/token/verify',
  ];
  const withoutSlash = p.endsWith('/') ? p.slice(0, -1) : p;
  if (needsSlash.includes(withoutSlash)) {
    p = `${withoutSlash}/`;
  }
  return p;
}

const BASE_URL = normalizeBase(RAW_BASE);

async function parseJSON(res) {
  const text = await res.text();
  try { return text ? JSON.parse(text) : {}; } catch { return { message: text }; }
}

function buildHeaders(extra = {}) {
  const token = storage.get('accessToken');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...extra,
  };
  return headers;
}

async function doFetch(path, options = {}, retry = true) {
  const normalizedPath = normalizePath(path);
  const res = await fetch(`${BASE_URL}${normalizedPath}`, { ...options, headers: buildHeaders(options.headers) });
  if (res.status === 401 && retry) {
    // try refresh
    const refreshToken = storage.get('refreshToken');
    if (refreshToken) {
      const rr = await fetch(`${BASE_URL}/auth/token/refresh/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh: refreshToken }),
      });
      if (rr.ok) {
        const data = await rr.json();
        if (data?.access) {
          storage.set('accessToken', data.access);
          // retry original
          return doFetch(path, options, false);
        }
      } else {
        storage.clearAll();
        throw new Error('Session expired. Please sign in again.');
      }
    }
  }
  return res;
}

// PUBLIC_INTERFACE
export const api = {
  /** Performs GET request with JWT header and returns JSON result. */
  async get(path) {
    const res = await doFetch(path, { method: 'GET' });
    const data = await parseJSON(res);
    if (!res.ok) throw Object.assign(new Error(data?.message || 'Request failed'), { status: res.status, data });
    return data;
  },
  // PUBLIC_INTERFACE
  /** Performs POST request with JWT header and returns JSON result. */
  async post(path, body) {
    const res = await doFetch(path, { method: 'POST', body: JSON.stringify(body) });
    const data = await parseJSON(res);
    if (!res.ok) throw Object.assign(new Error(data?.message || 'Request failed'), { status: res.status, data });
    return data;
  },
  // PUBLIC_INTERFACE
  /** Performs PUT request with JWT header and returns JSON result. */
  async put(path, body) {
    const res = await doFetch(path, { method: 'PUT', body: JSON.stringify(body) });
    const data = await parseJSON(res);
    if (!res.ok) throw Object.assign(new Error(data?.message || 'Request failed'), { status: res.status, data });
    return data;
  },
  // PUBLIC_INTERFACE
  /** Performs PATCH request with JWT header and returns JSON result. */
  async patch(path, body) {
    const res = await doFetch(path, { method: 'PATCH', body: JSON.stringify(body) });
    const data = await parseJSON(res);
    if (!res.ok) throw Object.assign(new Error(data?.message || 'Request failed'), { status: res.status, data });
    return data;
  },
  // PUBLIC_INTERFACE
  /** Performs DELETE request with JWT header and returns JSON result. */
  async del(path) {
    const res = await doFetch(path, { method: 'DELETE' });
    const data = await parseJSON(res);
    if (!res.ok) throw Object.assign(new Error(data?.message || 'Request failed'), { status: res.status, data });
    return data;
  },
};

export function getBrand() {
  return process.env.REACT_APP_BRAND_NAME || 'Ocean LMS';
}

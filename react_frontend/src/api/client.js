import { storage } from '../utils/storage';

const BASE_URL = process.env.REACT_APP_API_BASE_URL || '/api';

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
  const res = await fetch(`${BASE_URL}${path}`, { ...options, headers: buildHeaders(options.headers) });
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

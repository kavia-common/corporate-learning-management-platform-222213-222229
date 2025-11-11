import React, { createContext, useState, useContext } from 'react';

// PUBLIC_INTERFACE
export const AuthContext = createContext(null);

/** PUBLIC_INTERFACE
 * AuthProvider supplies login/register using canonical URLs and surfaces request diagnostics.
 */
export function AuthProvider({ children }) {
  const [diag, setDiag] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const canonicalBase = ''; // same-origin
  const endpoints = {
    token: '/api/auth/token/',
    register: '/api/auth/register/',
  };

  async function doFetch(url, method, bodyObj) {
    const body = bodyObj ? JSON.stringify(bodyObj) : undefined;
    setDiag({ url, method, bodyPreviewKeys: bodyObj ? Object.keys(bodyObj) : [] });
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body,
    });
    let json = null;
    try { json = await res.json(); } catch (e) { /* ignore */ }
    if (!res.ok) {
      const err = { status: res.status, data: json };
      setDiag(prev => ({ ...prev, lastError: err }));
      throw err;
    }
    setDiag(prev => ({ ...prev, lastResponse: json, status: res.status }));
    return json;
  }

  // PUBLIC_INTERFACE
  async function login({ username, password, identifier }) {
    const url = canonicalBase + endpoints.token;
    const method = 'POST';
    const payload = username ? { username, password } : { identifier, password };
    const data = await doFetch(url, method, payload);
    setToken({ access: data.access, refresh: data.refresh });
    setUser({ username: username || identifier });
    return data;
  }

  // PUBLIC_INTERFACE
  async function register({ email, username, password }) {
    const url = canonicalBase + endpoints.register;
    const method = 'POST';
    const payload = { email, username, password };
    const data = await doFetch(url, method, payload);
    return data;
  }

  return (
    <AuthContext.Provider value={{ user, token, login, register, diag }}>
      {children}
      {diag && (
        <div style={{
          position: 'fixed', bottom: 8, right: 8, background: '#111827', color: 'white',
          padding: '8px 12px', borderRadius: 8, fontSize: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.2)', maxWidth: 360
        }}>
          <div style={{ fontWeight: 600, marginBottom: 4 }}>Auth Diagnostics</div>
          <div>URL: <code>{diag.url}</code></div>
          <div>Method: <code>{diag.method}</code></div>
          <div>Body keys: <code>{(diag.bodyPreviewKeys || []).join(', ')}</code></div>
          {diag.status && <div>Status: <code>{diag.status}</code></div>}
          {diag.lastError && <div style={{ color: '#F59E0B' }}>Error: <code>{JSON.stringify(diag.lastError)}</code></div>}
        </div>
      )}
    </AuthContext.Provider>
  );
}

// PUBLIC_INTERFACE
export function useAuth() {
  return useContext(AuthContext);
}

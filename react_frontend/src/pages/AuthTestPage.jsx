import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

// PUBLIC_INTERFACE
export default function AuthTestPage() {
  const { login, register, diag } = useAuth();
  const [form, setForm] = useState({ username: 'tester', email: 'tester@example.com', password: 'Test123!pass' });
  const [last, setLast] = useState(null);

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const doRegister = async () => {
    try {
      const res = await register({ email: form.email, username: form.username, password: form.password });
      setLast({ ok: true, res });
    } catch (e) {
      setLast({ ok: false, e });
    }
  };

  const doLogin = async () => {
    try {
      const res = await login({ username: form.username, password: form.password });
      setLast({ ok: true, res });
    } catch (e) {
      setLast({ ok: false, e });
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>Auth Test Page</h2>
      <div style={{ display: 'grid', gap: 8, maxWidth: 360 }}>
        <input name="username" value={form.username} onChange={onChange} placeholder="username" />
        <input name="email" value={form.email} onChange={onChange} placeholder="email" />
        <input name="password" type="password" value={form.password} onChange={onChange} placeholder="password" />
        <button onClick={doRegister}>Register (POST /api/auth/register/)</button>
        <button onClick={doLogin}>Login (POST /api/auth/token/)</button>
      </div>
      {last && (
        <pre style={{ background: '#f3f4f6', padding: 12, marginTop: 12 }}>
{JSON.stringify(last, null, 2)}
        </pre>
      )}
      {diag && (
        <pre style={{ background: '#eef2ff', padding: 12, marginTop: 12 }}>
{JSON.stringify(diag, null, 2)}
        </pre>
      )}
    </div>
  );
}

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../store/AuthContext';
import { useToast } from '../../components/Toast';

export default function Register() {
  const { actions } = useAuth();
  const toast = useToast();
  const nav = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', auto_login: true });

  async function submit(e) {
    e.preventDefault();
    try {
      // Map UI form to API payload: username derived from name (fallback to email local-part)
      const [first_name = '', ...rest] = (form.name || '').trim().split(' ');
      const last_name = rest.join(' ');
      const usernameBase = (form.name || '').trim() || (form.email?.split('@')[0] || '');
      const body = {
        username: usernameBase.replace(/\s+/g, '_').toLowerCase(),
        email: form.email,
        password: form.password,
        first_name,
        last_name,
        auto_login: form.auto_login,
      };
      await actions.register(body);
      toast.show('Account created. Please sign in.', 'success');
      nav('/auth/login');
    } catch (e) {
      const status = e?.status ? ` (status ${e.status})` : '';
      const detail = e?.data?.detail || e?.data?.message || e?.message || 'Registration failed';
      toast.show(`Registration error${status}: ${detail}`, 'error');
    }
  }

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: 480, margin: '40px auto', padding: 16 }}>
        <h1>Create your account</h1>
        <form onSubmit={submit} className="grid" style={{ gap: 12 }}>
          <label>
            <div>Name</div>
            <input className="input" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}/>
          </label>
          <label>
            <div>Email</div>
            <input className="input" type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}/>
          </label>
          <label>
            <div>Password</div>
            <input className="input" type="password" required value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}/>
          </label>
          <button className="btn" type="submit">Create account</button>
        </form>
        <div style={{ marginTop: 12 }}>
          <Link className="btn ghost" to="/auth/login">Back to sign in</Link>
        </div>
      </div>
    </div>
  );
}

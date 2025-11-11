import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../store/AuthContext';
import { useToast } from '../../components/Toast';
import '../../styles/field-errors.css';

export default function Register() {
  const { actions } = useAuth();
  const toast = useToast();
  const nav = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', auto_login: true });
  const [fieldErrors, setFieldErrors] = useState({});

  function deriveNames(name, email) {
    const trimmed = (name || '').trim();
    if (!trimmed) {
      const local = (email || '').split('@')[0] || '';
      return { first_name: local, last_name: '' };
    }
    const [first_name = '', ...rest] = trimmed.split(' ');
    return { first_name, last_name: rest.join(' ') };
  }

  function deriveUsername(name, email) {
    const base = ((name || '').trim() || (email || '').split('@')[0] || '')
      .replace(/\s+/g, '_')
      .toLowerCase();
    return base.slice(0, 150);
  }

  async function submit(e) {
    e.preventDefault();
    setFieldErrors({});
    try {
      const names = deriveNames(form.name, form.email);
      const body = {
        username: deriveUsername(form.name, form.email),
        email: form.email,
        password: form.password,
        ...names,
        auto_login: form.auto_login,
      };
      await actions.register(body);
      toast.show('Account created. Please sign in.', 'success');
      nav('/auth/login');
    } catch (e) {
      // Prefer backend structured field errors
      const errs = e?.data?.errors;
      if (errs && typeof errs === 'object') {
        setFieldErrors(errs);
      }
      const status = e?.status ? ` (status ${e.status})` : '';
      const detail =
        (Array.isArray(errs?.password) && errs.password.join('; ')) ||
        e?.data?.detail ||
        e?.data?.message ||
        e?.message ||
        'Registration failed';
      toast.show(`Registration error${status}: ${detail}`, 'error');
    }
  }

  const fe = fieldErrors;

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: 480, margin: '40px auto', padding: 16 }}>
        <h1>Create your account</h1>
        <form onSubmit={submit} className="grid" style={{ gap: 12 }}>
          <label>
            <div>Name</div>
            <input
              className="input"
              required
              aria-invalid={Boolean(fe?.first_name || fe?.last_name)}
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
            />
            {fe?.first_name && <div className="field-error">{Array.isArray(fe.first_name) ? fe.first_name.join(', ') : String(fe.first_name)}</div>}
            {fe?.last_name && <div className="field-error">{Array.isArray(fe.last_name) ? fe.last_name.join(', ') : String(fe.last_name)}</div>}
          </label>
          <label>
            <div>Email</div>
            <input
              className="input"
              type="email"
              required
              aria-invalid={Boolean(fe?.email)}
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
            />
            {fe?.email && <div className="field-error">{Array.isArray(fe.email) ? fe.email.join(', ') : String(fe.email)}</div>}
          </label>
          <label>
            <div>Password</div>
            <input
              className="input"
              type="password"
              required
              aria-invalid={Boolean(fe?.password)}
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
            />
            {fe?.password && <div className="field-error">{Array.isArray(fe.password) ? fe.password.join(' ') : String(fe.password)}</div>}
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

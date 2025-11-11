import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../store/AuthContext';
import { useToast } from '../../components/Toast';

export default function Login() {
  const { actions, state } = useAuth();
  const toast = useToast();
  const nav = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: '', password: '' });

  async function submit(e) {
    e.preventDefault();
    try {
      await actions.login(form);
      toast.show('Welcome back!', 'success');
      const to = location.state?.from?.pathname || '/dashboard';
      nav(to, { replace: true });
    } catch (err) {
      toast.show(err.message || 'Unable to sign in', 'error');
    }
  }

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: 420, margin: '40px auto', padding: 16 }}>
        <h1 style={{ margin: 0 }}>Sign in</h1>
        <p style={{ color: 'var(--color-muted)' }}>Use your company email to continue.</p>
        <form onSubmit={submit} className="grid" style={{ gap: 12 }}>
          <label>
            <div>Email</div>
            <input className="input" type="email" required
                   value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}/>
          </label>
          <label>
            <div>Password</div>
            <input className="input" type="password" required
                   value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}/>
          </label>
          <button disabled={state.loading} className="btn" type="submit" aria-busy={state.loading}>
            {state.loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
        <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
          <Link className="btn ghost" to="/auth/register">Create account</Link>
          <Link className="btn ghost" to="/auth/forgot">Forgot password</Link>
        </div>
        <SSOBlock />
      </div>
    </div>
  );
}

function SSOBlock() {
  const sso = process.env.REACT_APP_SSO_PROVIDER_URL;
  if (!sso) return null;
  return (
    <div role="region" aria-label="SSO" className="card" style={{ marginTop: 12, padding: 12 }}>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontWeight: 700 }}>Single Sign-On</div>
          <div style={{ color: 'var(--color-muted)' }}>Sign in with your identity provider.</div>
        </div>
        <a className="btn secondary" href={sso}>Continue with SSO</a>
      </div>
    </div>
  );
}

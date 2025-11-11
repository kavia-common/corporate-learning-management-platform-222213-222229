import React, { useState } from 'react';
import { useAuth } from '../../store/AuthContext';
import { useToast } from '../../components/Toast';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';

export default function Reset() {
  const { actions } = useAuth();
  const toast = useToast();
  const [sp] = useSearchParams();
  const token = sp.get('token') || '';
  const nav = useNavigate();
  const [password, setPassword] = useState('');

  async function submit(e) {
    e.preventDefault();
    try {
      await actions.resetPassword(token, password);
      toast.show('Password updated. Please sign in.', 'success');
      nav('/auth/login');
    } catch (e) {
      toast.show(e.message || 'Unable to reset password', 'error');
    }
  }

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: 460, margin: '40px auto', padding: 16 }}>
        <h1>Reset password</h1>
        <form onSubmit={submit} className="grid" style={{ gap: 12 }}>
          <label>
            <div>New password</div>
            <input className="input" type="password" required value={password} onChange={e => setPassword(e.target.value)} />
          </label>
          <button className="btn">Update password</button>
        </form>
        <div style={{ marginTop: 12 }}>
          <Link className="btn ghost" to="/auth/login">Back to sign in</Link>
        </div>
      </div>
    </div>
  );
}

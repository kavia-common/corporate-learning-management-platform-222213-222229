import React, { useState } from 'react';
import { useAuth } from '../../store/AuthContext';
import { useToast } from '../../components/Toast';
import { Link } from 'react-router-dom';

export default function Forgot() {
  const { actions } = useAuth();
  const toast = useToast();
  const [email, setEmail] = useState('');

  async function submit(e) {
    e.preventDefault();
    try {
      await actions.forgotPassword(email);
      toast.show('Password reset link sent if the email exists.', 'success');
    } catch (e) {
      toast.show(e.message || 'Unable to process request', 'error');
    }
  }

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: 460, margin: '40px auto', padding: 16 }}>
        <h1>Forgot password</h1>
        <form onSubmit={submit} className="grid" style={{ gap: 12 }}>
          <label>
            <div>Email</div>
            <input className="input" type="email" required value={email} onChange={e => setEmail(e.target.value)} />
          </label>
          <button className="btn">Send reset link</button>
        </form>
        <div style={{ marginTop: 12 }}>
          <Link className="btn ghost" to="/auth/login">Back to sign in</Link>
        </div>
      </div>
    </div>
  );
}

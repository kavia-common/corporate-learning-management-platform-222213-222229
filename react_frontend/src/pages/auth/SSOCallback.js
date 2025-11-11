import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../components/Toast';

// This is a placeholder to demonstrate SSO callback handling.
// In a real implementation, parse code/state from query and exchange for tokens.

export default function SSOCallback() {
  const nav = useNavigate();
  const toast = useToast();

  useEffect(() => {
    toast.show('SSO callback received (placeholder).', 'info');
    nav('/dashboard', { replace: true });
  }, [nav, toast]);

  return (
    <div className="container">
      <div className="card" style={{ marginTop: 40, padding: 16 }}>
        <h1>Signing you in...</h1>
        <p>Processing SSO response securely.</p>
      </div>
    </div>
  );
}

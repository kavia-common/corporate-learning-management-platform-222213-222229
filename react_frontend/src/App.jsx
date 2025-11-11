import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AuthTestPage from './pages/AuthTestPage';

// PUBLIC_INTERFACE
export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div style={{ padding: 12, background: '#e5e7eb' }}>
          <Link to="/auth-test">Auth Test</Link>
        </div>
        <Routes>
          <Route path="/auth-test" element={<AuthTestPage />} />
          <Route path="*" element={<div style={{ padding: 24 }}>Home</div>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

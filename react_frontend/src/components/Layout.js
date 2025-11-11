import React from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { getBrand } from '../api/client';
import { useAuth } from '../store/AuthContext';

export function Topbar({ onToggleMenu }) {
  const brand = getBrand();
  const { state, actions } = useAuth();
  return (
    <div className="topbar" role="banner">
      <div className="topbar-inner">
        <button className="btn ghost" onClick={onToggleMenu} aria-label="Toggle navigation">☰</button>
        <Link to="/" className="btn ghost" aria-label={`${brand} home`} style={{ fontWeight: 800 }}>
          {brand}
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Link to="/notifications" className="btn ghost" aria-label="Notifications">🔔</Link>
          {state.user ? (
            <>
              <span className="badge" aria-label="User role">{state.roles?.[0] || 'user'}</span>
              <button className="btn" onClick={() => actions.logout()} aria-label="Sign out">Sign out</button>
            </>
          ) : (
            <>
              <Link className="btn" to="/auth/login">Sign in</Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export function Sidebar() {
  const items = [
    { to: '/dashboard', label: 'Employee Dashboard' },
    { to: '/courses', label: 'Courses' },
    { to: '/learning-paths', label: 'Learning Paths' },
    { to: '/quizzes', label: 'Quizzes' },
    { to: '/reports', label: 'Reports' },
    { to: '/admin', label: 'Admin' },
  ];
  return (
    <nav className="sidebar" aria-label="Sidebar">
      <div className="grid" style={{ gap: 8 }}>
        {items.map((it) => (
          <NavLink
            key={it.to}
            to={it.to}
            className={({ isActive }) => `btn ghost${isActive ? '' : ''}`}
            style={{ justifyContent: 'flex-start' }}
          >
            {it.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

// PUBLIC_INTERFACE
export default function AppLayout() {
  /** App shell layout with topbar and responsive sidebar. */
  const [menuOpen, setMenuOpen] = React.useState(false);
  return (
    <>
      <Topbar onToggleMenu={() => setMenuOpen((s) => !s)} />
      <div className="layout" role="main">
        <div style={{ display: menuOpen ? 'block' : undefined }}>
          <Sidebar />
        </div>
        <div style={{ padding: 16 }}>
          <Outlet />
        </div>
      </div>
    </>
  );
}

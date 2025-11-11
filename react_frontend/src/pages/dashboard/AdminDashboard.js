import React from 'react';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  const actions = [
    { label: 'Users', to: '/admin/users' },
    { label: 'Roles', to: '/admin/roles' },
    { label: 'Courses', to: '/admin/courses' },
    { label: 'Content Library', to: '/admin/content' },
    { label: 'Settings', to: '/admin/settings' },
    { label: 'Integrations', to: '/admin/integrations' },
  ];
  return (
    <div className="container">
      <h1>Admin Console</h1>
      <div className="grid cols-3">
        {actions.map((a) => (
          <Link key={a.to} to={a.to} className="card" style={{ padding: 16 }}>
            <div style={{ fontWeight: 700 }}>{a.label}</div>
            <div style={{ color: 'var(--color-muted)' }}>Manage {a.label.toLowerCase()}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}

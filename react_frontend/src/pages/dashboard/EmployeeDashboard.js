import React from 'react';
import { Link } from 'react-router-dom';

export default function EmployeeDashboard() {
  const widgets = [
    { title: 'Continue learning', desc: 'Resume your current course', to: '/courses/1' },
    { title: 'Assigned learning', desc: '2 new items', to: '/learning-paths' },
    { title: 'Upcoming quiz', desc: 'Security Basics - due Friday', to: '/quizzes' },
  ];
  return (
    <div className="container">
      <h1>My Learning</h1>
      <div className="grid cols-3">
        {widgets.map((w, i) => (
          <div key={i} className="card" style={{ padding: 16 }}>
            <div style={{ fontWeight: 700 }}>{w.title}</div>
            <div style={{ color: 'var(--color-muted)' }}>{w.desc}</div>
            <Link className="btn" to={w.to} style={{ marginTop: 8 }}>Open</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

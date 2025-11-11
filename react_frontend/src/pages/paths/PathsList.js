import React from 'react';
import { Link } from 'react-router-dom';

export default function PathsList() {
  const list = [
    { id: 1, name: 'Onboarding', items: 6 },
    { id: 2, name: 'Security Essentials', items: 4 },
  ];
  return (
    <div className="container">
      <h1>Learning Paths</h1>
      <div className="grid cols-3">
        {list.map((p) => (
          <Link key={p.id} to={`/learning-paths/${p.id}`} className="card" style={{ padding: 16 }}>
            <div style={{ fontWeight: 700 }}>{p.name}</div>
            <div className="badge">{p.items} items</div>
          </Link>
        ))}
      </div>
    </div>
  );
}

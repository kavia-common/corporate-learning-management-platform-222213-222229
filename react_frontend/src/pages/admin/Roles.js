import React from 'react';

export default function Roles() {
  const roles = ['employee', 'manager', 'admin'];
  return (
    <div className="container">
      <h1>Roles</h1>
      <div className="card" style={{ padding: 12 }}>
        <ul>
          {roles.map(r => <li key={r}><span className="badge">{r}</span></li>)}
        </ul>
      </div>
    </div>
  );
}

import React from 'react';

export default function ManagerDashboard() {
  const rows = [
    { name: 'Team Alpha', completion: '82%', overdue: 3 },
    { name: 'Team Beta', completion: '67%', overdue: 7 },
  ];
  return (
    <div className="container">
      <h1>Manager Overview</h1>
      <div className="card" style={{ padding: 12 }}>
        <table className="table" aria-label="Team progress">
          <thead><tr><th>Team</th><th>Completion</th><th>Overdue</th></tr></thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.name}><td>{r.name}</td><td>{r.completion}</td><td>{r.overdue}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

import React from 'react';

export default function Reports() {
  const rows = [
    { name: 'Alice', completed: 14, hours: 22 },
    { name: 'Bob', completed: 10, hours: 15 },
  ];
  return (
    <div className="container">
      <h1>Reports</h1>
      <div className="card" style={{ padding: 12 }}>
        <table className="table" aria-label="Learning reports">
          <thead><tr><th>Employee</th><th>Completed Courses</th><th>Hours</th></tr></thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.name}><td>{r.name}</td><td>{r.completed}</td><td>{r.hours}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

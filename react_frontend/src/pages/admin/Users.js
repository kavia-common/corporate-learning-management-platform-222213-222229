import React from 'react';

export default function Users() {
  const rows = [
    { name: 'Alice', email: 'alice@corp.com', role: 'employee' },
    { name: 'Bob', email: 'bob@corp.com', role: 'manager' },
  ];
  return (
    <div className="container">
      <h1>Users</h1>
      <div className="card" style={{ padding: 12 }}>
        <table className="table" aria-label="Users">
          <thead><tr><th>Name</th><th>Email</th><th>Role</th><th /></tr></thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.email}>
                <td>{r.name}</td>
                <td>{r.email}</td>
                <td>{r.role}</td>
                <td><button className="btn ghost">Edit</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="btn" style={{ marginTop: 8 }}>Invite user</button>
      </div>
    </div>
  );
}

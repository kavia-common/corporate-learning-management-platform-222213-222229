import React from 'react';

export default function SkillMatrix() {
  const skills = ['Security', 'Privacy', 'Compliance'];
  const users = ['Alice', 'Bob'];
  return (
    <div className="container">
      <h1>Skill Matrix</h1>
      <div className="card" style={{ padding: 12 }}>
        <table className="table" aria-label="Skill matrix">
          <thead>
            <tr>
              <th>User</th>
              {skills.map(s => <th key={s}>{s}</th>)}
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u}>
                <td>{u}</td>
                {skills.map(s => <td key={s}><span className="badge">Level 2</span></td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

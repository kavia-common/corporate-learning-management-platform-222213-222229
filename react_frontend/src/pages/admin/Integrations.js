import React from 'react';

export default function Integrations() {
  const list = ['Okta', 'Azure AD', 'Slack', 'HRIS'];
  return (
    <div className="container">
      <h1>Integrations</h1>
      <div className="grid cols-3">
        {list.map((x) => (
          <div key={x} className="card" style={{ padding: 16 }}>
            <div style={{ fontWeight: 700 }}>{x}</div>
            <button className="btn" style={{ marginTop: 8 }}>Configure</button>
          </div>
        ))}
      </div>
    </div>
  );
}

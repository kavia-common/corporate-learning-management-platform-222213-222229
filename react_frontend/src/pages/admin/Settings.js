import React from 'react';

export default function Settings() {
  return (
    <div className="container">
      <h1>Settings</h1>
      <div className="card" style={{ padding: 12 }}>
        <label>
          <div>Brand name</div>
          <input className="input" defaultValue={process.env.REACT_APP_BRAND_NAME || 'Ocean LMS'} />
        </label>
        <button className="btn" style={{ marginTop: 8 }}>Save</button>
      </div>
    </div>
  );
}

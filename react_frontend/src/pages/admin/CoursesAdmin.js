import React from 'react';

export default function CoursesAdmin() {
  return (
    <div className="container">
      <h1>Courses (Admin)</h1>
      <div className="card" style={{ padding: 12 }}>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn">New course</button>
          <button className="btn ghost">Import</button>
        </div>
        <div style={{ marginTop: 12, border: '1px dashed #e5e7eb', borderRadius: 8, padding: 16 }}>
          Course list placeholder
        </div>
      </div>
    </div>
  );
}

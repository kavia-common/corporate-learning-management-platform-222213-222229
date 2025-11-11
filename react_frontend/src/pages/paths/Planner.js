import React, { useState } from 'react';

export default function Planner() {
  const [date, setDate] = useState('');
  return (
    <div className="container">
      <h1>Learning Planner</h1>
      <div className="card" style={{ padding: 16 }}>
        <label>
          <div>Target completion date</div>
          <input className="input" type="date" value={date} onChange={e => setDate(e.target.value)} />
        </label>
        <button className="btn" style={{ marginTop: 8 }}>Save Plan</button>
      </div>
    </div>
  );
}

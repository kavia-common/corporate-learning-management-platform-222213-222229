import React from 'react';
import { useParams } from 'react-router-dom';

export default function Review() {
  const { id } = useParams();
  const items = [
    { q: 'What is CIA triad?', a: 'Confidentiality, Integrity, Availability', correct: true },
    { q: 'Share passwords?', a: 'No', correct: true },
  ];
  return (
    <div className="container">
      <h1>Review - Course {id}</h1>
      <div className="grid" style={{ gap: 8 }}>
        {items.map((it, idx) => (
          <div key={idx} className="card" style={{ padding: 12, borderLeft: `4px solid ${it.correct ? '#16a34a' : '#EF4444'}` }}>
            <div style={{ fontWeight: 700 }}>{it.q}</div>
            <div>{it.a}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

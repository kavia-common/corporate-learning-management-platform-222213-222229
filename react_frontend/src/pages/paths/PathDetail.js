import React from 'react';
import { Link, useParams } from 'react-router-dom';

export default function PathDetail() {
  const { id } = useParams();
  const items = [
    { id: 'c1', type: 'course', name: 'Intro' },
    { id: 'c2', type: 'course', name: 'Security' },
  ];
  return (
    <div className="container">
      <h1>Path #{id}</h1>
      <div className="card" style={{ padding: 16 }}>
        <ul>
          {items.map((it) => (
            <li key={it.id} style={{ marginBottom: 8 }}>
              <Link className="btn ghost" to={`/courses/${it.id}`}>{it.type}: {it.name}</Link>
            </li>
          ))}
        </ul>
        <Link className="btn" to={`/learning-paths/${id}/planner`} aria-label="Open planner">Open Planner</Link>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../api/client';

export default function Catalog() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await api.get('/courses');
        if (mounted) setItems(data.results || data || []);
      } catch {
        setItems([
          { id: 1, title: 'Security Basics', level: 'Beginner' },
          { id: 2, title: 'Data Privacy', level: 'Intermediate' },
        ]);
      }
    })();
    return () => { mounted = false; };
  }, []);
  return (
    <div className="container">
      <h1>Course Catalog</h1>
      <div className="grid cols-3">
        {items.map((c) => (
          <div key={c.id} className="card" style={{ padding: 16 }}>
            <div style={{ fontWeight: 700 }}>{c.title}</div>
            <div className="badge" style={{ marginTop: 6 }}>{c.level || 'All levels'}</div>
            <Link className="btn" to={`/courses/${c.id}`} style={{ marginTop: 10 }}>View</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

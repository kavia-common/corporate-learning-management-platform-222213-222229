import React from 'react';
import { Link, useParams } from 'react-router-dom';

export default function Results() {
  const { id } = useParams();
  return (
    <div className="container">
      <div className="card" style={{ padding: 16 }}>
        <h1>Results - Course {id}</h1>
        <div style={{ fontSize: 48, fontWeight: 800, color: '#16a34a' }}>92%</div>
        <div className="grid" style={{ marginTop: 12 }}>
          <Link className="btn" to={`/quizzes/review/${id}`}>Review answers</Link>
          <Link className="btn secondary" to="/dashboard">Back to dashboard</Link>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { Link, useParams } from 'react-router-dom';

export default function CourseDetail() {
  const { id } = useParams();
  return (
    <div className="container">
      <div className="card" style={{ padding: 16 }}>
        <h1>Course #{id}</h1>
        <p>Course description and metadata go here.</p>
        <div style={{ display: 'flex', gap: 8 }}>
          <Link className="btn" to={`/courses/${id}/lessons/1`}>Start Lesson 1</Link>
          <Link className="btn secondary" to={`/quizzes/run/${id}`}>Take Quiz</Link>
        </div>
      </div>
    </div>
  );
}

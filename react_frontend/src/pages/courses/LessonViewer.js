import React from 'react';
import { useParams } from 'react-router-dom';

export default function LessonViewer() {
  const { id, lessonId } = useParams();
  return (
    <div className="container">
      <div className="card" style={{ padding: 16 }}>
        <h1>Course {id} - Lesson {lessonId}</h1>
        <div style={{ height: 320, border: '1px dashed #e5e7eb', borderRadius: 8, display: 'grid', placeItems: 'center', marginTop: 12 }}>
          <div>Lesson content player placeholder</div>
        </div>
      </div>
    </div>
  );
}

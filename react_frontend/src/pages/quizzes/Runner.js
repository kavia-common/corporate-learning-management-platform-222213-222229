import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useToast } from '../../components/Toast';

export default function Runner() {
  const { id } = useParams();
  const toast = useToast();
  const nav = useNavigate();
  const [answer, setAnswer] = useState('');
  function submit(e) {
    e.preventDefault();
    toast.show('Quiz submitted.', 'success');
    nav(`/quizzes/results/${id}`);
  }
  return (
    <div className="container">
      <h1>Quiz for Course {id}</h1>
      <form onSubmit={submit} className="card" style={{ padding: 16 }}>
        <div>Q1: Which option best describes security?</div>
        <select className="select" value={answer} required onChange={e => setAnswer(e.target.value)} aria-label="Answer selection">
          <option value="">Choose an answer</option>
          <option>Confidentiality, integrity, availability</option>
          <option>Always share passwords</option>
        </select>
        <button className="btn" style={{ marginTop: 10 }}>Submit</button>
      </form>
    </div>
  );
}

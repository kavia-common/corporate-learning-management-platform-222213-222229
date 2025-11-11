import React from 'react';
import { Link } from 'react-router-dom';

// PUBLIC_INTERFACE
export default function Unauthorized() {
  /** Displays an access denied message with navigation back to home. */
  return (
    <div className="container">
      <div className="card" style={{ padding: 16, marginTop: 40 }}>
        <h1>Not authorized</h1>
        <p>You do not have permission to access this area.</p>
        <Link className="btn" to="/">Go home</Link>
      </div>
    </div>
  );
}

import React from 'react';
import { useWebSocketNotifications } from '../../hooks/useWebSocket';

export default function NotificationsPage() {
  const { connected, lastMessage } = useWebSocketNotifications();
  const items = lastMessage ? [lastMessage] : [];

  return (
    <div className="container">
      <h1>Notifications {connected ? '🟢' : '⚪️'}</h1>
      <div className="grid" style={{ gap: 8 }}>
        {items.length === 0 && (
          <div className="card" style={{ padding: 16 }}>No notifications yet.</div>
        )}
        {items.map((n, idx) => (
          <div key={idx} className="card" style={{ padding: 12 }}>
            <div style={{ fontWeight: 700 }}>{n.title || 'Notification'}</div>
            <div style={{ color: 'var(--color-muted)' }}>{n.message || JSON.stringify(n)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

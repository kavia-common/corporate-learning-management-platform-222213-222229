import { useEffect, useRef, useState } from 'react';
import { storage } from '../utils/storage';

const WS_URL = process.env.REACT_APP_WS_URL;

// PUBLIC_INTERFACE
export function useWebSocketNotifications({ onMessage } = {}) {
  /** Establishes a WebSocket connection using JWT for auth and exposes messages. */
  const [connected, setConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState(null);
  const wsRef = useRef(null);

  useEffect(() => {
    if (!WS_URL) return undefined;
    const token = storage.get('accessToken');
    try {
      const url = new URL(WS_URL);
      if (token) url.searchParams.set('token', token);
      const ws = new WebSocket(url.toString());
      wsRef.current = ws;

      ws.onopen = () => setConnected(true);
      ws.onclose = () => setConnected(false);
      ws.onerror = () => setConnected(false);
      ws.onmessage = (ev) => {
        try {
          const data = JSON.parse(ev.data);
          setLastMessage(data);
          onMessage && onMessage(data);
        } catch {
          // ignore malformed
        }
      };
    } catch {
      // invalid URL
    }

    return () => {
      try { wsRef.current && wsRef.current.close(); } catch { /* noop */ }
    };
  }, [onMessage]);

  return { connected, lastMessage };
}

import React, { createContext, useContext, useMemo, useState } from 'react';

const ToastContext = createContext(undefined);

// PUBLIC_INTERFACE
export function ToastProvider({ children }) {
  /** Provides toast notifications UI and actions. */
  const [toasts, setToasts] = useState([]);
  const api = useMemo(() => ({
    // PUBLIC_INTERFACE
    show(message, variant = 'info', timeout = 4000) {
      /** Shows a toast with optional variant and auto-dismiss. */
      const id = Math.random().toString(36).slice(2);
      const item = { id, message, variant };
      setToasts((t) => [...t, item]);
      if (timeout) {
        setTimeout(() => {
          setToasts((t) => t.filter((x) => x.id !== id));
        }, timeout);
      }
    },
    // PUBLIC_INTERFACE
    remove(id) { setToasts((t) => t.filter((x) => x.id !== id)); },
  }), []);

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div role="region" aria-live="polite" aria-label="Notifications"
           style={{ position: 'fixed', right: 16, bottom: 16, display: 'grid', gap: 8, zIndex: 50 }}>
        {toasts.map(t => (
          <div key={t.id} className="card"
               style={{
                 padding: '10px 12px',
                 minWidth: 260,
                 borderLeft: `4px solid ${t.variant === 'error' ? '#EF4444' : t.variant === 'success' ? '#16a34a' : '#2563EB'}`
               }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
              <div>{t.message}</div>
              <button className="btn ghost" onClick={() => api.remove(t.id)} aria-label="Dismiss notification">✕</button>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

// PUBLIC_INTERFACE
export function useToast() {
  /** Returns toast actions. */
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}

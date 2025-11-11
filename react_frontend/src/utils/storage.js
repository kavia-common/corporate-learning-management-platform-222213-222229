const NAMESPACE = 'clmp';
const withNs = (key) => `${NAMESPACE}:${key}`;

export const storage = {
  // PUBLIC_INTERFACE
  set(key, value) {
    /** Stores a JSON-serializable value in localStorage with namespacing. */
    try {
      localStorage.setItem(withNs(key), JSON.stringify(value));
    } catch {
      // ignore quota or serialization errors
    }
  },
  // PUBLIC_INTERFACE
  get(key, fallback = null) {
    /** Retrieves a JSON value from localStorage or returns fallback. */
    try {
      const raw = localStorage.getItem(withNs(key));
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  },
  // PUBLIC_INTERFACE
  remove(key) {
    /** Removes a namespaced key from localStorage. */
    try {
      localStorage.removeItem(withNs(key));
    } catch {
      /* noop */
    }
  },
  // PUBLIC_INTERFACE
  clearAll() {
    /** Clears all keys under the namespace from localStorage. */
    try {
      Object.keys(localStorage)
        .filter((k) => k.startsWith(`${NAMESPACE}:`))
        .forEach((k) => localStorage.removeItem(k));
    } catch {
      /* noop */
    }
  },
};
